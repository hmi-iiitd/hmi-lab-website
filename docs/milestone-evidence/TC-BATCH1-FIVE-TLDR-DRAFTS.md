# T-C Batch 1 — Five source-grounded plain-language TL;DR drafts

**Status:** Draft preparation for PI/paper-owner review. **Not approved for public display.**  
**Baseline (original):** `main` @ `e2bb96f` → merged as PR #19 @ `a5ffcc8`  
**Review:** Independent CONDITIONAL PASS — https://github.com/hmi-iiitd/hmi-lab-website/pull/19#pullrequestreview-5840280294  
**This update:** Post-merge editorial/dossier corrections on follow-up branch (PR #19 was already merged; wording fixes cannot be amended onto the closed PR).  
**Gate:** All five remain `tldr_status: ai_assisted_draft`. No Cursor scientific approval.

---

## 1. MobiTangibles

| Field | Value |
|---|---|
| Title | MobiTangibles: Enabling Physical Manipulation Experiences of Virtual Precision Hand-Held Tools' Miniature Control in VR |
| Slug | `mobitangibles` |
| DOI | `10.1109/tvcg.2024.3456191` |
| Lab attribution | collaborative |
| Source adequacy | **ABSTRACT-ONLY / LIMITED EVIDENCE** |
| Source URL | https://doi.org/10.1109/tvcg.2024.3456191 (PubMed PMID 39269808 / ACM abstract) |
| Suggested reviewer | Abhijeet Mishra / Jainendra Shukla — **Owner confirmation needed** |
| Decision | **PENDING PI/PAPER-OWNER REVIEW** |

**Proposed TL;DR (47 words):**

> Researchers used physical props and smartphone magnetic sensing so people can feel precise tool-like motions—such as sliding and turning—in VR. In a 15-person study, these props felt more realistic and less fatiguing than bare hands or standard controllers. Results are limited to the tested tools and settings.

**Claim support:** Abstract supports physical proxies, magnetic sensing, n=15, realism/fatigue vs bare hands and VR controllers.  
**Remaining concern:** Full-text methods/results pages not independently verified.

---

## 2. SPASHT

| Field | Value |
|---|---|
| Title | SPASHT: Semantic and Pragmatic Speech Features for Automatic Assessment of Autism |
| Slug | `spasht-autism-speech` |
| DOI | `10.1109/icassp49357.2023.10095135` |
| Lab attribution | lab-led |
| Source adequacy | **FULL TEXT REVIEWED** (author-uploaded ResearchGate PDF text) |
| Source URL | https://www.researchgate.net/publication/371287533_SPASHT_Semantic_and_Pragmatic_Speech_Features_for_Automatic_Assessment_of_Autism ; DOI link |
| Sections reviewed | Abstract; §3.3 Experiments; §4 Results (Tables 3–4); §5 Conclusion |
| Suggested reviewer | Ashwini B / Jainendra Shukla |
| Decision | **PENDING PI/PAPER-OWNER REVIEW** |

**Proposed TL;DR (46 words):**

> Can the way children use language in conversation help researchers study autism? SPASHT examined repetition and how ideas connect in transcripts from 76 children. These patterns helped distinguish children with and without autism in this study, but the findings do not establish a clinical diagnostic test.

**Validation methodology (full text §3.3):**

- Dataset: CHILDES transcripts; 76 children (35 ASD, 41 TD).
- Train/test split: **90:10**.
- Model selection: AutoML comparison; SVM with RBF kernel selected.
- Hyperparameters: grid search with **5-fold cross-validation** for regularisation parameter C and γ.
- Table 3: SVM accuracy **94.1%** (macro-F1 94) — **not placed in the public TL;DR** pending evaluation-adequacy review (small test split; CHILDES population).

**Material uncertainties / overclaim risks:** Do not imply clinically validated diagnosis. 94% remains dossier-only until owners accept evaluation adequacy.

---

## 3. EngageME

| Field | Value |
|---|---|
| Title | EngageME: Exploring Neuropsychological Tests for Assessing Attention in Online Learning |
| Slug | `engageme-attention-online-learning` |
| DOI | `10.1007/978-3-031-64302-6_28` |
| Lab attribution | lab-led |
| Source adequacy | **ABSTRACT-ONLY / LIMITED EVIDENCE** |
| Source URL | https://link.springer.com/chapter/10.1007/978-3-031-64302-6_28 ; dataset page https://hmi.iiitd.edu.in/engagemeDataset.html |
| Suggested reviewer | Saumya Yadav / Jainendra Shukla |
| Decision | **PENDING PI/PAPER-OWNER REVIEW** |

**Proposed TL;DR (46 words) — required review wording:**

> Researchers tested whether established attention tasks could help assess students’ engagement during online learning. In a study involving 73 students, ratings made from facial videos were correlated with scores on attention tests. The work explores ways to measure attention; it does not show improved learning outcomes.

**Distinguish agreement vs correlation (Springer abstract):**

| Statistic | Meaning | Value |
|---|---|---|
| Krippendorff’s **α = 0.864** | Inter-annotator agreement on facial-video ratings | Agreement among raters |
| Spearman **ρ = 0.673** | Correlation between facial-video ratings and neuropsychological test scores | Cross-measure association |

Do **not** collapse these into a single “agreed strongly with test scores” phrase.

**Unresolved participant discrepancy (preserve explicitly):**

- Published Springer abstract: **n = 73**
- HMI EngageME dataset page: **n = 98**
- Author reconciliation required before scientific approval. Draft follows abstract’s 73.

---

## 4. Ethical Considerations from Child–Robot Interactions

| Field | Value |
|---|---|
| Title | Ethical Considerations from Child-Robot Interactions in Under-Resourced Communities |
| Slug | `ethics-child-robot-under-resourced` |
| DOI | `10.1007/s12369-022-00882-1` |
| Lab attribution | lab-led |
| Source adequacy | **FULL-TEXT accessible** (PMC9133315 / Leiden) |
| Source URL | https://doi.org/10.1007/s12369-022-00882-1 |
| Suggested reviewer | Divyanshu Kumar Singh / Manohar Kumar / Jainendra Shukla — **Owner confirmation needed** |
| Decision | **PENDING PI/PAPER-OWNER REVIEW** |

**Proposed TL;DR (49 words):**

> A five-week field study with 12 kindergarten children in an under-resourced New Delhi school examined ethical issues when a social robot was used in education. The authors highlight language barriers, possible harms if robots malfunction, trust and deception, and whether such innovation is viable locally—not claims of clinical benefit.

**Note:** “possible harms if robots malfunction” — does not imply measured clinical harm.

---

## 5. Opacity, Transparency, and the Ethics of Affective Computing

| Field | Value |
|---|---|
| Title | Opacity, Transparency, and the Ethics of Affective Computing |
| Slug | `opacity-transparency-affective-computing` |
| DOI | `10.1109/taffc.2023.3278230` |
| Lab attribution | collaborative |
| Source adequacy | **FULL-TEXT accessible** |
| Source URL | https://doi.org/10.1109/taffc.2023.3278230 |
| Suggested reviewer | Manohar Kumar / Aisha Aijaz — **Owner confirmation needed** |
| Decision | **PENDING PI/PAPER-OWNER REVIEW** |

**Proposed TL;DR (50 words):**

> This conceptual ethics paper argues that technologies that infer or respond to people's emotions tend to make people more transparent to machines while systems stay opaque. The authors warn of risks to autonomy, manipulation, anxiety, and unfair burdens on vulnerable groups. It is a normative analysis, not an experimental study.

---

## Scientific review matrix

| Paper | Source adequacy | Claim verification | Readability | Remaining concern | Decision |
|---|---|---|---|---|---|
| MobiTangibles | Abstract-only | n=15 / realism / fatigue match abstract | Physical props + magnetic sensing clarified | Full-text verification | PENDING PI/PAPER-OWNER REVIEW |
| SPASHT | Full text reviewed (RG) | n=76; §3.3 90:10 + 5-fold grid search verified; 94.1% dossier-only | Lay wording without unexplained jargon | Evaluation-adequacy of 94% before any numeric public claim | PENDING PI/PAPER-OWNER REVIEW |
| EngageME | Abstract-only | α vs ρ distinguished; n=73 used | Required review wording applied | Unresolved **73 vs 98** participant count | PENDING PI/PAPER-OWNER REVIEW |
| Child–robot ethics | Full-text | n=12 / five weeks / themes verified | “Possible harms if robots malfunction” | Confirm preferred owner/reviewer | PENDING PI/PAPER-OWNER REVIEW |
| Opacity/transparency AC | Full-text | Conceptual framing verified | Affective computing glossed | Collaborative owner sign-off | PENDING PI/PAPER-OWNER REVIEW |

**No row is scientifically approved by Cursor. No summary elevated to `owner_approved`.**

## Recommendation

**CONDITIONAL PASS** for updated draft readiness after review wording — **STOP before merge of any approval elevation.** Individual PI/paper-owner acceptance still required per draft.
