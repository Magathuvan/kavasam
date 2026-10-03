import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { tools } from "@/data/tools";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "AI Security Tools — KAVASAM" },
      { name: "description", content: "Free AI cybersecurity tools: assistant, scam detector, URL analyzer, cyber health check, legal analyzer and report analyzer. No login needed." },
      { property: "og:title", content: "AI Security Tools — KAVASAM" },
      { property: "og:description", content: "Free AI cybersecurity tools from KAVASAM. No login needed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="eyebrow text-gold-deep">KAVASAM AI tools</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Practical security analysis, free and without signing up.</h1>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.id} to="/tools/$toolId" params={{ toolId: t.id }} className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
              <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-navy">{t.title}</h2>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{t.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-gold-deep">Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
