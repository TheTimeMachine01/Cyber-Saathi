"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import AnalysisResults from "@/components/AnalysisResults";
import { useQuery } from "convex/react";
import { api } from "@/convex/api";
import { 
  Upload, Search, ShieldAlert, Image as ImageIcon, FileText, 
  Bot, AlertTriangle, Link as LinkIcon, Smartphone, Globe, 
  CheckCircle2, XCircle, Activity, Server, Shield, History
} from "lucide-react";

export default function AnalyzerPanel() {
  const [activeMode, setActiveMode] = useState<"auto" | "manual">("auto");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [indicator, setIndicator] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch history from Convex
  const history = useQuery(api.analysis_logs.list) || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMediaFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setMediaFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    setError(null);
    setResult(null);
    setIsAnalyzing(true);

    try {
      const tokenRes = await fetch("/api/token");
      const tokenData = await tokenRes.json();
      const token = tokenData.token;

      if (!token) {
        throw new Error("Authentication failed. Please sign in again.");
      }

      const analysisServiceUrl = process.env.NEXT_PUBLIC_ANALYSIS_SERVICE_URL || "http://localhost:8000";
      const formData = new FormData();
      
      let endpoint = `${analysisServiceUrl}/analyze`;

      if (activeMode === "auto") {
        if (!mediaFile) {
          setError("Please select a media file to scan.");
          setIsAnalyzing(false);
          return;
        }
        formData.append("file", mediaFile);
      } else {
        if (!indicator.trim()) {
          setError("Please enter a valid indicator to analyze.");
          setIsAnalyzing(false);
          return;
        }
        formData.append("indicator", indicator.trim());
        formData.append("mode", "manual");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.detail || "Failed to analyze.");
      }

      setResult(data);

      // The backend now syncs results to Convex automatically if the token is valid.
      // We don't need to manually save to Convex here anymore, but we can if the backend doesn't.
      // Based on instructions, the FastAPI service syncs it.
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Render Risk Level badge
  const renderRiskBadge = (riskScore?: number, riskLevel?: string) => {
    if (riskScore === undefined || !riskLevel) return null;
    let bgColor = "bg-slate-100 text-slate-800";
    if (riskLevel.toLowerCase() === "high") bgColor = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
    else if (riskLevel.toLowerCase() === "medium") bgColor = "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
    else if (riskLevel.toLowerCase() === "low") bgColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
    
    return (
      <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${bgColor} flex items-center gap-1.5`}>
        <Activity className="w-3.5 h-3.5" />
        {riskLevel.toUpperCase()} RISK ({riskScore}/100)
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:h-[calc(100vh-4.5rem)]">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-primary/10 dark:border-border-subtle pb-6">
            <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-2xl flex-shrink-0">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Threat Analyzer Panel</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Deep analysis for Media, Documents, and Cyber Indicators</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Mode Toggle */}
              <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                <button
                  onClick={() => setActiveMode("auto")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    activeMode === "auto" 
                      ? "bg-white dark:bg-surface-dark text-primary shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" /> Media Scan (OCR)
                </button>
                <button
                  onClick={() => setActiveMode("manual")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    activeMode === "manual" 
                      ? "bg-white dark:bg-surface-dark text-primary shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <Search className="w-4 h-4" /> Single Indicator
                </button>
              </div>

              {/* Form Input Card */}
              <Card className="p-5 dark:bg-surface-dark dark:border-border-subtle shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-200 font-semibold">
                    {activeMode === "auto" ? (
                      <><ImageIcon className="w-5 h-5 text-primary" /> Upload Suspicious Media</>
                    ) : (
                      <><Search className="w-5 h-5 text-primary" /> Analyze Indicator</>
                    )}
                  </div>
                  
                  {activeMode === "auto" ? (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Upload a screenshot or document. The OCR tool will extract text, patterns, and run nodal analysis on all entities.
                      </p>
                      
                      <div 
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                          mediaFile 
                            ? "border-primary/50 bg-primary/5" 
                            : "border-slate-300 dark:border-slate-700 hover:border-primary/40 dark:hover:border-primary/40"
                        }`}
                      >
                        {mediaFile ? (
                          <div className="space-y-3">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                              <FileText className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 break-all">{mediaFile.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{(mediaFile.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={clearFile} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                              Remove File
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4 w-full">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                              <Upload className="w-8 h-8" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to browse files</p>
                              <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</p>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => fileInputRef.current?.click()}
                              className="mx-auto border-primary/20 hover:bg-primary/5"
                            >
                              Browse Files
                            </Button>
                          </div>
                        )}
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Enter a domain, URL, phone number, or APK reference to run deep threat intelligence lookup.
                      </p>
                      <Input
                        placeholder="e.g. +919876543210 or scamdomain.com"
                        value={indicator}
                        onChange={(e) => setIndicator(e.target.value)}
                        className="py-6 px-4 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 focus-visible:ring-primary/30 text-base"
                      />
                    </div>
                  )}

                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || (activeMode === "auto" ? !mediaFile : !indicator.trim())}
                    className="w-full py-6 text-base font-semibold shadow-lg shadow-primary/25 mt-4"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Running Analysis...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> Start Deep Analysis
                      </span>
                    )}
                  </Button>
                </div>
              </Card>

              {/* History Dashboard */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300 ml-1">
                  <History className="w-4 h-4 text-primary" /> Recent Investigations
                </h3>
                <div className="space-y-3">
                  {history.length > 0 ? (
                    history.slice(0, 5).map((log: any) => (
                      <button 
                        key={log._id}
                        onClick={() => setResult(log.results)}
                        className="w-full text-left group"
                      >
                        <Card className="p-3 border-slate-200 dark:border-border-subtle hover:border-primary/40 dark:hover:border-primary/40 transition-all bg-white/50 dark:bg-surface-dark/50 group-hover:bg-white dark:group-hover:bg-surface-dark shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-primary transition-colors">
                                {log.mode === 'manual' ? <Search className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{log.indicator}</p>
                                <p className="text-[10px] text-slate-500">{new Date(log._creationTime).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              log.results?.risk_assessment?.risk_level === 'High' 
                                ? 'bg-red-50 text-red-600 border-red-100' 
                                : 'bg-slate-50 text-slate-500 border-slate-100'
                            }`}>
                              {log.results?.risk_assessment?.risk_level || 'Low'}
                            </div>
                          </div>
                        </Card>
                      </button>
                    ))
                  ) : (
                    <div className="text-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-surface-dark/20">
                      <p className="text-xs text-slate-500">No recent logs found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-7">
              {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400 animate-in fade-in-0 duration-300">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Analysis Failed</h4>
                    <p className="text-xs mt-1 opacity-90">{error}</p>
                  </div>
                </div>
              )}

              {result && !isAnalyzing ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" /> Intelligence Report
                    </h3>
                  </div>

                  {/* Manual Mode Result parsing */}
                  {result.mode === "manual" && result.analysis && (
                    <div className="space-y-4">
                      {/* Top Level Domain Risk */}
                      <Card className="p-5 border-l-4 border-l-primary dark:bg-surface-dark dark:border-border-subtle shadow-sm overflow-hidden relative">
                        <div className="absolute -right-6 -top-6 text-primary/5">
                          <Shield className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 flex flex-wrap justify-between items-start gap-4">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Target Indicator</p>
                            <h2 className="text-xl font-bold dark:text-white break-all">{result.indicator}</h2>
                          </div>
                          {renderRiskBadge(
                            result.analysis.risk_assessment?.risk_score, 
                            result.analysis.risk_assessment?.risk_level
                          )}
                        </div>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Domain/Network Meta */}
                        {result.analysis.domain_metadata && result.analysis.domain_metadata !== "NA" && (
                          <Card className="p-4 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                            <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-700 dark:text-slate-300">
                              <Globe className="w-4 h-4 text-blue-500" /> Web Infrastructure
                            </h4>
                            <div className="space-y-2 text-xs">
                              {result.analysis.domain_metadata.hosting_ip && (
                                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Hosting IP</span>
                                  <span className="font-mono font-medium">{result.analysis.domain_metadata.hosting_ip}</span>
                                </div>
                              )}
                              {result.analysis.domain_metadata.registrar && (
                                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Registrar</span>
                                  <span className="font-medium text-right max-w-[150px] truncate">{result.analysis.domain_metadata.registrar}</span>
                                </div>
                              )}
                              {result.analysis.domain_metadata.age_days !== null && (
                                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Domain Age</span>
                                  <span className="font-medium">{result.analysis.domain_metadata.age_days} days</span>
                                </div>
                              )}
                            </div>
                          </Card>
                        )}
                        
                        {/* Phone Meta */}
                        {result.analysis.phoneinfoga && result.analysis.phoneinfoga !== "NA" && result.analysis.phoneinfoga.status === "ok" && (
                          <Card className="p-4 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
                             <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-700 dark:text-slate-300">
                              <Smartphone className="w-4 h-4 text-emerald-500" /> Phone Intel
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Country</span>
                                  <span className="font-medium">{result.analysis.phoneinfoga.structured.country}</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Intl Format</span>
                                  <span className="font-mono font-medium">+{result.analysis.phoneinfoga.structured.international_number}</span>
                              </div>
                              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                                  <span className="text-slate-500">Valid Format</span>
                                  <span className="font-medium">{result.analysis.phoneinfoga.structured.valid_format ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          </Card>
                        )}
                        
                        {/* Website Meta */}
                        {result.analysis.website_analysis && result.analysis.website_analysis !== "NA" && result.analysis.website_analysis.status === "ok" && (
                          <Card className="p-4 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 md:col-span-2">
                             <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-700 dark:text-slate-300">
                              <Server className="w-4 h-4 text-purple-500" /> Website Content Analysis
                            </h4>
                            <div className="space-y-3">
                              {result.analysis.website_analysis.title && (
                                <div>
                                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">Title</span>
                                  <p className="text-xs truncate dark:text-slate-300">{result.analysis.website_analysis.title}</p>
                                </div>
                              )}
                              <div className="flex gap-4">
                                <div className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 ${result.analysis.website_analysis.login_form_detected ? "bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800" : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}>
                                    {result.analysis.website_analysis.login_form_detected ? "Login Form Detected" : "No Login Form"}
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 ${result.analysis.website_analysis.financial_keywords_detected ? "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800" : "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"}`}>
                                    {result.analysis.website_analysis.financial_keywords_detected ? "Financial Keywords Matched" : "No Financial Keywords"}
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </div>

                      <Card className="p-4 bg-slate-900 dark:bg-black rounded-xl overflow-hidden mt-4">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raw Core Output</span>
                        </div>
                        <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto p-2 bg-black/50 rounded-lg max-h-[300px] overflow-y-auto">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </Card>
                    </div>
                  )}

                  {/* Auto Mode Result parsing */}
                  {result.mode === "automation" && (
                    <div className="space-y-8">
                      {/* Summary Stats Grid */}
                      <Card className="p-5 bg-white dark:bg-surface-dark border-slate-200 dark:border-border-subtle shadow-lg">
                         <h4 className="text-sm font-bold flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-300 border-b border-primary/10 pb-2">
                           <Bot className="w-5 h-5 text-primary" /> Pattern Recognition Results
                         </h4>
                         
                         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                           {[
                             { label: 'Phones', icon: Smartphone, key: 'phones' },
                             { label: 'URLs', icon: LinkIcon, key: 'urls' },
                             { label: 'Domains', icon: Globe, key: 'domains' },
                             { label: 'APKs', icon: FileText, key: 'apks' },
                             { label: 'UPI IDs', icon: Activity, key: 'upi_ids' },
                             { label: 'Emails', icon: Search, key: 'emails' }
                           ].map((item) => {
                              const count = result.extracted_indicators?.[item.key]?.length || 0;
                              return (
                                <div key={item.key} className={`p-3 rounded-xl border ${count > 0 ? 'bg-primary/5 border-primary/20 dark:bg-primary/10' : 'bg-slate-50 border-slate-100 dark:bg-slate-900/40 dark:border-slate-800'} text-center transition-all`}>
                                    <span className={`block text-xl font-bold ${count > 0 ? 'text-primary' : 'text-slate-400'}`}>
                                      {count}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold flex justify-center items-center gap-1 mt-1">
                                      <item.icon className="w-3 h-3"/> {item.label}
                                    </span>
                                </div>
                              );
                           })}
                         </div>
                      </Card>

                      {/* Deep Analysis Cards */}
                      {/* Deep Analysis Cards */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300 ml-1">
                          <Activity className="w-4 h-4 text-red-500" /> Threat Analysis Breakdown
                        </h4>
                        <AnalysisResults results={result.analysis_results || []} />
                      </div>

                      {/* Display Extra OCR Entities (Simple Lists) */}
                      {(() => {
                         const extras = [
                            { k: 'pan_numbers', l: 'PAN Cards', i: <FileText className="w-3 h-3 text-blue-500"/> },
                            { k: 'aadhaar_numbers', l: 'Aadhaar Cards', i: <FileText className="w-3 h-3 text-orange-500"/> },
                            { k: 'vehicle_numbers', l: 'Vehicle Numbers', i: <CheckCircle2 className="w-3 h-3 text-slate-500"/> },
                            { k: 'card_numbers', l: 'Debit/Credit Cards', i: <Activity className="w-3 h-3 text-purple-500"/> },
                            { k: 'ifsc_codes', l: 'IFSC Codes', i: <Server className="w-3 h-3 text-indigo-500"/> }
                         ];
                         
                         const hasExtras = extras.some(e => result.extracted_indicators?.[e.k]?.length > 0);
                         
                         if (hasExtras) {
                           return (
                             <div className="space-y-4">
                               <h4 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300 ml-1">
                                 <FileText className="w-4 h-4 text-blue-500" /> Extracted Documents
                               </h4>
                               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                 {extras.map(e => {
                                    const items = result.extracted_indicators?.[e.k] || [];
                                    if(items.length === 0) return null;
                                    return (
                                       <Card key={e.k} className="p-4 bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800">
                                          <div className="flex items-center gap-2 mb-3">
                                             {e.i}
                                             <span className="text-xs font-bold uppercase text-slate-500">{e.l}</span>
                                             <span className="ml-auto bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-bold">{items.length}</span>
                                          </div>
                                          <div className="space-y-2">
                                             {items.map((val: string, i: number) => (
                                                <div key={i} className="font-mono text-sm font-medium bg-white dark:bg-slate-800 p-2 rounded border border-slate-100 dark:border-slate-700 select-all">
                                                   {val}
                                                </div>
                                             ))}
                                          </div>
                                       </Card>
                                    )
                                 })}
                               </div>
                             </div>
                           );
                         }
                         return null;
                      })()}
  
                      <Card className="p-4 bg-slate-900 dark:bg-black rounded-xl overflow-hidden mt-4">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Raw Subprocess Result</span>
                        </div>
                        <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto p-2 bg-black/50 rounded-lg max-h-[300px] overflow-y-auto">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      </Card>
                    </div>
                  )}
                  
                </div>
              ) : !isAnalyzing ? (
                <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-surface-dark/20 text-center p-8">
                  <div className="space-y-4 max-w-sm">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                      <ShieldAlert className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Awaiting Analysis</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Upload an image or specify an indicator on the left side to run Nodal Assistance, Pattern Recognition, and Threat Analysis.
                    </p>
                  </div>
                </div>
              ) : null}

              {/* Skeleton/Loading State */}
              {isAnalyzing && (
                <div className="space-y-6 animate-pulse">
                   <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-md mb-6"></div>
                   <Card className="p-6">
                      <div className="h-20 w-full bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-4"></div>
                      <div className="space-y-3 mt-8">
                        <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
                        <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
                        <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
                      </div>
                   </Card>
                   <Card className="p-6 bg-slate-50 dark:bg-slate-900/20">
                      <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md mb-4"></div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
                         <div className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
                      </div>
                   </Card>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
