import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolRunner } from "@/components/ToolRunner";
import { getTool, tools } from "@/data/tools";

export const Route = createFileRoute("/tools/$toolId")({
  validateSearch: z.object({ q: z.string().optional() }),
  loader: ({ params }) => {
    const tool = getTool(params.toolId);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.tool;
    const title = t ? `${t.title} — KAVASAM` : "Tool — KAVASAM";
    const desc = t?.summary ?? "KAVASAM security tool";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const { q } = Route.useSearch();
  return (
    <div className="min-h-screen bg-secondary">
      <SiteHeader />
      <main className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_260px] lg:px-8">
        <div>
          <Link to="/tools" className="eyebrow text-gold-deep hover:underline">← All AI tools</Link>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{tool.title}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{tool.summary}</p>
          <div className="mt-10">
            <ToolRunner key={tool.id} tool={tool} initial={q ?? ""} />
          </div>
        </div>
        <aside className="lg:pt-24">
          <p className="eyebrow text-muted-foreground">Other tools</p>
          <ul className="mt-4 space-y-1">
            {tools.filter((t) => t.id !== tool.id).map((t) => (
              <li key={t.id}>
                <Link to="/tools/$toolId" params={{ toolId: t.id }} className="block rounded-md px-3 py-2 text-sm font-semibold text-charcoal hover:bg-background hover:text-navy">{t.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
