import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { meta, PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/team")({
  head: () => meta("Team", "Meet S.K. Magathuvan, Founder and CEO of KAVASAM, and learn about the leadership behind KAVASAM's cybersecurity mission."),
  component: Team,
});

function Team() {
  return (
    <PageShell
      eyebrow="Leadership"
      title="Building a safer digital world."
      intro="KAVASAM is led with a clear purpose: make credible cybersecurity protection, intelligence and education more accessible."
    >
      <section className="grid overflow-hidden border-y border-border lg:grid-cols-[minmax(300px,0.8fr)_1.4fr]">
        <div className="flex min-h-80 items-center justify-center bg-navy p-10 text-navy-foreground">
          <div className="text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center border border-gold/50 bg-navy-soft text-4xl font-extrabold text-gold shadow-gold" aria-hidden="true">
              SKM
            </div>
            <p className="eyebrow mt-6 text-gold">Founder-led cybersecurity</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <p className="eyebrow text-tech">Founder &amp; Chief Executive Officer</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">S.K. Magathuvan</h2>
          <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-charcoal">
            <p>
              S.K. Magathuvan founded KAVASAM to build practical, intelligent cybersecurity for people and organizations navigating an increasingly complex digital world.
            </p>
            <p>
              As Founder and CEO, he sets KAVASAM’s direction across AI-powered security tools, threat intelligence, cyber law awareness, security services and digital safety education.
            </p>
            <p>
              His leadership is grounded in KAVASAM’s central promise: protect what matters through useful technology, verified information and responsible security practices.
            </p>
          </div>
          <Link to="/contact" className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-gold-deep hover:text-navy">
            Contact KAVASAM <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-14 grid gap-8 border-b border-border pb-14 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow text-gold-deep">Leadership principles</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy">Protection with purpose.</h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {["Make security understandable", "Use authoritative sources", "Design for real-world action", "Disclose vulnerabilities responsibly"].map((principle) => (
            <li key={principle} className="flex items-start gap-3 border-t border-border pt-4 text-sm font-semibold text-charcoal">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Additional leadership and team profiles will be added as KAVASAM grows. KAVASAM does not publish personal contact details on this page; use the official contact form for enquiries.
      </p>
    </PageShell>
  );
}