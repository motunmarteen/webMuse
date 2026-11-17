import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, type LucideIcon } from "lucide-react";

/**
 * One layout for the data-driven case studies. A page supplies its words and picks the section
 * shapes; the markup, spacing and styling stay identical to the hand-built pages.
 */
export type CaseSection =
  | { kind: "cards"; label: string; heading: string; intro?: string; items: { title: string; text: string }[] }
  | { kind: "features"; label: string; heading: string; intro?: string; items: { icon: LucideIcon; title: string; text?: string; points?: string[] }[] }
  | { kind: "steps"; label: string; heading: string; intro?: string; items: { step: string; title: string; detail: string }[] }
  | { kind: "rows"; label: string; heading: string; intro?: string; items: { k: string; v: string }[] }
  | { kind: "table"; label: string; heading: string; intro?: string; head: [string, string, string]; rows: [string, string, string][] }
  | { kind: "note"; label: string; heading: string; text: string };

export interface CaseStudyContent {
  eyebrow: string;
  title: string;
  intro: string;
  chips: string[];
  summary: { label: string; heading: string; text: string };
  sections: CaseSection[];
  metrics: { n: string; l: string }[];
  metricsNote?: string;
  footnote?: string;
}

const LABEL = "text-xs font-semibold uppercase font-mono text-text-muted tracking-wider";
const H2 = "text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3";

export function CaseStudyTemplate({ c }: { c: CaseStudyContent }) {
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
            href="/case-study"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-text-muted hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-electric-blue focus-visible:outline-offset-4 rounded"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All case studies
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-grow relative overflow-hidden">
        <div
          className="absolute top-[5%] right-[-8%] h-[420px] w-[420px] rounded-full bg-mesh-purple opacity-25 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">{c.eyebrow}</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-3xl">{c.title}</h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">{c.intro}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {c.chips.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono uppercase tracking-wider text-text-muted border border-card-border rounded-full px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 lg:px-24 flex flex-col gap-16 pb-20">
          <section>
            <span className={LABEL}>{c.summary.label}</span>
            <h2 className={H2}>{c.summary.heading}</h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">{c.summary.text}</p>
          </section>

          {c.sections.map((s) => (
            <section key={s.label}>
              <span className={LABEL}>{s.label}</span>
              <h2 className={H2}>{s.heading}</h2>
              {"intro" in s && s.intro ? <p className="text-text-muted font-light mt-4 leading-relaxed">{s.intro}</p> : null}

              {s.kind === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {s.items.map((m) => (
                    <div key={m.title} className="glassmorphism-card rounded-xl p-5">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-electric-blue" />
                        <h3 className="text-sm font-bold text-text-title tracking-tight">{m.title}</h3>
                      </div>
                      <p className="text-xs text-text-muted font-light mt-2 leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {s.kind === "features" && (
                <div className="grid gap-6 mt-6">
                  {s.items.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.title} className="glassmorphism-card rounded-xl p-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-bold text-text-title">{f.title}</h3>
                        </div>
                        {f.text ? <p className="text-sm text-text-muted font-light mt-3 leading-relaxed">{f.text}</p> : null}
                        {f.points ? (
                          <ul className="mt-4 grid gap-2 list-none p-0">
                            {f.points.map((p) => (
                              <li key={p} className="flex gap-2.5 text-sm text-text-muted font-light leading-relaxed">
                                <CheckCircle2 className="h-4 w-4 text-electric-blue shrink-0 mt-0.5" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}

              {s.kind === "steps" && (
                <div className="grid gap-3 mt-6">
                  {s.items.map((row) => (
                    <div key={row.step} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-8 font-semibold">
                        {row.step}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-text-title tracking-tight m-0">{row.title}</h3>
                        <p className="text-xs text-text-muted font-light leading-relaxed mt-1 mb-0">{row.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {s.kind === "rows" && (
                <div className="grid gap-3 mt-6">
                  {s.items.map((row) => (
                    <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-32 font-semibold">
                        {row.k}
                      </span>
                      <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                    </div>
                  ))}
                </div>
              )}

              {s.kind === "table" && (
                <div className="mt-6 border border-card-border rounded-2xl overflow-hidden glassmorphism-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-card-border/30 font-mono text-text-muted uppercase tracking-wider">
                        <tr>
                          {s.head.map((h) => (
                            <th key={h} className="p-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-card-border/40 font-light">
                        {s.rows.map((r) => (
                          <tr key={r[0]} className="hover:bg-card-border/20 transition-colors">
                            <td className="p-4 font-mono font-semibold text-electric-blue">{r[0]}</td>
                            <td className="p-4 font-mono text-text-title">{r[1]}</td>
                            <td className="p-4 text-text-muted">{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {s.kind === "note" && <p className="text-text-muted font-light mt-4 leading-relaxed">{s.text}</p>}
            </section>
          ))}

          <section>
            <span className={LABEL}>Verified metrics</span>
            <h2 className={H2}>Counted from the codebase, not estimated.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {c.metrics.map((m) => (
                <div key={m.l} className="glassmorphism-card rounded-xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-electric-blue font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">{m.l}</div>
                </div>
              ))}
            </div>
            {c.metricsNote ? <p className="text-[11px] text-text-muted font-mono mt-4">{c.metricsNote}</p> : null}
            {c.footnote ? <p className="text-[11px] text-text-muted font-light mt-3 leading-relaxed">{c.footnote}</p> : null}
          </section>
        </div>
      </main>

      <footer className="border-t border-card-border px-6 lg:px-24 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
            © {new Date().getFullYear()} WebMuse Limited. All rights reserved.
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
