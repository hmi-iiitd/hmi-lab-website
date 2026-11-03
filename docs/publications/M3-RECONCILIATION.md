# M3 publication reconciliation report (author bibliography intake)

**Date:** 2026-11-03 (revised)  
**Branch:** `feat/m3-publications` (PR #1)  
**Raw source:** `HMI_M3_Bibliography_Source_Raw.txt`  
**SHA256:** `805027dd5b6f8f072be306be5f7fb59ff9a723df435eb77e01a60ab0f9e5428f`  
**Storage:** Private agent store only — **not** committed to the public repository (may contain submitted/target-venue titles). Intake audit companion likewise kept private.

Machine-readable key classification: [`m3-source-classification.json`](./m3-source-classification.json)  
Patents: [`M3-PATENTS.md`](./M3-PATENTS.md)

## Summary counts

| Bucket | Count | Notes |
|---|---:|---|
| Raw BibTeX-style entries | **68** | 63 research + 5 patent `@misc` |
| Unique research candidates after dedup groups | **~57** | 63 research keys minus 6 clear duplicate/submitted companions (see groups) |
| Verified + public on site | **32** | 16 prior Crossref set + 15 new DOI/ACL + 1 accepted NeurIPS |
| Accepted but not yet formally published (public) | **1** | NeurIPS 2026 ESL |
| Incomplete / unpublished site candidates | **2** | ISS 2026 magnetic / UFO (no DOI) |
| Excluded drafts (submitted / target venue) | **6** | `ICMI`, `Ashwini`, `Rahul`, `Leekha`, `Sai`, `Shubhangi` |
| Patents (separate inventory) | **5** | Not in publications archive |
| Unresolved historical / backlog candidates | **22** | Classified; not silently published |
| Open bibliographic conflicts (documented) | **4 groups** | Author order / title / award / FER authors |

### Deduplicating groups (not silently merged)

1. `yadav2023engageme` ↔ `Saumya` — same EngageMe 2023 title  
2. `rana2021effect` ↔ `Rahul` — same polite-triggers paper; `Rahul` is submitted-only  
3. `ashwini2021responsiveness` ↔ `Ashwini` — same responsiveness paper; `Ashwini` is submitted-only  
4. `sarkar2023multi` ↔ `2023ashwini` — same FER title; **Crossref author order used** (`Ashwini B` first); conflict retained on record  

## Existing 16 ↔ source keys

| Site slug | Source key(s) | Outcome |
|---|---|---|
| `social-robots-autism-care-india` | `ashwini_chi` | Matched DOI; Crossref authors retained; HM award **unconfirmed** |
| `express-ear` | `ExpressEar` | Matched |
| `mobitangibles` | `AbhijeetUbiComp24` | Matched DOI; **title wording conflict** logged; Crossref title kept |
| `listener-backchannels` | `jain2021exploring` | Matched |
| `haptidrag` | `mishra2022haptidrag` | Matched |
| `emotion-recognition-eda` | `shukla2019feature` | Matched |
| `robot-assisted-intellectual-disabilities` | `shukla2019robot` | Matched |
| `ethics-child-robot-under-resourced` | `singh2022ethical` | Matched |
| `opacity-transparency-affective-computing` | `2023manohar` | Matched |
| `predictive-asd-acoustic-linguistic` | `ashwini_TAI` | Matched |
| `vr-flat-screen-gaming-responses` | `Ritik` | Matched (includes Chakrabarty per Crossref) |
| `spasht-autism-speech` | `ashwini_icassp` | Matched |
| `attentionet-eeg-attention` | `dhruv_acii` | Matched |
| `toy-tutor-peer-pet` | `kumar2020toy` | Matched |
| `robotic-affordances-asd` | `shukla2019mapping` | Matched |
| `stakeholders-robot-assisted-therapy` | `oliver2019stakeholders` | Matched |

## Newly verified / accepted public records (this revision)

| Slug | Year | Status | Evidence |
|---|---:|---|---|
| `trial-pupil-dynamics-adhd` | 2026 | published | Crossref `10.1038/s41598-026-68871-2` |
| `epistemic-social-learning` | 2026 | **accepted** | Author bib `NeurIPS2026`; authors J. Shukla → Jainendra Shukla, Dhruv Jaiswal, Divyanshi Beniwal, Kiriti Kanjilal |
| `pupil-dynamics-adhd-diagnosis` | 2025 | published | Crossref `10.1016/j.compbiomed.2025.110878` |
| `inclusive-education-textbook-images` | 2025 | published | Crossref `10.1007/978-981-96-2071-5_16` |
| `video-analysis-engine-effectiveness` | 2025 | published | Crossref `10.1007/978-3-031-78312-8_7` |
| `context-aware-eeg-emotion-recognition` | 2025 | published | Crossref `10.1109/ICASSP49660.2025.10890528` |
| `semantic-frame-live-video-comments` | 2025 | published | Crossref `10.1109/tmm.2025.3604921` |
| `beyond-lab-stress-monitoring` | 2025 | published | Crossref `10.1109/ANTS66931.2025.11429723` |
| `eeg-emotional-intelligence-personality` | 2024 | published | Crossref `10.1109/tim.2023.3347790` |
| `vyaktitvanirdharan-personality-ei` | 2024 | published | Crossref `10.1109/taffc.2024.3404243` |
| `engageme-attention-online-learning` | 2024 | published | Crossref `10.1007/978-3-031-64302-6_28` |
| `effectinet-educational-content` | 2024 | published | Crossref `10.1145/3636555.3636928` |
| `eden-academic-video-generation` | 2024 | published | Crossref `10.1007/978-3-031-64315-6_37` |
| `ontology-ethical-decision-making-ai` | 2024 | published | Crossref `10.1145/3632410.3632493` |
| `pedagogie-inclusive-textbook-images` | 2024 | published | ACL Anthology `2024.jeptalnrecital-taln.47` (no DOI) |
| `multisource-transfer-facial-emotion` | 2023 | published | Crossref `10.1038/s41598-023-48250-x` |

## Incomplete unpublished (on disk, not public)

| Slug | Source | Reason |
|---|---|---|
| `magnetic-field-shielding-candidate` | `mishra2026magnetic` | No Crossref DOI/landing page |
| `ufo-touch-free-inputs-candidate` | `mishra2026ufo` | No Crossref DOI/landing page |
| `draft-seed-incomplete` | CI fixture | Intentionally unpublished |

## CHI 2024 decisions

- **Authors:** Crossref/ACM order — B Ashwini; Atmadeep Ghoshal; Venkata Ratnadeep Suri; Krishnaveni Achary; Jainendra Shukla. Source `ashwini_chi` order/spellings differ; conflict logged, not silently overwritten onto Crossref.  
- **Honorable Mention:** Claimed in author bib note. ACM DL paper page and CHI 2024 awards URLs checked 2026-11-03 — **no paper-specific confirmation**. `award` remains `null`.

## Theme model (Interactive Intelligence)

Primary themes (site filters / research index):

1. Perception & Understanding  
2. Learning & Coordination  
3. Interaction & Adaptation  

Application tags (searchable, separate): e.g. `neurodevelopment`, `health`, `accessibility`, `education`.  
Homepage logo / hero About redesign deferred to **M3.5**.

## Integrity rules applied

- No invented DOIs, awards, code links, or rankings (CORE / IF / quartile stripped).  
- Numeric `year` only in BibTeX output; `pages={Accepted}` → `status: accepted`.  
- Submitted/target-venue keys excluded from public archive.  
- Patents inventoried separately; grant status unverified.  
- Conflicts recorded on records and in this report.

## Outstanding risks

1. Historical backlog (~22 keys) still unclassified as verified site records.  
2. ISS 2026 magnetic/UFO awaiting publisher DOIs.  
3. CHI HM still unconfirmed.  
4. Patent grant/application statuses need IPO/EPO checks.  
5. Solo-maintainer PR still requires a non-author approving review.
