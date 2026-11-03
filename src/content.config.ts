import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
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
  projects,
  news,
};
