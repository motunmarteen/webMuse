import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, CheckCircle2, ArrowUpRight, BookOpen } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | WEBMUSE Engineering`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
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
            href="/insights"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-grow relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute top-[-5%] right-[-5%] h-[400px] w-[400px] rounded-full bg-mesh-purple opacity-20 blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        <article className="relative z-10 px-6 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto">
          {/* Tags & Read Time */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wider text-electric-blue border border-electric-blue/30 rounded-full px-3 py-1 bg-electric-blue/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
              <Clock className="h-3.5 w-3.5 text-electric-blue" />
              {post.readMinutes} min read
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-title leading-tight">
            {post.title}
          </h1>

          {/* Author info & date */}
          <div className="flex items-center gap-4 border-y border-card-border py-5 my-8">
            <div className="h-10 w-10 rounded-full border border-card-border bg-card-bg flex items-center justify-center text-electric-blue">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-title">{post.author}</div>
              <div className="text-xs text-text-muted font-mono">{post.authorRole} • {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <p className="text-lg md:text-xl text-text-muted font-light leading-relaxed mb-12 italic border-l-2 border-electric-blue pl-6 py-1">
            &quot;{post.excerpt}&quot;
          </p>

          {/* Body Sections */}
          <div className="flex flex-col gap-10 text-base leading-relaxed text-foreground/90 font-light">
            {post.sections.map((sec, idx) => (
              <section key={idx} className="flex flex-col gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-text-title tracking-tight font-display">
                  {sec.heading}
                </h2>
                <p className="text-base text-foreground/90 font-light leading-relaxed">
                  {sec.body}
                </p>
                {sec.codeSnippet && (
                  <div className="rounded-xl border border-card-border bg-black/60 p-5 font-mono text-xs text-electric-blue/90 overflow-x-auto my-3 shadow-inner">
                    <pre className="whitespace-pre">{sec.codeSnippet}</pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Key Takeaways Box */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="mt-14 p-6 md:p-8 rounded-2xl border border-card-border bg-card-bg/60 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-electric-blue mb-4">
                <CheckCircle2 className="h-4 w-4" />
                Architectural Takeaways
              </div>
              <ul className="flex flex-col gap-3">
                {post.takeaways.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-electric-blue shrink-0 mt-2" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Case Study CTA */}
          {post.relatedCaseStudySlug && (
            <div className="mt-12 p-6 rounded-2xl border border-electric-blue/30 bg-electric-blue/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-electric-blue shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-text-title">Explore verified case study write-up</h3>
                  <p className="text-xs text-text-muted mt-0.5">Read full system architecture breakdown and telemetry.</p>
                </div>
              </div>
              <Link
                href={`/case-study/${post.relatedCaseStudySlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-electric-blue hover:underline shrink-0"
              >
                View Case Study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
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
