import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  applicationTagSchema,
  identityDocumentSchema,
  newsSchema,
  personSchema,
  projectSchema,
  publicationDraftSchema,
  researchThemeSchema,
} from "./lib/content/schemas";

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,yml,yaml}", base: "./src/content/publications" }),
  schema: publicationDraftSchema,
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,yml,yaml}", base: "./src/content/people" }),
  schema: personSchema,
});

const researchAreas = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,yml,yaml}",
    base: "./src/content/research-areas",
  }),
  schema: researchThemeSchema,
});

const applicationTags = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,yml,yaml}",
    base: "./src/content/application-tags",
  }),
  schema: applicationTagSchema,
});

const identity = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,yml,yaml}",
    base: "./src/content/identity",
  }),
  schema: identityDocumentSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,yml,yaml}", base: "./src/content/projects" }),
  schema: projectSchema,
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,yml,yaml}", base: "./src/content/news" }),
  schema: newsSchema,
});

export const collections = {
  publications,
  people,
  "research-areas": researchAreas,
  "application-tags": applicationTags,
  identity,
  projects,
  news,
};
