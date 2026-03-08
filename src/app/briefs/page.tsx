import { Card, CardContent } from "@/components/ui/card";

export default function IntelligenceBriefs() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Intelligence Briefs</h2>
      <Card className="border-primary/10 dark:border-border-subtle shadow-sm dark:shadow-none bg-white dark:bg-surface-dark p-2">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-transparent">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">monitoring</span>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">Automated Threat Intel</h3>
            <p className="text-slate-500 max-w-md text-center">Compiling automated briefs from open-source intelligence and shared agency databases.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
