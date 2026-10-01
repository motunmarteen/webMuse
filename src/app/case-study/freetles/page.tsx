import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Wrench,
  Layers,
  Cpu,
  Lock,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
  Sparkles,
  Smartphone,
  EyeOff,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Freetles — Architecting a Zero-Server-Transit AI Utility Platform",
  description:
    "An in-depth engineering breakdown of Freetles: a privacy-first browser utility suite built with Turborepo, Next.js 15, WebAssembly, and an intent-routed AI second front door where user files never leave the device.",
};

const STACK_TABLE = [
  {
    layer: "Monorepo & Build",
    tech: "Turborepo · pnpm workspaces · TypeScript (Strict)",
    why: "Shared modular packages (tools-core, registry, brand) with deterministic dependency caching across 350+ tools",
  },
  {
    layer: "Web & PWA Client",
    tech: "Next.js 15 App Router · React 19 · Tailwind CSS",
    why: "Edge-rendered SEO tool pages combined with an installable, offline-capable Progressive Web App",
  },
  {
    layer: "Client Compute",
    tech: "Web Workers · WebAssembly (Wasm) · Canvas API",
    why: "Heavyweight local processing (PDF manipulation, image transcoding, OCR) executed purely on the user's device",
  },
  {
    layer: "Intent Router",
    tech: "Deterministic NLP Matcher · Vector Scoring",
    why: "Translates natural-language user queries ('compress this photo', 'merge PDFs') into typed tool executions",
  },
  {
    layer: "Local Persistence",
    tech: "IndexedDB · CacheStorage API · Service Worker",
    why: "Persistent client-side history, recent file buffers, and full offline execution without server round-trips",
  },
  {
    layer: "Privacy Boundary",
    tech: "Zero-Server-Transit Architecture",
    why: "Mathematical guarantee: files are parsed and transformed in browser memory; zero bytes uploaded to any remote cloud",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: EyeOff,
    title: "Zero-Server-Transit Privacy",
    body: "Files never leave the user's browser. PDF manipulation, image compression, formatting, and cryptography occur 100% locally in browser memory.",
  },
  {
    icon: Sparkles,
    title: "Dual Front Door Experience",
    body: "Static SEO-optimized deep links for direct search queries, paired with a natural-language AI concierge that routes conversational requests into exact tools.",
  },
  {
    icon: Cpu,
    title: "Pure Typed Tool Functions",
    body: "Every tool in tools-core is an isolated, deterministic function with Zod input/output schemas, making tools composable into chained workflows.",
  },
  {
    icon: Smartphone,
    title: "Bandwidth & Device Conscious",
    body: "Engineered specifically for low-bandwidth and mid-tier mobile hardware, utilizing Web Workers to keep the UI thread silky and responsive.",
  },
];

const CORE_PACKAGES = [
  {
    pkg: "@freetles/tools-core",
    role: "Pure Deterministic Engine",
    desc: "Contains 100% pure TypeScript functions for file manipulation, mathematical conversion, text analysis, and crypto operations with zero DOM dependencies.",
  },
  {
    pkg: "@freetles/registry",
    role: "Catalog & Intent Matcher",
    desc: "Defines tool manifests, metadata schemas, keywords, category hierarchies, and the natural language intent matcher that powers the AI concierge.",
  },
  {
    pkg: "@freetles/brand",
    role: "Design System & Tokens",
    desc: "Unified token system with dark-mode color primitives, typography rules, glassmorphism styles, and accessible micro-interaction standards.",
  },
  {
    pkg: "apps/web",
    role: "PWA Application & SEO",
    desc: "Next.js App Router frontend rendering 350+ individual tool landing pages, offline service workers, and interactive canvas components.",
  },
];

const ROUTING_PIPELINE = [
  {
    step: "01",
    mode: "User Request",
    action: "Natural Language Input",
    detail: "User types or drags a file into the concierge: 'Convert this photo to WebP and make it under 200KB.'",
  },
  {
    step: "02",
    mode: "Client Matcher",
    action: "Intent Tokenization",
    detail: "Client-side intent parser scores verbs, file MIME types, and attributes against tool registry manifests in <5ms.",
  },
  {
    step: "03",
    mode: "Tool Execution",
    action: "Local WebAssembly Worker",
    detail: "Tool-core spawns a background Web Worker, allocating an OffscreenCanvas or Wasm instance to compress the image locally.",
  },
  {
    step: "04",
    mode: "Result Delivery",
    action: "Instant Blob Download",
    detail: "Generates a local Object URL for download or passes the resulting ArrayBuffer to the next chained tool.",
  },
];

const METRICS = [
  { n: "350+", l: "Planned utility catalog" },
  { n: "0 bytes", l: "User file server transit" },
  { n: "100%", l: "Client-side privacy" },
  { n: "<5 ms", l: "Client intent routing" },
  { n: "Offline", l: "Service worker PWA" },
  { n: "0", l: "Sign-ups or paywalls required" },
];

