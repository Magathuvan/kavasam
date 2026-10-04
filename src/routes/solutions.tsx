import { createFileRoute, Link } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";
import { process, services } from "@/data/solutions";

export const Route = createFileRoute("/solutions")({
  head: () => meta("Security Solutions", "Penetration testing, vulnerability assessment, web, API, mobile, network and cloud security, audits, consulting and security awareness training from KAVASAM."),
  component: Solutions,
});

function Solutions() {
  return (
    <PageShell eyebrow="Solutions" title="Professional security services for real-world risk." intro="Every engagement is authorised, scoped in writing and delivered with clear, actionable reporting.">
      <nav aria-label="Services" className="flex flex-wrap gap-2">
        {services.map((s) => <a key={s.id} href={`#${s.id}`} className="rounded-full border border-border px-4 py-2 text-xs font-bold text-charcoal hover:border-gold">{s.title}</a>)}
      </nav>
      <section className="mt-12 rounded-2xl bg-navy p-8 text-navy-foreground sm:p-10">
        <p className="eyebrow text-gold">How we work</p>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((p, i) => <li key={p}><span className="text-3xl font-extrabold text-gold">{String(i + 1).padStart(2, "0")}</span><p className="mt-2 text-sm text-navy-foreground/80">{p}</p></li>)}
        </ol>
      </section>
      <div className="mt-12 space-y-6">
        {services.map((s) => (
          <article key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-border p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_1fr]">
              <div>
                <h2 className="text-2xl font-extrabold text-navy">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.summary}</p>
                <p className="mt-4 text-sm"><span className="font-bold text-navy">Who it's for: </span><span className="text-charcoal">{s.who}</span></p>
              </div>
              <div>
                <p className="eyebrow text-tech">What we assess</p>
                <ul className="mt-3 space-y-2 text-sm text-charcoal">{s.assessed.map((a) => <li key={a}>• {a}</li>)}</ul>
              </div>
              <div>
                <p className="eyebrow text-gold-deep">Deliverables</p>
                <ul className="mt-3 space-y-2 text-sm text-charcoal">{s.deliverables.map((a) => <li key={a}>• {a}</li>)}</ul>
                <Link to="/contact" search={{ type: "assessment" }} className="mt-6 inline-flex rounded-md bg-navy px-5 py-2.5 text-sm font-bold text-navy-foreground hover:bg-navy-soft">Request {s.title} →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
