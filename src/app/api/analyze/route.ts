import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { writeFile, unlink } from 'fs/promises';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mode = formData.get('mode') as string;
    
    // The python scripts path using the created virtual environment
    const pythonPath = path.join(process.cwd(), 'python_scripts', '.venv', 'bin', 'python3');
    const scriptPath = path.join(process.cwd(), 'python_scripts', 'investigation_mode.py');

    if (mode === 'auto') {
      const file = formData.get('media') as File;
      if (!file) {
        return NextResponse.json({ error: 'No media file provided.' }, { status: 400 });
      }

      // Save file temporarily
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempFileName = `temp_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const tempFilePath = path.join(process.cwd(), 'tmp', tempFileName);
      
      await writeFile(tempFilePath, buffer);

      // Execute Python
      try {
        const { stdout, stderr } = await execAsync(`${pythonPath} ${scriptPath} auto ${tempFilePath}`, { 
          cwd: path.join(process.cwd(), 'python_scripts'),
          maxBuffer: 1024 * 1024 * 10 
        }); // 10MB buffer
        await unlink(tempFilePath).catch(console.error); // cleanup
        
        try {
          const result = JSON.parse(stdout);

          // Transform result for frontend if in automation mode
          if (result.mode === 'automation' && result.extracted_indicators) {
             const analysis_results: any[] = [];
             
             // Iterate through all extracted indicators keys and create analysis objects
             const indicators = result.extracted_indicators;
             
             // Define keys we want to map to analysis_results
             const keysToMap = [
                'phones', 'urls', 'emails', 'upi_ids', 'telegram_ids', 
                'instagram_ids', 'transaction_ids', 'bank_accounts', 
                'crypto_wallets', 'ip_addresses', 'pan_numbers', 
                'aadhaar_numbers', 'vehicle_numbers', 'card_numbers', 
                'otp_codes', 'imei_numbers', 'mac_addresses'
             ];

             keysToMap.forEach(key => {
                if (Array.isArray(indicators[key])) {
                   indicators[key].forEach((indicator: any) => {
                      if (indicator && indicator !== "NA") {
                          analysis_results.push({
                             indicator: typeof indicator === 'string' ? indicator : JSON.stringify(indicator),
                             type: key, 
                             analysis: {
                                risk_assessment: {
                                   risk_score: 15, // Default low risk score
                                   risk_level: "Low"
                                }
                             }
                          });
                      }
                   });
                }
             });
             
             result.analysis_results = analysis_results;
          }

          return NextResponse.json(result);
        } catch (parseError) {
          console.error("Parse Error:", parseError, "Stdout:", stdout);
          return NextResponse.json({ error: 'Failed to parse python output', details: stdout, stderr }, { status: 500 });
        }
      } catch (execError: any) {
        await unlink(tempFilePath).catch(console.error); // cleanup
        console.error("Exec Error:", execError);
        return NextResponse.json({ error: 'Failed to execute analysis script', details: execError.message }, { status: 500 });
      }

    } else if (mode === 'manual') {
      const indicator = formData.get('indicator') as string;
      if (!indicator) {
        return NextResponse.json({ error: 'No indicator provided.' }, { status: 400 });
      }

      try {
        const { stdout, stderr } = await execAsync(`${pythonPath} ${scriptPath} manual "${indicator.replace(/"/g, '\\"')}"`, { 
          cwd: path.join(process.cwd(), 'python_scripts'),
          maxBuffer: 1024 * 1024 * 10 
        });
        try {
          const result = JSON.parse(stdout);
          return NextResponse.json(result);
        } catch (parseError) {
           console.error("Parse Error:", parseError, "Stdout:", stdout);
           return NextResponse.json({ error: 'Failed to parse python output', details: stdout, stderr }, { status: 500 });
        }
      } catch (execError: any) {
        console.error("Exec Error:", execError);
        return NextResponse.json({ error: 'Failed to execute analysis script', details: execError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid mode specified. Use "auto" or "manual".' }, { status: 400 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
