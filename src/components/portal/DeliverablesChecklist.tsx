'use client';

import React from 'react';
import type { Milestone, DeliverableStatus } from '@/lib/types/portal';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Code2,
  FileCode,
  Sparkles,
  Lock,
} from 'lucide-react';

interface DeliverablesChecklistProps {
  milestone: Milestone;
  isLocked: boolean;
  stagingUrl?: string;
  repoUrl?: string;
  designUrl?: string;
  onOpenCheckout?: (milestone: Milestone) => void;
}

export function DeliverablesChecklist({
  milestone,
  isLocked,
  stagingUrl,
  repoUrl,
  designUrl,
  onOpenCheckout,
}: DeliverablesChecklistProps) {
  const getStatusBadge = (status: DeliverableStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Approved
          </span>
        );
      case 'ready_for_review':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <Clock className="w-3 h-3 animate-pulse" />
            Under Review
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-electric-blue/40 bg-electric-blue/10 text-electric-blue text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse" />
            In Development
          </span>
        );
      case 'backlog':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-text-muted text-[10px] uppercase">
            Backlog
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 font-mono">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-electric-blue uppercase">
            SPRINT DELIVERABLES
          </span>
          <h3 className="text-lg font-bold font-display text-text-title mt-0.5">
            Phase 0{milestone.phaseNumber}: {milestone.title}
          </h3>
        </div>
        <div className="text-xs text-text-muted">
          {milestone.deliverables.length} Deliverable{milestone.deliverables.length !== 1 ? 's' : ''}
        </div>
      </div>

      {isLocked ? (
        <div className="glassmorphism-card rounded-2xl p-8 border border-card-border text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-card-bg border border-card-border flex items-center justify-center text-text-muted mx-auto">
            <Lock className="w-5 h-5 text-electric-blue" />
          </div>
          <div className="text-sm font-bold text-foreground">
            Deliverables Gated Behind Phase Lock
          </div>
          <p className="text-xs text-text-muted max-w-sm mx-auto font-light leading-relaxed">
            The sprint deliverables for Phase 0{milestone.phaseNumber} will become interactive once this milestone is officially settled and activated.
          </p>
          {onOpenCheckout && (
            <button
              onClick={() => onOpenCheckout(milestone)}
              className="px-5 py-2.5 rounded-xl bg-electric-blue text-background font-bold text-xs hover:bg-electric-blue/90 shadow-md shadow-electric-blue/20 transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Settle Milestone Payment &amp; Unlock (${milestone.costUsd?.toLocaleString()})</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestone.deliverables.map((del) => {
            const hasExternal = del.externalUrl || designUrl || stagingUrl;

            return (
              <div
                key={del.id}
                className="glassmorphism-card rounded-2xl p-5 border border-card-border hover:border-card-border/90 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-muted uppercase">
                      ID: {del.id}
                    </span>
                    {getStatusBadge(del.status)}
                  </div>

                  <h4 className="text-sm font-semibold text-text-title leading-snug">
                    {del.title}
                  </h4>

                  {del.description && (
                    <p className="text-xs text-text-muted font-light leading-relaxed">
                      {del.description}
                    </p>
                  )}
                </div>

                {/* External Link or Review Button */}
                <div className="pt-2 border-t border-card-border/60 flex items-center justify-between text-[11px]">
                  <span className="text-text-muted text-[10px]">Deliverable Asset</span>
                  {hasExternal ? (
                    <a
                      href={del.externalUrl || designUrl || stagingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-electric-blue hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Inspect Asset</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-text-muted/60">Repository Tracked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
