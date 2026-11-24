import { introOffer, packages, memberships, privates, coachingReset, cancellationPolicy, instructors, classes, faqs, reviews } from "@/lib/site";

// Bundled defaults; anything saved from /admin into public.site_content overrides a key.
export const defaultContent = {
  announcement: { enabled: false, text: "", link: "" },
  introOffer,
  packages,
  memberships: memberships as { name: string; freq: string; monthly: string; annual: string; href: string; featured?: boolean }[],
  privates,
  coachingReset,
  cancellationPolicy: { text: cancellationPolicy },
  instructors,
  classes,
  faqs,
  reviews,
};
export type SiteContent = typeof defaultContent;
export type ContentKey = keyof SiteContent;

export function mergeContent(rows: Record<string, unknown>): SiteContent {
  const out = { ...defaultContent } as Record<string, unknown>;
  for (const k of Object.keys(defaultContent)) if (rows[k] != null) out[k] = rows[k];
  return out as SiteContent;
}
