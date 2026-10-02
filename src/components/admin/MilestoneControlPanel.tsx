'use client';

import React, { useState } from 'react';
import type { Project, Milestone, MilestoneStatus, Client } from '@/lib/types/portal';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Key,
  CreditCard,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface MilestoneControlPanelProps {
  project: Project;
  client: Client | null;
}

export function MilestoneControlPanel({
  project: initialProject,
  client,
}: MilestoneControlPanelProps) {
  const [project, setProject] = useState<Project>(initialProject);
  const [updatingMilestoneId, setUpdatingMilestoneId] = useState<string | null>(null);
  const [overrideModalMilestone, setOverrideModalMilestone] = useState<Milestone | null>(null);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('Settled via offline bank wire / manual agency override');
  const [impersonating, setImpersonating] = useState(false);
  const [inviteModalData, setInviteModalData] = useState<{ link: string; email: string } | null>(null);
  const [generatingInvite, setGeneratingInvite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status update
  const handleUpdateStatus = async (
    milestoneId: string,
    newStatus: MilestoneStatus,
    extraUpdates: Record<string, unknown> = {}
  ) => {
    try {
      setUpdatingMilestoneId(milestoneId);
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'override_milestone',
          milestoneId,
          updates: {
            status: newStatus,
            ...extraUpdates,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to update milestone status.');
        return;
      }

      setProject(data.project);
      showToast(`Milestone status updated to ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      alert('Network error updating milestone.');
    } finally {
      setUpdatingMilestoneId(null);
    }
  };

  // Manual payment override
  const handleExecutePaymentOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideModalMilestone) return;

    await handleUpdateStatus(overrideModalMilestone.id, 'in_progress', {
      paymentRef: paymentRef.trim() || `MANUAL_WIRE_${Date.now()}`,
      gateway: 'manual',
      notes: paymentNotes,
    });

    setOverrideModalMilestone(null);
    setPaymentRef('');
  };

  // Client impersonation
  const handleImpersonate = async () => {
    try {
      setImpersonating(true);
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id }),
      });
      const data = await res.json();
      if (data.success && data.redirectUrl) {
        window.open(data.redirectUrl, '_blank');
      } else {
        alert(data.error || 'Failed to initialize impersonation.');
      }
    } catch (err) {
      console.error(err);
      alert('Error triggering impersonation.');
    } finally {
      setImpersonating(false);
    }
  };

  // Generate Invite
  const handleGenerateInvite = async () => {
    try {
      setGeneratingInvite(true);
      const res = await fetch(`/api/admin/projects/${project.id}/dispatch-invite`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success && data.magicLink) {
        setInviteModalData({
          link: data.magicLink,
          email: data.clientEmail,
        });
      } else {
        alert(data.error || 'Failed to generate magic link.');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating invite.');
    } finally {
      setGeneratingInvite(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-mono">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center gap-2 shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-card-border bg-card-bg/60">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-text-muted">Client:</span>
          <span className="text-foreground font-semibold">
            {client?.name} ({client?.company})
          </span>
          <span className="text-electric-blue">[{client?.email}]</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Impersonation Button */}
          <button
            onClick={handleImpersonate}
            disabled={impersonating}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
            title="Launch client portal session in new tab"
          >
            {impersonating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-electric-blue" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span>Client Impersonation Mode</span>
          </button>

          {/* Magic Link Generator */}
          <button
            onClick={handleGenerateInvite}
            disabled={generatingInvite}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground text-xs transition-colors disabled:opacity-50"
            title="Generate and copy fresh single-use magic link"
          >
            {generatingInvite ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            ) : (
              <Key className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>Dispatch Magic Link</span>
          </button>
        </div>
      </div>

      {/* Milestones Control Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-display text-text-title">
              Milestone Progression & Gatekeeper Panel
            </h3>
            <p className="text-xs text-text-muted font-light mt-0.5">
              Manually unlock phases, override offline wire payments, or mark sprint milestones completed.
            </p>
          </div>
          <div className="text-xs text-text-muted">
            Current Active Phase: <span className="text-electric-blue font-bold">Phase 0{project.currentPhaseIndex + 1}</span>
          </div>
        </div>

        <div className="space-y-4">
          {project.milestones.map((milestone, idx) => {
            const isCurrent = idx === project.currentPhaseIndex;
            const isCompleted = milestone.status === 'completed';
            const isLocked = milestone.status === 'locked';
            const isAwaitingPayment = milestone.status === 'awaiting_payment';
            const isInProgress = milestone.status === 'in_progress';
            const isUpdating = updatingMilestoneId === milestone.id;

            return (
              <div
                key={milestone.id}
                className={`glassmorphism-card rounded-2xl p-5 sm:p-6 border transition-all space-y-4 ${
                  isCurrent
                    ? 'border-electric-blue/50 shadow-lg'
                    : isCompleted
                    ? 'border-emerald-500/30'
                    : 'border-card-border'
                }`}
              >
                {/* Milestone Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-card-border">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCompleted
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : isCurrent
                          ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/40'
                          : 'bg-card-bg text-text-muted border border-card-border'
                      }`}
                    >
                      0{milestone.phaseNumber}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-title">{milestone.title}</h4>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full border border-electric-blue/40 bg-electric-blue/10 text-[9px] text-electric-blue font-bold tracking-wider uppercase">
                            CURRENT SPRINT
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-text-muted font-light">{milestone.subtitle}</div>
                    </div>
                  </div>

                  {/* Financial & Time Meta */}
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-text-muted">Cost: </span>
                      <span className="text-foreground font-semibold">
                        ${milestone.costUsd.toLocaleString()}{' '}
                        <span className="text-text-muted font-normal">
                          (₦{(milestone.costNgn / 1000000).toFixed(1)}M)
                        </span>
                      </span>
                    </div>

                    <div className="h-3 w-px bg-card-border" />

                    <div>
                      <span className="text-text-muted">Target: </span>
                      <span className="text-foreground font-semibold">
                        ~{milestone.targetCompletionDays} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Milestone Details & Deliverables preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">
                      Scope Summary
                    </div>
                    <p className="text-text-muted text-[11px] leading-relaxed">
                      {milestone.description}
                    </p>

                    {milestone.paymentTxRef && (
                      <div className="text-[10px] text-emerald-400 font-mono pt-1">
                        Settlement Ref: {milestone.paymentTxRef} ({milestone.paymentGateway || 'gateway'})
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">
                      Deliverables Checklist ({milestone.deliverables.length})
                    </div>
                    <div className="space-y-1">
                      {milestone.deliverables.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center gap-2 text-[11px] text-text-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-card-border" />
                          <span className="text-foreground">{d.title}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-card-border text-text-muted">
                            {d.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* State Control & Override Action Buttons */}
                <div className="pt-3 border-t border-card-border flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-[11px]">Current State:</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        isCompleted
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                          : isInProgress
                          ? 'border-electric-blue/40 bg-electric-blue/10 text-electric-blue'
                          : isAwaitingPayment
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                          : 'border-card-border bg-card-bg text-text-muted'
                      }`}
                    >
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Manual Payment Override Button */}
                    {(isLocked || isAwaitingPayment) && (
                      <button
                        onClick={() => setOverrideModalMilestone(milestone)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-[11px] transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Manual Payment Override</span>
                      </button>
                    )}

                    {/* Unlock / Set In Progress */}
                    {milestone.status !== 'in_progress' && !isCompleted && (
                      <button
                        onClick={() => handleUpdateStatus(milestone.id, 'in_progress')}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground text-[11px] transition-colors"
                      >
                        <Unlock className="w-3.5 h-3.5 text-electric-blue" />
                        <span>Unlock Phase</span>
                      </button>
                    )}

                    {/* Mark Completed */}
                    {milestone.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateStatus(milestone.id, 'completed')}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-card-bg text-emerald-400 hover:bg-emerald-500/10 text-[11px] transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Completed & Advance</span>
                      </button>
                    )}

                    {/* Lock Phase */}
                    {milestone.status !== 'locked' && (
                      <button
                        onClick={() => handleUpdateStatus(milestone.id, 'locked')}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-red-400 text-[11px] transition-colors"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Payment Override Modal */}
      {overrideModalMilestone && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-md w-full p-6 space-y-5 border border-card-border shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CreditCard className="w-4 h-4" />
                <span>OFFLINE PAYMENT OVERRIDE</span>
              </div>
              <button
                onClick={() => setOverrideModalMilestone(null)}
                className="text-text-muted hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">
                Override Phase 0{overrideModalMilestone.phaseNumber}: {overrideModalMilestone.title}
              </h4>
              <p className="text-text-muted text-[11px]">
                Mark this milestone as Paid & Unlocked for offline wire transfers, bank deposits, or cash settlements.
              </p>
            </div>

            <form onSubmit={handleExecutePaymentOverride} className="space-y-3">
              <div>
                <label className="text-[10px] text-text-muted uppercase">Transaction Reference / Receipt #</label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="e.g. GTB-WIRE-2026-09124"
                  className="w-full rounded-lg border border-card-border bg-card-bg px-3 py-2 text-foreground text-xs mt-1 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-text-muted uppercase">Audit Log Notes</label>
                <textarea
                  rows={2}
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-card-bg px-3 py-2 text-foreground text-xs mt-1 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOverrideModalMilestone(null)}
                  className="px-4 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-semibold uppercase tracking-wider"
                >
                  Confirm Paid & Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {inviteModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-lg w-full p-6 space-y-5 border border-card-border shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 text-electric-blue font-semibold">
                <Key className="w-4 h-4" />
                <span>FRESH MAGIC LINK DISPATCHED</span>
              </div>
              <button
                onClick={() => setInviteModalData(null)}
                className="text-text-muted hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-text-muted">
              A single-use link for <span className="text-foreground font-semibold">{inviteModalData.email}</span> has been generated and whitelisted.
            </p>

            <div className="flex items-center gap-2 p-3 rounded-xl border border-card-border bg-card-bg break-all text-[11px] text-electric-blue">
              <span className="flex-1 line-clamp-2">{inviteModalData.link}</span>
              <button
                onClick={() => copyToClipboard(inviteModalData.link)}
                className="px-3 py-1.5 rounded-lg border border-card-border bg-background hover:bg-zinc-800 text-foreground text-xs flex items-center gap-1.5 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.open(inviteModalData.link, '_blank')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
