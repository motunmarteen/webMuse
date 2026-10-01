import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Lock,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Sliders,
  AlertTriangle,
  Scale,
  Award,
  ShieldCheck,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Stayqs99 — Engineering a Quantitative Staking & Verification Platform",
  description:
    "An in-depth engineering breakdown of Stayqs99: a multi-sport quantitative selection, staking-cycle, and verification platform — calibrated probability qualifiers, Masaniello compounding sessions, provenance-tagged fact ledgers, and a Proof Credits economy.",
};

const STACK_TABLE = [
  {
    layer: "API & Orchestration",
    tech: "Python 3.12 · FastAPI · Pydantic v2",
    why: "High-performance async REST API bridging 7 modular engines, multi-goal account management, and event bus routing",
  },
  {
    layer: "Statistical Modeling",
    tech: "Dixon-Coles Bivariate Poisson · SciPy · NumPy",
    why: "Dynamic team attack/defense ratings, low-score correlation adjustment (rho), and probability calibration for low-risk legs",
  },
  {
    layer: "Staking Algorithm",
    tech: "Masaniello Cycle Engine · Fractional Kelly",
    why: "Mathematical compounding cycles: distributes risk across predefined win-target steps to protect capital against variance",
  },
  {
    layer: "Datastore & Audit",
    tech: "PostgreSQL 16 · SQLAlchemy 2.0 · Alembic",
    why: "Relational storage with immutable double-entry credit ledger, multi-account isolation, and provenance-tagged facts",
  },
  {
    layer: "Verification & Trust",
    tech: "Multi-Source Oracle Aggregator · Anti-Fraud Heuristics",
    why: "Dual-stream score ingestion, automated discrepancy detection between declared user bets and verified match realities",
  },
  {
    layer: "Client & Calculator",
    tech: "Next.js · Vanilla JS PWA Docket · Web Workers",
    why: "Offline-first Masaniello staking calculator, interactive odds slider, and real-time session progress tracking",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Scale,
    title: "Provenance-Tagged Fact Ledger",
    body: "Every platform fact carries an immutable provenance tag: DECLARED, OBSERVED, VERIFIED, CALCULATED, or INFERRED. Declared and verified values are never overwritten.",
  },
  {
    icon: Calculator,
    title: "Two-Tier Discipline Separation",
    body: "Leg selection (statistical Poisson probability filtering) is kept strictly decoupled from money management (Masaniello cycle compounding sessions).",
  },
  {
    icon: ShieldCheck,
    title: "Rejection is a Valid Output",
    body: "If market odds fail the model's calibration threshold or variance bounds, the qualifier outputs an explicit rejection rather than forcing a sub-optimal pick.",
  },
  {
    icon: Award,
    title: "Proof Credits Economy",
    body: "Platform rewards are minted exclusively from mathematically verified user actions, completely eliminating unverified claims and synthetic inflation.",
  },
];

const SEVEN_ENGINES = [
  {
    engine: "prediction-engine",
    role: "Quantitative Odds Calibration",
    desc: "Executes Dixon-Coles bivariate Poisson models, rho correlation fits, and Brier score backtesting to isolate ultra-low-risk selections in the 1.05–1.12 odds band.",
  },
  {
    engine: "session-engine",
    role: "Masaniello Staking Compounding",
    desc: "Chains individual legs into target sessions and sessions into multi-step compounding cycles, dynamically calculating exact stake sizing based on cycle progress.",
  },
  {
    engine: "verification-engine",
    role: "Truth Resolution & Ingestion",
    desc: "Connects to official match telemetry feeds, resolves conflicting match outcomes, and certifies authoritative game events into platform facts.",
  },
  {
    engine: "trust-engine",
    role: "Anti-Fraud & Behavioral Scoring",
    desc: "Measures discrepancy variance between user-declared claims and verified outcomes, adjusting user reputation scores and flagging malicious spoof attempts.",
  },
  {
    engine: "credits-engine",
    role: "Double-Entry Reward Ledger",
    desc: "Maintains an immutable double-entry ledger for Proof Credits, ensuring credit creation, staking deposits, and redemptions balance to zero.",
  },
  {
    engine: "audit-engine",
    role: "Append-Only Event Stream",
    desc: "Captures every system state change, API call, and ledger mutation into an append-only cryptographic event sequence for forensic verification.",
  },
  {
    engine: "reward-engine",
    role: "Milestone Unlocking",
    desc: "Evaluates multi-session winning streaks, disciplined cycle completions, and community contributions to distribute non-inflationary tier rewards.",
  },
];

