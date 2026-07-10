import type { Metadata } from "next";
import StaticPageShell from "@/components/ui/StaticPageShell";

export const metadata: Metadata = {
  title: "Terms of Service | WEBMUSE",
  description: "The terms governing use of the webmuse.tech website and engagement with WEBMUSE as a client.",
};

export default function TermsPage() {
  return (
    <StaticPageShell
      eyebrow="Legal"
      title="Terms of Service"
      subtitle="Last updated: July 2026. These terms govern your use of webmuse.tech."
    >
      <section>
        <h2>Use of this site</h2>
        <p>
          This website is provided to showcase WEBMUSE&apos;s services and to let prospective clients get
          in touch. You may browse and use the site&apos;s interactive tools (like the Idea Vault
          simulator) freely; outputs from those tools are illustrative examples, not binding quotes or
          guarantees of scope, timeline, or price.
        </p>
      </section>

      <section>
        <h2>No guarantee from site content</h2>
        <p>
          Case studies, capability descriptions, and example scenarios shown on this site are for
          illustration and are not warranties of specific outcomes for any future engagement. Actual
          project scope, cost, and timeline are determined through direct consultation and a signed
          agreement.
        </p>
      </section>

      <section>
        <h2>Engagement terms</h2>
        <p>
          Submitting a booking or contact request through this site does not create a contract. A formal
          engagement begins only once both parties agree to and sign a separate statement of work or
          services agreement outlining scope, deliverables, timeline, and pricing.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          All content on this site &mdash; including copy, design, and the WEBMUSE name and logo &mdash;
          is the property of WEBMUSE and may not be reproduced without permission. Project names and
          descriptions referenced as illustrative examples remain the property of their respective owners
          where applicable.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          This website and its tools are provided &quot;as is.&quot; WEBMUSE is not liable for decisions
          made based solely on illustrative content shown on this site prior to a formal engagement.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The &quot;last updated&quot; date above reflects
          the most recent revision.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:hello@webmuse.tech">hello@webmuse.tech</a>.
        </p>
      </section>
    </StaticPageShell>
  );
}
