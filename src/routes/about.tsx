import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => meta("About KAVASAM", "KAVASAM is a cybersecurity technology company building AI-powered protection, threat intelligence, cyber law information and security education."),
  component: About,
});

const blocks = [
  ["Our story", "'Kavasam' means armour — a protective shield. KAVASAM was founded on a simple idea: everyone deserves strong digital protection, not only large enterprises with big security budgets."],
  ["Mission", "To protect people, businesses and digital futures through intelligent, accessible cybersecurity."],
  ["Vision", "A safer digital world where awareness, intelligence and protection are available to everyone."],
  ["Approach", "Practical over theatrical. We focus on real risks, verified information and clear actions — no fear-mongering, no fake statistics."],
  ["Technology", "We combine AI with established security techniques and authoritative data sources to deliver fast, explainable analysis."],
  ["Research", "We study emerging threats and follow coordinated, responsible disclosure when we find vulnerabilities."],
];

function About() {
  return (
    <PageShell eyebrow="About KAVASAM" title="We guard what's yours." intro="A cybersecurity technology company focused on AI-powered protection, threat intelligence, digital safety, cyber law information and security education.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blocks.map(([t, d]) => <div key={t} className="rounded-xl border border-border p-7"><h2 className="eyebrow text-gold-deep">{t}</h2><p className="mt-3 leading-relaxed text-charcoal">{d}</p></div>)}
      </div>
      <section className="mt-12 rounded-2xl bg-secondary p-8">
        <h2 className="text-xl font-extrabold text-navy">Team</h2>
        <p className="mt-2 text-muted-foreground">Team profiles will be published here soon.</p>
      </section>
      <Link to="/contact" className="mt-10 inline-flex rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground">GET IN TOUCH →</Link>
    </PageShell>
  );
}
