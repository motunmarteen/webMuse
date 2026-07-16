"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursor";
import { Sparkles, Link as LinkIcon, Cpu, X } from "lucide-react";

interface TechNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "cloud" | "blockchain" | "ai";
  description: string;
  capabilities: string[];
  connections: string[]; // Node IDs this node connects to
  // 3D coordinates (normalized between -1 and 1)
  x3d: number;
  y3d: number;
  z3d: number;
}

const TECH_NODES: TechNode[] = [
  // Frontend
  { id: "react", name: "React", category: "frontend", description: "The industry standard library for component-driven user interfaces.", capabilities: ["Virtual DOM Optimization", "Server Components", "State Synchronizers"], connections: ["nextjs", "typescript", "graphql", "reactnative"], x3d: -0.6, y3d: 0.5, z3d: 0.2 },
  { id: "nextjs", name: "Next.js", category: "frontend", description: "The premier full-stack React framework by Vercel.", capabilities: ["App Router Architecture", "Incremental Static Regeneration", "Edge Runtime"], connections: ["react", "typescript", "graphql", "nodejs"], x3d: -0.4, y3d: 0.7, z3d: -0.3 },
  { id: "typescript", name: "TypeScript", category: "frontend", description: "Strict syntactical superset of JavaScript adding compile-time types.", capabilities: ["Static Type Auditing", "Advanced Generics", "Refactoring Safety"], connections: ["react", "nextjs", "nodejs", "reactnative"], x3d: -0.5, y3d: 0.3, z3d: 0.5 },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", description: "Utility-first CSS framework for rapid UI development and styling consistency.", capabilities: ["Utility compilation", "JIT Engine speed", "Design Token grids"], connections: ["react", "nextjs"], x3d: -0.7, y3d: 0.6, z3d: -0.1 },
  { id: "threejs", name: "Three.js", category: "frontend", description: "Lightweight 3D library for creating WebGL interactive animations on webpages.", capabilities: ["WebGL shader meshes", "GPU rendering speed", "3D Camera projections"], connections: ["react", "nextjs", "typescript"], x3d: -0.5, y3d: 0.8, z3d: 0.1 },
  
  // Backend
  { id: "nodejs", name: "Node.js", category: "backend", description: "Asynchronous, event-driven JavaScript backend runtime environment.", capabilities: ["Non-blocking I/O", "Fast REST APIs", "Event Loop Scaling"], connections: ["nextjs", "typescript", "postgresql", "mongodb", "redis"], x3d: 0.1, y3d: 0.4, z3d: -0.6 },
  { id: "python", name: "Python", category: "backend", description: "High-level scripting language that serves as the foundation for AI/ML.", capabilities: ["Data Science Ingestion", "AI Model Pipelines", "Fast Prototyping"], connections: ["fastapi", "openai", "pytorch", "tensorflow"], x3d: 0.4, y3d: 0.2, z3d: 0.4 },
  { id: "fastapi", name: "FastAPI", category: "backend", description: "Modern, high-performance web framework for building Python APIs.", capabilities: ["Pydantic Type Parsing", "Asynchronous Coroutines", "Auto OpenAPI Docs"], connections: ["python", "postgresql", "openai"], x3d: 0.6, y3d: 0.4, z3d: 0.2 },
  { id: "rust", name: "Rust", category: "backend", description: "Systems programming language focused on safety, speed, and concurrency.", capabilities: ["Memory safety guards", "Cargo compilation speed", "Concurrency paradigms"], connections: ["solidity", "nodejs", "webassembly"], x3d: 0.2, y3d: 0.5, z3d: 0.5 },
  { id: "webassembly", name: "WebAssembly", category: "backend", description: "Binary instruction format running high-performance code on the web.", capabilities: ["Near-native execution speed", "Decoupled sandboxing safety", "Rust/C++ compiling ports"], connections: ["rust", "typescript", "react"], x3d: -0.1, y3d: 0.6, z3d: 0.3 },
  
  // AI
  { id: "openai", name: "OpenAI", category: "ai", description: "Industry-leading LLM models (GPT-4, o1) for natural language reasoning.", capabilities: ["Function Calling APIs", "Custom Embeddings", "Retrieval-Augmented Generation"], connections: ["python", "anthropic", "fastapi"], x3d: 0.6, y3d: -0.3, z3d: 0.4 },
  { id: "anthropic", name: "Anthropic", category: "ai", description: "Safety-focused AI firm creating Claude models with large context windows.", capabilities: ["Artifact Code Generation", "Long-form PDF Audits", "Context Synthesis"], connections: ["python", "openai"], x3d: 0.8, y3d: -0.2, z3d: 0.1 },
  { id: "pytorch", name: "PyTorch", category: "ai", description: "Flexible deep learning framework favored by AI research institutions.", capabilities: ["Dynamic Computation Graphs", "Custom Neural Training", "GPU Acceleration"], connections: ["python", "tensorflow"], x3d: 0.7, y3d: 0.1, z3d: -0.3 },
  { id: "tensorflow", name: "TensorFlow", category: "ai", description: "Google's production-grade machine learning and neural network library.", capabilities: ["Mobile Tensor TFLite", "Distributed GPU training", "Graph Compilation"], connections: ["python", "pytorch"], x3d: 0.5, y3d: -0.1, z3d: -0.6 },
  { id: "pinecone", name: "Pinecone", category: "ai", description: "Fully managed vector database designed for high-performance AI retrieval.", capabilities: ["High-dimensional index query", "Metadata filtering arrays", "Low-latency cosine match"], connections: ["openai", "python", "fastapi"], x3d: 0.7, y3d: 0.3, z3d: 0.3 },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "cloud", description: "Containerization platform to pack app binaries and run anywhere consistently.", capabilities: ["Decoupled Layer Images", "Deterministic Environments", "Secure Sandboxing"], connections: ["kubernetes", "aws", "gcp"], x3d: -0.2, y3d: -0.5, z3d: -0.5 },
  { id: "kubernetes", name: "Kubernetes", category: "cloud", description: "Production container orchestrator for automated deployments and scaling.", capabilities: ["Self-healing Node Meshes", "Zero-downtime Rollouts", "Dynamic Load Balancers"], connections: ["docker", "aws", "gcp"], x3d: -0.1, y3d: -0.7, z3d: -0.2 },
  { id: "aws", name: "AWS", category: "cloud", description: "Comprehensive global cloud services infrastructure (EC2, ECS, RDS).", capabilities: ["High Availability Clusters", "Serverless Lambda scale", "IAM Security Guardrails"], connections: ["docker", "kubernetes", "gcp", "azure"], x3d: 0.2, y3d: -0.6, z3d: 0.3 },
  { id: "gcp", name: "Google Cloud", category: "cloud", description: "Advanced data analytics, machine learning, and hosting cloud suite.", capabilities: ["BigQuery Analytics", "Dataproc Serverless", "Firebase integration"], connections: ["docker", "kubernetes", "aws"], x3d: 0.3, y3d: -0.4, z3d: -0.3 },
  { id: "azure", name: "Azure", category: "cloud", description: "Microsoft cloud solutions targeting enterprise business models.", capabilities: ["Active Directory sync", "Hybrid Cloud meshes", "SQL Server integrations"], connections: ["aws"], x3d: 0.4, y3d: -0.7, z3d: 0.1 },
  { id: "supabase", name: "Supabase", category: "cloud", description: "Open-source Firebase alternative providing auto REST APIs, auth, and database listen hooks.", capabilities: ["Auto-generated APIs", "Real-time sync listeners", "Postgres RLS authorization"], connections: ["postgresql", "nextjs", "aws"], x3d: 0.1, y3d: -0.5, z3d: -0.6 },

  // Databases & Caching
  { id: "postgresql", name: "PostgreSQL", category: "backend", description: "Reliable object-relational SQL database designed for data consistency.", capabilities: ["ACID Compliance", "JSONB Document Storage", "Vector Similarity search"], connections: ["nodejs", "fastapi"], x3d: 0.0, y3d: 0.1, z3d: -0.7 },
  { id: "mongodb", name: "MongoDB", category: "backend", description: "Flexible document-based NoSQL database for rapid iterative development.", capabilities: ["Schemaless JSON objects", "Dynamic Scaling Shards", "Rich Aggregation Pipelines"], connections: ["nodejs"], x3d: -0.2, y3d: 0.2, z3d: -0.7 },
  { id: "redis", name: "Redis", category: "backend", description: "In-memory database used as a high-speed cache and queue runner.", capabilities: ["Sub-millisecond latency", "Pub/Sub Messaging", "API Throttle Cache"], connections: ["nodejs"], x3d: -0.1, y3d: 0.3, z3d: -0.5 },
  { id: "graphql", name: "GraphQL", category: "backend", description: "Query language for APIs that lets clients fetch exactly what they request.", capabilities: ["Single-endpoint requests", "Type-safe Schema definition", "Realtime WebSockets"], connections: ["react", "nextjs", "nodejs"], x3d: -0.3, y3d: 0.5, z3d: 0.6 },

  // Mobile
  { id: "reactnative", name: "React Native", category: "frontend", description: "Framework for building native mobile apps using React components.", capabilities: ["Over-the-Air hot updates", "Shared Single Codebase", "Native Bridge integration"], connections: ["react", "typescript"], x3d: -0.7, y3d: 0.1, z3d: 0.4 },
  { id: "flutter", name: "Flutter", category: "frontend", description: "Google's UI toolkit for crafting beautiful native layouts from a single canvas.", capabilities: ["Skia Graphic Rendering", "Dart Compilation", "High frame-rate widgets"], connections: [], x3d: -0.8, y3d: -0.2, z3d: 0.3 },

  // Blockchain & Web3
  { id: "solidity", name: "Solidity", category: "blockchain", description: "Object-oriented language for writing Ethereum-compatible smart contracts.", capabilities: ["EVM Execution safety", "Gas fee optimization", "DeFi Yield equations"], connections: ["ethereum"], x3d: 0.0, y3d: -0.2, z3d: 0.7 },
  { id: "ethereum", name: "Ethereum", category: "blockchain", description: "Decentralized L1 blockchain acting as a global computational engine.", capabilities: ["DeFi TVL liquidity", "ERC Token standardization", "Smart Contract states"], connections: ["solidity", "bitcoin"], x3d: -0.2, y3d: -0.3, z3d: 0.6 },
  { id: "bitcoin", name: "Bitcoin", category: "blockchain", description: "The original cryptocurrency representing decentralized digital gold.", capabilities: ["Proof of Work trust", "SegWit transactions", "UTXO bookkeeping"], connections: ["ethereum"], x3d: -0.4, y3d: -0.2, z3d: 0.5 },
  { id: "hardhat", name: "Hardhat", category: "blockchain", description: "Ethereum development environment for compiling, deploying, and debugging smart contracts.", capabilities: ["Solidity compiler checks", "Local node simulators", "Automated deployment logs"], connections: ["solidity", "ethereum"], x3d: 0.1, y3d: -0.3, z3d: 0.8 },
];

