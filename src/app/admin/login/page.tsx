import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/server/session';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const metadata = {
  title: 'Admin Enclave Authentication | WebMuse OS',
  description: 'Master administrative access deck for WebMuse Agency Operations.',
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-white/10 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Ambient Blurs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[10%] left-[25%] h-[450px] w-[450px] rounded-full bg-mesh-blue opacity-15 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[15%] right-[20%] h-[400px] w-[400px] rounded-full bg-mesh-purple opacity-10 blur-[160px]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <AdminLoginForm />
      </div>

      {/* Terminal Footer */}
      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs font-mono text-text-muted">
        WebMuse Agency Operating System (WM-OS) // Root Administrative Terminal
      </footer>
    </div>
  );
}
