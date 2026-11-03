import type { PublicationDraft } from "./content/schemas";

function escapeBibtex(value: string): string {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[{}]/g, (ch) => `\\${ch}`)
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function bibtexKeyFor(pub: PublicationDraft): string {
  if (pub.bibtex_key) return pub.bibtex_key;
  const first = pub.authors[0]?.name.split(/\s+/).pop() || "hmi";
  return `${first.toLowerCase()}${pub.publication_year}${pub.slug.split("-")[0]}`;
}

export function toBibtex(pub: PublicationDraft): string {
  const entryType = pub.kind === "journal" ? "article" : "inproceedings";
  const authors = pub.authors.map((a) => escapeBibtex(a.name)).join(" and ");
  const fields: Array<[string, string | undefined | null]> = [
    ["author", authors],
    ["title", escapeBibtex(pub.title)],
    ["year", String(pub.publication_year)],
    ["journal", pub.kind === "journal" ? escapeBibtex(pub.venue_full || "") : undefined],
    ["booktitle", pub.kind !== "journal" ? escapeBibtex(pub.venue_full || "") : undefined],
    ["doi", pub.doi ? escapeBibtex(pub.doi) : undefined],
    ["url", pub.paper_url || (pub.doi ? `https://doi.org/${pub.doi}` : undefined)],
    [
      "note",
      pub.status === "accepted" ? "Accepted" : undefined,
    ],
  ];

  const body = fields
    .filter(([, value]) => Boolean(value && String(value).trim()))
    .map(([key, value]) => `  ${key} = {${value}}`)
    .join(",\n");

  return `@${entryType}{${bibtexKeyFor(pub)},\n${body}\n}`;
}
