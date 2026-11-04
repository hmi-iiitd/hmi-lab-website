import { PRIMARY_THEME_IDS } from "../identity";
import {
  applicationTagSchema,
  newsSchema,
  personSchema,
  projectSchema,
  publicationDraftSchema,
  publicationPublishableSchema,
  researchThemeSchema,
  type ApplicationTag,
  type NewsItem,
  type Person,
  type Project,
  type PublicationDraft,
  type ResearchTheme,
} from "./schemas";

export type ContentBundle = {
  publications: PublicationDraft[];
  people: Person[];
  themes: ResearchTheme[];
  applicationTags?: ApplicationTag[];
  projects: Project[];
  news: NewsItem[];
};

export type ValidationIssue = {
  collection: string;
  id?: string;
  message: string;
};

export function assertNoDuplicateKeys(
  items: { id: string; slug: string; doi?: string | null }[],
  collection: string,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const ids = new Map<string, number>();
  const slugs = new Map<string, number>();
  const dois = new Map<string, number>();

  for (const item of items) {
    ids.set(item.id, (ids.get(item.id) ?? 0) + 1);
    slugs.set(item.slug, (slugs.get(item.slug) ?? 0) + 1);
    if (item.doi) {
      const key = item.doi.toLowerCase();
      dois.set(key, (dois.get(key) ?? 0) + 1);
    }
  }

  for (const [id, count] of ids) {
    if (count > 1) {
      issues.push({ collection, id, message: `Duplicate id: ${id}` });
    }
  }
  for (const [slug, count] of slugs) {
    if (count > 1) {
      issues.push({ collection, message: `Duplicate slug: ${slug}` });
    }
  }
  for (const [doi, count] of dois) {
    if (count > 1) {
      issues.push({ collection, message: `Duplicate DOI: ${doi}` });
    }
  }
  return issues;
}

export function validatePublicationRecord(raw: unknown): ValidationIssue[] {
  const draft = publicationDraftSchema.safeParse(raw);
  if (!draft.success) {
    return draft.error.issues.map((issue) => ({
      collection: "publications",
      message: issue.message,
    }));
  }

  if (!draft.data.published) {
    return [];
  }

  const publishable = publicationPublishableSchema.safeParse(raw);
  if (!publishable.success) {
    return publishable.error.issues.map((issue) => ({
      collection: "publications",
      id: draft.data.id,
      message: `Publishability: ${issue.path.join(".")} — ${issue.message}`,
    }));
  }
  return [];
}

