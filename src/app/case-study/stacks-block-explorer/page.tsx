import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Code,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Lock,
  Wallet,
  Globe,
  Radio,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Stacks Blockchain Explorer — Real-Time Bitcoin L2 Intelligence Engine",
  description:
    "An in-depth engineering breakdown of the Stacks Blockchain Explorer: live transaction indexing, smart contract execution decoding, Hiro REST API integration, and multi-wallet authentication.",
};

const STACK_TABLE = [
  { layer: "Frontend Framework", tech: "Next.js 16 (App Router) · React 19", why: "Server-side rendering, dynamic address routing, and high-performance client hydration" },
  { layer: "Type System", tech: "TypeScript (Strict)", why: "Comprehensive type definitions for complex Stacks API payloads and Clarity value types" },
  { layer: "Blockchain API", tech: "Hiro Stacks REST API", why: "Real-time indexer supplying account transactions, contract ABIs, and block confirmations" },
  { layer: "Wallet Auth", tech: "@stacks/connect · Leather · Xverse", why: "Seamless multi-wallet authentication and account balance resolution" },
  { layer: "Styling & UI", tech: "Tailwind CSS · Lucide React", why: "Modern, responsive dark-mode interface with accessible status badges and pagination controls" },
];

const TXN_TYPES = [
  { type: "Coinbase", desc: "Block reward distribution and miner mint transactions on Bitcoin L2." },
  { type: "Token Transfer", desc: "Native STX asset transfers between accounts with memo validation." },
  { type: "Smart Contract Deploy", desc: "Clarity smart contract deployments with source code preview and byte verification." },
  { type: "Contract Call", desc: "Smart contract function execution with parameter decoding and print event logs." },
  { type: "Microblock Txn", desc: "Fast-confirmation microblock transaction indexing prior to anchor block commit." },
];

const METRICS = [
  { n: "5 Types", l: "Decoded Transaction Payloads" },
  { n: "100%", l: "TypeScript Coverage" },
  { n: "Next.js 16", l: "App Router & SSR" },
  { n: "Leather + Xverse", l: "Wallet Integration" },
  { n: "Real-Time", l: "Hiro API Indexing" },
  { n: "Bitcoin L2", l: "Anchored Block Explorer" },
];

export default function StacksBlockExplorerCaseStudyPage() {
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
          className="absolute top-[5%] right-[-8%] h-[420px] w-[420px] rounded-full bg-mesh-purple opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero */}
        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study · Stacks Blockchain Explorer
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a Real-Time Stacks Blockchain Explorer.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              A modern, full-featured blockchain explorer for the Stacks network built with Next.js 16, React 19, TypeScript, and Tailwind CSS.
              Provides live transaction indexing, smart contract execution decoding, dynamic address history pagination, and Leather/Xverse wallet integration.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Next.js 16",
                "React 19",
                "TypeScript",
                "Hiro Stacks API",
                "@stacks/connect",
                "Transaction Decoder",
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
          {/* Executive Overview */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">00 — Executive Summary</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Bringing Transparency to Bitcoin Layer 2 Activity.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Blockchains are public ledgers, but raw transaction payloads are unreadable hex strings.
              The Stacks Blockchain Explorer parses, decodes, and indexes Stacks network transactions in real time,
              translating Clarity smart contract function calls, asset transfers, and anchor block commits into a human-readable interface.
            </p>
          </section>

          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The Challenges of Indexing Stacks L2 Transactions.
            </h2>
            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Polymorphic Transaction Types",
                  v: "Stacks features 5 distinct transaction types (Coinbase, STX Transfer, Contract Deploy, Contract Call, Microblock) with radically different schema structures.",
                },
                {
                  k: "Clarity Execution Logs",
                  v: "Contract function calls emit raw Clarity values (tuples, lists, optional types) that must be decoded into structured UI components.",
                },
                {
                  k: "Real-time Pagination",
                  v: "High-volume accounts require efficient offset pagination against Hiro REST API endpoints without triggering rate-limit freezes.",
                },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-32 font-semibold">
                    {row.k}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Transaction Parsing Architecture */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Polymorphic Transaction Payload Decoder.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The explorer implements a strict TypeScript parser that matches transaction payloads against type discriminants:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {TXN_TYPES.map((t) => (
                <div key={t.type} className="glassmorphism-card rounded-xl p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-electric-blue" />
                    <h3 className="text-base font-bold font-mono text-text-title tracking-tight">{t.type}</h3>
                  </div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* API & Wallet Integration */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — API & Wallet Integration</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Hiro REST API Indexing & Multi-Wallet Authentication.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Using <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">@stacks/connect</code>, users authenticate using Leather or Xverse wallets.
              The application queries account balances, active nonce counters, and historic transaction pages directly from Hiro&apos;s infrastructure with client-side caching.
            </p>
          </section>

          {/* Tech Stack */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Technology Stack</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Production Tech Stack.
            </h2>
            <div className="mt-6 border border-card-border rounded-2xl overflow-hidden glassmorphism-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-card-border/30 font-mono text-text-muted uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Layer</th>
                      <th className="p-4">Technology</th>
                      <th className="p-4">Architectural Rationale</th>
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

          {/* Verified Metrics */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — System Metrics</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Verified Codebase Metrics.
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {METRICS.map((m) => (
                <div key={m.l} className="glassmorphism-card rounded-xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-electric-blue font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">{m.l}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
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
