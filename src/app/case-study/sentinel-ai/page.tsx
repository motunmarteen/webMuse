import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, MapPinned, Radar, BrainCircuit, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Sentinel AI — Designing a Geospatial Community Intelligence Engine",
  description:
    "How WEBMUSE engineered Sentinel AI inside NeyborHuud: a geospatial threat-detection pipeline combining administrative-boundary matching, temporal clustering, and hybrid AI scoring — verified against the running codebase.",
};

const STACK_TABLE = [
  { layer: "Boundary matching", tech: "Haversine distance · static LGA table", why: "Assigns every user & post to a Nigerian state/LGA/ward without a spatial database" },
  { layer: "Content store", tech: "MongoDB", why: "Polymorphic content schema tagged with a resolved location.lga field" },
  { layer: "Clustering", tech: "Time-windowed query · MongoDB", why: "Finds co-occurring security keywords in the same LGA within a 30-minute window" },
  { layer: "Scoring", tech: "Google Gemini 2.0 Flash", why: "Contextual 0–10 threat rating, informed by keyword matches and cluster count" },
  { layer: "Fan-out", tech: "Socket.IO broadcast", why: "Pushes red-zone alerts to connected clients in real time" },
];

const STAGES = [
  {
    s: "Stage 0",
    t: "Cultural pre-processor",
    d: "Before anything else, text is checked against a hand-built cultural dictionary of Nigerian vernacular — scam terms like 419 and yahoo boy, pidgin insults — tagged by severity and category. High-severity matches auto-file a moderation report immediately, independent of the safety pipeline below.",
  },
  {
    s: "Stage 1",
    t: "Keyword prefilter",
    d: "A curated security-keyword list — armed men, gunmen, car snatching, kidnap, ransom — does a cheap first pass over the lowercased text. No match and no cultural hit means the pipeline exits at zero cost: no database query, no model call.",
  },
  {
    s: "Stage 2",
    t: "Geospatial cluster check",
    d: "This is the geospatial core. Sentinel queries recent content sharing the same resolved location.lga field within the last 30 minutes, then counts how many of those also contain a security keyword. A single report is a data point; three reports of gunmen in the same LGA in the same half hour is a pattern — and the pattern, not the keyword alone, is what the next stage reasons about.",
  },
  {
    s: "Stage 3",
    t: "Gemini scoring",
    d: "Only content that cleared stage 1 reaches the model. Gemini receives the raw text and returns a threat_score from 0–10 — the cluster count is folded into the reasoning trail logged alongside the score, not silently discarded.",
  },
];

const ROUTES = [
  { l: "Score ≥ 8", tone: "text-red-400", d: "Red-zone alert. A SafetyAlert record is created and broadcast in real time over Socket.IO to connected clients." },
  { l: "Score 3–7", tone: "text-amber-400", d: "Logged and monitored — visible to moderation, not yet escalated to a broadcast alert." },
  { l: "Score < 3", tone: "text-emerald-400", d: "No action. A false-positive keyword hit (\"water don finish\") never reaches a human or a push notification." },
];

const METRICS = [
  { n: "0–10", l: "Threat score scale" },
  { n: "30 min", l: "Cluster detection window" },
  { n: "50km", l: "LGA-matching cutoff radius" },
  { n: "3-stage", l: "Cascade before model call" },
  { n: "0", l: "Model calls on a clean post" },
  { n: "2.0", l: "Gemini Flash" },
];

