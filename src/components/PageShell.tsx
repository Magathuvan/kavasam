import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
            <p className="eyebrow text-gold-deep">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{title}</h1>
            {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — KAVASAM` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — KAVASAM` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function Notice({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-gold/40 bg-accent p-4 text-sm text-charcoal">{children}</p>;
}
