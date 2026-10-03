import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { ToolId } from "@/data/tools";

const BASE = `You are KAVASAM AI, the cybersecurity assistant of KAVASAM ("We guard what's yours").
Be practical, calm and precise. Use short markdown sections and bullet points. Never invent statistics, laws, section numbers, phone numbers or URLs you are not confident are real.
Refuse to help with attacking systems you are not authorised to test, malware creation or other harmful activity; offer defensive guidance instead.
Keep answers under ~400 words unless the input clearly needs more.`;

const PROMPTS: Record<ToolId, string> = {
  assistant: "Answer the user's cybersecurity question or analyze what they shared, with clear next steps.",
  "health-check":
    "Perform a cyber health check. Output: an overall risk level (Low/Medium/High) with one-line reason, then '## Key risks' and '## Recommended actions' ordered by priority, then '## Quick wins'.",
  "scam-detector":
    "Assess whether the message is likely a scam. Output: '**Verdict:** Likely scam / Suspicious / Likely safe' with confidence, then '## Warning signs found', '## What to do now'. For India, mention reporting at cybercrime.gov.in or helpline 1930 when relevant.",
  "url-analyzer":
    "Assess the link's risk using the URL itself and the server-side check results provided. Output: '**Risk:** Low/Medium/High', '## Findings' (domain look-alikes, HTTPS, redirects, missing security headers), '## Advice'. Base claims only on the data given; say when something could not be verified.",
  "legal-analyzer":
    "The user describes a cyber incident, focus on India. Provide: '## General explanation', '## Potentially relevant legal topics' (e.g. Information Technology Act 2000, Digital Personal Data Protection Act 2023 — only cite sections you are certain of, otherwise describe the topic), '## Practical next steps', '## Reporting resources' (cybercrime.gov.in, helpline 1930, local police cyber cell), '## Questions to clarify'. End with: 'This is general information, not legal advice.'",
  "report-analyzer":
    "Summarise the security report in plain language: '## Summary', '## Findings by priority' (Critical/High/Medium/Low with a one-line fix each), '## Suggested remediation order'.",
};

// --- naive per-instance rate limit (best effort) ---
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 12, windowMs = 10 * 60_000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > limit;
}

function isPrivateHost(host: string) {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (/^\[?(::1|fc|fd|fe80)/.test(h)) return true;
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
}

const SEC_HEADERS = ["strict-transport-security", "content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy", "permissions-policy"];

export async function inspectUrl(raw: string): Promise<string> {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new Error("That doesn't look like a valid link.");
  }
  if (!["http:", "https:"].includes(url.protocol) || isPrivateHost(url.hostname)) throw new Error("Only public http(s) links can be analyzed.");
  const lines = [`URL: ${url.href}`, `Hostname: ${url.hostname}`, `Uses HTTPS: ${url.protocol === "https:"}`];
  if (/xn--/.test(url.hostname)) lines.push("Hostname contains punycode (possible look-alike characters).");
  const chain: string[] = [];
  let current = url;
  try {
    for (let i = 0; i < 5; i++) {
      const res = await fetch(current.href, { method: "GET", redirect: "manual", signal: AbortSignal.timeout(8000), headers: { "user-agent": "KAVASAM-URL-Analyzer/1.0" } });
      chain.push(`${res.status} ${current.href}`);
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) {
        const next = new URL(loc, current);
        if (isPrivateHost(next.hostname)) { chain.push("Redirect to private address blocked."); break; }
        current = next;
        continue;
      }
      const present = SEC_HEADERS.filter((h) => res.headers.has(h));
      const missing = SEC_HEADERS.filter((h) => !res.headers.has(h));
      lines.push(`Final URL: ${current.href}`, `Final status: ${res.status}`, `Server: ${res.headers.get("server") ?? "unknown"}`, `Security headers present: ${present.join(", ") || "none"}`, `Security headers missing: ${missing.join(", ") || "none"}`);
      res.body?.cancel();
      break;
    }
  } catch {
    lines.push("The site could not be reached from KAVASAM servers (timeout or connection error).");
  }
  lines.push(`Redirect chain:\n${chain.join("\n") || "none"}`);
  return lines.join("\n");
}

export function streamAnalysis(tool: ToolId, input: string, signal: AbortSignal) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI is not configured.");
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  return streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: `${BASE}\n\n${PROMPTS[tool]}`,
    messages: [{ role: "user", content: input }],
    abortSignal: signal,
    maxRetries: 0,
    providerOptions: {
      openai: { forceReasoning: true, reasoningEffort: "low", store: false },
    },
  });
}
