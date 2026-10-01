import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  LineChart,
  Cpu,
  Layers,
  Lock,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Sliders,
  DollarSign,
  BarChart3,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "BuxEdge — Engineering a Prediction Market Intelligence & Arbitrage Engine",
  description:
    "An in-depth engineering breakdown of BuxEdge: an event-driven prediction market intelligence platform — cross-venue Polymarket and Kalshi orderbook matching, fractional Kelly position sizing, multi-signal confluence, and execution risk guards.",
};

const STACK_TABLE = [
  {
    layer: "Core Engine API",
    tech: "Python 3.12 · FastAPI · Pydantic v2",
    why: "Asynchronous high-throughput REST service running live market scanners, signal processors, and portfolio risk engines",
  },
  {
    layer: "Market Connectors",
    tech: "Polymarket CLOB API · Kalshi Exchange API",
    why: "Dual-exchange orderbook polling, order placement, WebSocket telemetry feeds, and regulatory boundary mapping",
  },
  {
    layer: "Risk & Sizing Model",
    tech: "Fractional Kelly Criterion · Volatility Bounds",
    why: "Mathematical capital allocation capping max loss, adjusting position size by estimated edge and probability confidence",
  },
  {
    layer: "Confluence Engine",
    tech: "Bayesian Base Rate Models · News Sentiment NLP",
    why: "Scores prediction conviction by cross-referencing historical base rates, breaking news momentum, and liquidity depth",
  },
  {
    layer: "Execution Guard",
    tech: "Go/No-Go Gate · Slippage & Spread Monitor",
    why: "Rejects execution if market spreads exceed thresholds, book depth is insufficient, or event blackout windows are active",
  },
  {
    layer: "Client Dashboard",
    tech: "React 19 · Vite · Tailwind CSS",
    why: "Real-time unified intelligence interface displaying live arbitrage opportunities, active orders, and portfolio exposure",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Scale,
    title: "Dual-Exchange Arbitrage",
    body: "Monitors identical real-world binary contracts across Polymarket and Kalshi, detecting pricing dislocations and synthetic risk-free spreads.",
  },
  {
    icon: DollarSign,
    title: "Fractional Kelly Sizing",
    body: "Full Kelly betting leads to extreme volatility. BuxEdge implements conservative fractional Kelly (0.25x–0.5x) to maximize growth while preventing ruin.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Tolerance Go/No-Go Guards",
    body: "Automated pre-trade checks: spreads, available fill depth, and upcoming blackout windows must pass or the execution signal is killed instantly.",
  },
  {
    icon: BarChart3,
    title: "Tri-Factor Confluence Scoring",
    body: "Trades require alignment across 3 independent pillars: statistical base rates, orderbook flow imbalance, and verified news catalysts.",
  },
];

const RISK_PIPELINE = [
  {
    step: "01",
    name: "Scan & Normalize",
    desc: "Ingests real-time bids/asks from Polymarket and Kalshi, standardizing divergent contract expiries and strike definitions.",
  },
  {
    step: "02",
    name: "Confluence Scoring",
    desc: "Combines historical empirical base rates with live NLP sentiment to compute model-implied probability vs. market implied odds.",
  },
  {
    step: "03",
    name: "Risk Verification (Go/No-Go)",
    desc: "Validates orderbook depth: verifies the full order size can fill within the target spread without crossing excessive slippage.",
  },
  {
    step: "04",
    name: "Kelly Allocation",
    desc: "Computes exact dollar allocation as a fraction of current bankroll, submitting atomic limit orders to the exchange API.",
  },
];

const METRICS = [
  { n: "2 exchanges", l: "Polymarket + Kalshi" },
  { n: "<250 ms", l: "Signal processing latency" },
  { n: "0.25–0.5x", l: "Fractional Kelly boundary" },
  { n: "3-tier", l: "Signal confluence score" },
  { n: "100%", l: "Pre-trade risk enforcement" },
  { n: "0", l: "Over-allocation drawdowns" },
];

export default function BuxEdgeCaseStudyPage() {
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
              Case Study · BuxEdge
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a dual-exchange prediction market intelligence & arbitrage engine.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Prediction markets represent billions in event-contract volume, but fragmented liquidity
              between crypto-native protocols (Polymarket) and regulated domestic venues (Kalshi) creates
              glaring mispricings. BuxEdge was engineered as a high-frequency intelligence and automated
              risk engine: cross-exchange orderbook matching, Bayesian confluence scoring, and fractional
              Kelly capital protection.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Polymarket CLOB & Kalshi API",
                "Cross-Venue Arbitrage Engine",
                "Fractional Kelly Sizing",
                "Tri-Factor Confluence Scoring",
                "Pre-Trade Go/No-Go Gate",
                "Event Blackout Protection",
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
              Event contracts move fast, orderbooks are shallow, and emotion guarantees drawdowns.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Trading binary prediction contracts is fraught with structural hazards: liquidity can
              evaporate during breaking news, and bid-ask spreads can easily swallow theoretical edges.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Venue Fragmentation",
                  v: "Polymarket trades in USDC on Polygon; Kalshi trades in USD under CFTC oversight. Due to capital friction, the exact same political or economic event often trades at a 5–12% spread between the two orderbooks.",
                },
                {
                  k: "Slippage Traps",
                  v: "Quoted top-of-book prices look attractive, but thin depth means a $5,000 order moves the market by multiple cents, instantly flipping a profitable position into negative expectation.",
                },
                {
                  k: "Over-Betting Ruin",
                  v: "Without strict mathematical position sizing, traders who identify a genuine 60/40 edge bet too large a fraction of their capital and are wiped out by standard mathematical variance.",
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
              Edge without execution discipline is just a slow way to lose capital.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              BuxEdge strips human subjectivity from market trading. Every position must be mathematically
              sized by a fractional Kelly algorithm, corroborated by multiple uncorrelated data streams,
              and guarded by automated pre-trade liquidity gates.
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
              The BuxEdge Pipeline: High-speed ingestion and automated risk gating.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The Python backend continuously syncs orderbook states from both exchanges, evaluates
              cross-market spreads, and pipes trade candidates through strict risk filters before
              calculating position sizing.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  Polymarket Clob API               Kalshi Exchange API
          │                                   │
          └─────────────────┬─────────────────┘
                            ▼
               [Dual Orderbook Normalizer]
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
      [Arbitrage Engine]        [Confluence Scorer]
      (Price Discrepancy)       (Base Rates + News NLP)
               │                         │
               └────────────┬────────────┘
                            ▼
                 [Go/No-Go Execution Gate]
                 ├─ Slippage & Spread Check
                 ├─ Depth Liquidity Test
                 └─ Event Blackout Filter
                            │
                            ▼
              [Fractional Kelly Sizer (0.25x)]
                            │
                            ▼
            [Automated Order Router / Paper Desk]`}
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

          {/* 04 — Deep Dive: Risk Engine */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The Pre-Trade Go/No-Go Gate: Preserving capital on volatile events.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every identified edge must pass the automated Go/No-Go gate. If the top 3 levels of the
              orderbook do not hold enough depth to fill the requested size without exceeding 1.5%
              slippage, the trade is rejected automatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {RISK_PIPELINE.map((p) => (
                <div key={p.step} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-xs font-mono font-bold text-electric-blue">
                    {p.step} · {p.name}
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
                <LineChart className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building prediction market models or automated trading infrastructure? Let&apos;s talk.
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
