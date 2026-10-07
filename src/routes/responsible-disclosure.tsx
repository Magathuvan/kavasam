import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/responsible-disclosure")({
  head: () => meta("Responsible Disclosure", "How to report a security vulnerability in KAVASAM systems safely and responsibly."),
  component: Disclosure,
});

const sections: [string, string[]][] = [
  ["How to report", ["Use the contact form and choose 'Responsible disclosure'.", "Share a short summary first; we will reply with a secure channel for full technical details.", "Please report as soon as possible after discovery."]],
  ["What to include", ["Affected URL, system or component.", "Type of vulnerability and potential impact.", "Clear steps to reproduce, with screenshots or a minimal proof of concept.", "Your contact details for follow-up."]],
  ["Please do", ["Act in good faith and only test what is needed to confirm the issue.", "Use your own accounts and test data.", "Keep details confidential until we have fixed the issue and agreed on disclosure."]],
  ["Please don't", ["Access, modify, download or delete other people's data.", "Run denial-of-service, spam or social engineering attacks.", "Physically test our premises or attack third-party services we use."]],
  ["What to expect from us", ["Acknowledgement of your report, and a good-faith effort to respond promptly.", "Regular updates while we investigate and fix.", "Credit for your finding if you wish, once resolved.", "We will not pursue legal action against researchers who follow this policy in good faith."]],
];

function Disclosure() {
  return (
    <PageShell eyebrow="Responsible Disclosure" title="Found a vulnerability? Tell us." intro="We value the security community. If you believe you've found a security issue in a KAVASAM website or service, please report it responsibly.">
      <div className="grid gap-5 md:grid-cols-2">
        {sections.map(([h, items]) => (
          <section key={h} className="rounded-xl border border-border p-7">
            <h2 className="text-lg font-extrabold text-navy">{h}</h2>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">KAVASAM does not currently run a paid bug bounty programme.</p>
      <Link to="/contact" search={{ type: "disclosure" }} className="mt-6 inline-flex rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground">REPORT A VULNERABILITY →</Link>
    </PageShell>
  );
}
