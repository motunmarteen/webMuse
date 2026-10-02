import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/server/session';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { ProjectGenesisWizard } from '@/components/admin/ProjectGenesisWizard';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Project Genesis Wizard | WebMuse OS',
  description: 'Initiate a new client project workspace and configure milestones.',
};

export default async function NewProjectGenesisPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white flex flex-col font-mono">
      {/* Background Subtle Meshes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[8%] left-[25%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-10 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[20%] right-[15%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-10 blur-[160px]"
          aria-hidden="true"
        />
      </div>

      <AdminNavbar adminEmail={session.email} />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Command Deck</span>
          </Link>
        </div>

        {/* Genesis Wizard Container */}
        <ProjectGenesisWizard />
      </main>

      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs text-text-muted">
        WebMuse Genesis Engine // Automated Workspace Provisioning
      </footer>
    </div>
  );
}
