/**
 * Canonical HMI research identity constants (ADR-003).
 * UI surfaces consume these in M3.5; do not invent alternate slogans.
 */

export const LAB_NAME = "Human–Machine Interaction Research Group";
export const INSTITUTION = "IIIT-Delhi";
export const RESEARCH_IDENTITY = "Interactive Intelligence";
export const PUNCHLINE = "Intelligence emerges through interaction.";

/** Concise homepage hero introduction — approved positioning (people, agents, physical world). */
export const HERO_INTRODUCTION =
  "We study interactive intelligence: how intelligent systems perceive and understand people, other agents, and the physical world; learn and reason through interaction; and adapt their behaviour as interaction unfolds.";

/** Homepage themes module intro — concise; not the Research-page feedback-loop lede. */
export const HOMEPAGE_THEMES_INTRO =
  "Perception & Understanding, Learning & Coordination, and Interaction & Adaptation organise the scientific portfolio. Application topics such as neurodevelopment cut across these themes.";

/** Research page themes lede — feedback-loop organising lens (Research only). */
export const RESEARCH_PAGE_THEMES_LEDE =
  "Perception & Understanding, Learning & Coordination, and Interaction & Adaptation are connected aspects of an ongoing feedback loop: how systems see and interpret the world of interaction, how they learn and coordinate within it, and how they adapt their behaviour as that world changes.";

/** Application Pathways section intro — no new application tags. */
export const APPLICATION_PATHWAYS_INTRO =
  "Our research applications span neurodevelopment, health, accessibility, social robotics, education, and embodied interaction with the physical world. These areas cut across our three scientific themes.";

/** About — Research Philosophy (after approved description, before Minsky). */
export const RESEARCH_PHILOSOPHY_LABEL = "Research Philosophy";
export const RESEARCH_PHILOSOPHY_QUESTION =
  "How does interaction shape intelligence?";
export const RESEARCH_PHILOSOPHY_PARAGRAPHS = [
  "Interactive Intelligence treats interaction as more than a channel for observations and responses. When an agent acts, its actions may change other agents’ responses, physical settings, and the information available for later learning and coordination. Intelligence, in this view, is shaped inside that ongoing loop—not only by what is sensed at a single moment.",
  "We therefore ask how systems can perceive and understand people, other agents, and situations under changing conditions; how they can learn and coordinate when behaviours continually reshape one another; and how interfaces, robots, and assistive systems should adapt so interaction remains usable and trustworthy. Our three research themes name connected aspects of this ongoing feedback loop while preserving each theme’s individual scientific scope.",
] as const;

/** Primary theme ids in display order. */
export const PRIMARY_THEME_IDS = [
  "perception-understanding",
  "learning-coordination",
  "interaction-adaptation",
] as const;

export type PrimaryThemeId = (typeof PRIMARY_THEME_IDS)[number];

export const PRIMARY_THEME_TITLES: Record<PrimaryThemeId, string> = {
  "perception-understanding": "Perception & Understanding",
  "learning-coordination": "Learning & Coordination",
  "interaction-adaptation": "Interaction & Adaptation",
};

/** Cross-cutting application / topic tags (not primary themes). */
export const APPLICATION_TAG_IDS = [
  "neurodevelopment",
  "autism",
  "adhd",
  "health",
  "accessibility",
  "social-robotics",
  "education",
  "pervasive-computing",
] as const;

export type ApplicationTagId = (typeof APPLICATION_TAG_IDS)[number];

export const APPROVED_DESCRIPTION_PATH =
  "src/content/identity/approved-description.md";

/**
 * Marvin Minsky quotation for About (M3.5) — faculty-supplied emotion/intelligence passage.
 * *The Society of Mind* §16.1 (“Emotion”), commonly paginated p. 163 (1986 edition).
 */
export const MINSKY_SOCIETY_OF_MIND = {
  text: "The question is not whether intelligent machines can have any emotions, but whether machines can be intelligent without any emotions.",
  work: "The Society of Mind",
  year: 1986,
  section: "16.1",
  page: 163,
  author: "Marvin Minsky",
} as const;
