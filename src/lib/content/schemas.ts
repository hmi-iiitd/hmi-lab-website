import { z } from "zod";

export const authorRefSchema = z.object({
  name: z.string().min(1),
  personId: z.string().min(1).optional(),
  affiliation: z.string().min(1).optional(),
});

export const sourceRefSchema = z.object({
  label: z.string().min(1),
  url: z.string().url().optional(),
  note: z.string().optional(),
});

export const publicationDraftSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  kind: z.enum(["journal", "conference", "workshop", "preprint", "other"]),
  status: z.enum(["draft", "submitted", "accepted", "published", "other"]),
  publication_year: z.number().int().gte(1990).lte(2100),
  venue_full: z.string().min(1).optional(),
  venue_short: z.string().min(1).optional(),
  authors: z.array(authorRefSchema).default([]),
  research_areas: z.array(z.string().min(1)).default([]),
  application_tags: z.array(z.string().min(1)).default([]),
  project_ids: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  featured_rank: z.number().int().positive().optional(),
  published: z.boolean().default(false),
  metadata_verified: z.boolean().default(false),
  verification_status: z
    .enum(["verified", "incomplete", "conflicting", "excluded"])
    .default("incomplete"),
  lab_attribution: z
    .enum(["lab-led", "collaborative", "historical-faculty", "unknown"])
    .default("unknown"),
  abstract: z.string().optional(),
  doi: z.string().min(1).optional().nullable(),
  arxiv_id: z.string().min(1).optional().nullable(),
  paper_url: z.string().url().optional().nullable(),
  pdf_url: z.string().url().optional().nullable(),
  code_url: z.string().url().optional().nullable(),
  dataset_url: z.string().url().optional().nullable(),
  video_url: z.string().url().optional().nullable(),
  slides_url: z.string().url().optional().nullable(),
  project_url: z.string().url().optional().nullable(),
  award: z.string().min(1).optional().nullable(),
  bibtex_key: z.string().min(1).optional(),
  source_keys: z.array(z.string().min(1)).default([]),
  sources: z.array(sourceRefSchema).default([]),
  evidence_note: z.string().optional(),
  verified_at: z.string().optional().nullable(),
  unresolved_notes: z.array(z.string()).default([]),
  /** Isolated engineering fixture — never public on staging/production builds. */
  test_fixture: z.boolean().default(false),
});

/** Publishability: stricter than draft. Incomplete records must fail. */
export const publicationPublishableSchema = publicationDraftSchema
  .extend({
    published: z.literal(true),
    verification_status: z.literal("verified"),
    status: z.enum(["published", "accepted"]),
    authors: z.array(authorRefSchema).min(1),
    venue_full: z.string().min(1),
    metadata_verified: z.literal(true),
    evidence_note: z.string().min(1),
    verified_at: z.string().min(1),
    sources: z.array(sourceRefSchema).min(1),
  })
  .superRefine((value, ctx) => {
    if (value.authors.some((a) => !a.name.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Every author must have a non-empty name in order",
        path: ["authors"],
      });
    }
    const hasLocator = Boolean(value.doi || value.paper_url || value.pdf_url);
    if (value.status === "published" && !hasLocator) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Published records require DOI or an official paper/PDF URL",
        path: ["doi"],
      });
    }
    if (value.status === "accepted" && !hasLocator && value.sources.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Accepted records without DOI/URL require documented acceptance sources",
        path: ["sources"],
      });
    }
  });

export const personSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  role: z.enum([
    "director",
    "faculty",
    "phd",
    "masters",
    "undergraduate",
    "researcher",
    "alumni",
    "collaborator",
  ]),
  published: z.boolean().default(false),
  title: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  website: z.string().url().optional().nullable(),
  image: z.string().optional().nullable(),
  image_permission: z.enum(["approved", "pending", "none"]).default("none"),
});

export const researchThemeSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  published: z.boolean().default(false),
  order: z.number().int().default(0),
});

