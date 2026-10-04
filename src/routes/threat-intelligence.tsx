import { createFileRoute } from "@tanstack/react-router";
import { meta, Notice, PageShell } from "@/components/PageShell";
import { getKev } from "@/lib/intel.functions";

export const Route = createFileRoute("/threat-intelligence")({
  loader: async () => {
    try { return { kev: await getKev() }; } catch { return { kev: null }; }
  },
  head: () => meta("Threat Intelligence", "Live view of actively exploited vulnerabilities from the CISA Known Exploited Vulnerabilities catalog, plus threat categories and official Indian advisories."),
  component: Intel,
});

const categories = [
  ["Phishing", "Fake messages and sites that steal credentials or OTPs. The most common entry point for fraud."],
  ["Malware", "Malicious software including info-stealers, banking trojans and fake APK apps."],
  ["Ransomware", "Encrypts or steals data and demands payment. Often begins with exploited vulnerabilities or stolen credentials."],
  ["Vulnerabilities", "Software flaws attackers exploit. Patching known-exploited flaws is one of the highest-value defences."],
  ["Data breaches", "Exposure of personal or business data, triggering obligations under CERT-In Directions and the DPDP framework."],
  ["Financial fraud", "UPI, investment, job and 'digital arrest' scams. In India, report immediately on 1930."],
];

function Intel() {
  const { kev } = Route.useLoaderData();
  const max = kev ? Math.max(...kev.months.map((m) => m.count), 1) : 1;
  return (
    <PageShell eyebrow="Threat Intelligence" title="Understand the threats shaping the digital world." intro="Real, sourced data only. Vulnerability data below is pulled live from the CISA Known Exploited Vulnerabilities (KEV) catalog.">
      {!kev ? (
        <Notice>The live threat feed couldn't be loaded right now. Please refresh in a few minutes.</Notice>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-3">
            {[["Known exploited vulnerabilities", kev.total], ["Added in last 30 days", kev.last30], ["Of those, used in ransomware", kev.ransomwareLast30]].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <p className="text-4xl font-extrabold text-navy">{v}</p>
                <p className="mt-2 text-sm text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-xl bg-navy p-6 text-navy-foreground">
              <p className="eyebrow text-gold">Timeline · additions per month</p>
              <div className="mt-6 flex h-40 items-end gap-3">
                {kev.months.map((m) => (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs text-navy-foreground/70">{m.count}</span>
                    <div className="w-full rounded-t bg-tech" style={{ height: `${(m.count / max) * 100}%` }} />
                    <span className="text-[0.65rem] text-navy-foreground/50">{m.month.slice(2)}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-xl border border-border p-6">
              <p className="eyebrow text-tech">Most affected vendors · last 30 days</p>
              <ul className="mt-5 space-y-3">
                {kev.topVendors.map(([v, c]) => (
                  <li key={v} className="flex items-center gap-3 text-sm">
                    <span className="w-32 truncate font-semibold text-navy">{v}</span>
                    <span className="h-2 rounded-full bg-gold" style={{ width: `${(c / (kev.topVendors[0]?.[1] ?? 1)) * 60}%` }} />
                    <span className="text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <section className="mt-6 rounded-xl border border-border">
            <p className="eyebrow border-b border-border p-6 text-gold-deep">Recent alerts · actively exploited</p>
            <ul className="divide-y divide-border">
              {kev.recent.map((v) => (
                <li key={v.cveID} className="grid gap-2 p-6 md:grid-cols-[160px_1fr]">
                  <div>
                    <a href={`https://nvd.nist.gov/vuln/detail/${v.cveID}`} target="_blank" rel="noreferrer" className="font-mono text-sm font-bold text-navy underline">{v.cveID}</a>
                    <p className="text-xs text-muted-foreground">{v.dateAdded}</p>
                    {v.ransomware && <span className="mt-1 inline-block rounded bg-destructive/10 px-2 py-0.5 text-[0.65rem] font-bold text-destructive">RANSOMWARE</span>}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{v.vulnerabilityName}</p>
                    <p className="text-xs text-tech">{v.vendorProject} · {v.product}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{v.shortDescription}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="border-t border-border p-6 text-xs text-muted-foreground">Source: CISA KEV catalog v{kev.catalogVersion}, released {kev.released.slice(0, 10)}. Severity details via NVD.</p>
          </section>
        </>
      )}
      <section className="mt-16">
        <h2 className="text-2xl font-extrabold text-navy">Threat categories</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {categories.map(([t, d]) => <div key={t} className="rounded-xl border border-border p-6"><h3 className="font-extrabold text-navy">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>)}
        </div>
      </section>
      <section className="mt-16 rounded-2xl bg-secondary p-8">
        <h2 className="text-xl font-extrabold text-navy">India: official advisories</h2>
        <p className="mt-2 text-sm text-muted-foreground">India-specific threat statistics are published by government agencies. We link to them rather than estimate numbers.</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a className="font-semibold text-gold-deep underline" href="https://www.cert-in.org.in/" target="_blank" rel="noreferrer">CERT-In advisories and vulnerability notes</a></li>
          <li><a className="font-semibold text-gold-deep underline" href="https://i4c.mha.gov.in/" target="_blank" rel="noreferrer">Indian Cyber Crime Coordination Centre (I4C)</a></li>
          <li><a className="font-semibold text-gold-deep underline" href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer">National Cyber Crime Reporting Portal</a></li>
        </ul>
      </section>
    </PageShell>
  );
}
