import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export type LegalSection = {
  title: string;
  content: ReactNode;
};

export function LegalDocument({
  eyebrow,
  title,
  intro,
  effectiveDate,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  effectiveDate: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} intro={intro}>
      <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-gold-deep">In this document</p>
          <nav className="mt-4 border-l border-border" aria-label={`${title} sections`}>
            {sections.map((section, index) => (
              <a
                key={section.title}
                href={`#section-${index + 1}`}
                className="block border-l-2 border-transparent py-2 pl-4 text-sm text-muted-foreground transition-colors hover:border-gold hover:text-navy"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6 text-sm text-muted-foreground">
            <span>Effective {effectiveDate}</span>
            <span>KAVASAM public website and services</span>
          </div>
          <div className="divide-y divide-border">
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title} className="scroll-mt-24 py-8 first:pt-10">
                <p className="eyebrow text-tech">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-navy">{section.title}</h2>
                <div className="prose-kavasam mt-4 max-w-3xl leading-relaxed text-charcoal">{section.content}</div>
              </section>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">Questions about this document?</p>
            <Link to="/contact" className="mt-3 inline-flex rounded-md bg-navy px-5 py-2.5 text-sm font-bold text-navy-foreground hover:bg-navy-soft">
              CONTACT KAVASAM →
            </Link>
          </div>
        </article>
      </div>
    </PageShell>
  );
}