# WEBMUSE AGENCY OPERATING SYSTEM (WM-OS)
## Master Architecture, Execution Roadmap & Quality Assurance Protocol

> **System Designation**: WebMuse Client Workflow & Agency Operating System (`WM-OS`)  
> **Environment**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion  
> **Security Baseline**: Cryptographic Magic Link Auth, AES-256-GCM Vault Encryption, Multi-Rail Webhook Verification  
> **Repository Root**: `c:\Users\Hp\Desktop\webMuse`  
> **Status**: IN PROGRESS — Phase Planning Established

---

## 1. Executive Vision & Core Paradigm

WebMuse OS is a bespoke, agency-governed operating system designed to elevate high-ticket client engagements from conception to deployment. 

Unlike conventional off-the-shelf project tools where clients sign up freely and create unguided clutter, **WM-OS enforces an elite, agency-controlled lifecycle**:

```
                                  WM-OS LIFECYCLE
                                  
   [WebMuse Admin]                 [Client]                   [Platform Engines]
          │                           │                                │
  Initiates Project ──────────────────┼───────────────────────────────►│ Create Project & Milestones
  Configures Milestones & Pricing     │                                │ Provisions Secure Vault
  Generates Magic Invite ────────────►│ Receives Branded Email         │
          │                           ▼                                │
          │                     Clicks Magic Link ────────────────────►│ Verifies Cryptographic Token
          │                           │                                │ Establishes Secure Session
          │                           ▼                                │
          │                     Enters Portal Workspace ──────────────►│ Displays Genesis PRD
          │                           │                                │
          │                     Signs Off Scope (v1.0) ───────────────►│ Locks Scope Creep Shield
          │                           │                                │
          │                           ▼                                │
          │                     Views Active Milestone ───────────────►│ Phase N+1 Strictly Locked
          │                           │                                │
          │                     Completes Milestone Payment ──────────►│ Multi-Rail: USDT / NGN
          │                           │                                │ Webhook Validates & Auto-Unlocks
          │                           ▼                                │
          │                     Reviews Staging via Review Deck ──────►│ Drops Pinpoint Annotations
          │                           │                                │
          │                     Final Phase Completed ────────────────►│ Opens Handoff Digital Safe
          │                           │                                │ Starts 30-Day SLA Clock
          ▼                           ▼                                ▼
```

### Core Architecture Pillars:
1. **Agency-Initiated Exclusivity**: Zero public registrations. The agency creates the project record, configures scope and milestone deliverables, and dispatches single-use, time-bound cryptographic magic links.
2. **Milestone Gatekeeper Engine**: Phase $N+1$ remains mathematically and visually locked until the corresponding milestone payment is settled through automated multi-rail payment APIs (Crypto USDT via NOWPayments / Naira via Paystack & Moniepoint).
3. **The Living "Genesis Canvas" (PRD)**: Interactive Product Requirement Document replacing clunky static PDFs. Features digital scope sign-off ("Approve Scope v1.0") to establish an immutable contract baseline and defend against scope creep.
4. **"Black Box" Project Vault**: Zero-knowledge, AES-256 encrypted credential repository storing database URLs, staging logins, API keys, repository links, and tech stack inventory for quick lookup during sprints and future maintenance.
5. **Staging Review Deck**: Responsive embedded iframe preview enabling clients to test desktop/mobile viewports and drop pinpoint visual annotations on UI elements.
6. **Handoff Digital Safe & Warranty Clock**: Automatic release of production repository transfers, `.env` exports, Loom walkthrough archives, and an active 30-day post-launch SLA warranty countdown.

---

## 2. Phase Execution & Quality Assurance Tracker

> **RULE**: A phase **CANNOT** be marked as `[x] COMPLETED` until all unit, integration, visual, and security tests defined in its testing protocol are executed and verified without regressions.

