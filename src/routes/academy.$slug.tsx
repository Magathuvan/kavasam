import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { meta, PageShell } from "@/components/PageShell";
import { getGuide } from "@/data/academy";

export const Route = createFileRoute("/academy/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => (loaderData ? meta(loaderData.guide.title, loaderData.guide.intro) : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] }),
  component: GuidePage,
});

function GuidePage() {
  const { guide } = Route.useLoaderData();
  return (
    <PageShell eyebrow={`${guide.category} · ${guide.level} · ${guide.minutes} min`} title={guide.title} intro={guide.intro}>
      <article className="max-w-3xl">
        {guide.sections.map((s) => (
          <section key={s.h} className="mb-10">
            <h2 className="text-xl font-extrabold text-navy">{s.h}</h2>
            <ul className="mt-4 space-y-3">{s.items.map((i) => <li key={i} className="flex gap-3 leading-relaxed text-charcoal"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{i}</li>)}</ul>
          </section>
        ))}
        <Link to="/academy" className="text-sm font-bold text-gold-deep">← All guides</Link>
      </article>
    </PageShell>
  );
}
