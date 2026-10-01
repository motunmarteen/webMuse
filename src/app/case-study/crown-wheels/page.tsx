import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Car,
  Database,
  Layers,
  Lock,
  Zap,
  Activity,
  PhoneCall,
  CheckCircle2,
  FileText,
  Sliders,
  AlertTriangle,
  Clock,
  Radio,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Crown Wheels — Engineering a Luxury Mobility & Fleet Operations Platform",
  description:
    "How WEBMUSE engineered Crown Wheels: a luxury private car hire and multi-tier vehicle sales platform for Nigeria — PostgreSQL EXCLUDE constraint double-booking guards, sub-150ms emergency SOS telemetry via Next.js after(), transactional settlement, zero-trust driver links, and 22 lint-enforced domain boundaries.",
};

const STACK_TABLE = [
  {
    layer: "Web & PWA",
    tech: "Next.js 15 App Router · React 19 · Tailwind CSS",
    why: "Serverless web application with mobile-optimized luxury showcases, vehicle catalog, and offline-capable PWA manifest",
  },
  {
    layer: "Architecture",
    tech: "Thin Controllers · Fat Services · Repository Pattern",
    why: "22 domain bounded contexts with strict dependency inversion — route handlers never touch Prisma directly",
  },
  {
    layer: "Datastore",
    tech: "PostgreSQL 16 · Prisma ORM · GiST Extension",
    why: "Relational persistence across 36 models, audited state mutations, and compound unique indexes",
  },
  {
    layer: "Concurrency Guard",
    tech: "Postgres EXCLUDE Constraint (GiST Index)",
    why: "Hardware-enforced double-booking exclusion on overlapping date ranges — eliminating check-then-act race conditions",
  },
  {
    layer: "Settlement",
    tech: "Paystack (Webhook HMAC-SHA512 + Poller)",
    why: "Transactional booking confirmation, automatic Trip creation, audit outbox logging, and idempotent webhook handling",
  },
  {
    layer: "Emergency Telemetry",
    tech: "Next.js 15 after() · Non-blocking Event Outbox",
    why: "Durable database write committed in <150ms with asynchronous background notification dispatch on serverless",
  },
  {
    layer: "Document Engine",
    tech: "pdf-lib (Pure JavaScript)",
    why: "Zero headless-Chrome/Puppeteer serverless dependency; generates branded luxury booking receipts in ~40ms",
  },
  {
    layer: "Boundaries & QA",
    tech: "eslint-plugin-boundaries · Vitest Fakes",
    why: "Lint-enforced architectural layers and 31 unit test suites executed against in-memory repository fakes without live DB",
  },
];

const ARCHITECTURE_PILLARS = [
  {
    icon: Database,
    title: "Database-Enforced Invariants",
    body: "PostgreSQL EXCLUDE constraint with GiST index and tsrange guarantees zero overlapping vehicle reservations under any concurrency load.",
  },
  {
    icon: Zap,
    title: "Sub-150ms SOS Telemetry",
    body: "Emergency SOS mutations write durable database events immediately and hand off external notification dispatch to Next.js 15 after().",
  },
  {
    icon: Lock,
    title: "Zero-Trust Driver Token Links",
    body: "Passwordless opaque cryptographic tokens with lightweight first-use device binding alert operators without locking out emergency SOS.",
  },
  {
    icon: Layers,
    title: "Lint-Enforced Layering",
    body: "Architecture boundaries strictly enforced by ESLint: controllers validate and route, services orchestrate, and only repositories import Prisma.",
  },
];

const CONCURRENCY_COMPARISON = [
  {
    stage: "The Application Check Fallacy",
    title: "Check-Then-Act Race Condition",
    desc: "A typical application queries 'SELECT * FROM bookings WHERE vehicleId = X AND dates overlap'. Under two concurrent requests arriving milliseconds apart, both read an empty result, both pass validation, and both write confirmed bookings. The result is a catastrophic double-booking for a multi-million Naira private hire.",
  },
  {
    stage: "The Structural Fix",
    title: "Postgres EXCLUDE USING gist",
    desc: "Crown Wheels pushes calendar block exclusion directly to PostgreSQL: 'EXCLUDE USING gist (vehicle_id WITH =, daterange(start_date, end_date, '[]') WITH &&)'. The database engine serializes the index check atomically during transaction commit. Competing writes are rejected at the storage layer.",
  },
  {
    stage: "The Controller Contract",
    title: "RFC-7807 409 Conflict Surface",
    desc: "When concurrent booking attempts collide, the repository catches Postgres error code 23P01 (exclusion_violation) and cleanly transforms it to a 409 BOOKING_DATES_UNAVAILABLE error response. The user sees a clear, immediate availability notice without orphaned state.",
  },
];

