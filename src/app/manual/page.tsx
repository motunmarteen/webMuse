'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Printer,
  Shield,
  Key,
  Database,
  Globe,
  Terminal,
  Server,
  FolderGit2,
  Lock,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
  FileText,
  Mail,
  Smartphone,
  Eye,
  CreditCard,
  Zap,
} from 'lucide-react';

const SECTIONS = [
  { id: 'sec-overview', label: '1. Architecture & Philosophy' },
  { id: 'sec-admin', label: '2. Agency Admin: Genesis Setup' },
  { id: 'sec-onboarding', label: '3. Product Owner Onboarding' },
  { id: 'sec-prd', label: '4. Genesis PRD & Scope Shield' },
  { id: 'sec-milestones', label: '5. Sprints & Escrow Gates' },
  { id: 'sec-staging', label: '6. Live Staging Studio & Pins' },
  { id: 'sec-vault', label: '7. Organization Password Vault' },
  { id: 'sec-safe', label: '8. Digital Safe & .env Handoff' },
  { id: 'sec-postlaunch', label: '9. 30-Day SLA & Add-on Sprints' },
  { id: 'sec-ai-comms', label: '10. Muse Pilot AI & Team Comms' },
  { id: 'sec-security', label: '11. Cryptography & Security FAQ' },
];

