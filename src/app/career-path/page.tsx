import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import CareerPathClient from "@/components/career-path/CareerPathClient";

export const metadata: Metadata = {
  title: "Career Path — Find Your Tech Career",
  description:
    "A free, instant tech-career decision engine from WEBMUSE. Answer honestly, get matched to real tech roles — frontend, AI/ML, cybersecurity, product, and more — with roadmaps, salary ranges, and personal advice.",
};

export default function CareerPathPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      <main id="main-content" className="flex-grow relative overflow-hidden px-4 sm:px-6 lg:px-24 py-14 md:py-20">
        <CareerPathClient />
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
