import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { meta, PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";

const types = [["general", "General enquiry"], ["assessment", "Security assessment"], ["partnership", "Business partnership"], ["research", "Security research"], ["disclosure", "Responsible disclosure"], ["training", "Training / workshop"]] as const;
const typeIds = types.map((t) => t[0]) as [string, ...string[]];

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ type: z.enum(typeIds).optional() }),
  head: () => meta("Contact KAVASAM", "Contact KAVASAM for security assessments, partnerships, research, responsible disclosure or training. No login required."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().max(150).optional(),
  enquiry_type: z.enum(typeIds),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(5000),
});

const field = "mt-2 w-full rounded-lg border border-input bg-background p-3.5 text-sm focus:border-gold focus:outline-none";

function Contact() {
  const { type } = Route.useSearch();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(f));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form."); return; }
    setState("sending");
    const { error: dbErr } = await supabase.from("enquiries").insert({ ...parsed.data, organization: parsed.data.organization || null });
    if (dbErr) { setError("Your message couldn't be sent. Please try again."); setState("idle"); return; }
    setState("sent");
  }

  return (
    <PageShell eyebrow="Contact" title="Let's talk security." intro="Tell us what you need. We read every message.">
      {state === "sent" ? (
        <div className="max-w-2xl rounded-2xl border border-gold/50 bg-accent p-8"><h2 className="text-2xl font-extrabold text-navy">Thank you — message received.</h2><p className="mt-2 text-charcoal">We'll get back to you by email.</p></div>
      ) : (
        <form onSubmit={submit} className="grid max-w-3xl gap-5 sm:grid-cols-2">
          <label className="text-sm font-bold text-navy">Name<input name="name" required maxLength={100} className={field} /></label>
          <label className="text-sm font-bold text-navy">Email<input name="email" type="email" required maxLength={255} className={field} /></label>
          <label className="text-sm font-bold text-navy">Organization <span className="font-normal text-muted-foreground">(optional)</span><input name="organization" maxLength={150} className={field} /></label>
          <label className="text-sm font-bold text-navy">Enquiry type
            <select name="enquiry_type" defaultValue={type ?? "general"} className={field}>{types.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </label>
          <label className="text-sm font-bold text-navy sm:col-span-2">Message<textarea name="message" rows={6} required maxLength={5000} className={field} /></label>
          {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
          <div className="sm:col-span-2">
            <button disabled={state === "sending"} className="rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-gold-foreground disabled:opacity-60">{state === "sending" ? "SENDING…" : "SEND MESSAGE →"}</button>
            <p className="mt-3 text-xs text-muted-foreground">Please don't include passwords, OTPs or full vulnerability exploit details in this form.</p>
          </div>
        </form>
      )}
    </PageShell>
  );
}
