import type { Metadata } from "next";
import { ShieldCheck, Search, Wifi, Boxes, Server, Lock } from "lucide-react";
import { CaseStudyTemplate, type CaseStudyContent } from "@/components/case-study/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Freetles — Free Browser Tools That Never Upload Your Files",
  description:
    "How WEBMUSE engineered Freetles: a free, private, offline-capable toolbox where you describe the problem instead of hunting for the tool — a typed tool registry, deterministic intent routing, client-side processing so files never leave the device, and a sister cloud runtime for dense terminal hosting.",
};

const content: CaseStudyContent = {
  eyebrow: "Case Study · Freetles · Live",
  title: "Describe the problem. The right tool opens. Your file never leaves your device.",
  intro:
    "Freetles is a free toolbox for the small digital problems people hit every day: compress a photo, find a lost Bluetooth device, strip location data before posting. There is no account and no upload, and nearly everything works offline. WEBMUSE built it around a typed tool registry and an intent router, so people can say what they need in ordinary words.",
  chips: ["No account", "No upload", "Works offline", "Intent routing", "Typed tool registry", "Installable PWA"],
  summary: {
    label: "00 — The value in one paragraph",
    heading: "Private by construction, not by policy.",
    text: "Most free-tool sites are ad-heavy, sign-up-gated and send your files to a server. Freetles does the opposite. Because nearly every tool runs in the browser, there is simply no server to send a file to, so privacy and offline use come for free. And because people rarely know which tool they need, they describe their problem and the router finds it.",
  },
  sections: [
    {
      kind: "rows",
      label: "01 — Problem",
      heading: "Everyday tools are scattered, slow and hungry for your data.",
      items: [
        { k: "Scattered", v: "Compressing, converting and checking things means hopping between dozens of sites, each with its own limits." },
        { k: "Sign-up walls", v: "Many require an account, a payment, or both, for a thirty-second job." },
        { k: "Uploads", v: "Files, including photos with hidden location data, are sent to servers the person knows nothing about." },
        { k: "Knowing the name", v: "People know their problem, not the name of the tool that solves it." },
      ],
    },
    {
      kind: "features",
      label: "02 — Core functionality",
      heading: "What makes Freetles different.",
      items: [
        { icon: ShieldCheck, title: "Zero-server file transit", points: [
          "Image, text, developer and security tools run entirely in the browser, so a file is never uploaded.",
          "Only two tools that physically cannot run in a browser sandbox (DNS and IP lookup) use a server, and the registry marks them so they are never cached for offline use.",
        ] },
        { icon: Search, title: "Intent routing: say what you need", points: [
          "\"Photo too big to upload\" opens the image compressor; \"I lost my earbuds\" opens the Bluetooth finder; \"does my photo show where I live\" opens the metadata tool.",
          "It is deterministic and offline: no model call, no delay, no per-query cost, and every result carries the reason it matched. It also refuses requests for tools that do not exist instead of guessing.",
        ] },
        { icon: Boxes, title: "27 tools across six categories", points: [
          "Tech rescue and network, image tools, text and writing, developer tools, security and privacy, and games and randomisers, with four AI image tools planned.",
          "Each tool is a pure, typed function, which is also what lets an AI assistant call them safely later.",
        ] },
        { icon: Wifi, title: "Offline and light by design", points: [
          "An installable progressive web app with a service worker, so tools keep working with weak or no connection.",
          "Built to stay quick on low-end phones and slow networks.",
        ] },
      ],
    },
    {
      kind: "cards",
      label: "03 — Architecture",
      heading: "One registry, many projections.",
      intro: "A typed tool registry is the core domain. Search, sitemaps, structured data, the offline precache list, slug redirects and the file-type lookup are all generated from the same manifest, so adding a tool means adding one manifest and one pure function. Everything else follows.",
      items: [
        { title: "registry", text: "The tool manifests, categories and the intent router. It depends on nothing." },
        { title: "tools-core", text: "The pure functions that do the work: image, crypto, device, text and formatting." },
        { title: "brand", text: "Every user-visible string in one package, so a rename is a one-file change." },
        { title: "web", text: "A thin delivery adapter in Next.js that renders the registry and handles offline caching." },
      ],
    },
    {
      kind: "features",
      label: "04 — A sister product",
      heading: "Freetles Cloud: the runtime behind the name.",
      items: [
        { icon: Server, title: "Dense terminal hosting, licensed to customers", text: "WEBMUSE also built the Freetles Cloud runtime, which runs trading-terminal workloads densely on Linux with about 3.5 times less idle CPU (measured), crash recovery, update control and canary roll-outs. It runs on the customer's own servers." },
        { icon: Lock, title: "Designed so it cannot be misused", text: "It never handles credentials, cannot place trades, has no remote control channel, accepts only signed releases, and never lets a licence limit cause a missed trade. These promises are enforced by automated tests." },
      ],
    },
    {
      kind: "table",
      label: "05 — Technology stack",
      heading: "Production stack and why each piece was chosen.",
      head: ["Layer", "Technology", "Why"],
      rows: [
        ["Web", "Next.js · React · TypeScript", "Fast, search-friendly pages and an installable app from one code base."],
        ["Monorepo", "pnpm workspaces · Turborepo", "Shared registry, tool and brand packages with strict boundaries."],
        ["Processing", "Browser APIs · WebAssembly · Web Workers", "Heavy work stays on the device, off the main thread."],
        ["Offline", "Service worker · IndexedDB", "A precache generated from the registry, with local storage when needed."],
        ["Hosting", "Vercel", "Global delivery, with preview deployments kept out of search results."],
        ["Quality", "Vitest · typecheck", "86 automated tests including a routing-accuracy gate run on every change."],
      ],
    },
  ],
  metrics: [
    { n: "27", l: "Tools in six categories" },
    { n: "0 bytes", l: "File data sent to a server" },
    { n: "86", l: "Automated tests" },
    { n: "85", l: "Routing phrasings in the gate" },
    { n: "0", l: "Sign-ups required" },
    { n: "Offline", l: "Installable app" },
  ],
  metricsNote: "The routing gate measures the router against phrasings WEBMUSE wrote, so it proves consistency; real queries will replace them once there is traffic.",
};

export default function FreetlesCaseStudyPage() {
  return <CaseStudyTemplate c={content} />;
}
