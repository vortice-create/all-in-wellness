# Meet Your Instructors: Sabrina and Diana

## What you'll see
A new "Meet your instructors" section with two cards, one each for Diana and Sabrina. Each card has:
- Their uploaded photo, shown as a rounded portrait
- Their name and class style: "Contemporary Pilates Reformer" (Diana) and "Foundational Pilates" (Sabrina)
- A short description of the class style, then a short bio paragraph, using your wording exactly
- A "Book a class" button that opens the Glofox schedule

## Where it goes
- **Homepage:** right after "Meet the Founder", before the Google reviews, so the whole teaching team appears together.
- **About page:** the same section below Dr. Judi's story.

## Style
It uses the existing look: Fraunces headings, rounded 20px cards on a soft mint/sky background, pill buttons, and the deep periwinkle accent for the class-style label. On phones the cards stack.

## Technical details
- Upload both photos as hosted image files. If you need them to show on your Vercel copy of the site, I can bundle them into the code instead.
- Add an `instructors` list (name, style, description, bio, photo, alt text) to `src/lib/site.ts`.
- Add a reusable `InstructorGrid` section to `src/components/site/ui.tsx`, and use it in `src/routes/index.tsx` and `src/routes/about.tsx`.
- Use semantic `article` cards with descriptive alt text. The pages keep one H1 each; instructor names are H3s under one H2 for the section.
