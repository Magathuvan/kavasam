import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/research")({
  head: () => meta("Research & Insights", "KAVASAM security research, vulnerability research, threat reports, technical write-ups, advisories and cybersecurity explainers."),
  component: Research,
});

const areas = [
  ["Security Research", "Original investigations into emerging attack techniques and defences."],
  ["Vulnerability Research", "Responsibly disclosed findings, published after vendors have had time to fix."],
  ["Threat Reports", "Analysis of threats affecting individuals and organisations in India and globally."],
  ["Technical Write-ups", "Deep dives into how attacks work and how to detect and stop them."],
  ["Security Advisories", "Actionable notices when a widely used product is under active attack."],
  ["Cybersecurity Explainers", "Plain-language explanations of complex security topics."],
];

function Research() {
  return (
    <PageShell eyebrow="KAVASAM Research" title="Research that makes the digital world safer." intro="Our research practice follows coordinated disclosure: we only publish vulnerability details after affected vendors have had a fair chance to fix them.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {areas.map(([t, d]) => (
          <div key={t} className="rounded-xl border border-border p-6">
            <h2 className="font-extrabold text-navy">{t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            <p className="mt-4 text-xs font-bold text-tech">First publications coming soon</p>
          </div>
        ))}
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Link to="/threat-intelligence" className="rounded-2xl bg-navy p-8 text-navy-foreground"><p className="eyebrow text-gold">Live now</p><h2 className="mt-2 text-xl font-extrabold">Actively exploited vulnerabilities →</h2></Link>
        <Link to="/academy" className="rounded-2xl border border-border p-8"><p className="eyebrow text-gold-deep">Explainers</p><h2 className="mt-2 text-xl font-extrabold text-navy">Read KAVASAM Academy guides →</h2></Link>
      </div>
    </PageShell>
  );
}
