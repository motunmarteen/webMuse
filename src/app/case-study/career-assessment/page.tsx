import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Layers, Compass, GitBranch, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "WEBMUSE Career Assessment — Building a Decision Engine for Technology Career Guidance",
  description:
    "How WEBMUSE rebuilt and expanded a real career-quiz product from its original GitHub source into a two-axis scoring engine covering 26 tech roles — verified against the running code.",
};

const SCORING_TABLE = [
  { input: "13 → 14 questions", detail: "One new question added specifically to probe reaction to generative AI — the original set predates the current AI hiring wave." },
  { input: "20 → 26 career paths", detail: "Added platform engineer, SRE, data engineer, AI/prompt systems engineer, technical program manager, product marketing, developer advocate, tech ethicist, open source maintainer, technical founder." },
  { input: "Flat point-sum", detail: "Original model: each answer adds weighted points directly to career-path totals, then sorts by total. Kept, because it works." },
  { input: "+ Two-axis layer", detail: "New model: every answer also scores against four working-style axes (builder / analyst / connector / craftsperson), shown independently of the top-3 matches." },
];

const BUILD_STEPS = [
  { s: "Find it", t: "The site was gone, the code wasn't", d: "The live site at the original domain was down and no local backup existed. The actual source was still reachable as a public GitHub repository — three separate quiz implementations existed inside it, evidence of iteration over time." },
  { s: "Read it", t: "Reverse-engineer the real scoring logic", d: "Rather than guess at how the quiz worked, the actual scoring function was read directly: a flat per-question point-sum across 13 questions, normalized to a 15–95% display range, sorted to a top-3." },
  { s: "Keep what worked", t: "Don't discard a working model", d: "The point-sum logic was preserved as the primary matching engine — it produces sane, explainable results. Nothing about it was broken; the job was expansion, not replacement." },
  { s: "Add depth", t: "A second scoring layer, not a bigger list", d: "A four-axis working-style score (builder, analyst, connector, craftsperson) was added on top, so a result explains *why* a path fits, not only *that* it does — without touching the proven top-3 logic underneath it." },
];

