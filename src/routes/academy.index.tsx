import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";
import { academyCategories, guides } from "@/data/academy";

export const Route = createFileRoute("/academy/")({
  head: () => meta("KAVASAM Academy", "Free cybersecurity guides: fundamentals, phishing, passwords, OWASP, ethical hacking, bug bounty, network security, AI security and cyber law."),
  component: Academy,
});

function Academy() {
  return (
    <PageShell eyebrow="KAVASAM Academy" title="Learn cybersecurity, one practical guide at a time." intro="Free, clear guides for everyone — from staying safe online to your first steps in ethical hacking.">
      {academyCategories.map((c) => {
        const list = guides.filter((g) => g.category === c);
        return (
          <section key={c} className="mb-12">
            <h2 className="eyebrow text-gold-deep">{c}</h2>
            {list.length ? (
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <Link key={g.slug} to="/academy/$slug" params={{ slug: g.slug }} className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
                    <h3 className="text-lg font-extrabold text-navy">{g.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{g.intro}</p>
                    <p className="mt-4 text-xs font-bold text-tech">{g.level} · {g.minutes} min read</p>
                  </Link>
                ))}
              </div>
            ) : <p className="mt-3 text-sm text-muted-foreground">Guides coming soon.</p>}
          </section>
        );
      })}
      <p className="rounded-xl bg-secondary p-6 text-sm text-muted-foreground">Courses, labs, CTFs, workshops and internships are planned. <Link to="/contact" search={{ type: "training" }} className="font-bold text-gold-deep underline">Enquire about a workshop</Link>.</p>
    </PageShell>
  );
}
