import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ShieldCheck,
  HardHat,
  CheckCircle2,
  Lock,
  MapPin,
  Database,
  Cpu,
  FileCheck,
  Activity,
  Server,
  BookOpen,
  Users,
  Smartphone,
  BarChart3,
  MessageSquare,
  Camera,
  WifiOff,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SETH HSE — A Verified Safety Operations Platform for Tower Sites",
  description:
    "How WEBMUSE engineered SETH HSE: a web, Android and API platform that turns tower-site safety work into verified, auditable records — zone-based dispatch, camera-and-geofence clock-in, a report review workflow with permanent edit history, built-in training, analytics and chat.",
};

const PROBLEMS = [
  {
    k: "Unverifiable presence",
    v: "A site visit was a claim. Nothing proved that a safety marshal was actually standing at the tower, at the time stated.",
  },
  {
    k: "Reports with no review",
    v: "Reports travelled by WhatsApp and spreadsheet. Nobody could say which were read, accepted or sent back, and edits left no trace.",
  },
  {
    k: "No chain of command",
    v: "Marshals, the regional leads who supervise them, and head office worked from different lists, with no shared picture of who was where.",
  },
  {
    k: "Patchy signal",
    v: "Many sites have weak or no data coverage. Any tool that needs a live connection to record a safety fact fails exactly where it is needed.",
  },
];

