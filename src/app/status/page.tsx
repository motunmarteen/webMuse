import type { Metadata } from "next";
import StaticPageShell from "@/components/ui/StaticPageShell";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | WEBMUSE",
  description: "Current status of the webmuse.tech website.",
};

const CHECKS = [
  { name: "Website (webmuse.tech)", status: "Operational" },
  { name: "Contact form", status: "Operational" },
  { name: "Booking form", status: "Operational" },
  { name: "Newsletter signup", status: "Operational" },
];

export default function StatusPage() {
  return (
    <StaticPageShell
      eyebrow="Status"
      title="System Status"
      subtitle="This is a simple, manually-reviewed status page for the WEBMUSE website — not an automated uptime monitor."
    >
      <ul className="!list-none !pl-0 flex flex-col gap-2">
        {CHECKS.map((check) => (
          <li
            key={check.name}
            className="flex items-center justify-between rounded-xl border border-card-border bg-card-bg/40 px-4 py-3"
          >
            <span className="text-sm text-foreground font-medium">{check.name}</span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {check.status}
            </span>
          </li>
        ))}
      </ul>

      <section>
        <h2>Something not working?</h2>
        <p>
          If you notice the site behaving unexpectedly, email{" "}
          <a href="mailto:hello@webmuse.tech">hello@webmuse.tech</a> and we&apos;ll take a look.
        </p>
      </section>
    </StaticPageShell>
  );
}
