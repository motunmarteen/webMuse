import type { Metadata } from "next";
import { ShieldCheck, Zap, KeyRound, Server, Network, Layers, Gauge, FileCheck } from "lucide-react";
import { CaseStudyTemplate, type CaseStudyContent } from "@/components/case-study/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "CopyRail — Engineering Signed, Sub-Millisecond Trade-Copying Infrastructure",
  description:
    "How WEBMUSE engineered CopyRail: trade-copying infrastructure for Deriv MT5 that copies one master account to many followers without ever holding their funds — one signature per signal, sub-millisecond software legs, sealed credential intake and a hosted terminal fleet.",
};

const content: CaseStudyContent = {
  eyebrow: "Case Study · CopyRail · Engineered and tested, pre-launch",
  title: "Copy one account to thousands, without holding anyone's money.",
  intro:
    "CopyRail is trade-copying infrastructure for Deriv MT5. A master account's trades are replicated to any number of follower accounts in close to real time, while every follower keeps full custody of their own funds. WEBMUSE designed it from first principles: a signed wire protocol, a relay that does the same work for ten followers or fifty thousand, sealed credential intake, and a hosted terminal fleet.",
  chips: ["Signed instructions", "Sub-millisecond hot path", "No custody of funds", "Sealed credentials", "Hosted MT5 fleet", "Partner API"],
  summary: {
    label: "00 — The value in one paragraph",
    heading: "Fast, correct and never holding the money.",
    text: "Copying a trade sounds simple until it has to be right for thousands of accounts at once. CopyRail signs each instruction once, fans it out to every follower, and lets each follower's own terminal verify, size and place the order locally. A compromised server or network path cannot trade, because nothing it could forge would carry a valid signature. Followers never hand over funds, only a sealed login that no human ever sees.",
  },
  sections: [
    {
      kind: "rows",
      label: "01 — Problem",
      heading: "Following a trader well is harder than it looks.",
      items: [
        { k: "Manual copying", v: "Re-entering every trade by hand is slow, error-prone and impossible to do faithfully in real time." },
        { k: "Custody risk", v: "Handing funds to someone else to manage is a much bigger trust and regulatory step than most people want to take." },
        { k: "Black-box vendors", v: "A company that wants copy-trading in its own product either builds the whole mechanism itself or inherits a vendor's reliability, pricing and roadmap." },
        { k: "Scale", v: "A system that is fast for ten followers can fall over at ten thousand, exactly when the strategy succeeds." },
      ],
    },
    {
      kind: "steps",
      label: "02 — How a trade is copied",
      heading: "One signal in, one signature, many orders out.",
      items: [
        { step: "01", title: "The master's terminal reports the trade", detail: "A watcher running inside the master's MT5 terminal sends the event over a persistent, encrypted connection." },
        { step: "02", title: "The relay validates and decides", detail: "It parses strictly, removes duplicates, checks the kill switches and turns the signal into an intent." },
        { step: "03", title: "It signs once", detail: "A single Ed25519 signature covers the instruction, so the cost does not grow with the number of followers." },
        { step: "04", title: "Gateways fan out", detail: "Sharded gateways, each serving up to about 1,500 connections, write the same signed bytes to every follower socket." },
        { step: "05", title: "Each follower verifies and places the order", detail: "The follower's executor checks the signature, sizes the trade locally, places the order and acknowledges it." },
      ],
    },
    {
      kind: "features",
      label: "03 — Core functionality",
      heading: "What makes it safe, fast and sellable.",
      items: [
        { icon: KeyRound, title: "Secure by construction", points: [
          "Every instruction is signed, so a hacked gateway or network path cannot trade.",
          "Follower credentials are sealed on entry and protected by per-record envelope encryption bound to their account; a provisioning bot logs in with no human in the loop.",
          "API keys are typed and peppered, all input is parsed strictly, and money never passes through floating-point numbers.",
        ] },
        { icon: Zap, title: "A hot path measured in fractions of a millisecond", points: [
          "The relay's own work (parse, dedupe, kill switch, intent, sign) measured p50 0.11 ms and p99 0.39 ms.",
          "The follower side (verify, decode, size) measured p50 0.16 ms and p99 0.48 ms. The broker's execution time comes on top and is not CopyRail's.",
          "Fan-out costs about 14 microseconds per follower and is sharded across gateways, with a design target of every connected follower getting the trade within 50 ms at 10,000 followers.",
        ] },
        { icon: Server, title: "A hosted terminal fleet", points: [
          "Each follower needs their own MT5 terminal, so CopyRail runs a fleet with a lean per-account workspace, crash recovery and canary roll-out of terminal updates.",
          "That fleet runs on the WEBMUSE Freetles Cloud runtime, which hosts terminals densely on Linux and never handles credentials or places trades itself.",
        ] },
        { icon: Network, title: "Two ways to use it", points: [
          "Individuals subscribe directly, connect their own master and follower accounts and keep funds in their own account throughout.",
          "Companies integrate through a documented partner API to offer copy-trading under their own brand.",
        ] },
        { icon: ShieldCheck, title: "Built-in safety controls", points: [
          "Kill switches stop copying instantly, and idempotency keys make a repeated signal safe.",
          "Positioning rules keep the product honest: no guaranteed-profit language, no custody, no referral or network-reward logic of any kind.",
        ] },
      ],
    },
    {
      kind: "cards",
      label: "04 — Architecture",
      heading: "Pure rules at the centre, I/O at the edge.",
      intro: "The domain rules (signals, intents, sizing, kill switches, idempotency) are pure code with no I/O, so they can be tested exhaustively. Security, protocol, relay, provisioning, fleet, executor and network layers sit around them, and every significant decision is recorded as an architecture decision record.",
      items: [
        { title: "domain", text: "Signals, intents, sizing, kill switches and idempotency. Pure rules, no I/O." },
        { title: "security · protocol", text: "Ed25519 frame signing, the credential vault, API keys, strict inbound parsing and canonical signed encoding." },
        { title: "relay · net", text: "The hot path orchestration, master intake, follower gateways, key authentication and the internal bus." },
        { title: "provisioning · fleet", text: "The login bot that takes a sealed password to an ACTIVE or FAILED account, and per-account MT5 workspaces." },
        { title: "executor", text: "Verify, dedupe, size, order and acknowledge, for any MT5 broker, with a readiness gate." },
        { title: "api · billing · messaging", text: "The partner and admin APIs, crypto-payment billing, and notifications including web push and Telegram." },
      ],
    },
    {
      kind: "features",
      label: "05 — Quality and delivery",
      heading: "Tested against hostile conditions.",
      items: [
        { icon: FileCheck, title: "Adversarial testing", text: "Hundreds of automated tests include real-socket runs of the whole relay, gateway and executor chain, with tampered, forged, replayed and hostile input and provisioning failures, plus benchmarks for the hot path and fan-out." },
        { icon: Layers, title: "Documented decisions", text: "Thirty-four architecture decision records, a threat model, runbooks for deployment, key rotation and multi-server operation, and a readiness register that states plainly what is and is not proven yet." },
        { icon: Gauge, title: "A web app and an admin console", text: "A follower app (installable, with a photo editor and push) and a separate admin console, both built with React and Vite." },
      ],
    },
    {
      kind: "table",
      label: "06 — Technology stack",
      heading: "Production stack and why each piece was chosen.",
      head: ["Layer", "Technology", "Why"],
      rows: [
        ["Core", "Python 3.12 · asyncio · websockets", "A single-purpose relay and gateways that stay fast and simple under many connections."],
        ["Security", "Ed25519 · envelope encryption · Argon2", "Sign once, verify everywhere; credentials and passwords protected at rest."],
        ["Terminals", "MetaTrader 5 · MQL5 watcher · Linux + Wine fleet", "The only way to trade MT5 accounts, run densely and recovered automatically."],
        ["Control plane", "FastAPI · PostgreSQL · Redis", "Partner and admin APIs, records, and a message bus for multi-server deployments."],
        ["Apps", "React · Vite · TypeScript · PWA", "A follower app and an admin console, installable and fast."],
        ["Quality", "pytest · Hypothesis · benchmarks", "Property-based tests and measured latency evidence for every release."],
      ],
    },
  ],
  metrics: [
    { n: "0.11 ms", l: "Relay hot path, p50" },
    { n: "~14 µs", l: "Fan-out cost per follower" },
    { n: "500+", l: "Automated tests" },
    { n: "34", l: "Architecture decision records" },
    { n: "130+", l: "Source modules" },
    { n: "0", l: "Funds held by the platform" },
  ],
  metricsNote: "Engineered, tested and benchmarked; not yet launched to the public.",
};

export default function CopyRailCaseStudyPage() {
  return <CaseStudyTemplate c={content} />;
}
