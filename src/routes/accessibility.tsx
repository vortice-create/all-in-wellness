import { createFileRoute } from "@tanstack/react-router";
import { pageHead, photos, studio } from "@/lib/site";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    pageHead({
      title: "Accessibility Statement | All In Health & Wellness",
      description: "Our commitment to an accessible website for everyone, and how to reach All In Health & Wellness in Babylon, NY if you need help booking.",
      path: "/accessibility",
      image: photos.share,
    }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <section className="section-y">
      <div className="container-site max-w-3xl space-y-5">
        <h1 className="text-4xl md:text-5xl">Accessibility statement</h1>
        <p>All In Health &amp; Wellness wants everyone to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.</p>
        <h2 className="pt-4 text-2xl">What we do</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Every page works with a keyboard and screen readers.</li>
          <li>Text meets color-contrast standards, and photos have descriptions.</li>
          <li>Form fields are labeled, and errors are announced.</li>
          <li>Animations are turned off if your device asks for reduced motion.</li>
        </ul>
        <h2 className="pt-4 text-2xl">Third-party tools</h2>
        <p>Class booking runs on Glofox, and maps come from Google. We don’t control these tools. If one gives you trouble, contact us and we’ll book for you.</p>
        <h2 className="pt-4 text-2xl">Need help?</h2>
        <p>Call <a className="font-semibold text-primary underline" href={studio.phoneHref}>{studio.phone}</a> or email <a className="font-semibold text-primary underline" href={`mailto:${studio.email}`}>{studio.email}</a>. We’ll help you book or get the information you need, and we welcome feedback on this site.</p>
      </div>
    </section>
  );
}