const PROVENANCE_TIERS = [
  {
    tier: "DECLARED",
    source: "User Input",
    rule: "What a user says happened (e.g. 'I placed a ₦50,000 bet with Bookmaker A at 1.10 odds'). Treated as untrusted until verified.",
  },
  {
    tier: "OBSERVED",
    source: "Telemetry / Scrapers",
    rule: "Raw external signals recorded directly from third-party APIs or odds comparison services prior to reconciliation.",
  },
  {
    tier: "VERIFIED",
    source: "Consensus Oracle",
    rule: "Certified match results and settled bet tickets corroborated by multiple independent data providers.",
  },
  {
    tier: "CALCULATED",
    source: "Deterministic Code",
    rule: "Exact values derived through pure mathematical functions (e.g. Masaniello stake percentages, Poisson expected goals).",
  },
  {
    tier: "INFERRED",
    source: "Heuristics & ML",
    rule: "Probabilistic predictions, risk scores, and trend models. Always marked as estimates with confidence intervals.",
  },
];

const METRICS = [
  { n: "7", l: "Dedicated modular engines" },
  { n: "5 tiers", l: "Data provenance tags" },
  { n: "1.05–1.12", l: "Qualified odds band" },
  { n: "0%", l: "Unverified claim rewards" },
  { n: "100%", l: "Double-entry credit audit" },
  { n: "<50ms", l: "Masaniello recompute" },
];

