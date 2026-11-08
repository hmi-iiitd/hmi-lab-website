import { describe, expect, it } from "vitest";
import { selectedResearchStatusLabel } from "../../src/lib/selected-research-label";

describe("I2 selectedResearchStatusLabel year deduplication", () => {
  it("does not duplicate a year already present in venue_short", () => {
    expect(
      selectedResearchStatusLabel({
        venue_short: "NeurIPS 2026",
        kind: "conference",
        publication_year: 2026,
        status: "accepted",
      }),
    ).toBe("NeurIPS 2026 · Accepted");

    expect(
      selectedResearchStatusLabel({
        venue_short: "IEEE TAC 2024",
        kind: "journal",
        publication_year: 2024,
        status: "published",
      }),
    ).toBe("IEEE TAC 2024");

    expect(
      selectedResearchStatusLabel({
        venue_short: "CHI 2024",
        kind: "conference",
        publication_year: 2024,
        status: "published",
      }),
    ).toBe("CHI 2024");

    expect(
      selectedResearchStatusLabel({
        venue_short: "Sci Rep 2026",
        kind: "journal",
        publication_year: 2026,
        status: "published",
      }),
    ).toBe("Sci Rep 2026");

    expect(
      selectedResearchStatusLabel({
        venue_short: "IMWUT / UbiComp 2021",
        kind: "journal",
        publication_year: 2021,
        status: "published",
      }),
    ).toBe("IMWUT / UbiComp 2021");
  });

  it("appends publication_year once when venue_short omits the year (EDA 2021)", () => {
    expect(
      selectedResearchStatusLabel({
        venue_short: "IEEE TAC",
        kind: "journal",
        publication_year: 2021,
        status: "published",
      }),
    ).toBe("IEEE TAC · 2021");
  });

  it("falls back to kind when venue_short is missing and still shows the year once", () => {
    expect(
      selectedResearchStatusLabel({
        kind: "journal",
        publication_year: 2020,
        status: "published",
      }),
    ).toBe("journal · 2020");
  });
});
