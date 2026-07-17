"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import {
  Code,
  Cpu,
  Database,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  X,
  Calendar,
  Layers,
  TrendingUp,
  Workflow,
  Store,
  type LucideIcon
} from "lucide-react";

interface ServiceItem {
  name: string;
  purpose: string;
  value: string;
  tech: string[];
  caseStudy: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  services: ServiceItem[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "engineering",
    title: "Core Engineering",
    icon: Code,
    services: [
      {
        name: "Software Engineering",
        purpose: "Build highly maintainable, type-safe, and scalable custom applications — from resilient backend server logic and database schemas to full end-to-end systems — designed for high performance.",
        value: "Ensures longevity, safety of IP, database consistency, and matches enterprise growth requirements.",
        tech: ["TypeScript", "Rust", "Go", "Python", "PostgreSQL", "Redis"],
        caseStudy: "Engineered a high-throughput logistical trading engine handling $50M+ daily transaction volume, and migrated a legacy backend into a microservices mesh, reducing latency by 120ms."
      },
      {
        name: "Web Development",
        purpose: "Create lightning-fast, SEO-optimized, responsive websites with interactive, state-managed interfaces, fluid animations, and accessible layouts, built on the latest server-rendering architectures.",
        value: "Improves Google Core Web Vitals, organic search ranks, and boosts visitor-to-client conversion rates while keeping users engaged and lowering churn.",
        tech: ["Next.js", "React", "Tailwind CSS", "Node.js", "Framer Motion"],
        caseStudy: "Redesigned a global fintech platform resulting in a 45% increase in mobile signups."
      },
      {
        name: "Mobile App Development",
        purpose: "Develop premium native and cross-platform mobile apps with pixel-perfect layouts and smooth gestures.",
        value: "Engages users directly on their devices with full hardware capability integration.",
        tech: ["React Native", "Flutter", "Swift", "Kotlin"],
        caseStudy: "Shipped a health-tracking app that reached #5 on the App Store with a 4.8-star rating."
      },
      {
        name: "API Development",
        purpose: "Build REST, GraphQL, or gRPC APIs designed for high concurrency with detailed documentation.",
        value: "Facilitates seamless integrations, enabling third-party developer systems to interface with your service.",
        tech: ["GraphQL", "FastAPI", "Apollo", "Swagger"],
        caseStudy: "Created a developer-first checkout API now integrated into 40+ active platforms."
      },
      {
        name: "System Architecture",
        purpose: "Outline the high-level diagrams, technical requirements, and communication protocols between applications — including multi-region cloud infrastructure and automated CI/CD deployment pipelines.",
        value: "Prevents bottlenecks, minimizes downtime, ensures system longevity and regulatory compliance (GDPR/HIPAA), and prevents expensive code rewrites down the line.",
        tech: ["UML", "Kubernetes", "AWS", "Google Cloud", "Terraform", "Docker", "GitHub Actions"],
        caseStudy: "Architected a hybrid-cloud environment that cut infrastructure spending by 35%, and deployed automated pipelines that reduced build-and-release times from 4 hours to 6 minutes."
      }
    ]
  },
  {
    id: "small-business",
    title: "Small Business",
    icon: Store,
    services: [
      {
        name: "Conversion-Focused Website",
        purpose: "Design and build websites that combine clean layouts, strategic navigation, and high performance to convert visitors into clients.",
        value: "Creates a professional online presence that builds customer trust and aligns directly with your business goals.",
        tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
        caseStudy: "Re-engineered a service-business website, raising organic inquiries by 60% within 45 days of launch."
      },
      {
        name: "E-Commerce & Online Stores",
        purpose: "Create secure online storefronts using Shopify, Stripe, or custom portals tailored for smooth purchasing journeys.",
        value: "Enables automated product cataloging, payment processing, and inventory tracking to scale sales.",
        tech: ["Shopify", "Stripe", "WooCommerce", "PayPal"],
        caseStudy: "Shipped a custom checkout experience that cut shopping cart abandonment rates by 22% in month 1."
      },
      {
        name: "High-Converting Landing Pages",
        purpose: "Build single-page marketing layouts structured around a single, clear call-to-action (forms, bookings, or calls).",
        value: "Maximizes returns on social media profiles or advertising budgets by guiding users to act without distraction.",
        tech: ["Next.js", "Tailwind CSS", "Calendly"],
        caseStudy: "Launched a lead-generation landing page that captured 85 qualified customer inquiries in its first week."
      },
      {
        name: "Interactive Portfolios & Showcases",
        purpose: "Develop visual digital catalogs and dynamic work portfolios to showcase your boutique craftsmanship and projects.",
        value: "Highlights quality and premium visual details, helping local businesses command higher-tier prices.",
        tech: ["Next.js", "Framer Motion", "Vercel"],
        caseStudy: "Built a custom visual portfolio for a high-end builder, securing 8 bulk client contracts in Month 1."
      },
      {
        name: "SEO & Search Visibility",
        purpose: "Structure your website metadata, header hierarchy, and page speed parameters to support search rankings from day one.",
        value: "Helps your website get discovered organically by users actively searching for your services online.",
        tech: ["Next.js Metadata", "Semantic HTML", "Google Search"],
        caseStudy: "Optimized a professional service site's technical structure, increasing search engine impressions by 80%."
      }
    ]
  },
  {
    id: "product",
    title: "Product & Strategy",
    icon: Layers,
    services: [
      {
        name: "Product Management",
        purpose: "Define product scope, write PRDs, manage backlogs, and coordinate sprints across teams.",
        value: "Keeps projects on schedule, coordinates milestones, and translates business goals into working items.",
        tech: ["Jira", "Linear", "Notion", "Slack"],
        caseStudy: "Managed the phase-1 delivery of a carbon offset trading tracker on time and within budget."
      },
      {
        name: "Product Design",
        purpose: "Craft the visual aesthetics, interactions, layouts, and brand systems for digital software.",
        value: "Differentiates your product from competitors with a high-end, premium, and cohesive interface.",
        tech: ["Figma", "Adobe CC", "Spline", "Principle"],
        caseStudy: "Designed a SaaS platform UI, resulting in a 30% reduction in user onboarding friction."
      },
      {
        name: "UI Design",
        purpose: "Design custom visual mockups, style guides, dark/light modes, and custom design systems.",
        value: "Establishes a beautiful first impression that builds user trust and makes the product feel premium.",
        tech: ["Figma", "Tailwind CSS", "CSS Modules"],
        caseStudy: "Created a design system with 200+ reusable styled tokens, streamlining engineering by 40%."
      },
      {
        name: "UX Research",
        purpose: "Conduct user interviews, run usability audits, review analytics, and create user journey maps.",
        value: "Identifies hidden friction points in user flows, helping to optimize feature engagement.",
        tech: ["Hotjar", "Mixpanel", "Figma", "UserTesting"],
        caseStudy: "Ran usability audits for an e-commerce giant, fixing friction points to raise cart conversions by 18%."
      },
      {
        name: "MVP Development",
        purpose: "Build a streamlined, functional version of your product containing core features ready for market launch.",
        value: "Validates ideas with real users quickly, minimizing initial financial risks.",
        tech: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
        caseStudy: "Developed a social-scheduling MVP in 4 weeks, helping the founder raise $1.2M seed capital."
      },
      {
        name: "Startup Consulting",
        purpose: "Provide strategic advice on pitch decks, financial structures, roadmap priorities, and team hiring.",
        value: "Avoids early-stage pitfalls, aligns engineering milestones with investor goals, and saves capital.",
        tech: ["Financial Modeling", "Pitch Structuring", "Hiring Rubrics"],
        caseStudy: "Consulted a fintech startup, restructuring their engineering team to speed up release rate by 2x."
      },
      {
        name: "Technical Consulting",
        purpose: "Evaluate legacy databases, audit security protocols, recommend tech stacks, and review system code.",
        value: "Identifies security exploits and prevents selecting incorrect framework stacks that won't scale.",
        tech: ["Architecture Audits", "Security Reviews", "Tech Valuations"],
        caseStudy: "Audited a medical records application, updating security parameters to comply with strict HIPAA standards."
      },
      {
        name: "Idea Validation",
        purpose: "Conduct landing page tests, research competitor metrics, and run user surveys to evaluate project viability.",
        value: "Ensures there is real market demand before spending tens of thousands on engineering.",
        tech: ["Landing Page Tests", "A/B Testing", "Google Analytics"],
        caseStudy: "Validated a micro-learning app concept, finding high demand and shifting the target market to corporate HR."
      },
      {
        name: "Market Research",
        purpose: "Analyze industry trends, competitor feature grids, pricing models, and target demographics.",
        value: "Positions your brand uniquely in the market and optimizes pricing models for maximum margins.",
        tech: ["Statista", "SEMrush", "SimilarWeb"],
        caseStudy: "Conducted market research for a Web3 gaming project, aligning pricing and features with active players."
      },
      {
        name: "Product Strategy",
        purpose: "Establish the roadmap milestones, feature prioritization metrics, and go-to-market strategies.",
        value: "Provides a single, clear source of truth for engineering, marketing, and investor teams.",
        tech: ["Roadmap Planners", "KPI Dashboards", "Miro"],
        caseStudy: "Structured the product strategy for a property tech platform, leading to 25k signups in Month 1."
      }
    ]
  },
  {
    id: "growth",
    title: "Growth & Strategy",
    icon: TrendingUp,
    services: [
      {
        name: "Digital Marketing",
        purpose: "Create and manage paid ad campaigns across search engines, social networks, and industry newsletters.",
        value: "Generates instant high-intent traffic to fuel sales pipelines and user bases.",
        tech: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
        caseStudy: "Managed a $50k monthly ad budget for a SaaS tool, maintaining a 3.4x return on ad spend (ROAS)."
      },
      {
        name: "Growth Marketing",
        purpose: "Build viral loops, referral panels, gamified milestones, and write copy for newsletter pipelines.",
        value: "Reduces customer acquisition costs (CAC) by utilizing existing users to acquire new ones.",
        tech: ["ActiveCampaign", "PostHog", "Mixpanel"],
        caseStudy: "Designed a double-sided referral program that expanded user bases by 80% in 90 days."
      },
      {
        name: "Brand Strategy",
        purpose: "Define brand personality, tone of voice, visual identity guidelines, and positioning statements.",
        value: "Establishes a strong, unforgettable market presence that commands premium pricing.",
        tech: ["Brand Books", "Visual Guidelines", "Aesthetics"],
        caseStudy: "Rebranded an AI operations firm, shifting their image to attract Fortune 500 enterprise inquiries."
      },
      {
        name: "SEO",
        purpose: "Conduct keyword research, write technical article hubs, structure interlinking, and build page speed.",
        value: "Generates long-term, free organic traffic that compounds over time without active advertising budgets.",
        tech: ["Ahrefs", "SEMrush", "Screaming Frog", "Next.js Metadata"],
        caseStudy: "Optimized a SaaS blog layout, increasing organic traffic from 4,000 to 75,000 monthly visitors."
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Automation",
    icon: Cpu,
    services: [
      {
        name: "AI Solutions",
        purpose: "Integrate LLM API calls, embedding databases, and vector search engines into business products.",
        value: "Automates cognitive workflows and provides custom intelligence, reducing labor costs by up to 50%.",
        tech: ["OpenAI", "Anthropic", "LangChain", "Pinecone"],
        caseStudy: "Built a document-analysis tool that reads 1000-page PDF legal contracts in under 5 seconds."
      },
      {
        name: "Machine Learning",
        purpose: "Train and deploy custom predictive models, recommenders, classification grids, and anomaly detectors.",
        value: "Empowers data-driven operations with automated predictive modeling.",
        tech: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn"],
        caseStudy: "Developed an anomaly detection algorithm that flags fraudulent payments with 99.4% accuracy."
      },
      {
        name: "Telegram Bot Development",
        purpose: "Construct highly interactive, WebApp-enabled Telegram bots to serve users directly inside chat channels.",
        value: "Bridges customer touchpoints into messaging platforms where billions of users are already active.",
        tech: ["Node.js", "Telegraf", "FastAPI", "Telegram API"],
        caseStudy: "Launched a Telegram WebApp portfolio checker for crypto assets, reaching 150k monthly active users."
      },
      {
        name: "WhatsApp Automation",
        purpose: "Deploy official Meta API messaging sequences to notify customers, confirm orders, and manage inquiries.",
        value: "Increases notification read-rates by 80% compared to traditional email marketing channels.",
        tech: ["Meta API", "Node.js", "FastAPI", "MongoDB"],
        caseStudy: "Created a booking reminder sequence for a health clinic, cutting no-shows by 40%."
      },
      {
        name: "Discord Bots",
        purpose: "Develop custom bots to moderate, automate verification, and gate content inside Discord communities.",
        value: "Builds user engagement and automates support tasks inside Web3 and gaming communities.",
        tech: ["Discord.js", "Python", "Docker"],
        caseStudy: "Engineered a community onboarding bot that handles verification for 40,000 active members."
      },
      {
        name: "Business Automation",
        purpose: "Connect disparate SaaS software with custom automation scripts to automate file syncing and database updates.",
        value: "Eliminates boring manual data entry, saving hundreds of engineering hours every month.",
        tech: ["Zapier", "Make.com", "Node.js", "Python"],
        caseStudy: "Automated a sales ingestion funnel, routing leads directly from LinkedIn to CRM and Slack channels."
      }
    ]
  },
  {
    id: "web3",
    title: "Web3 & Blockchain",
    icon: Database,
    services: [
      {
        name: "Blockchain Development",
        purpose: "Develop blockchain systems, custom L1/L2 solutions, and multi-signature infrastructure.",
        value: "Ensures decentralized verification, trustless asset transfers, and transparent accounting.",
        tech: ["Solidity", "Go-Ethereum", "Rust", "Hardhat"],
        caseStudy: "Engineered a private sub-network for tracking supply-chain assets from origin to customer."
      },
      {
        name: "Web3 Development",
        purpose: "Integrate wallet connectivity, NFT collections, token gating, and decentralized interactions into web interfaces.",
        value: "Allows users to log in securely with their decentralized wallets and interact with smart contracts.",
        tech: ["Next.js", "Ethers.js", "Wagmi", "Web3Modal"],
        caseStudy: "Built a customized NFT marketplace and staking panel with a fluid dashboard interface."
      },
      {
        name: "Smart Contracts",
        purpose: "Write, test, and deploy secure Solidity or Rust contracts for ERC20/ERC721 tokens and DeFi applications.",
        value: "Protects millions of dollars in locked value by avoiding common hacks via unit testing and auditing.",
        tech: ["Solidity", "Rust", "Foundry", "Slither"],
        caseStudy: "Designed, audited, and deployed a decentralized yield optimizer locking $8M in TVL."
      }
    ]
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("engineering");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { setCursorType } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  useEffect(() => {
    if (!selectedService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedService]);

  const currentCategory = SERVICES_DATA.find((c) => c.id === activeCategory);

  return (
    <section id="services" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-mesh-purple opacity-20 blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 md:mb-16">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
            We engineer products that shape markets.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            Our teams operate at the intersection of design craftsmanship and backend engineering. Explore our comprehensive services categorized by domain.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto no-scrollbar flex-nowrap pb-4 border-b border-card-border gap-2 mb-10 shrink-0 w-full">
          {SERVICES_DATA.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audioSynth.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 border shrink-0 ${
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card-bg text-text-muted border-card-border hover:text-foreground hover:bg-card-bg/80"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Services Grid list */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {currentCategory?.services.map((service, idx) => {
              const CategoryIcon = currentCategory.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedService(service)}
                  onMouseEnter={() => setCursorType("expand")}
                  onMouseLeave={() => setCursorType("default")}
                  className="glassmorphism-card p-4 md:p-6 rounded-2xl cursor-pointer group flex flex-col justify-between min-h-[104px] md:min-h-[180px] hover:border-electric-blue/40"
                >
                  <div className="flex justify-between items-start mb-2 md:mb-4">
                    <CategoryIcon className="h-5 w-5 text-electric-blue md:hidden" />
                    <h3 className="hidden md:block text-lg font-bold tracking-tight text-text-title group-hover:text-electric-blue transition-colors">
                      {service.name}
                    </h3>
                    <div className="hidden md:flex h-8 w-8 rounded-full border border-card-border items-center justify-center text-text-muted group-hover:text-foreground group-hover:bg-card-bg transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="md:hidden text-sm font-bold tracking-tight text-text-title leading-snug line-clamp-2 group-hover:text-electric-blue transition-colors">
                    {service.name}
                  </h3>

                  <p className="hidden md:block text-text-muted text-sm font-light line-clamp-2 leading-relaxed">
                    {service.purpose}
                  </p>

                  <div className="hidden md:flex items-center gap-1.5 mt-6 text-xs text-text-muted font-mono group-hover:text-foreground transition-colors">
                    <span>Learn more</span>
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide-out Overlay Drawer for Details */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Drawer (Mobile Bottom Sheet / Desktop Side Drawer) */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-drawer-title"
              initial={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 bottom-0 z-50 w-full lg:max-w-lg lg:top-0 h-[85vh] lg:h-full bg-background border-t lg:border-t-0 lg:border-l border-card-border p-6 md:p-8 flex flex-col justify-between overflow-y-auto rounded-t-3xl lg:rounded-t-none"
            >
              {/* Drag Handle for Mobile */}
              <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mb-4 block lg:hidden shrink-0" aria-hidden="true" />
              <div>
                {/* Drawer Header */}
                <div className="flex justify-between items-center border-b border-card-border pb-6 mb-8">
                  <span className="text-xs font-mono font-bold tracking-widest text-electric-blue uppercase">
                    SERVICE DETAILS
                  </span>
                  <button
                    onClick={() => setSelectedService(null)}
                    onMouseEnter={() => setCursorType("pointer")}
                    onMouseLeave={() => setCursorType("default")}
                    className="p-2 rounded-full border border-card-border bg-card-bg text-text-muted hover:text-foreground hover:bg-card-bg/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
                    aria-label="Close service details"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Service Title */}
                <h3 id="service-drawer-title" className="text-3xl font-bold tracking-tight text-text-title mb-6">
                  {selectedService.name}
                </h3>

                {/* Detailed Blocks */}
                <div className="flex flex-col gap-6 text-sm">
                  {/* Purpose */}
                  <div>
                    <h4 className="text-text-muted font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-electric-blue" />
                      Purpose
                    </h4>
                    <p className="text-foreground font-light leading-relaxed opacity-90">
                      {selectedService.purpose}
                    </p>
                  </div>

                  {/* Business Value */}
                  <div>
                    <h4 className="text-text-muted font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-neon-purple" />
                      Business Value
                    </h4>
                    <p className="text-foreground font-light leading-relaxed opacity-90">
                      {selectedService.value}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-text-muted font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Workflow className="h-3.5 w-3.5 text-soft-cyan" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedService.tech.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-card-border bg-card-bg px-3 py-1 text-xs text-text-muted font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Illustrative Scenario */}
                  <div className="rounded-xl border border-card-border bg-card-bg/40 p-4">
                    <h4 className="text-text-muted font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-neon-purple" />
                      Illustrative Scenario
                    </h4>
                    <p className="text-text-muted font-light text-xs leading-relaxed italic">
                      &quot;{selectedService.caseStudy}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="border-t border-card-border pt-6 mt-8">
                <a
                  href="#booking"
                  onClick={() => setSelectedService(null)}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
                >
                  <Calendar className="h-4 w-4 text-electric-blue" />
                  Discuss This Service
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