export default function Stayqs99CaseStudyPage() {
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
              Case Study · Stayqs99
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a quantitative staking, verification & trust platform.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Sports betting platforms are plagued by survivorship bias, emotional bankroll erosion,
              and unverifiable influencer claims. Stayqs99 solves this by treating sports intelligence
              as an audited engineering discipline: quantitative Poisson probability calibration,
              mathematical Masaniello staking cycles, provenance-tagged facts, and a zero-trust reward ledger.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Dixon-Coles Poisson Modeling",
                "Masaniello Staking Compounding",
                "5-Tier Provenance Tagging",
                "Double-Entry Credit Ledger",
                "7-Engine Modular Monolith",
                "Multi-Source Oracle Verification",
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
              The sports prediction ecosystem is broken by uncalibrated odds and fake proof.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Most bettors lose not because sports outcomes are inherently unpredictable, but because
              they conflate leg selection with money management, chase high-odds parlays, and rely on
              platforms that reward unsubstantiated screenshots.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "The 'Cheap' Trap",
                  v: "Market odds of 1.10 are often mistaken for 'safe' bets. In reality, bookmaker margins and public sentiment frequently price events with true probabilities of 80% at 1.10 (implied 90.9%), creating severe negative expected value over time.",
                },
                {
                  k: "Bankroll Destruction",
                  v: "Flat staking or impulsive doubling down during downswings ensures eventual ruin. Without a mathematically bounded compounding framework, even an 85% win-rate strategy faces catastrophic drawdown.",
                },
                {
                  k: "Zero Provenance",
                  v: "In conventional tipster communities, users declare wins after the fact while scrubbing losses. Because platforms do not differentiate between user claims and certified data, trust collapses.",
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
              A user can declare anything, but only verified events become platform facts.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Stayqs99 enforces an unyielding architectural law: self-reported claims are isolated from
              authoritative facts. By running statistical leg selection completely independent of
              capital allocation, the system protects users from psychological bias and algorithmic drift.
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
              The 7-Engine Modular Monolith: Independent state machines with event-driven coordination.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Stayqs99 is decomposed into 7 strictly bounded engines in Python 3.12. Each engine owns
              its data models and interfaces via a typed event bridge, allowing independent testing and
              mathematical verification.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  Raw Fixtures & Odds Feeds
          │
          ▼
  [prediction-engine] ─── Dixon-Coles Poisson + Rho Adjustment
          │               └─ Outputs Calibrated Legs (1.05–1.12 odds)
          ▼
  [session-engine] ────── Assembles Target Sessions (Combined Odds ~1.20–1.35)
          │               └─ Executes Masaniello Staking Step Progression
          ▼
  User Action / Placement (Declared Slip)
          │
          ▼
  [verification-engine] ─ Match Finalization Oracles & Result Certification
          │
          ├─────────────────────────┐
          ▼                         ▼
  [trust-engine]            [credits-engine]
  └─ Variance & Anti-Fraud   └─ Double-Entry Proof Credits Ledger
          │                         │
          └───────────┬─────────────┘
                      ▼
               [reward-engine] ─── Tier & Milestone Unlocking
                      │
                      ▼
               [audit-engine] ──── Cryptographic Append-Only Fact Stream`}
              </pre>
            </div>

            <div className="rounded-xl border border-card-border overflow-x-auto mt-5">
              <table className="w-full text-sm min-w-[540px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Engine", "Primary Responsibility", "Technical Mechanism"].map((h) => (
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
                  {SEVEN_ENGINES.map((row) => (
                    <tr key={row.engine} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-mono text-xs font-medium whitespace-nowrap">
                        {row.engine}
                      </td>
                      <td className="px-4 py-3 text-electric-blue font-mono text-xs whitespace-nowrap">
                        {row.role}
                      </td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 04 — Deep Dive: Provenance */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The 5-Tier Data Provenance System: Immutable audit trails.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              In Stayqs99, no column is ever updated from an untrusted to a trusted state in place.
              Instead, every fact carries an explicit tag. If a user declares they won a bet, the system
              writes a <code className="font-mono text-xs text-electric-blue">DECLARED</code> record.
              When the official result is ingested, a separate{" "}
              <code className="font-mono text-xs text-emerald-400">VERIFIED</code> record is stored.
            </p>

            <div className="flex flex-col gap-0 mt-6">
              {PROVENANCE_TIERS.map((row, i, arr) => (
                <div
                  key={row.tier}
                  className={`py-4 ${
                    i !== arr.length - 1 ? "border-b border-dashed border-card-border" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-mono font-bold text-electric-blue shrink-0 w-24">
                      {row.tier}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-text-muted w-36 shrink-0">
                      {row.source}
                    </span>
                    <p className="text-xs text-text-muted font-light leading-relaxed m-0">{row.rule}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Deep Dive: Masaniello Staking */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              05 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The Masaniello Staking Engine: Mathematical risk distribution.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Unlike martingale (which increases risk after losses) or flat betting (which grows linearly),
              the Masaniello sequence calculates the exact probability of achieving <code className="font-mono text-xs">k</code> wins
              out of <code className="font-mono text-xs">n</code> sessions at target odds <code className="font-mono text-xs">O</code>.
              Stake size is re-evaluated dynamically after every step based on remaining required wins.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/30 p-5 mt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
                Masaniello Dynamic Stake Equation
              </span>
              <pre className="text-xs font-mono text-text-title mt-3 overflow-x-auto">
{`Stake_t = Capital_t * [ C(N - t, K - k - 1) / C(N - t + 1, K - k) ] / (Odds_t - 1)

Where:
N = Total sessions in cycle (e.g. 10)
K = Required successful sessions (e.g. 8)
t = Current step index
k = Accumulated wins so far`}
              </pre>
              <p className="text-xs text-text-muted font-light mt-3 leading-relaxed">
                By modeling remaining permutations combinatorially, a loss early in the cycle does not
                destroy bankroll: the engine recalculates the reduced required capital or triggers an
                orderly cycle termination to protect capital.
              </p>
            </div>
          </section>

          {/* 06 — Deep Dive: Proof Credits */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              06 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Proof Credits: Non-inflationary double-entry rewards.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Proof Credits form the economic backbone of Stayqs99. Credits cannot be purchased with fiat
              and cannot be granted arbitrarily. They are minted solely through verified, disciplined
              staking cycle completion and verified community performance metrics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                {
                  title: "Double-Entry Balance",
                  desc: "Every credit minted requires an offsetting debit in the platform reserve ledger. Credits can never be generated out of thin air.",
                },
                {
                  title: "Variance Penalty",
                  desc: "Users whose declared tickets diverge from verified settlement are hit with trust degradation, throttling credit eligibility.",
                },
                {
                  title: "Tiered Redemption",
                  desc: "Credits unlock advanced Dixon-Coles model parameters, automated multi-goal accounts, and priority verification queue slots.",
                },
              ].map((c) => (
                <div key={c.title} className="glassmorphism-card rounded-xl p-5">
                  <h4 className="text-sm font-bold text-text-title tracking-tight">{c.title}</h4>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              07 — By the numbers
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
                <TrendingUp className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building quantitative algorithms or audited trust platforms? Let&apos;s talk.
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
