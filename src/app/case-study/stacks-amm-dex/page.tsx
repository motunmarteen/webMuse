import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  RefreshCw,
  Coins,
  Scale,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Lock,
  Zap,
  Database,
  Code,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Stacks AMM DEX — Engineering an Automated Market Maker on Bitcoin L2",
  description:
    "An in-depth engineering breakdown of the Stacks AMM Decentralized Exchange: constant-product liquidity pools (x*y=k) for SIP-010 tokens, dynamic swap routing, LP token minting, and Stacks wallet integration.",
};

const STACK_TABLE = [
  { layer: "Smart Contracts", tech: "Clarity 3 · SIP-010 Standard", why: "Decidable Clarity smart contracts implementing Constant Product AMM formulas for Stacks fungible tokens" },
  { layer: "Frontend Portal", tech: "Next.js 15 · TypeScript · Tailwind CSS", why: "Responsive decentralized exchange interface with live swap quote calculations and pool analytics" },
  { layer: "Wallet Provider", tech: "@stacks/connect · Leather · Xverse", why: "Permissionless Web3 wallet authentication and transaction broadcast integration" },
  { layer: "Contract Testing", tech: "Clarinet · Vitest", why: "Simulated Stacks blockchain environment verifying pool creation, liquidity minting, and swap slippage" },
];

const ERROR_CODES = [
  { code: "ERR_POOL_ALREADY_EXISTS (u200)", desc: "Pool already exists for the given pair of SIP-010 tokens and fee tier." },
  { code: "ERR_INCORRECT_TOKEN_ORDERING (u201)", desc: "Enforces lexicographical principal ordering (token-0 < token-1) to avoid duplicate reciprocal pools." },
  { code: "ERR_INSUFFICIENT_LIQUIDITY_MINTED (u202)", desc: "Initial liquidity deposit does not meet the MINIMUM_LIQUIDITY (u1000) threshold." },
  { code: "ERR_INSUFFICIENT_LIQUIDITY_OWNED (u203)", desc: "Provider does not own enough LP tokens to execute requested withdrawal." },
  { code: "ERR_INSUFFICIENT_INPUT_AMOUNT (u205)", desc: "Swap input token amount is zero or below minimum execution amount." },
  { code: "ERR_INSUFFICIENT_LIQUIDITY_FOR_SWAP (u206)", desc: "Pool reserves are lower than requested swap output amount." },
];

const AMM_FUNCTIONS = [
  { func: "create-pool", type: "public", purpose: "Initialize a new trading pool between two SIP-010 tokens with initial liquidity deposit." },
  { func: "add-liquidity", type: "public", purpose: "Deposit proportional token reserves into pool, minting LP tokens to liquidity provider." },
  { func: "remove-liquidity", type: "public", purpose: "Burn LP tokens to redeem proportional underlying token reserves plus accumulated 0.3% fees." },
  { func: "swap-exact-tokens-for-tokens", type: "public", purpose: "Execute token swap along x*y=k curve with minimum output amount slippage protection." },
  { func: "get-reserves", type: "read-only", purpose: "Query current token reserves and pool invariant for exact price impact calculation." },
  { func: "get-pool-id", type: "read-only", purpose: "Compute 20-byte SHA-160 hash of token-0, token-1, and fee as unique pool identifier." },
];

const METRICS = [
  { n: "x · y = k", l: "Constant Product Invariant" },
  { n: "0.3%", l: "Liquidity Fee to LPs" },
  { n: "SIP-010", l: "Fungible Token Standard" },
  { n: "Permissionless", l: "Pool Creation" },
  { n: "Slippage", l: "Min Output Protection" },
  { n: "Stacks L2", l: "Bitcoin Consensus Security" },
];

