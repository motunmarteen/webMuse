"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { audioSynth } from "@/utils/audioSynth";
import { 
  Terminal as TerminalIcon, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Loader2, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2 
} from "lucide-react";

interface IdeaAnalysis {
  title: string;
  marketValidation: {
    targetAudience: string;
    competitorEdge: string;
    validationLoop: string;
  };
  tech: { frontend: string; backend: string; database: string; cloud: string };
  roadmap: string[];
  financials: {
    timeline: string;
    costRange: string;
    hours: string;
  };
  risks: {
    technical: string;
    mitigation: string;
  };
}

const calculateBlueprint = (
  baseType: "ai" | "web3" | "saas" | "general",
  scale: "mvp" | "growth" | "enterprise",
  velocity: "sprint" | "balanced" | "robust"
): IdeaAnalysis => {
  let title = "High-Scale Modern Enterprise Web Application";
  let audience = "Consumer-facing digital brands requiring seamless onboarding, accessibility, and high performance.";
  let edge = "Core Web Vitals optimized out-of-the-box (98+ performance index), boosting search engine ranks.";
  let validation = "Release mock layouts to user focus groups to measure interaction friction.";
  
  let tech = {
    frontend: "Next.js App Router + Tailwind CSS",
    backend: "Express (Node.js) / FastAPI (Python)",
    database: "PostgreSQL / MongoDB Atlas",
    cloud: "Vercel Edge Platform + AWS S3 File Storage"
  };

  let risk = "Asset rendering delays on slow cellular connections and accessibility compliance drop-offs.";
  let mitigation = "Incorporate next-gen asset compressions, implement prefetching links, and verify WCAG compliance.";

  // Base configurations
  if (baseType === "ai") {
    title = "AI-Powered Cognitive Application";
    audience = "Enterprise data teams & product managers looking to automate context analysis and cognitive classification.";
    edge = "Proprietary vector cache engine that reduces API querying latency by 60% and token overhead costs.";
    validation = "Deploy a lightweight API prototype to 50 target developers to evaluate token accuracy and user response time metrics.";
    risk = "High model token consumption overheads and context window saturation under concurrent load.";
    mitigation = "Implement strict client-side rate limits, aggregate duplicate search vectors, and establish fallback rules.";
    
    if (scale === "mvp") {
      tech = {
        frontend: "Next.js 16 (React Compiler) + Vercel AI SDK",
        backend: "FastAPI + LangChain",
        database: "Supabase Vector + PostgreSQL",
        cloud: "Vercel Serverless + OpenAI APIs"
      };
    } else if (scale === "growth") {
      tech = {
        frontend: "Next.js 16 (App Router) + Framer Motion",
        backend: "FastAPI (Asynchronous Python) + LangChain",
        database: "Pinecone (Vector Index) + PostgreSQL",
        cloud: "Google Cloud Vertex AI + Docker Containers"
      };
    } else {
      tech = {
        frontend: "Next.js 16 + Redux Toolkit + WebGL Telemetry",
        backend: "Go Microservices + Python Ray Cluster",
        database: "Milvus Distributed Vector DB + PostgreSQL Clustered + Redis",
        cloud: "GCP Vertex AI + GKE (Kubernetes Engine) + Terraform"
      };
    }
  } else if (baseType === "web3") {
    title = "Decentralized Ledger & Web3 Platform";
    audience = "DeFi liquidity providers, protocol builders, and users seeking secure peer-to-peer asset staking.";
    edge = "Gas-sponsored transaction relayers providing users with an entirely gasless client interface.";
    validation = "Deploy Solidity codes to Sepolia testnet and launch a public sandboxed bug-bounty program.";
    risk = "Reentrancy attack vectors, contract overflow bugs, and oracle pricing latency errors.";
    mitigation = "Integrate OpenZeppelin audited libraries, run extensive unit coverage, and schedule third-party contract audits.";

    if (scale === "mvp") {
      tech = {
        frontend: "React + Ethers.js + WalletConnect",
        backend: "Solidity + Hardhat Engine",
        database: "PostgreSQL (Transactional)",
        cloud: "Alchemy RPC Node + Vercel Hosting"
      };
    } else if (scale === "growth") {
      tech = {
        frontend: "Next.js + Ethers.js + Wagmi Hooks",
        backend: "Solidity Smart Contracts + Hardhat Engine",
        database: "The Graph (IPFS Indexer) + PostgreSQL",
        cloud: "Alchemy Web3 Node Hubs + IPFS Storage"
      };
    } else {
      tech = {
        frontend: "Next.js App Router + RainbowKit + Viem",
        backend: "Solidity Custom Smart Contracts + Foundry Framework",
        database: "The Graph Custom Subgraphs + TimescaleDB (Time-series Log)",
        cloud: "Multi-Node Private RPC Clusters + IPFS/Arweave Decentralized Storage"
      };
    }
  } else if (baseType === "saas") {
    title = "High-Performance SaaS Marketplace Platform";
    audience = "B2B service providers, logistics operations, or geolocated suppliers seeking secure billing networks.";
    edge = "Real-time geographical routing API nodes combined with peer contract matching engines.";
    validation = "Deploy a static sign-up validation landing page to target cohorts to verify feature interest.";
    risk = "Friction in offline mobile environments and geolocating precision errors in remote regions.";
    mitigation = "Configure local storage sync schemas for offline availability and integrate geocoding map fallbacks.";

    if (scale === "mvp") {
      tech = {
        frontend: "React + Tailwind CSS",
        backend: "Node.js (Express)",
        database: "PostgreSQL + Supabase Auth",
        cloud: "Vercel / Render App Service"
      };
    } else if (scale === "growth") {
      tech = {
        frontend: "React PWA + Tailwind CSS + Lucide Icons",
        backend: "Node.js (TypeScript) + Express API Server",
        database: "PostgreSQL (Transactional) + Redis Cache",
        cloud: "AWS Elastic Container Service + Cloudflare CDN"
      };
    } else {
      tech = {
        frontend: "Next.js 16 Multi-tenant Architecture + Tailwind CSS",
        backend: "Node.js Microservices (NestJS) + RabbitMQ",
        database: "PostgreSQL Cluster (AWS Aurora) + Redis Cluster",
        cloud: "AWS EKS (Kubernetes) + Terraform Infrastructure + AWS CloudFront"
      };
    }
  } else {
    if (scale === "mvp") {
      tech = {
        frontend: "Next.js Static (Vite) + Tailwind CSS",
        backend: "Node.js (Express)",
        database: "Supabase / PostgreSQL",
        cloud: "Vercel Edge Platform"
      };
    } else if (scale === "growth") {
      tech = {
        frontend: "Next.js App Router + Tailwind CSS",
        backend: "Express (Node.js) / FastAPI (Python)",
        database: "PostgreSQL / MongoDB Atlas",
        cloud: "Vercel Edge Platform + AWS S3 File Storage"
      };
    } else {
      tech = {
        frontend: "Next.js Enterprise Design + Tailwind CSS v4",
        backend: "NestJS Microservices Architecture",
        database: "PostgreSQL Multi-Region + Redis Distributed Cache",
        cloud: "AWS Enterprise Landing Zone (EKS, RDS, S3) + Cloudflare Enterprise CDN"
      };
    }
  }

  // Hours and timeline calculations based on scale & velocity
  let baseHours = 180;
  let baseWeeks = 6;

  if (scale === "mvp") {
    baseHours = 180;
    baseWeeks = 5;
  } else if (scale === "growth") {
    baseHours = 340;
    baseWeeks = 10;
  } else {
    baseHours = 850;
    baseWeeks = 20;
  }

  // Adjustments based on project type complexity multiplier
  let multiplier = 1.0;
  if (baseType === "ai") multiplier = 1.2;
  if (baseType === "web3") multiplier = 1.35;
  if (baseType === "saas") multiplier = 1.1;

  baseHours *= multiplier;
  baseWeeks *= multiplier;

  // Adjustments based on launch velocity
  if (velocity === "sprint") {
    baseWeeks = Math.max(3, Math.round(baseWeeks * 0.7));
  } else if (velocity === "robust") {
    baseWeeks = Math.round(baseWeeks * 1.25);
  }

  const hoursMin = Math.round(baseHours * 0.9);
  const hoursMax = Math.round(baseHours * 1.1);

  const financials = {
    timeline: `${baseWeeks} Weeks`,
    costRange: "Available on Request",
    hours: `${hoursMin} - ${hoursMax} Engineering Hours`
  };

  const sprintWeeks = Math.max(1, Math.round(baseWeeks / 3));
  const roadmap = [
    `Phase 1 (Ideation & Scaffold): Model schemas, map endpoints, and deploy baseline. (Weeks 1-${sprintWeeks})`,
    `Phase 2 (Core Architecture): Implement primary engine code, validation hooks, and security layers. (Weeks ${sprintWeeks + 1}-${sprintWeeks * 2})`,
    `Phase 3 (Polishing & Edge Deploy): Audit core vitals, connect integration hooks, and go live on Edge. (Weeks ${sprintWeeks * 2 + 1}-${baseWeeks})`
  ];

  return {
    title,
    marketValidation: {
      targetAudience: audience,
      competitorEdge: edge,
      validationLoop: validation
    },
    tech,
    roadmap,
    financials,
    risks: {
      technical: risk,
      mitigation: mitigation
    }
  };
};

