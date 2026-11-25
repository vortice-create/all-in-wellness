import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PillLink, SectionHead, PriceCard, GlofoxEmbed, CancellationNote, BookingCTA, PromoBadge } from "@/components/site/ui";
import { useContent } from "@/hooks/use-content";
import { glofox, photos, ld, pageHead, serviceJsonLd, blackFridayPromo } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () =>
    pageHead({
      title: "Pilates Pricing & Memberships | All In Health & Wellness Babylon",
      description: "Intro offer: 3 classes for $79 (ends 11/30). Class packs from $45, memberships from $140/mo, private Reformer sessions and PT evaluations in Babylon, NY.",
      path: "/pricing",
      image: photos.share,
      scripts: [
        ld(serviceJsonLd("Intro Offer — 3 Reformer classes", "Three classes for new clients, used within 2 weeks. Offer ends 11/30.", "$79")),
        ld(serviceJsonLd("Private Reformer Session", "One-on-one Reformer Pilates instruction.", "$130")),
        ld(serviceJsonLd("Physical Therapy Evaluation", "Assessment with Dr. Judi Luttieri, DPT.", "$250")),
      ],
    }),
  component: PricingPage,
});

function PricingPage() {
  const { introOffer, packages, memberships, privates } = useContent();
  return (
    <>
      <PageHero eyebrow="Pricing & memberships" title={<>Simple ways to go <em className="font-normal italic">all in</em></>} intro="Every purchase is completed securely through our Glofox portal." img={photos.studio}>
        <PillLink href={glofox.memberships} variant="light">Book now</PillLink>
      </PageHero>

      <section id="intro" className="section-y">
        <div className="container-site grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="Start here" title="New client intro offer" intro="The easiest way to try the studio. Mix Reformer and Interval classes." />
          <PriceCard plan={introOffer} tone="bg-mint-tint" />
        </div>
      </section>

      <section id="packages" className="section-y bg-sky-tint">
        <div className="container-site">
          <SectionHead eyebrow="Class packages" title="Pay as you go" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{packages.map((p) => <PriceCard key={p.name} plan={p} />)}</div>
          <p className="mt-6 text-center text-sm font-semibold text-primary"><a href="/contact" className="underline underline-offset-4">{blackFridayPromo.referral}</a></p>
        </div>
      </section>

      <section id="memberships" className="section-y">
        <div className="container-site">
          <SectionHead eyebrow="Memberships" title="Make it a habit" intro="Monthly price shown, with the lower rate when you commit for a year." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {memberships.map((m) => (
              <article key={m.name} className={cn("flex flex-col rounded-[20px] border p-6 shadow-soft", m.featured ? "bg-peri-tint ring-2 ring-primary" : "bg-card")}>
                {m.featured && <p className="eyebrow text-primary">Most popular</p>}
                <h3 className="mt-1 text-2xl">{m.name}</h3>
                <p className="mt-1 font-semibold text-muted-foreground">{m.freq}</p>
                <p className="mt-4"><span className="font-serif text-4xl text-navy">{m.monthly}</span><span className="text-muted-foreground"> /month</span></p>
                <p className="mt-1 text-sm text-muted-foreground"><strong className="text-foreground">{m.annual}/month</strong> with an annual commitment</p>
                <PromoBadge>{blackFridayPromo.annual}</PromoBadge>
                <div className="mt-auto pt-6"><PillLink href={m.href} className="w-full">Join {m.name}</PillLink></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="private" className="section-y bg-peri-tint">
        <div className="container-site">
          <SectionHead eyebrow="One-on-one" title="Private sessions & evaluation" intro="Personal attention for your body, goals or recovery." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{privates.map((p) => <PriceCard key={p.name} plan={p} />)}</div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHead eyebrow="Buy online" title="Packages & memberships portal" />
          <div className="mt-8"><GlofoxEmbed src={glofox.memberships} title="All In Health & Wellness memberships and packages" /></div>
        </div>
      </section>

      <CancellationNote />
      <BookingCTA />
    </>
  );
}
