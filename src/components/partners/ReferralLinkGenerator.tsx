"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Link2 } from "lucide-react";
import { buildReferralLink } from "@/utils/referral";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export default function ReferralLinkGenerator() {
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const code = slugify(name);
  const link = code ? buildReferralLink(code) : "";

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glassmorphism-card rounded-2xl p-6 md:p-8">
      <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-3">
        <Link2 className="h-3.5 w-3.5" />
        Get your link
      </span>
      <label htmlFor="partner-name" className="block text-sm text-text-muted font-light mb-2">
        Enter your name or a code you&apos;ll remember — this becomes part of your link, so we can
        credit the right person when a client mentions it.
      </label>
      <input
        id="partner-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Motun or motun-referrals"
        className="w-full bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-full px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder-zinc-500"
      />

      {link && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <div className="flex-1 min-w-0 rounded-full border border-card-border bg-card-bg/60 px-5 py-3 overflow-x-auto">
            <span className="text-xs font-mono text-text-title whitespace-nowrap">{link}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-full bg-electric-blue px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white font-mono shrink-0 transition-all hover:bg-electric-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </motion.div>
      )}

      <p className="text-[11px] text-text-muted font-light mt-4 leading-relaxed">
        Share this link, or just have the person you refer mention your name when they reach out.
        We confirm every referral directly with the new client before it&apos;s counted — no
        sign-up, no dashboard, no waiting on anything to sync.
      </p>
    </div>
  );
}
