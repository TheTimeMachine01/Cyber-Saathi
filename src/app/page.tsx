"use client";

import { useState } from "react";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [caseData, setCaseData] = useState({
    status: "IDLE", // IDLE, ANALYZING, ACTIVE
    target: "Unknown",
    damage: "$0",
    correlations: 0,
    threatLevel: "LOW",
    modules: [] as { id: string, name: string, status: string, summary: string, icon: string, color: string }[],
    logs: [] as { time: string, message: string, sub: string, color: string }[],
    actions: [] as { title: string, context: string, colorClass: string, bgClass: string, borderClass: string }[]
  });

  const simulateUploadAndAnalysis = () => {
    setIsUploading(true);
    
    // Simulate OCR and LLM Extraction delay
    setTimeout(() => {
      setCaseData({
        status: "ACTIVE",
        target: "fakehotelbooking.com",
        damage: "₹50,000",
        correlations: 124,
        threatLevel: "CRITICAL",
        modules: [
          { id: "1", name: "Domain WHOIS Analyzer", status: "SCAN COMPLETE", summary: "Domain created 10 days ago. Hosted on DigitalOcean, Singapore.", icon: "public", color: "text-accent-green" },
          { id: "2", name: "IP Geo-Tagging", status: "LIVE TRACKING", summary: "IP 103.152.xx.xx mapped to AS3242. High-risk subnet.", icon: "map", color: "text-primary" },
          { id: "3", name: "Bank Trail Mapping", status: "ANOMALY FOUND", summary: "UPI 'hotelpay@upi' linked to suspected mule account with 12 prior reports.", icon: "account_tree", color: "text-accent-red" },
          { id: "4", name: "Phone Intelligence", status: "VERIFIED", summary: "+91 88XXXXXX registered in Bihar circle. 4 scams reported on Truecaller.", icon: "smartphone", color: "text-accent-red" },
        ],
        logs: [
          { time: "Just now", message: "Indicators Extracted via OCR", sub: "LLM Analysis Node", color: "bg-primary" },
          { time: "1min ago", message: "Evidence image uploaded", sub: "Agent Interface", color: "bg-slate-400" },
        ],
        actions: [
          { title: "Freeze Bank Account", context: "Target Node: UPI Mule Account", colorClass: "text-accent-red", bgClass: "bg-accent-red/5 dark:bg-accent-red/10 hover:bg-accent-red/10 dark:hover:bg-accent-red/20", borderClass: "border-accent-red/20" },
          { title: "Send Takedown Request", context: "DigitalOcean Abuse Portal", colorClass: "text-primary", bgClass: "bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20", borderClass: "border-primary/20" },
          { title: "Request Telecom KYC", context: "Airtel Nodal Officer", colorClass: "text-primary", bgClass: "bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20", borderClass: "border-primary/20" }
        ]
      });
      setIsUploading(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Case: Financial Fraud</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Target Entity: <span className="text-primary font-semibold underline underline-offset-4 cursor-pointer">{caseData.target}</span></p>
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto hide-scrollbar pb-2 md:pb-0">
          <button 
            onClick={simulateUploadAndAnalysis}
            disabled={isUploading}
            className="whitespace-nowrap px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
            )}
            {isUploading ? "Analyzing Evidence..." : "Upload Evidence"}
          </button>
          <button className="whitespace-nowrap px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg text-xs md:text-sm font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2 opacity-90 disabled:opacity-50" disabled={caseData.status === "IDLE"}>
            <span className="material-symbols-outlined text-sm">fact_check</span> Generate Brief
          </button>
        </div>
      </div>

      {caseData.status === "IDLE" && !isUploading && (
        <div className="bg-slate-100 dark:bg-surface-dark border-2 border-dashed border-slate-300 dark:border-border-subtle rounded-3xl p-12 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-400 mb-4">upload_file</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Initialize New Investigation</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-6">Upload an FIR screenshot or messaging app snippet. Cyber-Sathi AI will extract indicators and automatically launch relevant investigation modules.</p>
            <button onClick={simulateUploadAndAnalysis} className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                Start Analysis
            </button>
        </div>
      )}

      {isUploading && (
        <div className="space-y-6 animate-pulse">
            <div className="h-32 bg-slate-200 dark:bg-surface-dark rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-40 bg-slate-200 dark:bg-surface-dark rounded-2xl"></div>
                <div className="h-40 bg-slate-200 dark:bg-surface-dark rounded-2xl"></div>
                <div className="h-40 bg-slate-200 dark:bg-surface-dark rounded-2xl"></div>
            </div>
        </div>
      )}

      {caseData.status === "ACTIVE" && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-surface-dark p-5 md:p-6 rounded-2xl border border-primary/10 dark:border-border-subtle relative overflow-hidden shadow-sm dark:shadow-none">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
                <span className="material-symbols-outlined text-6xl">radar</span>
              </div>
              <p className="text-slate-500 text-xs md:text-sm font-semibold mb-1 uppercase tracking-wider">Intelligence Correlations</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{caseData.correlations} <span className="text-sm font-medium text-accent-green">+8%</span></h3>
              <p className="text-[10px] md:text-xs text-slate-500 mt-4">Multi-source OSINT footprint</p>
            </div>

            <div className="bg-white dark:bg-surface-dark p-5 md:p-6 rounded-2xl border border-primary/10 dark:border-border-subtle relative overflow-hidden shadow-sm dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 to-transparent"></div>
              <p className="text-slate-500 text-xs md:text-sm font-semibold mb-1 uppercase tracking-wider">Threat Level</p>
              <h3 className="text-3xl md:text-4xl font-black text-accent-red">{caseData.threatLevel}</h3>
              <div className="flex gap-1 mt-4">
                <div className="h-1.5 flex-1 bg-accent-red rounded-full"></div>
                <div className="h-1.5 flex-1 bg-accent-red rounded-full"></div>
                <div className="h-1.5 flex-1 bg-accent-red rounded-full"></div>
                <div className="h-1.5 flex-1 bg-accent-red/20 rounded-full"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-5 md:p-6 rounded-2xl border border-primary/10 dark:border-border-subtle relative overflow-hidden shadow-sm dark:shadow-none">
              <p className="text-slate-500 text-xs md:text-sm font-semibold mb-1 uppercase tracking-wider">Estimated Damage</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{caseData.damage}</h3>
              <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 mt-4 font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-accent-green">check_circle</span> Extracted from Evidence
              </p>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            { /* Left Content Column */ }
            <div className="flex-1 space-y-8">
              {/* Investigation Modules */}
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span> Investigation Modules Driven by LLM
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                  {caseData.modules.map((mod) => (
                    <div key={mod.id} className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-4 md:p-5 hover:border-primary/50 transition-colors shadow-sm dark:shadow-none cursor-pointer group flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <span className={`material-symbols-outlined ${mod.color}`}>{mod.icon}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${mod.color} bg-current/10 px-2 py-1 rounded saturate-200 opacity-80`}>{mod.status}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-sm md:text-base">{mod.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{mod.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Chat Interface */}
              <div className="mt-8 relative">
                <div className="bg-white dark:bg-surface-dark border border-primary/30 rounded-2xl shadow-lg md:shadow-2xl flex items-center gap-2 focus-within:ring-2 ring-primary/40 transition-all p-1 md:p-2 relative z-10 w-full">
                  <div className="p-2 md:p-3">
                    <span className="material-symbols-outlined text-primary">smart_toy</span>
                  </div>
                  <input className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder-slate-500 py-3 px-2 text-sm md:text-base w-full outline-none" placeholder="Ask Cyber-Sathi anything (e.g., 'Draft email to nodal officer'...)" type="text"/>
                  <button className="bg-primary hover:bg-primary/80 text-white p-2 md:p-3 rounded-xl transition-all flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm md:text-base">send</span>
                  </button>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-3xl blur-xl opacity-50 dark:opacity-20 -z-10"></div>
              </div>
            </div>

            {/* Right Sidebar Timeline */}
            <aside className="w-full xl:w-80 flex-shrink-0 bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-5 md:p-6 space-y-8">
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-primary">timeline</span> Intelligence Feed
                </h3>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200 dark:before:bg-slate-700">
                  {caseData.logs.map((log, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className={`absolute left-0 top-1 w-6 h-6 ${log.color} rounded-full border-4 border-white dark:border-surface-dark`}></div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{log.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{log.time} - {log.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-accent-green">bolt</span> Recommended Actions
                </h3>
                <div className="space-y-3">
                  {caseData.actions.map((act, idx) => (
                    <button key={idx} className={`w-full text-left p-3 rounded-xl ${act.bgClass} border ${act.borderClass} transition-all group`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${act.colorClass}`}>{act.title}</span>
                        <span className={`material-symbols-outlined text-sm ${act.colorClass} group-hover:translate-x-1 transition-transform`}>arrow_forward</span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">{act.context}</p>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
