import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Study",
  description: "In-depth engineering case studies from WEBMUSE — real architecture, real trade-offs, verified against the code.",
};

interface CaseStudySummary {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  live: boolean;
}

const CASE_STUDIES: CaseStudySummary[] = [
  {
    slug: "neyborhuud",
    title: "NeyborHuud",
    tagline:
      "Engineering an AI-powered community operating system for the Nigerian neighborhood — safety, commerce, and trust as native primitives.",
    category: "Hyperlocal Safety & Commerce Platform",
    stack: ["Next.js", "MongoDB", "Redis / BullMQ", "Gemini 2.0"],
    metrics: [
      { label: "Backend modules", value: "35" },
      { label: "Threat scale", value: "0–10" },
      { label: "SOS cadence", value: "0/30/60/90s" },
    ],
    live: true,
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel AI",
    tagline:
      "Designing a geospatial community intelligence engine — administrative-boundary matching, temporal clustering, and hybrid AI threat scoring, without a spatial database.",
    category: "Geospatial Threat Detection Engine",
    stack: ["Haversine matching", "MongoDB", "Gemini 2.0", "Socket.IO"],
    metrics: [
      { label: "Threat scale", value: "0–10" },
      { label: "Cluster window", value: "30 min" },
      { label: "Cascade stages", value: "4" },
    ],
    live: true,
  },
  {
    slug: "novunt",
    title: "Novunt",
    tagline:
      "Building a secure fintech backend — atomic deposit claims, layered idempotency, an immutable double-entry ledger, and threshold-gated withdrawals.",
    category: "Custodial Staking & Settlement Platform",
    stack: ["Node.js / Express", "MongoDB", "NOWPayments", "Socket.IO", "node-cron"],
    metrics: [
      { label: "Idempotency layers", value: "3" },
      { label: "Concurrency layers", value: "4" },
      { label: "Ledger entries", value: "2-sided" },
    ],
    live: true,
  },
  {
    slug: "career-assessment",
    title: "WEBMUSE Career Assessment",
    tagline:
      "Building a decision engine for technology career guidance — recovered from a real GitHub source, expanded into a two-axis scoring model across 26 tech roles.",
    category: "Career Decision Engine",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Weighted scoring engine"],
    metrics: [
      { label: "Tech paths", value: "26" },
      { label: "Scoring axes", value: "4" },
      { label: "Sign-ups required", value: "0" },
    ],
    live: true,
  },
];

export default function CaseStudyIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-grow relative overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-mesh-purple opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 px-6 lg:px-24 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              How we actually build the systems we ship.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Not illustrative mockups — these are engineering write-ups verified against the running
              codebase: real modules, real data flows, real trade-offs. What&apos;s live is labeled live.
              What isn&apos;t built yet, we don&apos;t pretend it is.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/case-study/${cs.slug}`}
                  className="group glassmorphism-card rounded-2xl p-7 md:p-8 flex flex-col justify-between hover:border-electric-blue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
                        {cs.category}
                      </span>
                      {cs.live && (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Verified build
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3 group-hover:text-electric-blue transition-colors">
                      {cs.title}
                    </h2>
                    <p className="text-text-muted text-sm font-light mt-3 leading-relaxed">
                      {cs.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {cs.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono uppercase tracking-wider text-text-muted border border-card-border rounded-full px-2.5 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-card-border flex items-center justify-between">
                    <div className="flex gap-6">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-lg font-bold text-electric-blue font-mono">{m.value}</div>
                          <div className="text-[9px] font-mono uppercase tracking-widest text-text-muted mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-text-muted group-hover:text-electric-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
