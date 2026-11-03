# M3 publication reconciliation report (author bibliography intake)

**Date:** 2026-11-03 (final gate cleanup)  
**PR head:** `feat/m3-publications` (see latest commit on PR #1)  
**Raw source:** `HMI_M3_Bibliography_Source_Raw.txt` (private store only)  
**SHA256:** `805027dd5b6f8f072be306be5f7fb59ff9a723df435eb77e01a60ab0f9e5428f`

Machine-readable classification: [`m3-source-classification.json`](./m3-source-classification.json)  
Patents: [`M3-PATENTS.md`](./M3-PATENTS.md)

> **Archive scope:** The public publications archive lists **verified records currently available** after Crossref/ACL/conference verification. It is **not** a claim that the complete historical HMI bibliography has been published.

## Explicit count reconciliation

### Source-key inventory (68 keys)

| Bucket (source keys) | Count | Notes |
|---|---:|---|
| Raw BibTeX-style entries | **68** | Author-supplied intake |
| Keys mapping to public site records | **33** | 16 matched + 16 new + 1 accepted (ESL); FER uses **two** keys → **32** papers |
| Incomplete unpublished site candidates | **2** | ISS 2026 magnetic / UFO |
| Excluded drafts (submitted / target venue) | **6** | `ICMI`, `Ashwini`, `Rahul`, `Leekha`, `Sai`, `Shubhangi` |
| Patent / application `@misc` | **5** | Separate IP inventory |
| Unresolved historical / backlog keys | **22** | Documented follow-up; not silently dropped |
| **Sum of classified keys** | **68** | 33 + 2 + 6 + 5 + 22 |

### Deduplicated publication / work counts

| Deduplicated bucket | Count | Notes |
|---|---:|---|
| **Distinct public papers on site** | **32** | **31** `status: published` + **1** `status: accepted` (ESL) |
| Incomplete ISS candidates (on disk, not public) | **2** | No DOI yet |
| Unique research works after removing duplicate-key pairs | **59** | From **63** non-patent research keys minus **4** pairs (see below) |
| Patents / applications | **5** | Not refereed publications |

**Why not “~57”:** Earlier prose estimated ~57 unique research works. The exact arithmetic is:

- 68 raw keys − 5 patents = **63** research-oriented keys  
- Minus **4** duplicate-key pairs that refer to the same work:
  1. `sarkar2023multi` ↔ `2023ashwini` (same Sci Rep FER paper; both keys → one public record)
  2. `yadav2023engageme` ↔ `Saumya` (same EngageMe 2023 paper; both unresolved)
  3. `ashwini2021responsiveness` ↔ `Ashwini` (same RO-MAN paper; unresolved + excluded draft)
  4. `rana2021effect` ↔ `Rahul` (same polite-triggers paper; unresolved + excluded draft)  
- → **63 − 4 = 59** unique research works represented in the intake.

Cross-check public set: 32 public + 2 incomplete + (22 unresolved keys − 1 EngageMe dup) + (6 excluded − 2 draft dups of unresolved) = 32 + 2 + 21 + 4 = **59**.

## Distinct public papers (32)

**31 published** (Crossref or ACL Anthology verified) + **1 accepted** (NeurIPS 2026 ESL; website-visible, not yet formal proceedings).

Featured homepage selection (unchanged): CHI 2024 social robots; ExpressEar; MobiTangibles.

## NeurIPS 2026 ESL (accepted, public)

- Ordered authors: Jainendra Shukla; Dhruv Jaiswal; Divyanshi Beniwal; Kiriti Kanjilal  
- `status: accepted`, `published: true` on the website (visibility ≠ proceedings publication)  
- **No DOI** fabricated  
- Provenance:
  - NeurIPS 2026 Downloads listing → poster page `https://neurips.cc/virtual/2026/poster/150541`
  - IIIT-Delhi Center for Design and New Media (CDNM) acceptance announcement (LinkedIn org post)
  - Author-supplied bibliography key `NeurIPS2026`

## CHI 2024 Honorable Mention

- Bibliographic authors follow Crossref/ACM order (source `ashwini_chi` spelling/order conflict retained as a note).  
- Award evidence recorded (no invented ACM “awards page” URL):
  - First-author academic site: `https://sites.google.com/view/ashwini-b/`
  - HMI lab design/reference materials claiming the distinction (`docs/references/REFERENCE_DESIGN_CONCEPT.html`)
  - Corroborating SIGCHI CHI ’24 program author page (paper-specific “HONORABLE MENTION” badge): `https://programs.sigchi.org/chi/2024/authors/141227`
- `award` set to **CHI 2024 Honorable Mention**; residual note: **faculty confirmation** requested to close the award gate.

## Incomplete / excluded / patents / backlog

| Set | Count | Handling |
|---|---:|---|
| ISS 2026 magnetic / UFO | 2 | Incomplete candidates; unpublished |
| Excluded drafts | 6 | Not in archive |
| Patents | 5 | [`M3-PATENTS.md`](./M3-PATENTS.md) |
| Unresolved backlog keys | 22 | Explicit follow-up list in `m3-source-classification.json` (`bucket: unresolved_candidate`) |

## Theme model (Interactive Intelligence) — ADR-003

Primary themes: Perception & Understanding; Learning & Coordination; Interaction & Adaptation.  
Application tags remain a separate searchable dimension (neurodevelopment, ADHD, autism, health, accessibility, etc.). Homepage/About/logo/Minsky = **M3.5**.

## Integrity rules

- No invented DOIs, rankings, or ACM award URLs.  
- Conflicts recorded, not silently overwritten.  
- Submitted/target-venue keys excluded from the public archive.
