'use client';

import React, { useState } from 'react';
import type { Project, Milestone, Client } from '@/lib/types/portal';
import { ExecutiveBriefModal } from '@/components/portal/ExecutiveBriefModal';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Layers,
  Monitor,
  PackageCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Key,
  MessageSquare,
  Activity,
  CheckCircle2,
  DollarSign,
  Lock,
  FileText,
  Zap,
  TrendingUp,
  Server,
  Globe,
  Database,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ProjectCockpitProps {
  project: Project;
  client?: Client | null;
  onNavigateTab: (tab: 'cockpit' | 'build' | 'safe' | 'comms' | 'growth') => void;
  onOpenCheckout: (milestone: Milestone) => void;
  onOpenPRD: () => void;
  onOpenWalkthrough: () => void;
}

export function ProjectCockpit({
  project,
  client = null,
  onNavigateTab,
  onOpenCheckout,
  onOpenPRD,
  onOpenWalkthrough,
}: ProjectCockpitProps) {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [inspectedMilestoneIndex, setInspectedMilestoneIndex] = useState<number | null>(
    project.currentPhaseIndex
  );

  const activeMilestone = project.milestones[project.currentPhaseIndex] || project.milestones[0];
  const isPrdSignedOff = !!project.prd.signedOffAt;
  const isPhase1 = project.currentPhaseIndex === 0;

  // Calculate overall progress percentage based on completed milestones
  const completedCount = project.milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / (project.milestones.length || 1)) * 100);

  // Determine Primary Executive Action
  let actionState: {
    type: 'scope' | 'payment' | 'staging' | 'handoff' | 'in_progress';
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    badge: string;
  };

  if (isPhase1 && !isPrdSignedOff) {
    actionState = {
      type: 'scope',
      title: `Action Required: Review & Sign Off Scope (v${project.prd.version})`,
      description:
        'Review the Genesis PRD architecture and execute digital sign-off to freeze your baseline and eliminate scope creep.',
      buttonText: 'Review & Sign Scope Baseline',
      onClick: onOpenPRD,
      badge: 'Scope Baseline Pending',
    };
  } else if (activeMilestone.status === 'awaiting_payment') {
    actionState = {
      type: 'payment',
      title: `Action Required: Phase 0${activeMilestone.phaseNumber} Payment Settlement Pending`,
      description: `Settlement of $${activeMilestone.costUsd.toLocaleString()} unlocks the next sprint deliverables into active development.`,
      buttonText: `Pay & Unlock Phase 0${activeMilestone.phaseNumber}`,
      onClick: () => onOpenCheckout(activeMilestone),
      badge: 'Escrow Settlement Due',
    };
  } else if (activeMilestone.phaseNumber === 4 && activeMilestone.status === 'in_progress') {
    actionState = {
      type: 'staging',
      title: 'Action Required: Test Live Staging & Leave Visual Feedback',
      description:
        'Your staging build is live on edge. Test across Desktop, Tablet, and Mobile and click anywhere to drop pinpoint feedback pins.',
      buttonText: 'Open Live Review Deck',
      onClick: () => onNavigateTab('build'),
      badge: 'Ready for Client QA',
    };
  } else if (project.status === 'completed' || completedCount === project.milestones.length) {
    actionState = {
      type: 'handoff',
      title: 'Project Completed: Master Handoff Safe Unlocked',
      description:
        'Your GitHub repository transfer, production environment credentials (.env), and brand assets are ready for download.',
      buttonText: 'Access Digital Safe',
      onClick: () => onNavigateTab('safe'),
      badge: 'Production Released',
    };
  } else {
    actionState = {
      type: 'in_progress',
      title: `All Clear: WebMuse Team is Sprinting on Phase 0${activeMilestone.phaseNumber}`,
      description: `Engineers are actively implementing ${activeMilestone.title}. Next deliverable review cycle begins upon sprint milestone completion.`,
      buttonText: 'View Sprint Deliverables',
      onClick: () => onNavigateTab('build'),
      badge: 'Active Development Sprint',
    };
  }

  const inspectedMilestone =
    inspectedMilestoneIndex !== null ? project.milestones[inspectedMilestoneIndex] : null;

  return (
    <div className="space-y-8 font-mono">
      {/* Executive Brief Modal */}
      <ExecutiveBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        project={project}
        client={client}
      />

      {/* 1. Unmissable Executive Action Banner */}
      <div
        className={`p-6 rounded-2xl border transition-all relative overflow-hidden ${
          actionState.type === 'scope'
            ? 'bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-black/60 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
            : actionState.type === 'payment'
            ? 'bg-gradient-to-r from-purple-950/40 via-pink-950/20 to-black/60 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
            : actionState.type === 'handoff'
            ? 'bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black/60 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
            : 'bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-black/60 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`p-3.5 rounded-xl border shrink-0 ${
                actionState.type === 'scope'
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : actionState.type === 'payment'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                  : actionState.type === 'handoff'
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
              }`}
            >
              {actionState.type === 'scope' ? (
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              ) : actionState.type === 'payment' ? (
                <Clock className="w-6 h-6 animate-pulse" />
              ) : actionState.type === 'handoff' ? (
                <PackageCheck className="w-6 h-6" />
              ) : (
                <Layers className="w-6 h-6 text-cyan-400" />
              )}
            </div>

            <div className="space-y-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    actionState.type === 'scope'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : actionState.type === 'payment'
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                      : actionState.type === 'handoff'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  }`}
                >
                  {actionState.badge}
                </span>
                <span className="text-xs text-zinc-400 font-sans">Next Founder Milestone Step</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                {actionState.title}
              </h2>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {actionState.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={actionState.onClick}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg ${
                actionState.type === 'scope'
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-500/25'
                  : actionState.type === 'payment'
                  ? 'bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/25'
                  : actionState.type === 'handoff'
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/25'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/25'
              }`}
            >
              <span>{actionState.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Lifecycle Progress Bar & Interactive Roadmap */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Project Execution Roadmap</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Click any phase below to inspect deliverables, budget breakdown, and live sprint status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Export Executive Brief Button */}
            <button
              onClick={() => setIsBriefOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/40 bg-white/[0.03] text-zinc-300 hover:text-white transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Executive Brief</span>
            </button>

            <button
              onClick={onOpenWalkthrough}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan-500/40 bg-white/[0.03] text-zinc-300 hover:text-white transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Founder Guide</span>
            </button>
            <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold">
              {progressPercent}% COMPLETE
            </div>
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Phased Sprint Stepper Cards - Adaptive Grid (Never horizontally scrolls) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {project.milestones.map((m, idx) => {
            const isCurrent = idx === project.currentPhaseIndex;
            const isCompleted = m.status === 'completed';
            const isAwaitingPayment = m.status === 'awaiting_payment';
            const isInspected = inspectedMilestoneIndex === idx;
            const isAddon = m.title.toLowerCase().includes('[add-on]') || m.id.startsWith('ms_addon_');

            return (
              <button
                key={m.id}
                onClick={() => setInspectedMilestoneIndex(isInspected ? null : idx)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isInspected
                    ? 'ring-2 ring-cyan-400 border-cyan-400 bg-cyan-950/30'
                    : isCurrent
                    ? 'border-cyan-500/50 bg-cyan-500/10'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/20'
                    : isAwaitingPayment
                    ? 'border-purple-500/40 bg-purple-950/20'
                    : 'border-white/5 bg-white/[0.02]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span
                      className={`font-mono font-bold ${
                        isCurrent
                          ? 'text-cyan-300'
                          : isCompleted
                          ? 'text-emerald-400'
                          : isAwaitingPayment
                          ? 'text-purple-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      PHASE 0{m.phaseNumber}
                    </span>

                    {isAddon ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/30 text-purple-300 border border-purple-500/50">
                        ADD-ON
                      </span>
                    ) : isCompleted ? (
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    ) : isCurrent ? (
                      <span className="text-cyan-300 animate-pulse text-[10px] font-mono">ACTIVE</span>
                    ) : isAwaitingPayment ? (
                      <span className="text-amber-400 font-mono text-[10px]">UNPAID</span>
                    ) : (
                      <span className="text-zinc-600 flex items-center gap-0.5 text-[10px]">
                        <Lock className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-white text-xs truncate">
                    {m.title.replace('[Add-on] ', '')}
                  </div>
                </div>

                <div className="text-[10px] text-zinc-500 mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>${m.costUsd.toLocaleString()}</span>
                  <span className="text-zinc-400">{m.deliverables?.length || 0} tasks</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Inspector Drawer */}
        {inspectedMilestone && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-cyan-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
                  PHASE 0{inspectedMilestone.phaseNumber} DETAIL
                </span>
                <span className="text-white font-bold text-sm">{inspectedMilestone.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-zinc-400">Budget: <strong className="text-white">${inspectedMilestone.costUsd.toLocaleString()}</strong></span>
                <span className="text-zinc-400">Duration: <strong className="text-white">~{inspectedMilestone.targetCompletionDays} working days</strong></span>
                <span className="text-zinc-400">Status: <strong className="text-cyan-400 uppercase">{inspectedMilestone.status.replace('_', ' ')}</strong></span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 font-sans">{inspectedMilestone.description}</p>

            {/* Deliverables Checklist inside Drawer */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                Phase Deliverables Checklist:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(inspectedMilestone.deliverables || []).map((d) => (
                  <div
                    key={d.id}
                    className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {d.status === 'approved' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : d.status === 'ready_for_review' ? (
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      )}
                      <span className="text-zinc-200 truncate">{d.title}</span>
                    </div>
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono shrink-0 ${
                        d.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : d.status === 'ready_for_review'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {d.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              {inspectedMilestone.status === 'awaiting_payment' && (
                <button
                  onClick={() => onOpenCheckout(inspectedMilestone)}
                  className="px-3 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs"
                >
                  Pay &amp; Unlock Phase 0{inspectedMilestone.phaseNumber}
                </button>
              )}
              <button
                onClick={() => onNavigateTab('build')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                <span>View in Build Deck</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Executive Stats Dashboard (4 Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Stage */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>ACTIVE SPRINT</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            Phase 0{activeMilestone.phaseNumber}
          </div>
          <p className="text-xs text-zinc-400 line-clamp-1">{activeMilestone.title}</p>
        </div>

        {/* Budget & Escrow */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>TOTAL CONTRACT</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            ${project.totalBudgetUsd.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-400">
            ₦{project.totalBudgetNgn.toLocaleString()} NGN
          </p>
        </div>

        {/* Live Health */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>SYSTEM HEALTH</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono flex items-center gap-2">
            <span>99.98%</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs text-zinc-400">28ms Edge Latency • SSL Grade A+</p>
        </div>

        {/* Warranty Status */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
            <span>30-DAY SLA WARRANTY</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white font-mono">
            {project.warrantyDaysRemaining ?? 30} Days
          </div>
          <p className="text-xs text-purple-300 font-mono">Priority Bug Hotline Open</p>
        </div>
      </div>

      {/* 4. Live Product Pulse & Telemetry HUD (What Your Product Is Doing) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-black/60 via-zinc-950/80 to-cyan-950/20 border border-cyan-500/20 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Live Product Pulse &amp; Telemetry HUD
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Real-time operational status of your staging deployments, APIs, and edge nodes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('build')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/10 text-cyan-300 text-xs font-semibold transition-all"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Launch Staging Review</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Edge Staging Endpoint */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
              <span>Staging Preview Deck</span>
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online &amp; Serving</span>
            </div>
            <div className="text-[11px] text-zinc-400 truncate">
              {project.stagingUrl || `https://staging.webmuse.tech/${project.slug}`}
            </div>
          </div>

          {/* Edge Latency */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
              <span>Global CDN Response</span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span>28ms Average</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Vercel Enterprise Edge Anycast
            </div>
          </div>

          {/* Database & Pool */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
              <span>Database Cluster</span>
              <Database className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PostgreSQL Connection Pool</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Row-Level Security (RLS) Active
            </div>
          </div>

          {/* Active Testing Sessions */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
              <span>Active QA Traffic</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
              <span>14 Active Sessions</span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Simulated Edge Testing Benchmarks
            </div>
          </div>
        </div>
      </div>

      {/* 5. Founder Growth Engine (How to Improve Your Product) */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Founder Growth Engine // Product Improvement Vectors
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-bold">
                  HIGH-ROI UPGRADES
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Curated architectural enhancements to drive conversion, user retention, and enterprise readiness.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('growth')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 hover:border-purple-500 bg-purple-500/10 text-purple-300 text-xs font-semibold transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Add-on Catalog</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Growth Vector 1 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-semibold">
                  +22% CONVERSION
                </span>
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                Sub-Millisecond Edge Speed
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Aggressive service-worker pre-caching and asset optimization to achieve perfect 100/100 Core Web Vitals.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('growth')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 pt-2 border-t border-white/5"
            >
              <span>Explore Micro-Sprint</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Growth Vector 2 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-semibold">
                  0% DROPPED CARTS
                </span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                Multi-Rail Payment Failover
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Automated multi-gateway failover between Crypto (NOWPayments) and Fiat (Stripe/Paystack) for zero lost orders.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('growth')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1 pt-2 border-t border-white/5"
            >
              <span>Explore Micro-Sprint</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Growth Vector 3 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-3 group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-semibold">
                  DEEP USER INSIGHT
                </span>
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-xs font-bold text-white font-mono group-hover:text-blue-300 transition-colors">
                Funnel Analytics &amp; Drop-off Radar
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Privacy-preserving custom event telemetry to identify exactly where users hesitate before purchasing.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('growth')}
              className="text-xs text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 pt-2 border-t border-white/5"
            >
              <span>Explore Micro-Sprint</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Growth Vector 4 */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono font-semibold">
                  24/7 SUPPORT
                </span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-xs font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                AI Customer Onboarding Agent
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Contextual AI assistant embedded in your app to onboard end-users and resolve support queries instantly.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('growth')}
              className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1 pt-2 border-t border-white/5"
            >
              <span>Explore Micro-Sprint</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. Quick Workspaces Navigation (The 4 Pillars) */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-4">
          Quick Workspaces Navigation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('build')}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit mb-3 group-hover:scale-110 transition-transform">
                <Monitor className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                Delivery &amp; Staging
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Review milestone checklist &amp; test live staging preview.
              </p>
            </div>
            <span className="text-[11px] text-cyan-400 font-mono mt-4 flex items-center gap-1">
              Open Build Deck <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('safe')}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit mb-3 group-hover:scale-110 transition-transform">
                <Key className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono group-hover:text-emerald-300 transition-colors">
                Security &amp; Handoff
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Access encrypted passwords, GitHub transfer &amp; .env keys.
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-4 flex items-center gap-1">
              Open Safe <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('comms')}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-blue-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono group-hover:text-blue-300 transition-colors">
                Team Chat &amp; Muse AI
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Direct lead architect messaging &amp; AI project assistant.
              </p>
            </div>
            <span className="text-[11px] text-blue-400 font-mono mt-4 flex items-center gap-1">
              Open Comms <ArrowRight className="w-3 h-3" />
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('growth')}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 w-fit mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                Add-on Shop &amp; SLA
              </h4>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                On-demand revision sprints &amp; priority bug report ticket.
              </p>
            </div>
            <span className="text-[11px] text-purple-400 font-mono mt-4 flex items-center gap-1">
              Open Shop <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
