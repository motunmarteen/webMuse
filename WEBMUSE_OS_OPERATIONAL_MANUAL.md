# WEBMUSE OS // COMPLETE END-TO-END OPERATIONAL MANUAL
**Official Platform Guide for Agency Administrators & Product Owners**
*Document Version: 2.4.0 • Domain: webmuse.tech • Security Tier: Hardware-Grade AES-256-GCM*

---

## EXECUTIVE TABLE OF CONTENTS
1. [Platform Architecture & Philosophy](#1-platform-architecture--philosophy)
2. [Agency Admin Workflow: Project Genesis & Client Onboarding](#2-agency-admin-workflow-project-genesis--client-onboarding)
3. [Product Owner Experience: Passwordless Magic Onboarding](#3-product-owner-experience-passwordless-magic-onboarding)
4. [Phase 1: Genesis PRD Review & Scope Creep Shield](#4-phase-1-genesis-prd-review--scope-creep-shield)
5. [Phase 2: Milestone Execution & Escrow Gatekeeper](#5-phase-2-milestone-execution--escrow-gatekeeper)
6. [Phase 3: Live Staging Studio & Visual Annotation Pins](#6-phase-3-live-staging-studio--visual-annotation-pins)
7. [Phase 4: Organization & Product Password Vault](#7-phase-4-organization--product-password-vault)
8. [Phase 5: Digital Safe Handoff, .env Generator & Looms](#8-phase-5-digital-safe-handoff-env-generator--looms)
9. [Phase 6: Post-Launch 30-Day SLA & Add-on Micro-Sprints](#9-phase-6-post-launch-30-day-sla--add-on-micro-sprints)
10. [Muse Pilot AI & Team Collaboration Feed](#10-muse-pilot-ai--team-collaboration-feed)
11. [Troubleshooting, Security & Cryptographic FAQ](#11-troubleshooting-security--cryptographic-faq)

---

## 1. Platform Architecture & Philosophy

WebMuse OS is an enterprise-grade digital development command center engineered to eliminate communication friction, prevent scope creep, provide complete credential transparency, and automate milestone settlements between digital engineering teams and product owners.

### Key Pillars
- **Zero Ambiguity**: Scope is frozen via cryptographic HMAC-SHA256 signatures before engineering commences.
- **Complete Credential Transparency**: Product owners maintain full ownership and instant visibility of all passwords, API keys, database credentials, and service accounts through the **Organization & Product Password Vault**.
- **Financial Security**: Work is released incrementally via dual-currency escrow gates (USD / NGN), supporting Stripe, Paystack, Moniepoint, and NOWPayments non-custodial crypto.
- **Hardware-Grade Security**: All sensitive values are encrypted at rest using AES-256-GCM with unique initialization vectors and authentication tags.

---

## 2. Agency Admin Workflow: Project Genesis & Client Onboarding

### Step 2.1: Accessing the Admin Command Deck
1. Navigate to `https://webmuse.tech/admin` (or `http://localhost:3000/admin` in local preview).
2. Enter your authorized operations email: `ops@webmuse.tech` or `admin@webmuse.tech`.
3. Provide the master access passkey to enter the **Executive Command Deck**.

### Step 2.2: Launching a New Genesis Project
1. In the top navigation bar, click **"New Genesis Project"** (`/admin/projects/new`).
2. Fill out the 4-step Genesis Wizard:
   - **Client Identity**: Full Name, Official Email (`client@domain.com`), Company Name, and Telegram/Discord handle.
   - **Project Specification**: Title, Slug, Tagline, Comprehensive Description, and Tech Stack tags.
   - **PRD Foundations**: Problem statement, target audience, and core architecture.
   - **Milestone Sprints**: Define sequential deliverables, milestone titles, cost in USD/NGN, and estimated days.
3. Click **"Deploy Genesis Workspace"**.
4. The system automatically:
   - Registers the client and provisions an isolated project workspace.
   - Initializes the 12-document agency contract enclave.
   - Automatically seeds the **Organization & Product Password Vault** with credentials for all primary tools (Vercel, Supabase, Stripe, NOWPayments, Cloudflare, GitHub, Resend, Sentry, and Staging Gate).
   - Generates an encrypted, single-use **Magic Login Link** valid for 7 days.

---

## 3. Product Owner Experience: Passwordless Magic Onboarding

Product owners never need to manage clunky agency passwords to access their project cockpit.

### Step 3.1: Receiving and Opening the Invite
1. The product owner receives an encrypted invitation email from `notifications@webmuse.tech` containing their secure link:
   `https://webmuse.tech/portal/verify?token=<CRYPTOGRAPHIC_TOKEN>`
2. Clicking this link verifies the single-use token against its SHA-256 hash.
3. An authenticated, scoped JWT session is established with `role: "client"`.
4. The product owner is redirected to `/portal`, opening their personalized **Project Cockpit**.

---

## 4. Phase 1: Genesis PRD Review & Scope Creep Shield

The Genesis PRD (Product Requirements Document) establishes the single source of truth for the entire engagement.

### Step 4.1: Reviewing Architectural Specifications
- Product owners navigate to the **"Genesis PRD"** tab in their Cockpit.
- They inspect:
  - Executive Architecture Summary
  - Problem Statement & Target Audience
  - Feature Matrix (categorized by technical modules)
  - Core Technology Stack
  - KPIs & Quality Guarantees

### Step 4.2: Digital Signature & Scope Baseline Lock
1. Product owners click **"Sign & Lock Scope Baseline"**.
2. They input their full legal name and organizational role.
3. Upon submission:
   - The platform calculates an immutable HMAC-SHA256 signature hash containing the document version, client name, timestamp, and client IP.
   - Scope is permanently baseline-locked. Any future scope additions are automatically routed to the Change-Order / Add-on Sprint engine.

---

## 5. Phase 2: Milestone Execution & Escrow Gatekeeper

Work is divided into clear sprint milestones with transparent deliverables and escrow safeguards.

### Step 5.1: Milestone Progression
Each milestone has defined deliverables:
- **Genesis Discovery & PRD Sign-Off**
- **Cyberpunk UI Tokens & Interactive Prototype**
- **Core Engine & Supabase RLS Integration**
- **Production Staging & Hardening**
- **Master Handoff & Production Launch**

### Step 5.2: Unlocking Work via Escrow Payment
1. When a milestone requires funding, click **"Unlock Next Milestone"**.
2. The **Escrow Gatekeeper Modal** opens:
   - **USD / International Cards**: Instant Stripe Checkout.
   - **Crypto / Web3**: NOWPayments non-custodial crypto checkout (BTC, ETH, USDT, SOL).
   - **Local Currency (NGN)**: Paystack or Moniepoint instant virtual transfer.
3. Upon confirmation, the milestone automatically transitions to `in_progress`, unlocking the engineering sprint.

---

## 6. Phase 3: Live Staging Studio & Visual Annotation Pins

Product owners can review their live build inside authentic device frames without leaving the dashboard.

### Step 6.1: Using the Staging Review Studio
1. Select the **"Staging Review"** tab in the Cockpit.
2. Choose your viewport mode:
   - **Desktop**: 1440px high-resolution canvas.
   - **Tablet**: 768px portrait chassis.
   - **Mobile**: 375px handheld chassis.

### Step 6.2: Dropping Visual Feedback Pins
1. Click **"Drop Feedback Pin"** (or click anywhere on the staging frame).
2. Enter your feedback note (e.g., *"Adjust hero CTA button contrast"*).
3. The platform captures the exact `(x, y)` coordinate percentages relative to the selected viewport.
4. An automated notification is broadcast directly to the team comms feed.
5. The engineering team inspects the pin, applies the fix, and marks the marker **RESOLVED**.

---

## 7. Phase 4: Organization & Product Password Vault

The **Organization & Product Password Vault** ensures complete transparency: product owners always have full visibility and access to check passwords and credentials for every tool configured for their product.

### Step 7.1: Accessing the Password Vault
1. Click the **"Password Vault"** tab in the Project Cockpit.
2. The platform displays all tool accounts configured for the organization.

### Step 7.2: Tools Covered in the Vault
| Category | Tool / Service | Key Label | Login URL | Default Username / Email |
| :--- | :--- | :--- | :--- | :--- |
| **Hosting** | Vercel Enterprise Edge | Production Deployment & Cloud Console | `https://vercel.com/login` | `client@company.com` |
| **Database** | Supabase PostgreSQL | PostgreSQL Database Master Password | `https://supabase.com/dashboard` | `postgres.[slug]` |
| **Payments** | Stripe Merchant Gateway | Stripe Merchant Dashboard | `https://dashboard.stripe.com/login` | `client@company.com` |
| **Crypto** | NOWPayments Gateway | Crypto Custody & IPN Engine | `https://account.nowpayments.io/login` | `client@company.com` |
| **DNS & WAF** | Cloudflare Zero Trust | DNS Console & WAF Firewall | `https://dash.cloudflare.com/login` | `client@company.com` |
| **Code** | GitHub Enterprise | Source Code & CI/CD Pipeline Token | `https://github.com/login` | `[slug]-robot-deployer` |
| **SMTP** | Resend Transactional Mailer | Email Dispatch API & SMTP Relay | `https://resend.com/login` | `notifications@[slug].com` |
| **Staging** | Staging Sandbox Gate | QA Staging Environment Access | `https://staging.[slug].webmuse.tech` | `partner-qa` |
| **Telemetry**| Sentry Error APM | Application Performance Monitoring | `https://sentry.io/auth/login` | `devops@[slug].com` |

### Step 7.3: Revealing Passwords & Auto-Zeroization
1. To inspect a password, click the **Eye icon ("Reveal Secret")** next to any credential.
2. The client makes a secure call to `/api/portal/vault`, which:
   - Validates that the client owns the project.
   - Logs an immutable security audit event into the activity ledger.
   - Decrypts the secret in memory via AES-256-GCM.
3. The password appears in high-visibility monospace text alongside a **1-click Copy** button.
4. **45-Second Auto-Zeroization**: For security against shoulder-surfing and memory snooping, the credential automatically clears itself from memory and re-masks after 45 seconds.
5. Click **"Launch Login Portal"** to jump directly to the tool's login page with your credentials ready.

---

## 8. Phase 5: Digital Safe Handoff, .env Generator & Looms

Upon final milestone completion, the platform packages the product assets into the **Master Handoff Digital Safe**.

### Step 8.1: Features in the Digital Safe
- **Production Code Repositories**: Direct GitHub enterprise repository access.
- **Interactive .env Generator**: Generates formatted, production-ready `.env.production` files containing all live database connection strings, API tokens, and webhook secrets.
- **Architectural Loom Video Guides**: Step-by-step video tours recorded by lead engineers covering codebase structure, database migrations, and edge deployments.
- **Figma Design Assets**: Full design tokens, SVG icon suites, and vector brand kits.

---

## 9. Phase 6: Post-Launch 30-Day SLA & Add-on Micro-Sprints

### Step 9.1: 30-Day Warranty Protection
- Every project includes an automatic **30-Day Warranty Window** starting at final delivery.
- Product owners can open **Warranty Tickets** for zero-cost bug fixes with a guaranteed response time under 4 hours.

### Step 9.2: Micro-Sprint Add-on Catalog
Need new features after launch? Product owners don't need a lengthy contract renegotiation.
- Browse the **Add-on Services** catalog (e.g., *Algorithmic SEO Package*, *OWASP Security Audit*, *Mobile PWA Shell*).
- Select the sprint, review turnaround days (3–5 days), and check out with 1 click.

---

## 10. Muse Pilot AI & Team Collaboration Feed

- **Realtime Chat Feed**: Direct, persistent encrypted communication between product owners and the WebMuse engineering team.
- **Muse Pilot AI**: Integrated 24/7 AI technical assistant with instant answers regarding project milestones, tech stack choices, deliverable statuses, and architecture specs.

---

## 11. Troubleshooting, Security & Cryptographic FAQ

### Q: What domain should all project communications use?
All official platform notifications and operational emails use `@webmuse.tech`.

### Q: Can product owners add their own credentials to the Password Vault?
Agency Admins can provision new credentials directly via the **"Add Credential"** modal in the vault. Once marked `isClientVisible: true`, product owners immediately see and can check the passwords.

### Q: How is my financial data protected?
No credit cards or crypto private keys are ever stored on WebMuse servers. All transactions are handled by PCI-DSS Level 1 payment processors (Stripe, Paystack) or non-custodial smart contracts (NOWPayments).

---
*WebMuse OS • Engineered for Digital Excellence • Support: ops@webmuse.tech*
