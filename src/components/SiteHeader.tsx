import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/kavasam-logo.png.asset.json";
import { navItems } from "@/data/navigation";

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="KAVASAM home">
      <img src={logo.url} alt="" className="h-9 w-9 object-contain" />
      <span className="text-lg font-extrabold tracking-[0.18em] text-navy">KAVASAM</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-charcoal transition-colors hover:text-navy"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </a>
              {item.children && (
                <div className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-lg border border-border bg-popover p-2 opacity-0 shadow-card transition-all group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => {
                    const [label, href] = typeof c === "string" ? [c, item.href] : c;
                    return (
                    <a key={label} href={href} className="block rounded-md px-3 py-2 text-sm text-charcoal hover:bg-secondary hover:text-navy">
                      {label}
                    </a>
                  );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Search" className="rounded-md p-2 text-charcoal hover:bg-secondary">
            <Search className="h-4.5 w-4.5" />
          </button>
          <a href="/contact" className="hidden rounded-md bg-navy px-4 py-2 text-sm font-bold text-navy-foreground transition-colors hover:bg-navy-soft sm:inline-flex">
            Get Started
          </a>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-md p-2 text-navy lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block py-3 text-base font-semibold text-navy">
              {item.label}
            </a>
          ))}
          <a href="/contact" className="mt-3 block rounded-md bg-navy px-4 py-3 text-center font-bold text-navy-foreground">Get Started</a>
        </nav>
      )}
    </header>
  );
}
