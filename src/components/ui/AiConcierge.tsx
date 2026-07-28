"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCursor } from "@/components/ui/CustomCursor";
import {
  MessageSquareText,
  X,
  Send,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  RefreshCw,
  Cpu,
  Code2,
  Lock,
  Globe,
} from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  cta?: {
    label: string;
    action: () => void;
  };
}

const STARTER_PROMPTS = [
  "🚀 I want to build a product concept",
  "⏱️ How long does it take to finish an app?",
  "🔒 Explain Novunt's 3 idempotency layers",
  "📅 How do I book an architecture review?",
  "⚡ What tech stack do you use?",
];

export default function AiConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { setCursorType } = useCursor();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I'm the WEBMUSE Autonomous Lead Architect & Concierge. You can ask me about product timelines, custom app builds, technical case studies (like Novunt or Sentinel AI), or describe a product concept for an instant architectural blueprint!",
      timestamp: getFormattedTime(),
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  function getFormattedTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const navigateAnchor = (anchorId: string) => {
    setIsOpen(false);
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
    router.push(path);
  };

  const handleSend = (userText?: string) => {
    const textToSend = userText || inputMsg.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userText) setInputMsg("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAutonomousArchitectReply(textToSend);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 750);
  };

  // Autonomous Lead Architect Engine
  const generateAutonomousArchitectReply = (query: string): Message => {
    const q = query.toLowerCase().trim();

    // --- 1. PRODUCT CONCEPT BLUEPRINT GENERATOR ---
    // Detects when the user describes an app idea or asks "can you build X for Y"
    if (
      q.startsWith("i want to build") ||
      q.startsWith("i want to create") ||
      q.startsWith("can you build an app") ||
      q.startsWith("can you build a platform") ||
      q.startsWith("can you build a system") ||
      (q.includes("build") && q.includes("for")) ||
      (q.includes("idea") && q.split(" ").length > 3)
    ) {
      const isAi = q.includes("ai") || q.includes("model") || q.includes("agent") || q.includes("predict");
      const isWeb3 = q.includes("web3") || q.includes("crypto") || q.includes("blockchain") || q.includes("dex") || q.includes("contract");
      const isFintech = q.includes("payment") || q.includes("fintech") || q.includes("bank") || q.includes("escrow") || q.includes("money");

      let category = "Custom Enterprise Platform";
      let frontend = "Next.js 16 (App Router) + React 19 + Tailwind CSS";
      let backend = "Node.js (TypeScript / Express) + REST/GraphQL";
      let db = "PostgreSQL (Prisma ORM / Aurora) + Redis Cache";
      let cloud = "Vercel Edge Platform + AWS S3";
      let hours = "240 - 380 Engineering Hours";
      let weeks = "6 - 9 Weeks";
      let security = "Layered OAuth 2.0 / JWT auth, rate-limiting, and client payload validation.";

      if (isAi) {
        category = "AI Cognitive Intelligence System";
        frontend = "Next.js 16 (App Router) + Framer Motion + WebGL";
        backend = "FastAPI (Asynchronous Python) + LangChain / LlamaIndex";
        db = "Supabase Vector / Pinecone + PostgreSQL";
        cloud = "Cloud Vertex Container + Docker Infrastructure";
        hours = "320 - 450 Engineering Hours";
        weeks = "8 - 11 Weeks";
        security = "Proprietary vector cache engine, model context chunking, and strict token rate limits.";
      } else if (isWeb3) {
        category = "Decentralized Web3 & Ledger Protocol";
        frontend = "React + Viem + Wagmi Hooks + RainbowKit";
        backend = "Solidity (EVM) / Clarity 3 (Bitcoin L2 Stacks) Smart Contracts";
        db = "The Graph (IPFS Indexer) + TimescaleDB";
        cloud = "Alchemy RPC Nodes + IPFS Decentralized Storage";
        hours = "380 - 520 Engineering Hours";
        weeks = "9 - 14 Weeks";
        security = "Gas-sponsored transaction relayer, OpenZeppelin audited libraries, and reentrancy guards.";
      } else if (isFintech) {
        category = "High-Security Fintech & Payment Engine";
        frontend = "Next.js 16 PWA + Tailwind CSS";
        backend = "Node.js (TypeScript) + NOWPayments / Stripe SDK";
        db = "PostgreSQL (Encrypted at rest) + Redis BullMQ Queue";
        cloud = "AWS ECS + Cloudflare TLS 1.3 Security";
        hours = "300 - 440 Engineering Hours";
        weeks = "7 - 10 Weeks";
        security = "Layered idempotency keys, 2-sided double-entry accounting ledger, and threshold-gated withdrawals.";
      }

      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `⚡ Architectural Blueprint Generated for: "${query}"\n\n• Category: ${category}\n• Frontend: ${frontend}\n• Backend Engine: ${backend}\n• Database Spec: ${db}\n• Hosting & Cloud: ${cloud}\n• Estimated Scope: ${hours} (${weeks})\n• Security Rule: ${security}`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Load Blueprint into Booking Form",
          action: () => navigateAnchor("#booking"),
        },
      };
    }

    // --- 2. DEEP TECHNICAL CASE STUDY DEEP-DIVES ---
    if (q.includes("novunt") || (q.includes("idempotency") && q.includes("layer"))) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "🔒 Novunt Architecture Deep-Dive (Custodial Staking Backend):\n1. Layer 1 (Client Key): Client submits SHA-256 request payload hash.\n2. Layer 2 (Database Transaction Claim): MongoDB atomic $setOnInsert lock prevents double-claims.\n3. Layer 3 (Webhook Idempotency): NOWPayments IPN event hashes ensure 0 double-credits on instant deposits.\n4. Ledger: 2-sided immutable double-entry accounting model.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Novunt Full Write-Up",
          action: () => navigatePath("/case-study/novunt"),
        },
      };
    }

    if (q.includes("sentinel") || (q.includes("cluster") && q.includes("spatial"))) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "📡 Sentinel AI Deep-Dive (Geospatial Threat Engine without Spatial DB):\n1. Boundary Resolution: Nearest-LGA matching using Haversine distance formula against static coordinate centroids (capped at 50km).\n2. Temporal Clustering: MongoDB query filters co-occurring threat keywords sharing location.lga within a 30-minute rolling window.\n3. Threat Scoring: Neural engine evaluates threat severity 0–10 combining cluster frequency & text context.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Sentinel AI Case Study",
          action: () => navigatePath("/case-study/sentinel-ai"),
        },
      };
    }

    if (q.includes("neyborhuud") || q.includes("sos ladder") || q.includes("postgis")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "🛡️ NeyborHuud Deep-Dive (Community Operating System):\n1. Geofencing: PostGIS spatial schemas map Nigerian states, LGAs, and wards.\n2. Self-Terminating SOS Escalation: T+0s User Alert → T+30s Emergency Contacts → T+60s Same-LGA Broadcast → T+90s Response Team Dispatch.\n3. Dynamic Trust Score: Range 0–1,000 (Base 300, ID verification +200, Misconduct penalty −300).",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read NeyborHuud Case Study",
          action: () => navigatePath("/case-study/neyborhuud"),
        },
      };
    }

    if (q.includes("stacks") || q.includes("token streaming") || q.includes("clarity")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "⚡ Stacks Token Streaming Deep-Dive (Bitcoin L2 Protocol):\n1. Decidable Smart Contract: Written in Clarity 3 with 100% test coverage using Clarinet.\n2. Real-Time Balance: Balance calculated on-the-fly via linear block velocity formula: stream = (current_block - start_block) * rate_per_block.\n3. State Machine: Implements Pause, Resume, and Revoke locks with ECDSA signatures.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Token Streaming Case Study",
          action: () => navigatePath("/case-study/stacks-token-streaming"),
        },
      };
    }

    if (q.includes("amm") || q.includes("dex") || q.includes("x*y=k") || q.includes("swap")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "📊 AMM DEX Deep-Dive (Bitcoin L2 Liquidity Protocol):\n1. Invariant Equation: Constant-product formula (x · y = k) maintains pool liquidity ratios.\n2. SIP-010 Standard: Mints & burns fungible LP tokens representing pool liquidity shares.\n3. Fee Split: 0.3% protocol swap fee distributed back to LP token holders.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read AMM DEX Case Study",
          action: () => navigatePath("/case-study/stacks-amm-dex"),
        },
      };
    }

    // --- 3. TIMELINES, DURATION & BUILD VELOCITY INTENT ---
    if (
      q.includes("how long") ||
      q.includes("finish an app") ||
      q.includes("finish") ||
      q.includes("take to build") ||
      q.includes("build time") ||
      q.includes("duration") ||
      q.includes("turnaround") ||
      q.includes("weeks") ||
      q.includes("delivery time") ||
      q.includes("when ready") ||
      q.includes("time to market")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Engineering timelines depend on product scope and complexity tier:\n• Sprint MVP: 3–5 Weeks (Fastest launch with core features)\n• Growth Platform: 8–12 Weeks (Full production web & mobile app)\n• Enterprise Systems: 16+ Weeks (Distributed microservices & high reliability)\n\nYou can use our Master Simulator to calculate exact engineering hours and timeline weeks for your specific product concept!",
        timestamp: getFormattedTime(),
        cta: {
          label: "Calculate Exact App Timeline",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // --- 4. MVP DEFINITION & STRATEGY INTENT ---
    if (
      q.includes("what is mvp") ||
      q.includes("explain mvp") ||
      q.includes("meaning of mvp") ||
      q.includes("definition of mvp") ||
      q.includes("why mvp") ||
      q === "mvp"
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "An MVP (Minimum Viable Product) is the leanest, fully functional version of your software product built to launch into market quickly with high-impact core features. At WEBMUSE, our Sprint MVP tier delivers a production-ready application in 3–5 weeks, allowing you to validate user demand and collect real feedback with minimal capital risk.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Sprint MVP Scope",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // --- 5. COST, PRICING & BUDGET INTENT ---
    if (
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("budget") ||
      q.includes("how much") ||
      q.includes("quote") ||
      q.includes("expensive") ||
      q.includes("rates")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Project investments are custom-tailored based on engineering scope, feature add-ons, scale targets, and launch velocity. We provide transparent sprint proposals with zero hidden fees. You can use our Master Simulator to calculate engineering hours and budget scope in real time!",
        timestamp: getFormattedTime(),
        cta: {
          label: "Calculate Scope & Budget",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // --- 6. BLOCKCHAIN & WEB3 INTENT ---
    if (
      q.includes("blockchain") ||
      q.includes("crypto") ||
      q.includes("web3") ||
      q.includes("smart contract") ||
      q.includes("solidity") ||
      q.includes("clarity") ||
      q.includes("bitcoin")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Yes, absolutely! WEBMUSE specializes in Web3 protocol engineering, smart contracts (Solidity for EVM & Clarity 3 for Bitcoin L2 Stacks), automated market maker (AMM) DEXs, continuous token streaming protocols, and wallet integrations. We have verified live case studies in Bitcoin L2 asset streaming and DEX liquidity pools.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Explore Web3 Case Studies",
          action: () => navigatePath("/case-study/stacks-token-streaming"),
        },
      };
    }

    // --- 7. MOBILE APP DEVELOPMENT INTENT ---
    if (
      q.includes("mobile") ||
      q.includes("ios") ||
      q.includes("android") ||
      q.includes("flutter") ||
      q.includes("react native") ||
      q.includes("app store") ||
      q.includes("google play")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Yes! WEBMUSE builds high-performance cross-platform mobile apps for iOS and Android using React Native, Flutter, and Next.js Progressive Web Apps (PWAs). We integrate offline background queues, Web Push notifications, location services, and native hardware features.",
        timestamp: getFormattedTime(),
        cta: {
          label: "View Mobile App Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    // --- 8. AI & NEURAL AGENTS INTENT ---
    if (
      q.includes("ai") ||
      q.includes("rag") ||
      q.includes("machine learning") ||
      q.includes("predictive") ||
      q.includes("neural") ||
      q.includes("agent") ||
      q.includes("model") ||
      q.includes("chatbot")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Yes! We engineer custom AI solutions including contextual RAG search agents, neural threat classifiers, vector embedding indices (Pinecone, Supabase Vector), and intelligent task automation. Check out Sentinel AI, our geospatial intelligence engine.",
        timestamp: getFormattedTime(),
        cta: {
          label: "View Sentinel AI Case Study",
          action: () => navigatePath("/case-study/sentinel-ai"),
        },
      };
    }

    // --- 9. FINTECH & SECURITY INTENT ---
    if (
      q.includes("fintech") ||
      q.includes("security") ||
      q.includes("payment") ||
      q.includes("stripe") ||
      q.includes("bank") ||
      q.includes("nowpayments")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "We engineer strict zero-trust security architecture:\n• Fintech & Banking: Layered idempotency, double-entry ledgers, atomic deposit claims, and threshold-gated withdrawals (as built in Novunt).\n• Enterprise Safety: Geofenced anti-spoof compliance and NDPR/GDPR posture (as built in Seth HSE).",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Novunt Case Study",
          action: () => navigatePath("/case-study/novunt"),
        },
      };
    }

    // --- 10. POST-LAUNCH MAINTENANCE & SUPPORT INTENT ---
    if (
      q.includes("maintenance") ||
      q.includes("support") ||
      q.includes("after launch") ||
      q.includes("post launch") ||
      q.includes("hosting") ||
      q.includes("uptime") ||
      q.includes("sla")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Yes! Every platform built by WEBMUSE includes post-launch support, sub-4-hour SLA response guarantees, automated core vitals monitoring, database backup routines, and seamless Vercel/AWS infrastructure scaling.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Check System Uptime Telemetry",
          action: () => navigatePath("/status"),
        },
      };
    }

    // --- 11. LOCATION & STUDIO HUBS INTENT ---
    if (
      q.includes("where") ||
      q.includes("location") ||
      q.includes("located") ||
      q.includes("office") ||
      q.includes("london") ||
      q.includes("new york") ||
      q.includes("tokyo") ||
      q.includes("country")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "WEBMUSE operates globally with our main studio HQ in London, UK, alongside engineering hubs in New York and Tokyo. We work seamlessly with clients worldwide across all global timezones.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Contact Studio Hubs",
          action: () => navigateAnchor("#contact"),
        },
      };
    }

    // --- 12. FOUNDERS & LEADERSHIP INTENT ---
    if (
      q.includes("team") ||
      q.includes("founder") ||
      q.includes("marteen") ||
      q.includes("florence") ||
      q.includes("mubaraq") ||
      q.includes("atere") ||
      q.includes("who leads") ||
      q.includes("who owns")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "WEBMUSE was co-founded by Marteen Motun Mubaraq (Co-Founder & Chief Product Architect) and Oluwatosin Florence Atere (Co-Founder & Chief Systems Engineer), guiding dedicated engineering teams across London, New York, and Tokyo.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Meet the Leadership",
          action: () => navigateAnchor("#team"),
        },
      };
    }

    // --- 13. BOOKING & CONSULTATION INTENT ---
    if (
      q.includes("book") ||
      q.includes("schedule") ||
      q.includes("consult") ||
      q.includes("call") ||
      q.includes("meet") ||
      q.includes("contact")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "You can schedule a 1-on-1 strategy and architecture consultation directly with our lead architects. Select your project category, preferred date, and receive an instant booking confirmation ticket.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Book Strategy Call",
          action: () => navigateAnchor("#booking"),
        },
      };
    }

    // --- 14. SERVICES OVERVIEW INTENT ---
    if (q.includes("service") || q.includes("what do you do") || q.includes("offer")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "WEBMUSE specializes in 6 core engineering verticals:\n• Custom Web Applications & SaaS (Next.js 16, Node.js)\n• AI Solutions & Intelligent Agents\n• Cross-Platform Mobile Apps (Flutter, React Native)\n• Web3 & Smart Contracts (Solidity, Clarity 3)\n• Cloud Architecture & Microservices (AWS, GCP, Vercel)\n• UI/UX Strategy & Systems Architecture",
        timestamp: getFormattedTime(),
        cta: {
          label: "View All Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    // --- 15. GREETINGS & PLEASANTRIES ---
    if (q === "hi" || q === "hello" || q === "hey" || q.includes("good morning") || q.includes("good afternoon")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Hello! Welcome to WEBMUSE. I'm your Autonomous Lead Architect. Ask me anything about building custom web/mobile apps, AI agents, Web3 protocols, project timelines, or describe an idea for an instant blueprint!",
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Product Concept",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // --- 16. GENERAL DYNAMIC FALLBACK ---
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `Yes! WEBMUSE engineers custom digital platforms, mobile apps, AI systems, and Web3 protocols tailored to your exact requirements. You can describe your product concept in our Master Simulator or book a consultation with our lead architects.`,
      timestamp: getFormattedTime(),
      cta: {
        label: "Simulate Product Blueprint",
        action: () => navigateAnchor("#vault"),
      },
    };
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setCursorType("pointer")}
          onMouseLeave={() => setCursorType("default")}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full border border-electric-blue/40 bg-card-bg/90 backdrop-blur-md shadow-xl text-foreground font-mono text-xs hover:border-electric-blue hover:bg-card-bg transition-all group"
          aria-label="Open WEBMUSE Autonomous Lead Architect"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="h-4.5 w-4.5 text-electric-blue group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-semibold tracking-wider uppercase text-[11px]">Ask WEBMUSE</span>
        </motion.button>
      )}

      {/* Expandable Glassmorphic Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[560px] rounded-2xl border border-card-border bg-[#09090c]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden font-mono"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-card-border/80 bg-black/40">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg border border-electric-blue/30 bg-electric-blue/10 text-electric-blue">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-text-title tracking-tight flex items-center gap-1.5">
                    WEBMUSE Concierge
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </h2>
                  <p className="text-[10px] text-text-muted font-light">Autonomous Lead Architect</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([messages[0]])}
                  className="p-1 text-text-muted hover:text-foreground rounded transition-colors"
                  title="Clear Conversation"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-text-muted hover:text-foreground rounded transition-colors"
                  title="Close Assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-6 w-6 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3" />
                    </div>
                  )}
                  <div className={`max-w-[85%] space-y-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`p-3 rounded-xl leading-relaxed whitespace-pre-line text-xs ${
                        msg.sender === "user"
                          ? "bg-electric-blue text-white rounded-br-none font-sans"
                          : "bg-card-bg/80 border border-card-border/80 text-foreground rounded-bl-none font-mono"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.cta && (
                      <button
                        onClick={msg.cta.action}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-electric-blue/40 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/20 text-[10px] font-bold uppercase tracking-wider transition-colors mt-1"
                      >
                        <span>{msg.cta.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    <span className="text-[9px] text-zinc-500 block px-1">{msg.timestamp}</span>
                  </div>
                  {msg.sender === "user" && (
                    <div className="h-6 w-6 rounded-full border border-card-border bg-card-bg text-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-6 w-6 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                  </div>
                  <div className="p-3 rounded-xl bg-card-bg/80 border border-card-border/80 text-text-muted text-xs flex items-center gap-1 font-mono">
                    <span>Synthesizing architectural analysis...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-ping" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Pills */}
            <div className="px-3 py-2 border-t border-card-border/60 bg-black/20 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {STARTER_PROMPTS.map((promptText) => (
                <button
                  key={promptText}
                  onClick={() => handleSend(promptText)}
                  onMouseEnter={() => setCursorType("pointer")}
                  onMouseLeave={() => setCursorType("default")}
                  className="px-2.5 py-1 rounded-full border border-card-border/70 bg-card-bg/40 text-text-muted hover:text-foreground hover:border-electric-blue/40 text-[10px] whitespace-nowrap transition-colors"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-card-border/80 bg-black/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask technical questions or describe an app concept..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder-zinc-500 outline-none px-2 py-1"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim()}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="p-2 rounded-lg bg-electric-blue text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
