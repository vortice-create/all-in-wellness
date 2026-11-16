import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageHero, PillLink, FaqList } from "@/components/site/ui";
import { photos, studio, faqs, businessJsonLd, ld, pageHead } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(120),
  email: z.string().trim().email("Please add a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  interest: z.string().max(60).optional(),
  message: z.string().trim().min(1, "Please add a message").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact & Directions | All In Health & Wellness, Babylon NY",
      description: "Visit All In Health & Wellness at 1 Shore Road, Babylon, NY 11702. Call (631) 213-5115 or send a message about classes, pricing or coaching.",
      path: "/contact",
      image: photos.share,
      scripts: [ld(businessJsonLd())],
    }),
  component: ContactPage,
});

const field = "mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    const parsed = schema.safeParse({ name: get("name"), email: get("email"), message: get("message"), phone: get("phone") || undefined, interest: get("interest") || undefined });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_submissions").insert(parsed.data as never);
    setSending(false);
    if (error) {
      toast.error("Sorry, that didn't send. Please call or email us.");
      return;
    }
    form.reset();
    setSent(true);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Come say <em className="font-normal italic">hello</em></>} intro="Questions about your first class, pricing or coaching? We'll get back to you within 24 hours." img={photos.studio} />

      <section className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[20px] border bg-card p-6 shadow-soft md:p-8">
            <h2 className="text-2xl">Send a message</h2>
            {sent ? (
              <p role="status" className="mt-6 rounded-xl bg-mint-tint p-5">Thanks! Your message is in. We'll be in touch within 24 hours.</p>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
                <label className="text-sm font-semibold">Name<input name="name" required maxLength={120} autoComplete="name" className={field} /></label>
                <label className="text-sm font-semibold">Email<input name="email" type="email" required maxLength={255} autoComplete="email" className={field} /></label>
                <label className="text-sm font-semibold">Phone (optional)<input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} /></label>
                <label className="text-sm font-semibold">I'm interested in
                  <select name="interest" className={field} defaultValue="Intro offer">
                    {["Intro offer", "Classes", "Packages & memberships", "Private sessions", "PT evaluation", "30-Day Reset", "Other"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </label>
                <label className="text-sm font-semibold sm:col-span-2">Message<textarea name="message" required maxLength={2000} rows={5} className={field} /></label>
                <button type="submit" disabled={sending} className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-navy disabled:opacity-60 sm:w-fit">{sending ? "Sending…" : "Send message"}</button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[20px] bg-sky-tint p-6">
              <h2 className="text-2xl">Studio details</h2>
              <address className="mt-4 space-y-3 not-italic">
                <p className="flex gap-3"><MapPin className="mt-1 size-5 shrink-0 text-primary" aria-hidden />{studio.street}, {studio.city}, {studio.region} {studio.postal}</p>
                <p><a href={studio.phoneHref} className="flex gap-3 hover:text-primary"><Phone className="mt-1 size-5 text-primary" aria-hidden />{studio.phone}</a></p>
                <p><a href={`mailto:${studio.email}`} className="flex gap-3 hover:text-primary"><Mail className="mt-1 size-5 text-primary" aria-hidden />{studio.email}</a></p>
              </address>
            </div>
            <div className="rounded-[20px] bg-mint-tint p-6">
              <h2 className="flex items-center gap-2 text-2xl"><Car className="size-6 text-primary" aria-hidden />Parking</h2>
              <p className="mt-3 text-muted-foreground">{faqs[3]?.a}</p>
            </div>
            <iframe title="Map to All In Health & Wellness, 1 Shore Road, Babylon" src={studio.mapEmbed} loading="lazy" className="aspect-[4/3] w-full rounded-[20px] border-0" />
            <PillLink href={studio.mapsDirections} variant="outline" className="w-full">Get directions</PillLink>
          </aside>
        </div>
      </section>

      <section className="section-y bg-peri-tint">
        <div className="container-site max-w-3xl">
          <h2 className="text-3xl">First-visit FAQ</h2>
          <div className="mt-8"><FaqList /></div>
        </div>
      </section>
    </>
  );
}
