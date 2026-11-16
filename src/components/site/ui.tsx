import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/allin-logo.png.asset.json";
import { nav, studio, glofox, faqs, type Plan } from "@/lib/site";
import { cn } from "@/lib/utils";

type Btn = { href: string; children: ReactNode; variant?: "solid" | "light" | "outline" | "ghostLight"; className?: string };
export function PillLink({ href, children, variant = "solid", className }: Btn) {
  const ext = href.startsWith("http");
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-navy",
    light: "bg-background text-navy hover:bg-mint",
    outline: "border border-primary text-primary hover:bg-peri-tint",
    ghostLight: "border border-navy-foreground/60 text-navy-foreground hover:bg-navy-foreground/10",
  }[variant];
  const cls = cn("inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-colors", styles, className);
  if (ext) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}<ArrowUpRight className="size-4" aria-hidden /><span className="sr-only"> (opens in new tab)</span></a>;
  return <Link to={href as never} className={cls}>{children}</Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="All In Health & Wellness home">
          <img src={logo.url} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full" />
          <span className="hidden truncate font-serif text-lg sm:block">All In Health &amp; Wellness</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-[15px] font-semibold text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <PillLink href={glofox.schedule} className="px-4 py-2">Book now</PillLink>
          <button className="rounded-full p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t lg:hidden">
          <ul className="container-site py-3">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} onClick={() => setOpen(false)} className="block py-3 font-semibold">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" width={56} height={56} className="size-14 rounded-full" />
            <p className="font-serif text-xl">All In Health &amp; Wellness</p>
          </div>
          <p className="mt-4 max-w-sm text-sm text-navy-foreground/80">Reformer Pilates, interval training and wellness coaching in Babylon, NY. Founded by Dr. Judi Luttieri, DPT.</p>
        </div>
        <div>
          <p className="eyebrow text-mint">Visit</p>
          <address className="mt-3 space-y-2 text-sm not-italic text-navy-foreground/85">
            <p className="flex gap-2"><MapPin className="size-4 shrink-0 mt-1" aria-hidden />{studio.street}, {studio.city}, {studio.region} {studio.postal}</p>
            <p><a className="flex gap-2 hover:text-mint" href={studio.phoneHref}><Phone className="size-4 mt-1" aria-hidden />{studio.phone}</a></p>
            <p><a className="flex gap-2 hover:text-mint" href={`mailto:${studio.email}`}><Mail className="size-4 mt-1" aria-hidden />{studio.email}</a></p>
            <p><a className="flex gap-2 hover:text-mint" href={studio.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="size-4 mt-1" aria-hidden />@allinhealthmindandbody</a></p>
          </address>
        </div>
        <div>
          <p className="eyebrow text-mint">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="text-navy-foreground/85 hover:text-mint">{n.label}</Link></li>)}
            <li><a href={glofox.schedule} target="_blank" rel="noopener noreferrer" className="text-navy-foreground/85 hover:text-mint">Class schedule</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/15">
        <p className="container-site py-5 text-xs text-navy-foreground/70">© {new Date().getFullYear()} All In Health &amp; Wellness · Babylon, New York</p>
      </div>
    </footer>
  );
}

export function Stamp({ label, sub, tone = "mint" }: { label: string; sub: string; tone?: "mint" | "sky" | "peri" }) {
  const bg = { mint: "bg-mint", sky: "bg-sky", peri: "bg-peri" }[tone];
  return (
    <div className="flex flex-col items-center text-center">
      <div className={cn("grid size-28 place-items-center rounded-full p-1.5", bg)}>
        <div className="grid size-full place-items-center rounded-full border-2 border-dashed border-navy/40 bg-background/70 p-2">
          <span className="font-serif text-lg leading-tight text-navy">{label}</span>
        </div>
      </div>
      <p className="mt-3 max-w-[11rem] text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

export function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: ReactNode; intro?: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow text-primary">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl md:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-4 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, img, children }: { eyebrow: string; title: ReactNode; intro: string; img: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <img src={img} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="container-site py-16 md:py-24">
        <p className="eyebrow text-mint">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg text-navy-foreground/90">{intro}</p>
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function PriceCard({ plan, tone = "bg-card" }: { plan: Plan; tone?: string }) {
  return (
    <article className={cn("flex flex-col rounded-[20px] border p-6 shadow-soft", tone)}>
      <h3 className="text-xl">{plan.name}</h3>
      <p className="mt-3 font-serif text-4xl text-navy">{plan.price}</p>
      <p className="mt-1 text-sm font-semibold text-muted-foreground">{plan.note}</p>
      {plan.detail && <p className="mt-3 text-sm text-muted-foreground">{plan.detail}</p>}
      <div className="mt-auto pt-6"><PillLink href={plan.href} className="w-full">{plan.cta}</PillLink></div>
    </article>
  );
}

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="divide-y rounded-[20px] border bg-card">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg">
            <h3 className="text-lg">{f.q}</h3>
            <span aria-hidden className="text-2xl text-primary transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function GlofoxEmbed({ src, title, height = 900 }: { src: string; title: string; height?: number }) {
  return (
    <div className="overflow-hidden rounded-[22px] border bg-card shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <p className="text-sm font-semibold text-muted-foreground">Live from our Glofox booking portal</p>
        <PillLink href={src} variant="outline" className="py-1.5 text-xs">Open in new tab</PillLink>
      </div>
      <iframe src={src} title={title} loading="lazy" className="block w-full" style={{ height }} allow="payment" />
    </div>
  );
}

export function BookingCTA() {
  return (
    <section className="section-y">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[22px] bg-navy px-6 py-14 text-center text-navy-foreground md:px-16">
          <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-64 rounded-full bg-peri-deep/40" />
          <div aria-hidden className="absolute -bottom-20 -left-10 -z-10 size-56 rounded-full bg-mint/15" />
          <p className="eyebrow text-mint">Your first step</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl md:text-5xl">Three classes. Two weeks. <em className="font-normal italic">$99.</em></h2>
          <p className="mx-auto mt-4 max-w-lg text-navy-foreground/85">Try Reformer Pilates and Interval Training in Babylon with expert, physical-therapy-informed guidance.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PillLink href={glofox.memberships} variant="light">Book now</PillLink>
            <PillLink href="/classes" variant="ghostLight">See the schedule</PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
