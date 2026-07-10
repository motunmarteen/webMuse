import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import StaticPageShell from "@/components/ui/StaticPageShell";

export default function NotFound() {
  return (
    <StaticPageShell
      eyebrow="404"
      title="This page doesn't exist."
      subtitle="The link may be broken, or the page may have moved. Here's how to get back on track."
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <a
          href="mailto:hello@webmuse.tech"
          className="flex items-center justify-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 text-sm font-semibold text-foreground hover:bg-card-bg/85 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-2"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Report a broken link
        </a>
      </div>
    </StaticPageShell>
  );
}
