import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShieldCheck,
  Database,
  Cpu,
  Activity,
  Server,
  Clock,
  Wallet,
  Scale,
  Send,
  Sparkles,
  Layers,
  Calculator,
  FileCheck,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Drollers — Engineering a Disciplined, Self-Running Staking Platform",
  description:
    "How WEBMUSE engineered Drollers (formerly Stayqs99): a platform that builds a verified slip on a clock, enters members automatically, settles from real results, charges only on profit, and publishes its own record — six pure engines, a provenance-tagged fact ledger and a credits wallet.",
};

const PRODUCTS = [
  {
    name: "Quad36",
    line: "The flagship. A fresh slip for everyone every six hours (00:00, 06:00, 12:00, 18:00 WAT), built an hour before it opens with a verified booking code. Members are entered automatically at the first kick-off.",
  },
  {
    name: "Rollover",
    line: "One slip a day at about 1.5, with a run of 3 to 7 days chosen by the member. A lost day ends the run; the fee is taken only when a run ends in profit.",
  },
  {
    name: "Target30",
    line: "One slip a day at about 2.0. The member chooses how many of 30 picks must win, and the stake before every pick is worked out.",
  },
  {
    name: "5 Odds · 10 Odds",
    line: "Daily slips built from many short prices across different markets, with the record of how often each wins shown openly.",
  },
  {
    name: "Value Trades",
    line: "A short daily list of single bets where the price beats the chance of winning, with the record of every one played.",
  },
  {
    name: "Tools",
    line: "A booking-code converter and staking calculators that work on their own, with Arbitrage planned next.",
  },
];

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Rejection is a valid output",
    text: "If too few picks qualify, the platform returns fewer, or none. It never lowers its standards to fill a slip, and a skipped session is not counted as a loss. Discipline is the product.",
  },
  {
    icon: Database,
    title: "Only verified facts become facts",
    text: "Every stored value carries its provenance: declared, observed, verified, calculated or inferred. Claims and verified results sit side by side and are never merged, so discrepancies are always visible and auditable.",
  },
  {
    icon: Scale,
    title: "Honest about edge",
    text: "Staking cycles manage variance; they do not create an edge. The platform says so, and leads with a public record of every pick and result instead of promises.",
  },
  {
    icon: Wallet,
    title: "Fees only on profit",
    text: "The platform fee is 20% of real profit, paid in the platform's credits (Drolls) and only when a run ends in profit. Nothing is taken at the start and nothing on a loss.",
  },
];

const PIPELINE = [
  { step: "01", title: "Collect and screen", detail: "Upcoming games across sports are pulled, tiered for integrity, and hard-blocked when a competition or market looks unsafe." },
  { step: "02", title: "Check every market", detail: "Each market must have a settlement rule and a results source, or it is excluded and recorded in a coverage report." },
  { step: "03", title: "Work out the fair chance", detail: "The bookmaker's margin is removed from the complete market and cross-checked against an independent probability. A price that disagrees is refused." },
  { step: "04", title: "Qualify the legs", detail: "Only legs inside the price band with a high enough fair probability pass: full-match markets only, nothing that can be voided." },
  { step: "05", title: "Build the slip", detail: "One leg per game, correlation checked, sports and markets mixed, combined odds closest to the target. If nothing fits, the session is skipped." },
  { step: "06", title: "Book and verify", detail: "A booking code is created and read back to confirm it matches. It is published for everyone about an hour before the first game." },
  { step: "07", title: "Enter, settle, advance", detail: "Members are entered automatically at kick-off. Results settle game by game, every cycle advances, and the next stake is recomputed." },
];

const ENGINES = [
  { engine: "prediction-engine", purpose: "Probability models, data providers, the market catalogue, leg qualification and backtests." },
  { engine: "session-engine", purpose: "Assembling slips, sessions and cycles, the Masaniello stake maths and capital splits." },
  { engine: "verification-engine", purpose: "Declared versus verified values and the integrity score." },
  { engine: "trust-engine", purpose: "Trust and risk scores, and the account graph used against fraud." },
  { engine: "credits-engine", purpose: "The Drolls ledger: double-entry credits, holds and fees." },
  { engine: "audit-engine", purpose: "The append-only event taxonomy that every important action writes to." },
];

