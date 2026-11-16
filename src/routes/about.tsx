import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PillLink, SectionHead, BookingCTA } from "@/components/site/ui";
import { photos, ld, pageHead, studio } from "@/lib/site";

const timeline = [
  ["1984–1987", "Alvin Ailey Certificate Program", "A prestigious dance program that laid the foundation for her career in movement."],
  ["1985–1990", "Model & Director of Fitness", "Capezio model, certified fitness and classic Pilates instructor, and Director of Fitness at the Vertical Club, NY."],
  ["1990–1995", "Redbook Magazine", "Lead Instructor and Choreographer for multiple Redbook fitness videos."],
  ["1997", "Master's in Physical Therapy", "Licensed Physical Therapist in orthopedic, pediatric and adult care."],
  ["2006", "Doctorate of Physical Therapy", "Becomes Dr. Judi Luttieri, DPT."],
  ["2008", "Trained Clinical Nutritionist", "Integrates nutrition into a holistic approach to health."],
  ["2022", "Certified Health & Life Coach", "Guides clients through lasting health and lifestyle change."],
  ["2023", "Fall Prevention Specialist", "Certified to enhance safety and mobility."],
];

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Dr. Judi Luttieri, DPT | All In Health & Wellness Babylon",
      description: "Meet Dr. Judi Luttieri, Doctor of Physical Therapy and founder of All In Health & Wellness, a Reformer Pilates and wellness studio in Babylon, NY.",
      path: "/about",
      image: photos.share,
      scripts: [ld({ "@context": "https://schema.org", "@type": "Person", name: "Dr. Judi Luttieri", jobTitle: "Doctor of Physical Therapy, Owner & Founder", worksFor: { "@type": "LocalBusiness", name: studio.name } })],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>The mind–body <em className="font-normal italic">connection</em></>} intro="Empowering your journey to optimal health through personalized fitness and support, right here in Babylon." img={photos.interval} />

      <section className="section-y">
        <div className="container-site grid items-center gap-10 md:grid-cols-2">
          <img src={photos.judi} alt="Dr. Judi Luttieri in the All In studio" className="aspect-[4/3] w-full rounded-[22px] object-cover shadow-soft" />
          <div>
            <SectionHead eyebrow="Meet Judi" title="Dr. Judi Luttieri, DPT" />
            <p className="mt-2 text-sm font-semibold text-primary">Owner & Founder · Certified Health and Life Coach · Functional Nutrition · Menopause certification · Fall Prevention Specialist</p>
            <p className="mt-4 text-muted-foreground">My journey began as a formally trained dancer and fitness instructor, with a strong foundation in Pilates, where I developed a profound appreciation for the body and its incredible potential. That ignited my passion for physical therapy and a commitment to fast-tracking results through hands-on expertise.</p>
            <p className="mt-4 text-muted-foreground">My mission is to create transformation through the mind–body connection, allowing the body's innate wisdom to guide the healing process.</p>
            <p className="mt-5 font-script text-3xl text-primary">"The body never lies."</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-sky-tint">
        <div className="container-site grid gap-10 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Our studio" title="A studio of her own in Babylon" />
            <p className="mt-4 text-muted-foreground">After years in clinical practice, Judi trained as a health and life coach and saw how powerfully the two fields combine. She opened All In Health &amp; Wellness Pilates &amp; TRX Studio as a supportive, no-judgment space where every class is tailored to your needs, whether you're here to heal, strengthen or grow.</p>
            <PillLink href="/classes" className="mt-6">Explore classes</PillLink>
          </div>
          <ol className="relative space-y-6 border-l-2 border-peri pl-6">
            {timeline.map(([y, t, d]) => (
              <li key={t}>
                <span aria-hidden className="absolute -left-[9px] mt-1.5 size-4 rounded-full border-2 border-background bg-primary" />
                <p className="eyebrow text-primary">{y}</p>
                <h3 className="text-lg">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
