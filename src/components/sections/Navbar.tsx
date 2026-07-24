"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCursor } from "@/components/ui/CustomCursor";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Menu, X, Calendar, Volume2, VolumeX } from "lucide-react";
import { audioSynth } from "@/utils/audioSynth";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Our Process", href: "#process" },
  { label: "Constellation", href: "#universe" },
  { label: "Innovation Gallery", href: "#gallery" },
  { label: "Case Study", href: "/case-study" },
  { label: "Career Path", href: "/career-path" },
  { label: "Leadership", href: "#team" },
  { label: "Idea Vault", href: "#vault" },
];

function isNavItemExternal(href: string) {
  return href.startsWith("/");
}

export default function Navbar({ show }: { show: boolean }) {
  const [activeItem, setActiveItem] = useState("#");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(() => audioSynth.isMuted());
  const { setCursorType } = useCursor();
  const bookBtnRef = useMagnetic(30, 0.3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    audioSynth.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      audioSynth.playClick();
    }
  };

  const handleLinkClick = (href: string) => {
    audioSynth.playClick();
    setActiveItem(href);
  };

  if (!show) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center p-4 transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-6"
        }`}
      >
        <div
          className={`flex w-full max-w-7xl items-center justify-between px-6 py-3 transition-all duration-500 rounded-full ${
            scrolled
              ? "glassmorphism shadow-lg shadow-black/20 max-w-5xl"
              : "border border-white/0 bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={() => handleLinkClick("#")}
            onMouseEnter={() => {
              setCursorType("pointer");
              audioSynth.playClick();
            }}
            onMouseLeave={() => setCursorType("default")}
            className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded-full"
          >
            <Image
              src="/webMuse-Logo.png"
              alt="WEBMUSE Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-display font-bold tracking-widest text-lg bg-gradient-to-r from-text-title to-text-muted bg-clip-text text-transparent">
              WEBMUSE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-electric-blue animate-pulse" aria-hidden="true" />
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.href;
              const linkProps = {
                onClick: () => handleLinkClick(item.href),
                onMouseEnter: () => {
                  setCursorType("pointer");
                  audioSynth.playClick();
                },
                onMouseLeave: () => setCursorType("default"),
                className: `relative px-4 py-1.5 text-xs font-medium uppercase font-mono tracking-wider transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2 rounded-full ${
                  isActive ? "text-text-title" : "text-text-muted hover:text-text-title"
                }`,
              };
              const inner = (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 z-0 rounded-full bg-card-bg border border-card-border"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              );
              return isNavItemExternal(item.href) ? (
                <Link key={item.label} href={item.href} {...linkProps}>
                  {inner}
                </Link>
              ) : (
                <a key={item.label} href={item.href} {...linkProps}>
                  {inner}
                </a>
              );
            })}
          </nav>

          {/* Action Button & Menu Toggles */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleMute}
              onMouseEnter={() => {
                setCursorType("pointer");
                audioSynth.playClick();
              }}
              onMouseLeave={() => setCursorType("default")}
              className="flex items-center justify-center p-2 rounded-full border border-card-border bg-card-bg text-foreground transition-all hover:bg-card-bg/85 hover:border-card-border/80 h-9 w-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
              aria-label={isMuted ? "Unmute interface sound" : "Mute interface sound"}
              aria-pressed={!isMuted}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-text-muted" />
              ) : (
                <Volume2 className="h-4 w-4 text-electric-blue" />
              )}
            </button>

            {/* Book Consultation */}
            <div ref={bookBtnRef} className="hidden sm:block">
              <a
                href="#booking"
                onClick={() => handleLinkClick("#booking")}
                onMouseEnter={() => {
                  setCursorType("pointer");
                  audioSynth.playClick();
                }}
                onMouseLeave={() => setCursorType("default")}
                className="flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-md transition-all hover:bg-card-bg/85 hover:border-card-border/80 font-mono focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
              >
                <Calendar className="h-3.5 w-3.5 text-electric-blue" aria-hidden="true" />
                Book Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                audioSynth.playClick();
                setIsOpen(!isOpen);
              }}
              onMouseEnter={() => {
                setCursorType("pointer");
                audioSynth.playClick();
              }}
              onMouseLeave={() => setCursorType("default")}
              className="flex md:hidden p-2 rounded-full border border-card-border bg-card-bg text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
            >
              {isOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-background/95 backdrop-blur-xl p-8 pt-32 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, idx) => {
                const motionProps = {
                  initial: { opacity: 0, x: -30 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.05 + 0.1, ease: "easeOut" as const },
                  onClick: () => {
                    handleLinkClick(item.href);
                    setIsOpen(false);
                  },
                  onMouseEnter: () => audioSynth.playClick(),
                  className:
                    "font-display text-3xl font-light text-text-muted hover:text-text-title transition-colors tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded",
                };
                return isNavItemExternal(item.href) ? (
                  <motion.div key={item.label} {...motionProps}>
                    <Link href={item.href} onClick={motionProps.onClick} className="block">
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a key={item.label} href={item.href} {...motionProps}>
                    {item.label}
                  </motion.a>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 border-t border-card-border pt-6"
            >
              <a
                href="#booking"
                onClick={() => {
                  handleLinkClick("#booking");
                  setIsOpen(false);
                }}
                onMouseEnter={() => audioSynth.playClick()}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground py-4 text-sm font-semibold text-background hover:opacity-90 transition-opacity"
              >
                <Calendar className="h-4 w-4 text-electric-blue" />
                Book Consultation
              </a>
              <span className="text-center font-mono text-[10px] text-text-muted uppercase tracking-widest">
                Where Ideas Become Digital Reality
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

