import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { meta, Notice, PageShell } from "@/components/PageShell";
import { getLawTopic, LAW_REVIEWED } from "@/data/cyberLaw";

export const Route = createFileRoute("/cyber-law/$slug")({
  loader: ({ params }) => {
    const topic = getLawTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ loaderData }) => (loaderData ? meta(loaderData.topic.title, loaderData.topic.summary) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] }),
  component: Topic,
});

function Topic() {
  const { topic } = Route.useLoaderData();
  return (
    <PageShell eyebrow={topic.category} title={topic.title} intro={topic.summary}>
      <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
        <article>
          <ul className="space-y-4">
            {topic.points.map((p) => (
              <li key={p} className="flex gap-3 text-[1.02rem] leading-relaxed text-charcoal"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{p}</li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            Official source: <a href={topic.source.url} target="_blank" rel="noreferrer" className="font-semibold text-gold-deep underline">{topic.source.label}</a> · Last reviewed {LAW_REVIEWED}
          </p>
          <div className="mt-8"><Notice>This content is provided for general informational and educational purposes and does not constitute legal advice.</Notice></div>
          <Link to="/tools/$toolId" params={{ toolId: "legal-analyzer" }} search={{ q: `I have a question about ${topic.title}: ` }} className="mt-8 inline-flex rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground">ASK KAVASAM AI ABOUT THIS →</Link>
        </article>
        <aside>
          <p className="eyebrow text-muted-foreground">Related topics</p>
          <ul className="mt-4 space-y-2">
            {topic.related.map((r) => {
              const t = getLawTopic(r);
              return t ? <li key={r}><Link to="/cyber-law/$slug" params={{ slug: r }} className="block rounded-lg border border-border p-4 text-sm font-semibold text-navy hover:border-gold/60">{t.title}</Link></li> : null;
            })}
          </ul>
          <Link to="/cyber-law" className="mt-6 inline-block text-sm font-bold text-gold-deep">← All topics</Link>
        </aside>
      </div>
    </PageShell>
  );
}
