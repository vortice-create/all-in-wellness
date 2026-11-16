import { describe, it, expect } from "vitest";
import { introOffer, packages, memberships, privates, glofox } from "@/lib/site";

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
  it("private sessions and evaluation", () => {
    expect(privates.map((p) => p.price)).toEqual(["$130", "$336", "$250"]);
  });
  it("purchases go to the studio's Glofox branch", () => {
    for (const p of [introOffer, ...packages, ...privates, ...memberships]) expect(p.href).toContain("6800273ac38efe7c330bf920");
    expect(glofox.schedule).toContain("classes-week-view");
  });
});
