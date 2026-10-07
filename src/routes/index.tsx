import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bot, Gavel, HeartPulse, Play, Radar, ShieldAlert, Wrench } from "lucide-react";
import { Globe } from "@/components/Globe";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KAVASAM — AI-Powered Cybersecurity | We Guard What’s Yours" },
      { name: "description", content: "AI-powered cybersecurity, threat intelligence, digital safety, cyber law information and security tools for people and businesses." },
      { property: "og:title", content: "KAVASAM — We Guard What’s Yours" },
      { property: "og:description", content: "AI-powered cybersecurity, threat intelligence, digital safety, cyber law information and security tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const values = [
  ["Smarter protection", "AI-powered threat detection"],
  ["Real-world security", "For individuals and businesses"],
  ["A safer digital world", "Awareness. Intelligence. Protection."],
];

const strip = [
  ["AI Security", "Intelligent protection"],
  ["Threat Intelligence", "Real-time security insights"],
  ["Digital Safety", "Protection for everyone"],
  ["Cyber Law", "Understand your digital rights"],
  ["Security Tools", "Practical security analysis"],
];

const cards = [
  { icon: Bot, title: "AI Cyber Assistant", desc: "Ask cybersecurity questions and receive practical AI-powered guidance.", cta: "Try KAVASAM AI", to: "/tools/assistant" },
  { icon: HeartPulse, title: "AI Cyber Health Check", desc: "Analyze digital security risks and receive actionable recommendations.", cta: "Run Health Check", to: "/tools/health-check" },
  { icon: ShieldAlert, title: "Scam Detector", desc: "Analyze suspicious messages, emails, links, and potential scams.", cta: "Check for Scam", to: "/tools/scam-detector" },
  { icon: Gavel, title: "Cyber Law Hub", desc: "Explore cybersecurity laws, regulations, rights, and reporting information.", cta: "Explore Cyber Law", to: "/cyber-law" },
  { icon: Radar, title: "Threat Intelligence", desc: "Explore current cybersecurity threats and security intelligence.", cta: "View Threat Intelligence", to: "/threat-intelligence" },
  { icon: Wrench, title: "Security Tools", desc: "Access practical cybersecurity analysis tools.", cta: "Explore Tools", to: "/security-tools" },
];

const individuals = ["Scam protection", "Digital safety", "AI cybersecurity assistant", "Cyber law information", "Suspicious link & message analysis", "Security education"];
const businesses = ["Penetration testing", "Vulnerability assessment", "Security audits", "Application security", "Cloud security", "Threat intelligence", "Consulting", "Employee security training"];

function Index() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-24 lg:pt-20">
            <div className="order-2 lg:order-1">
              <p className="eyebrow inline-flex items-center gap-2 text-gold-deep">
                <span className="h-px w-8 bg-gold" /> AI-powered cybersecurity
              </p>
              <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                <span className="block text-navy">WE GUARD</span>
                <span className="text-gold-gradient block">WHAT’S YOURS.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                AI-driven cybersecurity solutions designed to protect people, businesses, and digital futures.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#ecosystem" className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold tracking-wide text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5">
                  EXPLORE KAVASAM <ArrowRight className="h-4 w-4" />
                </a>
                <button className="inline-flex items-center gap-2 rounded-md border border-navy/20 px-6 py-3.5 text-sm font-bold tracking-wide text-navy transition-colors hover:bg-secondary">
                  <Play className="h-4 w-4 fill-current" /> WATCH INTRO
                </button>
              </div>
              <dl className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
                {values.map(([t, d]) => (
                  <div key={t}>
                    <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-navy">{t}</dt>
                    <dd className="mt-1.5 text-sm text-muted-foreground">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="order-1 lg:order-2">
              <Globe />
            </div>
          </div>
        </section>

        {/* Strip */}
        <section className="bg-navy text-navy-foreground" aria-label="What KAVASAM covers">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-10 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
            {strip.map(([t, d]) => (
              <div key={t} className="px-2 py-3 lg:border-l lg:border-navy-foreground/10 lg:px-6 lg:first:border-l-0">
                <p className="eyebrow text-gold">{t}</p>
                <p className="mt-2 text-sm text-navy-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem */}
        <section id="ecosystem" className="bg-secondary py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="eyebrow text-gold-deep">Our cybersecurity ecosystem</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Security intelligence for the digital world.
            </h2>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ icon: Icon, title, desc, cta, to }) => (
                <a key={title} href={to} className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-gold/60">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-sm font-extrabold uppercase tracking-[0.12em] text-navy">{title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-gold-deep">
                    {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* KAVASAM AI */}
        <section id="ai" className="bg-navy py-24 text-navy-foreground">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <p className="eyebrow text-gold">KAVASAM AI</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Cybersecurity intelligence, available when you need it.
            </h2>
            <p className="mt-4 text-navy-foreground/60">No account needed. Create one later to save your results.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) navigate({ to: "/tools/$toolId", params: { toolId: "assistant" }, search: { q } }); }} className="mt-12 rounded-2xl border border-navy-foreground/10 bg-navy-soft p-6 text-left sm:p-8">
              <label htmlFor="ask" className="text-xl font-bold">What would you like to secure?</label>
              <textarea
                id="ask"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                rows={4}
                placeholder="Ask a cybersecurity question, analyze a suspicious message, URL, email, or security concern..."
                className="mt-4 w-full resize-none rounded-lg border border-navy-foreground/15 bg-navy p-4 text-sm text-navy-foreground placeholder:text-navy-foreground/40 focus:border-gold focus:outline-none"
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-navy-foreground/50">AI guidance is informational and not a substitute for professional advice.</p>
                <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold tracking-wide text-gold-foreground">
                  ANALYZE <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Pathways */}
        <section id="pathways" className="py-24">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
            <div className="rounded-2xl border border-border p-8 sm:p-10">
              <p className="eyebrow text-tech">For individuals</p>
              <h3 className="mt-3 text-3xl font-extrabold text-navy">Stay safe online.</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {individuals.map((i) => <li key={i} className="flex items-center gap-2.5 text-sm text-charcoal"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{i}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-8 text-navy-foreground sm:p-10">
              <p className="eyebrow text-gold">For businesses</p>
              <h3 className="mt-3 text-3xl font-extrabold">Secure your organization.</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {businesses.map((i) => <li key={i} className="flex items-center gap-2.5 text-sm text-navy-foreground/80"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{i}</li>)}
              </ul>
              <a href="/solutions" className="mt-10 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold tracking-wide text-gold-foreground">
                PROTECT YOUR BUSINESS <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
