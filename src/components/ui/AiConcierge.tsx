"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCursor } from "@/components/ui/CustomCursor";
import {
  X,
  Send,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  RefreshCw,
  Mail,
  Phone,
  CheckCircle2,
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
  showLeadForm?: boolean;
}

const STARTER_PROMPTS = [
  "🚀 Hi! I want to build an app concept",
  "⏱️ How long does it take to finish an app?",
  "💡 Explain idempotency like I'm 5",
  "📍 Where are your studio offices located?",
  "📅 How do I schedule an architecture review?",
];

export default function AiConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { setCursorType } = useCursor();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lead capture inline form states
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hey there! 👋 I'm your WEBMUSE Lead Architect Concierge. I'm super thrilled you're here! May I ask what your name is so I know who I'm speaking with?",
      timestamp: getFormattedTime(),
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, showLeadModal]);

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

  // Name extraction helper
  const extractName = (text: string): string | null => {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    if (lower.startsWith("my name is ")) {
      return trimmed.substring(11).split(" ")[0];
    }
    if (lower.startsWith("i am ")) {
      return trimmed.substring(5).split(" ")[0];
    }
    if (lower.startsWith("i'm ")) {
      return trimmed.substring(4).split(" ")[0];
    }
    if (lower.startsWith("call me ")) {
      return trimmed.substring(8).split(" ")[0];
    }
    // Single word entry if first message
    if (trimmed.split(" ").length === 1 && trimmed.length > 1 && !lower.includes("hi") && !lower.includes("hello")) {
      return trimmed;
    }
    return null;
  };

  const handleSend = (userText?: string) => {
    const textToSend = userText || inputMsg.trim();
    if (!textToSend) return;

    // Check if user is introducing their name
    const detectedName = extractName(textToSend);
    let currentName = userName;
    if (detectedName && !userName) {
      currentName = detectedName.charAt(0).toUpperCase() + detectedName.slice(1);
      setUserName(currentName);
      setLeadName(currentName);
    }

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
      const reply = generateHumanJovialReply(textToSend, currentName);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 700);
  };

  const submitLeadForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim()) return;

    setLeadSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName || userName || "Website Visitor",
          email: leadEmail,
          message: `[AI CONCIERGE LEAD] Phone/WhatsApp: ${leadPhone || "N/A"}. Conversation history with ${userName || "Visitor"}.`,
        }),
      });
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
        const nameGreeting = userName ? ` ${userName}` : "";
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-lead-success-${Date.now()}`,
            sender: "ai",
            text: `🎉 Awesome${nameGreeting}! We've received your contact details. Our lead architects will review your blueprint and reach out to you shortly via email/phone!`,
            timestamp: getFormattedTime(),
            cta: {
              label: "Schedule Direct Meeting",
              action: () => navigateAnchor("#booking"),
            },
          },
        ]);
      }, 1200);
    } catch {
      setLeadSubmitted(true);
      setShowLeadModal(false);
    } finally {
      setLeadSubmitting(false);
    }
  };

  // Humanized Jovial AI Response Generator
  const generateHumanJovialReply = (query: string, name: string): Message => {
    const rawLower = query.toLowerCase().trim();
    const namePrefix = name ? `${name}, ` : "";
    const nameFriendly = name ? ` ${name}` : "";

    // 0. Emoji & Filler Normalization
    let q = rawLower
      .replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
      .trim();

    // Remove introductory greetings like "hi!", "hello", "hey"
    if (q.startsWith("hi!") || q.startsWith("hi ") || q.startsWith("hello") || q.startsWith("hey")) {
      q = q.replace(/^(hi!|hi|hello|hey)\s*/i, "").trim();
    }

    // 1. Name Introduction Response
    if (extractName(query) && messages.length <= 3) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Wonderful to meet you, ${name}! 😊 I'm super excited to assist you today! Ask me anything about our software engineering, build timelines, tech stack, or describe an app concept for an instant blueprint!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Product Concept",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 2. WILL WEBMUSE BUILD ME AN APP / CAN YOU BUILD AN APP / APP BUILDING CAPABILITY
    if (
      q.includes("build me an app") ||
      q.includes("build an app") ||
      q.includes("build my app") ||
      q.includes("able to build") ||
      q.includes("can you build") ||
      q.includes("build apps") ||
      rawLower.includes("will webmuse be able to build")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `100% YES${nameFriendly}! 🎉 Building high-performance custom web and mobile apps is our core specialty at WEBMUSE!\n\nWhether you need an iOS & Android mobile app, a SaaS web platform, a custom AI agent, or a Web3 protocol, we build production-grade applications in 3–5 weeks (Sprint MVP) or 8–12 weeks (Full Growth Platform).\n\nTell me a bit about what you want your app to do, and I'll generate a custom architectural blueprint for you right now!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Your App Concept",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 3. WHAT IS A WEBSITE / WEBSITE DEFINITION
    if (
      q.includes("what is a website") ||
      q.includes("what is website") ||
      q.includes("what does is a website") ||
      q.includes("explain website") ||
      q === "website"
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `A website is your digital flagship storefront on the internet${nameFriendly}! 🌐 It connects your product, service, or brand with users worldwide 24 hours a day, 7 days a week.\n\nAt WEBMUSE, we engineer next-generation web applications (using Next.js 16 and React 19) that load in under 100 milliseconds, look stunning on every screen, and turn casual visitors into paying customers!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "View Web Engineering Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    // 4. STARTER PROMPT: WANT TO BUILD AN APP CONCEPT
    if (
      q.includes("i want to build an app concept") ||
      q.includes("app concept") ||
      q.includes("i want to build") ||
      q.includes("want to build an app")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `That's amazing${nameFriendly}! 🚀 We love bringing new product concepts to life! What kind of app are you thinking of?\n\nFor example:\n• A mobile app for iOS & Android\n• An AI chatbot or search engine\n• A fintech & payment platform\n• A Web3 smart contract protocol\n\nDescribe your idea in a sentence or two, and I'll generate a complete architectural blueprint (Tech Stack, Timeline & Scope) for you!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Product Blueprint",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 5. WHAT IS WEBMUSE / ABOUT AGENCY
    if (
      q === "what is webmuse" ||
      q === "who is webmuse" ||
      q.includes("what is webmuse") ||
      q.includes("who is webmuse") ||
      q.includes("tell me about webmuse") ||
      q.includes("explain webmuse") ||
      q.includes("about webmuse") ||
      q.includes("what does webmuse do")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Well ${namePrefix}WEBMUSE is an elite digital product engineering studio! We build high-performance Web Applications, Cross-Platform Mobile Apps, AI & Neural Agents, and Web3 Blockchain Protocols.\n\nCo-founded by Marteen Motun Mubaraq (Chief Product Architect) and Oluwatosin Florence Atere (Chief Systems Engineer), WEBMUSE operates from studio hubs in London (HQ), Lagos (Nigeria), New York, and Tokyo—delivering fast, bulletproof software built to scale effortlessly!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "View Core Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    // 6. TIMELINES, DURATION & FINISHING AN APP
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
      q.includes("when ready")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Great question${nameFriendly}! We move fast without breaking things. Here is how our build timelines break down:\n\n• ⚡ Sprint MVP: 3–5 Weeks (Fastest path to launch core high-impact features)\n• 🚀 Growth Platform: 8–12 Weeks (Full production web & mobile app)\n• 🏛️ Enterprise Systems: 16+ Weeks (Distributed microservices & high reliability)\n\nYou can use our Master Simulator to calculate exact engineering hours for your specific idea!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Calculate Scope & Timeline",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 7. MVP EXPLANATION (LIKE I'M 5)
    if (
      q.includes("what is mvp") ||
      q.includes("explain mvp") ||
      q.includes("meaning of mvp") ||
      q.includes("definition of mvp") ||
      q === "mvp"
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Let me break it down simply${nameFriendly}! Imagine you want to build a rocket to Mars 🚀. Instead of spending 5 years building the whole rocket before testing it, an MVP (Minimum Viable Product) is building a super-fast prototype engine first to prove it flies!\n\nAt WEBMUSE, an MVP is the core functional version of your app built in 3–5 weeks so real users can test it, validate demand, and save you time and money!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Simulate Sprint MVP",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 8. IDEMPOTENCY EXPLANATION (LIKE I'M 5)
    if (q.includes("idempotency") || q.includes("explain idempotency")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Here is a fun way to think about idempotency${nameFriendly}! 🛗\n\nImagine pressing an elevator button 10 times in a row because you're in a hurry. The elevator still only comes ONCE! That's idempotency in code: even if a user taps 'Pay $100' ten times because their phone froze, our backend guarantees they are charged exactly ONCE. No duplicate payments ever!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Read Novunt Fintech Study",
          action: () => navigatePath("/case-study/novunt"),
        },
      };
    }

    // 9. VECTOR RAG AI EXPLANATION (LIKE I'M 5)
    if (q.includes("rag") || q.includes("vector") || q.includes("explain ai")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Think of Vector RAG AI like a super-smart librarian 📚 who reads a 10,000-page encyclopedia in 1 millisecond, finds the exact single paragraph you need, and answers your question in plain English! That's how we build intelligent search and automated AI agents at WEBMUSE!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "View Sentinel AI Study",
          action: () => navigatePath("/case-study/sentinel-ai"),
        },
      };
    }

    // 10. BLOCKCHAIN & WEB3
    if (
      q.includes("blockchain") ||
      q.includes("crypto") ||
      q.includes("web3") ||
      q.includes("smart contract") ||
      q.includes("solidity") ||
      q.includes("stacks") ||
      q.includes("bitcoin") ||
      q.includes("dex")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Yes, absolutely${nameFriendly}! We love Web3! Think of a smart contract like a digital vending machine 🪙: you insert a coin, and the code automatically dispenses your product with zero middleman!\n\nWEBMUSE engineers smart contracts in Solidity (EVM) & Clarity 3 (Bitcoin L2 Stacks), DEX liquidity pools, and continuous asset streaming protocols.`,
        timestamp: getFormattedTime(),
        cta: {
          label: "View Bitcoin L2 Streaming Study",
          action: () => navigatePath("/case-study/stacks-token-streaming"),
        },
      };
    }

    // 11. MOBILE APP DEVELOPMENT
    if (
      q.includes("mobile") ||
      q.includes("ios") ||
      q.includes("android") ||
      q.includes("flutter") ||
      q.includes("react native") ||
      q.includes("app store")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `Yes! We build stunning iOS and Android apps using React Native, Flutter, and Next.js PWAs! We pack them with offline syncing, push notifications, smooth micro-animations, and biometric security!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "View Mobile Services",
          action: () => navigateAnchor("#services"),
        },
      };
    }

    // 12. LOCATIONS (LONDON, LAGOS, NY, TOKYO)
    if (
      q.includes("where") ||
      q.includes("location") ||
      q.includes("located") ||
      q.includes("office") ||
      q.includes("london") ||
      q.includes("lagos") ||
      q.includes("new york") ||
      q.includes("tokyo")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `WEBMUSE operates globally from 4 strategic studio hubs:\n• 🇬🇧 London HQ (United Kingdom)\n• 🇳🇬 Lagos Hub (West Africa Engineering Hub)\n• 🇺🇸 New York Hub (United States)\n• 🇯🇵 Tokyo Hub (Japan)\n\nWe collaborate seamlessly with clients across all global timezones!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Contact Studio Hubs",
          action: () => navigateAnchor("#contact"),
        },
      };
    }

    // 13. COST & PRICING
    if (
      q.includes("cost") ||
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("budget") ||
      q.includes("how much") ||
      q.includes("quote")
    ) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `We keep pricing transparent with zero hidden surprises${nameFriendly}! Investments are custom-tailored based on engineering scope, feature add-ons, and velocity. Use our Master Simulator to calculate engineering hours and budget scope in real time!`,
        timestamp: getFormattedTime(),
        cta: {
          label: "Calculate Scope & Budget",
          action: () => navigateAnchor("#vault"),
        },
      };
    }

    // 14. SPECIFIC CUSTOM PRODUCT CONCEPT BLUEPRINT GENERATOR
    if (
      q.startsWith("i want to create") ||
      q.startsWith("can you build a platform") ||
      (q.includes("build") && q.includes("for") && q.split(" ").length > 3)
    ) {
      const isAi = q.includes("ai") || q.includes("agent") || q.includes("model");
      const isWeb3 = q.includes("web3") || q.includes("crypto") || q.includes("blockchain");

      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: `⚡ Architectural Blueprint Generated for ${namePrefix}"${query}":\n\n• Category: ${isAi ? "AI Cognitive System" : isWeb3 ? "Decentralized Web3 Protocol" : "Custom Scalable Platform"}\n• Frontend: Next.js 16 (App Router) + React 19 + Tailwind CSS\n• Backend Engine: Node.js (TypeScript) / FastAPI (Python)\n• Database: PostgreSQL (Prisma ORM) + Redis Cache\n• Cloud: Vercel Edge + AWS S3 Infrastructure\n• Estimated Scope: 280–420 Engineering Hours (6–10 Weeks)\n\nWould you like to drop your email to receive this blueprint proposal directly in your inbox?`,
        timestamp: getFormattedTime(),
        cta: {
          label: "📧 Email Me This Proposal",
          action: () => setShowLeadModal(true),
        },
      };
    }

    // 15. FALLBACK WITH hello@webmuse.tech ESCALATION
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: `That's an intriguing question${nameFriendly}! I want to make sure you receive 100% exact, detailed answers from our lead engineering team. Please shoot an email to hello@webmuse.tech or request a live 1-on-1 call with our architects!`,
      timestamp: getFormattedTime(),
      cta: {
        label: "📧 Request Architect Follow-Up",
        action: () => setShowLeadModal(true),
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
          aria-label="Open WEBMUSE AI Concierge"
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
                  <p className="text-[10px] text-text-muted font-light">
                    {userName ? `Speaking with ${userName}` : "Autonomous Lead Architect"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowLeadModal(true)}
                  className="px-2 py-1 text-[10px] border border-electric-blue/40 text-electric-blue rounded hover:bg-electric-blue/10 font-mono transition-colors"
                  title="Request Follow-Up"
                >
                  Connect
                </button>
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                    setUserName("");
                  }}
                  className="p-1 text-text-muted hover:text-foreground rounded transition-colors"
                  title="Reset Chat"
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
                    <span>Synthesizing answer...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-ping" />
                  </div>
                </div>
              )}

              {/* Inline Lead Capture Modal Drawer */}
              <AnimatePresence>
                {showLeadModal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="my-3 p-4 rounded-xl border border-electric-blue/40 bg-black/90 shadow-lg space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-electric-blue flex items-center gap-1.5 text-xs">
                        <Mail className="h-3.5 w-3.5" />
                        Receive Proposal & Architect Follow-Up
                      </h3>
                      <button onClick={() => setShowLeadModal(false)} className="text-zinc-500 hover:text-white">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {leadSubmitted ? (
                      <div className="py-4 text-center text-emerald-400 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Details Saved! Connecting with Lead Architect...
                      </div>
                    ) : (
                      <form onSubmit={submitLeadForm} className="space-y-2.5">
                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">Your Full Name</label>
                          <input
                            type="text"
                            required
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="e.g. Alex Johnson"
                            className="w-full bg-card-bg border border-card-border rounded px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-electric-blue"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">Work / Personal Email</label>
                          <input
                            type="email"
                            required
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            placeholder="alex@company.com"
                            className="w-full bg-card-bg border border-card-border rounded px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-electric-blue"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 block mb-1">Phone / WhatsApp (Optional)</label>
                          <input
                            type="tel"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-card-bg border border-card-border rounded px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-electric-blue"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={leadSubmitting}
                          className="w-full py-2 bg-electric-blue hover:bg-electric-blue/90 font-bold text-white rounded transition-colors text-xs uppercase tracking-wider"
                        >
                          {leadSubmitting ? "Dispatching..." : "Send Proposal to My Inbox"}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

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
                placeholder={userName ? `Ask anything, ${userName}...` : "Tell us your name or ask any question..."}
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
