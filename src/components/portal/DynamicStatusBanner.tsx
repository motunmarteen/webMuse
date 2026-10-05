'use client';

import React from 'react';
import type { Project, Milestone } from '@/lib/types/portal';
import { AlertCircle, CheckCircle2, Clock, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface DynamicStatusBannerProps {
  project: Project;
  activeMilestone: Milestone;
  onOpenPRD?: () => void;
  onOpenCheckout?: (milestone: Milestone) => void;
}

export function DynamicStatusBanner({
  project,
  activeMilestone,
  onOpenPRD,
  onOpenCheckout,
}: DynamicStatusBannerProps) {
  const isPrdSignedOff = !!project.prd.signedOffAt;
  const isPhase1 = project.currentPhaseIndex === 0;

  if (isPhase1 && !isPrdSignedOff) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 font-mono shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  ACTION REQUIRED // SCOPE CREEP SHIELD
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </div>
              <h3 className="text-sm font-bold text-foreground">
                Approve Genesis PRD Scope (v{project.prd.version})
              </h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Review the architectural specification below and execute digital sign-off to lock the scope baseline.
              </p>
            </div>
          </div>

          {onOpenPRD && (
            <button
              onClick={onOpenPRD}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-lg hover:shadow-amber-400/20"
            >
              <span>Review & Sign Off</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (activeMilestone.status === 'awaiting_payment') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-purple-500/10 p-5 font-mono shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                ACTION REQUIRED // SETTLEMENT GATEKEEPER
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Milestone 0{activeMilestone.phaseNumber} Payment Settlement Pending
              </h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Settlement of ${activeMilestone.costUsd.toLocaleString()} unlocks the next sprint deliverables.
              </p>
            </div>
          </div>

          {onOpenCheckout && (
            <button
              onClick={() => onOpenCheckout(activeMilestone)}
              className="px-4 py-2.5 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-background text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-lg hover:shadow-electric-blue/20"
            >
              <span>Pay &amp; Unlock Phase 0{activeMilestone.phaseNumber}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-electric-blue/30 bg-electric-blue/5 p-5 font-mono shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center text-electric-blue shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-electric-blue">
                SPRINT IN PROGRESS // PHASE 0{activeMilestone.phaseNumber}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {activeMilestone.title}
            </h3>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              {activeMilestone.subtitle} — Engineering active with deliverables updating in real-time.
            </p>
          </div>
        </div>

        {isPrdSignedOff && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Scope Baseline Locked</span>
          </div>
        )}
      </div>
    </div>
  );
}