| Phase | Phase Name | Status | Verified By | Verification Date |
| :---: | :--- | :---: | :---: | :---: |
| **01** | [Core Foundation, Data Schema & Magic Link Auth](#phase-1-core-foundation-data-schema--magic-link-auth) | `[x] COMPLETED` | Antigravity Engine (8/8 Suite Pass) | 2026-10-01 |
| **02** | [Admin Command Center & Project Creation Wizard](#phase-2-admin-command-center--project-creation-wizard) | `[ ] PENDING` | — | — |
| **03** | [Client Workspace & Living "Genesis" PRD](#phase-3-client-workspace--living-genesis-prd) | `[ ] PENDING` | — | — |
| **04** | [Multi-Rail Payment Engine & Milestone Gatekeeper](#phase-4-multi-rail-payment-engine--milestone-gatekeeper) | `[ ] PENDING` | — | — |
| **05** | [Black Box Credential Vault & Live Staging Studio](#phase-5-black-box-credential-vault--live-staging-studio) | `[ ] PENDING` | — | — |
| **06** | [Handoff Digital Safe, Add-on Shop & Muse Pilot AI](#phase-6-handoff-digital-safe-add-on-shop--muse-pilot-ai) | `[ ] PENDING` | — | — |

---

## Phase 1: Core Foundation, Data Schema & Magic Link Auth

### 1.1 Objective
Establish the primary database schema, domain models, cryptographic token generation engine, and passwordless authentication pipeline. Protect the application with agency-governed access guardrails (no uninvited signups).

### 1.2 Detailed Scope & Deliverables
- [x] **Data Architecture & Store Engine**:
  - Implement structured models for `Client`, `Project`, `Milestone`, `Payment`, `VaultSecret`, `ReviewPin`, and `ActivityLog` in `src/lib/types/portal.ts`.
  - Design resilient storage abstraction with persistent JSON engine at `data/webmuse-db.json` and seed project `apex-protocol` in `src/lib/server/store.ts`.
- [x] **Access Guardrail & Anti-Self-Signup Rule**:
  - Implement whitelist verification in `/api/auth/magic-link`: Uninvited emails receive HTTP 403 `ACCESS_RESTRICTED`.
- [x] **Cryptographic Magic Link System**:
  - Secure token generator (`crypto.randomBytes(32)` with SHA-256 hashing) in `src/lib/server/crypto.ts`.
  - Configurable expiration (15 minutes).
  - Single-use invalidation upon verification.
  - Verification API handler at `/api/auth/verify`.
- [x] **Secure Session & Middleware**:
  - Encrypted, HTTP-only, secure cookies for client sessions (`wm_client_session`).
  - Session manager with HMAC-SHA256 tamper detection in `src/lib/server/session.ts`.
- [x] **Authentication User Interface**:
  - Cyberpunk-styled `/portal/login` page matching WebMuse visual identity with real-time error handling and demo 1-click test fill.
  - Animated cryptographic verification landing page at `/portal/verify`.
  - Authenticated project portal landing view at `/portal/[slug]`.

### 1.3 Mandatory Testing Protocol for Phase 1 — VERIFICATION REPORT (2026-10-01)
- **Unit Test Suite (`scripts/test-phase1.mjs`)**:
  - `[PASS]` Cryptographic Magic Token entropy & deterministic hashing.
  - `[PASS]` HMAC-SHA256 Session Signing & Anti-Tamper Verification.
  - `[PASS]` AES-256-GCM Zero-Knowledge Secret Vault Encryption / Decryption Round-Trip.
  - `[PASS]` Anti-Self-Signup Whitelist Guardrail Verification (HTTP 403 on uninvited emails).
  - `[PASS]` Magic Token Single-Use Invalidation & Expiration.
- **End-to-End Store & Cryptographic Test Suite (`scripts/test-phase1-full.ts`)**:
  - `[PASS]` 8/8 tests passed (Auto-seeding, Access guardrail, Milestone data structure, PRD structure, Token creation, Token consumption, Replay rejection, AES-256 vault decryption).
- **TypeScript & Build Verification**:
  - `[PASS]` `npx tsc --noEmit` exited with code 0 (zero type errors).
  - `[PASS]` Next.js 16 Production Build (`npm run build`) compiled successfully with all routes optimized.
  - `[PASS]` ESLint validation (`npx eslint`) passed with 0 errors and 0 warnings on all new portal modules.

---

## Phase 2: Admin Command Center & Project Creation Wizard

### 2.1 Objective
Build the master control deck for the WebMuse agency team to spin up new client engagements, configure milestone deliverables and multi-currency pricing, manage active projects, and oversee pipeline revenue.

### 2.2 Detailed Scope & Deliverables
- [ ] **Admin Authentication Portal (`/admin/login`)**:
  - Master passphrase / secret key protection with rate-limiting.
  - Cyberpunk dashboard aesthetic with terminal-inspired quick status widgets.
- [ ] **Agency Command Center Dashboard (`/admin`)**:
  - Metric cards: *Active Retainers*, *Active Sprints*, *Pending Approvals*, *Awaiting Payment*, *Total Pipeline ARR / MRR*.
  - Project Data Grid: Searchable and filterable list of all projects by stage (*Concept*, *Design*, *Engineering*, *Testing*, *Handoff*).
- [ ] **Project Genesis Creation Wizard (`/admin/projects/new`)**:
  - **Step 1: Client Identity**: Client Name, Primary Email, Organization/Company, Discord/Telegram Handle.
  - **Step 2: Project Scope & Specs**: Project Title, URL Slug, Summary, Target Delivery Date, Staging URL, GitHub Repo.
  - **Step 3: Tech Stack Matrix**: Interactive selector (Next.js, React, Tailwind, Supabase, Vercel, AWS, Stripe, etc.).
  - **Step 4: Milestone Configurator**:
    - Pre-populated standard agency phases (Phase 1: Discovery & PRD, Phase 2: Design & Prototyping, Phase 3: Core Engineering, Phase 4: Staging QA, Phase 5: Handoff & Launch).
    - Custom phase name and granular deliverables builder (e.g., "Figma High-Fidelity UI Screens", "Supabase Schema & Auth").
    - Currency and cost assigner: Dual USD ($) and NGN (₦) pricing per milestone.
  - **Step 5: Review & Launch**:
    - One-click "Launch Project & Dispatch Magic Link".
    - Immediate record creation in database and email invite dispatch.
- [ ] **Admin Project Detail View (`/admin/projects/[id]`)**:
  - Milestone control panel: Manually unlock/lock any phase.
  - Payment override trigger: Ability to mark a milestone as "Paid & Unlocked" if the client settles through offline bank wire.
  - "Client Impersonation Mode": One-click button to view the portal exactly as the client sees it.

### 2.3 Mandatory Testing Protocol for Phase 2
- **Creation Flow Test**: Create a full mock project through the wizard; verify all database records (client, project, milestones) are persisted accurately.
- **Invite Dispatch Test**: Verify that completing the wizard triggers the magic link invite with the correct project slug.
- **Manual Override Test**: Mark a locked milestone as manually paid; verify that the phase state immediately transitions to active and unlocks deliverables.
- **UI Integrity Test**: Verify responsive layout of tables, modal dialogs, and step forms.

---

## Phase 3: Client Workspace & Living "Genesis PRD"

### 3.1 Objective
Deliver the client-facing workspace featuring the signature WebMuse visual aesthetic, the interactive milestone progression pipeline, and the "Genesis Canvas" Living PRD with digital scope sign-off to eradicate scope creep.

### 3.2 Detailed Scope & Deliverables
- [ ] **Client Workspace Layout (`/portal/[project-slug]`)**:
  - Navigation header: Project title, client brand, live connection status, active phase badge, logout trigger.
  - Dynamic status banner: Real-time notification of current action required (e.g., *"Phase 2 in progress: Review UI mockups below"* or *"Action Required: Approve Phase 1 PRD"*).
- [ ] **Interactive Milestone Pipeline Stepper**:
  - Visual timeline displaying all 5 phases from Conception to Handoff.
  - State indicators for each node:
    - `COMPLETED`: Vibrant emerald accent with completion timestamp and invoice link.
    - `IN PROGRESS`: Electric blue pulsing glow with active sprint progress bar.
    - `LOCKED`: Dim obsidian with lock icon and payment unlock trigger.
- [ ] **The "Genesis Canvas" Living PRD**:
  - Dedicated interactive PRD viewer:
    - *Vision & Problem Statement*
    - *Target Audience & Personas*
    - *Core Feature Specification Matrix*
    - *Technical Architecture Diagram & Stack*
    - *Milestone Roadmap & Acceptance Criteria*
  - **Scope Creep Shield & Digital Sign-Off**:
    - Interactive "Approve Scope v1.0" button.
    - Captures client IP, timestamp, and digital signature acknowledgment.
    - Freezes the baseline scope; any feature added later is tagged as an *"Out-of-Scope Change Order"*.
- [ ] **Granular Deliverables Checklist**:
  - Interactive cards for each item in the active phase.
  - Status badges: `Backlog`, `In Development`, `Under Review`, `Approved`.
  - Deliverable link preview (Figma links, staging links, documentation).

### 3.3 Mandatory Testing Protocol for Phase 3
- **Sign-Off State Machine**: Verify that clicking "Approve Scope v1.0" permanently updates project status and records sign-off metadata.
- **Visual Gating Test**: Ensure locked milestones cannot have their internal sprint cards or sensitive deliverables accessed by unauthorized inspection.
- **Aesthetic Benchmark**: Ensure dark-mode contrast, font rendering (Outfit and JetBrains Mono), and Framer Motion micro-interactions comply with WebMuse high-end design standards.

---

## Phase 4: Multi-Rail Payment Engine & Milestone Gatekeeper

### 4.1 Objective
Integrate the multi-rail payment system (USDT Crypto via NOWPayments API + NGN Fiat via Paystack / Moniepoint) with cryptographic webhooks that automatically unlock the next phase upon settlement.

### 4.2 Detailed Scope & Deliverables
- [ ] **Milestone Gatekeeper Engine**:
  - Lock mechanism: When Phase $N$ completes, Phase $N+1$ transitions to `AWAITING_PAYMENT`.
  - Content for Phase $N+1$ remains locked behind the Gatekeeper modal until confirmed payment.
- [ ] **Multi-Rail Checkout Modal**:
  - Live currency switcher: USD ($), NGN (₦), and USDT (₮) with automated exchange rate conversion.
  - **Rail A: NOWPayments API (Crypto USDT / Multi-Chain)**:
    - Invoice creation endpoint `/api/payments/nowpayments/create`.
    - Support for USDT (TRC20, ERC20, Polygon, BSC), BTC, ETH, SOL.
    - Dynamic QR code generator, copyable deposit wallet address, and exact crypto amount.
    - Live transaction poller / status ticker: `Waiting for deposit...` → `Confirming on-chain (1/3)...` → `Confirmed!`.
  - **Rail B: Paystack & Moniepoint API (NGN Fiat)**:
    - Payment initiation endpoint `/api/payments/paystack/initialize`.
    - Instant card checkout popup or dynamic virtual bank transfer account generation.
    - Moniepoint bank transfer integration fallback.
- [ ] **Cryptographic Webhook Handlers**:
  - `/api/webhooks/nowpayments`: Validates `x-nowpayments-sig` HMAC-SHA512 signature against the secret key.
  - `/api/webhooks/paystack`: Validates `x-paystack-signature` HMAC-SHA512 signature.
- [ ] **Automated Unlock & Notification Dispatch**:
  - Upon verified webhook event:
    1. Mark milestone as `PAID` with transaction hash / reference.
    2. Unlock Phase $N+1$ automatically.
    3. Generate downloadable PDF receipt/invoice.
    4. Dispatch confirmation email to client and instant notification to WebMuse agency channels.

### 4.3 Mandatory Testing Protocol for Phase 4
- **Webhook Signature Security**: Transmit mock webhook payloads with invalid signatures; confirm immediate HTTP 401 rejection.
- **Idempotency Verification**: Send duplicate successful webhook payloads; ensure duplicate credits or duplicate phase unlocks are impossible.
- **End-to-End Unlock Flow**: Trigger successful payment simulation; verify that client dashboard transitions in real-time from `LOCKED` to `ACTIVE`.
- **Currency Conversion Precision**: Ensure USD to NGN and USDT price conversions round correctly without floating-point inaccuracies.

---

## Phase 5: "Black Box" Credential Vault & Live Staging Studio

### 5.1 Objective
Provide a military-grade encrypted storage vault for project secrets, tools, and staging credentials for easy retrieval by WebMuse engineers, plus an in-portal staging review studio with pinpoint visual feedback.

### 5.2 Detailed Scope & Deliverables
- [ ] **The "Black Box" Secret Vault**:
  - Server-side AES-256-GCM encryption/decryption utility using a dedicated `VAULT_MASTER_KEY`.
  - Data structure: Tool Name, Category (`Infrastructure`, `Database`, `APIs`, `Staging Auth`, `Domain/DNS`), Key Label, Encrypted Value, Client Visibility Flag.
  - Admin Vault Interface: Add, edit, remove, and categorize technical secrets.
  - Client-Safe Vault Interface: Clients only see keys marked as `is_client_visible = true`.
  - Security UX: Masked password fields (`••••••••••••`), show/hide toggle, one-click copy with toast confirmation, and visual audit log.
- [ ] **Staging Review Studio ("Review Deck")**:
  - Embedded staging iframe loaded safely with sandbox attributes.
  - Viewport mode switchers: Desktop (1440px), Tablet (768px), Mobile (375px).
  - **Pinpoint Visual Annotation Engine**:
    - Client can toggle "Feedback Mode" on the preview.
    - Clicking any element drops a numbered ping marker with $(x, y)$ coordinates.
    - Modal popup allows typing comments, tagging severity (`Bug`, `Design Tweak`, `Copy Update`), and saving.
    - Feedback pins synchronize into the active phase review board for WebMuse developers.

### 5.3 Mandatory Testing Protocol for Phase 5
- **Encryption Cryptanalysis Test**: Inspect the raw database records; verify zero plaintext exposure of secrets, passwords, or tokens.
- **Decryption & Copy Test**: Verify that authorized requests decrypt and display credentials seamlessly.
- **Role Isolation Test**: Confirm client sessions cannot view internal developer keys (e.g. database master passwords marked developer-only).
- **Iframe & Annotation Test**: Test viewport resizing and verify pinpoint markers save and render accurately at exact coordinates.

---

## Phase 6: Handoff "Digital Safe", Add-on Shop & Muse Pilot AI

### 6.1 Objective
Complete the project offboarding lifecycle with the automated Handoff Digital Safe, post-launch 30-day SLA warranty tracker, client change-order add-on shop, and conversational AI assistance.

### 6.2 Detailed Scope & Deliverables
- [ ] **The Handoff "Digital Safe"**:
  - Triggers automatically when all milestones reach `COMPLETED`.
  - Vault master release package:
    - GitHub repository transfer invitation link and instructions.
    - Production environment `.env` configuration file generator & download.
    - Brand assets & Figma exports archive.
    - Loom video walkthrough playlist embed.
- [ ] **30-Day Post-Launch SLA Warranty Clock**:
  - Real-time countdown timer: *"Active Warranty: 28 Days 14 Hours Remaining"*.
  - Priority bug-report ticket dispatcher during active warranty period.
  - Seamless upsell prompt for ongoing monthly maintenance retainers upon warranty expiry.
- [ ] **Change-Order & Add-on Marketplace**:
  - Self-service add-on catalog for clients:
    - *Additional Revision Sprint (+$350 / ₦500,000)*
    - *AI Assistant Integration Sprint (+$1,200 / ₦1,800,000)*
    - *Speed & Core Web Vitals Optimization (+$450 / ₦650,000)*
    - *SEO & Structured Data Package (+$600 / ₦900,000)*
  - One-click checkout creates a new micro-milestone in their pipeline.
- [ ] **"Muse Pilot" AI Concierge Integration**:
  - Connect with WebMuse’s existing `AiConcierge` component.
  - Project-aware knowledge base: Contextualizes answers based on the client’s current PRD, active sprint status, and documentation.

### 6.3 Mandatory Testing Protocol for Phase 6
- **Digital Safe Gating Test**: Verify that the safe is strictly inaccessible if any preceding milestone remains unpaid or unapproved.
- **Warranty Timer Test**: Test date calculation logic and expired warranty state transition.
- **Add-on Purchase Test**: Verify that purchasing an add-on successfully generates a micro-milestone and triggers payment modal.
- **Full System Integration Test**: Full end-to-end regression pass across all 6 phases.

---

## 3. Engineering Quality Guidelines & Next Steps

1. **Clean Code & Modern Architecture**: All code strictly typed in TypeScript, utilizing Next.js 16 conventions and server/client boundary separation.
2. **Visual Consistency**: Every interface must feel like an organic extension of WebMuse’s high-end, cyberpunk aesthetic.
3. **Phase Sign-Off Rule**: After completing each phase, update this document, execute the mandatory verification tests, record the date, and obtain confirmation before moving to the next phase.
