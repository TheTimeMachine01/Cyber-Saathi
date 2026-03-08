export default function AuditTrails() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Audit Trails</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </div>
      <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-6 shadow-sm dark:shadow-none">
        <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-black/20">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">history_edu</span>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Immutable Logs</h3>
          <p className="text-slate-500 max-w-md text-center">Verifiable access logs for all chain-of-custody interactions within the system.</p>
        </div>
      </div>
    </div>
  );
}
