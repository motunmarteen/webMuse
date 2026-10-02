import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/server/session';
import {
  getProjectsWithClients,
  getAgencyStats,
  getActivityLogs,
} from '@/lib/server/store';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { ProjectDataGrid } from '@/components/admin/ProjectDataGrid';
import {
  Activity,
  PlusCircle,
  Briefcase,
  Layers,
  Clock,
  CreditCard,
  DollarSign,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export const metadata = {
  title: 'Agency Command Center | WebMuse OS',
  description: 'Master administrative operational control deck for client engagements.',
};

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [projects, stats, activityLogs] = await Promise.all([
    getProjectsWithClients(),
    getAgencyStats(),
    getActivityLogs(),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white flex flex-col font-mono">
      {/* Background Ambient Meshes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[5%] left-[20%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-10 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[50%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-10 blur-[150px]"
          aria-hidden="true"
        />
      </div>

      <AdminNavbar adminEmail={session.email} />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Top Control Bar & Welcome Banner */}
        <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[11px] text-electric-blue font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                COMMAND ENCLAVE ONLINE // ALL SUBSYSTEMS GREEN
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-title tracking-tight">
                Agency Command Center
              </h1>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Oversee client engagements, manage milestone unlocking, audit encrypted secrets, and track multi-currency pipeline cash flow.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/projects/new"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-white/10"
              >
                <PlusCircle className="w-4 h-4 text-emerald-500" />
                <span>New Genesis Project</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: Active Retainers */}
          <div className="glassmorphism-card p-4 sm:p-5 rounded-2xl border border-card-border space-y-2">
            <div className="flex items-center justify-between text-text-muted text-[10px] uppercase">
              <span>Active Retainers</span>
              <Briefcase className="w-3.5 h-3.5 text-electric-blue" />
            </div>
            <div className="text-2xl font-bold font-display text-text-title">
              {stats.activeRetainers}
            </div>
            <div className="text-[10px] text-text-muted">
              {stats.totalProjects} total recorded
            </div>
          </div>

          {/* Card 2: Active Sprints */}
          <div className="glassmorphism-card p-4 sm:p-5 rounded-2xl border border-card-border space-y-2">
            <div className="flex items-center justify-between text-text-muted text-[10px] uppercase">
              <span>Active Sprints</span>
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-display text-text-title">
              {stats.activeSprints}
            </div>
            <div className="text-[10px] text-emerald-400">
              In-progress engineering
            </div>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="glassmorphism-card p-4 sm:p-5 rounded-2xl border border-card-border space-y-2">
            <div className="flex items-center justify-between text-text-muted text-[10px] uppercase">
              <span>Pending Approvals</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-display text-text-title">
              {stats.pendingApprovals}
            </div>
            <div className="text-[10px] text-amber-400">
              Under client review
            </div>
          </div>

          {/* Card 4: Awaiting Payment */}
          <div className="glassmorphism-card p-4 sm:p-5 rounded-2xl border border-card-border space-y-2">
            <div className="flex items-center justify-between text-text-muted text-[10px] uppercase">
              <span>Awaiting Payment</span>
              <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-display text-text-title">
              {stats.awaitingPayment}
            </div>
            <div className="text-[10px] text-text-muted">
              Gatekeeper phase locked
            </div>
          </div>

          {/* Card 5: Pipeline ARR/MRR */}
          <div className="glassmorphism-card p-4 sm:p-5 rounded-2xl border border-card-border space-y-2 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-text-muted text-[10px] uppercase">
              <span>Pipeline Volume</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold font-display text-text-title">
              ${stats.pipelineUsd.toLocaleString()}
            </div>
            <div className="text-[10px] text-electric-blue">
              ₦{(stats.pipelineNgn / 1000000).toFixed(1)}M NGN
            </div>
          </div>
        </section>

        {/* Project Data Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-electric-blue uppercase">
                ENGAGEMENT REGISTRY
              </span>
              <h2 className="text-xl font-bold font-display text-text-title mt-0.5">
                Client Workspace Pipeline
              </h2>
            </div>
            <div className="text-xs text-text-muted">
              {projects.length} Workspace{projects.length !== 1 ? 's' : ''} Provisioned
            </div>
          </div>

          <ProjectDataGrid projects={projects} />
        </section>

        {/* Recent Activity Audit Stream */}
        <section className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-4">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-title uppercase tracking-wider">
              <Activity className="w-4 h-4 text-electric-blue" />
              <span>Agency Audit & Telemetry Stream</span>
            </div>
            <span className="text-[10px] text-text-muted">
              Showing last {Math.min(activityLogs.length, 6)} operations
            </span>
          </div>

          <div className="space-y-2.5">
            {activityLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-4 p-3 rounded-xl bg-card-bg/50 border border-card-border/60 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-card-bg border border-card-border text-[9px] text-electric-blue font-bold uppercase">
                      {log.action}
                    </span>
                    <span className="text-foreground font-medium">{log.actorName}</span>
                  </div>
                  <p className="text-[11px] text-text-muted font-light">{log.details}</p>
                </div>
                <div className="text-[10px] text-text-muted whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs text-text-muted">
        WebMuse Agency Operating System (WM-OS) // Command Center Active
      </footer>
    </div>
  );
}
