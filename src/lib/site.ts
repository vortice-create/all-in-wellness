import dianaPhoto from "@/assets/diana.jpg";
import sabrinaPhoto from "@/assets/sabrina.jpg";
import reformerPhoto from "@/assets/total-body-reformer.jpg";
const BRANCH = "6800273ac38efe7c330bf920";
const PORTAL = `https://app.glofox.com/portal/#/branch/${BRANCH}`;

export const glofox = {
  branchId: BRANCH,
  schedule: `${PORTAL}/classes-week-view?header=classes`,
  memberships: `${PORTAL}/memberships?header=memberships`,
  courses: `${PORTAL}/courses`,
};

export const studio = {
  name: "All In Health & Wellness",
  street: "1 Shore Road",
  city: "Babylon",
  region: "NY",
  postal: "11702",
  phone: "(631) 213-5115",
  phoneHref: "tel:+16312135115",
  email: "info@allinhealth.net",
  instagram: "https://www.instagram.com/allinhealthnwellness/",
  instagramHandle: "allinhealthnwellness",
  // Paste the Behold JSON feed link here (https://feeds.behold.so/...). Empty = show the follow card.
  instagramFeed: "https://feeds.behold.so/SiRE3iDTEND1BqVjm9nA",
  facebook: "https://www.facebook.com/allinhealthmindandbody",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=All+In+Health+%26+Wellness+1+Shore+Road+Babylon+NY",
  mapsDirections: "https://www.google.com/maps/dir/?api=1&destination=1+Shore+Road+Babylon+NY+11702",
  mapEmbed: "https://www.google.com/maps?q=1+Shore+Road,+Babylon,+NY+11702&output=embed",
  // Approximate — confirm exact coordinates with the studio.
  geo: { lat: 40.6933, lng: -73.3257 },
};

const wp = (path: string, w = 1400) => `https://i0.wp.com/allinhealth.net/wp-content/uploads/${path}?w=${w}&ssl=1`;
export const photos = {
  studio: wp("2025/01/AllinStudio3.jpg", 1800),
  reformer: reformerPhoto,
  interval: wp("2024/08/allinhealth-73-scaled.jpg"),
  coaching: wp("2025/02/beyourbestself-02.jpg"),
  judi: wp("2024/08/allinhealth-38-scaled.jpg", 1100),
  share: "https://i0.wp.com/allinhealth.net/wp-content/uploads/2025/01/AllinStudio3.jpg?resize=1200%2C630&ssl=1",
};

export type Plan = { name: string; price: string; note: string; detail?: string; href: string; cta: string };

export const introOffer: Plan = { name: "Intro Offer", price: "$79", note: "3 classes · use within 2 weeks · offer ends 11/30", detail: "New clients only. Try Reformer and Interval classes.", href: glofox.memberships, cta: "Claim intro offer" };

export const packages: Plan[] = [
  { name: "Single class", price: "$45", note: "1 Reformer or Interval class", href: glofox.memberships, cta: "Buy single" },
  { name: "10-class pack", price: "$430", note: "$43 per class", href: glofox.memberships, cta: "Buy 10-pack" },
  { name: "20-class pack", price: "$790", note: "$39.50 per class · best value", href: glofox.memberships, cta: "Buy 20-pack" },
];

export const memberships = [
  { name: "Wellness Starter", freq: "4 classes / month", monthly: "$160", annual: "$140", href: glofox.memberships },
  { name: "Signature", freq: "8 classes / month", monthly: "$300", annual: "$270", href: glofox.memberships, featured: true },
  { name: "Elite", freq: "12 classes / month", monthly: "$360", annual: "$330", href: glofox.memberships },
];

export const privates: Plan[] = [
  { name: "Private Reformer", price: "$130", note: "One-on-one session", href: glofox.memberships, cta: "Book private" },
  { name: "Private 3-pack", price: "$336", note: "Three one-on-one sessions", href: glofox.memberships, cta: "Buy 3-pack" },
  { name: "PT Evaluation", price: "$250", note: "Assessment with Dr. Judi, DPT", href: glofox.memberships, cta: "Book evaluation" },
];

export const coachingReset: Plan = { name: "30-Day Reset", price: "$299", note: "Starts the 1st of each month", href: glofox.memberships, cta: "Start the Reset" };

export const cancellationPolicy = "Classes must be cancelled at least 5 hours before the start of class. Cancellations made within 5 hours of class are charged a $20 cancel fee and lose the credit for the class.";

export const classes = [
  { name: "Total Body Reformer", img: photos.reformer, alt: "Clients on Pilates Reformers at All In Health & Wellness in Babylon", body: "A full-body Reformer workout that strengthens, tones and stretches with controlled movement. Builds core strength, flexibility and balance. All levels welcome." },
  { name: "Interval Training", img: photos.interval, alt: "Interval training class in the All In studio", body: "High-energy rounds of cardio and strength that build endurance and muscle in a fun, fast-paced setting. Suitable for all fitness levels." },
];

export const reviews = [
  { quote: "I can't say enough good things about this studio!", name: "Katie R.", detail: "Welcomed from her very first class — the small-group instruction never feels generic." },
  { quote: "Hands down the best Pilates class I've ever taken.", name: "Bridgette Y.", detail: "Legs shaking ten minutes in — knowledgeable, friendly, and a real workout." },
];

