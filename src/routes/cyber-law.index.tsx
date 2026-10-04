import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { meta, Notice, PageShell } from "@/components/PageShell";
import { LAW_REVIEWED, lawCategories, lawTopics } from "@/data/cyberLaw";

export const Route = createFileRoute("/cyber-law/")({
  head: () => meta("Cyber Law Hub — India", "Plain-language guide to India's cyber laws: IT Act 2000, DPDP Act 2023 and Rules 2025, BNS cyber offences, CERT-In directions and how to report cybercrime."),
  component: CyberLaw,
});

function CyberLaw() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const list = useMemo(() => {
    const s = q.toLowerCase();
    return lawTopics.filter((t) => (!cat || t.category === cat) && (!s || [t.title, t.summary, ...t.points].join(" ").toLowerCase().includes(s)));
  }, [q, cat]);

  return (
    <PageShell eyebrow="Cyber Law Hub · India" title="Understand your digital rights." intro={`Plain-language explanations of India's cyber laws with links to official sources. Last reviewed ${LAW_REVIEWED}.`}>
      <Notice>This content is provided for general informational and educational purposes and does not constitute legal advice. KAVASAM is not a law firm. Always check the official text and consult a qualified advocate for your situation.</Notice>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search laws</span>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. identity theft, 66D, data breach, OTP fraud…" className="w-full rounded-lg border border-input bg-background py-3.5 pl-11 pr-4 text-sm focus:border-gold focus:outline-none" />
        </label>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCat(null)} className={`rounded-full border px-4 py-2 text-xs font-bold ${!cat ? "border-navy bg-navy text-navy-foreground" : "border-border text-charcoal"}`}>All</button>
          {lawCategories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-xs font-bold ${cat === c ? "border-navy bg-navy text-navy-foreground" : "border-border text-charcoal"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <Link key={t.slug} to="/cyber-law/$slug" params={{ slug: t.slug }} className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
            <p className="eyebrow text-tech">{t.category}</p>
            <h2 className="mt-3 text-lg font-extrabold text-navy">{t.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.summary}</p>
            <span className="mt-5 text-sm font-bold text-gold-deep">Read →</span>
          </Link>
        ))}
        {!list.length && <p className="text-muted-foreground">No topics match your search.</p>}
      </div>
      <div className="mt-16 rounded-2xl bg-navy p-8 text-navy-foreground sm:p-10">
        <h2 className="text-2xl font-extrabold">Facing a cyber incident?</h2>
        <p className="mt-2 text-navy-foreground/70">Describe what happened and get relevant legal topics, next steps and reporting options.</p>
        <Link to="/tools/$toolId" params={{ toolId: "legal-analyzer" }} className="mt-6 inline-flex rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground">OPEN AI LEGAL ANALYZER →</Link>
      </div>
    </PageShell>
  );
}
