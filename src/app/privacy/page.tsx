import type { Metadata } from "next";
import StaticPageShell from "@/components/ui/StaticPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | WEBMUSE",
  description: "How WEBMUSE collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <StaticPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle="Last updated: July 2026. This policy explains what information we collect through webmuse.tech and how we use it."
    >
      <section>
        <h2>What we collect</h2>
        <p>
          When you submit the contact form, booking form, or newsletter signup on this site, we collect
          the information you provide directly: your name, email address, and any message or project
          details you choose to share. We do not require an account to use this site.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          Submitted information is used solely to respond to your inquiry, schedule a consultation, or
          send the newsletter you signed up for. We do not sell, rent, or share your information with
          third parties for marketing purposes.
        </p>
      </section>

      <section>
        <h2>Where it&apos;s stored</h2>
        <p>
          Form submissions are delivered to our team via email through our transactional email
          provider. We retain this correspondence for as long as reasonably necessary to respond to
          your inquiry and maintain business records, and delete it on request.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          This site does not currently use third-party advertising cookies or tracking pixels. If that
          changes, this page will be updated to reflect it before any such tool is enabled.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can request access to, correction of, or deletion of any personal information you&apos;ve
          submitted to us at any time by emailing{" "}
          <a href="mailto:hello@webmuse.tech">hello@webmuse.tech</a>. We&apos;ll respond within a
          reasonable timeframe.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          If this policy changes materially, we&apos;ll update the &quot;last updated&quot; date above.
          Continued use of the site after changes are posted constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:hello@webmuse.tech">hello@webmuse.tech</a>.
        </p>
      </section>
    </StaticPageShell>
  );
}
