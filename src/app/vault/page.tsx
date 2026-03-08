export default function EvidenceVault() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Evidence Vault</h2>
      <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-6 shadow-sm dark:shadow-none">
        <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-black/20">
          <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">encrypted</span>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Secure Storage</h3>
          <p className="text-slate-500 max-w-md text-center">All evidentiary files are encrypted at rest. Upload or request access to decrypted buffers here.</p>
        </div>
      </div>
    </div>
  );
}