const AUTOMATION = [
  { icon: Clock, title: "A scheduler that runs the day", text: "Slips are built, published, retried when a build or code fails, entered, settled and scored on a timetable, with no one posting games by hand." },
  { icon: Sparkles, title: "A plain-language reason for every game", text: "An AI write-up explains why each game was picked. It is checked and trimmed to a fixed length, and its spend is tracked against a budget." },
  { icon: Send, title: "Telegram and notifications", text: "Every session published, started, won, lost or skipped is posted to the Telegram channel and sent to members in the app and by email." },
  { icon: Lock, title: "Responsible by default", text: "A risk screen before a first run, visible spending, limits, and a clear notice that a stake is at the member's own risk and no result is guaranteed." },
];

const STACK_TABLE = [
  { layer: "Web app", tech: "React · Vite · TypeScript · PWA", why: "A fast, installable app with a product hub, live session pages, history and an admin console." },
  { layer: "API", tech: "Python 3.12 · FastAPI · Pydantic", why: "A typed API of about 140 endpoints that schedules, stores and serves, while the engines stay pure." },
  { layer: "Engines", tech: "Pure Python libraries", why: "Six engines with no database access, so the maths can be tested in isolation and trusted." },
  { layer: "Data", tech: "PostgreSQL · SQLAlchemy", why: "About 80 tables including the credits ledger, session and cycle records, and append-only audit events." },
  { layer: "Cloud", tech: "AWS (CDK) · Vercel · scheduled backups", why: "The API and database on AWS defined as code, the web app on Vercel, and a database backup job." },
  { layer: "Quality", tech: "pytest · CI · secret scanning", why: "Each engine is tested on its own, and CI runs the tests and scans for leaked secrets on every change." },
];

const METRICS = [
  { n: "6", l: "Live products" },
  { n: "6", l: "Pure, DB-free engines" },
  { n: "5", l: "Data provenance tags" },
  { n: "~140", l: "API endpoints" },
  { n: "~80", l: "Database tables" },
  { n: "1,000+", l: "Automated tests" },
];

