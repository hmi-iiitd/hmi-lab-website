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
  sources: z.array(sourceRefSchema).default([]),
  evidence_note: z.string().optional(),
  verified_at: z.string().optional().nullable(),
  unresolved_notes: z.array(z.string()).default([]),
});

/** Publishability: stricter than draft. Incomplete records must fail. */
export const publicationPublishableSchema = publicationDraftSchema
  .extend({
    published: z.literal(true),
    verification_status: z.literal("verified"),
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
    if (!value.doi && !value.paper_url && !value.pdf_url) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Verified publications require DOI or an official paper/PDF URL",
        path: ["doi"],
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

export const projectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  published: z.boolean().default(false),
  research_areas: z.array(z.string().min(1)).default([]),
  publication_ids: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
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
export type Project = z.infer<typeof projectSchema>;
export type NewsItem = z.infer<typeof newsSchema>;