/** Cross-cutting application/topic tags — independent of primary research themes. */
export const applicationTagSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  published: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const identityDocumentSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  punchline: z.string().min(1),
  research_identity: z.string().min(1),
  lab_name: z.string().min(1),
  institution: z.string().min(1),
  version: z.string().min(1),
  published: z.boolean().default(false),
});

/**
 * Only owner-cleared, repository-local media may appear on a research story.
 * Unapproved material must not be committed even on draft branches.
 */
export const researchArtifactSchema = z
  .object({
    path: z.string().regex(/^research\/[a-z0-9][a-z0-9/_-]*\.(png|jpg|jpeg|webp|mp4|webm)$/),
    type: z.enum(["image", "video"]),
    kind: z.enum(["empirical", "illustrative"]),
    permission: z.literal("approved"),
    owner: z.string().trim().min(1),
    source: z.string().trim().min(1),
    caption: z.string().trim().min(1),
    alt: z.string().trim().min(1),
    transcript_path: z.string().regex(/^research\/[a-z0-9][a-z0-9/_-]*\.txt$/).optional(),
  })
  .strict()
  .superRefine((artifact, ctx) => {
    const isVideoFile = /\.(mp4|webm)$/.test(artifact.path);
    if ((artifact.type === "video") !== isVideoFile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["path"],
        message: "Artifact type must match file format",
      });
    }
    if (artifact.type === "video" && !artifact.transcript_path) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["transcript_path"],
        message: "Approved research videos require a transcript",
      });
    }
  });

/** Draft-first schema: publication is forbidden until scientific owner sign-off. */
export const projectSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    summary: z.string().min(1),
    published: z.boolean().default(false),
    research_areas: z.array(z.string().min(1)).default([]),
    publication_ids: z.array(z.string().min(1)).default([]),
    featured: z.boolean().default(false),
    problem: z.string().trim().min(1).optional(),
    contribution: z.string().trim().min(1).optional(),
    methodology: z.string().trim().min(1).optional(),
    findings: z.array(z.string().trim().min(1)).max(2).default([]),
    limitations: z.string().trim().min(1).optional(),
    programme_interpretation: z.string().trim().min(1).optional(),
    scientific_owner: z.string().trim().min(1).optional(),
    scientific_owner_approved_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    artifact: researchArtifactSchema.optional(),
    /** Isolated engineering fixture — never public on staging/production builds. */
    test_fixture: z.boolean().default(false),
  })
  .superRefine((project, ctx) => {
    if (!project.published) return;
    if (project.publication_ids.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["publication_ids"],
        message: "A published research story must link exactly one canonical publication",
      });
    }
    for (const field of [
      "problem",
      "contribution",
      "methodology",
      "limitations",
      "programme_interpretation",
      "scientific_owner",
      "scientific_owner_approved_at",
    ] as const) {
      if (!project[field]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: "Required for an owner-approved public research story",
        });
      }
    }
    if (project.findings.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["findings"],
        message: "At least one source-supported finding is required",
      });
    }
    const claims = [
      project.problem,
      project.contribution,
      project.methodology,
      ...project.findings,
      project.limitations,
      project.programme_interpretation,
    ];
    if (claims.some((claim) => /TODO_|lorem ipsum|\bTBD\b/i.test(claim ?? ""))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Placeholder claims must not be published",
      });
    }
  });

export const newsSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().min(1),
  published: z.boolean().default(false),
  body: z.string().optional(),
});

export type PublicationDraft = z.infer<typeof publicationDraftSchema>;
export type PublicationPublishable = z.infer<typeof publicationPublishableSchema>;
export type Person = z.infer<typeof personSchema>;
export type ResearchTheme = z.infer<typeof researchThemeSchema>;
export type ApplicationTag = z.infer<typeof applicationTagSchema>;
export type IdentityDocument = z.infer<typeof identityDocumentSchema>;
export type Project = z.infer<typeof projectSchema>;
export type NewsItem = z.infer<typeof newsSchema>;
