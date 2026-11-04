/**
 * Canonical HMI research identity constants (ADR-003).
 * UI surfaces consume these in M3.5; do not invent alternate slogans.
 */

export const LAB_NAME = "Human–Machine Interaction Research Group";
export const INSTITUTION = "IIIT-Delhi";
export const RESEARCH_IDENTITY = "Interactive Intelligence";
export const PUNCHLINE = "Intelligence emerges through interaction.";

/** Concise homepage hero introduction — approved for M3.5 homepage only. */
export const HERO_INTRODUCTION =
  "We study interactive intelligence: how intelligent systems perceive and understand people and other agents, learn and reason through interaction, and adapt their behaviour in response.";

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
