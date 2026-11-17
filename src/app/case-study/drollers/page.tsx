import type { Metadata } from "next";
import { ShieldCheck, Database, Scale, Wallet, Clock, Sparkles, Send, Lock, Activity, FileCheck, Layers } from "lucide-react";
import { CaseStudyTemplate, type CaseStudyContent } from "@/components/case-study/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Drollers — Engineering a Mathematical Staking Platform That Runs Itself",
  description:
    "How WEBMUSE engineered Drollers: a quantitative selection and staking-cycle platform that builds a verified session on a clock, enters members automatically, settles from real results, charges only on profit and publishes its own record — six pure engines, a provenance-tagged fact ledger and a credits wallet.",
};

const content: CaseStudyContent = {
  eyebrow: "Case Study · Drollers · Live",
  title: "A mathematical staking platform that runs itself on a clock — and shows its record.",
  intro:
    "Drollers applies quantitative selection and staking mathematics to event-market data. It builds a verified session at fixed times, enters members automatically, settles from real results, charges only on profit, and publishes how it actually performs. Behind it sit six pure engines, a provenance-tagged fact ledger and a credits wallet, all engineered by WEBMUSE from the first model to the live Telegram channel.",
  chips: ["Quantitative selection", "Masaniello staking maths", "Automated sessions", "Fees only on profit", "Provenance-tagged facts", "Public track record"],
  summary: {
    label: "00 — The value in one paragraph",
    heading: "Discipline, automation and proof, in one place.",
    text: "Most tools in this space sell confidence. Drollers is built the other way round. It keeps only short-priced selections that two independent probability views agree on, skips a session rather than relax its rules, runs the staking mathematics for the member, and keeps a record of every selection and result in public. The platform only earns when the member does.",
  },
  sections: [
    {
      kind: "cards",
      label: "01 — Products",
      heading: "A ladder of products on one engine room.",
      items: [
        { title: "Quad36", text: "The flagship. A fresh session for everyone every six hours (00:00, 06:00, 12:00, 18:00 WAT), built an hour before it opens with a verified session code. Members are entered automatically at the first kick-off." },
        { title: "Rollover", text: "One session a day at a combined price of about 1.5, in runs of 3 to 7 days chosen by the member. A lost day ends the run, and the fee is taken only when a run ends in profit." },
        { title: "Target30", text: "One session a day at about 2.0. The member chooses how many of 30 selections must succeed, and the stake before each one is worked out." },
        { title: "5 Odds · 10 Odds", text: "Daily sessions built from many short-priced selections across different markets, with how often each one succeeds shown openly." },
        { title: "Value Trades", text: "A short daily list of single selections where the price is better than the estimated chance, with the record of every one." },
        { title: "Tools", text: "A session-code converter and staking calculators that work on their own, with a price-gap planner next." },
      ],
    },
    {
      kind: "features",
      label: "02 — Principles",
      heading: "The rules the platform will not bend.",
      items: [
        { icon: ShieldCheck, title: "Rejection is a valid output", text: "If too few selections qualify, the platform returns fewer, or none. It never lowers its standards to fill a session, and a skipped session is not counted as a loss. Discipline is the product." },
        { icon: Database, title: "Only verified facts become facts", text: "Every stored value carries its provenance: declared, observed, verified, calculated or inferred. Claims and verified results sit side by side and are never merged, so discrepancies stay visible and auditable." },
        { icon: Scale, title: "Honest about edge", text: "Staking cycles manage variance; they do not create an edge. The platform says so, and leads with a public record of every selection and result instead of promises." },
        { icon: Wallet, title: "Fees only on profit", text: "The platform fee is 20% of real profit, paid in the platform's credits (Drolls) and only when a run ends in profit. Nothing is taken at the start and nothing on a loss." },
      ],
    },
    {
      kind: "steps",
      label: "03 — How a session is made",
      heading: "From thousands of events to one verified session.",
      items: [
        { step: "01", title: "Collect and screen", detail: "Upcoming events across sports are pulled, tiered for integrity, and hard-blocked when a competition or market looks unsafe." },
        { step: "02", title: "Check every market", detail: "Each market must have a settlement rule and a results source, or it is excluded and recorded in a coverage report." },
        { step: "03", title: "Work out the fair chance", detail: "The market's built-in margin is removed from the complete market and cross-checked against an independent probability. A price that disagrees is refused." },
        { step: "04", title: "Qualify the selections", detail: "Only selections inside the price band with a high enough fair probability pass: full-event markets only, nothing that can be voided." },
        { step: "05", title: "Assemble the session", detail: "One selection per event, correlation checked, sports and markets mixed, combined price closest to the target. If nothing fits, the session is skipped." },
        { step: "06", title: "Generate and verify the code", detail: "A session code is created and read back to confirm it matches. It is published for everyone about an hour before the first event." },
        { step: "07", title: "Enter, settle, advance", detail: "Members are entered automatically at the start. Results settle event by event, every cycle advances, and the next stake is recomputed." },
      ],
    },
    {
      kind: "cards",
      label: "04 — Architecture",
      heading: "Six pure engines, one thin service.",
      intro: "The core logic lives in libraries that never touch a database or a service. The API only schedules, stores and serves. That separation keeps the mathematics testable, and it is a rule the whole code base obeys.",
      items: [
        { title: "prediction-engine", text: "Probability models, data providers, the market catalogue, selection qualification and backtests." },
        { title: "session-engine", text: "Assembling sessions and cycles, the Masaniello stake maths and capital splits." },
        { title: "verification-engine", text: "Declared versus verified values and the integrity score." },
        { title: "trust-engine", text: "Trust and risk scores, and the account graph used against fraud." },
        { title: "credits-engine", text: "The Drolls ledger: double-entry credits, holds and fees." },
        { title: "audit-engine", text: "The append-only event taxonomy that every important action writes to." },
      ],
    },
    {
      kind: "features",
      label: "05 — Automation and care",
      heading: "No one posts anything by hand.",
      items: [
        { icon: Clock, title: "A scheduler that runs the day", text: "Sessions are built, published, retried when a build or code fails, entered, settled and scored on a timetable." },
        { icon: Sparkles, title: "A plain-language reason for every selection", text: "An AI write-up explains why each one was chosen. It is checked and trimmed to a fixed length, and its spend is tracked against a budget." },
        { icon: Send, title: "Telegram and notifications", text: "Every session published, started, completed or skipped is posted to the Telegram channel and sent to members in the app and by email." },
        { icon: Lock, title: "Careful by default", text: "A risk screen before a first run, visible spending and limits, and a clear notice that outcomes vary and nothing is guaranteed." },
      ],
    },
    {
      kind: "features",
      label: "06 — Trust and money",
      heading: "A wallet and a record you can audit.",
      items: [
        { icon: Layers, title: "Drolls: a double-entry credits ledger", text: "Credits are never edited in place. Every movement is a balanced ledger entry, with holds for fees that could become due." },
        { icon: FileCheck, title: "Every result is scored against what was promised", text: "Each selection is kept and settled from real results, so the platform can show its success rate against the chance it claimed, not just wins." },
        { icon: Activity, title: "Admin controls and results cards", text: "Every product has platform settings, and admin cards compare days and selections that succeeded with what was expected." },
      ],
    },
    {
      kind: "table",
      label: "07 — Technology stack",
      heading: "Production stack and why each piece was chosen.",
      head: ["Layer", "Technology", "Why"],
      rows: [
        ["Web app", "React · Vite · TypeScript · PWA", "A fast, installable app with a product hub, live session pages, history and an admin console."],
        ["API", "Python 3.12 · FastAPI · Pydantic", "A typed API of about 140 endpoints that schedules, stores and serves, while the engines stay pure."],
        ["Engines", "Pure Python libraries", "Six engines with no database access, so the mathematics can be tested in isolation and trusted."],
        ["Data", "PostgreSQL · SQLAlchemy", "About 80 tables including the credits ledger, session and cycle records, and append-only audit events."],
        ["Cloud", "AWS (CDK) · Vercel · scheduled backups", "The API and database on AWS defined as code, the web app on Vercel, and a database backup job."],
        ["Quality", "pytest · CI · secret scanning", "Each engine is tested on its own, and CI runs the tests and scans for leaked secrets on every change."],
      ],
    },
  ],
  metrics: [
    { n: "6", l: "Live products" },
    { n: "6", l: "Pure, DB-free engines" },
    { n: "5", l: "Data provenance tags" },
    { n: "~140", l: "API endpoints" },
    { n: "~80", l: "Database tables" },
    { n: "1,000+", l: "Automated tests" },
  ],
  metricsNote: "Live on the web, with its own Telegram channel.",
  footnote: "Staking mathematics manages variance; it does not remove risk. Outcomes vary and nothing is guaranteed.",
};

export default function DrollersCaseStudyPage() {
  return <CaseStudyTemplate c={content} />;
}
