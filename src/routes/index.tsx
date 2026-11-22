import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { CalendarDays, Instagram, Award, MapPin, Phone } from "lucide-react";
import { PillLink, Stamp, SectionHead, PriceCard, FaqList, BookingCTA, ReviewGrid, InstagramGrid, InstructorSection } from "@/components/site/ui";
import truemedLogo from "@/assets/truemed-logo.png";
import { classes, glofox, introOffer, packages, memberships, privates, photos, studio, businessJsonLd, faqJsonLd, fetchInstagram, ld, pageHead } from "@/lib/site";

const igQuery = queryOptions({ queryKey: ["instagram"], queryFn: fetchInstagram, staleTime: 60 * 60_000 });

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Reformer Pilates in Babylon, NY | All In Health & Wellness",
      description: "Reformer Pilates and interval training in Babylon, NY, led by Dr. Judi Luttieri, DPT. New clients: 3 classes for $99. Book online today.",
      path: "/",
      image: photos.share,
      scripts: [ld(businessJsonLd()), ld(faqJsonLd())],
    }),
  loader: ({ context }) => { context.queryClient.prefetchQuery(igQuery); },
  component: Home,
});

function Home() {
  const { data: igPosts } = useSuspenseQuery(igQuery);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
        <img src={photos.studio} alt="Reformer studio at All In Health & Wellness in Babylon, NY" className="absolute inset-0 -z-20 size-full object-cover" fetchPriority="high" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="container-site grid items-end gap-8 py-12 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <p className="eyebrow text-mint">Babylon, New York</p>
            <h1 className="mt-3 text-[2.3rem] md:text-6xl">
              All In Health &amp; Wellness: Reformer Pilates in Babylon, <em className="font-normal italic">built around you.</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-navy-foreground/90">Small-group Reformer and interval classes led by Dr. Judi Luttieri, a Doctor of Physical Therapy. Every level welcome.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PillLink href={glofox.memberships} variant="light">Book now</PillLink>
              <PillLink href="/classes" variant="ghostLight">Explore classes</PillLink>
            </div>
          </div>
          <aside aria-label="Intro offer" className="rounded-[20px] bg-background p-6 text-foreground shadow-soft">
            <p className="eyebrow text-primary">New client intro offer</p>
            <p className="mt-2 font-serif text-5xl text-navy">$99</p>
            <p className="mt-1 font-semibold">3 classes, used within 2 weeks</p>
            <p className="mt-2 text-sm text-muted-foreground">Try Total Body Reformer and Interval Training before you commit.</p>
            <PillLink href={glofox.memberships} className="mt-5 w-full">Claim intro offer</PillLink>
          </aside>
        </div>
      </section>

      {/* Benefit strip */}
      <section className="section-y">
        <div className="container-site">
          <div className="soft-gradient rounded-[22px] px-6 py-12 md:px-12">
            <SectionHead center eyebrow="Why All In" title={<>Movement with a <em className="font-normal italic">clinical</em> eye</>} />
            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
              <Stamp label="DPT-led" sub="Classes shaped by a Doctor of Physical Therapy" tone="mint" />
              <Stamp label="All levels" sub="Beginner-friendly with personal modifications" tone="sky" />
              <Stamp label="Small groups" sub="Attention on your form, every session" tone="peri" />
              <Stamp label="Mind + body" sub="Strength, breath, habits and mindset together" tone="mint" />
            </div>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="section-y pt-0">
        <div className="container-site">
          <SectionHead eyebrow="Classes" title="Find your class" intro="Two ways to move, both open to every fitness level." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {classes.map((c) => (
              <article key={c.name} className="overflow-hidden rounded-[20px] border bg-card shadow-soft">
                <img src={c.img} alt={c.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="mt-3 text-muted-foreground">{c.body}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <PillLink href={glofox.schedule}>Book this class</PillLink>
                    <PillLink href="/classes" variant="outline">Class details</PillLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing overview */}
      <section className="section-y bg-peri-tint">
        <div className="container-site">
          <SectionHead eyebrow="Pricing" title="Ways to join" intro="Start with the intro offer, then choose what fits your week." />
          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            <PriceCard plan={introOffer} tone="bg-mint-tint" />
            <article className="rounded-[20px] border bg-card p-6 shadow-soft">
              <h3 className="text-xl">Class packages</h3>
              <ul className="mt-4 space-y-2 text-sm">{packages.map((p) => <li key={p.name} className="flex justify-between gap-2"><span>{p.name}</span><strong>{p.price}</strong></li>)}</ul>
              <PillLink href="/pricing#packages" variant="outline" className="mt-6 w-full">View packages</PillLink>
            </article>
            <article className="rounded-[20px] border bg-card p-6 shadow-soft">
              <h3 className="text-xl">Memberships</h3>
              <ul className="mt-4 space-y-2 text-sm">{memberships.map((m) => <li key={m.name} className="flex justify-between gap-2"><span>{m.name}</span><strong>from {m.annual}/mo</strong></li>)}</ul>
              <PillLink href="/pricing#memberships" variant="outline" className="mt-6 w-full">View memberships</PillLink>
            </article>
            <article className="rounded-[20px] border bg-card p-6 shadow-soft">
              <h3 className="text-xl">Private &amp; evaluation</h3>
              <ul className="mt-4 space-y-2 text-sm">{privates.map((p) => <li key={p.name} className="flex justify-between gap-2"><span>{p.name}</span><strong>{p.price}</strong></li>)}</ul>
              <PillLink href="/pricing#private" variant="outline" className="mt-6 w-full">View private sessions</PillLink>
            </article>
          </div>
        </div>
      </section>

      {/* HSA/FSA via Truemed */}
      <section aria-labelledby="hsa-fsa" className="section-y pt-0">
        <div className="container-site">
          <div className="flex flex-col items-start gap-6 rounded-[22px] border bg-card p-8 shadow-soft md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <img src={truemedLogo} alt="Truemed" loading="lazy" width={173} height={80} className="h-12 w-auto" />
              <h2 id="hsa-fsa" className="mt-4 text-3xl md:text-4xl">Use your <em className="font-normal italic">HSA/FSA</em> funds</h2>
              <p className="mt-3 text-muted-foreground">Members keep paying as usual, and now you can use pre-tax HSA/FSA funds to cover it.</p>
            </div>
            <PillLink href="https://app.truemed.com/qualify/tm_qual_bqqq7pf5zs" className="shrink-0">Check if you qualify</PillLink>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-y">
        <div className="container-site grid items-center gap-10 md:grid-cols-2">
          <img src={photos.judi} alt="Dr. Judi Luttieri, founder of All In Health & Wellness" loading="lazy" className="aspect-[4/3] w-full rounded-[22px] object-cover shadow-soft" />
          <div>
            <SectionHead eyebrow="Meet the founder" title="Dr. Judi Luttieri, DPT" />
            <p className="mt-4 text-muted-foreground">A formally trained dancer turned Doctor of Physical Therapy, Judi has spent decades helping bodies move better. She founded All In to bring clinical insight, Pilates and coaching into one welcoming Babylon studio.</p>
            <p className="mt-5 font-script text-3xl text-primary">"The body never lies."</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              {["Doctor of Physical Therapy", "Certified Health & Life Coach", "Functional Nutrition", "Menopause certification", "Fall Prevention Specialist"].map((c) => <li key={c} className="rounded-full bg-sky-tint px-3 py-1 font-semibold">{c}</li>)}
            </ul>
            <PillLink href="/about" variant="outline" className="mt-6">Read Judi's story</PillLink>
          </div>
        </div>
      </section>

      <InstructorSection />

      {/* Review proof */}
      <section aria-labelledby="reviews" className="section-y bg-sky-tint">
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <SectionHead eyebrow="Google reviews" title="What members are saying" intro="Real reviews from clients across Babylon and the South Shore." />
            <PillLink href={studio.googleReviews} variant="outline" className="shrink-0 py-2">Read all reviews on Google</PillLink>
          </div>
          <div className="mt-10"><ReviewGrid /></div>
        </div>
      </section>

      {/* Coaching */}
      <section className="section-y pt-0">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-[22px] bg-mint-tint md:grid-cols-2">
            <img src={photos.coaching} alt="Be your best self coaching at All In Health & Wellness" loading="lazy" className="h-full min-h-64 w-full object-cover" />
            <div className="p-8 md:p-12">
              <p className="eyebrow text-primary">Crack the Code Coaching</p>
              <h2 className="mt-2 text-3xl md:text-4xl">The 30-Day Reset</h2>
              <p className="mt-3 font-serif text-3xl text-navy">$297</p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">Starts the 1st of each month</p>
              <p className="mt-4 text-muted-foreground">Lower inflammation, rebuild better habits and get your stress response under control, with weekly virtual coaching and daily action steps.</p>
              <PillLink href="/coaching" className="mt-6">Explore the Reset</PillLink>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <section className="section-y" aria-labelledby="ig-title">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">On Instagram</p>
              <h2 id="ig-title" className="mt-2 text-3xl md:text-4xl">@{studio.instagramHandle}</h2>
            </div>
            <PillLink href={studio.instagram}>Follow us</PillLink>
          </div>
          <div className="mt-8"><InstagramGrid posts={igPosts} /></div>
        </div>
      </section>

      {/* Community, recognition, events */}
      <section className="section-y bg-sky-tint">
        <div className="container-site">
          <SectionHead eyebrow="Community" title="Stories, recognition & events" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-[20px] border bg-card p-6">
              <Instagram className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 text-xl">From the studio</h3>
              <p className="mt-2 text-muted-foreground">Try Reformer Pilates, Jumpboard or Interval Training with Sabrina, Sara and Judi. Each instructor has a unique style.</p>
              <PillLink href={studio.instagram} variant="outline" className="mt-5">Follow on Instagram</PillLink>
            </article>
            <article className="rounded-[20px] border bg-card p-6">
              <Award className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 text-xl">Recognition</h3>
              <p className="mt-2 text-muted-foreground">Judi was Lead Instructor and Choreographer for Redbook Magazine fitness videos and Director of Fitness at the Vertical Club, NY.</p>
              <PillLink href="/about" variant="outline" className="mt-5">See her timeline</PillLink>
            </article>
            <article className="rounded-[20px] border bg-card p-6">
              <CalendarDays className="size-6 text-primary" aria-hidden />
              <h3 className="mt-3 text-xl">Upcoming events</h3>
              <p className="mt-2 text-muted-foreground">Workshops and special courses are posted live in our booking portal.</p>
              <PillLink href={glofox.courses} variant="outline" className="mt-5">View current events</PillLink>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ + location */}
      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="First visit" title="Questions, answered" />
            <div className="mt-8"><FaqList /></div>
          </div>
          <aside className="h-fit rounded-[20px] border bg-card p-6 shadow-soft">
            <h2 className="text-2xl">Visit the studio</h2>
            <address className="mt-4 space-y-2 not-italic text-muted-foreground">
              <p className="flex gap-2"><MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden />{studio.street}, {studio.city}, {studio.region} {studio.postal}</p>
              <p><a href={studio.phoneHref} className="flex gap-2 hover:text-primary"><Phone className="mt-1 size-4 text-primary" aria-hidden />{studio.phone}</a></p>
            </address>
            <iframe title="Map to All In Health & Wellness" src={studio.mapEmbed} loading="lazy" className="mt-5 aspect-[4/3] w-full rounded-[16px] border-0" />
            <PillLink href={studio.mapsDirections} variant="outline" className="mt-5 w-full">Get directions</PillLink>
          </aside>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