export default function FreetlesCaseStudyPage() {
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
              Case Study · Freetles
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Architecting a zero-server-transit browser utility suite & AI toolbox.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Online utility websites are typically infested with invasive ads, aggressive paywalls,
              and silent cloud uploads that compromise user privacy. Freetles re-engineers everyday
              digital tools as client-side primitives: Turborepo modular architecture, WebAssembly
              processing, zero server file transit, and an intent-routed AI second front door.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Zero-Server-Transit Guarantee",
                "Turborepo Monorepo",
                "Intent-Routed AI Concierge",
                "WebAssembly Client Compute",
                "Pure Typed Tool Functions",
                "Offline-First PWA",
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
              The everyday web tool landscape is a privacy nightmare and an accessibility bottleneck.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              When a user searches for 'compress PDF' or 'remove background from image', the top results
              force their private documents through foreign servers, impose artificial daily limits, or
              lock downloads behind subscriptions.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Privacy Exposure",
                  v: "Most web tools upload confidential bank statements, IDs, and resumes to remote servers to perform operations that modern browsers can execute locally in milliseconds.",
                },
                {
                  k: "Bandwidth Waste",
                  v: "For users in emerging markets or on high-latency mobile data, uploading a 50MB file to compress it down to 5MB wastes both bandwidth and battery life.",
                },
                {
                  k: "Search Friction",
                  v: "Users often don't know the technical term for what they want ('interpolate bezier curve' vs 'smooth line'). Static navigation hierarchies fail users who describe problems in everyday language.",
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
              If a tool exists, the tool runs locally. The file never leaves the device.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Freetles draws an absolute privacy perimeter: the AI can parse natural-language intentions,
              but file bytes never cross the network. Modern browser runtimes (Wasm, OffscreenCanvas,
              Web Workers) provide all the computational power needed for desktop-grade utility tasks.
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
              The Dual Front Door Monorepo: Turborepo modular packages.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Freetles separates user experience into two complementary entry doors: static SEO-indexed
              deep-link pages and an interactive conversational AI Concierge that dynamically invokes
              typed tool functions.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  User Interface (apps/web)
  ├─ Door 1: Direct Deep-Link (/tools/pdf/merge)
  └─ Door 2: Conversational Concierge ("Combine these two invoices")
          │
          ▼
  Intent Matcher (@freetles/registry)
  ├─ Deterministic Keyword & Action Verb Parsing
  └─ MIME Type & Schema Compatibility Resolution
          │
          ▼
  Tool Execution Engine (@freetles/tools-core)
  ├─ Web Worker Thread Spawning
  ├─ WebAssembly Processing (Wasm / Canvas)
  └─ Pure Deterministic Functions (Zod Validated)
          │
          ▼
  Client Local Sandbox (Browser Memory)
  ├─ ArrayBuffer / Blob Generation (0 bytes to cloud)
  └─ Offline IndexedDB Recent History & Cache`}
              </pre>
            </div>

            <div className="rounded-xl border border-card-border overflow-x-auto mt-5">
              <table className="w-full text-sm min-w-[540px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Package", "Role in System", "Implementation Detail"].map((h) => (
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
                  {CORE_PACKAGES.map((row) => (
                    <tr key={row.pkg} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-mono text-xs font-medium whitespace-nowrap">
                        {row.pkg}
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

          {/* 04 — Deep Dive: Intent Matching */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The AI Second Front Door: Deterministic intent routing.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Unlike generic chat assistants that hallucinate file transformations, the Freetles AI
              concierge is strictly an intent-matching router. When a user describes a problem, the
              matcher extracts verbs and targets, searches registry manifests, and instantiates the
              corresponding tool interface instantly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {ROUTING_PIPELINE.map((p) => (
                <div key={p.step} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-electric-blue">
                      {p.step} · {p.mode}
                    </span>
                    <Terminal className="h-3.5 w-3.5 text-electric-blue" />
                  </div>
                  <h4 className="text-sm font-bold text-text-title tracking-tight mt-2.5">
                    {p.action}
                  </h4>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 05 — Deep Dive: WebAssembly Compute */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              05 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              WebAssembly in Web Workers: High-throughput local computation.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Performing complex manipulations (like optical character recognition, PDF splitting, or
              lossless image compression) directly on the main browser thread causes jank and drops
              frames. Freetles executes all heavy workloads inside isolated Web Workers.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/30 p-5 mt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
                Web Worker Execution Blueprint
              </span>
              <pre className="text-xs font-mono text-text-title mt-3 overflow-x-auto">
{`// Main thread stays 100% responsive at 60fps
const worker = new Worker(new URL('./workers/pdf-engine.worker.ts', import.meta.url));

worker.postMessage({
  command: 'MERGE_PDF_CHUNKS',
  payload: { buffers: [fileBuffer1, fileBuffer2] }
}, [fileBuffer1, fileBuffer2]); // Zero-copy ArrayBuffer transfer

worker.onmessage = (e) => {
  const resultBlob = new Blob([e.data.outputBuffer], { type: 'application/pdf' });
  triggerDownload(resultBlob, 'merged_document.pdf');
};`}
              </pre>
              <p className="text-xs text-text-muted font-light mt-3 leading-relaxed">
                Using transferable objects (<code className="font-mono text-xs">ArrayBuffer</code> ownership transfer),
                gigabyte-sized files are passed to background threads in zero milliseconds without memory duplication.
              </p>
            </div>
          </section>

          {/* 06 — Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              06 — By the numbers
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
                <Wrench className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building privacy-first client applications or WebAssembly systems? Let&apos;s talk.
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
