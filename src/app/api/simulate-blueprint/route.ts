import { NextRequest, NextResponse } from "next/server";

interface BlueprintPayload {
  prompt?: string;
  scale?: "mvp" | "growth" | "enterprise";
  velocity?: "sprint" | "balanced" | "robust";
}

interface BlueprintResult {
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

export async function POST(req: NextRequest) {
  let body: BlueprintPayload = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  const scale = body.scale || "growth";
  const velocity = body.velocity || "balanced";

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }

  // Pure dynamic heuristic engineering simulator
  const blueprint = generateHeuristicBlueprint(prompt, scale, velocity);
  return NextResponse.json(blueprint);
}

function generateHeuristicBlueprint(
  prompt: string,
  scale: "mvp" | "growth" | "enterprise",
  velocity: "sprint" | "balanced" | "robust"
): BlueprintResult {
  const p = prompt.toLowerCase();
  
  let category = "SaaS & Digital Platform";
  let frontend = "Next.js 16 (App Router) + Tailwind CSS";
  let backend = "Node.js (TypeScript / Express) + REST/GraphQL";
  let database = "PostgreSQL (Prisma ORM) + Redis Cache";
  let cloud = "Vercel Edge Platform + AWS S3";
  
  let audience = "Consumer & SMB user groups demanding sub-100ms response times and intuitive onboarding.";
  let edge = "Zero-bundle edge rendering with pre-warmed database connection pools.";
  let validation = "Deploy automated split-testing on landing CTA variants and telemetry heatmaps.";
  let risk = "Third-party API throttling and high concurrent state mutation overhead.";
  let mitigation = "Implement resilient queue workers with exponential backoff and localized client state caching.";

  if (p.includes("ai") || p.includes("predict") || p.includes("model") || p.includes("gpt") || p.includes("agent")) {
    category = "AI-Driven Cognitive System";
    frontend = scale === "enterprise" ? "Next.js 16 + Redux Toolkit + WebGL Telemetry" : "Next.js 16 + Neural AI SDK";
    backend = "FastAPI (Asynchronous Python) + LangChain / LlamaIndex";
    database = "Supabase Vector / Pinecone + PostgreSQL";
    cloud = "Cloud Vertex Container + Docker Infrastructure";
    audience = "Enterprise operational teams seeking automated cognitive synthesis and workflow execution.";
    edge = "Proprietary vector cache engine reducing model latency by 60% and cutting token consumption costs.";
    validation = "Deploy synthetic benchmark prompts to verify accuracy metrics and token saturation levels.";
    risk = "Model context window limit bottlenecks under high concurrent loads.";
    mitigation = "Implement prompt chunking pipelines, local vector embedding indices, and strict rate-limiting.";
  } else if (p.includes("web3") || p.includes("defi") || p.includes("crypto") || p.includes("chain") || p.includes("token")) {
    category = "Decentralized Web3 & Ledger Protocol";
    frontend = "React + Viem + Wagmi Hooks + RainbowKit";
    backend = "Solidity / Clarity Smart Contracts + Foundry / Clarinet";
    database = "The Graph (IPFS Indexer) + TimescaleDB";
    cloud = "Alchemy RPC Nodes + IPFS Decentralized Storage";
    audience = "DeFi users, liquidity providers, and web3 protocol participants seeking non-custodial asset streams.";
    edge = "Gas-sponsored transaction relayer providing users with a frictionless gasless experience.";
    validation = "Deploy contracts to testnets and run continuous fuzzing test suites with automated gas audits.";
    risk = "Reentrancy vulnerabilities, oracle pricing latency, and front-running risks.";
    mitigation = "Integrate OpenZeppelin audited base contracts, reentrancy guards, and Chainlink decentralized oracles.";
  } else if (p.includes("health") || p.includes("med") || p.includes("patient") || p.includes("clinic")) {
    category = "Telehealth & Medical Data Platform";
    frontend = "Next.js PWA + WebRTC Audio/Video SDK";
    backend = "NestJS (TypeScript Microservices) + HIPAA Audit Engine";
    database = "PostgreSQL (Encrypted at rest) + Redis";
    cloud = "AWS HIPAA Compliant Infrastructure + Cloudflare TLS 1.3";
    audience = "Patients and healthcare practitioners requiring real-time consultation and HIPAA-compliant data access.";
    edge = "End-to-end encrypted WebRTC media pipes and zero-knowledge database field security.";
    validation = "Conduct security penetration audits and patient onboarding friction tests.";
    risk = "PHI data compliance breach risk and video stream jitter over low-bandwidth cellular networks.";
    mitigation = "Implement zero-trust field encryption, NDPR/GDPR privacy controls, and adaptive bitrate WebRTC.";
  }

  let baseHours = scale === "mvp" ? 180 : scale === "growth" ? 340 : 800;
  let baseWeeks = scale === "mvp" ? 5 : scale === "growth" ? 9 : 18;

  if (velocity === "sprint") baseWeeks = Math.max(3, Math.round(baseWeeks * 0.7));
  if (velocity === "robust") baseWeeks = Math.round(baseWeeks * 1.3);

  const hoursMin = Math.round(baseHours * 0.9);
  const hoursMax = Math.round(baseHours * 1.15);

  const sprintWeeks = Math.max(1, Math.round(baseWeeks / 3));

  return {
    title: `${category}: ${prompt.slice(0, 45)}${prompt.length > 45 ? "..." : ""}`,
    marketValidation: {
      targetAudience: audience,
      competitorEdge: edge,
      validationLoop: validation,
    },
    tech: {
      frontend,
      backend,
      database,
      cloud,
    },
    roadmap: [
      `Phase 1 (Ideation & Scaffold): Core schema definition, endpoint mapping, and base scaffold. (Weeks 1-${sprintWeeks})`,
      `Phase 2 (Engine Architecture): Core business logic implementation, security layers, and integrations. (Weeks ${sprintWeeks + 1}-${sprintWeeks * 2})`,
      `Phase 3 (Optimization & Edge Deploy): Core vitals audit, end-to-end testing, and production Edge launch. (Weeks ${sprintWeeks * 2 + 1}-${baseWeeks})`,
    ],
    financials: {
      timeline: `${baseWeeks} Weeks`,
      costRange: "Available on Request",
      hours: `${hoursMin} - ${hoursMax} Engineering Hours`,
    },
    risks: {
      technical: risk,
      mitigation,
    },
  };
}
