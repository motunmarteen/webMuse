"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Link2, Send, AlertTriangle } from "lucide-react";
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
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [payoutDetails, setPayoutDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const code = slugify(displayName);
  const link = code ? buildReferralLink(code) : "";

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email || !code) {
      setError("Please fill in your name and email so we can register your code.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, email, code, payoutDetails }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "We couldn't register your code. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't register your code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="glassmorphism-card rounded-2xl p-6 md:p-8">
      <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-electric-blue mb-3">
        <Link2 className="h-3.5 w-3.5" />
        Get your link
      </span>
      <label htmlFor="partner-name" className="block text-sm text-text-muted font-light mb-2">
        Enter your name or a code you&apos;ll remember — this becomes part of your link.
      </label>
      <input
        id="partner-name"
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
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
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-full bg-electric-blue px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white font-mono shrink-0 transition-all hover:bg-electric-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </motion.div>
      )}

      {code && (
        <div className="mt-4 flex gap-3 items-start rounded-xl border border-dashed border-electric-blue/30 bg-electric-blue/5 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-electric-blue shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted font-light leading-relaxed m-0">
            Your code is <span className="text-text-title font-mono font-semibold">{code}</span>.
            Give this <em>exact</em> code (or the link above) to the person you refer — if they
            reach out without it, we have no way to trace the referral back to you. If they'd
            rather not use the link, they can just type <span className="text-text-title font-mono">{code}</span> into
            the "referred by" field when they contact us.
          </p>
        </div>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-card-border flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
            Register your code with us
          </span>
          <label htmlFor="partner-email" className="sr-only">Your email</label>
          <input
            id="partner-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-xs text-foreground outline-none transition-colors placeholder-zinc-500"
          />
          <label htmlFor="partner-payout" className="sr-only">How should we pay you</label>
          <textarea
            id="partner-payout"
            value={payoutDetails}
            onChange={(e) => setPayoutDetails(e.target.value)}
            placeholder="How should we pay you when a referral converts? (bank details, crypto wallet, PayPal — whatever you use. You can also skip this and send it later.)"
            className="w-full h-[80px] bg-card-bg border border-card-border focus:border-electric-blue/40 rounded-xl px-4 py-3 text-xs text-foreground outline-none resize-none transition-colors placeholder-zinc-500"
          />
          {error && (
            <p role="alert" className="text-xs text-red-400 font-mono">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting || !code}
            className="flex items-center justify-center gap-2 rounded-full bg-foreground py-3 text-xs font-semibold uppercase tracking-wider text-background hover:opacity-90 transition-opacity disabled:opacity-50 disabled:pointer-events-none font-mono"
          >
            {submitting ? "Registering..." : "Register my code"}
            <Send className="h-3 w-3" />
          </button>
        </form>
      ) : (
        <div className="mt-6 pt-6 border-t border-card-border">
          <p className="text-sm text-emerald-400 font-medium">
            Registered — we've got your code and email on file.
          </p>
          <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">
            Share your link above. When a referral converts and clears payment, we'll reach out to
            confirm your payout using the details you sent (or ask for them if you skipped that).
          </p>
        </div>
      )}

      <p className="text-[11px] text-text-muted font-light mt-4 leading-relaxed">
        No sign-up account or dashboard — we confirm every referral directly with the new client
        before it&apos;s counted, and reach out to you directly when it&apos;s time to pay.
      </p>
    </div>
  );
}
