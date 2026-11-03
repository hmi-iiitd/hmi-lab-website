/** Bibliographic normalization helpers for source↔record reconciliation. */

export function normalizeTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/\\textbf\{([^}]*)\}/gi, "$1")
    .replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/gi, "$1")
    .replace(/[{}`"“”‘’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeDoi(doi: string | null | undefined): string | null {
  if (!doi) return null;
  return doi
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .toLowerCase();
}

export function extractNumericYear(raw: string | number | null | undefined): number | null {
  if (typeof raw === "number" && Number.isInteger(raw)) return raw;
  if (raw == null) return null;
  const match = String(raw).match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

export function stripRankingNotes(note: string): string {
  return note
    .replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/gi, "$1")
    .replace(/\[[^\]]*(CORE|IF\s*=|Q[1-4]|CiteScore)[^\]]*\]/gi, "")
    .replace(/\\textbf\{([^}]*)\}/gi, "$1")
    .trim();
}

export function titlesMatch(a: string, b: string): boolean {
  const na = normalizeTitle(a);
  const nb = normalizeTitle(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  const shorter = na.length <= nb.length ? na : nb;
  const longer = na.length <= nb.length ? nb : na;
  return longer.includes(shorter) && shorter.length >= 24;
}
