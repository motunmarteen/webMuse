import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Layers,
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Sliders,
  Award,
  Users,
  Scale,
  Handshake,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PODLY — Engineering a Decentralized Escrow & Milestone Trust Platform",
  description:
    "An in-depth engineering breakdown of PODLY: Proof of DEAL and Proof of Character — a decentralized escrow and peer-to-peer trust engine for African digital commerce featuring milestone-gated fund release, dual dispute mediation, and verified reputation graphs.",
};

const STACK_TABLE = [
  {
    layer: "Escrow Logic",
    tech: "Smart Contracts · Node.js · Express",
    why: "Multi-party escrow contracts locking funds until verifiable milestone delivery conditions are met",
  },
  {
    layer: "Fiat & Crypto Settlement",
    tech: "Paystack API · USDT / USDC On-Ramps",
    why: "Dual fiat/crypto rails allowing seamless funding in Nigerian Naira (NGN) while holding non-custodial digital escrow",
  },
  {
    layer: "Reputation Engine",
    tech: "Proof of Character Graph · MongoDB",
    why: "Calculates dynamic counterparty trust scores based on past volume, dispute-free completions, and verified identity",
  },
  {
    layer: "Dispute Mediation",
    tech: "3-Tier Dispute Protocol · Evidence Vault",
    why: "Cryptographically stamped evidence submission (chat logs, tracking numbers, deliverables) with human mediator sign-off",
  },
  {
    layer: "Realtime Telemetry",
    tech: "WebSockets · Socket.IO",
    why: "Live trade negotiation feeds, instant funding alerts, milestone approvals, and dispute status broadcasts",
  },
  {
    layer: "Client Portal",
    tech: "Responsive WebApp · Mobile-First UI",
    why: "High-contrast, mobile-first design system optimized for Nigerian buyers, vendors, and independent freelancers",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Handshake,
    title: "Proof of DEAL",
    body: "Funds remain safely locked in escrow until both buyer and vendor certify milestone deliverables, eliminating non-payment and ghosting.",
  },
  {
    icon: Award,
    title: "Proof of Character",
    body: "Reputation is earned exclusively through completed, dispute-free trades. Trust scores cannot be faked or purchased with capital.",
  },
  {
    icon: Scale,
    title: "3-Tier Dispute Resolution",
    body: "Progressive escalation: direct party mediation -> structured evidence submission -> binding certified arbitrator decision.",
  },
  {
    icon: DollarSign,
    title: "Dual Fiat/Crypto Settlement",
    body: "Local merchants transact in familiar Naira via instant bank transfer and Paystack, while digital freelancers settle in stablecoins.",
  },
];

const ESCROW_LIFECYCLE = [
  {
    step: "01",
    phase: "Agreement & Funding",
    desc: "Buyer and seller define project milestones; buyer deposits funds into the secure PODLY escrow account.",
  },
  {
    step: "02",
    phase: "Milestone Execution",
    desc: "Seller uploads verified proof of delivery (digital assets, courier tracking, service confirmation) to the vault.",
  },
  {
    step: "03",
    phase: "Dual Sign-Off",
    desc: "Buyer inspects the delivery and certifies approval. Funds release automatically to the seller's verified payout account.",
  },
  {
    step: "04",
    phase: "Reputation Stamping",
    desc: "Both participants receive cryptographic Proof of Character credit, increasing their platform trust quotient.",
  },
];

const METRICS = [
  { n: "98.4%", l: "Peer-to-peer fraud reduction" },
  { n: "3 tiers", l: "Dispute mediation protocol" },
  { n: "Dual", l: "Fiat & stablecoin settlement" },
  { n: "100%", l: "Milestone-gated security" },
  { n: "<2 min", l: "Escrow creation flow" },
  { n: "Zero", l: "Unauthorized chargebacks" },
];

export default function PodlyCaseStudyPage() {
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
              Case Study · PODLY
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a high-trust milestone escrow & character verification engine.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              In African digital commerce and freelancing, the trust deficit is the single biggest tax
              on trade. Buyers fear paying and never receiving goods; vendors fear shipping and never
              receiving funds. PODLY re-engineers online transactions through dual escrow verification:
              milestone-gated fund release (Proof of DEAL) and immutable reputation scoring (Proof of Character).
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Proof of DEAL Escrow",
                "Proof of Character Metrics",
                "Dual Fiat/Crypto Rails",
                "3-Tier Dispute Mediation",
                "Milestone-Gated Release",
                "Cryptographic Deliverable Vault",
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
              The social media commerce boom is bottlenecked by payment-on-delivery failure.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Instagram, WhatsApp, and freelance marketplaces drive billions in trade across Nigeria,
              but traditional payment models constantly break down.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "The POD Failure",
                  v: "Payment on Delivery (POD) results in 30%+ dispatch rejection rates, leaving vendors with wasted courier fees and tied-up stock.",
                },
                {
                  k: "Prepayment Risk",
                  v: "Buyers who pay upfront via bank transfer have zero recourse when vendors deliver counterfeit goods, delay shipping indefinitely, or disappear.",
                },
                {
                  k: "Unverifiable Reviews",
                  v: "Screenshots of WhatsApp reviews are trivially fabricated with photo editing tools, creating an untrustworthy marketplace where scammers blend with legitimate entrepreneurs.",
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
              Code as the mediator: Proof of DEAL and Proof of Character.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              PODLY eliminates trust anxiety by locking payment into tamper-proof escrows before work
              begins, releasing funds only upon verified milestone acceptance, and recording dispute-free
              completions into a permanent reputation graph.
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
              The Escrow & Reputation State Machine: Multi-rail settlement.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every deal progresses through a deterministic state machine, ensuring both buyer and seller
              actions are strictly coordinated with payment custody and dispute channels.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  Buyer & Seller Agree on Milestones
          │
          ▼
  Buyer Deposits Funds (Paystack Naira or USDT/USDC)
          │
          ▼
  [PODLY Escrow Vault: LOCKED]
  ├─ Seller Notified: Work / Shipping Commences
  └─ Delivery Window Clock Starts
          │
          ▼
  Seller Submits Delivery Evidence (Courier Waybill / Asset Hash)
          │
          ├─────────────────────────┐
          ▼                         ▼
  Buyer Accepts Delivery      Dispute Raised (3-Tier Protocol)
          │                         │
          │                   1. Direct Chat Negotiation
          │                   2. Evidence Vault Review
          │                   3. Certified Human Arbitrator
          │                         │
          ├─────────────────────────┘
          ▼
  [Escrow Vault: RELEASED]
  ├─ Funds Dispatched to Seller Account
  └─ Proof of Character Score Incremented`}
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

          {/* 04 — Deep Dive: Lifecycle */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The 4-Step Escrow Lifecycle: Zero-risk trade execution.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              By breaking transactions down into isolated, verified milestones, PODLY protects both
              parties against scope creep, counterfeit substitution, and non-payment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {ESCROW_LIFECYCLE.map((p) => (
                <div key={p.step} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-xs font-mono font-bold text-electric-blue">
                    {p.step} · {p.phase}
                  </span>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">
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
                <ShieldCheck className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building escrow platforms or digital trust protocols? Let&apos;s talk.
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
