import logo from "@/assets/kavasam-logo.png.asset.json";

const nav = [["Solutions", "/solutions"], ["AI Tools", "/tools"], ["Security Tools", "/security-tools"], ["Cyber Law", "/cyber-law"], ["Threat Intelligence", "/threat-intelligence"], ["Academy", "/academy"], ["Research", "/research"], ["About", "/about"], ["Team", "/team"], ["Contact", "/contact"]];
const legal = [["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"], ["Cookie Policy", "/cookies"], ["Responsible Disclosure", "/responsible-disclosure"], ["Legal disclaimer", "/cyber-law"]];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-10 w-10 object-contain" />
            <span className="text-xl font-extrabold tracking-[0.18em]">KAVASAM</span>
          </div>
          <p className="eyebrow mt-5 text-gold">We guard what’s yours.</p>
        </div>
        <div>
          <p className="eyebrow text-navy-foreground/50">Navigate</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map(([n, h]) => <li key={n}><a href={h} className="text-navy-foreground/80 hover:text-gold">{n}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-navy-foreground/50">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legal.map(([n, h]) => <li key={n}><a href={h} className="text-navy-foreground/80 hover:text-gold">{n}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-6 text-center text-xs text-navy-foreground/50">
        © {new Date().getFullYear()} KAVASAM. All rights reserved.
      </div>
    </footer>
  );
}
