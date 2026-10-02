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

            {/* Quick External Links */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
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

          {/* Black Box Vault Secrets Summary */}
          <div className="glassmorphism-card rounded-2xl p-6 border border-card-border space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 font-bold text-text-title uppercase tracking-wider">
                <Database className="w-4 h-4 text-electric-blue" />
                <span>Black Box Vault Credential Registry</span>
              </div>
              <span className="text-[10px] text-emerald-400">
                {secrets.length} Secrets Encrypted (AES-256)
              </span>
            </div>

            {secrets.length === 0 ? (
              <p className="text-text-muted text-[11px] py-4">
                No technical secrets or staging keys stored yet for this project.
              </p>
            ) : (
              <div className="space-y-2">
                {secrets.map((sec) => (
                  <div
                    key={sec.id}
                    className="p-3 rounded-xl border border-card-border bg-card-bg/50 flex items-center justify-between text-[11px]"
                  >
                    <div>
                      <div className="text-foreground font-semibold">{sec.toolName}</div>
                      <div className="text-text-muted text-[10px]">
                        {sec.keyLabel} • Category: {sec.category}
                      </div>
                    </div>
                    <span className="text-[10px] text-electric-blue font-mono px-2 py-0.5 rounded bg-card-bg border border-card-border">
                      {sec.isClientVisible ? 'CLIENT VISIBLE' : 'AGENCY ONLY'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

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
