import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Percent, Wallet, ShieldCheck, Link2, CheckCircle2 } from "lucide-react";
import ReferralLinkGenerator from "@/components/partners/ReferralLinkGenerator";

export const metadata: Metadata = {
  title: "WEBMUSE Partners — Refer a Client, Earn 10%",
  description:
    "Refer a client to WEBMUSE and earn 10% of their first project fee, paid in the same currency they paid in — no application, no cap, no dashboard required.",
};

const STEPS = [
  { icon: Link2, title: "Get your link", body: "Enter your name below and copy your unique referral link. Or just have the person you refer mention your name when they reach out." },
  { icon: CheckCircle2, title: "We confirm it", body: "When a new client contacts us, we ask who referred them and confirm it matches before it's counted — no automated guessing." },
  { icon: Wallet, title: "You get paid", body: "Once the client's first payment has fully cleared to WEBMUSE, you're paid 10% of it — in the same currency they paid in." },
];

const TERMS = [
  { k: "Who can join", v: "Anyone. No application, no existing-client requirement." },
  { k: "What you earn", v: "10% of the client's first project fee or invoice — uncapped. Refer 1 client or 50, you earn on all of them." },
  { k: "What it doesn't cover", v: "Retainer renewals or follow-on projects after the first payment aren't included — this is a one-time reward per client, not a revenue share." },
  { k: "When you're paid", v: "Only after the client's payment has fully cleared to WEBMUSE. Never on a signed contract alone." },
  { k: "What currency", v: "Whatever currency the client paid in — you receive your 10% in that same currency." },
  { k: "What disqualifies a referral", v: "Referring yourself, a company you own, or a client you share contact or payment details with. WEBMUSE has final discretion to decline a referral that doesn't reflect a genuine introduction." },
];

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded-full"
          >
            <Image src="/webMuse-Logo.png" alt="WEBMUSE Logo" width={30} height={30} className="object-contain" />
            <span className="font-display font-bold tracking-widest text-base text-text-title">WEBMUSE</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-grow relative overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] h-[420px] w-[420px] rounded-full bg-mesh-purple opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 px-6 lg:px-24 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              WEBMUSE Partners
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-title mt-4">
              Bring us a client. Earn 10% of what they pay.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-xl">
              If you know someone who needs what we build, tell them about us. When they become a
              paying client, you earn 10% of their first project fee — paid in the same currency
              they paid in. No application, no cap on how many people you refer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {STEPS.map((s) => (
                <div key={s.title} className="glassmorphism-card rounded-xl p-5">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue w-fit">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-text-title tracking-tight mt-3">{s.title}</h3>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <ReferralLinkGenerator />
            </div>

            <section className="mt-14">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">
                <Percent className="h-3.5 w-3.5 text-electric-blue" />
                How it works, in full
              </span>
              <div className="rounded-xl border border-card-border overflow-hidden mt-5">
                {TERMS.map((row, i) => (
                  <div
                    key={row.k}
                    className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-5 px-5 py-4 bg-card-bg/30 ${i !== 0 ? "border-t border-card-border" : ""}`}
                  >
                    <span className="text-xs font-mono font-semibold text-electric-blue sm:w-56 shrink-0">{row.k}</span>
                    <p className="text-sm text-text-muted font-light m-0 leading-relaxed">{row.v}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-dashed border-card-border bg-card-bg/20 p-6 flex gap-4 items-start">
              <ShieldCheck className="h-5 w-5 text-electric-blue shrink-0 mt-0.5" />
              <p className="text-sm text-text-muted font-light leading-relaxed m-0">
                This program runs on trust and a manual check on our side, not an automated
                dashboard — every referral is confirmed directly with the new client before any
                payout is agreed. If something about a referral looks gamed or dishonest, we
                reserve the right to decline it.
              </p>
            </section>

            <section className="mt-10">
              <a
                href="mailto:hello@webmuse.tech?subject=Referral%20-%20WEBMUSE%20Partners"
                className="flex items-center justify-center rounded-full bg-electric-blue px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white font-mono transition-all hover:bg-electric-blue/90 hover:shadow-[0_0_30px_-5px_var(--color-electric-blue-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4"
              >
                Questions? Email hello@webmuse.tech
              </a>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} WEBMUSE INC. ALL RIGHTS RESERVED.
          </span>
          <nav aria-label="Legal" className="flex items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/status" className="hover:text-foreground transition-colors">Status</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