const EMERGENCY_LIFECYCLE = [
  {
    step: "01",
    actor: "Passenger or Driver",
    action: "Trigger SOS Button",
    detail: "Client dispatches payload with coordinates, battery level, trip token, and offline timestamp.",
  },
  {
    step: "02",
    actor: "PostgreSQL Transaction",
    action: "Durable Write (<150ms)",
    detail: "SosEvent row commits immediately to database. HTTP 200/201 response returns to device instantly without blocking.",
  },
  {
    step: "03",
    actor: "Next.js after()",
    action: "Asynchronous Dispatch",
    detail: "Serverless execution schedules NotificationDispatcher without freezing lambda lifecycle. Resend email alerts fire to fleet security.",
  },
  {
    step: "04",
    actor: "Trip State",
    action: "Pre-Created Trip Anchor",
    detail: "Trips are created at payment confirmation — not deferred to hire start date — ensuring emergency SOS anchors exist immediately.",
  },
];

const ADR_LIST = [
  {
    code: "ADR-007",
    decision: "No Automated WhatsApp Business API",
    rationale:
      "Automated WhatsApp bots add monthly Meta per-conversation fees, rate-limit drops during critical updates, and maintenance overhead. Crown Wheels uses pure manual wa.me links with pre-filled context, letting clients chat directly with the owner while automated notifications remain strictly on verified transactional email.",
  },
  {
    code: "ADR-012",
    decision: "pdf-lib Over Puppeteer / Headless Chrome",
    rationale:
      "Deploying Puppeteer or Chromium binaries to Vercel Serverless balloons function cold starts by 4–8 seconds and risks OOM crashes. pdf-lib is 100% pure JavaScript with zero native dependencies, generating pixel-perfect luxury hire invoices in 40ms.",
  },
  {
    code: "ADR-015",
    decision: "Fail-Open Geographic Coverage Zone Guard",
    rationale:
      "If the CoverageZone geographic database table is empty or unseeded in a new deployment, bookings are permitted rather than globally rejected. An unconfigured operational zone table must never brick customer checkouts before the fleet manager sets boundaries.",
  },
  {
    code: "ADR-021",
    decision: "Non-Blocking Device Fingerprint Security",
    rationale:
      "Drivers access trip manifests via secure cryptographic private tokens. When a device fingerprint mismatch occurs (Driver.boundDeviceHash), the system alerts fleet operators rather than locking the link. A locked token during an on-road incident would strip the driver of their emergency SOS trigger.",
  },
];

const METRICS = [
  { n: "92", l: "API Route Handlers" },
  { n: "22", l: "Bounded Domain Modules" },
  { n: "36", l: "Prisma Database Models" },
  { n: "0 ms", l: "Double-booking race window" },
  { n: "<150 ms", l: "SOS event durability" },
  { n: "0", l: "Float rounding errors" },
  { n: "31", l: "In-memory test suites" },
  { n: "~40 ms", l: "Pure JS PDF receipt time" },
];