// Canvas 2D drawing can't resolve CSS custom properties, so these literal
// values mirror the theme tokens in globals.css (--color-electric-blue,
// --color-soft-cyan, --color-neon-purple, --color-accent-gold). Keep in sync
// if the theme palette changes.
const CATEGORY_COLORS: Record<TechNode["category"], string> = {
  frontend: "#0070f3", // electric-blue
  backend: "#0070f3", // electric-blue
  ai: "#06b6d4", // soft-cyan
  blockchain: "#eab308", // accent-gold
  cloud: "#a855f7", // neon-purple
};
const CONNECTION_GRADIENT_START = "#0070f3"; // electric-blue
const CONNECTION_GRADIENT_END = "#a855f7"; // neon-purple

export default function TechUniverse() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(
    TECH_NODES.find((node) => node.id === "nextjs") || null
  );
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { setCursorType } = useCursor();

  // Rotation angles
  const angleX = useRef(0.2);
  const angleY = useRef(0.2);
  
  // Drag state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Projected node coordinates on the canvas
  const projectedNodes = useRef<{ [id: string]: { x: number; y: number; r: number } }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isDarkMode = true;

      // Auto rotation when not dragging
      if (!isDragging.current) {
        angleY.current += 0.003;
        angleX.current += 0.001;
      }

      // Calculations for projection matrices
      const cosX = Math.cos(angleX.current);
      const sinX = Math.sin(angleX.current);
      const cosY = Math.cos(angleY.current);
      const sinY = Math.sin(angleY.current);

      const fov = 350; // Camera distance / perspective scale
      const cx = width / 2;
      const cy = height / 2;

      // 1. Calculate projected coords for each node
      const currentNodes = TECH_NODES.map((node) => {
        // Rotate around Y-axis
        const x1 = node.x3d * cosY - node.z3d * sinY;
        const z1 = node.z3d * cosY + node.x3d * sinY;

        // Rotate around X-axis
        const y2 = node.y3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y3d * sinX;

        // Perspective scaling
        const depthScale = fov / (fov + z2 * 120);
        const scaleMultiplier = Math.min(200, width * 0.35);
        const screenX = cx + x1 * scaleMultiplier * depthScale;
        const screenY = cy + y2 * scaleMultiplier * depthScale;

        // Radius scaling based on depth
        const radius = Math.max(3, 14 * depthScale);

        projectedNodes.current[node.id] = { x: screenX, y: screenY, r: radius };

        return {
          id: node.id,
          name: node.name,
          category: node.category,
          x: screenX,
          y: screenY,
          z: z2, // for depth sorting
          radius,
        };
      });

      // Sort by depth (render back nodes first, then connections, then front nodes)
      currentNodes.sort((a, b) => b.z - a.z);

      // 2. Draw connections
      ctx.lineWidth = 1;
      TECH_NODES.forEach((node) => {
        const fromProj = projectedNodes.current[node.id];
        if (!fromProj) return;

        node.connections.forEach((connId) => {
          const toProj = projectedNodes.current[connId];
          if (!toProj) return;

          // Connection highlighting
          const isHighlighted =
            (selectedTech && (selectedTech.id === node.id || selectedTech.id === connId)) ||
            (hoveredNode && (hoveredNode === node.id || hoveredNode === connId));

          if (isHighlighted) {
            // Glowing connecting line
            const grad = ctx.createLinearGradient(fromProj.x, fromProj.y, toProj.x, toProj.y);
            grad.addColorStop(0, CONNECTION_GRADIENT_START);
            grad.addColorStop(1, CONNECTION_GRADIENT_END);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.5;
            ctx.shadowBlur = 8;
            ctx.shadowColor = CONNECTION_GRADIENT_START;
          } else {
            // Dim default connecting line
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(9, 9, 11, 0.06)";
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.moveTo(fromProj.x, fromProj.y);
          ctx.lineTo(toProj.x, toProj.y);
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        });
      });

      // 3. Draw nodes
      currentNodes.forEach((node) => {
        const isSelected = selectedTech?.id === node.id;
        const isHovered = hoveredNode === node.id;

        // Base color based on category
        const color = CATEGORY_COLORS[node.category];

        ctx.save();

        if (isSelected || isHovered) {
          // Large outer halo
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected ? "rgba(0, 112, 243, 0.15)" : "rgba(255, 255, 255, 0.05)";
          ctx.fill();

          // Outer glowing ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 12;
          ctx.shadowColor = color;
          ctx.stroke();
        }

        // Inner solid node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected || isHovered ? (isDarkMode ? "#fff" : "#09090b") : color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Label
        ctx.font = isSelected || isHovered ? "bold 10px monospace" : "9px monospace";
        ctx.fillStyle = isSelected || isHovered ? (isDarkMode ? "#fff" : "#09090b") : (isDarkMode ? "rgba(255,255,255,0.45)" : "rgba(9,9,11,0.45)");
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, node.x, node.y - node.radius - 10);

        ctx.restore();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedTech, hoveredNode]);

  // Drag listeners to rotate the constellation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. If dragging, update angles
    if (isDragging.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      angleY.current += deltaX * 0.005;
      angleX.current += deltaY * 0.005;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // 2. Otherwise, check node hover triggers
    let nodeHovered: string | null = null;
    Object.entries(projectedNodes.current).forEach(([id, proj]) => {
      const dist = Math.sqrt((x - proj.x) * (x - proj.x) + (y - proj.y) * (y - proj.y));
      // Increase hitbox area for hover ease
      if (dist < proj.r + 12) {
        nodeHovered = id;
      }
    });

    if (nodeHovered) {
      setHoveredNode(nodeHovered);
      setCursorType("pointer");
    } else {
      if (hoveredNode !== null) {
        setHoveredNode(null);
        setCursorType("default");
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let clickedId: string | null = null;
    Object.entries(projectedNodes.current).forEach(([id, proj]) => {
      const dist = Math.sqrt((x - proj.x) * (x - proj.x) + (y - proj.y) * (y - proj.y));
      if (dist < proj.r + 14) {
        clickedId = id;
      }
    });

    if (clickedId) {
      const tech = TECH_NODES.find((node) => node.id === clickedId);
      if (tech) {
        setSelectedTech(tech);
      }
    }
  };

  const techDetailCard = (
    <AnimatePresence mode="wait">
      {selectedTech ? (
        <motion.div
          key={selectedTech.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-2xl border border-card-border bg-card-bg p-6 relative overflow-hidden"
        >
          {/* Decorative glowing border */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-electric-blue" />
          
          <div className="flex justify-between items-center mb-3 ml-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-4.5 w-4.5 text-electric-blue" />
              <span className="text-xs uppercase font-mono tracking-wider font-semibold text-text-muted">
                {selectedTech.category} node
              </span>
            </div>
            <button 
              onClick={() => setSelectedTech(null)}
              onMouseEnter={() => setCursorType("pointer")}
              onMouseLeave={() => setCursorType("default")}
              className="text-text-muted hover:text-foreground p-1 rounded-full bg-card-bg transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <h3 className="text-2xl font-bold text-text-title tracking-tight ml-2">
            {selectedTech.name}
          </h3>
          <p className="text-text-muted font-light text-sm mt-3 ml-2 leading-relaxed">
            {selectedTech.description}
          </p>

          <div className="mt-4 ml-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-neon-purple" />
              Key Capabilities
            </h4>
            <ul className="grid grid-cols-2 gap-1.5 mt-2">
              {selectedTech.capabilities.map((cap) => (
                <li key={cap} className="text-xs text-text-muted flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-electric-blue" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {selectedTech.connections.length > 0 && (
            <div className="mt-4 ml-2 border-t border-card-border pt-3">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase flex items-center gap-1">
                <LinkIcon className="h-3 w-3 text-soft-cyan" />
                Stack Integrations
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedTech.connections.map((connId) => {
                  const connNode = TECH_NODES.find((t) => t.id === connId);
                  return connNode ? (
                    <span 
                      key={connId}
                      onClick={() => setSelectedTech(connNode)}
                      onMouseEnter={() => setCursorType("pointer")}
                      onMouseLeave={() => setCursorType("default")}
                      className="text-[10px] font-mono bg-card-bg border border-card-border hover:border-card-border/80 text-foreground px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      {connNode.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border border-card-border bg-card-bg border-dashed p-8 flex flex-col items-center justify-center text-center min-h-[220px]"
        >
          <Cpu className="h-8 w-8 text-text-muted/40 mb-3 animate-pulse" aria-hidden="true" />
          <span className="text-xs text-text-muted font-mono uppercase tracking-widest">
            No Node Selected
          </span>
          <p className="text-text-muted text-xs mt-2 max-w-xs">
            Select any technology node in the 3D particle constellation grid to analyze capabilities.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section id="universe" className="relative bg-background py-14 md:py-24 px-6 lg:px-24 border-b border-card-border overflow-hidden">
      {/* Mesh glow effects */}
      <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-mesh-blue opacity-20 blur-[130px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[10%] h-[350px] w-[350px] rounded-full bg-mesh-purple opacity-20 blur-[130px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Left Column: Heading & Detail Box */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              TECHNOLOGY UNIVERSE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-title mt-4 leading-tight">
              Our Interconnected Stack Constellation.
            </h2>
            <p className="text-text-muted font-light mt-6 text-sm md:text-base leading-relaxed">
              Drag to rotate the constellation. Hover nodes to see network path configurations, and click a node to reveal detailed capabilities and engineering application case scenarios.
            </p>
          </div>

          {/* Desktop Only Interactive Node Info Card */}
          <div className="hidden lg:block mt-8 min-h-[220px]">
            {techDetailCard}
          </div>
        </div>

        {/* Right Column: 3D Interactive Canvas */}
        <div
          ref={containerRef}
          className="w-full lg:w-7/12 aspect-square relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center border border-card-border bg-card-bg backdrop-blur-md"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleMouseClick}
        >
          {/* Subtle grid indicator background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--card-border)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden="true" />

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />

          {/* User instruction overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-card-border bg-card-bg/60 px-4 py-1.5 pointer-events-none" aria-hidden="true">
            <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted">
              Drag to Orbit 3D Space
            </span>
          </div>
        </div>

        {/* Accessible text alternative: the 3D canvas above is a mouse-only
            drag/click interface with no keyboard or screen-reader path, so
            every node is also reachable as a real, focusable button here.
            Visually hidden — the canvas + detail card already present this
            content visually for sighted mouse users. */}
        <fieldset className="sr-only">
          <legend>Technology stack nodes</legend>
          {TECH_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedTech(node)}
              aria-pressed={selectedTech?.id === node.id}
            >
              {node.name} ({node.category}) — {node.description}
            </button>
          ))}
        </fieldset>

        {/* Mobile Only Interactive Node Info Card */}
        <div className="block lg:hidden w-full mt-4 min-h-[220px]">
          {techDetailCard}
        </div>
      </div>
    </section>
  );
}
