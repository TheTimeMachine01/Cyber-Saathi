export default function SurveillanceLogs() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Surveillance Logs</h2>
      <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-6 shadow-sm dark:shadow-none">
        <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-slate-400">description</span>
            <p className="text-slate-500">Loading encrypted log stream...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
