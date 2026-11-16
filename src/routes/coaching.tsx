import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero, PillLink, SectionHead, BookingCTA } from "@/components/site/ui";
import { glofox, photos, studio, ld, pageHead, serviceJsonLd } from "@/lib/site";

const includes = [
  "Reduce inflammation & understand your sugar/salt habit",
  "Stress management strategies",
  "Good habit formation",
  "Weekly emails with meal guidance & prep",
  "Weekly virtual coaching, with replays",
  "Daily action steps & check-ins",
  "Exercise prescriptions built around you",
];

export const Route = createFileRoute("/coaching")({
  head: () =>
    pageHead({
      title: "30-Day Reset Health Coaching | Dr. Judi Luttieri, Babylon NY",
      description: "The 30-Day Reset ($297) with Dr. Judi Luttieri, DPT: lower inflammation, build better habits and manage stress. Starts the 1st of each month.",
      path: "/coaching",
      image: photos.share,
      scripts: [ld(serviceJsonLd("30-Day Reset coaching program", "A month-long coaching program to lower inflammation, build habits and manage stress.", "$297"))],
    }),
  component: CoachingPage,
});

function CoachingPage() {
  return (
    <>
      <PageHero eyebrow="Crack the Code Coaching" title={<>Stop suppressing <em className="font-normal italic">the signal.</em></>} intro="Coaching that brings you back to listening to your body. It's time to quiet the diet noise for good." img={photos.coaching}>
        <PillLink href={glofox.memberships} variant="light">Start the Reset</PillLink>
        <PillLink href={`mailto:${studio.email}?subject=30-Day%20Reset%20consultation`} variant="ghostLight">Ask about a consultation</PillLink>
      </PageHero>

      <section className="section-y">
        <div className="container-site grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead eyebrow="Program" title="The 30-Day Reset" intro="A focused reset that lowers inflammation, rebuilds better habits and gets your stress response back under control. Proof you can follow through, and the framework for whatever comes next." />
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[["DPT", "Doctor of PT"], ["28", "Years in practice"], ["CHC", "Health & Life Coach"]].map(([a, b]) => (
                <div key={a} className="rounded-[20px] bg-sky-tint p-4"><p className="font-serif text-3xl text-navy">{a}</p><p className="text-xs font-semibold text-muted-foreground">{b}</p></div>
              ))}
            </div>
          </div>
          <article className="rounded-[20px] border bg-mint-tint p-8 shadow-soft">
            <p className="font-serif text-5xl text-navy">$297</p>
            <p className="mt-1 font-semibold text-muted-foreground">Starts the 1st of each month</p>
            <h3 className="mt-6 text-xl">What's included</h3>
            <ul className="mt-4 space-y-3">{includes.map((i) => <li key={i} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />{i}</li>)}</ul>
            <PillLink href={glofox.memberships} className="mt-8 w-full">Start the Reset</PillLink>
          </article>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