export default function CareerAssessmentCaseStudyPage() {
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

        {/* Hero */}
        <section className="relative z-10 px-6 lg:px-24 pt-14 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-semibold tracking-widest text-electric-blue uppercase font-mono">
              Case Study · Career Path
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-title mt-4 max-w-2xl">
              Building a decision engine for technology career guidance.
            </h1>
            <p className="text-text-muted font-light mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
              Years ago, a career quiz lived on a personal portfolio site — thirteen questions, twenty
              tech roles, and a scoring engine built from real mentoring experience. The site is gone.
              The engine wasn&apos;t. This is the record of finding it, understanding it, and rebuilding
              it into something wider and sharper for WEBMUSE.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["Weighted scoring engine", "Two-axis working-style model", "26 tech career paths", "Zero-signup results"].map((t) => (
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
          {/* Problem */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">01 — Problem</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A career quiz is easy to build badly and quietly useless.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Most &quot;which career suits you&quot; quizzes are a handful of generic questions mapped
              to a handful of generic outcomes — Product Manager or Developer, take your pick. That&apos;s
              not guidance, it&apos;s a coin flip with extra steps. The bar for a quiz worth someone&apos;s
              five minutes is higher: results specific enough to act on, and honest enough to admit when a
              path is a stretch rather than a lock.
            </p>
            <div className="grid gap-3 mt-6">
              {[
                { k: "Specificity", v: "Twenty-odd generic tech buckets isn't enough anymore — roles like platform engineering, SRE, and AI/prompt engineering barely existed as job titles when the original quiz was written." },
                { k: "Explainability", v: "A single percentage match tells you nothing about why. Two people can land on the same top match for completely different reasons." },
                { k: "Trust", v: "The original quiz was built from real mentoring experience, not a stock personality-test template. Losing that voice in a rebuild would have been losing the actual value." },
              ].map((row) => (
                <div key={row.k} className="glassmorphism-card rounded-xl p-5 flex gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0 pt-0.5 w-24">
                    {row.k}
                  </span>
                  <p className="text-sm text-text-muted font-light leading-relaxed m-0">{row.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Thesis */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">02 — Thesis</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Rebuild the proven engine before you touch it.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The original site was offline with no local backup, but its source code was still public on
              GitHub — three successive quiz implementations inside one repository, each an iteration on
              the last. Before designing anything new, the actual scoring logic got read line by line.
              That reading shaped the whole rebuild.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { icon: GitBranch, title: "Recover, don't guess", body: "The real question set and scoring function were pulled from the original repository, not reconstructed from memory or invented fresh." },
                { icon: Layers, title: "Expand the taxonomy", body: "Twenty career paths became twenty-six, adding the roles that have emerged or matured since the original was written." },
                { icon: Compass, title: "Add a second lens", body: "A four-axis working-style score layered on top of the proven point-sum model, explaining the fit instead of just stating it." },
              ].map((p) => (
                <div key={p.title} className="glassmorphism-card rounded-xl p-5">
                  <div className="p-2 rounded-lg border bg-electric-blue/10 border-electric-blue/20 text-electric-blue w-fit">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-text-title tracking-tight mt-3">{p.title}</h3>
                  <p className="text-xs text-text-muted font-light mt-1.5 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Deep dive: recovery process */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">03 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Recovering a product that no longer exists.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              A local filesystem search across the whole machine turned up nothing — no folder, no zip,
              no old build artifact. The one lead that actually worked was the developer&apos;s own GitHub
              account, where the original portfolio repository was still public. Cloning it surfaced the
              real question bank, the real career-path data (including salary ranges, roadmaps, and
              first-person advice), and the real scoring function — not an approximation of them.
            </p>
            <div className="flex flex-col gap-0 mt-6">
              {BUILD_STEPS.map((row, i, arr) => (
                <div key={row.s} className={`py-5 ${i !== arr.length - 1 ? "border-b border-dashed border-card-border" : ""}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue shrink-0">{row.s}</span>
                    <h3 className="text-base font-bold text-text-title tracking-tight">{row.t}</h3>
                  </div>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed">{row.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Deep dive: scoring model */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">04 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              A scoring engine with two layers instead of one.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              The original engine scored every answer directly against career-path IDs — pick an option,
              add its weighted points to however many paths it touches, sum across all questions, sort,
              take the top three. It&apos;s simple and it works, so it stayed. What changed is what runs
              alongside it.
            </p>
            <div className="rounded-xl border border-card-border overflow-x-auto mt-6">
              <table className="w-full text-sm min-w-[520px] border-collapse">
                <thead>
                  <tr className="bg-card-bg/60">
                    {["What changed", "Detail"].map((h) => (
                      <th key={h} className="text-left font-mono text-[10px] uppercase tracking-widest text-text-muted px-4 py-3 border-b border-card-border">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SCORING_TABLE.map((row) => (
                    <tr key={row.input} className="border-b border-card-border last:border-0">
                      <td className="px-4 py-3 text-text-title font-medium whitespace-nowrap align-top">{row.input}</td>
                      <td className="px-4 py-3 text-text-muted font-light">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-text-muted font-light mt-6 leading-relaxed">
              Every quiz option now carries two payloads instead of one: the original{" "}
              <code className="font-mono text-xs text-electric-blue">scores</code> map into career-path
              points, and a new <code className="font-mono text-xs text-electric-blue">axes</code> map
              into the four working-style dimensions. Both are computed in the same pass over the same
              answers — the axis layer is additive, not a second quiz.
            </p>
          </section>

          {/* Deep dive: what stayed the same */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">05 — Deep Dive</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              What didn&apos;t change on purpose.
            </h2>
            <p className="text-text-muted font-light mt-4 leading-relaxed">
              Every career path in the original data carried a short, first-person &quot;advice from
              Motun&quot; line — not templated career-site copy, but the actual voice of someone who&apos;d
              mentored people into these roles. That voice was preserved and extended to every new path
              added, rather than replaced with generic guidance once the roster grew.
            </p>
            <div className="grid gap-2.5 mt-6">
              {[
                { l: "Kept", tone: "text-emerald-400", d: "The point-sum scoring model, the personal-advice format per path, and the zero-signup, instant-results experience." },
                { l: "Rebuilt", tone: "text-electric-blue", d: "The UI — from a shadcn/Radix component kit into WEBMUSE's own glassmorphism, electric-blue, Outfit/JetBrains-Mono design system." },
                { l: "Added", tone: "text-electric-blue", d: "6 new career paths, 1 new question targeting reactions to generative AI, and the full four-axis working-style layer." },
              ].map((r) => (
                <div key={r.l} className="flex items-baseline gap-4 rounded-lg border border-card-border bg-card-bg/30 px-4 py-3">
                  <span className={`text-xs font-mono font-semibold shrink-0 w-20 ${r.tone}`}>{r.l}</span>
                  <p className="text-sm text-text-muted font-light m-0">{r.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why it holds together */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">06 — Principle</span>
            <h2 className="text-2xl md:text-3xl font-bold text-text-title tracking-tight mt-3">
              Why these choices hold together.
            </h2>
            <div className="glassmorphism-card rounded-2xl p-6 md:p-8 mt-6">
              <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">Core idea</span>
              <p className="text-xl md:text-2xl font-bold text-text-title tracking-tight mt-3 max-w-md leading-snug">
                Expand the taxonomy. Don&apos;t replace the judgment.
              </p>
              <p className="text-sm text-text-muted font-light mt-4 leading-relaxed max-w-2xl">
                A bigger list of career paths is only useful if the matching underneath it is still
                trustworthy. The scoring logic that shipped originally wasn&apos;t broken, so it wasn&apos;t
                rewritten — it was read, understood, and built on top of.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { k: "Recover before you invent", v: "The real question set and scoring model were pulled from source control, not reconstructed from a vague memory of what the site used to say." },
                { k: "Two lenses beat one score", v: "A percentage match plus a working-style breakdown explains a result instead of just asserting it." },
                { k: "Voice is part of the product", v: "First-person advice per career path was preserved and extended — genuinely mentoring, not templated career-site copy." },
                { k: "Zero friction to the result", v: "No sign-up gate before seeing a result — instant answers were kept, matching what modern users actually expect." },
              ].map((p) => (
                <div key={p.k} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-electric-blue">{p.k}</span>
                  <p className="text-sm text-text-muted font-light mt-2 leading-relaxed m-0">{p.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Numbers */}
          <section>
            <span className="text-xs font-semibold uppercase font-mono text-text-muted tracking-wider">07 — By the numbers</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {[
                { n: "26", l: "Tech career paths" },
                { n: "14", l: "Questions" },
                { n: "4", l: "Working-style axes" },
                { n: "3", l: "Top matches shown" },
                { n: "0", l: "Sign-ups required" },
                { n: "~5 min", l: "Time to complete" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-card-border bg-card-bg/30 p-5">
                  <div className="text-xl font-bold text-text-title font-mono">{m.n}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mt-1.5">{m.l}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Try it CTA */}
          <section>
            <Link
              href="/career-path"
              className="group flex items-center justify-between p-5 rounded-2xl border border-dashed border-electric-blue/30 bg-electric-blue/5 hover:bg-electric-blue/10 hover:border-electric-blue/50 transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-electric-blue" />
                <span className="text-sm font-semibold uppercase tracking-widest text-electric-blue font-mono">
                  Take the actual assessment — see it live.
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-electric-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </section>
        </div>
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
