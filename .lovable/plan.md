# Make the site accessible (WCAG 2.1 AA)

Goal: meet WCAG 2.1 Level AA, the standard US courts and the ADA reference for websites. Note: there is no official "ADA certificate" — the site can be built and tested to AA, and you can publish an accessibility statement.

## What's already in good shape
- Page language set, one main area per page, labeled menus, menu button labeled, map frames titled, most photos described.

## Fixes
1. **Skip to content link** — first thing keyboard/screen-reader users reach, jumps past the menu.
2. **Visible focus outlines** on every link, button and form field (consistent periwinkle ring), including the contact form fields.
3. **Contact form** — confirm every field has a visible label, required fields announced, errors read aloud and linked to their field, success message announced.
4. **Mobile menu** — closes with Escape, returns focus to the menu button; tap targets at least 44px.
5. **Color contrast** — check every text/background pair (soft gray text, white text on photo overlay, labels on mint/sky tints, gradient booking card) and darken any that fall below AA.
6. **Star ratings and icons** — stars read as "5 out of 5 stars"; decorative icons hidden from screen readers; icon-only links (Instagram, Facebook) labeled.
7. **Instagram tiles** — each tile gets a meaningful description from the post caption and says it opens Instagram.
8. **Links opening new tabs** (Glofox, Google, Truemed, social) — announce "opens in new tab".
9. **Booking calendar frame** (Glofox) — titled, plus a plain "Open the schedule in a new tab" link, since the third-party calendar itself may not be fully accessible.
10. **Reduced motion** — turn off photo zoom/animations for visitors who request it.
11. **Headings** — check each page flows in order with no skipped levels.
12. **Accessibility statement page** (/accessibility) linked in the footer, with phone and email for anyone who needs help booking.

## Verification
- Run an automated accessibility checker (axe) on all 7 pages and fix everything it reports.
- Keyboard-only walkthrough: menu, booking buttons, contact form.
- Report anything outside our control (Glofox calendar, Google map, Instagram images).

## Technical details
- Skip link + `focus-visible` ring utility in styles.css/__root; `prefers-reduced-motion` rule.
- Contact form: `aria-invalid`, `aria-describedby`, `role="status"`/`aria-live` for results.
- Header: Escape handler and focus return.
- Shared `ExternalLink` helper adding sr-only "(opens in new tab)".
- axe-core via Playwright script in /tmp across all routes.
