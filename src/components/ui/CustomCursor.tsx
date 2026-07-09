"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorType = "default" | "pointer" | "hover" | "click" | "text" | "expand";

interface CursorContextProps {
  cursorType: CursorType;
  cursorText: string;
  setCursorType: (type: CursorType) => void;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextProps>({
  cursorType: "default",
  cursorText: "",
  setCursorType: () => {},
  setCursorText: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState<string>("");

  return (
    <CursorContext.Provider
      value={{
        cursorType,
        cursorText,
        setCursorType,
        setCursorText,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export default function CustomCursor() {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring to create lag/drag effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Suppress MetaMask/chrome-extension unhandled rejections and window errors
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (reason) {
        const reasonStr = typeof reason === "object" ? String(reason.message || reason.stack || "") : String(reason);
        if (
          reasonStr.includes("MetaMask") ||
          reasonStr.includes("Failed to connect to MetaMask") ||
          (reason.stack && reason.stack.includes("chrome-extension://"))
        ) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }
    };

    const handleWindowError = (event: ErrorEvent) => {
      const message = event.message || "";
      const stack = event.error?.stack || "";
      if (
        message.includes("MetaMask") ||
        message.includes("Failed to connect to MetaMask") ||
        stack.includes("chrome-extension://")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection, true);
    window.addEventListener("error", handleWindowError, true);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true);
      window.removeEventListener("error", handleWindowError, true);
    };
  }, []);

  if (!isVisible) return null;

  // Variants for custom cursor styles
  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(0, 112, 243, 0.1)",
      border: "2px solid #0070f3",
      boxShadow: "0 0 15px rgba(0, 112, 243, 0.4)",
    },
    hover: {
      width: 56,
      height: 56,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
    },
    click: {
      width: 24,
      height: 24,
      backgroundColor: "#0070f3",
      border: "1px solid #0070f3",
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(0, 112, 243, 0.85)",
      border: "1px solid #0070f3",
      boxShadow: "0 0 20px rgba(0, 112, 243, 0.3)",
    },
    expand: {
      width: 96,
      height: 96,
      backgroundColor: "rgba(168, 85, 247, 0.2)",
      border: "1px solid #a855f7",
      boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)",
    },
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={cursorType}
        variants={outerVariants}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorType === "text" && cursorText && (
          <span className="text-[10px] font-bold tracking-widest text-white uppercase font-mono animate-fade-in">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-1.5 w-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </>
  );
}
