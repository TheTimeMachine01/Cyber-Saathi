import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, Globe, AlertTriangle, ShieldAlert, CheckCircle, 
  MapPin, Server, FileText, Lock
} from "lucide-react";

// --- Interfaces matching threat_analyzer.py output ---

interface KeyValueData {
  [key: string]: string | number | boolean | null | undefined | string[];
}

interface PhoneInfogaData {
  structured?: KeyValueData;
}

interface DomainMetadata extends KeyValueData {
  registrar?: string;
  creation_date?: string;
  expiration_date?: string;
  age_days?: number;
  hosting_ip?: string;
  ssl_issuer?: string;
  ssl_valid_from?: string;
  ssl_valid_to?: string;
}

interface IpInformation extends KeyValueData {
  ip_address?: string;
  country?: string;
  region?: string;
  city?: string;
  isp?: string;
  organization?: string;
  asn?: string;
}

interface WebsiteAnalysis extends KeyValueData {
  title?: string;
  meta_description?: string;
  http_status?: number;
  login_form_detected?: boolean;
  financial_keywords_detected?: boolean;
}

interface HostingInfo extends KeyValueData {
  hosting_provider?: string;
  asn?: string;
  organization?: string;
  isp?: string;
}

interface AnalysisData {
  phoneinfoga?: PhoneInfogaData | "NA";
  ip_information?: IpInformation | "NA";
  domain_metadata?: DomainMetadata | "NA";
  website_analysis?: WebsiteAnalysis | "NA";
  hosting?: HostingInfo | "NA";
  [key: string]: any;
}

interface RiskAssessment {
  risk_level: string;
  reason: string[];
}

interface VirusTotalSummary {
  malicious: number | string;
  suspicious?: number | string;
  engines_checked?: number | string;
}

export interface AnalysisResult {
  indicator: string;
  type: string;
  analysis?: AnalysisData;
  risk_assessment?: RiskAssessment;
  virustotal_summary?: VirusTotalSummary;
}

interface AnalysisResultsProps {
  results: AnalysisResult[];
}

// --- Helper Functions ---

const isValid = (value: any): boolean => {
  if (value === "NA") return false;
  if (value === null) return false;
  if (value === undefined) return false;
  if (value === "") return false;
  if (typeof value === 'object' && Object.keys(value).length === 0) return false;
  return true;
};

