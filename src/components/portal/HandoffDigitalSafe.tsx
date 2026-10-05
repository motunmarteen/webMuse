'use client';

import React, { useState, useEffect } from 'react';
import type { Project, HandoffSafePackage, WarrantyTicket } from '@/lib/types/portal';
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  Download,
  Copy,
  Check,
  ExternalLink,
  Video,
  Terminal,
  FileCode,
  Clock,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  PlusCircle,
  FileText,
  Eye,
  EyeOff,
} from 'lucide-react';

interface HandoffDigitalSafeProps {
  project: Project;
  onRefresh?: () => void;
}

export function HandoffDigitalSafe({ project, onRefresh }: HandoffDigitalSafeProps) {
  const [safeData, setSafeData] = useState<HandoffSafePackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});

  // Warranty ticket modal state
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [submittingTicket, setSubmittingTicket] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [tickets, setTickets] = useState<WarrantyTicket[]>([]);

  useEffect(() => {
    fetchSafeData();
    fetchWarrantyTickets();
  }, [project.id]);

  const fetchSafeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/portal/handoff?projectId=${project.id}`);
      const data = await res.json();
      if (data.ok) {
        setSafeData(data.data);
      } else {
        setError(data.error || 'Failed to load handoff safe package');
      }
    } catch (err: any) {
      setError(err.message || 'Network error loading digital safe');
    } finally {
      setLoading(false);
    }
  };

  const fetchWarrantyTickets = async () => {
    try {
      const res = await fetch(`/api/portal/warranty?projectId=${project.id}`);
      const data = await res.json();
      if (data.ok) {
        setTickets(data.data);
      }
    } catch {
      // silently fallback
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const toggleReveal = (key: string) => {
    setRevealedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketDescription.trim()) return;

    try {
      setSubmittingTicket(true);
      const res = await fetch('/api/portal/warranty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          title: ticketTitle.trim(),
          description: ticketDescription.trim(),
          priority: ticketPriority,
          authorEmail: 'client@apexlabs.io',
          authorName: 'Client Owner',
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setTicketSuccess(true);
        setTicketTitle('');
        setTicketDescription('');
        fetchWarrantyTickets();
        if (onRefresh) onRefresh();
        setTimeout(() => {
          setTicketSuccess(false);
          setTicketModalOpen(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Failed to submit warranty ticket:', err);
    } finally {
      setSubmittingTicket(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/[0.02] border border-white/10 rounded-2xl">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
        <p className="text-sm font-mono text-zinc-400">Decrypting Handoff Digital Safe Enclave...</p>
      </div>
    );
  }

  const isUnlocked = safeData?.isUnlocked ?? false;

  return (
    <div className="space-y-8">
      {/* Top Banner: Safe Status & Gating Alert */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isUnlocked
            ? 'bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black/60 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
            : 'bg-gradient-to-r from-amber-950/40 via-red-950/20 to-black/60 border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isUnlocked
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}
            >
              {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-mono tracking-tight">
                  {isUnlocked ? 'DIGITAL SAFE // MASTER RELEASE ENCLAVE' : 'DIGITAL SAFE // LOCKED ENCLAVE'}
                </h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold ${
                    isUnlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {isUnlocked ? 'Unlocked & Verified' : 'Gated Behind Milestones'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                {isUnlocked
                  ? 'All core engineering milestones have reached completed status. Your repository transfer, production .env credentials, Loom walkthroughs, and design archives are fully released.'
                  : 'The Master Handoff Safe unlocks automatically once all preceding project milestones reach COMPLETED status and milestone settlements are executed.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchSafeData}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync Vault
            </button>
            {isUnlocked && (
              <a
                href={`/api/portal/handoff?projectId=${project.id}&format=env`}
                download=".env.production"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Download className="w-3.5 h-3.5" /> Download .env.production
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 30-Day Post-Launch SLA Warranty Clock */}
      <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/20 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                30-Day Post-Launch SLA Warranty Clock
              </h3>
              <p className="text-xs text-zinc-400">
                Covers zero-cost priority bug triage, emergency hotfixes, and unexpected regressions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-cyan-300">
                {safeData?.warrantyDaysRemaining ?? 30} DAYS REMAINING
              </span>
            </div>

            <button
              onClick={() => setTicketModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Dispatch Priority SLA Ticket
            </button>
          </div>
        </div>

        {/* Retainer Upsell notice */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>
              Looking for continuous 99.9% uptime guarantees after warranty expiry? WebMuse{' '}
              <strong className="text-purple-300">Mission-Critical Maintenance Retainer</strong> provides sub-hour SLA response.
            </span>
          </div>
          <span className="text-zinc-500 font-mono">Retainer Active: {project.maintenanceRetainer?.tierName || 'Standard'}</span>
        </div>

        {/* Existing Warranty Tickets */}
        {tickets.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono uppercase text-zinc-400 mb-2">Active SLA Warranty Tickets ({tickets.length})</h4>
            <div className="space-y-2">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-lg bg-black/60 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                        t.priority === 'critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : t.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {t.priority}
                    </span>
                    <span className="font-semibold text-white">{t.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400 font-mono text-[11px]">{new Date(t.createdAt).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono uppercase text-[10px]">
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GitHub Repository Transfer Section */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                GitHub Repository Custody Transfer
              </h3>
              <p className="text-xs text-zinc-400">
                Official source code repository handover with commit history and CI/CD pipelines.
              </p>
            </div>
          </div>

          {safeData?.repoTransferUrl && (
            <a
              href={safeData.repoTransferUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Accept Transfer on GitHub
            </a>
          )}
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/10">
            <span>Transfer Destination:</span>
            <span className="text-purple-300">github.com/webmuse-studios/{project.slug}-core</span>
          </div>

          <div className="space-y-1.5 text-zinc-300">
            <p className="font-semibold text-white">Engineering Transfer Checklist:</p>
            {(safeData?.repoTransferInstructions || []).map((step, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-purple-400">›</span>
                <span className="text-zinc-300">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-zinc-500">Local Git Remote Command:</span>
            <div className="flex items-center gap-2">
              <code className="px-2 py-1 rounded bg-white/5 border border-white/10 text-cyan-300 text-[11px]">
                git remote set-url origin git@github.com:apexlabs-org/{project.slug}.git
              </code>
              <button
                onClick={() =>
                  copyToClipboard(
                    `git remote set-url origin git@github.com:apexlabs-org/${project.slug}.git`,
                    'git-remote'
                  )
                }
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors"
                title="Copy command"
              >
                {copiedKey === 'git-remote' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Production Environment .env Manifest */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Production Environment Manifest (.env.production)
              </h3>
              <p className="text-xs text-zinc-400">
                Verified production environment keys, RPC endpoints, and database connection strings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`/api/portal/handoff?projectId=${project.id}&format=env`}
              download=".env.production"
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" /> Download File
            </a>
          </div>
        </div>

        <div className="space-y-2">
          {(safeData?.envManifest || []).map((env) => {
            const isRevealed = revealedKeys[env.key];
            const displayValue = !env.isSecret || isRevealed ? env.sampleValue : '••••••••••••••••••••••••••••••••';

            return (
              <div
                key={env.key}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
              >
                <div className="flex flex-col gap-0.5 min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{env.key}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 uppercase">
                      {env.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-sans">{env.description}</span>
                </div>

                <div className="flex items-center gap-2 max-w-xl flex-1 justify-end">
                  <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-cyan-300 text-[11px] truncate max-w-md">
                    {displayValue}
                  </span>

                  {env.isSecret && (
                    <button
                      onClick={() => toggleReveal(env.key)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      title={isRevealed ? 'Mask secret' : 'Reveal secret'}
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  <button
                    onClick={() => copyToClipboard(env.sampleValue, env.key)}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Copy value"
                  >
                    {copiedKey === env.key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loom Video Walkthrough Playlist */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Loom Architectural Walkthrough Playlist
            </h3>
            <p className="text-xs text-zinc-400">
              In-depth engineering videos explaining system data flow, deployment steps, and admin controls.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(safeData?.loomWalkthroughs || []).map((loom) => (
            <div
              key={loom.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-pink-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="uppercase px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20 text-[10px]">
                    {loom.category}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Clock className="w-3 h-3" /> {loom.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2 mb-1">
                  {loom.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans">Speaker: {loom.speaker}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <a
                  href={loom.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" /> Watch on Loom
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Assets & Figma Master Archives */}
      <div className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Brand Assets & Figma Master Design System
            </h3>
            <p className="text-xs text-zinc-400">
              Download high-resolution vector assets, typography variables, master token files, and deployment playbooks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(safeData?.brandAssets || []).map((asset, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span className="uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                    {asset.format}
                  </span>
                  <span className="text-zinc-500">{asset.size}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2 mb-2">{asset.name}</h4>
              </div>

              <a
                href={asset.downloadUrl}
                download
                className="mt-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download Asset
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Warranty Ticket Modal */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white font-mono">Dispatch Priority SLA Ticket</h3>
              </div>
              <button
                onClick={() => setTicketModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {ticketSuccess ? (
              <div className="p-6 text-center space-y-2">
                <Check className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white font-mono">Ticket Successfully Dispatched</h4>
                <p className="text-xs text-zinc-400">
                  Engineering on-call lead has been notified in project comms.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Issue Title</label>
                  <input
                    type="text"
                    required
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    placeholder="e.g. WebSocket reconnection failure on Safari"
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Priority Severity</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="low">Low (Cosmetic/Minor)</option>
                    <option value="medium">Medium (Standard Bug)</option>
                    <option value="high">High (Workflow Degraded)</option>
                    <option value="critical">Critical (Outage / Production Halt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Detailed Description</label>
                  <textarea
                    required
                    rows={4}
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    placeholder="Describe the steps to reproduce, expected vs observed behavior, and affected devices..."
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTicketModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingTicket}
                    className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
                  >
                    {submittingTicket ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    Submit Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
