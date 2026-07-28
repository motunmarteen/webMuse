import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Zap,
  Lock,
  Code,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Coins,
  Key,
  Database,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Token Streaming — Engineering a Decentralized Asset Protocol",
  description:
    "An in-depth engineering case study of the Token Streaming Protocol: continuous token distribution on Bitcoin Layer 2 using Clarity 3 smart contracts, pause/resume state machines, and cryptographic ECDSA authorization.",
};

const STACK_TABLE = [
  { layer: "Smart Contracts", tech: "Clarity 3 · Stacks Blockchain", why: "Decidable, non-Turing complete smart contract language preventing unexpected reentrancy and runtime panics" },
  { layer: "Frontend UI", tech: "React 19 · TypeScript · Tailwind CSS", why: "Modern Web3 dashboard for stream management, live balance tickers, and signature generation" },
  { layer: "Blockchain SDK", tech: "@stacks/connect · @stacks/transactions", why: "Seamless wallet connection (Leather & Xverse) and cryptographic message signing" },
  { layer: "Testing Suite", tech: "Clarinet · Vitest · TypeScript", why: "Comprehensive unit and integration test suite covering stream creation, pause/resume, and refunds" },
];

const ERROR_CODES = [
  { code: "ERR_UNAUTHORIZED (u0)", desc: "Triggered when a principal attempts an action restricted to sender or recipient." },
  { code: "ERR_INVALID_SIGNATURE (u1)", desc: "Raised when ECDSA signature verification fails over parameter update hash." },
  { code: "ERR_STREAM_STILL_ACTIVE (u2)", desc: "Prevents sender from executing refund before stop-block expiry." },
  { code: "ERR_INVALID_STREAM_ID (u3)", desc: "Raised on lookup of non-existent stream ID key in data map." },
  { code: "ERR_STREAM_ALREADY_PAUSED (u5)", desc: "Blocks duplicate pause calls on an already paused stream state." },
  { code: "ERR_STREAM_CANCELLED (u6)", desc: "Blocks withdrawal or parameter mutation on a cancelled stream." },
];

const CONTRACT_FUNCTIONS = [
  { func: "stream-to", type: "public", purpose: "Initialize a new token payment stream with sender, recipient, amount, and time boundaries." },
  { func: "withdraw", type: "public", purpose: "Allow recipient to withdraw linearly accrued tokens at any point during active stream period." },
  { func: "pause-stream", type: "public", purpose: "Halt token accumulation during stream disputes or pauses, recording pause block timestamp." },
  { func: "resume-stream", type: "public", purpose: "Re-activate a paused stream, adjusting end time boundaries dynamically." },
  { func: "cancel-stream", type: "public", purpose: "Cancel stream, disbursing accrued tokens to recipient and returning remaining balance to sender." },
  { func: "refuel", type: "public", purpose: "Add additional tokens to an active stream to extend its duration or payout rate." },
  { func: "update-details", type: "public", purpose: "Modify stream parameters subject to dual-party ECDSA signature verification." },
  { func: "balance-of", type: "read-only", purpose: "Calculate real-time withdrawable balance based on block height progression." },
];

const METRICS = [
  { n: "Clarity 3", l: "Decidable smart contracts" },
  { n: "100%", l: "Test coverage across functions" },
  { n: "0 ms", l: "Real-time balance calculation" },
  { n: "ECDSA", l: "Cryptographic parameter consent" },
  { n: "2-Party", l: "Mutual pause/cancel safeguards" },
  { n: "Bitcoin L2", l: "Secured by Bitcoin consensus" },
];

