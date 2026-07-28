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
  "🚀 What services does WEBMUSE offer?",
  "⏱️ How fast can you deliver an MVP?",
  "🔒 How do you handle fintech & security?",
  "📅 How do I schedule an architecture review?",
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
      text: "Hello! I'm the WEBMUSE Architecture Concierge. How can I help you today? Ask me about our custom software engineering, delivery timelines, tech stack choices, or booking a consultation.",
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
      const reply = generateAiReply(textToSend);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 750);
  };

  const generateAiReply = (query: string): Message => {
    const q = query.toLowerCase();

    if (q.includes("service") || q.includes("build") || q.includes("offer") || q.includes("what do you do")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "WEBMUSE specializes in 6 core engineering verticals:\n• Custom Software & Web Apps (Next.js 16, Node.js)\n• AI Solutions & Intelligent Agents\n• Cross-Platform Mobile Apps (Flutter, React Native)\n• Web3 & Bitcoin L2 Smart Contracts (Solidity, Clarity 3)\n• Cloud Architecture & Microservices (AWS, GCP, Vercel)\n• UI/UX Strategy & Systems Architecture",
        timestamp: getFormattedTime(),
        cta: {
          label: "View All Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    if (q.includes("fast") || q.includes("time") || q.includes("delivery") || q.includes("mvp") || q.includes("sprint")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Our delivery velocity is structured into 3 launch tiers:\n• Sprint MVP: 3–5 Weeks (Fastest launch path with core features)\n• Growth Build: 8–12 Weeks (Full scalable production platform)\n• Enterprise Systems: 16+ Weeks (Distributed microservices & high reliability)",
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Product & Scope",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    if (q.includes("security") || q.includes("fintech") || q.includes("health") || q.includes("hipaa") || q.includes("idempotency")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "We engineering strict zero-trust security architecture:\n• Fintech Backends: Layered idempotency, double-entry ledgers, atomic deposit claims, and threshold-gated withdrawals (as built in Novunt).\n• Geospatial & Safety: Self-terminating SOS ladders, PostGIS boundary matching, and NDPR/GDPR compliance (as built in NeyborHuud & Seth HSE).",
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Novunt Case Study",
          action: () => navigatePath("/case-study/novunt"),
        },
      };
    }

    if (q.includes("book") || q.includes("schedule") || q.includes("call") || q.includes("consult") || q.includes("contact")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "You can book a 1-on-1 strategy and technical architecture review directly with our leadership team. Choose your project category, preferred date, and receive an instant booking confirmation ticket.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Book Strategy Call",
          action: () => navigateAnchor("#booking"),
        },
      };
    }

    if (q.includes("stack") || q.includes("tech") || q.includes("next") || q.includes("react") || q.includes("database")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Our production constellation stack includes:\n• Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS\n• Backend & Async: Node.js (TypeScript), Express, FastAPI, Redis + BullMQ\n• Databases: PostgreSQL (RLS / Aurora), MongoDB Atlas, PostGIS, Supabase Vector\n• Smart Contracts: Solidity, Clarity 3 (Stacks / Bitcoin L2)",
        timestamp: getFormattedTime(),
        cta: {
          label: "Explore Tech Constellation",
          action: () => navigateAnchor("#universe"),
        },
      };
    }

    if (q.includes("team") || q.includes("founder") || q.includes("marteen") || q.includes("florence") || q.includes("mubaraq") || q.includes("atere")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "WEBMUSE is co-founded by Marteen Motun Mubaraq (Co-Founder & Chief Product Architect) and Oluwatosin Florence Atere (Co-Founder & Chief Systems Engineer), guiding dedicated engineering teams across our London HQ, New York, and Tokyo hubs.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Meet the Leadership",
          action: () => navigateAnchor("#team"),
        },
      };
    }

    if (q.includes("cost") || q.includes("price") || q.includes("budget") || q.includes("quote")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: "Project investments are custom-tailored based on engineering scope, feature add-ons, scale targets, and launch velocity. Use our Master Simulator to calculate engineering hours and generate a structured architectural blueprint.",
        timestamp: getFormattedTime(),
        cta: {
          label: "Calculate Scope & Budget",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `I've analyzed your query regarding "${query}". WEBMUSE engineers high-performance web applications, mobile platforms, AI agents, and Web3 systems. You can simulate your product roadmap or schedule a direct consultation with our lead architects.`,
      timestamp: getFormattedTime(),
      cta: {
        label: "Book Strategy Review",
        action: () => navigateAnchor("#booking"),
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
          aria-label="Open WEBMUSE AI Architecture Concierge"
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] rounded-2xl border border-card-border bg-[#09090c]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden font-mono"
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
                  <p className="text-[10px] text-text-muted font-light">AI Architecture Assistant</p>
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
                  <div className={`max-w-[82%] space-y-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`p-3 rounded-xl leading-relaxed whitespace-pre-line text-xs ${
                        msg.sender === "user"
                          ? "bg-electric-blue text-white rounded-br-none"
                          : "bg-card-bg/80 border border-card-border/80 text-foreground rounded-bl-none"
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
                  <div className="p-3 rounded-xl bg-card-bg/80 border border-card-border/80 text-text-muted text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-bounce delay-200" />
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
                placeholder="Ask about services, tech stack, or booking..."
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
