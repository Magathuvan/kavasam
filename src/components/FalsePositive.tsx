import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Feed = "kev" | "openphish";
type Counts = Record<string, { flags: number; status: string }>;

export function useFlagCounts(feed: Feed, indicators: string[]) {
  const [counts, setCounts] = useState<Counts>({});
  const key = indicators.join("|");
  useEffect(() => {
    if (!indicators.length) return;
    supabase.rpc("threat_flag_counts", { _feed: feed, _indicators: indicators }).then(({ data }) => {
      const c: Counts = {};
      for (const r of data ?? []) c[r.indicator] = { flags: Number(r.flags), status: r.status };
      setCounts(c);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed, key]);
  const bump = (i: string) => setCounts((c) => ({ ...c, [i]: { flags: (c[i]?.flags ?? 0) + 1, status: c[i]?.status ?? "pending" } }));
  return { counts, bump };
}

export function FlagButton({ feed, indicator, count, onFlagged }: { feed: Feed; indicator: string; count?: { flags: number; status: string } | undefined; onFlagged: () => void }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const storeKey = `kv-flag:${feed}:${indicator}`;
  const [already, setAlready] = useState(false);
  useEffect(() => { setAlready(!!localStorage.getItem(storeKey)); }, [storeKey]);

  async function send() {
    setState("sending");
    const { error } = await supabase.from("threat_flags").insert({ feed, indicator, reason: reason.trim().slice(0, 1000) || null });
    if (error) { setState("error"); return; }
    localStorage.setItem(storeKey, "1");
    setState("done");
    setOpen(false);
    onFlagged();
  }

  return (
    <div className="mt-2 text-xs">
      {count && count.flags > 0 && (
        <span className={`mr-2 inline-block rounded px-2 py-0.5 font-bold ${count.status === "confirmed" ? "bg-accent text-gold-deep" : "bg-secondary text-muted-foreground"}`}>
          {count.status === "confirmed" ? "Confirmed false positive" : `Reported as false positive · ${count.flags}`}
        </span>
      )}
      {state === "done" || already ? (
        <span className="text-muted-foreground">Thanks — your report is under review.</span>
      ) : open ? (
        <span className="mt-2 flex flex-wrap items-center gap-2">
          <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={1000} placeholder="Why is this a false positive? (optional)" aria-label="Reason" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1.5" />
          <button onClick={send} disabled={state === "sending"} className="rounded bg-navy px-3 py-1.5 font-bold text-navy-foreground">{state === "sending" ? "Sending…" : "Submit"}</button>
          <button onClick={() => setOpen(false)} className="text-muted-foreground">Cancel</button>
          {state === "error" && <span className="w-full text-destructive">Couldn't send. Please try again.</span>}
        </span>
      ) : (
        <button onClick={() => setOpen(true)} className="font-semibold text-muted-foreground underline hover:text-navy">Flag as false positive</button>
      )}
    </div>
  );
}

export const defang = (u: string) => u.replace(/^http/, "hxxp").replace(/\./g, "[.]");