const SUGGESTIONS = [
  "Predictive ML model for shipping routes",
  "DeFi asset lending and staking platform",
  "Uber for farmers geolocated matching platform",
];

const classifyPrompt = (prompt: string): "ai" | "web3" | "saas" | "general" => {
  const lower = prompt.toLowerCase();
  if (lower.includes("ai") || lower.includes("predict") || lower.includes("model") || lower.includes("intelligence") || lower.includes("machine learning")) {
    return "ai";
  }
  if (lower.includes("web3") || lower.includes("defi") || lower.includes("contract") || lower.includes("crypto") || lower.includes("blockchain")) {
    return "web3";
  }
  if (lower.includes("saas") || lower.includes("crm") || lower.includes("dashboard") || lower.includes("marketplace") || lower.includes("uber") || lower.includes("farmer") || lower.includes("b2b") || lower.includes("collaboration") || lower.includes("workspace")) {
    return "saas";
  }
  return "general";
};

export default function IdeaVault({ onBlueprintCreated }: { onBlueprintCreated: (desc: string) => void }) {
  const [prompt, setPrompt] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  const [analyzing, setAnalyzing] = useState(false);
  const [scale, setScale] = useState<"mvp" | "growth" | "enterprise">("growth");
  const [velocity, setVelocity] = useState<"sprint" | "balanced" | "robust">("balanced");
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  
  const [activeAnalysis, setActiveAnalysis] = useState<IdeaAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<"validation" | "tech" | "roadmap" | "financials" | "risks">("validation");
  const { setCursorType } = useCursor();

  // Instant, non-animated preview of the blueprint shown before the user runs
  // the full "Simulate" diagnostic sequence, so the results panel is never
  // empty. Falls back to a generic sample when the prompt is blank.
  const previewAnalysis = useMemo(() => {
    const effectivePrompt = prompt.trim() || SUGGESTIONS[0];
    const baseType = classifyPrompt(effectivePrompt);
    return calculateBlueprint(baseType, scale, velocity);
  }, [prompt, scale, velocity]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing simulator effect
  useEffect(() => {
    const phrases = [
      "DeFi asset lending and staking platform...",
      "Uber for farmers geolocated matching platform...",
      "Predictive ML model for shipping routes...",
      "AI-powered SaaS collaborative workspace..."
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentPhrase = phrases[phraseIdx];
      if (!isDeleting) {
        setPlaceholderText(currentPhrase.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentPhrase.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200); // Hold phrase
        } else {
          timer = setTimeout(tick, 50 + Math.random() * 30); // Typing speed
        }
      } else {
        setPlaceholderText(currentPhrase.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = setTimeout(tick, 500); // Pause before next phrase
        } else {
          timer = setTimeout(tick, 15); // Deleting speed
        }
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnalyze = () => {
    if (!prompt.trim()) return;

    setAnalyzing(true);
    setActiveAnalysis(null);
    setLoadingLogs([]);
    audioSynth.playClick();

    const logLines = [
      `[info] parsing client raw input concepts...`,
      `[info] matching target cohorts and customer profiles...`,
      `[info] calculating tech stacks for ${scale.toUpperCase()} scale...`,
      `[info] configuring database constraints and indexing schemas...`,
      `[info] scheduling sprints for ${velocity.toUpperCase()} velocity...`,
      `[success] compiled architectural blueprint parameters.`,
    ];

    let currentLineIndex = 0;
    
    const printNextLine = () => {
      if (currentLineIndex < logLines.length) {
        const nextLine = logLines[currentLineIndex];
        setLoadingLogs((prev) => [...prev, nextLine]);
        audioSynth.playTypeTick();
        currentLineIndex++;
        
        setTimeout(printNextLine, 350 + Math.random() * 150);
      } else {
        setTimeout(() => {
          const baseType = classifyPrompt(prompt);
          const dynamicAnalysis = calculateBlueprint(baseType, scale, velocity);
          setActiveAnalysis(dynamicAnalysis);
          setAnalyzing(false);
          setActiveTab("validation");
          audioSynth.playSuccess();
        }, 500);
      }
    };

    printNextLine();
  };

  const handleSuggestionClick = (sug: string) => {
    audioSynth.playClick();
    setPrompt(sug);
  };

  const transferToBooking = () => {
    if (!activeAnalysis) return;
    audioSynth.playClick();
    const details = `Concept Simulator: ${activeAnalysis.title}. Brief description: "${prompt}". Blueprint: Stack=${activeAnalysis.tech.frontend} + ${activeAnalysis.tech.backend}, Scale=${scale.toUpperCase()}, Velocity=${velocity.toUpperCase()}, Timeline=${activeAnalysis.financials.timeline}, Cost=${activeAnalysis.financials.costRange}.`;
    onBlueprintCreated(details);
    
    const bookingSec = document.getElementById("booking");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="vault" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      <div className="absolute top-[40%] left-[80%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-10 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8 md:mb-16">
          <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
            IDEAS TO MARKET SIMULATOR
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4">
            Simulate your product roadmap.
          </h2>
          <p className="text-text-muted font-light mt-6 text-lg leading-relaxed">
            Enter your product concept (e.g. &quot;Uber for farmers&quot; or &quot;DeFi staking pool&quot;) to immediately simulate target validation loops, technical stacks, sprint roadmaps, cost estimates, and risk mitigations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Prompt Terminal */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-card-border bg-card-bg p-6 md:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-card-border pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-4.5 w-4.5 text-electric-blue" />
                  <span className="text-xs font-mono font-bold text-text-muted tracking-wider">
                    WEBMUSE Simulator v3.0
                  </span>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="relative h-[140px] w-full">
                <label htmlFor="idea-vault-prompt" className="sr-only">Describe your product idea</label>
                <textarea
                  id="idea-vault-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-full bg-transparent text-sm font-mono text-foreground border-none outline-none resize-none focus:ring-0 p-0 relative z-10"
                />
                {!prompt && (
                  <div className="absolute inset-0 pointer-events-none text-sm font-mono text-zinc-500 p-0 flex items-start" aria-hidden="true">
                    <span>{placeholderText}</span>
                    {isCursorVisible && (
                      <span className="w-1.5 h-3.5 bg-electric-blue ml-0.5 mt-[3.5px]" />
                    )}
                  </div>
                )}
              </div>

              {/* Dynamic Parameter Configurations */}
              <div className="border-t border-card-border pt-4 mt-2 space-y-4">
                {/* Target Scale */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2 flex justify-between">
                    <span>Target Scaling Parameters</span>
                    <span className="text-electric-blue font-bold">{scale.toUpperCase()}</span>
                  </span>
                  <div role="group" aria-label="Target Scaling Parameters" className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-card-border bg-black/40">
                    {([
                      { id: "mvp", label: "MVP" },
                      { id: "growth", label: "Growth" },
                      { id: "enterprise", label: "Enterprise" }
                    ] as const).map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={scale === s.id}
                        onClick={() => {
                          audioSynth.playClick();
                          setScale(s.id);
                        }}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className={`py-1 text-[10px] font-semibold uppercase tracking-wider font-mono rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                          scale === s.id
                            ? "bg-foreground text-background font-bold"
                            : "text-text-muted hover:text-foreground hover:bg-card-bg/30"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Development Velocity */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2 flex justify-between">
                    <span>Development Velocity</span>
                    <span className="text-neon-purple font-bold">{velocity.toUpperCase()}</span>
                  </span>
                  <div role="group" aria-label="Development Velocity" className="grid grid-cols-3 gap-1.5 p-1 rounded-lg border border-card-border bg-black/40">
                    {([
                      { id: "sprint", label: "Sprint" },
                      { id: "balanced", label: "Balanced" },
                      { id: "robust", label: "Robust" }
                    ] as const).map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        aria-pressed={velocity === v.id}
                        onClick={() => {
                          audioSynth.playClick();
                          setVelocity(v.id);
                        }}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className={`py-1 text-[10px] font-semibold uppercase tracking-wider font-mono rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-1 ${
                          velocity === v.id
                            ? "bg-foreground text-background font-bold"
                            : "text-text-muted hover:text-foreground hover:bg-card-bg/30"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tag suggestions */}
              <div className="mt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-2">
                  Suggestions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => handleSuggestionClick(sug)}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="text-[10px] font-mono bg-card-bg hover:bg-card-bg/85 border border-card-border text-text-muted hover:text-foreground px-2.5 py-1 rounded transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-card-border pt-6 flex flex-col gap-4">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !prompt.trim()}
                onMouseEnter={() => setCursorType("pointer")}
                onMouseLeave={() => setCursorType("default")}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:pointer-events-none"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-electric-blue" />
                    Running Diagnostics...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-electric-blue" />
                    Simulate Product Roadmap
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Diagnostic Results Dashboard */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-card-border bg-card-bg/40 p-6 md:p-8 relative min-h-[420px]">
            <AnimatePresence mode="wait">
              {analyzing && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-background/60 backdrop-blur-sm z-10"
                >
                  <div className="relative flex items-center justify-center mb-4">
                    <div className="h-16 w-16 rounded-full border-2 border-card-border border-t-electric-blue animate-spin" />
                    <TerminalIcon className="absolute h-6 w-6 text-electric-blue" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-text-title uppercase mb-4">
                    Running market simulation
                  </span>
                  <div className="text-text-muted text-xs font-mono max-w-sm mt-3 flex flex-col gap-1 text-left border border-card-border bg-black/60 p-4 rounded-lg w-full h-[140px] overflow-y-auto">
                    {loadingLogs.map((log, index) => (
                      <div key={index} className="transition-all duration-300">
                        {log}
                      </div>
                    ))}
                    <div className="h-2 w-1.5 bg-electric-blue animate-pulse inline-block" />
                  </div>
                </motion.div>
              )}

              {!analyzing && (() => {
                const displayAnalysis = activeAnalysis ?? previewAnalysis;
                const isLivePreview = !activeAnalysis;
                return (
                <motion.div
                  key={isLivePreview ? "preview" : "results"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    <div className="border-b border-card-border pb-4 mb-6 flex items-start justify-between gap-4">
                      <div>
                        <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${isLivePreview ? "text-text-muted" : "text-electric-blue"}`}>
                          {isLivePreview ? "LIVE PREVIEW" : "ROADMAP PROJECTIONS GENERATED"}
                        </span>
                        <h3 className="text-2xl font-bold text-text-title tracking-tight mt-1">
                          {displayAnalysis.title}
                        </h3>
                      </div>
                      {isLivePreview && (
                        <span className="shrink-0 flex items-center gap-1.5 rounded-full border border-card-border bg-card-bg px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-text-muted">
                          <span className="h-1.5 w-1.5 rounded-full bg-electric-blue animate-pulse" />
                          Example
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 border-b border-card-border pb-4 mb-6">
                      {([
                        { id: "validation", label: "Validation" },
                        { id: "tech", label: "Tech Stack" },
                        { id: "roadmap", label: "MVP Roadmap" },
                        { id: "financials", label: "Financials" },
                        { id: "risks", label: "Risks" }
                      ] as const).map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            audioSynth.playClick();
                            setActiveTab(tab.id);
                          }}
                          onMouseEnter={() => setCursorType("pointer")}
                          onMouseLeave={() => setCursorType("default")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 font-mono ${
                            activeTab === tab.id
                              ? "bg-card-bg text-foreground border border-card-border"
                              : "text-text-muted hover:text-foreground border border-transparent"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[180px] text-sm text-foreground/90 leading-relaxed font-light">
                      
                      {activeTab === "validation" && (
                        <div className="flex flex-col gap-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Target Audience
                            </span>
                            <p className="text-foreground text-sm font-light leading-relaxed">
                              {displayAnalysis.marketValidation.targetAudience}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Competitor Edge
                            </span>
                            <p className="text-foreground text-sm font-light leading-relaxed">
                              {displayAnalysis.marketValidation.competitorEdge}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Validation Loop
                            </span>
                            <p className="text-foreground text-sm font-light leading-relaxed">
                              {displayAnalysis.marketValidation.validationLoop}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === "tech" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 rounded-lg border border-card-border bg-card-bg/20">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Frontend
                            </span>
                            <span className="text-foreground text-xs font-mono">{displayAnalysis.tech.frontend}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-card-border bg-card-bg/20">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Backend
                            </span>
                            <span className="text-foreground text-xs font-mono">{displayAnalysis.tech.backend}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-card-border bg-card-bg/20">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Database
                            </span>
                            <span className="text-foreground text-xs font-mono">{displayAnalysis.tech.database}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-card-border bg-card-bg/20">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block mb-1">
                              Hosting / Cloud
                            </span>
                            <span className="text-foreground text-xs font-mono">{displayAnalysis.tech.cloud}</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "roadmap" && (
                        <ul className="flex flex-col gap-3">
                          {displayAnalysis.roadmap.map((p) => (
                            <li key={p} className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4.5 w-4.5 text-electric-blue shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {activeTab === "financials" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg border border-card-border bg-card-bg/20 flex flex-col justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                              Release Timeline
                            </span>
                            <span className="text-lg font-bold text-text-title mt-2 font-mono">{displayAnalysis.financials.timeline}</span>
                          </div>
                          <div className="p-4 rounded-lg border border-card-border bg-card-bg/20 flex flex-col justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                              Budget Scope
                            </span>
                            <span className="text-lg font-bold text-electric-blue mt-2 font-mono">{displayAnalysis.financials.costRange}</span>
                          </div>
                          <div className="p-4 rounded-lg border border-card-border bg-card-bg/20 flex flex-col justify-between">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                              Engineering Size
                            </span>
                            <span className="text-xs font-semibold text-text-title mt-2 font-mono leading-tight">{displayAnalysis.financials.hours}</span>
                          </div>
                        </div>
                      )}

                      {activeTab === "risks" && (
                        <div className="flex flex-col gap-4">
                          <div className="p-4 rounded-lg border border-red-500/10 bg-red-500/[0.01] flex flex-col gap-2">
                            <h4 className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
                              <ShieldAlert className="h-4 w-4" />
                              Primary Technical Risk
                            </h4>
                            <p className="text-foreground text-sm font-light leading-relaxed">
                              {displayAnalysis.risks.technical}
                            </p>
                          </div>
                          <div className="p-4 rounded-lg border border-card-border bg-card-bg/20 flex flex-col gap-2">
                            <h4 className="text-xs font-mono font-bold tracking-widest text-text-title uppercase flex items-center gap-1.5">
                              <TrendingUp className="h-4 w-4 text-electric-blue" />
                              WEBMUSE Mitigation Strategy
                            </h4>
                            <p className="text-foreground text-sm font-light leading-relaxed">
                              {displayAnalysis.risks.mitigation}
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="mt-8 border-t border-card-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-text-muted text-xs max-w-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>
                        {isLivePreview
                          ? "This is a live example. Hit “Simulate Product Roadmap” to generate your own blueprint."
                          : "Blueprints show conceptual parameters. Full scope validation requires consultation."}
                      </span>
                    </div>
                    {isLivePreview ? (
                      <button
                        onClick={handleAnalyze}
                        disabled={!prompt.trim()}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-electric-blue transition-colors font-mono whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
                      >
                        Simulate This Idea
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={transferToBooking}
                        onMouseEnter={() => setCursorType("pointer")}
                        onMouseLeave={() => setCursorType("default")}
                        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-electric-blue transition-colors font-mono whitespace-nowrap"
                      >
                        Refine in Consultation
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
