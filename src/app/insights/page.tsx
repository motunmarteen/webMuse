import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Mail, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog | WEBMUSE",
  description:
    "Technical writing from the WEBMUSE team — real engineering write-ups on architecture, AI, and product decisions, verified against the code we shipped.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b border-card-border px-6 lg:px-24 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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
          <div className="max-w-5xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">
              Writing on what we actually built.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Technical write-ups from the WEBMUSE team — architecture decisions, the bugs that mattered,
              and the trade-offs behind them. Every post here is verified against real, running code.
            </p>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.href}
                  className="group glassmorphism-card rounded-2xl p-7 md:p-8 flex flex-col justify-between hover:border-electric-blue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-mono uppercase tracking-wider text-text-muted border border-card-border rounded-full px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-text-muted shrink-0">
                        <Clock className="h-3 w-3" />
                        {post.readMinutes} min
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3 group-hover:text-electric-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-text-muted text-sm font-light mt-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-7 pt-5 border-t border-card-border flex items-center justify-between">
                    <time dateTime={post.publishedAt} className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <ArrowUpRight className="h-5 w-5 text-text-muted group-hover:text-electric-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              ))}
            </div>

            <section className="rounded-2xl border border-card-border bg-card-bg/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-electric-blue shrink-0" aria-hidden="true" />
                <p className="text-sm text-foreground m-0">
                  Want new posts in your inbox? Subscribe to the newsletter from the homepage footer.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