export default function StacksAmmDexCaseStudyPage() {
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
              Case Study · Stacks AMM DEX
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering an Automated Market Maker DEX on Bitcoin L2.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              A permissionless Automated Market Maker (AMM) decentralized exchange built on the Stacks blockchain using Clarity smart contracts.
              Enables constant-product ($x \cdot y = k$) liquidity pool creation, token swapping for SIP-010 assets, dynamic fee distribution, and slippage protection.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Clarity 3",
                "Constant Product (x*y=k)",
                "SIP-010 Tokens",
                "Liquidity Pools",
                "Next.js 15",
                "Stacks Connect",
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
              Trustless Liquidity & Trading for Bitcoin L2 Tokens.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Decentralized exchanges rely on algorithmic liquidity pools rather than traditional order books.
              The Stacks AMM DEX implements a permissionless market maker where users swap any SIP-010 compliant tokens,
              provide liquidity to earn a 0.3% protocol fee, and mint transferable LP tokens representing their pool share.
            </p>
          </section>

          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Overcoming Liquidity Fragmentation on Bitcoin.
            </h2>
            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Centralized Exchange Risks",
                  v: "Trading Stacks ecosystem tokens on centralized order books introduces custodial counterparty risks and withdrawal limits.",
                },
                {
                  k: "Slippage & Front-Running",
                  v: "Swaps executed without minimum output assertions can suffer extreme slippage or sandwich attacks in mempools.",
                },
                {
                  k: "Dynamic Trait Interface",
                  v: "Interfacing with generic fungible tokens in Clarity requires strict trait compliance (SIP-010) without introducing security vulnerabilities.",
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

          {/* Clarity Token Traits & Ordering */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Contract Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              SIP-010 Trait Implementation & Token Ordering.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              To prevent duplicate pools for reciprocal pairs (e.g. STX/ALEX vs ALEX/STX), the contract enforces lexicographical principal sorting
              by comparing consensus buffers before pool instantiation:
            </p>

            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
{`;; SIP-010 Trait & Token Ordering Enforcement in contracts/amm.clar
(use-trait ft-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

(define-private (correct-token-ordering (token-0 principal) (token-1 principal)) 
  (let (
    (token-0-buff (unwrap-panic (to-consensus-buff? token-0)))
    (token-1-buff (unwrap-panic (to-consensus-buff? token-1)))
  )
    (asserts! (< token-0-buff token-1-buff) ERR_INCORRECT_TOKEN_ORDERING)
    (ok true)
  )
)

(define-read-only (get-pool-id (pool-info {token-0: <ft-trait>, token-1: <ft-trait>, fee: uint})) 
  (let (
    (buff (unwrap-panic (to-consensus-buff? pool-info)))
  )
    (hash160 buff)
  )
)`}
              </pre>
            </div>
          </section>

          {/* Constant Product Math */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Mathematical Model</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Constant Product Curve ($x \cdot y = k$) & Swap Pricing.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              When swapping token input <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">dx</code> for output
              <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">dy</code>, a 0.3% liquidity provider fee is deducted
              (<code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-emerald-400">dx * 997 / 1000</code>):
            </p>

            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
{`;; Swap Output Calculation with 0.3% Fee in Clarity
(define-read-only (get-swap-output (amount-in uint) (reserve-in uint) (reserve-out uint))
  (let
    ((amount-in-with-fee (* amount-in u997))
     (numerator (* amount-in-with-fee reserve-out))
     (denominator (+ (* reserve-in u1000) amount-in-with-fee)))
    (/ numerator denominator)))`}
              </pre>
            </div>
          </section>

          {/* Functions & Error Codes */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Smart Contract Functions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Clarity Smart Contract Public Functions & Errors.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {AMM_FUNCTIONS.map((f) => (
                <div key={f.func} className="glassmorphism-card rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-electric-blue">{f.func}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-card-border text-text-muted">
                      {f.type}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{f.purpose}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-text-title mt-8 tracking-tight">AMM Protocol Error Codes</h3>
            <div className="grid gap-3 mt-4">
              {ERROR_CODES.map((err) => (
                <div key={err.code} className="glassmorphism-card rounded-xl p-4 flex gap-4">
                  <span className="text-xs font-mono text-red-400 shrink-0 w-52 font-semibold">{err.code}</span>
                  <p className="text-xs text-text-muted font-light leading-relaxed m-0">{err.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Technology Stack</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Production Tech Stack & Architecture.
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
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — System Metrics</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Verified Protocol Metrics.
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
          <nav aria-label="Legal" className="flex items-label gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/status" className="hover:text-foreground transition-colors">Status</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