export function validateContentBundle(bundle: ContentBundle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const pub of bundle.publications) {
    issues.push(...validatePublicationRecord(pub));
  }
  issues.push(...assertNoDuplicateKeys(bundle.publications, "publications"));

  for (const person of bundle.people) {
    const parsed = personSchema.safeParse(person);
    if (!parsed.success) {
      issues.push(
        ...parsed.error.issues.map((i) => ({
          collection: "people",
          id: person.id,
          message: i.message,
        })),
      );
    }
  }
  issues.push(...assertNoDuplicateKeys(bundle.people, "people"));

  for (const theme of bundle.themes) {
    const parsed = researchThemeSchema.safeParse(theme);
    if (!parsed.success) {
      issues.push(
        ...parsed.error.issues.map((i) => ({
          collection: "themes",
          id: theme.id,
          message: i.message,
        })),
      );
    }
  }
  issues.push(...assertNoDuplicateKeys(bundle.themes, "themes"));

  const publishedThemes = bundle.themes.filter((t) => t.published);
  if (publishedThemes.length !== PRIMARY_THEME_IDS.length) {
    issues.push({
      collection: "themes",
      message: `Expected exactly ${PRIMARY_THEME_IDS.length} published primary themes; found ${publishedThemes.length}`,
    });
  }
  const publishedThemeIds = new Set(publishedThemes.map((t) => t.id));
  for (const id of PRIMARY_THEME_IDS) {
    if (!publishedThemeIds.has(id)) {
      issues.push({
        collection: "themes",
        id,
        message: `Missing required primary theme id: ${id}`,
      });
    }
  }
  for (const theme of publishedThemes) {
    if (!(PRIMARY_THEME_IDS as readonly string[]).includes(theme.id)) {
      issues.push({
        collection: "themes",
        id: theme.id,
        message: `Unexpected published theme id (not in Interactive Intelligence primary set): ${theme.id}`,
      });
    }
  }

  if (bundle.applicationTags) {
    for (const tag of bundle.applicationTags) {
      const parsed = applicationTagSchema.safeParse(tag);
      if (!parsed.success) {
        issues.push(
          ...parsed.error.issues.map((i) => ({
            collection: "application-tags",
            id: tag.id,
            message: i.message,
          })),
        );
      }
    }
    issues.push(...assertNoDuplicateKeys(bundle.applicationTags, "application-tags"));
  }

  for (const project of bundle.projects) {
    const parsed = projectSchema.safeParse(project);
    if (!parsed.success) {
      issues.push(
        ...parsed.error.issues.map((i) => ({
          collection: "projects",
          id: project.id,
          message: i.message,
        })),
      );
    }
  }
  issues.push(...assertNoDuplicateKeys(bundle.projects, "projects"));

  for (const item of bundle.news) {
    const parsed = newsSchema.safeParse(item);
    if (!parsed.success) {
      issues.push(
        ...parsed.error.issues.map((i) => ({
          collection: "news",
          id: item.id,
          message: i.message,
        })),
      );
    }
  }
  issues.push(...assertNoDuplicateKeys(bundle.news, "news"));

  const themeIds = new Set(bundle.themes.map((t) => t.id));
  const tagIds = new Set((bundle.applicationTags ?? []).map((t) => t.id));
  const personIds = new Set(bundle.people.map((p) => p.id));
  const pubIds = new Set(bundle.publications.map((p) => p.id));

  for (const pub of bundle.publications) {
    for (const area of pub.research_areas) {
      if (!themeIds.has(area)) {
        issues.push({
          collection: "publications",
          id: pub.id,
          message: `Unknown research_areas id: ${area}`,
        });
      }
      if (tagIds.has(area)) {
        issues.push({
          collection: "publications",
          id: pub.id,
          message: `research_areas must not reuse application tag id: ${area}`,
        });
      }
    }
    for (const tag of pub.application_tags ?? []) {
      if (tagIds.size > 0 && !tagIds.has(tag)) {
        issues.push({
          collection: "publications",
          id: pub.id,
          message: `Unknown application_tags id: ${tag}`,
        });
      }
      if (themeIds.has(tag)) {
        issues.push({
          collection: "publications",
          id: pub.id,
          message: `application_tags must not reuse primary theme id: ${tag}`,
        });
      }
    }
    for (const author of pub.authors) {
      if (author.personId && !personIds.has(author.personId)) {
        issues.push({
          collection: "publications",
          id: pub.id,
          message: `Unknown author personId: ${author.personId}`,
        });
      }
    }
  }

  const publicPubIds = new Set(
    bundle.publications
      .filter(
        (p) =>
          p.published &&
          p.metadata_verified &&
          p.verification_status === "verified" &&
          (p.status === "published" || p.status === "accepted"),
      )
      .map((p) => p.id),
  );
  for (const project of bundle.projects) {
    if (project.published) {
      for (const pubId of project.publication_ids) {
        if (!publicPubIds.has(pubId)) {
          issues.push({
            collection: "projects",
            id: project.id,
            message: `Published story requires a verified public publication: ${pubId}`,
          });
        }
      }
    }
  }

  for (const project of bundle.projects) {
    for (const area of project.research_areas) {
      if (!themeIds.has(area)) {
        issues.push({
          collection: "projects",
          id: project.id,
          message: `Unknown research_areas id: ${area}`,
        });
      }
    }
    for (const pubId of project.publication_ids) {
      if (!pubIds.has(pubId)) {
        issues.push({
          collection: "projects",
          id: project.id,
          message: `Unknown publication_ids id: ${pubId}`,
        });
      }
    }
  }

  return issues;
}

export function publishedPublications(pubs: PublicationDraft[]): PublicationDraft[] {
  return pubs.filter((p) => p.published);
}