export default function OperationalManualPage() {
  const [activeSection, setActiveSection] = useState('sec-overview');

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-electric-blue/30 selection:text-white">
      {/* ---------------------------------------------------- */}
      {/* PRINT CSS: Clean A4 formatting for PDF export */}
      {/* ---------------------------------------------------- */}
      <style jsx global>{`
        @media print {
          /* Hide non-printable navigation, buttons, and backgrounds */
          nav,
          header,
          .no-print {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            color: #0f172a !important;
            font-size: 11pt !important;
            line-height: 1.5 !important;
          }
          .print-container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            background: #f8fafc !important;
            color: #0f172a !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
          }
          .print-page-break {
            break-before: page !important;
            page-break-before: always !important;
          }
          a {
            color: #0284c7 !important;
            text-decoration: underline !important;
          }
          table {
            border-collapse: collapse !important;
            width: 100% !important;
          }
          th,
          td {
            border: 1px solid #cbd5e1 !important;
            padding: 8px !important;
            color: #0f172a !important;
          }
          th {
            background: #e2e8f0 !important;
          }
        }
      `}</style>

      {/* Top Banner (No Print) */}
      <header className="no-print sticky top-0 z-40 border-b border-card-border bg-background/90 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/portal" className="flex items-center gap-2 group">
              <span className="font-display font-black text-xl tracking-wider text-foreground">
                WEBMUSE<span className="text-electric-blue">.TECH</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono px-2.5 py-0.5 rounded-full border border-card-border bg-card-bg text-text-muted">
              Operational Manual v2.4.0
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="text-xs font-mono text-text-muted hover:text-foreground px-3 py-1.5 rounded-lg border border-card-border bg-card-bg transition-colors"
            >
              Client Cockpit
            </Link>
            <Link
              href="/admin"
              className="text-xs font-mono text-text-muted hover:text-foreground px-3 py-1.5 rounded-lg border border-card-border bg-card-bg transition-colors"
            >
              Admin Console
            </Link>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-blue hover:bg-electric-blue/90 text-white font-medium text-xs shadow-lg shadow-electric-blue/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="border-b border-card-border bg-card-bg/30 py-10 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-medium mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Official Platform Operational Manual • End-to-End Walkthrough</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-3">
            WebMuse OS Platform Manual
          </h1>
          <p className="text-text-muted text-sm sm:text-base max-w-3xl leading-relaxed">
            A comprehensive, step-by-step master reference for Product Owners and Agency Administrators.
            Covers initial onboarding, PRD signature, dual-currency escrow releases, live device staging,
            organization tool password vaulting, production safe handoff, and 30-day warranty operations.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-electric-blue" />
              <span>Security: AES-256-GCM Hardware-Grade</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>Domain: @webmuse.tech</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Product Owner Password Vault Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 print-container">
        {/* Sticky Table of Contents (No Print) */}
        <aside className="no-print lg:col-span-4 hidden lg:block">
          <div className="sticky top-20 rounded-2xl border border-card-border bg-card-bg/60 p-5 backdrop-blur-md">
            <div className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-electric-blue" />
              <span>Contents Navigation</span>
            </div>
            <nav className="space-y-1 text-xs">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={`block px-3 py-2 rounded-lg font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-electric-blue/15 text-electric-blue border border-electric-blue/30 font-semibold'
                      : 'text-text-muted hover:text-foreground hover:bg-card-bg'
                  }`}
                >
                  {sec.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-card-border">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-card-bg border border-card-border hover:border-electric-blue text-xs font-medium text-foreground transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-electric-blue" />
                <span>Save as PDF (Ctrl + P)</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Manual Body */}
        <main className="lg:col-span-8 space-y-12">
          {/* Section 1 */}
          <section id="sec-overview" className="scroll-mt-24 space-y-4">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-electric-blue font-semibold uppercase tracking-widest">
                Section 1
              </span>
              <h2 className="text-2xl font-display font-bold">1. Architecture & Platform Philosophy</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              WebMuse OS replaces unstructured agency email chains, lost credentials, and ambiguous deliverable
              expectations with an immutable, dual-sided executive command center.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="flex items-center gap-2 text-electric-blue font-semibold text-xs mb-1.5">
                  <Shield className="w-4 h-4" />
                  <span>Scope Baseline Shield</span>
                </div>
                <p className="text-xs text-text-muted">
                  Cryptographically locks the Genesis PRD via HMAC-SHA256 signature, eliminating mid-project scope creep.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1.5">
                  <Key className="w-4 h-4" />
                  <span>Organization Password Vault</span>
                </div>
                <p className="text-xs text-text-muted">
                  Product owners have direct, permanent access to check passwords and credentials for every tool used.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>Dual-Currency Escrow</span>
                </div>
                <p className="text-xs text-text-muted">
                  Protects both parties by staging funds per milestone in USD, NGN, or non-custodial crypto before release.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>Interactive Staging Studio</span>
                </div>
                <p className="text-xs text-text-muted">
                  Pinpoint visual annotations across authentic Desktop, Tablet, and Mobile device frames.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="sec-admin" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-widest">
                Section 2
              </span>
              <h2 className="text-2xl font-display font-bold">2. Agency Admin: Genesis Setup & Provisioning</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Agency Administrators manage project lifecycles from the master <strong>Executive Command Deck</strong>.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px]">
                    1
                  </span>
                  <span>Access Command Deck</span>
                </div>
                <p className="text-text-muted">
                  Log in at <code className="text-electric-blue">/admin/login</code> using authorized credentials (e.g., <code className="text-text-muted">ops@webmuse.tech</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px]">
                    2
                  </span>
                  <span>Launch Genesis Wizard</span>
                </div>
                <p className="text-text-muted">
                  Click <strong>"New Genesis Project"</strong> to define Client Details, Project Name, Slug, Tech Stack, PRD Blueprint, and Sequential Milestone Budgets.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-[10px]">
                    3
                  </span>
                  <span>Automated Enclave & Tool Vault Hydration</span>
                </div>
                <p className="text-text-muted">
                  Upon deployment, the system registers the client, generates a single-use 7-day magic token, initializes the 12-document contract vault, and seeds full tool credentials into the Product Password Vault.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="sec-onboarding" className="scroll-mt-24 space-y-4">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-widest">
                Section 3
              </span>
              <h2 className="text-2xl font-display font-bold">3. Product Owner Onboarding</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Product Owners experience frictionless, zero-password onboarding through cryptographic magic links.
            </p>

            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 print-card text-xs space-y-2">
              <div className="font-semibold text-purple-300">How the Product Owner Logs In:</div>
              <ul className="list-disc pl-5 space-y-1.5 text-text-muted">
                <li>Check your inbox for an invitation from <code className="text-purple-300">notifications@webmuse.tech</code>.</li>
                <li>Click the single-use verification link containing your private cryptographic hash.</li>
                <li>The verification service (<code className="text-purple-300">/portal/verify</code>) authenticates the token, burns it to prevent replay attacks, and issues an authenticated session.</li>
                <li>You land directly into your personal <strong>Project Cockpit</strong>.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="sec-prd" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
                Section 4
              </span>
              <h2 className="text-2xl font-display font-bold">4. Genesis PRD & Scope Creep Shield</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Phase 1 begins with reviewing and signing the Genesis Product Requirements Document (PRD).
            </p>

            <div className="border border-card-border rounded-xl p-5 bg-card-bg space-y-3 print-card text-xs">
              <div className="font-semibold text-foreground">Digital Signature Workflow:</div>
              <ol className="list-decimal pl-5 space-y-1.5 text-text-muted">
                <li>Navigate to the <strong>"Genesis PRD"</strong> tab in the Cockpit.</li>
                <li>Review the architectural summary, target audience, feature matrix, and KPIs.</li>
                <li>Click <strong>"Sign & Lock Scope Baseline"</strong>.</li>
                <li>Enter your legal name and role (e.g., <em>Alex Vance, Chief Executive Officer</em>).</li>
                <li>
                  The system generates an immutable <strong>HMAC-SHA256 signature hash</strong>.
                  Future changes outside this signed scope are automatically categorized as Add-on micro-sprints.
                </li>
              </ol>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sec-milestones" className="scroll-mt-24 space-y-4">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-electric-blue font-semibold uppercase tracking-widest">
                Section 5
              </span>
              <h2 className="text-2xl font-display font-bold">5. Sprints & Escrow Gatekeeper</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Work proceeds in transparent milestones. Funds are escrowed before a sprint commences and disbursed upon deliverable review.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-card-border rounded-xl">
                <thead className="bg-card-bg/80 text-text-muted uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Gateway</th>
                    <th className="p-3">Currencies</th>
                    <th className="p-3">Settlement Speed</th>
                    <th className="p-3">Supported Methods</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border text-foreground">
                  <tr>
                    <td className="p-3 font-semibold">Stripe Global</td>
                    <td className="p-3">USD, EUR, GBP</td>
                    <td className="p-3">Instant Confirmation</td>
                    <td className="p-3 text-text-muted">Credit Cards, Apple Pay, Google Pay</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">NOWPayments Web3</td>
                    <td className="p-3">USDT, BTC, ETH, SOL</td>
                    <td className="p-3">Blockchain IPN Webhook</td>
                    <td className="p-3 text-text-muted">Non-custodial multi-chain crypto wallet</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Paystack / Moniepoint</td>
                    <td className="p-3">NGN</td>
                    <td className="p-3">Instant Virtual Account</td>
                    <td className="p-3 text-text-muted">Direct Bank Transfer, USSD, Verve/Mastercard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section id="sec-staging" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-pink-400 font-semibold uppercase tracking-widest">
                Section 6
              </span>
              <h2 className="text-2xl font-display font-bold">6. Live Staging Studio & Visual Feedback Pins</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Product Owners test the real application in authentic chassis views without opening multiple browser windows.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="font-semibold text-foreground mb-1">Three Authentic Viewports:</div>
                <p className="text-text-muted">
                  Toggle between <strong>Desktop (1440px)</strong>, <strong>Tablet (768px)</strong>, and <strong>Mobile (375px)</strong>.
                  All three views constrain cleanly to their realistic device dimensions without horizontal scrolling.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="font-semibold text-foreground mb-1">Interactive Feedback Pins:</div>
                <p className="text-text-muted">
                  Click anywhere on the preview frame to drop a revision marker. Type your comment and save.
                  The platform records the exact relative coordinates, dispatches an alert to the engineering team comms feed,
                  and tracks the pin until marked <strong>RESOLVED</strong> by the lead engineer.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section id="sec-vault" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-widest">
                Section 7
              </span>
              <h2 className="text-2xl font-display font-bold">
                7. Organization & Product Password Vault
              </h2>
            </div>
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs">
              <strong>Crucial Transparency Feature:</strong> Product Owners have full ownership and access to check the passwords and usernames for every tool, database, API, and cloud service used in their products.
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              All credentials are stored with hardware-grade <strong>AES-256-GCM encryption</strong>. Product Owners can search by tool, view login IDs, decrypt passwords on demand, and jump directly to vendor login portals.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-card-border rounded-xl">
                <thead className="bg-card-bg/80 text-text-muted uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Tool / Service</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Account / Username</th>
                    <th className="p-3">Login URL</th>
                    <th className="p-3">Access Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border text-foreground">
                  <tr>
                    <td className="p-3 font-semibold">Vercel Enterprise Edge</td>
                    <td className="p-3">Cloud Hosting</td>
                    <td className="p-3 font-mono text-electric-blue">client@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">vercel.com/login</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Supabase PostgreSQL</td>
                    <td className="p-3">Database</td>
                    <td className="p-3 font-mono text-electric-blue">postgres.apex</td>
                    <td className="p-3 font-mono text-text-muted">supabase.com/dashboard</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Stripe Global Merchant</td>
                    <td className="p-3">Billing & Payments</td>
                    <td className="p-3 font-mono text-electric-blue">finance@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">dashboard.stripe.com</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">NOWPayments Gateway</td>
                    <td className="p-3">Crypto Custody</td>
                    <td className="p-3 font-mono text-electric-blue">crypto@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">account.nowpayments.io</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Cloudflare Zero Trust</td>
                    <td className="p-3">DNS & WAF</td>
                    <td className="p-3 font-mono text-electric-blue">dns-admin@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">dash.cloudflare.com</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">GitHub Enterprise</td>
                    <td className="p-3">Code & CI/CD</td>
                    <td className="p-3 font-mono text-electric-blue">apex-robot-deployer</td>
                    <td className="p-3 font-mono text-text-muted">github.com/login</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Resend SMTP</td>
                    <td className="p-3">Transactional Mailer</td>
                    <td className="p-3 font-mono text-electric-blue">notifications@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">resend.com/login</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Staging Sandbox Gate</td>
                    <td className="p-3">QA Preview Auth</td>
                    <td className="p-3 font-mono text-electric-blue">partner-qa</td>
                    <td className="p-3 font-mono text-text-muted">staging.apex-protocol.webmuse.tech</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Sentry Telemetry</td>
                    <td className="p-3">Error APM</td>
                    <td className="p-3 font-mono text-electric-blue">devops@apexlabs.io</td>
                    <td className="p-3 font-mono text-text-muted">sentry.io/auth/login</td>
                    <td className="p-3 text-emerald-400">Client Visible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card text-xs space-y-1.5">
              <div className="font-semibold text-foreground">45-Second Auto-Zeroization Security:</div>
              <p className="text-text-muted">
                When a Product Owner reveals a password, the plaintext is temporarily stored in client memory.
                After 45 seconds, the value is securely zeroized from the browser state and returned to masked ciphertext
                to protect against shoulder-surfing and unauthorized access on shared devices.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="sec-safe" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-widest">
                Section 8
              </span>
              <h2 className="text-2xl font-display font-bold">8. Digital Safe & .env Handoff</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Upon final milestone completion, the platform generates the <strong>Master Handoff Digital Safe</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Interactive .env Generator</span>
                </div>
                <p className="text-text-muted">
                  Generates ready-to-run <code className="text-electric-blue">.env.production</code> files populated with all production database strings, API secrets, and webhook tokens with 1-click clipboard copy.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-1.5">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-pink-400" />
                  <span>GitHub Repositories & Looms</span>
                </div>
                <p className="text-text-muted">
                  Includes full Git repository transfers, Figma master files, and architectural Loom video walkthroughs recorded by lead engineers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section id="sec-postlaunch" className="scroll-mt-24 space-y-4">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-widest">
                Section 9
              </span>
              <h2 className="text-2xl font-display font-bold">9. Post-Launch 30-Day SLA & Add-on Sprints</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              WebMuse OS guarantees peace of mind post-delivery through automated warranty tracking and instant add-ons.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="font-semibold text-foreground mb-1">30-Day Zero-Cost Warranty Tickets:</div>
                <p className="text-text-muted">
                  If any unexpected edge cases arise within 30 days of release, submit a ticket in the Cockpit.
                  Our senior engineering team guarantees response within 4 hours and rapid resolution at zero additional cost.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card">
                <div className="font-semibold text-foreground mb-1">1-Click Micro-Sprint Add-ons:</div>
                <p className="text-text-muted">
                  Need an Algorithmic SEO package, OWASP security penetration test, or mobile PWA shell?
                  Select the sprint from the Add-on catalog and fund it directly without contract negotiations.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section id="sec-ai-comms" className="scroll-mt-24 space-y-4 print-page-break">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest">
                Section 10
              </span>
              <h2 className="text-2xl font-display font-bold">10. Muse Pilot AI & Team Comms</h2>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Direct access to both human engineers and 24/7 AI technical guidance.
            </p>

            <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Muse Pilot Contextual Intelligence</span>
              </div>
              <p className="text-text-muted leading-relaxed">
                Integrated into the Cockpit, Muse Pilot answers questions regarding deliverable status, tech stack rationale,
                deployment schedules, and PRD specifications in seconds, backed by exact project citations.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="sec-security" className="scroll-mt-24 space-y-4">
            <div className="border-b border-card-border pb-3">
              <span className="text-xs font-mono text-electric-blue font-semibold uppercase tracking-widest">
                Section 11
              </span>
              <h2 className="text-2xl font-display font-bold">11. Cryptography & Security FAQ</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-1">
                <div className="font-semibold text-foreground">Q: What is the official platform domain and email extension?</div>
                <p className="text-text-muted">
                  All official platform emails end strictly in <code className="text-electric-blue font-bold">@webmuse.tech</code>. Official staging subdomains run on <code className="text-electric-blue font-bold">*.webmuse.tech</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-1">
                <div className="font-semibold text-foreground">Q: How are credentials in the Password Vault encrypted?</div>
                <p className="text-text-muted">
                  Credentials are encrypted using AES-256-GCM. Each secret is encrypted with a distinct 12-byte initialization vector (IV) and a 16-byte authentication tag to guarantee confidentiality and tamper resistance. Plaintext values are never stored at rest.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-card-border bg-card-bg print-card space-y-1">
                <div className="font-semibold text-foreground">Q: Who can see the passwords?</div>
                <p className="text-text-muted">
                  Both Agency Administrators and the authenticated Product Owner for that specific project have access. Every decryption event is logged in the project activity audit trail with timestamp and requester identity.
                </p>
              </div>
            </div>
          </section>

          {/* Manual Footer */}
          <div className="border-t border-card-border pt-8 text-center text-xs text-text-muted space-y-2">
            <p className="font-mono">
              WebMuse OS • Enterprise Digital Command Architecture • All Rights Reserved
            </p>
            <p>
              Official Contact & Inquiries:{' '}
              <a href="mailto:ops@webmuse.tech" className="text-electric-blue underline">
                ops@webmuse.tech
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
