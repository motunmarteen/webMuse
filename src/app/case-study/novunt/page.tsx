import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ShieldCheck, ScrollText, Landmark, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Novunt — Building a Secure Fintech Backend",
  description:
    "How WEBMUSE engineered Novunt: a custodial staking platform's backend — atomic deposit claims, layered idempotency, an immutable double-entry ledger, and threshold-gated withdrawals, verified against the running codebase.",
};

const STACK_TABLE = [
  { layer: "API", tech: "Node.js · Express · TypeScript", why: "Request handling, validation middleware, RBAC-gated admin routes" },
  { layer: "Data", tech: "MongoDB · Mongoose", why: "Wallets, transactions, ledger entries, unique-transaction-ID dedup indexes" },
  { layer: "Settlement", tech: "NOWPayments (webhook + poller)", why: "Crypto deposit/withdrawal processing with a dual confirmation path" },
  { layer: "Realtime", tech: "Socket.IO", why: "Live balance and transaction status updates to the client" },
  { layer: "Scheduling", tech: "node-cron", why: "Deposit polling, ROS distribution, rank checks, reconciliation" },
  { layer: "Auth", tech: "JWT · Speakeasy TOTP · WebAuthn", why: "Session auth, 2FA on every admin role, biometric device support" },
];

const LEDGER_RULES = [
  { rule: "No mutation after write", detail: "A save on an already-persisted entry throws — enforced in the schema, not by convention." },
  { rule: "Every entry is two-sided", detail: "A debit and a credit are written as separate documents for every financial event, never a single balance delta." },
  { rule: "Every entry is hashed", detail: "A verification hash over the entry's core fields lets tampering be detected by re-hashing and comparing." },
  { rule: "Balance is a cache", detail: "A scheduled job recomputes each wallet's balance from the ledger and flags drift against the live value." },
];

const CONCURRENCY_LAYERS = [
  { l: "Layer 1", t: "Request fingerprint", d: "An in-memory hash of user, amount, and destination rejects an identical request repeated within seconds." },
  { l: "Layer 2", t: "Operation lock", d: "A short-lived in-memory lock scoped to the specific operation, guarding against same-process double-submits." },
  { l: "Layer 3", t: "Distributed lock", d: "A MongoDB-backed lock with a unique index and TTL expiry — survives a process restart, guarding cross-instance races." },
  { l: "Layer 4", t: "Optimistic version check", d: "The final balance write carries a document version; a concurrent write elsewhere fails the check rather than silently overwriting." },
];

const METRICS = [
  { n: "1 write", l: "Atomic deposit claim" },
  { n: "3", l: "Idempotency layers" },
  { n: "4", l: "Concurrency layers on withdrawal" },
  { n: "2-sided", l: "Every ledger entry" },
  { n: "$50", l: "Configurable instant-withdrawal ceiling" },
  { n: "24h → 7d", l: "Deposit recovery window" },
];