const CORE_FEATURES = [
  {
    icon: Users,
    title: "A role model that matches the real organisation",
    points: [
      "Marshal (field), Coordinator (one per zone) and Super Admin (every zone).",
      "Nigeria is split into zones. A Super Admin can add a zone and move states between zones; the sites, projects and Marshals move with them.",
      "A database rule allows only one Coordinator per zone, so authority is never ambiguous.",
    ],
  },
  {
    icon: MapPin,
    title: "Task dispatch from a live site queue",
    points: [
      "A site register of 25,000+ tower sites is searchable, with add-by-ID and paste-many-IDs.",
      "Coordinators send a Marshal to one or many sites; the Marshal accepts or declines, and a decline sends the site back to the waiting queue.",
      "Sites added by mistake can be edited or removed, and any task can be cancelled, with every step recorded.",
    ],
  },
  {
    icon: Camera,
    title: "Clock-in that has to be proven",
    points: [
      "A fresh photo from the live camera is required. A picture from the gallery is refused.",
      "The location is checked against a geofence circle around the site; far-from-site or missing location flags the shift for the Coordinator instead of blocking the worker.",
      "Shifts carry risk signals, and flagged or orphaned shifts land in a review queue.",
    ],
  },
  {
    icon: FileText,
    title: "Four structured HSE reports, with photo and video",
    points: [
      "Daily (checklist, PPE, risks, infractions), Incident, Escalation, and a 25-question Maintenance inspection.",
      "Photos up to 25 MB and video up to 100 MB, identified by file content rather than file name.",
      "Reports can be exported as PDF and rolled up into a weekly Zone Report with an Excel workbook.",
    ],
  },
  {
    icon: FileCheck,
    title: "Review workflow with a permanent edit history",
    points: [
      "Every report is Under review, then Accepted, or Rejected with a written reason the Marshal can read.",
      "A report can be corrected and re-sent. The old version is never overwritten: each edit is kept forever, with who changed it and when.",
      "Marshals can only change their own report, and only until it is accepted.",
    ],
  },
  {
    icon: BookOpen,
    title: "Safety Protocol gate and a built-in training system",
    points: [
      "Marshals must read and confirm the Safety Protocol before they can clock in or report; a new version forces a fresh confirmation.",
      "Courses, timed quizzes with limited tries, answer review and verifiable certificates, with courses that can be required before clock-in.",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics that answer real questions",
    points: [
      "Sixteen sections for the Super Admin and each Coordinator: report review speed, safety and incidents, compliance, attendance, workforce, coverage and trust.",
      "Alerts for the things that need action, goals, a map view, a question builder, Excel export, and a Monday-morning summary email.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Chat, broadcast and push notifications",
    points: [
      "Direct and group chat where a Marshal can only reach their own Coordinator and the Super Admin, with sites, reports and files attached only when everyone could already open them.",
      "Chats are kept as an audit trail the Super Admin can read, and every read is itself logged.",
      "Push notifications reach the phone even when the app is closed.",
    ],
  },
];

const FLOW = [
  { who: "Marshal", what: "Signs up, is approved, confirms the Safety Protocol, accepts a task, clocks in with a live photo, files reports and trains." },
  { who: "Coordinator", what: "Approves people, sends Marshals to sites, reviews and decides on reports, writes the weekly zone report and watches the zone analytics." },
  { who: "Super Admin", what: "Manages zones and Coordinators, suspends or restores accounts, publishes courses, sets the offer letter, and audits the whole platform." },
];

const MODULES = [
  { module: "iam · personnel · onboarding", purpose: "Accounts, approval, two-step sign-in, suspension and Marshal profiles." },
  { module: "assignment · matching", purpose: "Sites, tasks, accept and decline, the waiting-site queue and cancellation." },
  { module: "attendance · monitoring", purpose: "Verified clock-in and clock-out, location pings, geofence state and the live map." },
  { module: "hse-site-report", purpose: "The four report kinds, review decisions, comments and the permanent edit history." },
  { module: "lms · safety-protocol", purpose: "Courses, quizzes, certificates, and the protocol every Marshal must confirm." },
  { module: "analytics · performance", purpose: "Sixteen analytics sections, alerts, goals and the weekly digest." },
  { module: "chat · announcements · notifications", purpose: "Conversations, broadcast, in-app, email and push delivery." },
  { module: "audit · dsar · offer-letter", purpose: "Append-only audit trail, data-subject requests, and generated ID cards and offer letters." },
];

const INVARIANTS = [
  {
    title: "One Coordinator per zone",
    code: "CREATE UNIQUE INDEX uq_one_coordinator_per_zone ON users (org_id, zone)\n  WHERE role = 'sub_admin' AND deleted_at IS NULL AND zone IS NOT NULL;",
    desc: "The chain of command is enforced by PostgreSQL itself, not just by screens that hide a button.",
  },
  {
    title: "A site ID can only exist once",
    code: "CREATE UNIQUE INDEX uq_sites_ihs_site_id ON sites (org_id, ihs_site_id)\n  WHERE deleted_at IS NULL AND ihs_site_id IS NOT NULL;",
    desc: "Two Coordinators can never end up holding the same tower, even if they add it at the same second.",
  },
  {
    title: "Submitted reports cannot be changed in place",
    code: "CREATE TRIGGER trg_hse_site_daily_reports_immutable BEFORE UPDATE\n  ON hse_site_daily_reports FOR EACH ROW EXECUTE FUNCTION hse_site_report_immutable();",
    desc: "A report is a record. Corrections are new versions, never silent overwrites.",
  },
  {
    title: "The edit history is append-only",
    code: "CREATE TRIGGER trg_hse_site_report_versions_update BEFORE UPDATE\n  ON hse_site_report_versions ... RAISE EXCEPTION;  -- and the same for DELETE",
    desc: "Every earlier version of an edited report is kept for good, so an audit can see exactly what changed and who changed it.",
  },
];

const TRUST_LAYERS = [
  { layer: "Layer 1", title: "Live camera only", detail: "The clock-in photo must be taken now. A saved picture is refused, and the photo is checked before a Coordinator sees it." },
  { layer: "Layer 2", title: "Geofence check", detail: "The reported position is compared with a circle around the site. Outside it, the shift is flagged rather than rejected, so a real worker is never locked out." },
  { layer: "Layer 3", title: "Risk signals and a review queue", detail: "Suspicious shifts carry stored risk signals and appear in a Shift Review queue for a human to decide." },
  { layer: "Layer 4", title: "Offline-safe sync", detail: "With no signal the phone saves the clock-in or report and sends it later; request keys make a re-send safe, so nothing is duplicated." },
];

const STACK_TABLE = [
  { layer: "Android app", tech: "Flutter · Dart · Riverpod", why: "One field app with a local offline queue, live-camera capture, geofence-aware location and push notifications." },
  { layer: "Web app", tech: "Next.js · React · Tailwind CSS · TanStack Query", why: "A mobile-first dashboard for every role that also installs as an app, with maps for site and live-location views." },
  { layer: "API", tech: "Node.js · Express · TypeScript (strict) · Zod", why: "A modular monolith with validated inputs and a permission matrix checked on every route." },
  { layer: "Data", tech: "PostgreSQL + PostGIS · Redis", why: "Geospatial queries for geofencing and site search, hard rules in the database, and a transactional outbox so events are never lost." },
  { layer: "Documents", tech: "PDF generation · Excel export", why: "ID cards, offer letters, report PDFs and weekly zone workbooks produced on the server." },
  { layer: "Platform", tech: "Docker · AWS · Vercel · Firebase push", why: "Containerised API on AWS, the web app on Vercel, and push delivery to the phone." },
];

const METRICS = [
  { n: "3", l: "Surfaces: web, Android, API" },
  { n: "23", l: "Bounded modules" },
  { n: "50", l: "Database migrations" },
  { n: "1,000+", l: "Automated tests (817 unit + 218 integration)" },
  { n: "16", l: "Analytics sections" },
  { n: "25,000+", l: "Sites in the register" },
];

export default function SethHseCaseStudyPage() {
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
              Case Study · SETH HSE · Live in production
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Turning tower-site safety work into records you can prove.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              SETH HSE is a health, safety and environment platform for telecom tower sites across Nigeria. A field
              safety marshal, the regional Coordinator who supervises them, and head office all work from one system —
              on the web and on an Android app that keeps working with no signal. Every clock-in, report and decision
              is verified, reviewed and kept.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {[
                "Web + Android + API",
                "Zone-based dispatch",
                "Verified clock-in",
                "Report review & history",
                "Built-in training",
                "Analytics",
                "Offline-first",
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
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">00 — The value in one paragraph</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Proof of presence, proof of review, proof of history.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Most field tools record what a worker says happened. SETH HSE is built to record what can be shown:
              a live photo at a geofenced site, a report that a named Coordinator accepted or sent back with a reason,
              and an edit history that can never be rewritten. It does this for people who work where the signal is
              poor, and it mirrors how the organisation really runs — Marshal, Coordinator, Super Admin — so that
              authority, visibility and accountability line up with the people using it.
            </p>
          </section>

          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Safety work at tower sites ran on claims, not evidence.
            </h2>
            <div className="grid gap-3 mt-6">
              {PROBLEMS.map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-32 font-semibold">
                    {row.k}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core functionality */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — What the platform does</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              The core functionality — and why it matters.
            </h2>
            <div className="grid gap-6 mt-6">
              {CORE_FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glassmorphism-card rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-text-title">{f.title}</h3>
                    </div>
                    <ul className="mt-4 grid gap-2 list-none p-0">
                      {f.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm text-text-muted font-light leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-electric-blue shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Flow */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Who does what</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Three roles, one connected workflow.
            </h2>
            <div className="grid gap-3 mt-6">
              {FLOW.map((row) => (
                <div key={row.who} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-28 font-semibold">
                    {row.who}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.what}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Verification */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Field verification</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Trust the evidence, protect the honest worker.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Location from a phone is treated as a claim to be scored, not a fact. A suspicious clock-in is flagged
              for a person to review; it never locks a real worker out of doing their job.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {TRUST_LAYERS.map((layer) => (
                <div key={layer.layer} className="glassmorphism-card rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue font-semibold">{layer.layer}</span>
                    <h3 className="text-base font-bold text-text-title tracking-tight mt-2 flex items-center gap-2">
                      {layer.layer === "Layer 4" ? <WifiOff className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                      {layer.title}
                    </h3>
                    <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{layer.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Architecture</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A 23-module modular monolith with enforced boundaries.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              One deployable API, organised into 23 domain modules. A module can only be reached through its public entry
              point, and a build-time check fails the build if another module reaches inside it. Teams get the
              simplicity of one service without the tangle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {MODULES.map((m) => (
                <div key={m.module} className="glassmorphism-card rounded-xl p-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-electric-blue" />
                    <h3 className="text-sm font-bold font-mono text-text-title tracking-tight">{m.module}</h3>
                  </div>
                  <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{m.purpose}</p>
                </div>
              ))}
            </div>
            <div className="glassmorphism-card rounded-xl p-6 mt-6">
              <h3 className="text-base font-bold text-text-title flex items-center gap-2">
                <Cpu className="h-4 w-4 text-electric-blue" />
                Quality gate on every push
              </h3>
              <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">
                Formatting, linting, strict type-checking, the module-boundary check and the full unit-test suite must all
                pass before code can leave the developer&apos;s machine. Integration tests then run against a real
                PostgreSQL database over real HTTP.
              </p>
            </div>
          </section>

          {/* Database invariants */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Data integrity</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Rules the database refuses to let anyone break.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Application code can be bypassed by a bug or a late-night script. The rules that matter most are therefore
              written into PostgreSQL itself:
            </p>
            <div className="grid gap-4 mt-6">
              {INVARIANTS.map((inv) => (
                <div key={inv.title} className="glassmorphism-card rounded-xl p-6">
                  <div className="flex items-center gap-2 text-electric-blue font-mono text-sm font-bold">
                    <Database className="h-4 w-4" />
                    {inv.title}
                  </div>
                  <pre className="mt-3 p-3 rounded-lg bg-card-border/40 text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {inv.code}
                  </pre>
                  <p className="text-xs text-text-muted font-light mt-3 leading-relaxed">{inv.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — Accountability & privacy</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Everything important leaves a trail.
            </h2>
            <div className="grid gap-6 mt-6">
              <div className="glassmorphism-card rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-title">Audit trail and data-subject requests</h3>
                </div>
                <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">
                  Sign-ins, approvals, suspensions, zone moves, report decisions and even the Super Admin reading a private
                  chat are written to an append-only audit log. People can ask for their own data to be exported or deleted
                  from inside the app, supporting Nigerian and European data-protection duties.
                </p>
              </div>
              <div className="glassmorphism-card rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                    <HardHat className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-title">Safety first, in the workflow itself</h3>
                </div>
                <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">
                  A Marshal cannot clock in until the current Safety Protocol is confirmed and any required course is done.
                  The safety rule is a gate in the product, not a poster on a wall.
                </p>
              </div>
              <div className="glassmorphism-card rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-title">Delivered end to end, and handed over</h3>
                </div>
                <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">
                  WEBMUSE designed, built, deployed and handed over the whole system: the website, the Android app and the
                  API, plus role-by-role illustrated guides so each Marshal, Coordinator and Super Admin can learn it step
                  by step in plain language.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">08 — Technology stack</span>
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

          {/* Metrics */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">09 — Verified metrics</span>
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
              <Activity className="h-3.5 w-3.5" />
              <Server className="h-3.5 w-3.5" />
              Live in production on the web and as an Android app.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} WebMuse Limited. All rights reserved.
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
