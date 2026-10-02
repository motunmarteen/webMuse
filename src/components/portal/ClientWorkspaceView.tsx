'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Project, Client, Milestone, PRDDocument } from '@/lib/types/portal';
import { LogoutButton } from '@/components/portal/LogoutButton';
import { DynamicStatusBanner } from '@/components/portal/DynamicStatusBanner';
import { MilestoneStepper } from '@/components/portal/MilestoneStepper';
import { GenesisPRDCanvas } from '@/components/portal/GenesisPRDCanvas';
import { DeliverablesChecklist } from '@/components/portal/DeliverablesChecklist';
import {
  ShieldCheck,
  ShieldAlert,
  ExternalLink,
  Code2,
  Lock,
  Layers,
  FileText,
  Activity,
  CheckCircle2,
  Calendar,
  DollarSign,
  Sparkles,
} from 'lucide-react';

interface ClientWorkspaceViewProps {
  initialProject: Project;
  client: Client | null;
  clientEmail: string;
  isImpersonating?: boolean;
}

export function ClientWorkspaceView({
  initialProject,
  client,
  clientEmail,
  isImpersonating,
}: ClientWorkspaceViewProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(
    project.currentPhaseIndex
  );
  const [activeTab, setActiveTab] = useState<'sprint' | 'prd' | 'overview'>('sprint');

  const selectedMilestone = project.milestones[selectedMilestoneIndex] || project.milestones[0];
  const activeMilestone = project.milestones[project.currentPhaseIndex] || project.milestones[0];
  const isPrdSignedOff = !!project.prd.signedOffAt;

  const handleScopeSignedOff = (updatedPrd: PRDDocument) => {
    setProject((prev) => ({
      ...prev,
      prd: updatedPrd,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white flex flex-col font-mono">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[5%] left-[20%] h-[420px] w-[420px] rounded-full bg-mesh-blue opacity-15 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-[50%] right-[10%] h-[380px] w-[380px] rounded-full bg-mesh-purple opacity-10 blur-[150px]"
          aria-hidden="true"
        />
      </div>

      {/* Impersonation Banner if Agency Member is previewing */}
      {isImpersonating && (
        <div className="relative z-30 bg-electric-blue/15 border-b border-electric-blue/40 px-4 py-2 text-center text-xs text-electric-blue flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
          <span>AGENCY IMPERSONATION MODE: Viewing portal as client ({clientEmail})</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="relative z-20 border-b border-card-border bg-background/85 backdrop-blur-xl sticky top-0 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-display font-black text-lg tracking-wider text-foreground">
                WEBMUSE<span className="text-electric-blue">.</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] text-electric-blue font-semibold tracking-widest uppercase">
                PORTAL
              </span>
            </Link>

            <div className="hidden md:flex items-center text-card-border">/</div>

            <div className="hidden md:flex items-center gap-2 text-xs text-text-muted">
              <span className="text-foreground font-medium">{project.title}</span>
              <span className="px-2 py-0.5 rounded-full border border-card-border bg-card-bg text-[10px] text-emerald-400 uppercase">
                {project.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Connection Status */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-card-border bg-card-bg text-[11px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TLS ENCRYPTED</span>
            </div>

            {/* Client Identity Pill */}
            <div className="hidden sm:flex items-center gap-2.5 text-right font-mono">
              <div>
                <div className="text-xs text-foreground font-medium">
                  {client?.name || clientEmail}
                </div>
                <div className="text-[10px] text-text-muted">
                  {client?.company || 'Project Partner'}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-card-border bg-card-bg flex items-center justify-center text-electric-blue text-xs font-bold">
                {client?.name ? client.name.charAt(0) : 'C'}
              </div>
            </div>

            <div className="h-4 w-px bg-card-border hidden sm:block" />

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Project Header Deck */}
        <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-[11px] text-electric-blue font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue" />
                CLIENT WORKSPACE ACTIVE // PHASE 0{project.currentPhaseIndex + 1}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-title tracking-tight">
                {project.title}
              </h1>

              <p className="text-xs text-text-muted font-light leading-relaxed">
                {project.tagline ? `${project.tagline} — ` : ''}
                {project.description}
              </p>
            </div>

            {/* Quick External Links & Live Assets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {project.stagingUrl && (
                <a
                  href={project.stagingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-electric-blue/40 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/20 transition-colors"
                >
                  <span>Staging Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.designUrl && (
                <a
                  href={project.designUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
                >
                  <span>Figma Deck</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Context-Aware Action Banner */}
        <DynamicStatusBanner
          project={project}
          activeMilestone={activeMilestone}
          onOpenPRD={() => setActiveTab('prd')}
        />

        {/* Workspace Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-card-border pb-2 text-xs">
          <button
            onClick={() => setActiveTab('sprint')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'sprint'
                ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sprint & Milestones</span>
          </button>

          <button
            onClick={() => setActiveTab('prd')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'prd'
                ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Genesis PRD (v{project.prd.version})</span>
            {isPrdSignedOff ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-card-bg border border-card-border text-electric-blue font-bold shadow-md'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Tech Universe</span>
          </button>
        </div>

        {/* ================= TAB 1: SPRINT & MILESTONES ================= */}
        {activeTab === 'sprint' && (
          <div className="space-y-8 animate-fade-in">
            {/* Interactive Milestone Progression Stepper */}
            <MilestoneStepper
              project={project}
              selectedMilestoneIndex={selectedMilestoneIndex}
              onSelectMilestone={setSelectedMilestoneIndex}
            />

            {/* Granular Deliverables Checklist for the selected milestone */}
            <DeliverablesChecklist
              milestone={selectedMilestone}
              isLocked={selectedMilestone.status === 'locked'}
              stagingUrl={project.stagingUrl}
              repoUrl={project.repoUrl}
              designUrl={project.designUrl}
            />
          </div>
        )}

        {/* ================= TAB 2: LIVING GENESIS PRD ================= */}
        {activeTab === 'prd' && (
          <div className="animate-fade-in">
            <GenesisPRDCanvas
              project={project}
              onScopeSignedOff={handleScopeSignedOff}
            />
          </div>
        )}

        {/* ================= TAB 3: TECH UNIVERSE & SPECS ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  TECHNOLOGY BLUEPRINT
                </span>
                <h3 className="text-xl font-bold font-display text-text-title">
                  Curated Technical Architecture
                </h3>
                <p className="text-text-muted font-light leading-relaxed max-w-2xl">
                  Enterprise full-stack infrastructure provisioned specifically for {project.title}.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.techStack.map((tech) => (
                  <div
                    key={tech}
                    className="p-4 rounded-xl border border-card-border bg-card-bg/60 flex items-center gap-2.5"
                  >
                    <Code2 className="w-4 h-4 text-electric-blue" />
                    <span className="text-foreground font-semibold">{tech}</span>
                  </div>
                ))}
              </div>

              {/* Engagement Financial Baseline */}
              <div className="pt-6 border-t border-card-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-text-muted uppercase">Total Budget Baseline</div>
                  <div className="text-lg font-bold text-foreground">
                    ${project.totalBudgetUsd?.toLocaleString()}{' '}
                    <span className="text-electric-blue font-normal">
                      (₦{project.totalBudgetNgn?.toLocaleString()})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-text-muted">Multi-Rail Payment Rails Integrated</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs text-text-muted">
        WebMuse Client Workflow Operating System (WM-OS) // Phase 3 Active
      </footer>
    </div>
  );
}
