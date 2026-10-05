import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/server/session';
import {
  getProjectById,
  getClientById,
  getVaultSecrets,
  getActivityLogs,
} from '@/lib/server/store';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { MilestoneControlPanel } from '@/components/admin/MilestoneControlPanel';
import { AdminChatPanel } from '@/components/admin/AdminChatPanel';
import { BlackBoxVault } from '@/components/portal/BlackBoxVault';
import { ImpersonateButton } from '@/components/admin/ImpersonateButton';
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Lock,
  Database,
  FileText,
  Activity,
  Shield,
  Key,
  Globe,
  CreditCard,
  Award,
  Radio,
  CheckCircle2,
  Clock,
  Monitor,
  ShieldCheck,
} from 'lucide-react';

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-mono">
        <AdminNavbar adminEmail={session.email} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-red-400">
            !
          </div>
          <h1 className="text-xl font-bold font-display text-text-title">Project Record Not Found</h1>
          <p className="text-xs text-text-muted max-w-sm">
            The requested project ID &quot;{id}&quot; was not found in the WebMuse database enclave.
          </p>
          <Link
            href="/admin"
            className="text-xs text-electric-blue uppercase tracking-wider hover:underline"
          >
            Return to Command Deck
          </Link>
        </div>
      </div>
    );
  }

  const [client, secrets, activityLogs] = await Promise.all([
    getClientById(project.clientId),
    getVaultSecrets(project.id, false),
    getActivityLogs(project.id),
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
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Command Deck</span>
            <span className="text-card-border">/</span>
            <span className="text-foreground">{project.title}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">Slug:</span>
            <span className="text-electric-blue">/portal/{project.slug}</span>
          </div>
        </div>

        {/* Project Header Banner */}
        <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-semibold">
                <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-electric-blue">
                  {project.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-emerald-400">
                  STATUS: {project.status}
                </span>
                <span className="text-text-muted">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-title tracking-tight">
                {project.title}
              </h1>

              <p className="text-xs text-text-muted font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Quick External Links & Impersonate Button */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <ImpersonateButton
                projectId={project.id}
                projectSlug={project.slug}
                clientName={client?.name}
                variant="banner"
              />

              {project.stagingUrl && (
                <a
                  href={project.stagingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
                >
                  <span>Staging</span>
                  <ExternalLink className="w-3 h-3 text-electric-blue" />
                </a>
              )}

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
                >
                  <span>Repo</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              )}

              {project.designUrl && (
                <a
                  href={project.designUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
                >
                  <span>Figma</span>
                  <ExternalLink className="w-3 h-3 text-purple-400" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Admin Executive Client Journey Tracker HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-1">
            <span className="text-[10px] text-text-muted uppercase">1. Scope Sign-off</span>
            <div className="font-bold text-sm flex items-center gap-1.5">
              {project.prd.signedOffAt ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Signed &amp; Locked
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <Clock className="w-4 h-4 animate-pulse" /> Awaiting Client Signature
                </span>
              )}
            </div>
            <p className="text-[11px] text-text-muted">
              {project.prd.signedOffAt ? `By ${project.prd.signedOffBy}` : 'Scope v1.0 baseline review'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-1">
            <span className="text-[10px] text-text-muted uppercase">2. Active Sprint</span>
            <div className="font-bold text-sm text-electric-blue flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
              Phase 0{project.currentPhaseIndex + 1} Sprinted
            </div>
            <p className="text-[11px] text-text-muted line-clamp-1">
              {project.milestones[project.currentPhaseIndex]?.title || 'Conception'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-1">
            <span className="text-[10px] text-text-muted uppercase">3. Live Staging Deck</span>
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>Ready for QA</span>
            </div>
            <p className="text-[11px] text-text-muted">
              Viewport modes: Desktop, Tablet, Mobile
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card-bg border border-card-border space-y-1">
            <span className="text-[10px] text-text-muted uppercase">4. Warranty &amp; Handoff</span>
            <div className="font-bold text-sm text-purple-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>{project.warrantyDaysRemaining ?? 27} Days SLA</span>
            </div>
            <p className="text-[11px] text-text-muted">
              Hotline open for bug tickets
            </p>
          </div>
        </div>

        {/* Milestone Progression & Gatekeeper Engine (Client Component) */}
        <MilestoneControlPanel project={project} client={client} />

        {/* Scope PRD & Black Box Vault Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Living PRD Summary */}
          <div className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 font-bold text-text-title uppercase tracking-wider">
                <FileText className="w-4 h-4 text-electric-blue" />
                <span>Genesis PRD Canvas Baseline</span>
              </div>
              <span className="text-[10px] text-text-muted">v{project.prd.version}</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-text-muted uppercase">Problem Statement</span>
                <p className="text-foreground text-[11px] mt-0.5">{project.prd.problemStatement}</p>
              </div>

              <div>
                <span className="text-[10px] text-text-muted uppercase">Core Architecture</span>
                <p className="text-foreground text-[11px] mt-0.5">{project.prd.coreArchitecture}</p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-text-muted uppercase">Scope Creep Shield</span>
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  {project.prd.signedOffAt ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" />
                      Signed off on {new Date(project.prd.signedOffAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      Pending client digital sign-off (Scope v1.0 baseline)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Black Box Vault */}
          <div className="col-span-full">
            <BlackBoxVault project={project} isAdmin={true} />
          </div>
        </div>

        {/* Infrastructure, SaaS Subscriptions & Annual Retainer Control */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Domains */}
          <div className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-card-border">
              <div className="flex items-center gap-2 font-bold text-text-title">
                <Globe className="w-4 h-4 text-electric-blue" />
                <span>Domains &amp; SSL</span>
              </div>
              <span className="text-[10px] text-emerald-400">
                {(project.domains || []).length} Active
              </span>
            </div>
            <div className="space-y-2">
              {(project.domains || []).map((dom) => (
                <div
                  key={dom.id}
                  className="p-2.5 rounded-xl border border-card-border bg-card-bg/50 space-y-1 text-[11px]"
                >
                  <div className="font-bold text-foreground">{dom.domain}</div>
                  <div className="text-[10px] text-text-muted flex items-center justify-between">
                    <span>Exp: {new Date(dom.expiresAt).toLocaleDateString()}</span>
                    <span className="text-emerald-400">SSL {dom.sslStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions */}
          <div className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-card-border">
              <div className="flex items-center gap-2 font-bold text-text-title">
                <CreditCard className="w-4 h-4 text-electric-blue" />
                <span>SaaS Subscriptions</span>
              </div>
              <span className="text-[10px] text-electric-blue">
                {(project.subscriptions || []).length} Monitored
              </span>
            </div>
            <div className="space-y-2">
              {(project.subscriptions || []).slice(0, 3).map((sub) => (
                <div
                  key={sub.id}
                  className="p-2.5 rounded-xl border border-card-border bg-card-bg/50 space-y-1 text-[11px]"
                >
                  <div className="font-bold text-foreground flex items-center justify-between">
                    <span>{sub.name}</span>
                    <span className="text-text-muted text-[10px]">${sub.costUsd}/mo</span>
                  </div>
                  <div className="text-[10px] text-text-muted">
                    Renews: {new Date(sub.renewDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Retainer */}
          <div className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-card-border">
              <div className="flex items-center gap-2 font-bold text-text-title">
                <Award className="w-4 h-4 text-electric-blue" />
                <span>Annual SLA Retainer</span>
              </div>
              <span className="text-[10px] text-emerald-400 uppercase">
                {project.maintenanceRetainer?.status || 'Active'}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-card-border bg-card-bg/50 space-y-2 text-[11px]">
              <div className="font-bold text-foreground">
                {project.maintenanceRetainer?.tierName || 'WebMuse Mission Critical 24/7 SLA'}
              </div>
              <div className="text-[10px] text-text-muted">
                {project.maintenanceRetainer?.slaResponseTime}
              </div>
              <div className="text-[10px] text-electric-blue">
                ${project.maintenanceRetainer?.annualCostUsd?.toLocaleString()} / year (₦{project.maintenanceRetainer?.annualCostNgn?.toLocaleString()})
              </div>
            </div>
          </div>
        </div>

        {/* Agency Client Direct Comms Chat */}
        <AdminChatPanel project={project} client={client} adminEmail={session.email} />

        {/* Project Audit Log Stream */}
        <section className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-4">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-title uppercase tracking-wider">
              <Activity className="w-4 h-4 text-electric-blue" />
              <span>Project Audit Stream</span>
            </div>
            <span className="text-[10px] text-text-muted">
              {activityLogs.length} events logged
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-4 p-3 rounded-xl bg-card-bg/50 border border-card-border/60"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-card-bg border border-card-border text-[9px] text-electric-blue font-bold uppercase">
                      {log.action}
                    </span>
                    <span className="text-foreground font-medium">{log.actorName}</span>
                  </div>
                  <p className="text-[11px] text-text-muted font-light">{log.details}</p>
                </div>
                <div className="text-[10px] text-text-muted whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs text-text-muted">
        WebMuse Agency Operating System (WM-OS) // Project Controller Active
      </footer>
    </div>
  );
}
