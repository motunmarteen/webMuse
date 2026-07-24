"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { careerQuestions, calculateResults, type QuizResult } from "@/lib/career-path-data";

export default function QuizFlow({ onComplete }: { onComplete: (result: QuizResult) => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);
  const [isFinishing, setIsFinishing] = useState(false);

  const question = careerQuestions[index];
  const total = careerQuestions.length;
  const progress = ((index + 1) / total) * 100;
  const isLast = index === total - 1;
  const selected = answers[question.id];

  const canGoNext = Boolean(selected);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    if (isLast) {
      setIsFinishing(true);
      window.setTimeout(() => {
        onComplete(calculateResults(answers));
      }, 700);
      return;
    }
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (index === 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  const optionLetters = useMemo(() => ["A", "B", "C", "D", "E", "F"], []);

  if (isFinishing) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          className="mb-5"
        >
          <Sparkles className="h-10 w-10 text-electric-blue" />
        </motion.div>
        <h2 className="text-xl md:text-2xl font-bold text-text-title tracking-tight">
          Mapping your answers to real tech paths…
        </h2>
        <p className="text-text-muted font-light text-sm mt-2">This takes a second, not a sign-up.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress header */}
      <div className="sticky top-0 z-30 bg-background pb-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">
            {question.category}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
            {index + 1} / {total}
          </span>
        </div>
        <div className="h-1 w-full rounded-full bg-card-border overflow-hidden">
          <motion.div
            className="h-full bg-electric-blue"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 relative z-10"
        >
          <h2 className="text-xl md:text-2xl font-bold text-text-title tracking-tight leading-snug text-balance">
            {question.question}
          </h2>

          <div className="flex flex-col gap-2.5 mt-7">
            {question.options.map((option, i) => {
              const isSelected = selected === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  aria-pressed={isSelected}
                  className={`group flex items-start gap-4 text-left rounded-xl border px-5 py-4 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2 ${
                    isSelected
                      ? "border-electric-blue/60 bg-electric-blue/10"
                      : "border-card-border bg-card-bg/40 hover:border-electric-blue/30 hover:bg-card-bg/70"
                  }`}
                >
                  <span
                    className={`shrink-0 flex items-center justify-center h-6 w-6 rounded-full text-[10px] font-mono font-bold mt-0.5 transition-colors ${
                      isSelected
                        ? "bg-electric-blue text-white"
                        : "bg-card-border text-text-muted group-hover:text-text-title"
                    }`}
                  >
                    {optionLetters[i]}
                  </span>
                  <span
                    className={`text-sm md:text-base font-light leading-relaxed ${
                      isSelected ? "text-text-title" : "text-text-muted group-hover:text-text-title"
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="flex items-center justify-between mt-9">
        <button
          onClick={handleBack}
          disabled={index === 0}
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-title transition-colors disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 rounded-full bg-electric-blue px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white font-mono transition-all hover:bg-electric-blue/90 disabled:opacity-30 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {isLast ? "See my results" : "Next"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