export default function NovuntCaseStudyPage() {
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
              Case Study · Novunt
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-2xl">
              Building a secure fintech backend.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Novunt is a goal-based staking platform — but strip away the product language and the
              backend is a custody system: wallet balances, crypto settlement, an internal ledger, and
              admin-gated payouts. This is the record of what it took to move real money correctly.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Atomic deposit claims", "Layered idempotency", "Immutable ledger", "Threshold-gated withdrawals"].map((t) => (
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
              Ordinary web-app bugs throw errors. Fintech bugs silently do the wrong thing correctly, twice.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A staking platform holds custodial wallet balances, settles crypto deposits and withdrawals
              through a third-party processor, and pays scheduled returns against an internal ledger. Every
              one of those is a place where a race condition or an unenforced boundary turns into money
              gained or lost — not a stack trace.
            </p>
            <div className="grid gap-3 mt-6">
              {[
                { k: "Settlement", v: "Deposits are confirmed through two independent paths — a processor webhook and a polling fallback — so a race between them can credit the same deposit twice if nothing stops it." },
                { k: "Custody", v: "Withdrawal requests move real funds out. A balance deducted twice, or approved without the right gate, is not a data-integrity bug — it's a loss." },
                { k: "Trust", v: "A wallet balance is just a number until something can prove it's the right number. Without a ledger, drift between what the system credited and what a user actually has is invisible until someone complains." },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-24">
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
              Make correctness structural, not procedural.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A check-then-act guard can always lose a race. The fixes that held were the ones that made
              the database itself the referee — a single atomic write that can only succeed once, an
              immutable ledger the application cannot quietly edit, a lock that survives a process
              restart. Three pillars carry that idea through the backend.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: ShieldCheck, title: "Atomic claims", body: "Deposit confirmation and backup-code redemption are single conditional database writes — exactly one caller can ever win." },
                { icon: ScrollText, title: "Immutable ledger", body: "Double-entry, hash-verified, append-only. The live balance is a cache; the ledger is the truth." },
                { icon: Landmark, title: "Threshold custody", body: "Withdrawals scale from instant to admin-approved to double-confirmed purely by amount, configurable at runtime." },
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

          {/* Architecture / stack */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Two confirmation paths for reliability, one atomic gate to stay correct.
            </h2>
            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  NOWPayments Webhook          Polling Job (5 min cron)
          │                            │
          └─────────────┬──────────────┘
                         ▼
          Atomic claim:  updateOne({status ≠ confirmed})
                         │
                 modifiedCount === 1 ?
                    │            │
                   yes           no
                    │            │
           credit wallet    skip — already claimed
                    │
                    ▼
        Double-entry ledger write (debit + credit)`}
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

          {/* Deep dive: the double-credit race */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The bug that mattered most: paying someone twice for one deposit.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Crypto deposits are confirmed two ways — a processor webhook, and a polling job that
              re-checks pending deposits as a safety net for webhooks that get dropped or arrive late.
              Both paths originally shared the same logic: check whether the deposit is already
              confirmed, and if not, confirm it and credit the wallet. Read, then write.
            </p>
            <div className="flex flex-col gap-0 mt-6">
              {[
                { s: "The race", t: "Check-then-act", d: "If the webhook and the poller fired close enough together, both could read “not yet confirmed” before either had written back — and both would credit the wallet. Same deposit, two credits." },
                { s: "The fix", t: "Atomic conditional write", d: "Confirmation became a single database update: flip status to confirmed only if it isn't already confirmed, and credit the wallet only if that specific write is the one that changed something. Exactly one competing process can ever win." },
                { s: "The twist", t: "Self-inflicted redundancy", d: "The polling job existed because an earlier fix stopped the processor from retrying dropped webhooks. Solving that reliability problem is what introduced the correctness problem." },
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
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              A second, quieter bug lived in the same territory: the poller only re-checked deposits from
              the last 24 hours, so a deposit that confirmed on-chain after that window fell out of range
              and was never credited. The recovery window widened to{" "}
              <span className="text-text-title font-medium">7 days</span> so a slow confirmation doesn&apos;t
              become a lost deposit either.
            </p>
          </section>

          {/* Deep dive: idempotency */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Idempotency, in layers.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              &quot;Idempotency&quot; sounds like one feature. In practice it became three separate mechanisms,
              each answering a different version of the same question — has this exact operation already
              happened?
            </p>
            <div className="grid gap-2.5 mt-6">
              {[
                { l: "API layer", tone: "text-electric-blue", d: "Mutation endpoints accept an idempotency key. A duplicate in-flight request is rejected; a duplicate after completion replays the original response." },
                { l: "Database layer", tone: "text-electric-blue", d: "Every processor operation — invoice, payment, blockchain tx hash — is recorded against a unique index, so the same external transaction can never become two internal ones." },
                { l: "Webhook layer", tone: "text-electric-blue", d: "Every inbound webhook is checked against “has this payment ID already been processed” before it touches a balance, closing the replay-attack angle." },
              ].map((r) => (
                <div key={r.l} className="flex items-baseline gap-4 rounded-lg border border-card-border bg-card-bg/30 px-4 py-3">
                  <span className={`text-xs font-mono font-semibold shrink-0 w-32 ${r.tone}`}>{r.l}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              No single layer would have been enough alone — each is defending against a different actor:
              a double-click, a bug in application logic, or a resent payload.
            </p>
          </section>

          {/* Deep dive: ledger */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              An immutable, double-entry ledger.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Early on, a wallet balance was just a number, incremented and decremented in place — fine
              until you need to answer why a balance is what it is, or catch drift between what the system
              credited and what a user&apos;s transaction history says they should have.
            </p>
            <div className="rounded-xl border border-card-border overflow-x-auto mt-6">
              <table className="w-full text-sm min-w-[460px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["Rule", "What it enforces"].map((h) => (
                      <th key={h} className="text-left font-mono text-[10px] uppercase tracking-widest text-text-muted px-4 py-3 border-b border-card-border">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEDGER_RULES.map((row) => (
                    <tr key={row.rule} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-medium whitespace-nowrap">{row.rule}</td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              This is the standard fintech answer to <span className="text-text-title font-medium">trust but verify</span>:
              the live balance is a cache, the ledger is the truth, and a scheduled reconciliation job
              checks the cache against the truth rather than assuming they never diverge.
            </p>
          </section>

          {/* Deep dive: withdrawals */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Withdrawals: where mistakes are losses, not reconciliation tasks.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Deposits are asymmetric — worst case, the system is wrong about money coming in. Withdrawals
              are money leaving, so every mistake is a loss. An early version approved all withdrawals
              instantly, trusting upstream fraud checks alone. That trust outran what those checks had
              actually been tested against, and the surface was rebuilt around amount-based thresholds.
            </p>
            <div className="rounded-xl border border-card-border overflow-hidden mt-6">
              {[
                { t: "< $50", d: "Instant. Existing fraud and rate checks are the only gate — threshold configurable at runtime, not hardcoded." },
                { t: "≥ $50", d: "Queued for manual admin approval. Balance is deducted atomically at request time, with a refund path if rejected." },
                { t: "High-value", d: "A separate confirmation flag is required from the approving admin — one click can't clear a large payout alone." },
              ].map((r, i) => (
                <div
                  key={r.t}
                  className={`flex items-center gap-5 px-5 py-4 bg-card-bg/30 ${i !== 0 ? "border-t border-card-border" : ""}`}
                >
                  <span className="font-mono text-sm font-semibold text-electric-blue w-24 shrink-0">{r.t}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              Underneath every balance-touching request sits a stack of four concurrency layers, each
              guarding against a different scope of race:
            </p>
            <div className="flex flex-col gap-0 mt-4">
              {CONCURRENCY_LAYERS.map((row, i, arr) => (
                <div key={row.l} className={`py-4 ${i !== arr.length - 1 ? "border-b border-dashed border-card-border" : ""}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0">{row.l}</span>
                    <h3 className="text-base font-bold text-text-title tracking-tight">{row.t}</h3>
                  </div>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed">{row.d}</p>
                </div>
              ))}
            </div>
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
                A missed race condition isn&apos;t a bug ticket. It&apos;s someone&apos;s money.
              </p>
              <p className="text-sm text-text-muted font-light mt-4 leading-relaxed max-w-2xl">
                Redundancy for availability and correctness under concurrency are different goals. Every
                fallback path added for reliability — a poller, a retry, a second confirmation channel —
                was audited for the new race it could introduce, not just the gap it closed.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { k: "Atomic over defensive", v: "A single conditional database write beats a check-then-act guard every time two processes can run concurrently." },
                { k: "Ledger as truth", v: "The wallet balance is a materialized cache; the immutable ledger is what reconciliation trusts." },
                { k: "Thresholds, not blanket trust", v: "Custody risk scales with amount — instant, approved, and double-confirmed are three different postures, not one." },
                { k: "Defense in depth", v: "Fingerprint, lock, distributed lock, and version check each cover a scope the others don't." },
              ].map((p) => (
                <div key={p.k} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">{p.k}</span>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed m-0">{p.v}</p>
                </div>
              ))}
            </div>
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
