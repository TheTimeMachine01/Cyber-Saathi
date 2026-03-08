"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const handleCloseDropdowns = () => {
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden" onClick={handleCloseDropdowns}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 md:w-72 flex-shrink-0 border-r border-border-subtle bg-surface-dark flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-white">shield_person</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Cyber-Sathi AI</h1>
              <p className="hidden md:block text-xs text-slate-400 uppercase tracking-widest font-semibold">Federal Division</p>
            </div>
          </div>
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          <Link href="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">work</span>
            <span className="font-medium">Active Case</span>
          </Link>
          <Link href="/logs" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/logs" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">description</span>
            <span className="font-medium">Surveillance Logs</span>
          </Link>
          <Link href="/vault" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/vault" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">encrypted</span>
            <span className="font-medium">Evidence Vault</span>
          </Link>
          <Link href="/briefs" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/briefs" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">monitoring</span>
            <span className="font-medium">Intelligence Briefs</span>
          </Link>
          <div className="pt-8 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Administrative</div>
          <Link href="/audit" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/audit" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">history_edu</span>
            <span className="font-medium">Audit Trails</span>
          </Link>
          <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === "/settings" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Settings</span>
          </Link>
        </nav>
        
        <div className="p-6 hidden md:block">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-300">System Secure</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter">v2.4.1 Node Hash: 8842-XF</p>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-hidden relative pb-16 md:pb-0">
        
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-primary/10 dark:border-border-subtle bg-white/80 dark:bg-surface-dark backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Case ID: <span className="text-primary dark:text-white font-bold">#CS-8842</span></span>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-slate-500 dark:text-slate-400 text-sm">Financial Crimes Division</span>
            </div>
            <h1 className="md:hidden text-lg font-bold tracking-tight text-slate-900 dark:text-white">Cyber-Sathi</h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <button 
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsProfileOpen(false);
                }}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-white dark:border-surface-dark"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-subtle rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Recent Alerts</h4>
                  <div className="space-y-3">
                    <div className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg flex gap-3 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-accent-red">warning</span>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Suspicious transaction detected</p>
                        <p className="text-[10px] text-slate-500">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
            
            <div className="relative">
              <div 
                className="flex items-center gap-3 pl-2 cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
              >
                <div className="hidden md:block text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Agent Marcus Thorne</p>
                  <p className="text-[10px] text-slate-500">Badge #44921</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 overflow-hidden">
                  <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxnD561ku33ee_9Yqu-DrvNwriHT_mAwukDXYzO3wpOn_qiMEzFIatwDkdgY7uIs2J5MvwUONSiBrAx8CQsKGBg4XaiF-l5V2SVDJCA3bn_fAtuATUPn7xywZZHhUiMOz3VtnVWJQ8MEmgcVjn_-WiDYg1QBNZ5-cAIB1Ugiafbns51rgOqAav2T7ySu3l8whODNkF4f2efzO_Bzj54yfInVFBvz0z6OjTqbP-sBiulNgrD_k7Kr7TUnK74E05ApjwjelAFyclmlEi"/>
                </div>
              </div>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-slate-200 dark:border-border-subtle rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href="/settings" className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors" onClick={() => setIsProfileOpen(false)}>
                    Profile Settings
                  </Link>
                  <button className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-accent-red hover:text-white transition-colors border-t border-slate-100 dark:border-white/5">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar" id="main-content">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-dark border-t border-primary/10 dark:border-border-subtle flex items-center justify-around h-16 px-2 pb-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] dark:shadow-none">
        <Link href="/" className={`flex flex-col items-center justify-center gap-1 group transition-colors ${pathname === "/" ? "text-primary" : "text-slate-500 dark:text-slate-400 hover:text-primary"}`}>
          <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
            <span className={`material-symbols-outlined text-[24px] ${pathname === "/" ? "fill-[1]" : ""}`}>home</span>
          </div>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/alerts" className={`flex flex-col items-center justify-center gap-1 group transition-colors ${pathname === "/alerts" ? "text-primary" : "text-slate-500 dark:text-slate-400 hover:text-primary"}`}>
          <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
            <span className={`material-symbols-outlined text-[24px] ${pathname === "/alerts" ? "fill-[1]" : ""}`}>notifications</span>
          </div>
          <span className="text-[10px] font-medium">Alerts</span>
        </Link>
        <Link href="/logs" className={`flex flex-col items-center justify-center gap-1 group transition-colors ${pathname === "/logs" ? "text-primary" : "text-slate-500 dark:text-slate-400 hover:text-primary"}`}>
          <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
            <span className={`material-symbols-outlined text-[24px] ${pathname === "/logs" ? "fill-[1]" : ""}`}>history</span>
          </div>
          <span className="text-[10px] font-medium">Logs</span>
        </Link>
        <Link href="/settings" className={`flex flex-col items-center justify-center gap-1 group transition-colors ${pathname === "/settings" ? "text-primary" : "text-slate-500 dark:text-slate-400 hover:text-primary"}`}>
          <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
            <span className={`material-symbols-outlined text-[24px] ${pathname === "/settings" ? "fill-[1]" : ""}`}>settings</span>
          </div>
          <span className="text-[10px] font-medium">Config</span>
        </Link>
      </div>
    </div>
  );
}
