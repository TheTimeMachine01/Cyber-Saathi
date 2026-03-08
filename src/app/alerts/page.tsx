import { Suspense } from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export interface AlertData {
  id: number;
  type: "warning" | "info" | "notification";
  title: string;
  priority: string | null;
  description: string;
  time: string;
  source: string;
}

// Mock data fetching
async function getAlerts(): Promise<AlertData[]> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return [
    {
      id: 1,
      type: "warning",
      title: "Suspicious Transaction Detected",
      priority: "High Priority",
      description: "Amount exceeding threshold detected in target node account XXXXX1234. Immediate review required.",
      time: "2 mins ago",
      source: "Automated Source"
    },
    {
      id: 2,
      type: "info",
      title: "Evidence Upload Completed",
      priority: "Update",
      description: "Bank statement processing (OCR + Analysis) completed successfully for Case #CS-8842.",
      time: "1 hr ago",
      source: "System"
    },
    {
      id: 3,
      type: "notification",
      title: "Routine Audit Scheduled",
      priority: null,
      description: "Automated system compliance check scheduled for 02:00 AM UTC.",
      time: "1 day ago",
      source: "Compliance"
    }
  ];
}

function AlertsSkeleton() {
  return (
    <Card className="overflow-hidden border-primary/10 dark:border-border-subtle shadow-sm dark:shadow-none bg-white dark:bg-surface-dark">
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {[1, 2, 3].map((i: number) => (
          <div key={i} className="p-4 flex gap-4">
            <div className="mt-1 flex-shrink-0">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex-1 space-y-3 mt-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

async function AlertsContent() {
  const alerts = await getAlerts();
  
  return (
    <Card className="overflow-hidden border-primary/10 dark:border-border-subtle shadow-sm dark:shadow-none bg-white dark:bg-surface-dark">
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {alerts.map((alert: AlertData) => (
          <div 
            key={alert.id}
            className={`p-4 transition-colors flex gap-4 ${
              alert.type === 'warning' ? 'bg-accent-red/5 hover:bg-accent-red/10' : 
              'hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            <div className="mt-1 flex-shrink-0">
              <span className={`material-symbols-outlined rounded-full p-2 ${
                alert.type === 'warning' ? 'text-accent-red bg-accent-red/10' :
                alert.type === 'info' ? 'text-accent-yellow bg-accent-yellow/10' :
                'text-primary bg-primary/10'
              }`}>
                {alert.type === 'warning' ? 'warning' : alert.type === 'info' ? 'info' : 'notifications'}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{alert.title}</h4>
                {alert.priority && (
                  <Badge variant="secondary" className={`text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none ${
                    alert.type === 'warning' ? 'bg-accent-red/20 text-accent-red hover:bg-accent-red/20' : 
                    'bg-accent-yellow/20 text-accent-yellow hover:bg-accent-yellow/20'
                  }`}>
                    {alert.priority}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{alert.description}</p>
              <p className="text-xs font-medium text-slate-400">{alert.time} • {alert.source}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Alerts() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-6">System Alerts</h2>
      
      <Suspense fallback={<AlertsSkeleton />}>
        <AlertsContent />
      </Suspense>
    </div>
  );
}
