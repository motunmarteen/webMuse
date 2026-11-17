import type { Metadata } from "next";
import { Smartphone, Users, Dumbbell, Wallet, ShieldCheck, Radio, Building2, Sparkles } from "lucide-react";
import { CaseStudyTemplate, type CaseStudyContent } from "@/components/case-study/CaseStudyTemplate";

export const metadata: Metadata = {
  title: "Gym Passport — Designing One App for Members, Trainers and Gym Owners",
  description:
    "How WEBMUSE designed Gym Passport: an installable app for gyms with a member side, a trainer side and an owner dashboard — QR and NFC access, live floor, memberships, wallet, workouts, classes, a social feed and equipment tracking — built as an offline-capable PWA prototype.",
};

const content: CaseStudyContent = {
  eyebrow: "Case Study · Gym Passport · Working prototype",
  title: "One app for members, trainers and gym owners.",
  intro:
    "Gym Passport is an installable web app that runs a gym end to end. Members clock in, pay, train and socialise; trainers manage their clients and classes; owners watch the live floor, memberships, equipment and money. WEBMUSE designed and built it as a polished, offline-capable prototype, with local payment methods and multi-branch support in mind.",
  chips: ["Installable PWA", "Member + trainer + admin", "QR and NFC access", "Live floor", "Wallet", "Social feed"],
  summary: {
    label: "00 — The value in one paragraph",
    heading: "Everything a gym runs on, in one passport.",
    text: "Gyms usually juggle a door system, a spreadsheet of members, a till, a notebook of equipment faults and a WhatsApp group. Gym Passport puts the member's access, wallet and workouts in their pocket and gives the owner one live picture of who is on the floor, who is expiring, what is broken and what was sold.",
  },
  sections: [
    {
      kind: "rows",
      label: "01 — Problem",
      heading: "Running a gym is a patchwork of tools.",
      items: [
        { k: "Access", v: "Doors, cards and desk check-ins are disconnected from membership status, so expired members walk in and forgotten clock-outs distort the numbers." },
        { k: "Money", v: "Renewals, shop sales and cash are tracked by hand, and payment options rarely match how people in the region actually pay." },
        { k: "Retention", v: "Members drift away because nothing keeps them engaged between visits." },
        { k: "Upkeep", v: "Equipment faults are noticed late and repairs are not tracked from report to fix." },
      ],
    },
    {
      kind: "features",
      label: "02 — What the app does",
      heading: "Three apps, one connected data model.",
      items: [
        { icon: Smartphone, title: "The member app", points: [
          "Scan to clock in, with membership plans, family members, promo codes and cancellation.",
          "A wallet that supports card, bank transfer, USSD and mobile money.",
          "A workout logger with personal-record detection, an AI coach that learns from the member's own data, body tracking with photos, classes, challenges, friends and guest passes.",
        ] },
        { icon: Dumbbell, title: "The trainer app", points: [
          "Clients, programmes and classes in one place, tied to the same member records the owner sees.",
        ] },
        { icon: Building2, title: "The owner dashboard", points: [
          "An overview, members with renew, pause and NFC card issue or loss, a live floor, equipment with a repair workflow, sales and stock, finance, staff and roles, security flags, classes and an activity log.",
          "Multi-branch support, and automatic closing of forgotten clock-outs.",
        ] },
        { icon: Users, title: "A social layer", points: [
          "A Pulse feed with photos and stories, challenges and friends, designed to keep members coming back.",
        ] },
      ],
    },
    {
      kind: "cards",
      label: "03 — Design decisions",
      heading: "Built to be shown, installed and understood in minutes.",
      items: [
        { title: "Installable and offline-capable", text: "A progressive web app with a service worker, so it installs on a phone from a link and keeps working with a weak connection." },
        { title: "One shared model", text: "Members, access, sales and equipment all hang off the same records, so a clock-in shows on the owner's live floor immediately." },
        { title: "Honest demo", text: "Scanning, payments, push and NFC are simulated in the prototype, and the app says so. The data lives on the device and can be reset in one tap." },
        { title: "A warm, gym-focused identity", text: "A mature palette, an animated landing page and a phone-frame presentation, refined over several design passes." },
      ],
    },
    {
      kind: "table",
      label: "04 — Technology stack",
      heading: "A lean stack that ships fast.",
      head: ["Layer", "Technology", "Why"],
      rows: [
        ["Client", "Vanilla JavaScript · HTML · CSS", "No framework weight, quick on low-end phones, easy to hand over."],
        ["Installability", "Web App Manifest · Service Worker", "Add to home screen on Android and iPhone, offline shell and cache versioning."],
        ["Data (prototype)", "On-device storage", "A fully working demo with no server, resettable at any time."],
        ["Next step", "API · payments · push · NFC reader", "The prototype's simulated parts map to real integrations."],
      ],
    },
  ],
  metrics: [
    { n: "3", l: "Apps in one: member, trainer, admin" },
    { n: "4", l: "Payment methods designed in" },
    { n: "10+", l: "Owner dashboard areas" },
    { n: "0", l: "Servers needed for the demo" },
    { n: "PWA", l: "Installable on any phone" },
    { n: "Multi", l: "Branch support" },
  ],
  metricsNote: "A working prototype; payments, push and NFC are simulated.",
};

export default function GymPassportCaseStudyPage() {
  return <CaseStudyTemplate c={content} />;
}
