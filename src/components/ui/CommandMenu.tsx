"use client";

import { useState, useEffect, useMemo } from "react";
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
  Code,
  Layers,
  BookOpen,
  Volume2,
  VolumeX,
  Calculator,
  Compass,
  Users,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Tools & Actions" | "Case Studies" | "Settings";
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setCursorType } = useCursor();

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
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

  const navigateAnchor = (id: string) => {
    setIsOpen(false);
    audioSynth.playClick();
    if (window.location.pathname !== "/") {
      router.push(`/${id}`);
      return;
    }
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigatePath = (path: string) => {
    setIsOpen(false);
    audioSynth.playClick();
    router.push(path);
  };

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "booking",
        title: "Book Consultation",
        category: "Tools & Actions",
        icon: <Calendar className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#booking"),
        badge: "Schedule",
      },
      {
        id: "estimator",
        title: "Project Scope & Cost Calculator",
        category: "Tools & Actions",
        icon: <Calculator className="h-4 w-4 text-neon-purple" />,
        action: () => navigateAnchor("#vault"),
        badge: "Calculator",
      },
      {
        id: "vault",
        title: "Simulate AI Product Roadmap",
        category: "Tools & Actions",
        icon: <Sparkles className="h-4 w-4 text-electric-blue" />,
        action: () => navigateAnchor("#vault"),
        badge: "AI Tool",
      },
      {
        id: "services",
        title: "Explore Core Services",
        category: "Navigation",
        icon: <Layers className="h-4 w-4 text-foreground" />,
        action: () => navigateAnchor("#services"),
      },
      {
        id: "case-studies",
        title: "View All Case Studies",
        category: "Case Studies",
        icon: <Code className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/case-study"),
      },
      {
        id: "insights",
        title: "Read Engineering Blog",
        category: "Case Studies",
        icon: <BookOpen className="h-4 w-4 text-neon-purple" />,
        action: () => navigatePath("/insights"),
      },
      {
        id: "career",
        title: "Tech Career Path Quiz",
        category: "Tools & Actions",
        icon: <Compass className="h-4 w-4 text-electric-blue" />,
        action: () => navigatePath("/career-path"),
      },
      {
        id: "team",
        title: "Leadership & Founders",
        category: "Navigation",
        icon: <Users className="h-4 w-4 text-foreground" />,
        action: () => navigateAnchor("#team"),
      },
      {
        id: "audio",
        title: audioSynth.isMuted() ? "Unmute Interface Sound" : "Mute Interface Sound",
        category: "Settings",
        icon: audioSynth.isMuted() ? (
          <VolumeX className="h-4 w-4 text-text-muted" />
        ) : (
          <Volume2 className="h-4 w-4 text-electric-blue" />
        ),
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

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const lower = query.toLowerCase();
    return commands.filter(
      (c) => c.title.toLowerCase().includes(lower) || c.category.toLowerCase().includes(lower)
    );
  }, [query, commands]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-28 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command Menu"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-xl rounded-2xl border border-card-border bg-[#08080a] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Input Header */}
              <div className="flex items-center px-4 py-3.5 border-b border-card-border">
                <Search className="h-4 w-4 text-electric-blue shrink-0 mr-3" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm font-mono text-foreground outline-none placeholder-zinc-500"
                />
                <span className="text-[10px] font-mono border border-card-border bg-card-bg px-2 py-1 rounded text-text-muted shrink-0 ml-2">
                  ESC
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-[340px] overflow-y-auto p-2 flex flex-col gap-1">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono text-text-muted">
                    No matching commands found.
                  </div>
                ) : (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => {
                        setCursorType("pointer");
                        audioSynth.playTypeTick();
                      }}
                      onMouseLeave={() => setCursorType("default")}
                      className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-card-border hover:bg-card-bg/60 text-left transition-colors font-mono text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg border border-card-border bg-black/40">
                          {cmd.icon}
                        </div>
                        <span className="text-foreground group-hover:text-electric-blue transition-colors font-semibold">
                          {cmd.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {cmd.badge && (
                          <span className="text-[9px] uppercase tracking-wider font-mono border border-electric-blue/30 text-electric-blue bg-electric-blue/10 px-2 py-0.5 rounded-full">
                            {cmd.badge}
                          </span>
                        )}
                        <ArrowRight className="h-3.5 w-3.5 text-text-muted group-hover:text-electric-blue group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Footer status bar */}
              <div className="border-t border-card-border px-4 py-2.5 bg-black/40 flex items-center justify-between text-[10px] font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Command className="h-3 w-3 text-electric-blue" />
                  Navigation Command Palette
                </span>
                <span>Press ↑ ↓ to navigate</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
