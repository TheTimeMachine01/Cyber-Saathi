import { Suspense } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfile {
  fullName: string;
  badgeNumber: string;
  twoFactorEnabled: boolean;
  encryptedCacheEnabled: boolean;
  avatarUrl: string;
}

async function getProfileData(): Promise<UserProfile> {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
  return {
    fullName: "Marcus Thorne",
    badgeNumber: "#44921",
    twoFactorEnabled: true,
    encryptedCacheEnabled: false,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxnD561ku33ee_9Yqu-DrvNwriHT_mAwukDXYzO3wpOn_qiMEzFIatwDkdgY7uIs2J5MvwUONSiBrAx8CQsKGBg4XaiF-l5V2SVDJCA3bn_fAtuATUPn7xywZZHhUiMOz3VtnVWJQ8MEmgcVjn_-WiDYg1QBNZ5-cAIB1Ugiafbns51rgOqAav2T7ySu3l8whODNkF4f2efzO_Bzj54yfInVFBvz0z6OjTqbP-sBiulNgrD_k7Kr7TUnK74E05ApjwjelAFyclmlEi"
  };
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-full shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-16" /><Skeleton className="h-10 w-full" /></div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Security Preferences Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle><Skeleton className="h-6 w-48" /></CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}

async function SettingsContent() {
  const data = await getProfileData();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agent Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 overflow-hidden shrink-0 relative">
              <Image fill alt="User Profile" className="w-full h-full object-cover" src={data.avatarUrl} />
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-500">Full Name</label>
                  <Input id="fullName" defaultValue={data.fullName} className="bg-slate-50 dark:bg-black/20" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="badgeNumber" className="block text-xs font-bold text-slate-500">Badge Number</label>
                  <Input id="badgeNumber" defaultValue={data.badgeNumber} disabled className="bg-slate-50 dark:bg-black/20" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800/50">
            <div className="space-y-0.5">
              <label htmlFor="2fa" className="font-bold text-slate-900 dark:text-white block cursor-pointer">Two-Factor Authentication (2FA)</label>
              <p className="text-xs text-slate-500">Require physical security key for high-clearance access.</p>
            </div>
            <Switch id="2fa" defaultChecked={data.twoFactorEnabled} />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-100 dark:border-slate-800/50">
            <div className="space-y-0.5">
              <label htmlFor="encryptedCache" className="font-bold text-slate-900 dark:text-white block cursor-pointer">Encrypted Local Cache</label>
              <p className="text-xs text-slate-500">Store decrypted evidence buffers in memory only.</p>
            </div>
            <Switch id="encryptedCache" defaultChecked={data.encryptedCacheEnabled} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Platform Settings</h2>
      
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
