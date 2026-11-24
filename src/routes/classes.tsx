import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero, PillLink, SectionHead, GlofoxEmbed, CancellationNote, BookingCTA } from "@/components/site/ui";
import { useContent } from "@/hooks/use-content";
import { classes, glofox, photos, ld, pageHead, serviceJsonLd } from "@/lib/site";

export const Route = createFileRoute("/classes")({
  head: () =>
    pageHead({
      title: "Reformer Pilates & Interval Classes Schedule | Babylon, NY",
      description: "See the live class schedule for Total Body Reformer and Interval Training at All In Health & Wellness in Babylon, NY, and book online.",
      path: "/classes",
      image: photos.share,
      scripts: classes.map((c) => ld(serviceJsonLd(c.name, c.body))),
    }),
  component: ClassesPage,
});

const bring = ["Comfortable, fitted workout clothes", "A water bottle", "Arrive 10 minutes early for your first class", "Tell your instructor about any injuries"];

function ClassesPage() {
  const { classes } = useContent();
  return (
    <>
      <PageHero eyebrow="Classes & schedule" title={<>Classes for <em className="font-normal italic">every</em> body</>} intro="Small-group Reformer Pilates and Interval Training in Babylon. Pick a time below and book in a few taps." img={photos.reformer}>
        <PillLink href={glofox.schedule} variant="light">Book a class</PillLink>
        <PillLink href="/pricing" variant="ghostLight">See pricing</PillLink>
      </PageHero>

      <section className="section-y">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {classes.map((c) => (
            <article key={c.name} className="overflow-hidden rounded-[20px] border bg-card shadow-soft">
              <img src={c.img} alt={c.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl">{c.name}</h2>
                <p className="mt-3 text-muted-foreground">{c.body}</p>
                <PillLink href={glofox.schedule} className="mt-5">Book {c.name}</PillLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-[84px]">
        <div className="container-site">
          <div className="soft-gradient rounded-[22px] p-8 md:p-12">
            <h2 className="text-3xl">What to bring</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {bring.map((b) => <li key={b} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="schedule" className="section-y bg-sky-tint">
        <div className="container-site">
          <SectionHead eyebrow="Live timetable" title="This week's schedule" intro="If the schedule doesn't load, open it in a new tab to book directly." />
          <div className="mt-8"><GlofoxEmbed src={glofox.schedule} title="All In Health & Wellness weekly class schedule" /></div>
        </div>
      </section>

      <CancellationNote />
      <BookingCTA />
    </>
  );
}
