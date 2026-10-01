import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Share2,
  Cpu,
  Layers,
  Lock,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Sliders,
  Send,
  Sparkles,
  Target,
  MessageSquare,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PMOS (PIP) — Engineering an Autonomous Platform-Native Media Operating System",
  description:
    "An in-depth engineering breakdown of PMOS (PIP): an autonomous, platform-native content engine — BullMQ job pipelines, Claude 3.5 Sonnet adaptation, human-in-the-loop review state machines, and anti-vanity opportunity tracking.",
};

const STACK_TABLE = [
  {
    layer: "Core Backend",
    tech: "Node.js · Express · TypeScript (Strict)",
    why: "Event-driven modular monolith managing idea capture, prompt orchestration, and queue dispatching",
  },
  {
    layer: "AI Synthesis Engine",
    tech: "Anthropic Claude 3.5 Sonnet · Prompt Engineering",
    why: "Transforms a single raw thesis into platform-native drafts (X threads, LinkedIn long-form, Threads conversations)",
  },
  {
    layer: "Job Queue & Scheduling",
    tech: "BullMQ · Redis",
    why: "Persistent, rate-limit-conscious publishing workers with exponential backoff and delayed execution",
  },
  {
    layer: "Platform Adapters",
    tech: "LinkedIn API v2 · X API v2 · Meta Threads Graph",
    why: "Decoupled OAuth2 authentication, token rotation, media upload chunking, and network-specific payload shaping",
  },
  {
    layer: "Cost & Quota Guard",
    tech: "API Cost Tracker · Tiered Throttle Rules",
    why: "Guards against unexpected X (Twitter) API per-request paywalls and monitors monthly API expense limits",
  },
  {
    layer: "Human Review",
    tech: "State Machine · Webhook Notifications",
    why: "Strict human-in-the-loop gate: drafts remain in staged state until explicitly certified and scheduled by the creator",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Target,
    title: "Anti-Vanity North Star",
    body: "The system optimizes for meaningful business outcomes (inbound client inquiries, partnership offers, podcast invitations) rather than vanity likes and impressions.",
  },
  {
    icon: Sparkles,
    title: "Platform-Native, Not Cross-Post",
    body: "A single core concept is refactored by Claude into native conventions: narrative hook for LinkedIn, punchy thread for X, and conversational prompt for Threads.",
  },
  {
    icon: Lock,
    title: "Human Stays in Control",
    body: "Zero blind auto-publishing. Every synthesized artifact passes through a strict approval state machine requiring human sign-off before entering the queue.",
  },
  {
    icon: Zap,
    title: "Resilient Distributed Workers",
    body: "BullMQ and Redis handle transient platform outages and rate limits with jittered exponential backoff and dead-letter queue auditing.",
  },
];

const PUBLISHING_LIFECYCLE = [
  {
    stage: "01. Capture",
    name: "Raw Idea Ingestion",
    desc: "A voice note transcription, quick code observation, or architecture diagram is logged to the Idea Vault with key bullet points.",
  },
  {
    stage: "02. Synthesize",
    name: "Multi-Platform Generator",
    desc: "Claude 3.5 Sonnet ingests the raw thought and executes platform-tailored prompts to produce 3 native formats simultaneously.",
  },
  {
    stage: "03. Gate",
    name: "Human Review & Refine",
    desc: "The creator edits, approves, or rejects each platform draft via a clean terminal or web dashboard. The draft cannot publish without approval.",
  },
  {
    stage: "04. Dispatch",
    name: "BullMQ Rate-Limited Queue",
    desc: "Approved drafts are scheduled into BullMQ queues calibrated to platform-specific posting cadences and API rate windows.",
  },
];

const METRICS = [
  { n: "3 networks", l: "Native API adapters" },
  { n: "100%", l: "Human approval gate" },
  { n: "0", l: "Blind auto-publishes" },
  { n: "3 formats", l: "Generated per core idea" },
  { n: "<2 sec", l: "Multi-draft synthesis" },
  { n: "0 drift", l: "Platform token rotation" },
];