export default function DrollersCaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded-full"
          >
            <Image src="/webMuse-Logo.png" alt="WEBMUSE Logo" width={30} height={30} className="object-contain" />
            <span className="font-display font-bold tracking-widest text-base text-text-title">WEBMUSE</span>
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

        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study · Drollers (formerly Stayqs99) · Live
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              A staking platform that runs itself on a clock — and shows its record.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Drollers builds a verified slip at fixed times, enters members automatically, settles from real results,
              charges only on profit, and publishes how it actually performs. Behind it sit six pure engines, a
              provenance-tagged fact ledger and a credits wallet, all engineered by WEBMUSE from the first model to the
              live Telegram channel.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Automated sessions",
                "Auto-entry at kick-off",
                "Verified booking codes",
                "Fees only on profit",
                "Public track record",
                "Responsible by default",
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
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">00 — The value in one paragraph</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Discipline, automation and proof, in one place.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Most betting channels sell confidence. Drollers is built the other way round. It picks only short-priced
              legs that two independent probability views agree on, skips a session rather than relax its rules, enters
              members without a single click, and keeps a record of every pick and result in public. The money maths is
              handled for the member, and the platform only earns when the member does.
            </p>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Products</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A ladder of products on one engine room.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {PRODUCTS.map((p) => (
                <div key={p.name} className="glassmorphism-card rounded-xl p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-electric-blue" />
                    <h3 className="text-base font-bold text-text-title tracking-tight">{p.name}</h3>
                  </div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{p.line}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Principles</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The rules the platform will not bend.
            </h2>
            <div className="grid gap-6 mt-6">
              {PRINCIPLES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glassmorphism-card rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-text-title">{f.title}</h3>
                    </div>
                    <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">{f.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — How a slip is made</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              From thousands of games to one verified slip.
            </h2>
            <div className="grid gap-3 mt-6">
              {PIPELINE.map((row) => (
                <div key={row.step} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-8 font-semibold">
                    {row.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-text-title tracking-tight m-0">{row.title}</h3>
                    <p className="text-xs text-text-muted font-light leading-relaxed mt-1 mb-0">{row.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Six pure engines, one thin service.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The core logic lives in libraries that never touch a database or a service. The API only schedules, stores
              and serves. That separation keeps the maths testable, and it is a rule the whole code base obeys.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {ENGINES.map((m) => (
                <div key={m.engine} className="glassmorphism-card rounded-xl p-5">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-electric-blue" />
                    <h3 className="text-sm font-bold font-mono text-text-title tracking-tight">{m.engine}</h3>
                  </div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{m.purpose}</p>
                </div>
              ))}
            </div>
            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <h3 className="text-base font-bold text-text-title flex items-center gap-2">
                <Layers className="h-4 w-4 text-electric-blue" />
                Provenance on every fact
              </h3>
              <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">
                A value is stored as <span className="font-mono">DECLARED</span>, <span className="font-mono">OBSERVED</span>,{" "}
                <span className="font-mono">VERIFIED</span>, <span className="font-mono">CALCULATED</span> or{" "}
                <span className="font-mono">INFERRED</span>, and the tags are never merged or overwritten. A member can say
                anything, but only verified events become authoritative, and rewards and trust are earned from those alone.
              </p>
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Automation and care</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              No one posts games by hand.
            </h2>
            <div className="grid gap-6 mt-6">
              {AUTOMATION.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glassmorphism-card rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-text-title">{f.title}</h3>
                    </div>
                    <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">{f.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Trust and money</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A wallet and a record you can audit.
            </h2>
            <div className="grid gap-4 mt-6">
              {[
                { icon: Wallet, title: "Drolls: a double-entry credits ledger", text: "Credits are never edited in place. Every movement is a balanced ledger entry, with holds for fees that could become due." },
                { icon: FileCheck, title: "Every result is scored against what was promised", text: "Each pick is kept and settled from real results, so the platform can show hit rate against the chance it claimed, not just wins." },
                { icon: Activity, title: "Admin controls and results cards", text: "Every product has platform settings, and admin cards compare days won and games won with what was expected." },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.title} className="glassmorphism-card rounded-xl p-6">
                    <div className="flex items-center gap-2 text-electric-blue font-mono text-sm font-bold">
                      <Icon className="h-4 w-4" />
                      {r.title}
                    </div>
                    <p className="text-xs text-text-muted font-light mt-3 leading-relaxed">{r.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-text-muted font-light mt-5 leading-relaxed">
              Staking carries risk. A better-than-fair price is not a certain win, and no result is guaranteed.
            </p>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — Technology stack</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Production stack and why each piece was chosen.
            </h2>
            <div className="mt-6 border border-card-border rounded-2xl overflow-hidden glassmorphism-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-card-border/30 font-mono text-text-muted uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Layer</th>
                      <th className="p-4">Technology</th>
                      <th className="p-4">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/40 font-light">
                    {STACK_TABLE.map((row) => (
                      <tr key={row.layer} className="hover:bg-card-border/20 transition-colors">
                        <td className="p-4 font-mono font-semibold text-electric-blue">{row.layer}</td>
                        <td className="p-4 font-mono text-text-title">{row.tech}</td>
                        <td className="p-4 text-text-muted">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">08 — Verified metrics</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Counted from the codebase, not estimated.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {METRICS.map((m) => (
                <div key={m.l} className="glassmorphism-card rounded-xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-electric-blue font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">{m.l}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-text-muted font-mono mt-4 flex items-center gap-2">
              <Calculator className="h-3.5 w-3.5" />
              <Server className="h-3.5 w-3.5" />
              Live on the web, with its own Telegram channel.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} WEBMUSE INC. ALL RIGHTS RESERVED.
          </span>
          <nav aria-label="Legal" className="flex items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/status" className="hover:text-foreground transition-colors">Status</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
