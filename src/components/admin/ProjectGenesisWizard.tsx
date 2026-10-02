'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Building,
  User,
  Mail,
  FileCode,
  DollarSign,
  Layers,
  Send,
  Loader2,
} from 'lucide-react';

interface DeliverableDraft {
  title: string;
  description?: string;
}

interface MilestoneDraft {
  title: string;
  subtitle: string;
  description: string;
  costUsd: number;
  costNgn: number;
  targetCompletionDays: number;
  deliverables: DeliverableDraft[];
}

const DEFAULT_TECH_STACK = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'Supabase',
  'PostgreSQL',
  'FastAPI',
  'WebSockets',
  'Three.js',
  'GSAP',
  'Vercel',
  'NOWPayments (Crypto USDT)',
  'Paystack (NGN Fiat)',
  'Cloudflare Edge',
];

const INITIAL_MILESTONES: MilestoneDraft[] = [
  {
    title: 'Genesis Discovery & PRD Sign-Off',
    subtitle: 'Scope Freezing & System Architecture Consensus',
    description:
      'Stakeholder alignment interviews, technical architecture design, database ERD mapping, and finalization of the Living Genesis PRD with digital scope sign-off.',
    costUsd: 2500,
    costNgn: 3750000,
    targetCompletionDays: 7,
    deliverables: [
      { title: 'Stakeholder Discovery & Architecture Matrix' },
      { title: 'Living Genesis PRD Canvas (v1.0)' },
      { title: 'Database Schema & Infrastructure Topology' },
    ],
  },
  {
    title: 'UI/UX Architecture & Design System',
    subtitle: 'Cyberpunk Visual Identity & Interactive Prototypes',
    description:
      'High-fidelity Figma wireframes, responsive viewport tokens, micro-interaction specifications, and clickable interactive prototype walkthrough.',
    costUsd: 4000,
    costNgn: 6000000,
    targetCompletionDays: 14,
    deliverables: [
      { title: 'Design Tokens & Figma Component Library' },
      { title: 'Desktop & Mobile High-Fidelity UI Screens' },
      { title: 'Interactive Prototype Walkthrough' },
    ],
  },
  {
    title: 'Core Engine Sprint & Full-Stack Build',
    subtitle: 'Frontend, WebSocket Telemetry & API Integration',
    description:
      'Execution of reactive frontend interfaces, server-side data mutations, real-time subscriptions, API connectivity, and edge optimizations.',
    costUsd: 7000,
    costNgn: 10500000,
    targetCompletionDays: 21,
    deliverables: [
      { title: 'Next.js 16 Responsive Frontend & Animations' },
      { title: 'Database Integration, Auth & Security Policies' },
      { title: 'Real-time WebSocket & Backend API Mesh' },
    ],
  },
  {
    title: 'Staging QA, Stress Audits & User Testing',
    subtitle: 'Live Staging Review Deck & Security Hardening',
    description:
      'Isolated staging deployment, penetration testing, performance Lighthouse 100/100 tuning, and pinpoint client annotation review rounds.',
    costUsd: 3000,
    costNgn: 4500000,
    targetCompletionDays: 10,
    deliverables: [
      { title: 'Staging Environment Deployment & Review Studio' },
      { title: 'Cross-device Quality Assurance & Bug Fixes' },
      { title: 'Security Audit & Performance Optimization' },
    ],
  },
  {
    title: 'Handoff, Digital Safe Release & 30-Day SLA',
    subtitle: 'Production Cutover & Warranty Activation',
    description:
      'Custom domain DNS propagation, GitHub repo transfer, environment credential packaging into the Handoff Safe, and 30-day post-launch warranty initiation.',
    costUsd: 2000,
    costNgn: 3000000,
    targetCompletionDays: 5,
    deliverables: [
      { title: 'Production Domain DNS & Edge SSL Cutover' },
      { title: 'GitHub Organization Repository Transfer' },
      { title: 'Handoff Digital Safe Unlock & 30-Day Warranty' },
    ],
  },
];

