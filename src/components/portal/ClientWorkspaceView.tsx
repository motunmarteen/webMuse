'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Project, Client, Milestone, PRDDocument, AgencyDocument } from '@/lib/types/portal';
import { LogoutButton } from '@/components/portal/LogoutButton';
import { ProjectCockpit } from '@/components/portal/ProjectCockpit';
import { GuidedWalkthroughModal } from '@/components/portal/GuidedWalkthroughModal';
import { MilestoneStepper } from '@/components/portal/MilestoneStepper';
import { GenesisPRDCanvas } from '@/components/portal/GenesisPRDCanvas';
import { DeliverablesChecklist } from '@/components/portal/DeliverablesChecklist';
import { StagingReviewStudio } from '@/components/portal/StagingReviewStudio';
import { BlackBoxVault } from '@/components/portal/BlackBoxVault';
import { HandoffDigitalSafe } from '@/components/portal/HandoffDigitalSafe';
import { InfrastructureSentinel } from '@/components/portal/InfrastructureSentinel';
import { DocumentEnclave } from '@/components/portal/DocumentEnclave';
import { AgencyCommsHub } from '@/components/portal/AgencyCommsHub';
import { MusePilotAssistant } from '@/components/portal/MusePilotAssistant';
import { AddonMarketplace } from '@/components/portal/AddonMarketplace';
import { AnnualMaintenanceDesk } from '@/components/portal/AnnualMaintenanceDesk';
import { MultiRailCheckoutModal } from '@/components/portal/MultiRailCheckoutModal';
import {
  Layers,
  Monitor,
  Key,
  MessageSquare,
  Sparkles,
  HelpCircle,
  PackageCheck,
  FileText,
  Radio,
  FolderLock,
  ExternalLink,
  Activity,
  ShoppingBag,
  Clock,
  Award,
  Bot,
  Server,
} from 'lucide-react';

interface ClientWorkspaceViewProps {
  initialProject: Project;
  client: Client | null;
  clientEmail: string;
  initialDocuments?: AgencyDocument[];
  isImpersonating?: boolean;
}

