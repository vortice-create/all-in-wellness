# Black Friday specials on pricing cards

The $79 intro offer and $299 30-Day Reset already match the flyer everywhere. Two card groups still show regular terms only:

1. **10-class and 20-class pack cards** (Pricing page + homepage pricing): add a highlighted line "Black Friday: get 3 classes free · ends 11/30". Prices stay $430 / $790.
2. **Membership cards** (Starter, Signature, Elite): add "Black Friday: pay annually, get your 12th month free · ends 11/30" next to the annual price. Prices unchanged.
3. **Referral**: add a small note near the pricing cards: "Refer a friend — get 1 free class and a raffle entry" linking to Contact.

Not changed: single class, privates, PT eval (no special on the flyer).

## Technical details
- Add an optional `promo` field to pack/membership data in `src/lib/site.ts` (and content defaults so the admin dashboard keeps working), render it as a periwinkle badge in `PriceCard` and the membership card.
- Keep promo text in one place so it can be removed after 11/30.
- Run pricing test and axe check after.
