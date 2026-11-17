# All In Wellness

Create a responsive website redesign for All In Health & Wellness, a Pilates and wellness studio in Babylon, New York. The goal is to turn local interest into intro-offer bookings and help existing members find classes, packages and memberships.

Use https://allinhealth.net/home-2/ as the visual reference. Recreate its welcoming editorial feel with real studio photography, an indigo photo overlay, Fraunces serif headlines, restrained italic emphasis, Karla body/UI text, rounded cards, pill buttons, soft mint/sky/periwinkle accents, circular double-ring stamps and a deep navy footer.

Apply these exact starting tokens:
ink #212B33
soft ink #5B6670
deep navy #232C48
paper #FCFDFC
mint #BDEEE6
sky #CBE0F1
periwinkle #ADB2F6
deep periwinkle #6E75D9
deeper periwinkle #4F55B8
mint tint #ECFAF7
sky tint #F0F6FC
periwinkle tint #F0F1FD
border rgba(33,43,51,0.12)

Use #4F55B8 for filled buttons with small white labels. Keep lighter periwinkle as an accent. Validate contrast on the actual backgrounds.

Typography: Fraunces 500 for headings with 1.12 line height; Fraunces italic 400 for one short hero phrase; Karla 400 to 700 for body and UI, with 16px body base and approximately 1.65 line height. Use Caveat only for one short founder quote.

Layout: centered 1140px maximum container, 28px desktop gutters, approximately 84px vertical section spacing on desktop and 64px on mobile. Use 20px card radii, 22px banner radii, 999px button radii and subtle low-opacity shadows. Keep copy concise and sections easy to scan.

Hero: use the actual studio photo with this starting overlay:
linear-gradient(165deg, rgba(35,44,72,.78) 0%, rgba(79,85,184,.52) 55%, rgba(33,43,51,.68) 100%).
Include one H1 with the business, Reformer Pilates and Babylon clear in the opening content. Make the confirmed intro offer prominent: 3 classes for $99, used within 2 weeks. Primary button label: Book now. Secondary: Explore classes. Do not let an oversized hero bury the offer on mobile.

Build the homepage in this order:
1. Consistent header with logo, Classes, Pricing, Coaching, About, Contact and Book now.
2. Photo-led hero and intro offer.
3. Genuine Google review proof near the top.
4. Soft gradient benefit strip with double-ring circular stamps.
5. Photo-led class cards for Total Body Reformer and Interval Training.
6. Clearly separated intro offer, class packages, memberships and private sessions/evaluation.
7. Founder section for Dr. Judi Luttieri, with approved biography, photograph and credentials.
8. Coaching section focused on the 30-Day Reset.
9. Community stories, verified recognition and current events.
10. First-visit FAQ and studio location.
11. Final booking invitation and one navy footer.

Supporting routes:
- Classes & Schedule (/classes): class types, what to bring, and live Glofox timetable embed / direct booking links.
- Pricing & Memberships (/pricing): clear tiers for Intro Offer ($99 for 3 classes), Class Packages (10 for $430, 20 for $790, single class $45), Memberships (Wellness Starter 4x/mo at $160 or $140/yr, Signature 8x/mo at $300 or $270/yr, Elite 12x/mo at $360 or $330/yr), Private Reformer Sessions ($130 single, $336 3-pack), and PT Evaluation ($250). Connect each package to Glofox purchase flow.
- Coaching (/coaching): focused on the 30-Day Reset ($297). Keep the $99 add-on out of public pricing until approved.
- About Us (/about): Dr. Judi Luttieri's background, philosophy, studio story in Babylon, credentials.
- Contact (/contact): 1 Shore Road, Babylon, NY 11702, phone (631) 213-5115, email info@allinhealth.net, contact form, map, parking directions.

Glofox Integration for Booking, Scheduling and Payments:
- Connect to studio's Glofox branch ID: 6800273ac38efe7c330bf920
- Class scheduling & booking portal: https://app.glofox.com/portal/#/branch/6800273ac38efe7c330bf920/classes-week-view?header=classes (offer responsive iframe embed and direct new-tab booking links)
- Memberships & packages payment portal: https://app.glofox.com/portal/#/branch/6800273ac38efe7c330bf920/memberships?header=memberships
- Courses / special events: https://app.glofox.com/portal/#/branch/6800273ac38efe7c330bf920/courses

AEO and SEO Optimization:
- JSON-LD Structured Data: LocalBusiness, HealthAndBeautyBusiness, SportsActivityLocation, FAQPage schema, and Service schema with exact coordinates/address in Babylon, NY.
- Meta tags: Optimized titles, descriptions, canonical links, Open Graph and Twitter Card tags for Babylon Reformer Pilates and wellness keywords.
- AEO (Answer Engine Optimization): direct question-and-answer FAQ formatting for AI answer engines (ChatGPT Search, Perplexity, Gemini, Google AI Overviews) answering common questions about beginner reformer Pilates, pricing, location, parking, what to wear, and booking.
- Semantic HTML, single clear H1 per page, accessible contrast ratios, keyboard navigation, and fast load performance.

Assets:
- Confirmed logo: Use the attached All In Health and Wellness circular logo badge.
- Studio photos: Use real studio photos (AllinStudio3, allinhealth-86, allinhealth-73, beyourbestself-02).
- Source content: Reference the attached source content bank.

Return a polished working preview with reusable sections and clear integration with Glofox.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f029fe15-7458-4e81-9087-2b204d09fde8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
