"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  BookOpen,
  Volume2,
  VolumeX,
  Compass,
  Users,
  Terminal as TerminalIcon,
  MapPin,
  ShieldCheck,
  Code2,
  Cpu,
  Globe,
  FileText,
  Lock,
  Activity,
  Handshake,
} from "lucide-react";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  location: string;
  category: "Homepage Section" | "Case Study" | "Blog Article" | "Dedicated Page" | "System Control";
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setCursorType } = useCursor();
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        audioSynth.playClick();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateAnchor = (anchorId: string) => {
    setIsOpen(false);
    audioSynth.playClick();
    const cleanId = anchorId.replace("#", "");
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.push(`/#${cleanId}`);
      return;
    }
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigatePath = (path: string) => {
    setIsOpen(false);
    audioSynth.playClick();
    router.push(path);
  };

  // Comprehensive Full-Site Global Search Index
  const fullSiteIndex: SearchEntry[] = useMemo(
    () => [
      // --- HOMEPAGE SECTIONS ---
      {
        id: "hero",
        title: "WEBMUSE Hero & Motion Engine",
        description: "We build websites, mobile apps, AI solutions, custom software, SaaS products, and business platforms.",
        keywords: ["hero", "websites", "apps", "ai", "software", "saas", "mvp", "automation", "digital", "products", "particle", "canvas"],
        location: "Homepage → Hero",
        category: "Homepage Section",
        icon: <Sparkles className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#main-content"),
      },
      {
        id: "services",
        title: "Core Services Catalog",
        description: "Custom Software Engineering, AI Solutions, Mobile Apps, Web3 Smart Contracts, Cloud Architecture & DevOps, UI/UX Design.",
        keywords: ["services", "engineering", "ai", "mobile", "web3", "contracts", "cloud", "devops", "design", "ui", "ux", "architecture"],
        location: "Homepage → Services",
        category: "Homepage Section",
        icon: <Layers className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#services"),
        badge: "Services",
      },
      {
        id: "process",
        title: "Our Development Process",
        description: "Product Discovery, UI/UX Architecture, Strict Modular Monoliths, Security Auditing, Edge Deployment.",
        keywords: ["process", "discovery", "specs", "modular", "audit", "security", "edge", "sprints", "deployment"],
        location: "Homepage → Process",
        category: "Homepage Section",
        icon: <Cpu className="h-4 w-4 text-soft-cyan" />,
        action: () => navigateAnchor("#process"),
      },
      {
        id: "terminal",
        title: "Live Terminal Architecture Showcase",
        description: "Interactive real-time code and system architecture previews for NeyborHuud, Sentinel AI, Novunt, and Stacks.",
        keywords: ["live", "terminal", "code", "architecture", "preview", "postgis", "redis", "bullmq", "clarity", "solidity"],
        location: "Homepage → Live Terminal",
        category: "Homepage Section",
        icon: <TerminalIcon className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#terminal"),
      },
      {
        id: "universe",
        title: "Constellation Tech Stack Primitives",
        description: "Next.js 16, React 19, TypeScript, PostGIS, MongoDB Atlas, Redis BullMQ, Solidity, Stacks Clarity 3, FastAPI, PostgreSQL RLS, Three.js.",
        keywords: ["constellation", "tech", "universe", "stack", "nextjs", "react", "typescript", "postgis", "mongodb", "redis", "solidity", "fastapi", "postgres"],
        location: "Homepage → Tech Universe",
        category: "Homepage Section",
        icon: <Globe className="h-4 w-4 text-neon-purple" />,
        action: () => navigateAnchor("#universe"),
      },
      {
        id: "gallery",
        title: "Innovation Gallery Portfolio",
        description: "Showcase of shipped software systems, fintech backends, geospatial platforms, and Web3 protocols.",
        keywords: ["gallery", "portfolio", "showcase", "projects", "neyborhuud", "sentinel", "novunt", "seth", "stacks"],
        location: "Homepage → Innovation Gallery",
        category: "Homepage Section",
        icon: <Code2 className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#gallery"),
      },
      {
        id: "team",
        title: "Leadership & Founders",
        description: "Marteen Motun Mubaraq (Co-Founder & Chief Product Architect) & Oluwatosin Florence Atere (Co-Founder & Chief Systems Engineer).",
        keywords: ["team", "leadership", "founders", "marteen", "motun", "mubaraq", "oluwatosin", "florence", "atere", "product", "systems", "architect", "engineer"],
        location: "Homepage → Leadership",
        category: "Homepage Section",
        icon: <Users className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#team"),
        badge: "Founders",
      },
      {
        id: "vault",
        title: "Idea & Scope Simulator (Master Engine)",
        description: "Simulate product roadmaps, target scale, velocity, modular feature add-ons (AI, Auth, Payments, Web3), and calculated budget scope.",
        keywords: ["vault", "simulator", "idea", "roadmap", "estimator", "calculator", "hours", "timeline", "weeks", "budget", "features", "scope"],
        location: "Homepage → Master Simulator",
        category: "Homepage Section",
        icon: <Sparkles className="h-4 w-4 text-neon-purple" />,
        action: () => navigateAnchor("#vault"),
        badge: "Master Tool",
      },
      {
        id: "booking",
        title: "Book Consultation Scheduler",
        description: "Schedule strategy and architecture consultation. Select project type (SaaS, Mobile, AI, Web3, API), date, and ticket ID.",
        keywords: ["booking", "consultation", "schedule", "ticket", "calendar", "saas", "mobile", "ai", "web3", "ecommerce", "meet", "zoom"],
        location: "Homepage → Booking",
        category: "Homepage Section",
        icon: <Calendar className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#booking"),
        badge: "Schedule",
      },
      {
        id: "contact",
        title: "Contact & Global Studio Hubs",
        description: "London HQ Main Studio, New York Hub, Tokyo Hub. Email: hello@webmuse.tech. Response SLA under 4 business hours.",
        keywords: ["contact", "email", "london", "studio", "new york", "tokyo", "hubs", "location", "sla", "hours", "transmit"],
        location: "Homepage → Contact",
        category: "Homepage Section",
        icon: <MapPin className="h-4 w-4 text-neon-purple" />,
        action: () => navigateAnchor("#contact"),
      },

      // --- CASE STUDIES ---
      {
        id: "cs-index",
        title: "All Verified Case Studies",
        description: "Engineering write-ups verified against real running codebases across fintech, geospatial AI, safety, and Bitcoin L2.",
        keywords: ["case study", "case studies", "write-up", "verified", "architecture", "code"],
        location: "Case Study Index",
        category: "Case Study",
        icon: <FileText className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study"),
      },
      {
        id: "cs-neyborhuud",
        title: "NeyborHuud — Community Operating System",
        description: "Hyperlocal safety & commerce platform powered by PostGIS geofencing, self-terminating SOS escalation, and 35 backend modules.",
        keywords: ["neyborhuud", "hyperlocal", "safety", "commerce", "postgis", "geofencing", "sos", "escalation", "nigerian", "neighborhood"],
        location: "Case Study → NeyborHuud",
        category: "Case Study",
        icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
        action: () => navigatePath("/case-study/neyborhuud"),
      },
      {
        id: "cs-sentinel-ai",
        title: "Sentinel AI — Geospatial Threat Engine",
        description: "Geospatial community intelligence engine using Haversine boundary matching, temporal clustering, and threat scoring without spatial DBs.",
        keywords: ["sentinel", "geospatial", "threat", "haversine", "clustering", "intelligence", "scoring", "security"],
        location: "Case Study → Sentinel AI",
        category: "Case Study",
        icon: <Cpu className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study/sentinel-ai"),
      },
      {
        id: "cs-novunt",
        title: "Novunt — Secure Fintech Backend",
        description: "Custodial staking & settlement platform with atomic deposit claims, 3 idempotency layers, double-entry ledger, and NOWPayments.",
        keywords: ["novunt", "fintech", "custodial", "staking", "settlement", "ledger", "double-entry", "idempotency", "atomic", "nowpayments"],
        location: "Case Study → Novunt",
        category: "Case Study",
        icon: <Lock className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study/novunt"),
      },
      {
        id: "cs-seth-hse",
        title: "Seth HSE — Enterprise Safety Platform",
        description: "High-risk enterprise safety platform with geofenced anti-spoof compliance, 15 modular monoliths, and NDPR/GDPR posture.",
        keywords: ["seth", "hse", "enterprise", "safety", "compliance", "geofenced", "anti-spoof", "monolith", "ndpr", "gdpr"],
        location: "Case Study → Seth HSE",
        category: "Case Study",
        icon: <ShieldCheck className="h-4 w-4 text-soft-cyan" />,
        action: () => navigatePath("/case-study/seth-hse"),
      },
      {
        id: "cs-token-streaming",
        title: "Token Streaming Protocol — Bitcoin L2",
        description: "Real-time continuous asset streaming protocol on Bitcoin L2 using Clarity 3 smart contracts, pause/resume state machines, and Clarinet.",
        keywords: ["token", "streaming", "stacks", "bitcoin", "clarity", "smart contracts", "payroll", "asset", "clarinet"],
        location: "Case Study → Token Streaming",
        category: "Case Study",
        icon: <Code2 className="h-4 w-4 text-neon-purple" />,
        action: () => navigatePath("/case-study/stacks-token-streaming"),
      },
      {
        id: "cs-amm-dex",
        title: "AMM Decentralized Exchange — Stacks",
        description: "Constant-product Automated Market Maker (x*y=k) on Bitcoin L2 with permissionless SIP-010 liquidity pools and dynamic swap routing.",
        keywords: ["amm", "dex", "stacks", "bitcoin", "liquidity", "swap", "sip-010", "clarity", "exchange"],
        location: "Case Study → AMM DEX",
        category: "Case Study",
        icon: <Activity className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study/stacks-amm-dex"),
      },
      {
        id: "cs-block-explorer",
        title: "Stacks Blockchain Explorer",
        description: "High-throughput Stacks network explorer with live transaction indexing, smart contract decoding, Hiro API, and Leather/Xverse wallet.",
        keywords: ["explorer", "blockchain", "stacks", "hiro", "leather", "xverse", "transactions", "indexing", "wallet"],
        location: "Case Study → Block Explorer",
        category: "Case Study",
        icon: <Globe className="h-4 w-4 text-soft-cyan" />,
        action: () => navigatePath("/case-study/stacks-block-explorer"),
      },
      {
        id: "cs-career-assessment",
        title: "WEBMUSE Career Assessment Engine",
        description: "Technology career decision engine mapping 26 tech roles across 4 scoring axes with zero sign-up friction.",
        keywords: ["career", "assessment", "quiz", "roles", "technology", "scoring", "decision", "engine"],
        location: "Case Study → Career Assessment",
        category: "Case Study",
        icon: <Compass className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study/career-assessment"),
      },

      // --- BLOG ARTICLES ---
      {
        id: "blog-index",
        title: "Engineering Blog & Technical Insights",
        description: "Technical write-ups from the WEBMUSE engineering team on architecture, security, and real system trade-offs.",
        keywords: ["blog", "insights", "writing", "articles", "technical", "engineering", "publication"],
        location: "Blog Index",
        category: "Blog Article",
        icon: <BookOpen className="h-4 w-4 text-neon-purple" />,
        action: () => navigatePath("/insights"),
      },
      {
        id: "blog-fintech",
        title: "Building a secure fintech backend: Idempotency & Concurrency",
        description: "Deep-dive into double-credit race conditions, atomic deposit claims, double-entry ledgers, and threshold-gated withdrawals.",
        keywords: ["fintech", "backend", "idempotency", "concurrency", "race condition", "ledger", "double-entry", "claims", "nowpayments"],
        location: "Blog → Fintech Backend Security",
        category: "Blog Article",
        icon: <Lock className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/insights/novunt-secure-fintech-backend"),
      },
      {
        id: "blog-community-os",
        title: "Engineering an AI-powered community operating system",
        description: "How geography becomes schema — PostGIS geofencing, self-terminating SOS escalation ladders, and hybrid threat classification.",
        keywords: ["community", "os", "postgis", "geofencing", "sos", "escalation", "nigerian", "threat", "classification"],
        location: "Blog → Community OS Architecture",
        category: "Blog Article",
        icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
        action: () => navigatePath("/insights/neyborhuud-community-os"),
      },
      {
        id: "blog-geospatial",
        title: "Designing a geospatial community intelligence engine",
        description: "Administrative boundary matching, temporal 30-minute clustering, and Haversine math built without spatial DBs.",
        keywords: ["geospatial", "haversine", "clustering", "spatial", "intelligence", "temporal", "mongodb", "node"],
        location: "Blog → Geospatial Engine without Spatial DB",
        category: "Blog Article",
        icon: <Globe className="h-4 w-4 text-soft-cyan" />,
        action: () => navigatePath("/insights/sentinel-ai-geospatial-engine"),
      },
      {
        id: "blog-career",
        title: "Building a decision engine for technology career guidance",
        description: "Recovering a career-quiz product and expanding it into a multi-trait scoring vector model across 26 technology roles.",
        keywords: ["career", "quiz", "decision", "engine", "vector", "scoring", "tech", "roles", "guidance"],
        location: "Blog → Tech Career Decision Engine",
        category: "Blog Article",
        icon: <Compass className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/insights/webmuse-career-assessment"),
      },

      // --- DEDICATED PAGES & UTILITIES ---
      {
        id: "page-career-path",
        title: "Interactive Career Path Quiz Page",
        description: "Take the 26-role technology career assessment quiz and view your personalized radar match.",
        keywords: ["career", "quiz", "path", "roles", "assessment", "radar", "tech"],
        location: "Page → /career-path",
        category: "Dedicated Page",
        icon: <Compass className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/career-path"),
      },
      {
        id: "page-partners",
        title: "WEBMUSE Partners & Agency Ecosystem",
        description: "Partner ecosystem, collaborative integrations, joint development, and strategic studio alliances.",
        keywords: ["partners", "ecosystem", "alliances", "agencies", "collaborate", "integrations"],
        location: "Page → /partners",
        category: "Dedicated Page",
        icon: <Handshake className="h-4 w-4 text-neon-purple" />,
        action: () => navigatePath("/partners"),
      },
      {
        id: "page-privacy",
        title: "Privacy Policy & Data Security Posture",
        description: "WEBMUSE privacy policy, data security practices, NDPR & GDPR compliance guidelines.",
        keywords: ["privacy", "policy", "security", "data", "gdpr", "ndpr", "terms", "compliance"],
        location: "Page → /privacy",
        category: "Dedicated Page",
        icon: <ShieldCheck className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/privacy"),
      },
      {
        id: "page-terms",
        title: "Terms of Service & Engagement Rules",
        description: "Terms of service, client engagement agreements, intellectual property ownership, and liability terms.",
        keywords: ["terms", "service", "agreement", "rules", "legal", "liability", "ip"],
        location: "Page → /terms",
        category: "Dedicated Page",
        icon: <FileText className="h-4 w-4 text-text-muted" />,
        action: () => navigatePath("/terms"),
      },
      {
        id: "page-status",
        title: "System Status & Service Uptime Telemetry",
        description: "Live system status, API gateway health, WebSocket node latency, and infrastructure uptime telemetry.",
        keywords: ["status", "uptime", "health", "system", "latency", "telemetry", "api", "nodes"],
        location: "Page → /status",
        category: "Dedicated Page",
        icon: <Activity className="h-4 w-4 text-emerald-400" />,
        action: () => navigatePath("/status"),
      },

      // --- SYSTEM CONTROLS ---
      {
        id: "audio-toggle",
        title: audioSynth.isMuted() ? "Unmute Interface Sound Synthesizer" : "Mute Interface Sound Synthesizer",
        description: "Toggle futuristic Web Audio API tactile interface feedback sound effects.",
        keywords: ["audio", "sound", "mute", "unmute", "synth", "clicks", "volume"],
        location: "System Control",
        category: "System Control",
        icon: audioSynth.isMuted() ? <VolumeX className="h-4 w-4 text-text-muted" /> : <Volume2 className="h-4 w-4 text-electric-blue" />,
        action: () => {
          const nextMuted = !audioSynth.isMuted();
          audioSynth.setMuted(nextMuted);
          setIsOpen(false);
        },
      },
    ],
    // eslint-disable-next-deps
    []
  );

  // Full-Site Word & Keyword Matching Search Engine
  const searchResults = useMemo(() => {
    if (!query.trim()) return fullSiteIndex;
    const searchTerms = query.toLowerCase().trim().split(/\s+/);

    return fullSiteIndex
      .map((entry) => {
        const titleLower = entry.title.toLowerCase();
        const descLower = entry.description.toLowerCase();
        const locLower = entry.location.toLowerCase();
        const kwLower = entry.keywords.join(" ").toLowerCase();

        let score = 0;

        for (const term of searchTerms) {
          if (titleLower.includes(term)) score += 10;
          if (kwLower.includes(term)) score += 5;
          if (descLower.includes(term)) score += 3;
          if (locLower.includes(term)) score += 2;
        }

        return { entry, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry);
  }, [query, fullSiteIndex]);

  // Handle Keyboard Navigation (Arrow Keys + Enter)
  useEffect(() => {
    if (!isOpen) return;

    const handleListKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, searchResults.length));
        audioSynth.playTypeTick();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % Math.max(1, searchResults.length));
        audioSynth.playTypeTick();
      } else if (e.key === "Enter" && searchResults[selectedIndex]) {
        e.preventDefault();
        searchResults[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleListKeyDown);
    return () => window.removeEventListener("keydown", handleListKeyDown);
  }, [isOpen, searchResults, selectedIndex]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Full-Site Search Palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl rounded-2xl border border-card-border bg-[#08080a] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Search Bar Input */}
              <div className="flex items-center px-4 py-4 border-b border-card-border bg-black/40">
                <Search className="h-4.5 w-4.5 text-electric-blue shrink-0 mr-3" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search every word, section, project, or page on WEBMUSE..."
                  className="w-full bg-transparent text-sm font-mono text-foreground outline-none placeholder-zinc-500"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-xs text-text-muted hover:text-foreground font-mono mr-2 px-1.5 py-0.5 rounded border border-card-border"
                  >
                    Clear
                  </button>
                )}
                <span className="text-[10px] font-mono border border-card-border bg-card-bg px-2 py-1 rounded text-text-muted shrink-0">
                  ESC
                </span>
              </div>

              {/* Results Count Summary */}
              <div className="px-5 py-2 border-b border-card-border/60 bg-black/20 flex items-center justify-between text-[10px] font-mono text-text-muted uppercase tracking-wider">
                <span>
                  {query.trim()
                    ? `Found ${searchResults.length} matching result${searchResults.length === 1 ? "" : "s"}`
                    : `Indexing ${fullSiteIndex.length} sections, articles, and pages`}
                </span>
                <span className="flex items-center gap-1 text-electric-blue">
                  <Command className="h-3 w-3" />
                  Full-Site Search Engine
                </span>
              </div>

              {/* Results List Container */}
              <div ref={listRef} className="max-h-[420px] overflow-y-auto p-3 flex flex-col gap-1.5">
                {searchResults.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-text-muted flex flex-col items-center gap-2">
                    <Search className="h-6 w-6 text-zinc-600 mb-1" />
                    <span>No matching content found for &quot;{query}&quot;</span>
                    <span className="text-[10px] text-zinc-500">Try searching for keywords like &quot;MongoDB&quot;, &quot;London&quot;, &quot;Auth&quot;, &quot;Staking&quot;, or &quot;SOS&quot;.</span>
                  </div>
                ) : (
                  searchResults.map((entry, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={entry.id}
                        onClick={entry.action}
                        onMouseEnter={() => {
                          setSelectedIndex(idx);
                          setCursorType("pointer");
                          audioSynth.playTypeTick();
                        }}
                        onMouseLeave={() => setCursorType("default")}
                        className={`group flex items-center justify-between p-3.5 rounded-xl border text-left transition-all font-mono text-xs ${
                          isSelected
                            ? "border-electric-blue/60 bg-card-bg shadow-md"
                            : "border-card-border/60 bg-black/20 hover:border-card-border hover:bg-card-bg/40"
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 pr-3">
                          <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                            isSelected ? "border-electric-blue bg-electric-blue/15 text-electric-blue" : "border-card-border bg-black/40 text-text-muted"
                          }`}>
                            {entry.icon}
                          </div>
                          <div className="min-w-0 flex flex-col">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-semibold text-sm tracking-tight truncate ${isSelected ? "text-electric-blue" : "text-text-title"}`}>
                                {entry.title}
                              </span>
                              {entry.badge && (
                                <span className="text-[9px] uppercase tracking-wider font-mono border border-electric-blue/30 text-electric-blue bg-electric-blue/10 px-2 py-0.5 rounded-full shrink-0">
                                  {entry.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-text-muted font-light line-clamp-1 mt-1 leading-relaxed">
                              {entry.description}
                            </span>
                            <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1.5 flex items-center gap-1 font-mono">
                              <span className="h-1.5 w-1.5 rounded-full bg-electric-blue/60" />
                              {entry.location}
                            </span>
                          </div>
                        </div>

                        <ArrowRight className={`h-4 w-4 shrink-0 transition-all ${
                          isSelected ? "text-electric-blue translate-x-1" : "text-text-muted opacity-40"
                        }`} />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-card-border px-5 py-3 bg-black/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="border border-card-border bg-card-bg px-1.5 py-0.5 rounded">↑↓</span>
                  <span>Navigate</span>
                  <span className="border border-card-border bg-card-bg px-1.5 py-0.5 rounded ml-2">↵</span>
                  <span>Open Location</span>
                </span>
                <span className="text-zinc-500">WEBMUSE Search Engine v3.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
