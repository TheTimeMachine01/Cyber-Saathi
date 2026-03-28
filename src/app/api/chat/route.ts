import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Paths to the system prompt files
const PROMPTS_DIR = path.join(process.cwd(), "src", "lib", "prompts");
const INTRO_PROMPT_PATH = path.join(PROMPTS_DIR, "intro.txt");
const INVALID_ID_PROMPT_PATH = path.join(PROMPTS_DIR, "invalid_ID.txt");
const CLASSIFY_CASE_PROMPT_PATH = path.join(PROMPTS_DIR, "classify_case.txt");

// NVIDIA NIM Configuration
const NVIDIA_API_KEY = process.env.NVIDIA_NIM_API_KEY;
const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1";
const NVIDIA_MODEL = process.env.NVIDIA_NIM_MODEL || "meta/llama-3.1-405b-instruct";

async function callNvidiaNIM(systemPrompt: string, userPrompt: string, history: any[] = []) {
  if (!NVIDIA_API_KEY) {
    throw new Error("NVIDIA_NIM_API_KEY is not configured in environment variables.");
  }

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userPrompt }
  ];

  const res = await fetch(`${NVIDIA_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages: messages,
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: false,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`NVIDIA NIM API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

export async function POST(req: NextRequest) {
  try {
    const { prompt = "", state = "INIT" } = await req.json();

    let systemPromptPath = INTRO_PROMPT_PATH;
    let nextState = state;
    let responseContent = "";

    // Determine current system prompt
    if (state === "INIT" || state === "WAIT_ID") {
      systemPromptPath = INTRO_PROMPT_PATH;
    } else if (state === "WAIT_STATEMENT") {
      systemPromptPath = CLASSIFY_CASE_PROMPT_PATH;
    }

    const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8").trim();

    // Trigger prompt for INIT
    const actualPrompt = (state === "INIT" && !prompt)
      ? "Introduce yourself and ask me for the case number."
      : prompt;

    // Call NVIDIA NIM
    responseContent = await callNvidiaNIM(systemPrompt, actualPrompt);

    // STATE MACHINE LOGIC (Matches your original logic)
    if (state === "INIT") {
      nextState = "WAIT_ID";
    } else if (state === "WAIT_ID") {
      const digitMatch = prompt.match(/\b(\d{14})\b/);
      const isValidCaseId = !!digitMatch;
      const extractedCaseNumber = digitMatch ? digitMatch[1] : null;

      if (isValidCaseId && extractedCaseNumber) {
        nextState = "WAIT_STATEMENT";
        let caseJson = `{"case_number":"${extractedCaseNumber}"}`;
        
        // Fetch follow-up instructions
        const nextSystemPrompt = fs.readFileSync(CLASSIFY_CASE_PROMPT_PATH, "utf-8").trim();
        const nextContent = await callNvidiaNIM(
            nextSystemPrompt, 
            "The case number has been verified. Please respond to the officer with the next required instructions according to your system prompt."
        );
        responseContent = caseJson + "\n\n" + nextContent;
      } else {
        nextState = "WAIT_ID";
        const invalidSystemPrompt = fs.readFileSync(INVALID_ID_PROMPT_PATH, "utf-8").trim();
        responseContent = await callNvidiaNIM(
            invalidSystemPrompt, 
            "The ID provided was invalid. Please ask for a valid 14-digit case number."
        );
      }
    } else if (state === "WAIT_STATEMENT") {
      const match = responseContent.match(/\{[\s\S]*?"case_type"[\s\S]*?\}/);
      nextState = match ? "DONE" : "WAIT_STATEMENT";
    }

    return NextResponse.json({ 
        content: responseContent, 
        state: nextState 
    });

  } catch (err: any) {
    console.error("Chat API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
