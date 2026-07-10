import type { Metadata } from "next";
import StaticPageShell from "@/components/ui/StaticPageShell";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights | WEBMUSE",
  description: "Technical writing from the WEBMUSE team — coming soon.",
};

export default function InsightsPage() {
  return (
    <StaticPageShell
      eyebrow="Insights"
      title="We're writing our first pieces."
      subtitle="This section will carry technical write-ups on software architecture, UI engineering, and product strategy from the WEBMUSE team. Nothing published yet — check back soon, or subscribe below to get notified."
    >
      <section className="rounded-2xl border border-card-border bg-card-bg/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-electric-blue shrink-0" aria-hidden="true" />
          <p className="text-sm text-foreground m-0">
            Want the first post in your inbox? Subscribe to the newsletter from the homepage footer.
          </p>
        </div>
      </section>
    </StaticPageShell>
  );
}
