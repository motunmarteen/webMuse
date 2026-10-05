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
  onOpenCheckout?: (milestone: Milestone) => void;
}

export function MilestoneStepper({
  project,
  selectedMilestoneIndex,
  onSelectMilestone,
  onOpenCheckout,
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

      {/* Stepper Cards Grid (Adaptive layout for 5 core milestones and dynamic add-on phases) */}
      <div
        className="grid gap-3 sm:gap-4"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${project.milestones.length > 5 ? '180px' : '210px'}, 1fr))`,
        }}
      >
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
                  <span className="text-text-muted uppercase font-bold flex items-center gap-1.5">
                    <span>PHASE 0{milestone.phaseNumber}</span>
                    {milestone.title.startsWith('[Add-on]') && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold tracking-wider">
                        ADD-ON
                      </span>
                    )}
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

      {/* Visual Gating Gatekeeper Alert if user clicked a locked or unpaid milestone */}
      {(project.milestones[selectedMilestoneIndex]?.status === 'locked' ||
        project.milestones[selectedMilestoneIndex]?.status === 'awaiting_payment') && (
        <div className="glassmorphism-card rounded-2xl p-5 border border-card-border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-card-bg border border-card-border flex items-center justify-center text-text-muted shrink-0">
              <Lock className="w-4 h-4 text-electric-blue" />
            </div>
            <div>
              <div className="text-foreground font-semibold">
                Milestone 0{project.milestones[selectedMilestoneIndex].phaseNumber} Gatekeeper
              </div>
              <p className="text-text-muted text-[11px] leading-relaxed">
                Settlement of ${project.milestones[selectedMilestoneIndex].costUsd.toLocaleString()} unlocks the deliverables and activates this sprint phase.
              </p>
            </div>
          </div>

          {onOpenCheckout && (
            <button
              onClick={() => onOpenCheckout(project.milestones[selectedMilestoneIndex])}
              className="px-4 py-2 rounded-xl bg-electric-blue text-background font-bold text-xs hover:bg-electric-blue/90 shadow-md shadow-electric-blue/20 transition-all shrink-0"
            >
              Pay &amp; Unlock Phase 0{project.milestones[selectedMilestoneIndex].phaseNumber}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