export function ClientWorkspaceView({
  initialProject,
  client,
  clientEmail,
  initialDocuments = [],
  isImpersonating,
}: ClientWorkspaceViewProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [documents, setDocuments] = useState<AgencyDocument[]>(initialDocuments);
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(
    project.currentPhaseIndex
  );

  // 5 High-Level Workspace Pillars (Consolidating the previous 12 confusing tabs)
  const [activeWorkspace, setActiveWorkspace] = useState<
    'cockpit' | 'build' | 'safe' | 'comms' | 'growth'
  >('cockpit');

  // Sub-navigation state within each workspace pillar
  const [buildSubTab, setBuildSubTab] = useState<'milestones' | 'staging' | 'prd'>('milestones');
  const [safeSubTab, setSafeSubTab] = useState<'credentials' | 'handoff' | 'domains' | 'docs'>('credentials');
  const [commsSubTab, setCommsSubTab] = useState<'chat' | 'pilot'>('chat');
  const [growthSubTab, setGrowthSubTab] = useState<'addons' | 'warranty' | 'retainer'>('addons');

  // Guided Walkthrough Modal
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  // Checkout modal
  const [checkoutMilestone, setCheckoutMilestone] = useState<Milestone | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleRefreshProject = async () => {
    try {
      const res = await fetch(`/api/portal/project?id=${project.id}`);
      const data = await res.json();
      if (data.ok && data.data) {
        setProject(data.data);
      }
    } catch (err) {
      console.error('Failed to reload project:', err);
    }
  };

  const handleOpenCheckout = (m: Milestone) => {
    setCheckoutMilestone(m);
    setIsCheckoutOpen(true);
  };

  const handleScopeSignedOff = (updatedPrd: PRDDocument) => {
    setProject((prev) => ({
      ...prev,
      prd: updatedPrd,
    }));
  };

  const handleOpenPRD = () => {
    setActiveWorkspace('build');
    setBuildSubTab('prd');
  };

  const selectedMilestone = project.milestones[selectedMilestoneIndex] || project.milestones[0];

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
          <span>AGENCY IMPERSONATION MODE: Viewing workspace as client ({clientEmail})</span>
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

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Guide Button for Founders */}
            <button
              onClick={() => setIsWalkthroughOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 hover:border-cyan-400 bg-cyan-500/15 text-cyan-300 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Founder Guide (Start Here)</span>
            </button>

            {/* Platform Manual (Printable PDF / Full Guide) */}
            <Link
              href="/manual"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-card-border hover:border-electric-blue bg-card-bg text-text-muted hover:text-foreground text-xs font-semibold transition-all"
              title="Open full printable Operational Manual (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-electric-blue" />
              <span className="hidden sm:inline">Platform Manual</span>
            </Link>

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
                FOUNDER OS // PHASE 0{project.currentPhaseIndex + 1} SPRINTING
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-title tracking-tight">
                {project.title}
              </h1>

              <p className="text-xs text-text-muted font-light leading-relaxed">
                {project.tagline ? `${project.tagline} — ` : ''}
                {project.description}
              </p>
            </div>

            {/* Quick Live Preview Launchers */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {project.stagingUrl && (
                <button
                  onClick={() => {
                    setActiveWorkspace('build');
                    setBuildSubTab('staging');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-electric-blue/40 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/20 transition-colors"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Staging Studio</span>
                </button>
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

        {/* ========================================================================= */}
        {/* 5-PILLAR EXECUTIVE WORKSPACE NAVIGATION (All visible, NO horizontal scrolling) */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center gap-2 border-b border-card-border pb-3 text-xs">
          <button
            onClick={() => setActiveWorkspace('cockpit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'cockpit'
                ? 'bg-card-bg border border-cyan-500/50 text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Project Cockpit</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveWorkspace('build')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'build'
                ? 'bg-card-bg border border-electric-blue text-electric-blue font-bold shadow-[0_0_15px_rgba(0,180,255,0.2)]'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Layers className="w-4 h-4 text-electric-blue" />
            <span>Delivery &amp; Staging Deck</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-electric-blue/15 text-electric-blue font-mono">
              Build
            </span>
          </button>

          <button
            onClick={() => setActiveWorkspace('safe')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'safe'
                ? 'bg-card-bg border border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Key className="w-4 h-4 text-emerald-400" />
            <span>Security &amp; Handoff Safe</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={() => setActiveWorkspace('comms')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'comms'
                ? 'bg-card-bg border border-blue-500/50 text-blue-300 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Team Comms &amp; Muse AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveWorkspace('growth')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
              activeWorkspace === 'growth'
                ? 'bg-card-bg border border-purple-500/50 text-purple-300 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'text-text-muted hover:text-foreground'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Add-on Shop &amp; SLA</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 font-mono">
              Upgrades
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PILLAR 1: PROJECT COCKPIT (Executive Action Center)                       */}
        {/* ========================================================================= */}
        {activeWorkspace === 'cockpit' && (
          <div className="animate-fade-in">
            <ProjectCockpit
              project={project}
              client={client}
              onNavigateTab={(tab) => setActiveWorkspace(tab)}
              onOpenCheckout={handleOpenCheckout}
              onOpenPRD={handleOpenPRD}
              onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 2: DELIVERY & STAGING DECK                                         */}
        {/* ========================================================================= */}
        {activeWorkspace === 'build' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tab Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-card-bg/60 border border-card-border text-xs">
              <button
                onClick={() => setBuildSubTab('milestones')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  buildSubTab === 'milestones'
                    ? 'bg-electric-blue text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Sprint Deliverables Checklist</span>
              </button>

              <button
                onClick={() => setBuildSubTab('staging')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  buildSubTab === 'staging'
                    ? 'bg-electric-blue text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Live Staging Review Studio</span>
              </button>

              <button
                onClick={() => setBuildSubTab('prd')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  buildSubTab === 'prd'
                    ? 'bg-electric-blue text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Genesis PRD Scope v{project.prd.version}</span>
                {project.prd.signedOffAt && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            </div>

            {/* Sub-tab 1: Milestones & Deliverables */}
            {buildSubTab === 'milestones' && (
              <div className="space-y-8 animate-fade-in">
                <MilestoneStepper
                  project={project}
                  selectedMilestoneIndex={selectedMilestoneIndex}
                  onSelectMilestone={setSelectedMilestoneIndex}
                  onOpenCheckout={handleOpenCheckout}
                />

                <DeliverablesChecklist
                  milestone={selectedMilestone}
                  isLocked={selectedMilestone.status === 'locked'}
                  stagingUrl={project.stagingUrl}
                  repoUrl={project.repoUrl}
                  designUrl={project.designUrl}
                  onOpenCheckout={handleOpenCheckout}
                />
              </div>
            )}

            {/* Sub-tab 2: Live Staging Studio */}
            {buildSubTab === 'staging' && (
              <div className="animate-fade-in">
                <StagingReviewStudio project={project} clientEmail={clientEmail} />
              </div>
            )}

            {/* Sub-tab 3: Genesis PRD */}
            {buildSubTab === 'prd' && (
              <div className="animate-fade-in">
                <GenesisPRDCanvas project={project} onScopeSignedOff={handleScopeSignedOff} />
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 3: SECURITY & HANDOFF SAFE                                         */}
        {/* ========================================================================= */}
        {activeWorkspace === 'safe' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tab Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-card-bg/60 border border-card-border text-xs">
              <button
                onClick={() => setSafeSubTab('credentials')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  safeSubTab === 'credentials'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Encrypted Vault Passwords</span>
              </button>

              <button
                onClick={() => setSafeSubTab('handoff')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  safeSubTab === 'handoff'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <PackageCheck className="w-3.5 h-3.5" />
                <span>Master Release &amp; GitHub Transfer</span>
              </button>

              <button
                onClick={() => setSafeSubTab('domains')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  safeSubTab === 'domains'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                <span>Domains &amp; Subscriptions</span>
              </button>

              <button
                onClick={() => setSafeSubTab('docs')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  safeSubTab === 'docs'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <FolderLock className="w-3.5 h-3.5" />
                <span>Official Agency Documents ({documents.length})</span>
              </button>
            </div>

            {/* Sub-tab 1: Passwords */}
            {safeSubTab === 'credentials' && (
              <div className="animate-fade-in">
                <BlackBoxVault project={project} isAdmin={isImpersonating} />
              </div>
            )}

            {/* Sub-tab 2: Handoff */}
            {safeSubTab === 'handoff' && (
              <div className="animate-fade-in">
                <HandoffDigitalSafe project={project} onRefresh={handleRefreshProject} />
              </div>
            )}

            {/* Sub-tab 3: Domains */}
            {safeSubTab === 'domains' && (
              <div className="animate-fade-in">
                <InfrastructureSentinel project={project} />
              </div>
            )}

            {/* Sub-tab 4: Documents */}
            {safeSubTab === 'docs' && (
              <div className="animate-fade-in">
                <DocumentEnclave
                  documents={documents}
                  projectName={project.title}
                  clientName={client?.name || clientEmail}
                  companyName={client?.company || 'Enterprise Partner'}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 4: TEAM COMMS & MUSE PILOT AI                                      */}
        {/* ========================================================================= */}
        {activeWorkspace === 'comms' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tab Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-card-bg/60 border border-card-border text-xs">
              <button
                onClick={() => setCommsSubTab('chat')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  commsSubTab === 'chat'
                    ? 'bg-blue-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Agency Direct Messages</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>

              <button
                onClick={() => setCommsSubTab('pilot')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  commsSubTab === 'pilot'
                    ? 'bg-blue-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Muse Pilot AI Assistant</span>
              </button>
            </div>

            {/* Sub-tab 1: Agency Chat */}
            {commsSubTab === 'chat' && (
              <div className="animate-fade-in">
                <AgencyCommsHub project={project} clientEmail={clientEmail} />
              </div>
            )}

            {/* Sub-tab 2: Muse Pilot */}
            {commsSubTab === 'pilot' && (
              <div className="animate-fade-in">
                <MusePilotAssistant project={project} />
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PILLAR 5: GROWTH SHOP & WARRANTY SLA                                      */}
        {/* ========================================================================= */}
        {activeWorkspace === 'growth' && (
          <div className="space-y-6 animate-fade-in">
            {/* Sub-tab Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-card-bg/60 border border-card-border text-xs">
              <button
                onClick={() => setGrowthSubTab('addons')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  growthSubTab === 'addons'
                    ? 'bg-purple-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Micro-Sprint Add-on Catalog</span>
              </button>

              <button
                onClick={() => setGrowthSubTab('warranty')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  growthSubTab === 'warranty'
                    ? 'bg-purple-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>30-Day SLA &amp; Bug Hotline</span>
              </button>

              <button
                onClick={() => setGrowthSubTab('retainer')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
                  growthSubTab === 'retainer'
                    ? 'bg-purple-500 text-black font-bold shadow-md'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Annual Maintenance Retainer</span>
              </button>
            </div>

            {/* Sub-tab 1: Addons */}
            {growthSubTab === 'addons' && (
              <div className="animate-fade-in">
                <AddonMarketplace project={project} onAddonPurchased={handleRefreshProject} />
              </div>
            )}

            {/* Sub-tab 2: Warranty */}
            {growthSubTab === 'warranty' && (
              <div className="animate-fade-in">
                <HandoffDigitalSafe project={project} onRefresh={handleRefreshProject} />
              </div>
            )}

            {/* Sub-tab 3: Retainer */}
            {growthSubTab === 'retainer' && (
              <div className="animate-fade-in">
                <AnnualMaintenanceDesk project={project} onUpdateProject={setProject} />
              </div>
            )}
          </div>
        )}

        {/* Multi-Rail Checkout Modal */}
        {checkoutMilestone && (
          <MultiRailCheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            project={project}
            milestone={checkoutMilestone}
            onPaymentSuccess={(updated) => {
              setProject(updated);
              setIsCheckoutOpen(false);
            }}
          />
        )}

        {/* Guided Walkthrough Modal */}
        <GuidedWalkthroughModal
          isOpen={isWalkthroughOpen}
          onClose={() => setIsWalkthroughOpen(false)}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-card-border py-4 px-6 text-center text-xs text-text-muted">
        WebMuse Client Workflow Operating System (WM-OS) // Production Architecture
      </footer>
    </div>
  );
}
