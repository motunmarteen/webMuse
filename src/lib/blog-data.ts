/**
 * Blog index data. Each entry is a real, already-published case study —
 * the blog is a second, lighter-weight entry point into the same
 * engineering write-ups, not duplicate content maintained separately.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  readMinutes: number;
  publishedAt: string; // ISO date
  /** Where the full write-up actually lives */
  href: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "novunt-secure-fintech-backend",
    title: "Building a secure fintech backend",
    excerpt:
      "Deposits confirmed through two racing paths, a double-credit bug that only shows up under real concurrency, and the atomic claim that closed it — plus the ledger, idempotency, and withdrawal-threshold design that came after.",
    tags: ["Fintech", "Backend", "Case Study"],
    readMinutes: 7,
    publishedAt: "2026-07-24",
    href: "/case-study/novunt",
  },
  {
    slug: "neyborhuud-community-os",
    title: "Engineering an AI-powered community operating system",
    excerpt:
      "How geography itself becomes the schema for a hyperlocal safety and commerce platform — PostGIS geofencing, a self-terminating SOS escalation ladder, and a hybrid AI threat-detection cascade.",
    tags: ["AI", "Architecture", "Case Study"],
    readMinutes: 9,
    publishedAt: "2026-06-01",
    href: "/case-study/neyborhuud",
  },
  {
    slug: "sentinel-ai-geospatial-engine",
    title: "Designing a geospatial community intelligence engine",
    excerpt:
      "Administrative-boundary matching, temporal clustering, and hybrid AI threat scoring — built without a spatial database.",
    tags: ["AI", "Geospatial", "Case Study"],
    readMinutes: 6,
    publishedAt: "2026-06-01",
    href: "/case-study/sentinel-ai",
  },
  {
    slug: "webmuse-career-assessment",
    title: "Building a decision engine for technology career guidance",
    excerpt:
      "Recovering a career-quiz product from its original GitHub source, then expanding it into a two-axis scoring engine covering 26 tech roles — what stayed, what changed, and why.",
    tags: ["Product", "Career", "Case Study"],
    readMinutes: 6,
    publishedAt: "2026-07-24",
    href: "/case-study/career-assessment",
  },
];

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
