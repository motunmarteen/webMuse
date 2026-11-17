export interface CaseStudySummary {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  live: boolean;
}

export const CASE_STUDIES: CaseStudySummary[] = [
  {
    slug: "crown-wheels",
    title: "Crown Wheels",
    tagline:
      "Engineering a luxury private car hire and multi-tier vehicle sales platform for Nigeria — database-level double-booking exclusion, sub-150ms emergency SOS telemetry, transactional Paystack settlement, and lint-enforced domain boundaries.",
    category: "Luxury Mobility & Fleet Operations Platform",
    stack: ["Next.js 15", "PostgreSQL", "Prisma ORM", "PostGIS EXCLUDE", "Paystack", "Resend"],
    metrics: [
      { label: "Double-booking guard", value: "Postgres EXCLUDE" },
      { label: "SOS telemetry", value: "<150ms Next.js after()" },
      { label: "Architecture", value: "22 domains / 0 leaks" },
    ],
    live: true,
  },
  {
    slug: "drollers",
    title: "Drollers (Stayqs99)",
    tagline:
      "A disciplined staking platform that runs itself on a clock — verified slips built at fixed times, automatic entry at kick-off, results settled from real data, fees only on profit, and a public record of every pick.",
    category: "Automated Staking & Verification Platform",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL", "React / Vite PWA", "AWS"],
    metrics: [
      { label: "Live products", value: "6" },
      { label: "Pure engines", value: "6" },
      { label: "Automated tests", value: "1,000+" },
    ],
    live: true,
  },
  {
    slug: "freetles",
    title: "Freetles",
    tagline:
      "Architecting a zero-server-transit browser utility suite — Turborepo monorepo, intent-routed NLP second front door, WebAssembly client processing, and offline-capable PWA architecture.",
    category: "Client-Side Utility & AI Automation Platform",
    stack: ["Next.js 15", "Turborepo", "TypeScript", "WebAssembly", "IndexedDB"],
    metrics: [
      { label: "Catalog target", value: "350+ tools" },
      { label: "Server file transit", value: "0 bytes" },
      { label: "Routing modes", value: "Dual door" },
    ],
    live: true,
  },
  {
    slug: "pmos",
    title: "PMOS (PIP)",
    tagline:
      "Designing an autonomous, platform-native content engine — BullMQ job pipelines, Claude 3.5 Sonnet adaptation, human-in-the-loop review state machines, and anti-vanity opportunity tracking.",
    category: "Autonomous Content Engine & Media OS",
    stack: ["Node.js / Express", "TypeScript", "BullMQ / Redis", "Anthropic Claude", "OAuth2"],
    metrics: [
      { label: "Platforms", value: "LinkedIn / X / Threads" },
      { label: "North star", value: "Real opportunities" },
      { label: "Approval gates", value: "100% human" },
    ],
    live: true,
  },
  {
    slug: "buxedge",
    title: "BuxEdge",
    tagline:
      "Building a high-throughput event-market intelligence system — Polymarket and Kalshi dual-exchange connectors, fractional Kelly position sizing, signal confluence scoring, and zero-loss risk guards.",
    category: "Prediction Market Arbitrage & Intelligence",
    stack: ["Python 3.12", "FastAPI", "SQLAlchemy", "Polymarket Clob", "Kalshi API"],
    metrics: [
      { label: "Confluence stages", value: "3-tier" },
      { label: "Risk model", value: "Fractional Kelly" },
      { label: "Signal latency", value: "<250ms" },
    ],
    live: true,
  },
  {
    slug: "podly",
    title: "PODLY",
    tagline:
      "Engineering a high-trust milestone escrow engine for African peer-to-peer commerce — cryptographic character proofs, dual dispute mediation, multi-currency on-ramps, and tamper-proof trade escrows.",
    category: "Decentralized Escrow & Trust Platform",
    stack: ["Node.js / Express", "MongoDB", "Smart Contracts", "Paystack", "WebSockets"],
    metrics: [
      { label: "Dispute stages", value: "3-tier mediation" },
      { label: "Release gate", value: "Dual sign-off" },
      { label: "Fraud reduction", value: "98.4%" },
    ],
    live: true,
  },
  {
    slug: "neyborhuud",
    title: "NeyborHuud",
    tagline:
      "Engineering an AI-powered community operating system for the Nigerian neighborhood — safety, commerce, and trust as native primitives.",
    category: "Hyperlocal Safety & Commerce Platform",
    stack: ["Next.js", "MongoDB", "Redis / BullMQ", "Cognitive AI"],
    metrics: [
      { label: "Backend modules", value: "35" },
      { label: "Threat scale", value: "0–10" },
      { label: "SOS cadence", value: "0/30/60/90s" },
    ],
    live: true,
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel AI",
    tagline:
      "Designing a geospatial community intelligence engine — administrative-boundary matching, temporal clustering, and hybrid AI threat scoring, without a spatial database.",
    category: "Geospatial Threat Detection Engine",
    stack: ["Haversine matching", "MongoDB", "Cognitive AI", "Socket.IO"],
    metrics: [
      { label: "Threat scale", value: "0–10" },
      { label: "Cluster window", value: "30 min" },
      { label: "Cascade stages", value: "4" },
    ],
    live: true,
  },
  {
    slug: "novunt",
    title: "Novunt",
    tagline:
      "Building a secure fintech backend — atomic deposit claims, layered idempotency, an immutable double-entry ledger, and threshold-gated withdrawals.",
    category: "Custodial Staking & Settlement Platform",
    stack: ["Node.js / Express", "MongoDB", "NOWPayments", "Socket.IO", "node-cron"],
    metrics: [
      { label: "Idempotency layers", value: "3" },
      { label: "Concurrency layers", value: "4" },
      { label: "Ledger entries", value: "2-sided" },
    ],
    live: true,
  },
  {
    slug: "seth-hse",
    title: "SETH HSE",
    tagline:
      "Turning tower-site safety work into records you can prove — zone-based dispatch, live-camera and geofence clock-in, a report review workflow with a permanent edit history, built-in training, analytics and chat, on the web and an offline-first Android app.",
    category: "Tower-Site Safety Operations Platform",
    stack: ["Flutter", "Next.js", "Node.js / TypeScript", "PostgreSQL / PostGIS", "Redis"],
    metrics: [
      { label: "Surfaces", value: "Web + Android + API" },
      { label: "Bounded modules", value: "23" },
      { label: "Automated tests", value: "1,000+" },
    ],
    live: true,
  },
  {
    slug: "stacks-token-streaming",
    title: "Token Streaming Protocol",
    tagline:
      "Engineering a real-time continuous asset streaming protocol on Bitcoin L2 — Clarity 3 smart contracts, pause/resume state machines, and cryptographic ECDSA authorization.",
    category: "Decentralized Payroll & Asset Streaming",
    stack: ["Clarity 3", "Stacks Blockchain", "React", "TypeScript", "Clarinet"],
    metrics: [
      { label: "Decidable contracts", value: "Clarity 3" },
      { label: "Test coverage", value: "100%" },
      { label: "Balance calculation", value: "Real-time" },
    ],
    live: true,
  },
  {
    slug: "stacks-amm-dex",
    title: "AMM Decentralized Exchange",
    tagline:
      "Building a constant-product Automated Market Maker (x*y=k) on Bitcoin L2 — permissionless SIP-010 liquidity pools, dynamic swap routing, and LP token yield distribution.",
    category: "Automated Market Maker & DEX",
    stack: ["Clarity 3", "SIP-010", "Next.js 15", "Stacks Connect", "TypeScript"],
    metrics: [
      { label: "Invariant", value: "x · y = k" },
      { label: "Protocol LP fee", value: "0.3%" },
      { label: "Token standard", value: "SIP-010" },
    ],
    live: true,
  },
  {
    slug: "stacks-block-explorer",
    title: "Stacks Blockchain Explorer",
    tagline:
      "Designing a high-throughput Stacks network explorer — live transaction indexing, smart contract execution decoding, Leather/Xverse wallet integration, and Hiro API.",
    category: "Real-Time Blockchain Intelligence",
    stack: ["Next.js 16", "React 19", "TypeScript", "Hiro API", "@stacks/connect"],
    metrics: [
      { label: "Decoded tx types", value: "5" },
      { label: "Wallet support", value: "Multi" },
      { label: "App Router", value: "Next.js 16" },
    ],
    live: true,
  },
  {
    slug: "career-assessment",
    title: "WEBMUSE Career Assessment",
    tagline:
      "Building a decision engine for technology career guidance — recovered from a real GitHub source, expanded into a two-axis scoring model across 26 tech roles.",
    category: "Career Decision Engine",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Weighted scoring engine"],
    metrics: [
      { label: "Tech paths", value: "26" },
      { label: "Scoring axes", value: "4" },
      { label: "Sign-ups required", value: "0" },
    ],
    live: true,
  },
];
