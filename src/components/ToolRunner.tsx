import { ArrowRight, Loader2, Square } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { ToolDef } from "@/data/tools";

export function ToolRunner({ tool, initial = "" }: { tool: ToolDef; initial?: string }) {
  const [input, setInput] = useState(initial);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (loading || input.trim().length < 3) return;
    setOutput(""); setError(""); setLoading(true);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: tool.id, input }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "The analysis couldn't be completed. Please try again later.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let got = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        if (chunk) got = true;
        setOutput((o) => o + chunk);
      }
      if (!got) throw new Error("No answer was returned. Please try again later.");
    } catch (err) {
      if ((err as Error).name !== "AbortError") setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={run} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
        <label htmlFor="tool-input" className="text-xl font-bold text-navy">{tool.heading}</label>
        {tool.inputType === "url" ? (
          <input
            id="tool-input" type="text" inputMode="url" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder} maxLength={2000}
            className="mt-4 w-full rounded-lg border border-input bg-secondary p-4 text-sm text-foreground focus:border-gold focus:outline-none"
          />
        ) : (
          <textarea
            id="tool-input" rows={6} value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={tool.placeholder} maxLength={8000}
            className="mt-4 w-full resize-y rounded-lg border border-input bg-secondary p-4 text-sm text-foreground focus:border-gold focus:outline-none"
          />
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-xs text-muted-foreground">{tool.disclaimer}</p>
          {loading ? (
            <button type="button" onClick={() => abortRef.current?.abort()} className="inline-flex items-center gap-2 rounded-md border border-navy/20 px-6 py-3 text-sm font-bold text-navy">
              <Square className="h-3.5 w-3.5 fill-current" /> STOP
            </button>
          ) : (
            <button type="submit" disabled={input.trim().length < 3} className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold tracking-wide text-gold-foreground disabled:opacity-50">
              ANALYZE <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {(loading || output || error) && (
        <section aria-live="polite" className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <p className="eyebrow text-gold-deep">KAVASAM AI analysis</p>
          {error && <p role="alert" className="mt-4 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
          {loading && !output && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</p>
          )}
          {output && (
            <div className="prose-kavasam mt-4 text-[0.95rem] leading-relaxed text-charcoal">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )}
          {output && !loading && (
            <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">Want to keep this result? Accounts for saving results are coming soon.</p>
          )}
        </section>
      )}
    </div>
  );
}