export default function CrownWheelsCaseStudyPage() {
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
              Case Study · Crown Wheels
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Engineering a high-integrity luxury mobility & fleet operating platform.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Crown Wheels unites two distinct business scales: a dedicated, owned luxury fleet for
              chauffeured hire alongside an open, ongoing sales inventory. This is the engineering
              record of how WEBMUSE engineered database-enforced concurrency, offline emergency
              telemetry, zero-trust driver links, and 22 lint-enforced domain boundaries.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "PostgreSQL EXCLUDE constraint",
                "Next.js 15 after() SOS",
                "Repository Pattern",
                "Layered Idempotency",
                "Zero-Trust Driver Tokens",
                "Pure JS PDF Receipts",
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
              When luxury assets and human safety meet real-world networks, application guards are not enough.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Operating a chauffeured luxury mobility service in Nigeria is fundamentally different from a
              standard e-commerce store. Vehicles command premium hire rates, itineraries span multiple
              days across intercity corridors, and emergencies demand immediate operational clarity.
            </p>

            <div className="grid gap-3 mt-6">
              {[
                {
                  k: "Concurrency",
                  v: "High-demand luxury vehicles (e.g. Mercedes-Benz G-Wagons, Maybachs, Range Rovers) face simultaneous booking attempts during peak executive calendars. Traditional application-level 'check-then-create' logic creates a race window where two users book the same vehicle for overlapping dates.",
                },
                {
                  k: "Safety Criticality",
                  v: "In transit, when a driver or passenger triggers an SOS, network connections can be degraded. If emergency dispatch waits for third-party email APIs inline or relies on a scheduled cron job, serverless timeouts and dropped packets can delay life-critical intervention.",
                },
                {
                  k: "Financial Trust",
                  v: "Handling multi-million Naira transactions over unstable mobile connections leads to double-clicks and repeated webhooks. The system must guarantee real database idempotency and strict decimal precision with zero floating-point rounding drift.",
                },
                {
                  k: "Driver Usability",
                  v: "Drivers in the field need instant access to trip schedules and communications without password friction, yet sharing manifest URLs across unauthorized devices creates security vulnerabilities.",
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
              Make correctness structural, not procedural.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Procedural code can always be bypassed by concurrent database connections, unhandled exceptions,
              or serverless lifecycle freezes. WEBMUSE built Crown Wheels around a 25-pillar engineering
              fortress where invariants are pushed to the lowest possible layer: the database engine,
              durable transaction outboxes, and strict architectural lint rules.
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
              The Fortress Architecture: 22 isolated domains, thin controllers, and atomic transactions.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every request follows a unidirectional dependency flow. Route handlers strictly parse HTTP
              inputs, validate schemas via Zod, and delegate to a single domain service. Services depend on
              injected repository interfaces, keeping business rules 100% testable in memory.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/40 p-5 md:p-6 mt-6 overflow-x-auto">
              <pre className="text-[11px] md:text-xs font-mono text-text-muted leading-relaxed whitespace-pre">
{`  HTTP Client (Mobile / PWA / Web)
          │
          ▼
  Thin Route Handler (app/api/v1/**)
  ├─ Zod Schema Validation
  └─ Idempotency-Key Header Lookup (Cache check)
          │
          ▼
  Fat Domain Service (src/domains/*/service/)
  ├─ Business Rules & Pricing Engine (Decimal strings)
  └─ Injected Repository Contract (Zero direct DB imports)
          │
          ▼
  Repository Layer (src/domains/*/repository/)
  ├─ prisma.$transaction([
  │    Booking status update,
  │    CalendarBlock reservation,
  │    Trip record initialization,
  │    AuditLogEntry write
  │  ])
          │
          ▼
  PostgreSQL Engine (Storage Layer)
  ├─ EXCLUDE USING gist (vehicle_id WITH =, daterange WITH &&)
  ├─ Unique Compound Indexes: (user_id, idempotency_key)
  └─ Constraint Violation 23P01 ──> 409 BOOKING_DATES_UNAVAILABLE
          │
          ▼
  Background Execution: Next.js after()
  └─ NotificationDispatcher ──> Resend Email & Fleet Security Outbox`}
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

          {/* 04 — Deep Dive: Concurrency */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              04 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Eliminating double-booking races at the database hardware layer.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              In car hire software, double-booking prevention is often built as an application-level query:
              find overlapping reservations; if none exist, create the booking. Under concurrent traffic,
              this check-then-act pattern creates a race window that guarantees double bookings.
            </p>

            <div className="flex flex-col gap-0 mt-6">
              {CONCURRENCY_COMPARISON.map((row, i, arr) => (
                <div
                  key={row.stage}
                  className={`py-5 ${
                    i !== arr.length - 1 ? "border-b border-dashed border-card-border" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0">
                      {row.stage}
                    </span>
                    <h3 className="text-base font-bold text-text-title tracking-tight">{row.title}</h3>
                  </div>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed">{row.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-card-border bg-card-bg/30 p-5 mt-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
                PostgreSQL Constraint Definition
              </span>
              <pre className="text-xs font-mono text-text-title mt-3 overflow-x-auto">
{`ALTER TABLE "CalendarBlock"
ADD CONSTRAINT "no_overlapping_vehicle_blocks"
EXCLUDE USING gist (
  vehicle_id WITH =,
  daterange(start_date, end_date, '[]') WITH &&
);`}
              </pre>
              <p className="text-xs text-text-muted font-light mt-3 leading-relaxed">
                Because this constraint lives in Postgres rather than TypeScript, concurrent booking
                transactions are evaluated by Postgres index serialization locks. The application
                never needs an error-prone distributed lock for date ranges.
              </p>
            </div>
          </section>

          {/* 05 — Deep Dive: SOS Telemetry */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              05 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Sub-150ms Emergency SOS: Non-blocking telemetry on serverless runtimes.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              When an executive passenger or fleet driver taps SOS, the system cannot afford 3–5 seconds
              of HTTP connection stalling while calling downstream notification APIs. Worse, in serverless
              environments (e.g. Vercel), a bare fire-and-forget Promise (<code className="font-mono text-xs">void dispatch()</code>)
              is routinely killed mid-flight the moment the function response finishes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {EMERGENCY_LIFECYCLE.map((step) => (
                <div key={step.step} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-electric-blue">
                      {step.step} · {step.actor}
                    </span>
                    <Radio className="h-3.5 w-3.5 text-electric-blue" />
                  </div>
                  <h4 className="text-sm font-bold text-text-title tracking-tight mt-2.5">
                    {step.action}
                  </h4>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              A key architectural decision was made in Sprint 6:{" "}
              <span className="text-text-title font-medium">
                A Trip record is generated immediately upon booking payment confirmation
              </span>
              , rather than deferred to a scheduled job at hire start date. Because SOS attaches directly
              to a Trip, a passenger in transit is never blocked by an unrun background cron.
            </p>
          </section>

          {/* 06 — Deep Dive: Financial Integrity */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              06 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Financial precision: Zero-float contracts and real DB idempotency.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              High-value Nigerian transactions cannot tolerate floating-point math bugs. A calculation error
              of ₦0.01 accumulates over invoices, and duplicate webhook delivery can double-credit
              bookings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                {
                  title: "Decimal Strings Only",
                  desc: "Money across all API contracts is serialized as a strict decimal string (e.g. '450000.00'), never a JavaScript IEEE-754 float.",
                },
                {
                  title: "DB Idempotency Index",
                  desc: "A unique compound index on (userId, idempotencyKey) halts duplicate checkout submissions before any mutation occurs.",
                },
                {
                  title: "Dual-Path Settlement",
                  desc: "Paystack webhook payloads are verified via HMAC-SHA512 signatures, backed by direct server-to-server transaction verification.",
                },
              ].map((c) => (
                <div key={c.title} className="glassmorphism-card rounded-xl p-5">
                  <h4 className="text-sm font-bold text-text-title tracking-tight">{c.title}</h4>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Deep Dive: Driver Links */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              07 — Deep Dive
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Zero-trust driver private links with first-use device binding.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Drivers operate on personal mobile hardware and require instant access to daily trip manifests,
              passenger communications, and status updates. Traditional password authentication creates
              high support friction and lost-credential delays.
            </p>

            <div className="rounded-xl border border-card-border bg-card-bg/30 p-5 mt-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Lock className="h-5 w-5 text-electric-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-title tracking-tight">
                    Cryptographic Tokens with First-Use Fingerprint Binding
                  </h4>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    Drivers receive high-entropy opaque private URLs. On first launch, the driver client
                    computes a browser device fingerprint and persists{" "}
                    <code className="font-mono text-xs">Driver.boundDeviceHash</code> in the database.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-card-border">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-text-title tracking-tight">
                    The Safety Trade-off: Non-Blocking Alerting
                  </h4>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
                    If a driver accesses the link from a different device, the system raises an immediate
                    alert to the fleet operations console rather than hard-blocking access. Because this
                    token also gates the Driver SOS emergency trigger, locking the interface during an
                    unplanned phone switch would be an unacceptable life-safety failure.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 08 — ADRs & Trade-Offs */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              08 — Principles & ADRs
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Architectural Decision Records: What we chose not to build.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              High-integrity software is defined as much by what is excluded as what is included. Crown
              Wheels adheres to strict Architectural Decision Records (ADRs) documented in the project
              blueprint.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {ADR_LIST.map((adr) => (
                <div key={adr.code} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
                    {adr.code} · {adr.decision}
                  </span>
                  <p className="text-xs text-text-muted font-light mt-2.5 leading-relaxed">
                    {adr.rationale}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 09 — By the numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
              09 — By the numbers
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
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
                <Car className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Building mission-critical fleet or transactional platforms? Let&apos;s talk.
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
