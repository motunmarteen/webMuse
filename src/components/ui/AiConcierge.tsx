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
    const q = query.toLowerCase().trim();

    // 1. MVP Definition & Explanation Intent
    if (q.includes("what is mvp") || q.includes("explain mvp") || q.includes("meaning of mvp") || q.includes("definition of mvp") || q === "mvp") {
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

    // 2. Blockchain & Web3 Build Intent
    if (q.includes("blockchain") || q.includes("crypto") || q.includes("web3") || q.includes("dex") || q.includes("smart contract") || q.includes("solidity") || q.includes("stacks") || q.includes("bitcoin")) {
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

    // 3. Mobile App Development Intent
    if (q.includes("mobile") || q.includes("ios") || q.includes("android") || q.includes("flutter") || q.includes("react native") || q.includes("app store")) {
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

    // 4. AI & Intelligent Agents Intent
    if (q.includes("ai") || q.includes("rag") || q.includes("machine learning") || q.includes("predictive") || q.includes("neural") || q.includes("agent") || q.includes("model")) {
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

    // 5. Fintech & Security Intent
    if (q.includes("fintech") || q.includes("security") || q.includes("idempotency") || q.includes("payment") || q.includes("ledger") || q.includes("stripe") || q.includes("hipaa")) {
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

    // 6. Location & Studio Hubs Intent
    if (q.includes("where") || q.includes("location") || q.includes("located") || q.includes("office") || q.includes("london") || q.includes("new york") || q.includes("tokyo")) {
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

    // 7. Pricing & Scope Intent
    if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("budget") || q.includes("how much") || q.includes("quote")) {
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

    // 8. Founders & Leadership Intent
    if (q.includes("team") || q.includes("founder") || q.includes("marteen") || q.includes("florence") || q.includes("mubaraq") || q.includes("atere") || q.includes("who leads") || q.includes("who owns")) {
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

    // 9. Booking & Consultation Intent
    if (q.includes("book") || q.includes("schedule") || q.includes("consult") || q.includes("call") || q.includes("meet")) {
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

    // 10. Services Overview Intent
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

    // 11. General / Niche Query Dynamic Fallback
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `Yes! WEBMUSE builds custom digital platforms, mobile apps, AI systems, and Web3 protocols tailored to your exact requirements. You can describe your product concept in our Master Simulator or book a consultation with our lead architects.`,
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