export function ProjectGenesisWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Client
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientTelegram, setClientTelegram] = useState('');
  const [clientDiscord, setClientDiscord] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Step 2: Project Scope
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [stagingUrl, setStagingUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [designUrl, setDesignUrl] = useState('');

  // Step 3: Tech Stack
  const [techStack, setTechStack] = useState<string[]>([
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS v4',
    'Supabase',
    'Vercel',
  ]);
  const [customTech, setCustomTech] = useState('');

  // Step 4: Milestones
  const [milestones, setMilestones] = useState<MilestoneDraft[]>(INITIAL_MILESTONES);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    projectSlug: string;
    projectId: string;
    magicLink: string;
    rawToken: string;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setProjectTitle(val);
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setProjectSlug(slug);
  };

  // Tech stack toggling
  const toggleTech = (tech: string) => {
    if (techStack.includes(tech)) {
      setTechStack(techStack.filter((t) => t !== tech));
    } else {
      setTechStack([...techStack, tech]);
    }
  };

  const addCustomTech = () => {
    if (customTech.trim() && !techStack.includes(customTech.trim())) {
      setTechStack([...techStack, customTech.trim()]);
      setCustomTech('');
    }
  };

  // Milestone pricing calculations
  const totalUsd = milestones.reduce((sum, m) => sum + (Number(m.costUsd) || 0), 0);
  const totalNgn = milestones.reduce((sum, m) => sum + (Number(m.costNgn) || 0), 0);

  // Milestone deliverable helpers
  const addDeliverable = (mIndex: number) => {
    const updated = [...milestones];
    updated[mIndex].deliverables.push({ title: 'New Deliverable Item' });
    setMilestones(updated);
  };

  const removeDeliverable = (mIndex: number, dIndex: number) => {
    const updated = [...milestones];
    updated[mIndex].deliverables.splice(dIndex, 1);
    setMilestones(updated);
  };

  const updateDeliverable = (mIndex: number, dIndex: number, title: string) => {
    const updated = [...milestones];
    updated[mIndex].deliverables[dIndex].title = title;
    setMilestones(updated);
  };

  // Launch project submission
  const handleLaunchProject = async () => {
    setSubmitting(true);
    try {
      const payload = {
        client: {
          name: clientName,
          email: clientEmail,
          company: clientCompany,
          telegramHandle: clientTelegram,
          discordHandle: clientDiscord,
          phone: clientPhone,
        },
        project: {
          title: projectTitle,
          slug: projectSlug,
          tagline: projectTagline,
          description: projectDescription,
          techStack,
          stagingUrl: stagingUrl || undefined,
          repoUrl: repoUrl || undefined,
          designUrl: designUrl || undefined,
          milestones,
        },
      };

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to initialize project.');
        setSubmitting(false);
        return;
      }

      setSubmissionSuccess({
        projectSlug: data.project.slug,
        projectId: data.project.id,
        magicLink: data.magicLink,
        rawToken: data.rawToken,
      });
    } catch (err) {
      console.error(err);
      alert('Network error while launching project.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-mono">
      {/* Wizard Progress Stepper */}
      <div className="glassmorphism-card rounded-2xl p-4 sm:p-6 border border-card-border shadow-xl">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: 1, label: 'Client Identity', icon: User },
            { step: 2, label: 'Scope & Specs', icon: FileCode },
            { step: 3, label: 'Tech Stack', icon: Layers },
            { step: 4, label: 'Milestones', icon: DollarSign },
            { step: 5, label: 'Review & Launch', icon: Send },
          ].map((item) => {
            const isCompleted = currentStep > item.step;
            const isCurrent = currentStep === item.step;
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                onClick={() => currentStep > item.step && setCurrentStep(item.step)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-electric-blue/10 border border-electric-blue text-electric-blue'
                    : isCompleted
                    ? 'text-emerald-400'
                    : 'text-text-muted opacity-50'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                    isCurrent
                      ? 'bg-electric-blue text-black'
                      : isCompleted
                      ? 'bg-emerald-400 text-black'
                      : 'border border-card-border bg-card-bg'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : item.step}
                </div>
                <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-semibold">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="glassmorphism-card rounded-2xl p-6 sm:p-8 border border-card-border shadow-2xl relative">
        {/* ================= STEP 1: CLIENT IDENTITY ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                STEP 01 // CLIENT STAKEHOLDER
              </div>
              <h2 className="text-2xl font-bold font-display text-text-title mt-1">
                Client Profile & Whitelist Access
              </h2>
              <p className="text-xs text-text-muted mt-1 font-light">
                This email will be whitelisted in the WebMuse database. Uninvited emails cannot access the portal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Client Full Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  required
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Primary Client Email *</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@apexlabs.io"
                  required
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Organization / Company *</label>
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g. Apex Labs Inc."
                  required
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Telegram Handle (Optional)</label>
                <input
                  type="text"
                  value={clientTelegram}
                  onChange={(e) => setClientTelegram(e.target.value)}
                  placeholder="@alexvance"
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Discord Handle (Optional)</label>
                <input
                  type="text"
                  value={clientDiscord}
                  onChange={(e) => setClientDiscord(e.target.value)}
                  placeholder="alex#1234"
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Contact Phone (Optional)</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PROJECT SCOPE ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                STEP 02 // SCOPE & ARCHITECTURE
              </div>
              <h2 className="text-2xl font-bold font-display text-text-title mt-1">
                Project Scope & Specification
              </h2>
              <p className="text-xs text-text-muted mt-1 font-light">
                Define the project title, URL slug, and core architectural summary.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-text-muted uppercase">Project Title *</label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Nexus Liquidity Engine"
                    required
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-text-muted uppercase">URL Slug *</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted text-[11px]">
                      /portal/
                    </span>
                    <input
                      type="text"
                      value={projectSlug}
                      onChange={(e) => setProjectSlug(e.target.value)}
                      placeholder="nexus-liquidity-engine"
                      required
                      className="w-full rounded-xl border border-card-border bg-card-bg pl-20 pr-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Project Tagline</label>
                <input
                  type="text"
                  value={projectTagline}
                  onChange={(e) => setProjectTagline(e.target.value)}
                  placeholder="e.g. Next-Generation Cross-Chain Arbitrage Protocol"
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-text-muted uppercase">Executive Summary & Scope *</label>
                <textarea
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe the scope, objectives, problem solved, and technical deliverables..."
                  className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-3 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-text-muted uppercase">Staging URL (Optional)</label>
                  <input
                    type="url"
                    value={stagingUrl}
                    onChange={(e) => setStagingUrl(e.target.value)}
                    placeholder="https://staging.domain.com"
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-text-muted uppercase">GitHub Repo (Optional)</label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/webmuse/repo"
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-text-muted uppercase">Figma Specs (Optional)</label>
                  <input
                    type="url"
                    value={designUrl}
                    onChange={(e) => setDesignUrl(e.target.value)}
                    placeholder="https://figma.com/file/..."
                    className="w-full rounded-xl border border-card-border bg-card-bg px-4 py-2.5 text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: TECH STACK MATRIX ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                STEP 03 // TECH UNIVERSE
              </div>
              <h2 className="text-2xl font-bold font-display text-text-title mt-1">
                Technology Stack Matrix
              </h2>
              <p className="text-xs text-text-muted mt-1 font-light">
                Select the infrastructure and frameworks powering this client sprint.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {DEFAULT_TECH_STACK.map((tech) => {
                  const isSelected = techStack.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                        isSelected
                          ? 'bg-electric-blue/15 border-electric-blue text-electric-blue font-semibold shadow-sm'
                          : 'bg-card-bg border-card-border text-text-muted hover:text-foreground'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {tech}
                    </button>
                  );
                })}
              </div>

              {/* Custom Tech Adder */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={customTech}
                  onChange={(e) => setCustomTech(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTech())}
                  placeholder="Add custom library or technology..."
                  className="rounded-xl border border-card-border bg-card-bg px-4 py-2 text-xs font-mono text-foreground placeholder:text-text-muted/50 focus:border-electric-blue focus:outline-none flex-1 max-w-sm"
                />
                <button
                  type="button"
                  onClick={addCustomTech}
                  className="px-4 py-2 rounded-xl border border-card-border bg-card-bg hover:bg-zinc-800 text-xs font-mono text-foreground flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Tech</span>
                </button>
              </div>

              {/* Selected Tech Chips List */}
              <div className="p-4 rounded-xl border border-card-border bg-card-bg/50 space-y-2">
                <div className="text-[10px] text-text-muted uppercase">Active Selected Stack ({techStack.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-card-bg border border-card-border text-[11px] text-foreground flex items-center gap-1.5"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className="text-text-muted hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: MILESTONES & PRICING ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] text-electric-blue uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  STEP 04 // DELIVERY MILESTONES
                </div>
                <h2 className="text-2xl font-bold font-display text-text-title mt-1">
                  Milestone Engine & Pricing Configurator
                </h2>
                <p className="text-xs text-text-muted mt-1 font-light">
                  WebMuse 5-Phase framework pre-populated with dual USD & NGN pricing.
                </p>
              </div>

              {/* Total Dual-Budget Meter */}
              <div className="px-4 py-2.5 rounded-xl border border-card-border bg-card-bg text-right font-mono">
                <div className="text-[10px] text-text-muted uppercase">Total Engagement Budget</div>
                <div className="text-foreground font-bold text-sm">
                  ${totalUsd.toLocaleString()}{' '}
                  <span className="text-electric-blue font-normal">
                    (₦{totalNgn.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {milestones.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="rounded-xl border border-card-border bg-card-bg/60 p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-card-border">
                    <span className="text-electric-blue font-bold tracking-wider">
                      PHASE 0{mIdx + 1}
                    </span>
                    <span className="text-text-muted text-[11px]">
                      Est. Duration: {m.targetCompletionDays} days
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] text-text-muted uppercase">Phase Title</label>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[mIdx].title = e.target.value;
                          setMilestones(updated);
                        }}
                        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground text-xs focus:border-electric-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase">Subtitle / Focus</label>
                      <input
                        type="text"
                        value={m.subtitle}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[mIdx].subtitle = e.target.value;
                          setMilestones(updated);
                        }}
                        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground text-xs focus:border-electric-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Dual Currency & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] text-text-muted uppercase">Cost (USD $)</label>
                      <input
                        type="number"
                        value={m.costUsd}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[mIdx].costUsd = Number(e.target.value) || 0;
                          setMilestones(updated);
                        }}
                        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground text-xs focus:border-electric-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase">Cost (NGN ₦)</label>
                      <input
                        type="number"
                        value={m.costNgn}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[mIdx].costNgn = Number(e.target.value) || 0;
                          setMilestones(updated);
                        }}
                        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground text-xs focus:border-electric-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-text-muted uppercase">Target Days</label>
                      <input
                        type="number"
                        value={m.targetCompletionDays}
                        onChange={(e) => {
                          const updated = [...milestones];
                          updated[mIdx].targetCompletionDays = Number(e.target.value) || 7;
                          setMilestones(updated);
                        }}
                        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-foreground text-xs focus:border-electric-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-text-muted uppercase">Deliverables Breakdown</span>
                      <button
                        type="button"
                        onClick={() => addDeliverable(mIdx)}
                        className="text-electric-blue hover:underline text-[10px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Deliverable</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {m.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={del.title}
                            onChange={(e) => updateDeliverable(mIdx, dIdx, e.target.value)}
                            className="flex-1 rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-electric-blue focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => removeDeliverable(mIdx, dIdx)}
                            className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-card-bg"
                            title="Remove Deliverable"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= STEP 5: REVIEW & LAUNCH ================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3" />
                STEP 05 // LAUNCH VERIFICATION
              </div>
              <h2 className="text-2xl font-bold font-display text-text-title mt-1">
                Project Genesis Review
              </h2>
              <p className="text-xs text-text-muted mt-1 font-light">
                Verify the client specifications and milestone allocation before provisioning the workspace.
              </p>
            </div>

            {/* Review Cards */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg space-y-2">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Client Identity</div>
                <div className="text-sm font-semibold text-foreground">{clientName}</div>
                <div className="text-text-muted">
                  {clientCompany} • <span className="text-electric-blue">{clientEmail}</span>
                  {clientTelegram && ` • Telegram: ${clientTelegram}`}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg space-y-2">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Project Scope</div>
                <div className="text-sm font-semibold text-foreground">{projectTitle}</div>
                <div className="text-text-muted text-[11px] leading-relaxed">
                  {projectDescription || 'No description entered.'}
                </div>
                <div className="text-electric-blue text-[11px]">
                  Workspace Slug: /portal/{projectSlug}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg space-y-2">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">Tech Stack</div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-background border border-card-border text-[10px] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider">
                    Milestone Schedule ({milestones.length} Phases)
                  </div>
                  <div className="text-foreground font-bold">
                    ${totalUsd.toLocaleString()} / ₦{totalNgn.toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  {milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1.5 border-b border-card-border/60 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-electric-blue font-bold">0{idx + 1}</span>
                        <span className="text-foreground">{m.title}</span>
                      </div>
                      <div className="text-text-muted">
                        ${m.costUsd.toLocaleString()} • ~{m.targetCompletionDays}d
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleLaunchProject}
                disabled={submitting}
                className="w-full rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold font-mono text-xs uppercase tracking-wider py-4 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-electric-blue" />
                    <span>Provisioning Project & Dispatching Magic Link...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Launch Project Genesis & Dispatch Magic Invite</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-card-border mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground text-xs font-mono transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 && (
            <button
              type="button"
              onClick={() => {
                // Quick validation
                if (currentStep === 1 && (!clientName || !clientEmail || !clientCompany)) {
                  alert('Please provide Client Name, Email, and Company.');
                  return;
                }
                if (currentStep === 2 && (!projectTitle || !projectSlug)) {
                  alert('Please enter a Project Title and URL Slug.');
                  return;
                }
                setCurrentStep(currentStep + 1);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-mono font-semibold uppercase tracking-wider transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ================= SUCCESS MODAL ================= */}
      {submissionSuccess && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glassmorphism-card rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 border border-card-border shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-semibold">
                WORKSPACE PROVISIONED // ONLINE
              </div>
              <h3 className="text-2xl font-bold font-display text-text-title">
                Project Genesis Complete
              </h3>
              <p className="text-xs text-text-muted font-mono leading-relaxed max-w-sm mx-auto">
                Project workspace <span className="text-foreground font-semibold">/{submissionSuccess.projectSlug}</span> has been created.
                Single-use magic access link generated.
              </p>
            </div>

            <div className="space-y-2 text-left font-mono text-xs">
              <label className="text-[10px] text-text-muted uppercase">Magic Invite Link</label>
              <div className="flex items-center gap-2 p-3 rounded-xl border border-card-border bg-card-bg break-all text-[11px] text-electric-blue">
                <span className="flex-1 line-clamp-2">{submissionSuccess.magicLink}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(submissionSuccess.magicLink)}
                  className="px-3 py-1.5 rounded-lg border border-card-border bg-background hover:bg-zinc-800 text-foreground text-xs flex items-center gap-1.5 shrink-0"
                >
                  {copiedLink ? (
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => router.push(`/admin/projects/${submissionSuccess.projectId}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold uppercase tracking-wider transition-all"
              >
                Go to Project Deck
              </button>

              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-card-border bg-card-bg text-text-muted hover:text-foreground transition-colors"
              >
                Return to Command Deck
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