export default function StacksTokenStreamingCaseStudyPage() {
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
              Case Study · Token Streaming Protocol
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a Real-Time Token Streaming Protocol on Bitcoin L2.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              A decentralized token streaming protocol built on the Stacks blockchain using Clarity 3 smart contracts.
              Enables continuous, second-by-second crypto payroll and vesting with pause/resume state machines, cancel refunds,
              and cryptographic ECDSA signature verification.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Clarity 3",
                "Bitcoin L2 (Stacks)",
                "Continuous Streaming",
                "ECDSA Verification",
                "Pause/Resume Engine",
                "Clarinet Tested",
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
          {/* Executive Summary */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">00 — Executive Summary</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Replacing Discrete Payouts with Continuous Asset Flows.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Traditional payroll and token vesting rely on discrete lump-sum disbursements — bi-weekly paychecks or monthly cliff unlocks.
              The Stacks Token Streaming Protocol converts asset transfers into continuous linear streams on Bitcoin Layer 2. Recipients
              accumulate funds block-by-block and can withdraw withdrawable tokens at any time, while senders retain refund rights over unaccrued capital.
            </p>
          </section>

          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The Vulnerabilities of Legacy Crypto Payroll & Vesting.
            </h2>
            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Lump-Sum Volatility",
                  v: "Employees and contractors are exposed to market price drops while waiting for monthly vesting cliffs or delayed payroll processing.",
                },
                {
                  k: "Dispute Deadlocks",
                  v: "If a contractor stops delivering work mid-month, senders have no programmatic way to pause or cancel unaccrued capital without escrow third parties.",
                },
                {
                  k: "Unilateral Parameter Tampering",
                  v: "Stream modifications (such as changing payment rates or recipient addresses) often lack cryptographic proof of mutual consent.",
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

          {/* Clarity Data Model */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Contract State Schema</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Clarity 3 Data Model & Tuple Structure.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every stream is stored in the <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">streams</code> map
              keyed by an incrementing <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">uint</code> stream ID:
            </p>

            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
{`;; Clarity Data Map Definition in contracts/stream.clar
(define-map streams
  uint ;; stream-id
  {
    sender: principal,
    recipient: principal,
    balance: uint,
    withdrawn-balance: uint,
    payment-per-block: uint,
    timeframe: (tuple (start-block uint) (stop-block uint)),
    status: (response uint uint),
    pause-block: uint,
    total-paused-blocks: uint
  }
)`}
              </pre>
            </div>
          </section>

          {/* Functions & Error Codes */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Protocol Operations</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Contract Public Interface & Invariant Guardrails.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {CONTRACT_FUNCTIONS.map((f) => (
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

            <h3 className="text-lg font-bold text-text-title mt-8 tracking-tight">Error Code Mapping</h3>
            <div className="grid gap-3 mt-4">
              {ERROR_CODES.map((err) => (
                <div key={err.code} className="glassmorphism-card rounded-xl p-4 flex gap-4">
                  <span className="text-xs font-mono text-red-400 shrink-0 w-44 font-semibold">{err.code}</span>
                  <p className="text-xs text-text-muted font-light leading-relaxed m-0">{err.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mathematical Invariants */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Mathematical Mechanics</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Linear Accrual Math & Balance Implementation.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              At current block height <code className="px-1.5 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">stacks-block-height</code>,
              the withdrawable balance for a recipient is calculated deterministically inside the smart contract:
            </p>

            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
{`;; Actual Clarity Balance Function from stream.clar
(define-read-only (balance-of (stream-id uint) (user principal))
  (let (
    (stream (unwrap! (map-get? streams stream-id) u0))
    (start-block (get start-block (get timeframe stream)))
    (stop-block (get stop-block (get timeframe stream)))
    (current-block stacks-block-height)
    (payment-per-block (get payment-per-block stream))
  )
    (if (is-eq user (get recipient stream))
      ;; Recipient accrued balance calculation
      (if (<= current-block start-block)
        u0
        (if (>= current-block stop-block)
          (- (get balance stream) (get withdrawn-balance stream))
          (- (* (- current-block start-block) payment-per-block) (get withdrawn-balance stream))
        )
      )
      u0
    )
  )
)`}
              </pre>
            </div>
          </section>

          {/* Cryptographic Verification */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Security</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Cryptographic ECDSA Signature Verification.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              To modify parameters on an active stream (<code className="px-1 py-0.5 rounded bg-card-border font-mono text-xs text-electric-blue">update-details</code>),
              the caller must present a 65-byte ECDSA signature over the SHA-256 hash digest of the proposed new parameters:
            </p>
            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre">
{`;; SHA-256 Hash Digest & ECDSA Signature Verification
(define-read-only (hash-stream (stream-id uint) (payment-per-block uint) (timeframe (tuple (start-block uint) (stop-block uint))))
  (sha256 (unwrap-panic (to-consensus-buff? {stream-id: stream-id, payment-per-block: payment-per-block, timeframe: timeframe})))
)

(define-read-only (validate-signature (hash (buff 32)) (signature (buff 65)) (signer principal))
  (is-eq (principal-of? (unwrap! (secp256k1-recover? hash signature) false)) (ok signer))
)`}
              </pre>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Technology Stack</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Production Stack & Technical Choices.
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
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — Codebase Metrics</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Verified Smart Contract Metrics.
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
