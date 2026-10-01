import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getClientSession } from '@/lib/server/session';
import { getProjectBySlug, getClientById } from '@/lib/server/store';
import { LogoutButton } from '@/components/portal/LogoutButton';
import {
  ShieldCheck,
  Lock,
  Code2,
  CheckCircle2,
  Hourglass,
  Database,
  Key,
} from 'lucide-react';

export default async function ProjectPortalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getClientSession();

  if (!session) {
    redirect(`/portal/login?redirect=/portal/${slug}`);
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-red-400 mb-4">
          !
        </div>
        <h1 className="text-xl font-bold mb-2 font-display text-text-title">Project Not Found</h1>
        <p className="text-xs text-text-muted max-w-sm mb-6">
          The requested project workspace slug &quot;{slug}&quot; could not be located in the WebMuse database.
        </p>
        <Link
          href="/portal/login"
          className="text-xs text-electric-blue uppercase tracking-wider hover:underline"
        >
          Return to Portal Login
        </Link>
      </div>
    );
  }

  // Ensure client only accesses their authorized project unless they have an admin session
  if (session.role === 'client' && session.projectSlug && session.projectSlug !== slug) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center font-mono">
        <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-muted mb-4">
          <Lock className="w-6 h-6 text-electric-blue" />
        </div>
        <h1 className="text-xl font-bold mb-2 font-display text-text-title">Workspace Access Restricted</h1>
        <p className="text-xs text-text-muted max-w-sm mb-6">
          Your active session does not have access permissions for &quot;{slug}&quot;.
        </p>
        <div className="flex gap-4">
          <Link
            href={`/portal/${session.projectSlug}`}
            className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-zinc-200 transition-colors"
          >
            Go to Your Project ({session.projectSlug})
          </Link>
          <LogoutButton />
        </div>
      </div>
    );
  }

  const client = await getClientById(project.clientId);
  const activeMilestone = project.milestones[project.currentPhaseIndex] || project.milestones[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white flex flex-col">
      {/* Background Subtle Meshes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[20%] h-[400px] w-[400px] rounded-full bg-mesh-blue opacity-15 blur-[140px]" aria-hidden="true" />
        <div className="absolute top-[50%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-10 blur-[150px]" aria-hidden="true" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 border-b border-card-border bg-background/80 backdrop-blur-xl sticky top-0 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display font-black text-lg tracking-wider text-foreground">
                WEBMUSE<span className="text-electric-blue">.</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] font-mono text-electric-blue font-semibold tracking-widest uppercase">
                PORTAL
              </span>
            </Link>
            <div className="hidden md:flex items-center text-card-border font-mono text-xs">/</div>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="text-foreground font-medium">{project.title}</span>
              <span className="px-2 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] font-mono text-text-muted uppercase">
                {project.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Authenticated Client Identity */}
            <div className="hidden sm:flex items-center gap-3 text-right font-mono">
              <div>
                <div className="text-xs text-foreground font-medium">{client?.name || session.email}</div>
                <div className="text-[10px] text-text-muted">{client?.company || 'Project Partner'}</div>
              </div>
              <div className="w-8 h-8 rounded-full border border-card-border bg-card-bg flex items-center justify-center text-electric-blue text-xs font-bold font-mono">
                {client?.name ? client.name.charAt(0) : 'C'}
              </div>
            </div>

            <div className="h-4 w-px bg-card-border hidden sm:block" />

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 space-y-10">
        {/* Project Header Banner */}
        <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] font-semibold tracking-widest text-electric-blue uppercase font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                WORKSPACE ACTIVE // PHASE 01 ONLINE
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-title tracking-tight">
                {project.title}
              </h1>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-3 rounded-xl border border-card-border bg-card-bg font-mono text-xs">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Authenticated Session
                </div>
                <div className="text-foreground flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-electric-blue" />
                  <span>{session.email}</span>
                </div>
              </div>

              <div className="px-4 py-3 rounded-xl border border-card-border bg-card-bg font-mono text-xs">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Active Milestone
                </div>
                <div className="text-foreground flex items-center gap-1.5 font-medium">
                  <Hourglass className="w-3.5 h-3.5 text-electric-blue" />
                  <span>Phase {project.currentPhaseIndex + 1}: {activeMilestone.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Progression Grid (Styled like WebMuse OurProcess) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-electric-blue uppercase font-mono">
                DELIVERY FRAMEWORK
              </span>
              <h2 className="text-xl font-bold font-display text-text-title mt-1">
                Project Milestone Pipeline
              </h2>
            </div>
            <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
              {project.milestones.length} Phases Total
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {project.milestones.map((m, idx) => {
              const isActive = idx === project.currentPhaseIndex;
              const isCompleted = m.status === 'completed';

              return (
                <div
                  key={m.id}
                  className={`glassmorphism-card rounded-2xl p-5 relative overflow-hidden transition-all flex flex-col justify-between ${
                    isActive
                      ? 'border-electric-blue/40 shadow-lg'
                      : isCompleted
                      ? 'border-emerald-500/30'
                      : 'opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                      <span className="text-text-muted uppercase font-bold">PHASE 0{m.phaseNumber}</span>
                      {isActive ? (
                        <span className="text-electric-blue flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                          ACTIVE
                        </span>
                      ) : isCompleted ? (
                        <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" />
                          DONE
                        </span>
                      ) : (
                        <span className="text-text-muted flex items-center gap-1 text-[10px] uppercase tracking-wider">
                          <Lock className="w-3 h-3" />
                          LOCKED
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-text-title mb-1 line-clamp-1">
                      {m.title}
                    </div>
                    <div className="text-xs text-text-muted font-light line-clamp-2 mb-4 leading-relaxed">
                      {m.subtitle}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-card-border flex items-center justify-between text-xs font-mono text-text-muted">
                    <span>${m.costUsd.toLocaleString()}</span>
                    <span>~{m.targetCompletionDays}d</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* System Verification Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Anti-Self-Signup & Auth */}
          <div className="glassmorphism-card p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl border border-card-border bg-card-bg flex items-center justify-center text-electric-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-title mb-1">Agency-Governed Access</h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Anti-self-signup rule active. Unauthorized emails submitting to the portal are rejected with HTTP 403. Only agency-initiated accounts can generate magic tokens.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Guardrails Enforced</span>
            </div>
          </div>

          {/* Card 2: Cryptographic Tokens & Cookie Sessions */}
          <div className="glassmorphism-card p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl border border-card-border bg-card-bg flex items-center justify-center text-electric-blue">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-title mb-1">Cryptographic Sessions</h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Tokens generated via 32-byte CSPRNG with SHA-256 digests. Sessions secured with HMAC-SHA256 signed HTTP-only cookies (<span className="text-foreground font-mono">wm_client_session</span>).
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Session Authenticated</span>
            </div>
          </div>

          {/* Card 3: Black Box Secret Store & Models */}
          <div className="glassmorphism-card p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl border border-card-border bg-card-bg flex items-center justify-center text-electric-blue">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-title mb-1">Data Engine & AES-256</h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Persistent local JSON engine with schema models for Clients, Projects, Milestones, and zero-knowledge encrypted vault secrets.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-text-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Store & AES-256 Ready</span>
            </div>
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="glassmorphism-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl border border-card-border bg-card-bg text-electric-blue">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-electric-blue uppercase tracking-widest font-semibold">
                TECH UNIVERSE
              </div>
              <div className="text-sm font-semibold text-text-title">Active Project Stack</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full border border-card-border bg-card-bg text-xs font-mono text-text-muted hover:text-foreground transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-card-border py-6 px-4 sm:px-8 text-center text-xs font-mono text-text-muted">
        WebMuse Client Workflow Operating System (WM-OS) // Phase 1 Complete
      </footer>
    </div>
  );
}
