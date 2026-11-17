# Fix the Instagram feed and add a Facebook link

## Why the posts are blank
Instagram now blocks other websites from showing a profile's posts unless the account owner signs in and approves it. That's why the box on the homepage comes up empty. The fix is to connect @allinhealthnwellness once through a free feed service called Behold (behold.so).

## What you'll do (about 2 minutes)
1. Go to behold.so and sign up for a free account.
2. Connect the @allinhealthnwellness Instagram account.
3. Create a "JSON" feed and copy its feed link. It looks like https://feeds.behold.so/xxxx.
4. Paste that link here in chat.

## What I'll build
- **Instagram section:** I'll replace the empty box with a grid of your 8 latest posts in rounded photo tiles that match the site's style. Each tile opens the post on Instagram. Videos get a small play icon. The "Follow us" button stays.
- **New posts:** these show up automatically within about an hour, with no work from you.
- **Backup look:** if the feed can't load, visitors see a "Follow us on Instagram" card instead of an empty box.
- **Footer:** I'll add a Facebook link to the "Visit" list, under Instagram: https://www.facebook.com/allinhealthmindandbody
- **Search engines:** Google will also see the Facebook page listed as one of the studio's official profiles.

## Technical details
- Add `facebook` to `studio` in `src/lib/site.ts`. Add it to `sameAs` in the business JSON-LD.
- Store the Behold feed link in `studio.instagramFeed`. It's a public, read-only link, not a secret.
- Fetch the feed in the homepage loader. Cache it with React Query for 1 hour, and treat any error as an empty list so the page still loads.
- Add an `InstagramGrid` component in `ui.tsx`. It shows 2 tiles per row on phones and 4 per row on desktop, with the backup card when the list is empty. Remove the iframe.
- Footer: add a Facebook icon link with `target="_blank"` and `rel="noopener noreferrer"`.
