export default function Alerts() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">System Alerts</h2>
      
      <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
          <div className="p-4 bg-accent-red/5 hover:bg-accent-red/10 transition-colors flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <span className="material-symbols-outlined text-accent-red rounded-full bg-accent-red/10 p-2">warning</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Suspicious Transaction Detected</h4>
                <span className="px-2 py-0.5 bg-accent-red/20 text-accent-red text-[10px] font-bold rounded-full uppercase">High Priority</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Amount exceeding threshold detected in target node account XXXXX1234. Immediate review required.</p>
              <p className="text-xs font-medium text-slate-400">2 mins ago • Automated Source</p>
            </div>
          </div>

          <div className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <span className="material-symbols-outlined text-accent-yellow rounded-full bg-accent-yellow/10 p-2">info</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Evidence Upload Completed</h4>
                <span className="px-2 py-0.5 bg-accent-yellow/20 text-accent-yellow text-[10px] font-bold rounded-full uppercase">Update</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Bank statement processing (OCR + Analysis) completed successfully for Case #CS-8842.</p>
              <p className="text-xs font-medium text-slate-400">1 hr ago • System</p>
            </div>
          </div>
          
          <div className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <span className="material-symbols-outlined text-primary rounded-full bg-primary/10 p-2">notifications</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 dark:text-white">Routine Audit Scheduled</h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Automated system compliance check scheduled for 02:00 AM UTC.</p>
              <p className="text-xs font-medium text-slate-400">1 day ago • Compliance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