export default function PmosCaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded-full"
          >
            <Image
              src="/webMuse-Logo.png"
              alt="WEBMUSE Logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <span className="font-display font-bold tracking-widest text-base text-text-title">
              WEBMUSE
            </span>
          </Link>
          <Link
            href="/case-study"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All case studies
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-grow relative overflow-hidden">
        <div
          className="absolute top-[5%] right-[-8%] h-[420px] w-[420px] rounded-full bg-mesh-purple opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero */}
        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study · PMOS (PIP)
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering an autonomous, platform-native content engine & media OS.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Social media schedulers treat content as interchangeable text blocks cross-posted
              identically across networks, alienating audiences and triggering algorithmic penalties.
              PMOS (Personal Intelligence Publisher) rethinks media distribution as an autonomous
              operating system: Claude-powered platform synthesis, BullMQ job queues, and an anti-vanity
              metric architecture.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Claude 3.5 Sonnet Adaptation",
                "BullMQ & Redis Pipelines",
                "Human-in-the-Loop Review",
                "Platform-Native Adapters",
                "OAuth2 Token Rotation",
                "Anti-Vanity Opportunity Tracking",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wider text-text-muted border border-card-border rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-24 flex flex-col gap-16 pb-20">
          {/* 01 — Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              01 — Problem
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Cross-posting is dead. Nuance matters, but manual adaptation doesn't scale.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Founders and engineering leaders have high-value insights, but communicating them consistently
              across LinkedIn, X, and Threads requires hours of rewriting to match each platform's
              unique vernacular and character constraints.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "The Cross-Post Trap",
                  v: "Posting the exact same text block to LinkedIn, X, and Threads looks lazy and performs poorly. X demands punchy thread cadence, LinkedIn requires structured professional storytelling, and Threads favors casual conversational starters.",
                },
                {
                  k: "Vanity Metrics Trap",
                  v: "Most tools celebrate likes and impressions. For a high-end engineering consultancy like WEBMUSE, 10,000 viral views that produce 0 inquiries is a failure; 300 views that produce 2 enterprise client contracts is a massive win.",
                },
                {
                  k: "The Automation Hazard",
                  v: "Fully autonomous AI posting without human sign-off leads to hallucinatory claims, embarrassing tone mismatches, and brand reputation damage.",
                },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-28">
                    {row.k}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 02 — Thesis */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              02 — Thesis
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              One idea, platform-native execution, human-certified delivery.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              PMOS is built on a constitutional mandate: the creator provides the genuine insight,
              AI models perform the stylistic translation, and the creator certifies the output.
              Every pipeline stage is auditable, and the queue enforces platform rate compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {ARCHITECTURE_PILLARS.map((p) => (
                <div key={p.title} className="glassmorphism-card rounded-xl p-5">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue w-fit">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-text-title tracking-tight mt-3">
                    {p.title}
                  </h3>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 03 — Architecture */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              03 — Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The PIP Engine Architecture: Modular synthesis with BullMQ persistence.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Incoming concepts flow from the Idea Repository into the Claude Synthesizer, producing
              staged drafts. Upon approval, BullMQ workers manage delayed dispatch and token rotation.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  Creator Input (Voice note / Text bullet)
          │
          ▼
  [Idea Service] ─── Validated & Stored
          │
          ▼
  [Claude Synthesizer] ─── Platform-Specific Prompts
          │
          ├──> LinkedIn Draft (Long-form narrative + takeaways)
          ├──> X Thread Draft (Hook + numbered insights + CTA)
          └──> Threads Draft (Conversational question + brief context)
          │
          ▼
  [Human Review Gate] ─── Approved by Creator (100% Gated)
          │
          ▼
  [BullMQ Redis Queue] ─── Jittered Cadence & Rate Control
          │
          ├──> [LinkedIn Publisher] (OAuth2 + URN asset registration)
          ├──> [X Publisher] (OAuth2 + v2 tweets endpoint + pricing guard)
          └──> [Threads Publisher] (Meta Graph API container publishing)
          │
          ▼
  [Opportunity Tracker] ── Tracks Inbound Enquiries & Conversions`}
              </pre>
            </div>

            <div className="rounded-xl border border-card-border overflow-x-auto mt-5">
              <table className="w-full text-sm min-w-[540px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Layer", "Technology", "Why it's there"].map((h) => (
                      <th
                        key={h}
                        className="text-left font-mono text-[10px] uppercase tracking-widest text-text-muted px-4 py-3 border-b border-card-border"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {STACK_TABLE.map((row) => (
                    <tr key={row.layer} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-medium whitespace-nowrap">
                        {row.layer}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted whitespace-nowrap">
                        {row.tech}
                      </td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 04 — Deep Dive: State Machine */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The 4-Stage Lifecycle: Eliminating accidental publishes.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every piece of content traverses a rigid state machine. A draft in state{" "}
              <code className="font-mono text-xs">STAGED</code> cannot be picked up by publishing
              workers under any circumstances until transitioned to{" "}
              <code className="font-mono text-xs text-emerald-400">APPROVED</code> by user authentication.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {PUBLISHING_LIFECYCLE.map((p) => (
                <div key={p.stage} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-xs font-mono font-bold text-electric-blue">
                    {p.stage}
                  </span>
                  <h4 className="text-sm font-bold text-text-title tracking-tight mt-2">
                    {p.name}
                  </h4>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              05 — By the numbers
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {METRICS.map((m) => (
                <div key={m.l} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <div className="text-xl font-bold text-text-title font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <a
              href="#booking"
              className="group flex items-center justify-between p-5 rounded-2xl border border-dashed border-electric-blue/30 bg-electric-blue/5 hover:bg-electric-blue/10 hover:border-electric-blue/50 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Share2 className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building autonomous AI media systems or workflow engines? Let&apos;s talk.
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-electric-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </section>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} WEBMUSE INC. ALL RIGHTS RESERVED.
          </span>
          <nav
            aria-label="Legal"
            className="flex items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest"
          >
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/status" className="hover:text-foreground transition-colors">
              Status
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