export const faqs = [
  { q: "Is Reformer Pilates OK for complete beginners?", a: "Yes. Every class is taught for all levels, and instructors offer modifications. Led by Dr. Judi Luttieri, a Doctor of Physical Therapy, the studio is a supportive, no-judgment space for first-timers." },
  { q: "How much is the intro offer?", a: "New clients get 3 classes for $79, to be used within 2 weeks — offer ends 11/30. After that, single classes are $45, or choose a class pack or membership." },
  { q: "Where is the studio?", a: "All In Health & Wellness is at 1 Shore Road, Babylon, NY 11702. Call (631) 213-5115 if you need help finding us." },
  { q: "Where do I park?", a: "Call the studio at (631) 213-5115 before your first visit and we'll walk you through the best parking options near 1 Shore Road." },
  { q: "What should I wear and bring?", a: "Wear comfortable, fitted workout clothing you can move in, and bring a water bottle. Arrive about 10 minutes early for your first class so we can set you up on the Reformer." },
  { q: "How do I book a class?", a: "Book online through our Glofox schedule. Choose a class, sign in or create an account, and pay with your intro offer, pack or membership." },
  { q: "What is the cancellation policy?", a: cancellationPolicy },
];

export const nav = [
  { to: "/classes", label: "Classes" },
  { to: "/pricing", label: "Pricing" },
  { to: "/coaching", label: "Coaching" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const businessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation", "LocalBusiness"],
  name: studio.name,
  description: "Reformer Pilates, interval training, private sessions and wellness coaching in Babylon, NY, led by Dr. Judi Luttieri, DPT.",
  image: photos.share,
  telephone: "+1-631-213-5115",
  email: studio.email,
  priceRange: "$45–$360",
  address: { "@type": "PostalAddress", streetAddress: studio.street, addressLocality: studio.city, addressRegion: studio.region, postalCode: studio.postal, addressCountry: "US" },
  geo: { "@type": "GeoCoordinates", latitude: studio.geo.lat, longitude: studio.geo.lng },
  sameAs: [studio.instagram, studio.facebook],
  founder: { "@type": "Person", name: "Dr. Judi Luttieri", jobTitle: "Doctor of Physical Therapy, Owner & Founder" },
});

export const faqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceJsonLd = (name: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  areaServed: "Babylon, NY",
  provider: { "@type": "LocalBusiness", name: studio.name, address: `${studio.street}, ${studio.city}, ${studio.region} ${studio.postal}` },
  ...(price ? { offers: { "@type": "Offer", price: price.replace("$", ""), priceCurrency: "USD" } } : {}),
});

export const ld = (data: object) => ({ type: "application/ld+json", children: JSON.stringify(data) });

export const pageHead = (o: { title: string; description: string; path: string; image?: string; scripts?: object[] }) => ({
  meta: [
    { title: o.title },
    { name: "description", content: o.description },
    { property: "og:title", content: o.title },
    { property: "og:description", content: o.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: o.path },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: o.title },
    { name: "twitter:description", content: o.description },
    ...(o.image ? [{ property: "og:image", content: o.image }, { name: "twitter:image", content: o.image }] : []),
  ],
  links: [{ rel: "canonical", href: o.path }],
  scripts: o.scripts ?? [],
});

export type IgPost = { id: string; href: string; img: string; alt: string; video: boolean };
export async function fetchInstagram(): Promise<IgPost[]> {
  if (!studio.instagramFeed) return [];
  try {
    const r = await fetch(studio.instagramFeed);
    if (!r.ok) return [];
    const d = await r.json();
    const posts = (Array.isArray(d) ? d : d.posts ?? []) as any[];
    return posts.slice(0, 8).map((p) => ({
      id: String(p.id),
      href: String(p.permalink ?? studio.instagram),
      img: String(p.sizes?.medium?.mediaUrl ?? p.thumbnailUrl ?? p.mediaUrl ?? ""),
      alt: String(p.prunedCaption ?? p.caption ?? "Instagram post from All In Health & Wellness").slice(0, 140),
      video: p.mediaType === "VIDEO",
    })).filter((p) => p.img);
  } catch { return []; }
}

export const instructors = [
  { name: "Diana", style: "Contemporary Pilates Reformer", img: dianaPhoto, alt: "Diana, Contemporary Pilates Reformer instructor at All In Health & Wellness",
    description: "Contemporary Pilates Reformer blends the foundational principles of classical Pilates with modern movement techniques and exercise science.",
    bio: "A refined experience combining athletic movement, mindful control, and contemporary sequencing. Expect intentional transitions, challenging full-body flows, and a balance of strength, length, and endurance. Designed to challenge your body, elevate your energy, and leave you feeling strong, sculpted, and aligned." },
  { name: "Sabrina", style: "Foundational Pilates", img: sabrinaPhoto, alt: "Sabrina, Yoga and Foundational Pilates instructor at All In Health & Wellness",
    description: "Foundational Pilates focuses on the original principles and movement system developed by Joseph Pilates. It emphasizes core strength, posture, alignment, breath, stability, and mindful movement.",
    bio: "Sabrina is a Yoga and Pilates instructor, emphasizing the body-mind connection. All movement becomes more effective when we are connected through mind, body, and spirit. You will experience slow and precise exercises that challenge the entire body." },
];

/** Black Friday Week promo lines shown on pricing cards. Remove after 11/30. */
export const blackFridayPromo = {
  packNames: ["10-class pack", "20-class pack"],
  packs: "Black Friday: get 3 classes free · ends 11/30",
  annual: "Black Friday: pay annually, get your 12th month free · ends 11/30",
  referral: "Refer a friend — get 1 free class and a raffle entry · ends 11/30",
};
