import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ShieldAlert, Radar, Coins, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "NeyborHuud — Engineering an AI-Powered Community OS",
  description:
    "How WEBMUSE engineered NeyborHuud: a hyperlocal safety, commerce and trust platform for Nigerian neighborhoods, built on administrative-boundary geofencing, tiered SOS escalation, and hybrid AI threat detection.",
};

const STACK_TABLE = [
  { layer: "Client", tech: "Next.js 16 · Service Workers", why: "Offline location-log queues; Web Push without an app store" },
  { layer: "Geo", tech: "Haversine matching + MongoDB tags", why: "Nearest-LGA boundary resolution and location.lga-tagged content queries" },
  { layer: "Async", tech: "Redis + BullMQ", why: "SOS escalation, emergency fan-out, trip monitoring — off the event loop" },
  { layer: "AI", tech: "Google Gemini 2.0 Flash", why: "Contextual threat scoring and search-intent parsing" },
  { layer: "Identity", tech: "Better Auth + MongoDB", why: "Session and credential management" },
];

const TRUST_TABLE = [
  { event: "ID verified", delta: "+200", tone: "good", effect: "Largest single trust milestone" },
  { event: "Constructive action", delta: "+small", tone: "good", effect: "Helpful comment, completed job" },
  { event: "Base (new user)", delta: "300", tone: "neutral", effect: "Trusted enough to join, not to abuse" },
  { event: "Abuse penalty", delta: "−300", tone: "bad", effect: "False reports, misconduct" },
];

const METRICS = [
  { n: "35", l: "Backend modules" },
  { n: "0–1,000", l: "Trust range · base 300" },
  { n: "0–10", l: "Threat scale · red ≥ 8" },
  { n: "0/30/60/90s", l: "SOS escalation cadence" },
  { n: "3", l: "Core datastores" },
  { n: "500m", l: "Vouch & SOS radius" },
];

function ToneDelta({ delta, tone }: { delta: string; tone: string }) {
  const color =
    tone === "good" ? "text-emerald-400" : tone === "bad" ? "text-red-400" : "text-text-title";
  return <span className={`font-mono font-semibold ${color}`}>{delta}</span>;
}

export default function NeyborhuudCaseStudyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
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
          className="absolute top-[5%] right-[-8%] h-[420px] w-[420px] rounded-full bg-mesh-blue opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero */}
        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study · NeyborHuud
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-2xl">
              Engineering an AI-powered community operating system.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              A hyperlocal platform where a Nigerian neighborhood gets safety, commerce, and trust as
              native primitives — with geography itself as the schema.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Administrative-boundary geofencing", "Hybrid AI threat detection", "Tiered SOS escalation", "Trust ledger"].map((t) => (
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
          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The neighborhood is invisible to apps built for the planet.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Facebook, WhatsApp and X are built for planetary reach. That scope generates a constant hum
              of noise that drowns out the one thing that governs daily life — what is happening on your
              street, right now. In urban Nigeria that gap isn&apos;t an inconvenience; it&apos;s a safety
              and economic problem.
            </p>
            <div className="grid gap-3 mt-6">
              {[
                { k: "Security", v: "Neighborhood watch runs on tangled WhatsApp threads and physical sirens — no real-time escalation, no location streaming, no reliable way to reach the people who could actually help." },
                { k: "Trust", v: "Buyers fear paying upfront; sellers fear pay-on-delivery. The electrician two doors down is invisible to the neighbor who needs one." },
                { k: "Network", v: "Global apps assume LTE and a flagship phone, and fall over on the 2G/3G networks much of suburban and rural Nigeria runs on." },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-20">
                    {row.k}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Thesis */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Thesis</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Geography is the schema.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every post, alert, and listing is bound to physical coordinates and routed through Nigerian
              Wards and Local Government Areas. The neighborhood is not a filter applied to a social graph
              — it <em>is</em> the graph. Three pillars sit on that spatial foundation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldAlert, title: "Sentinel AI", body: "Real-time threat analysis and a self-terminating SOS escalation ladder." },
                { icon: Coins, title: "HuudCoin & Escrow", body: "A hyperlocal marketplace protected by community-backed Social Witness Escrow." },
                { icon: Radar, title: "TrustOS", body: "A reputation ledger turning physical validation into a portable numeric score." },
              ].map((p) => (
                <div key={p.title} className="glassmorphism-card rounded-xl p-5">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue w-fit">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-text-title tracking-tight mt-3">{p.title}</h3>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Location resolution is first-class. Safety-critical work never touches the request path.
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`        Mobile PWA (Next.js 16 · React 19 · Capacitor)
                 │  HTTPS / WSS
                 ▼
        API Gateway  ──  JWT · Redis sliding-window limits
                 │
   ┌─────────────┼──────────────┐
   ▼             ▼              ▼
 Identity      Safety &      Marketplace
 & TrustOS     Emergency     & Escrow
   │             │              │
   ▼             ▼              ▼
 MongoDB       MongoDB        Redis
 Better Auth   + Geo tags     + BullMQ`}
              </pre>
            </div>

            <div className="rounded-xl border border-card-border overflow-x-auto mt-5">
              <table className="w-full text-sm min-w-[520px] border-collapse">
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
                      <td className="px-4 py-3 text-text-title font-medium whitespace-nowrap">{row.layer}</td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted whitespace-nowrap">{row.tech}</td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sentinel AI deep dive */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Sentinel AI: hybrid threat detection.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The naive build sends every post to an LLM and trusts the answer — slow, costly, and
              dangerously non-deterministic for a Level 10 emergency. Sentinel runs a three-stage cascade
              that only escalates to the model when it must. The geospatial clustering behind this
              pipeline gets its own{" "}
              <Link href="/case-study/sentinel-ai" className="text-electric-blue hover:underline">
                dedicated case study
              </Link>
              .
            </p>
            <div className="flex flex-col gap-0 mt-6">
              {[
                { s: "Stage 1", t: "Keyword prefilter", d: "A curated security-keyword list — armed men, gunmen, car snatching, ambush, kidnap, ransom — does a cheap first pass. No match, no cost." },
                { s: "Stage 2", t: "Cultural dictionary", d: "The detail a generic build misses. Nigerian threat and scam language isn't in any English toxicity model, so Sentinel ships a hand-built cultural dictionary encoding local vernacular with severity and category — 419 and yahoo boy as high-severity scam signals, pidgin insults tagged by type." },
                { s: "Stage 3", t: "Gemini scoring", d: "Only content clearing the earlier stages reaches Gemini 2.0 Flash, which returns a contextual threat score from 0–10 — informed by keyword matches and same-LGA temporal clustering: are several people nearby reporting the same thing within the last 30 minutes?" },
              ].map((row, i, arr) => (
                <div key={row.s} className={`py-5 ${i !== arr.length - 1 ? "border-b border-dashed border-card-border" : ""}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0">{row.s}</span>
                    <h3 className="text-base font-bold text-text-title tracking-tight">{row.t}</h3>
                  </div>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed">{row.d}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-2.5 mt-6">
              {[
                { l: "Score ≥ 8", tone: "text-red-400", d: "Red-zone. “Armed men on our street” fans out to the entire LGA immediately." },
                { l: "Score 3–7", tone: "text-amber-400", d: "Alert. Logged, surfaced to the community, watched for escalation." },
                { l: "Score < 3", tone: "text-emerald-400", d: "Normal. “Water is finished” is a Level 2 utility note, not an emergency." },
              ].map((r) => (
                <div key={r.l} className="flex items-baseline gap-4 rounded-lg border border-card-border bg-card-bg/30 px-4 py-3">
                  <span className={`text-xs font-mono font-semibold shrink-0 w-20 ${r.tone}`}>{r.l}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SOS ladder */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A panic-button ladder that stops itself.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The worst design is a single blast that reaches no one or spams everyone. NeyborHuud models
              the alarm as a time-based escalation ladder on a BullMQ worker, entirely off the request
              path. The cadence is configuration, not code.
            </p>
            <div className="rounded-xl border border-card-border overflow-hidden mt-6">
              {[
                { t: "t = 0s", d: "Level 1. Notify priority-1 guardians via WebSocket, push and SMS simultaneously." },
                { t: "t = 30s", d: "Level 2. Still unacknowledged? Widen to priority-2 guardians." },
                { t: "t = 60s", d: "Level 3. Keep widening the ring of contacts." },
                { t: "t = 90s", d: "Final. Page every remaining accepted, non-expired guardian not yet notified." },
              ].map((r, i) => (
                <div
                  key={r.t}
                  className={`flex items-center gap-5 px-5 py-4 bg-card-bg/30 ${i !== 0 ? "border-t border-card-border" : ""}`}
                >
                  <span className="font-mono text-sm font-semibold text-electric-blue w-20 shrink-0">{r.t}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
              <div className="flex items-center gap-5 px-5 py-4 bg-emerald-500/5 border-t border-emerald-500/20 border-l-2 border-l-emerald-500">
                <span className="font-mono text-sm font-semibold text-emerald-400 w-20 shrink-0">✓ ACK</span>
                <p className="text-sm text-text-muted font-light m-0">
                  <span className="text-text-title font-medium">Self-terminate.</span> Before every level
                  fires, the worker re-checks status and acknowledgments. One guardian ack short-circuits
                  the whole ladder — no duplicate pages, no alarm that keeps screaming after help is coming.
                </p>
              </div>
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              In parallel, a Haversine distance check against connected users&apos; live locations
              broadcasts to opted-in neighbors within 500 metres while the client streams a GPS trail into
              an append-only tracking log. Running this on durable background workers — not inline in the
              HTTP handler — is what lets the alarm survive a dropped connection or a slow phone.
            </p>
          </section>

          {/* Feed */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A three-tab feed, ranked by LGA membership.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A broken streetlight in your LGA outranks a viral video from across the country. Rather than
              one flat timeline, the feed splits into three tabs, each a different content query over the
              same resolved <code className="font-mono text-xs text-electric-blue">location.lga</code> field
              set on every post.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mt-6">
              {[
                { r: "your_huud", p: "Home", d: "Local-first, blended with content from LGAs you follow." },
                { r: "street_radar", p: "Nearby", d: "Content scoped tightly to your resolved home LGA." },
                { r: "following_places", p: "Extended", d: "Content from LGAs you explicitly follow, beyond home." },
              ].map((c) => (
                <div key={c.r} className="glassmorphism-card rounded-xl p-5">
                  <div className="text-lg font-bold text-electric-blue font-mono">{c.p}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1">{c.r}</div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TrustOS */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              TrustOS: a materialized ledger.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Trust is earned physically and spent digitally. Reputation is a 0–1,000 numeric score backed
              by an append-only event log. Every trust-affecting action writes an event with a fixed point
              value and updates a materialized score on the user record, so reads stay O(1).
            </p>
            <div className="rounded-xl border border-card-border overflow-x-auto mt-6">
              <table className="w-full text-sm min-w-[460px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Event", "Δ Score", "Effect"].map((h) => (
                      <th key={h} className="text-left font-mono text-[10px] uppercase tracking-widest text-text-muted px-4 py-3 border-b border-card-border">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRUST_TABLE.map((row) => (
                    <tr key={row.event} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-medium">{row.event}</td>
                      <td className="px-4 py-3"><ToneDelta delta={row.delta} tone={row.tone} /></td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              High-trust actions like tipping are gated behind score thresholds, and Tier-3 members can{" "}
              <span className="text-text-title font-medium">vouch</span> for a newcomer within a 500m
              radius — enforced with its own Haversine distance check — granting temporary trusted access.
            </p>
          </section>

          {/* Why it holds together */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">08 — Principle</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Why these choices hold together.
            </h2>
            <div className="glassmorphism-card rounded-2xl p-6 md:p-8 mt-6">
              <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">Core idea</span>
              <p className="text-xl md:text-2xl font-bold text-text-title tracking-tight mt-3 max-w-md leading-snug">
                Push the intelligence to the edges of a deterministic core.
              </p>
              <p className="text-sm text-text-muted font-light mt-4 leading-relaxed max-w-2xl">
                The LLM scores but doesn&apos;t decide. Guardians escalate but the ladder stops itself.
                Geography ranks the feed but a threat score can override it. Trust is fluid but backed by
                an immutable ledger.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { k: "Constrained AI", v: "Gemini is one input to a deterministic safety pipeline — never the pipeline itself." },
                { k: "Durable work", v: "Safety-critical escalation lives on BullMQ workers, resilient to dropped connections." },
                { k: "Geo primitives", v: "Haversine distance and LGA boundary matching power geofencing, feed ranking, fan-out, and vouching alike." },
                { k: "Immutable trust", v: "An append-only ledger with a materialized read model keeps reputation fast and auditable." },
              ].map((p) => (
                <div key={p.k} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">{p.k}</span>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed m-0">{p.v}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              That&apos;s what makes it an <span className="text-text-title font-medium">operating system</span> rather
              than a bag of features: a small set of hard primitives — spatial boundaries, durable
              background work, a trust ledger, and a constrained AI layer — that every one of the 35
              modules is composed from.
            </p>
          </section>

          {/* Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">09 — By the numbers</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {METRICS.map((m) => (
                <div key={m.l} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <div className="text-xl font-bold text-text-title font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">{m.l}</div>
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
                <Layers className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building something like this? Let&apos;s talk.
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
