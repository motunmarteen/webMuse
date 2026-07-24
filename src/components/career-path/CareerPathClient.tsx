"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuizIntro from "./QuizIntro";
import QuizFlow from "./QuizFlow";
import QuizResults from "./QuizResults";
import type { QuizResult } from "@/lib/career-path-data";

type Stage = "intro" | "quiz" | "results";

export default function CareerPathClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleComplete = (r: QuizResult) => {
    setResult(r);
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestart = () => {
    setResult(null);
    setStage("intro");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "intro" && (
        <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <QuizIntro onStart={() => setStage("quiz")} />
        </motion.div>
      )}
      {stage === "quiz" && (
        <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <QuizFlow onComplete={handleComplete} />
        </motion.div>
      )}
      {stage === "results" && result && (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <QuizResults result={result} onRestart={handleRestart} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
