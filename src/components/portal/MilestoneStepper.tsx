'use client';

import React from 'react';
import type { Milestone, Project } from '@/lib/types/portal';
import {
  CheckCircle2,
  Lock,
  Clock,
  Hourglass,
  CreditCard,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface MilestoneStepperProps {
  project: Project;
  selectedMilestoneIndex: number;
  onSelectMilestone: (index: number) => void;
}

export function MilestoneStepper({
  project,
  selectedMilestoneIndex,
  onSelectMilestone,
}: MilestoneStepperProps) {
  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-electric-blue uppercase">
            DELIVERY PIPELINE
          </span>
          <h2 className="text-xl font-bold font-display text-text-title mt-0.5">
            Phased Milestone Progression
          </h2>
        </div>
        <div className="text-xs text-text-muted">
          Active: Phase 0{project.currentPhaseIndex + 1} of {project.milestones.length}
        </div>
      </div>

      {/* Stepper Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
        {project.milestones.map((milestone, idx) => {
          const isSelected = selectedMilestoneIndex === idx;
          const isCurrentActive = idx === project.currentPhaseIndex;
          const isCompleted = milestone.status === 'completed';
          const isLocked = milestone.status === 'locked';
          const isAwaitingPayment = milestone.status === 'awaiting_payment';

          return (
            <button
              key={milestone.id}
              onClick={() => onSelectMilestone(idx)}
              className={`text-left rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all flex flex-col justify-between border ${
                isSelected
                  ? 'border-electric-blue ring-1 ring-electric-blue shadow-lg bg-card-bg'
                  : isCurrentActive
                  ? 'border-electric-blue/40 bg-card-bg shadow-md'
                  : isCompleted
                  ? 'border-emerald-500/30 bg-card-bg/60'
                  : 'border-card-border bg-card-bg/40 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Top Node Indicator */}
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-text-muted uppercase font-bold">
                    PHASE 0{milestone.phaseNumber}
                  </span>

                  {isCompleted ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      DONE
                    </span>
                  ) : isCurrentActive ? (
                    <span className="text-electric-blue flex items-center gap-1.5 text-[10px] font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
                      ACTIVE
                    </span>
                  ) : isAwaitingPayment ? (
                    <span className="text-amber-400 flex items-center gap-1 text-[10px] font-semibold uppercase">
                      <CreditCard className="w-3 h-3" />
                      UNPAID
                    </span>
                  ) : (
                    <span className="text-text-muted/70 flex items-center gap-1 text-[10px] uppercase">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-text-title line-clamp-1">
                  {milestone.title}
                </div>

                <p className="text-xs text-text-muted font-light line-clamp-2 leading-relaxed">
                  {milestone.subtitle}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="pt-3 border-t border-card-border/60 mt-3 flex items-center justify-between text-[11px] text-text-muted w-full">
                <span>${milestone.costUsd.toLocaleString()}</span>
                <span>~{milestone.targetCompletionDays}d</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Gating Gatekeeper Alert if user clicked a locked milestone */}
      {project.milestones[selectedMilestoneIndex]?.status === 'locked' && (
        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-card-bg border border-card-border flex items-center justify-center text-text-muted shrink-0">
              <Lock className="w-4 h-4 text-electric-blue" />
            </div>
            <div>
              <div className="text-foreground font-semibold">
                Milestone 0{project.milestones[selectedMilestoneIndex].phaseNumber} is Gated
              </div>
              <p className="text-text-muted text-[11px] leading-relaxed">
                This phase mathematically unlocks once Phase 0{selectedMilestoneIndex} reaches completion and the milestone invoice is settled.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-electric-blue font-semibold uppercase tracking-wider shrink-0">
            Phase Gatekeeper Active
          </div>
        </div>
      )}
    </div>
  );
}
