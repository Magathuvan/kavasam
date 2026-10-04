import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type KevItem = { cveID: string; vendorProject: string; product: string; vulnerabilityName: string; dateAdded: string; shortDescription: string; knownRansomwareCampaignUse: string; requiredAction: string };

export const getKev = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json", { headers: { "user-agent": "KAVASAM/1.0" } });
  if (!res.ok) throw new Error("Threat feed unavailable");
  const data = (await res.json()) as { catalogVersion: string; dateReleased: string; vulnerabilities: KevItem[] };
  const vulns = [...data.vulnerabilities].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  const now = Date.now();
  const days = (d: string) => (now - new Date(d).getTime()) / 86400000;
  const last30 = vulns.filter((v) => days(v.dateAdded) <= 30);
  const vendorCounts: Record<string, number> = {};
  for (const v of last30.length ? last30 : vulns.slice(0, 50)) vendorCounts[v.vendorProject] = (vendorCounts[v.vendorProject] ?? 0) + 1;
  const months: { month: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - i);
    const key = d.toISOString().slice(0, 7);
    months.push({ month: key, count: vulns.filter((v) => v.dateAdded.startsWith(key)).length });
  }
  return {
    catalogVersion: data.catalogVersion,
    released: data.dateReleased,
    total: vulns.length,
    last30: last30.length,
    ransomwareLast30: last30.filter((v) => v.knownRansomwareCampaignUse === "Known").length,
    topVendors: Object.entries(vendorCounts).sort((a, b) => b[1] - a[1]).slice(0, 6),
    months,
    recent: vulns.slice(0, 15).map(({ cveID, vendorProject, product, vulnerabilityName, dateAdded, shortDescription, knownRansomwareCampaignUse }) => ({ cveID, vendorProject, product, vulnerabilityName, dateAdded, shortDescription, ransomware: knownRansomwareCampaignUse === "Known" })),
  };
});

export const checkHeaders = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ url: z.string().trim().min(3).max(2000) }).parse(d))
  .handler(async ({ data }) => {
    const { inspectUrl } = await import("./ai.server");
    return { report: await inspectUrl(data.url) };
  });
