/**
 * Technical blog and architecture publication data for WEBMUSE.
 */

export interface ArticleSection {
  heading: string;
  body: string;
  codeSnippet?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  tags: string[];
  readMinutes: number;
  publishedAt: string; // ISO date
  href: string;
  relatedCaseStudySlug?: string;
  sections: ArticleSection[];
  takeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "novunt-secure-fintech-backend",
    title: "Building a secure fintech backend: Idempotency & Concurrency",
    excerpt:
      "Deposits confirmed through two racing paths, a double-credit bug that only shows up under real concurrency, and the atomic claim that closed it — plus the ledger, idempotency, and withdrawal-threshold design that came after.",
    author: "Marteen Motun Mubaraq",
    authorRole: "Co-Founder & Chief Product Architect",
    tags: ["Fintech", "Backend", "Security"],
    readMinutes: 7,
    publishedAt: "2026-07-24",
    href: "/insights/novunt-secure-fintech-backend",
    relatedCaseStudySlug: "novunt",
    sections: [
      {
        heading: "1. The Anatomy of the Race Condition",
        body: "In custodial settlement systems, payment webhooks from gateways like NOWPayments and internal polling daemons frequently process payment confirmations concurrently. Without strict locking, two simultaneous handler calls can read an unfulfilled deposit status and issue double credits to a user balance.",
        codeSnippet: `// Atomic Deposit Claim Pattern in MongoDB
const claimDeposit = async (txHash, userId, amount) => {
  const result = await Deposit.findOneAndUpdate(
    { txHash, status: 'PENDING' },
    { $set: { status: 'CLAIMED', claimedAt: new Date() } },
    { new: true }
  );
  if (!result) return false; // Claim failed or already processed
  await Ledger.creditUserBalance(userId, amount);
  return true;
};`,
      },
      {
        heading: "2. Immutable Double-Entry Ledger",
        body: "Financial state should never rely on raw mutative balance increments. Every transfer or credit generates a pair of debits and credits in an immutable ledger append stream.",
        codeSnippet: `// Double-Entry Ledger Entry
const ledgerRecord = {
  debitAccount: 'SYS_RESERVE_CUSTODY',
  creditAccount: \`USER_\${userId}\`,
  amount: amountInCents,
  timestamp: new Date().toISOString(),
  signature: crypto.hmacSign(payload, SECRET_KEY)
};`,
      },
      {
        heading: "3. Threshold-Gated Multi-Sig Withdrawals",
        body: "Withdrawals above a dynamic threshold trigger secondary validation hooks and time-locked approval gates, shielding custodial vaults from single-point compromise.",
      },
    ],
    takeaways: [
      "Never mutate financial balances directly without atomic database conditional filters.",
      "Double-entry ledgers ensure full auditability even during partial system failures.",
      "Webhook delivery MUST be treated as at-least-once, requiring idempotent handlers.",
    ],
  },
  {
    slug: "neyborhuud-community-os",
    title: "Engineering an AI-powered community operating system",
    excerpt:
      "How geography itself becomes the schema for a hyperlocal safety and commerce platform — PostGIS geofencing, a self-terminating SOS escalation ladder, and a hybrid AI threat-detection cascade.",
    author: "Oluwatosin Florence Atere",
    authorRole: "Co-Founder & Chief Systems Engineer",
    tags: ["AI", "Architecture", "Geospatial"],
    readMinutes: 9,
    publishedAt: "2026-06-01",
    href: "/insights/neyborhuud-community-os",
    relatedCaseStudySlug: "neyborhuud",
    sections: [
      {
        heading: "1. Spatial Indexing as a Core Primitive",
        body: "Rather than treating location as metadata attached to user profiles, NeyborHuud treats geographical bounding polygons as the core entity around which notifications, commerce, and security alerts rotate.",
        codeSnippet: `// PostGIS Spatial Query for Active Neighborhood Nodes
SELECT id, name, ST_Distance(geom, ST_MakePoint($1, $2)::geography) AS dist_meters
FROM neighborhood_hubs
WHERE ST_DWithin(geom, ST_MakePoint($1, $2)::geography, 5000)
ORDER BY dist_meters ASC;`,
      },
      {
        heading: "2. The Self-Terminating SOS Escalation Ladder",
        body: "Emergency telemetry follows a multi-tier escalation cadence (0s, 30s, 60s, 90s). If trusted emergency contacts or station responders do not acknowledge the dispatch signal, the event cascades automatically up to district nodes.",
      },
      {
        heading: "3. Hybrid Threat Classification Model",
        body: "Incoming incident reports pass through an on-device anomaly filter combined with Cognitive AI threat scoring (0-10) to prevent panic propagation caused by false alarms.",
      },
    ],
    takeaways: [
      "Geospatial indexing must be integrated into database schemas at day zero.",
      "Emergency dispatches require multi-channel fallback mechanisms (WebSockets + SMS + Push).",
      "AI scoring reduces triage fatigue for community responders.",
    ],
  },
  {
    slug: "sentinel-ai-geospatial-engine",
    title: "Designing a geospatial community intelligence engine without spatial DBs",
    excerpt:
      "Administrative-boundary matching, temporal clustering, and hybrid AI threat scoring — built using lightweight Haversine algorithms and MongoDB document stores.",
    author: "Oluwatosin Florence Atere",
    authorRole: "Co-Founder & Chief Systems Engineer",
    tags: ["AI", "Geospatial", "Optimization"],
    readMinutes: 6,
    publishedAt: "2026-06-01",
    href: "/insights/sentinel-ai-geospatial-engine",
    relatedCaseStudySlug: "sentinel-ai",
    sections: [
      {
        heading: "1. Bypassing Heavy Spatial Database Engines",
        body: "For startup deployments, provisioning full GIS clusters can add operational complexity. Sentinel AI implements a lightweight 2D bounding grid combined with Haversine distance matching in Node.js memory.",
        codeSnippet: `// Fast Haversine Distance Calculation (KM)
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}`,
      },
      {
        heading: "2. Temporal Incident Clustering",
        body: "Reports occurring within a 30-minute sliding window and a 1km radius automatically merge into a single incident cluster, preventing duplicated push alerts.",
      },
    ],
    takeaways: [
      "Math-based in-memory spatial algorithms can handle thousands of concurrent nodes without expensive spatial DB extensions.",
      "Temporal clustering is essential for noise reduction during localized events.",
    ],
  },
  {
    slug: "webmuse-career-assessment",
    title: "Building a decision engine for technology career guidance",
    excerpt:
      "Recovering a career-quiz product from its original GitHub source, then expanding it into a two-axis scoring engine covering 26 tech roles — what stayed, what changed, and why.",
    author: "Marteen Motun Mubaraq",
    authorRole: "Co-Founder & Chief Product Architect",
    tags: ["Product", "Career", "TypeScript"],
    readMinutes: 6,
    publishedAt: "2026-07-24",
    href: "/insights/webmuse-career-assessment",
    relatedCaseStudySlug: "career-assessment",
    sections: [
      {
        heading: "1. Product Recovery and Modular Re-architecture",
        body: "We took legacy single-file quiz code and converted it into a typed assessment engine supporting multi-trait vectors (Analytical, Creative, Operational, Algorithmic).",
      },
      {
        heading: "2. Zero-Sign Up Friction Loop",
        body: "To maximize completion rates, the assessment runs entirely in client-side memory using state reducers, displaying interactive radar charts instantly without forcing account creation.",
      },
    ],
    takeaways: [
      "Immediate value delivery beats gated sign-up walls for consumer interactive tools.",
      "Weighted vector math provides far higher user match accuracy than simple tally counting.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