export default function SentinelAiCaseStudyPage() {
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
              Case Study · Sentinel AI
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-2xl">
              Designing a geospatial community intelligence engine.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Inside NeyborHuud, Sentinel AI turns raw posts into a location-aware threat signal — without
              a spatial database, and without sending every message to a model.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Administrative-boundary matching", "Temporal clustering", "Hybrid AI cascade", "Real-time fan-out"].map((t) => (
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
              A safety feed needs to know where you are — without a PostGIS budget.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A community safety layer has to answer two questions cheaply and constantly: is this post a
              real threat, and is it relevant to <em>this</em> neighborhood? Answering both with a full
              geospatial database and an LLM call on every post is the textbook approach — and it&apos;s
              also slow, expensive, and overkill for an MVP that needs to work today on a Nigerian LGA
              map, not a hypothetical global one.
            </p>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Sentinel&apos;s answer was to build the geospatial intelligence out of primitives that were
              already cheap to have: a static table of Nigerian administrative boundaries, a distance
              formula, and a time window. The result is a real, working geo-intelligence layer — just not
              the one built on a spatial database extension. The seam where PostGIS would slot in later is
              left explicit in the code, not hidden.
            </p>
          </section>

          {/* Thesis / architecture of the geo layer */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — The Geo Layer</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Haversine distance, not spatial SQL.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every coordinate pair NeyborHuud sees — a new signup, a new post — is resolved against a
              local dataset of Nigerian LGAs. The matcher walks the table, computes great-circle distance
              to each LGA centroid with the Haversine formula, and takes the closest one within a 50km
              cutoff. Outside that radius, the location is explicitly tagged{" "}
              <code className="font-mono text-xs text-electric-blue">Uncovered Area</code> rather than
              silently mismatched to the wrong community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: MapPinned, title: "Boundary resolution", body: "Nearest-LGA match by Haversine distance against a static coordinate table, capped at 50km." },
                { icon: Radar, title: "Temporal clustering", body: "Same-LGA, same-30-minute-window matching surfaces when multiple people report the same thing." },
                { icon: BrainCircuit, title: "Contextual scoring", body: "Gemini rates severity 0–10 using both the text and the cluster signal, not text alone." },
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
            <div className="rounded-xl border border-card-border overflow-x-auto mt-6">
              <table className="w-full text-sm min-w-[520px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Layer", "Technology", "Why it's there"].map((h) => (
                      <th key={h} className="text-left font-mono text-[10px] uppercase tracking-widest text-text-muted px-4 py-3 border-b border-card-border">
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

          {/* The cascade */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A four-stage cascade, geography folded into stage two.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The naive build sends every post straight to an LLM. Sentinel only escalates once cheaper
              stages have already narrowed the field — and the geospatial cluster check sits deliberately
              <em> before</em> the model call, so the AI is reasoning about a pattern across a
              neighborhood, not a single isolated sentence.
            </p>
            <div className="flex flex-col gap-0 mt-6">
              {STAGES.map((row, i, arr) => (
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
              {ROUTES.map((r) => (
                <div key={r.l} className="flex items-baseline gap-4 rounded-lg border border-card-border bg-card-bg/30 px-4 py-3">
                  <span className={`text-xs font-mono font-semibold shrink-0 w-20 ${r.tone}`}>{r.l}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why cluster matters */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Why It Matters</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The cluster count is the difference between a rumor and a pattern.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A keyword match alone is noisy — sarcasm, a joke, a news headline shared in the wrong tone
              all trip the same list. What actually distinguishes a credible local threat is
              corroboration: is anyone <em>else</em>, nearby, saying something similar right now? Sentinel
              answers that with a direct query — recent content tagged to the same LGA in the last 30
              minutes, filtered again for security keywords — and passes the resulting count into the
              model&apos;s reasoning, logged alongside the score as an explicit audit trail rather than a
              black box.
            </p>
            <div className="glassmorphism-card rounded-2xl p-6 md:p-8 mt-6">
              <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">Core idea</span>
              <p className="text-xl md:text-2xl font-bold text-text-title tracking-tight mt-3 max-w-md leading-snug">
                Geography is the corroboration signal, not just the routing key.
              </p>
              <p className="text-sm text-text-muted font-light mt-4 leading-relaxed max-w-2xl">
                Most systems use location only to decide who sees an alert. Sentinel uses it earlier — to
                decide how much to trust the alert in the first place.
              </p>
            </div>
          </section>

          {/* Known tradeoffs, stated plainly */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Engineering Tradeoffs</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Built for today&apos;s scale, with the next seam left visible.
            </h2>
            <div className="grid gap-3 mt-6">
              {[
                { k: "LGA matching, not radius matching", v: "Two posts 300m apart but on opposite sides of an LGA boundary line are treated as different neighborhoods; two posts 40km apart in the same sprawling LGA are treated as the same one. A tighter meter-radius match — the documented next step — fixes both edges." },
                { k: "Broadcast, not scoped fan-out", v: "A confirmed red-zone alert currently broadcasts to all connected clients rather than only those within the affected LGA. Correct for an early network still small enough that global reach is a feature, not noise — and a bounded change once geofenced push is in place." },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">{row.k}</span>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — By the numbers</span>
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
                  Need location intelligence in your product? Let&apos;s talk.
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
