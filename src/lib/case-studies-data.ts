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
    slug: "stayqs99",
    title: "Stayqs99",
    tagline:
      "Engineering a multi-sport quantitative selection, staking-cycle, and verification platform — calibrated probability qualifiers, Masaniello compounding sessions, provenance-tagged fact ledgers, and a Proof Credits economy.",
    category: "Quantitative Staking & Verification Platform",
    stack: ["Python 3.12", "FastAPI", "PostgreSQL", "Dixon-Coles Poisson", "Masaniello Engine"],
    metrics: [
      { label: "Core engines", value: "7" },
      { label: "Provenance tags", value: "5 tiers" },
      { label: "Selection odds band", value: "1.05–1.12" },
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
    title: "Seth HSE",
    tagline:
      "Engineering a high-risk enterprise safety platform — geofenced anti-spoof compliance, dynamic safety protocols, and a 15-module strict modular monolith.",
    category: "Enterprise Safety & Compliance Platform",
    stack: ["Node.js / Express", "PostgreSQL / RLS", "Flutter", "Next.js", "Redis"],
    metrics: [
      { label: "Bounded modules", value: "15" },
      { label: "Privacy posture", value: "NDPR + GDPR" },
      { label: "Cross-module code import", value: "0 ms" },
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