const formatLabel = (key: string) => {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const formatValue = (value: any): string => {
  if (typeof value === 'boolean') return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
};

const getRiskColor = (level: string) => {
  switch (level?.toLowerCase()) {
    case 'high': return "bg-red-500 hover:bg-red-600 border-transparent text-white";
    case 'medium': return "bg-yellow-500 hover:bg-yellow-600 border-transparent text-white";
    case 'low': return "bg-green-500 hover:bg-green-600 border-transparent text-white";
    default: return "bg-gray-500 text-white";
  }
};

// --- Sub-components ---

const DataGrid = ({ title, icon: Icon, data, className }: { title: string, icon: any, data: KeyValueData, className?: string }) => {
  if (!data || typeof data !== 'object') return null;
  
  const validEntries = Object.entries(data).filter(([_, val]) => isValid(val));
  
  if (validEntries.length === 0) return null;

  return (
    <div className={`space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg border border-slate-100 dark:border-slate-800 ${className}`}>
      <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground/80 border-b border-border/40 pb-2">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {validEntries.map(([key, value]) => (
          <div key={key} className="flex flex-col space-y-0.5 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{formatLabel(key)}</span>
            <span className="text-sm font-medium truncate text-foreground/90 font-mono" title={formatValue(value)}>
              {formatValue(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div className="space-y-6">
      {results.map((result, index) => {
        const isPhone = result.type.toLowerCase() === 'phone';
        const MainIcon = isPhone ? Phone : Globe;
        
        // Data Extraction with NA checks
        const analysis = result.analysis || {};
        
        // Helper to safely extract objects or return null if "NA"
        const safelyGetData = (data: any) => (data === "NA" || typeof data === 'string' ? null : data);

        // Safe extraction to avoid TS errors with "NA" union types
        const phoneinfoga = analysis.phoneinfoga !== "NA" ? analysis.phoneinfoga : null;
        const phoneData = safelyGetData(phoneinfoga?.structured);
        
        const ipData = safelyGetData(analysis.ip_information);
        const domainData = safelyGetData(analysis.domain_metadata);
        const webData = safelyGetData(analysis.website_analysis);
        const hostingData = safelyGetData(analysis.hosting);

        // Risk
        const riskLevel = result.risk_assessment?.risk_level || "Unknown";
        const riskReasons = (result.risk_assessment?.reason || []).filter(isValid);
        
        // VirusTotal
        const malicious = Number(result.virustotal_summary?.malicious);
        const suspicious = Number(result.virustotal_summary?.suspicious);
        const totalBad = (isNaN(malicious) ? 0 : malicious) + (isNaN(suspicious) ? 0 : suspicious);
        const isMalicious = totalBad > 0;

        return (
          <Card key={index} className="overflow-hidden border-l-4 shadow-sm transition-all hover:shadow-md dark:bg-card" style={{ 
            borderLeftColor: riskLevel.toLowerCase() === 'high' ? '#ef4444' : 
                             riskLevel.toLowerCase() === 'medium' ? '#eab308' : 
                             riskLevel.toLowerCase() === 'low' ? '#22c55e' : '#6b7280' 
          }}>
            <CardHeader className="bg-muted/30 pb-4 pt-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-background rounded-xl border shadow-sm">
                    <MainIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold tracking-tight font-mono break-all">{result.indicator}</CardTitle>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{result.type}</p>
                  </div>
                </div>
                {isValid(riskLevel) && (
                  <Badge className={`px-3 py-1 text-xs ${getRiskColor(riskLevel)}`} variant="secondary">
                    {riskLevel} Risk
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6 grid gap-6">
              
              {/* Flexible Data Grid Sections */}
              
              {phoneData && <DataGrid title="Phone Intelligence" icon={Phone} data={phoneData} />}
              
              {(domainData || ipData) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {domainData && <DataGrid title="Domain Metadata" icon={Lock} data={domainData} />}
                  {ipData && <DataGrid title="IP Information" icon={MapPin} data={ipData} />}
                </div>
              )}

              {(webData || hostingData) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {webData && <DataGrid title="Website Analysis" icon={FileText} data={webData} />}
                  {hostingData && <DataGrid title="Hosting Provider" icon={Server} data={hostingData} />}
                </div>
              )}


              {/* Risk Reasons Section */}
              {riskReasons.length > 0 && typeof riskReasons[0] === 'string' && ( // Added check to prevent rendering "Not evaluated" if NA
                 <div className="space-y-3 bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/20">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-amber-900 dark:text-amber-100">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Risk Factors Identified
                  </h4>
                  <ul className="grid gap-2 pl-1">
                    {riskReasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-amber-800 dark:text-amber-200/80 flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{String(reason)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Security Alert Section */}
              {isMalicious && (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
                  <div className="flex gap-4 items-center">
                    <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-full">
                      <ShieldAlert className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0" />
                    </div>
                    <div className="text-sm text-red-900 dark:text-red-100">
                      <h5 className="font-bold text-base mb-0.5">Threat Detected</h5>
                      <p className="opacity-90">
                        {malicious} engines flagged this as malicious. 
                        {suspicious > 0 && ` (${suspicious} suspicious)`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Badge (For clean results) */}
              {!isMalicious && riskLevel.toLowerCase() === 'low' && (
                 <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                   <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full">
                     <CheckCircle className="h-4 w-4" />
                   </div>
                   <span>No significant threats detected by security vendors.</span>
                 </div>
              )}

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
