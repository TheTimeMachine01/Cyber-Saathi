export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Platform Settings</h2>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Agent Profile</h3>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 overflow-hidden shrink-0">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxnD561ku33ee_9Yqu-DrvNwriHT_mAwukDXYzO3wpOn_qiMEzFIatwDkdgY7uIs2J5MvwUONSiBrAx8CQsKGBg4XaiF-l5V2SVDJCA3bn_fAtuATUPn7xywZZHhUiMOz3VtnVWJQ8MEmgcVjn_-WiDYg1QBNZ5-cAIB1Ugiafbns51rgOqAav2T7ySu3l8whODNkF4f2efzO_Bzj54yfInVFBvz0z6OjTqbP-sBiulNgrD_k7Kr7TUnK74E05ApjwjelAFyclmlEi"/>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                  <input type="text" defaultValue="Marcus Thorne" className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Badge Number</label>
                  <input type="text" defaultValue="#44921" disabled className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-surface-dark border border-primary/10 dark:border-border-subtle rounded-2xl p-6 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Security Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                <p className="text-xs text-slate-500">Require physical security key for high-clearance access.</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Encrypted Local Cache</p>
                <p className="text-xs text-slate-500">Store decrypted evidence buffers in memory only.</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
