import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { meta, PageShell } from "@/components/PageShell";
import { checkHeaders } from "@/lib/intel.functions";

export const Route = createFileRoute("/security-tools")({
  head: () => meta("Security Tools", "Free security tools: password breach checker, domain DNS intelligence, security header checker, scam detector and URL analyzer."),
  component: Tools,
});

async function sha1(s: string) {
  const b = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function strength(p: string) {
  let s = 0;
  if (p.length >= 12) s++;
  if (p.length >= 16) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"][s];
}

const card = "rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8";
const input = "mt-4 w-full rounded-lg border border-input bg-secondary p-3.5 text-sm focus:border-gold focus:outline-none";
const btn = "mt-4 rounded-md bg-navy px-5 py-2.5 text-sm font-bold text-navy-foreground hover:bg-navy-soft disabled:opacity-50";

function PasswordChecker() {
  const [pw, setPw] = useState("");
  const [res, setRes] = useState<string>("");
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true); setRes("");
    try {
      const h = await sha1(pw);
      const r = await fetch(`https://api.pwnedpasswords.com/range/${h.slice(0, 5)}`, { headers: { "Add-Padding": "true" } });
      const text = await r.text();
      const line = text.split("\n").find((l) => l.startsWith(h.slice(5)));
      const n = line ? Number(line.split(":")[1]) : 0;
      setRes(n > 0 ? `⚠ Found in ${n.toLocaleString()} known breaches. Don't use this password.` : "✓ Not found in known breaches.");
    } catch { setRes("Couldn't reach the breach database. Try again later."); }
    setBusy(false);
  }
  return (
    <section className={card}>
      <h2 className="text-xl font-extrabold text-navy">Password Security Checker</h2>
      <p className="mt-2 text-sm text-muted-foreground">Your password never leaves this device. Only the first 5 characters of its SHA-1 hash are sent to Have I Been Pwned (k-anonymity).</p>
      <input type="password" aria-label="Password" value={pw} onChange={(e) => setPw(e.target.value)} className={input} placeholder="Enter a password to test" autoComplete="off" />
      {pw && <p className="mt-2 text-sm text-charcoal">Strength: <strong className="text-navy">{strength(pw)}</strong> · {pw.length} characters</p>}
      <button disabled={!pw || busy} onClick={run} className={btn}>{busy ? "Checking…" : "Check breaches"}</button>
      {res && <p className="mt-4 text-sm font-semibold text-navy" aria-live="polite">{res}</p>}
    </section>
  );
}

function DomainIntel() {
  const [d, setD] = useState("");
  const [rows, setRows] = useState<[string, string[]][] | null>(null);
  const [err, setErr] = useState("");
  async function run() {
    setErr(""); setRows(null);
    const host = d.trim().replace(/^https?:\/\//, "").split("/")[0] ?? "";
    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(host)) { setErr("Enter a valid domain, e.g. example.com"); return; }
    const types = ["A", "AAAA", "MX", "NS", "TXT", "CAA"];
    try {
      const out = await Promise.all(types.map(async (t) => {
        const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=${t}`, { headers: { accept: "application/dns-json" } });
        const j = await r.json();
        return [t, (j.Answer ?? []).map((a: { data: string }) => a.data)] as [string, string[]];
      }));
      setRows(out);
    } catch { setErr("DNS lookup failed. Try again later."); }
  }
  const txt = rows?.find((r) => r[0] === "TXT")?.[1] ?? [];
  return (
    <section className={card}>
      <h2 className="text-xl font-extrabold text-navy">Domain Intelligence</h2>
      <p className="mt-2 text-sm text-muted-foreground">Public DNS records and email-security checks (SPF) via Cloudflare DNS-over-HTTPS.</p>
      <input value={d} onChange={(e) => setD(e.target.value)} className={input} placeholder="example.com" aria-label="Domain" />
      <button disabled={!d} onClick={run} className={btn}>Look up</button>
      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}
      {rows && (
        <dl className="mt-5 space-y-3 text-sm">
          {rows.map(([t, v]) => (
            <div key={t} className="grid grid-cols-[60px_1fr] gap-3"><dt className="font-bold text-tech">{t}</dt><dd className="break-all text-charcoal">{v.length ? v.join(" · ") : <span className="text-muted-foreground">none</span>}</dd></div>
          ))}
          <div className="border-t border-border pt-3 font-semibold text-navy">SPF record: {txt.some((t) => t.includes("v=spf1")) ? "✓ present" : "✗ missing — domain is easier to spoof in email"}</div>
        </dl>
      )}
    </section>
  );
}

function HeaderChecker() {
  const [u, setU] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true); setOut("");
    try { setOut((await checkHeaders({ data: { url: u } })).report); } catch (e) { setOut((e as Error).message || "Check failed."); }
    setBusy(false);
  }
  return (
    <section className={card}>
      <h2 className="text-xl font-extrabold text-navy">Security Header Checker</h2>
      <p className="mt-2 text-sm text-muted-foreground">Checks HTTPS, redirects and key HTTP security headers (HSTS, CSP, X-Frame-Options and more) from KAVASAM servers.</p>
      <input value={u} onChange={(e) => setU(e.target.value)} className={input} placeholder="https://example.com" aria-label="Website URL" />
      <button disabled={!u || busy} onClick={run} className={btn}>{busy ? "Checking…" : "Check headers"}</button>
      {out && <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-secondary p-4 text-xs text-charcoal">{out}</pre>}
    </section>
  );
}

function Tools() {
  return (
    <PageShell eyebrow="Security Tools" title="Practical tools that actually check things." intro="Free, no login required. Every result comes from a real check — nothing is simulated.">
      <div className="grid gap-6 lg:grid-cols-2">
        <PasswordChecker />
        <DomainIntel />
        <HeaderChecker />
        <section className="rounded-2xl bg-navy p-8 text-navy-foreground">
          <h2 className="text-xl font-extrabold">AI-powered checks</h2>
          <ul className="mt-5 space-y-3">
            {[["scam-detector", "Scam Detector"], ["url-analyzer", "URL Analyzer"], ["health-check", "Cyber Health Check"], ["report-analyzer", "Security Report Analyzer"]].map(([id, t]) => (
              <li key={id}><Link to="/tools/$toolId" params={{ toolId: id }} className="font-semibold text-gold hover:underline">{t} →</Link></li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
