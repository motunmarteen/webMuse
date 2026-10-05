'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Project, Client } from '@/lib/types/portal';
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  Key,
  Eye,
  CheckCircle2,
  Clock,
  Lock,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Copy,
  Loader2,
} from 'lucide-react';

interface ProjectWithClient extends Project {
  client: Client | null;
}

export function ProjectDataGrid({ projects }: { projects: ProjectWithClient[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [impersonatingId, setImpersonatingId] = useState<string | null>(null);
  const [inviteModalData, setInviteModalData] = useState<{
    link: string;
    email: string;
    title: string;
  } | null>(null);
  const [generatingInviteId, setGeneratingInviteId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Filter projects
  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.client?.name && p.client.name.toLowerCase().includes(search.toLowerCase())) ||
      (p.client?.company && p.client.company.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (phaseFilter === 'all') return true;
    if (phaseFilter === 'phase1') return p.currentPhaseIndex === 0;
    if (phaseFilter === 'phase2') return p.currentPhaseIndex === 1;
    if (phaseFilter === 'phase3') return p.currentPhaseIndex === 2;
    if (phaseFilter === 'phase4') return p.currentPhaseIndex === 3;
    if (phaseFilter === 'phase5') return p.currentPhaseIndex === 4;

    return true;
  });

  const handleImpersonate = async (projectId: string) => {
    try {
      setImpersonatingId(projectId);
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (data.success && data.redirectUrl) {
        window.open(data.redirectUrl, '_blank');
      } else {
        alert(data.error || 'Failed to impersonate client.');
      }
    } catch (err) {
      console.error(err);
      alert('Error initiating impersonation session.');
    } finally {
      setImpersonatingId(null);
    }
  };

  const handleGenerateInvite = async (projectId: string, title: string) => {
    try {
      setGeneratingInviteId(projectId);
      const res = await fetch(`/api/admin/projects/${projectId}/dispatch-invite`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success && data.magicLink) {
        setInviteModalData({
          link: data.magicLink,
          email: data.clientEmail,
          title,
        });
      } else {
        alert(data.error || 'Failed to generate magic link.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error generating invite.');
    } finally {
      setGeneratingInviteId(null);
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project, client, slug, or company..."
            className="w-full rounded-xl border border-card-border bg-card-bg pl-10 pr-4 py-2.5 text-xs font-mono text-foreground placeholder:text-text-muted/60 focus:border-electric-blue focus:outline-none transition-colors"
          />
        </div>

        {/* Phase Filter Tabs - All Visible at Once */}
        <div className="flex flex-wrap items-center gap-1 pb-1 md:pb-0 font-mono text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'phase1', label: 'Ph 1: PRD' },
            { id: 'phase2', label: 'Ph 2: Design' },
            { id: 'phase3', label: 'Ph 3: Core' },
            { id: 'phase4', label: 'Ph 4: QA' },
            { id: 'phase5', label: 'Ph 5: Launch' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPhaseFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                phaseFilter === tab.id
                  ? 'bg-card-bg border border-card-border text-electric-blue font-semibold shadow-sm'
                  : 'text-text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid / List */}
      {filtered.length === 0 ? (
        <div className="glassmorphism-card rounded-2xl p-12 text-center space-y-3 font-mono">
          <SlidersHorizontal className="w-8 h-8 text-text-muted mx-auto" />
          <div className="text-foreground font-semibold text-sm">No Projects Matching Filter</div>
          <p className="text-xs text-text-muted max-w-sm mx-auto">
            Try adjusting your search criteria or create a new project via the Genesis Wizard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((project) => {
            const currentMilestone =
              project.milestones[project.currentPhaseIndex] || project.milestones[0];
            const completedCount = project.milestones.filter((m) => m.status === 'completed').length;
            const progressPercent = Math.round((completedCount / project.milestones.length) * 100);

            return (
              <div
                key={project.id}
                className="glassmorphism-card rounded-2xl p-5 sm:p-6 transition-all hover:border-card-border/90 border border-card-border flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Project & Client Details */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-electric-blue">
                      /portal/{project.slug}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-card-border bg-card-bg text-emerald-400">
                      {project.status}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-display text-text-title truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-muted font-light line-clamp-1 mt-0.5">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  {/* Client badge */}
                  <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                    <span className="text-foreground font-medium">
                      {project.client?.name || 'Unnamed Client'}
                    </span>
                    <span>•</span>
                    <span className="text-text-muted">{project.client?.company || 'Organization'}</span>
                    <span>•</span>
                    <span className="text-text-muted/70">{project.client?.email}</span>
                  </div>
                </div>

                {/* Center: Phase Stepper Mini & Budget */}
                <div className="lg:w-72 space-y-2 border-t lg:border-t-0 lg:border-l border-card-border pt-4 lg:pt-0 lg:pl-6 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-text-muted">
                      Phase {project.currentPhaseIndex + 1} of {project.milestones.length}:
                    </span>
                    <span className="text-electric-blue font-semibold">
                      {currentMilestone?.title.split('&')[0]}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-card-bg border border-card-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-electric-blue h-full transition-all duration-500"
                      style={{ width: `${Math.max(progressPercent, 12)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-text-muted">Pipeline Budget:</span>
                    <span className="text-foreground font-semibold">
                      ${project.totalBudgetUsd?.toLocaleString()}{' '}
                      <span className="text-text-muted font-normal">
                        (₦{(project.totalBudgetNgn / 1000000).toFixed(1)}M)
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right: Quick Actions */}
                <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 border-t lg:border-t-0 lg:border-l border-card-border pt-4 lg:pt-0 lg:pl-6">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold font-mono text-xs uppercase tracking-wider transition-all"
                  >
                    <span>Manage Deck</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => handleImpersonate(project.id)}
                      disabled={impersonatingId === project.id}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-electric-blue/50 bg-electric-blue/15 text-electric-blue hover:bg-electric-blue/25 font-mono text-[11px] font-semibold transition-all disabled:opacity-50 shadow-sm"
                      title="Open portal as this client in new tab"
                    >
                      {impersonatingId === project.id ? (
                        <Loader2 className="w-3 h-3 animate-spin text-electric-blue" />
                      ) : (
                        <Eye className="w-3 h-3 text-electric-blue" />
                      )}
                      <span>Impersonate Client</span>
                    </button>

                    <button
                      onClick={() => handleGenerateInvite(project.id, project.title)}
                      disabled={generatingInviteId === project.id}
                      className="flex-1 lg:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground font-mono text-[11px] transition-colors disabled:opacity-50"
                      title="Generate new magic login link for client"
                    >
                      {generatingInviteId === project.id ? (
                        <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                      ) : (
                        <Key className="w-3 h-3 text-emerald-400" />
                      )}
                      <span>Magic Link</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Magic Link Modal */}
      {inviteModalData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-card-border shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2 text-xs font-mono text-electric-blue">
                <Key className="w-4 h-4" />
                <span>CRYPTOGRAPHIC MAGIC LINK</span>
              </div>
              <button
                onClick={() => setInviteModalData(null)}
                className="text-text-muted hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold font-display text-text-title">
                Single-Use Client Access Link
              </h3>
              <p className="text-xs text-text-muted font-mono leading-relaxed">
                Send this link to <span className="text-foreground font-semibold">{inviteModalData.email}</span> for direct authenticated access to{' '}
                <span className="text-foreground font-semibold">&quot;{inviteModalData.title}&quot;</span>.
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <label className="block text-[10px] text-text-muted uppercase tracking-wider">
                Magic Verification Link (Expires in 7 days / Single-Use)
              </label>
              <div className="flex items-center gap-2 p-3 rounded-xl border border-card-border bg-card-bg break-all text-[11px] text-electric-blue font-mono">
                <span className="flex-1 line-clamp-2">{inviteModalData.link}</span>
                <button
                  onClick={() => handleCopyLink(inviteModalData.link)}
                  className="px-3 py-1.5 rounded-lg border border-card-border bg-background hover:bg-zinc-800 text-foreground text-xs flex items-center gap-1.5 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.open(inviteModalData.link, '_blank')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Launch Link Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
