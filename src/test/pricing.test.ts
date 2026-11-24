import { describe, it, expect } from "vitest";
import { introOffer, packages, memberships, privates, coachingReset, glofox, cancellationPolicy } from "@/lib/site";

describe("published prices", () => {
  it("intro offer is 3 classes for $99 within 2 weeks", () => {
    expect(introOffer.price).toBe("$99");
    expect(introOffer.note).toContain("3 classes");
    expect(introOffer.note).toContain("2 weeks");
  });
  it("class packages", () => {
    expect(packages.map((p) => p.price)).toEqual(["$45", "$430", "$790"]);
  });
  it("memberships monthly / annual", () => {
    expect(memberships.map((m) => [m.monthly, m.annual])).toEqual([["$160", "$140"], ["$300", "$270"], ["$360", "$330"]]);
  });
  it("30-Day Reset coaching is $299", () => {
    expect(coachingReset.price).toBe("$299");
    expect(coachingReset.note).toContain("1st of each month");
    expect(coachingReset.href).toContain("6800273ac38efe7c330bf920");
  });
  it("private sessions and evaluation", () => {
    expect(privates.map((p) => p.price)).toEqual(["$130", "$336", "$250"]);
  });
  it("cancellation policy: 5 hours notice, $20 fee, credit lost", () => {
    expect(cancellationPolicy).toContain("5 hours");
    expect(cancellationPolicy).toContain("$20");
    expect(cancellationPolicy).toContain("lose the credit");
  });
  it("purchases go to the studio's Glofox branch", () => {
    for (const p of [introOffer, ...packages, ...privates, ...memberships]) expect(p.href).toContain("6800273ac38efe7c330bf920");
    expect(glofox.schedule).toContain("classes-week-view");
  });
});
