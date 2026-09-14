export interface StoryRankingInput {
  distinctSourceCount: number;
  avgTrustScore: number;
  mostRecentPublishedAt: Date | null;
  now?: Date;
}

const UNKNOWN_PUBLISH_AGE_HOURS = 72;
const RECENCY_WINDOW_HOURS = 24;
const CORROBORATION_WEIGHT = 8;
const TRUST_WEIGHT = 0.6;
/**
 * Without this, a very fresh single-source item (e.g. a podcast episode page)
 * can outrank an older, multi-source story on recency alone, since an
 * uncorroborated story's corroboration bonus is already 0 and recency was
 * otherwise uncapped. A single source, however trustworthy, hasn't been
 * corroborated — dampen the whole score rather than let freshness alone
 * substitute for corroboration.
 */
const SINGLE_SOURCE_PENALTY = 0.4;

/**
 * Deterministic importance score: trust of corroborating sources, how many
 * distinct sources reported it, and how recently it broke. No AI involved —
 * this stays purely rule-based so it's cheap to run and easy to reason about.
 */
export function computeImportanceScore(input: StoryRankingInput): number {
  const now = input.now ?? new Date();
  const hoursSincePublished = input.mostRecentPublishedAt
    ? (now.getTime() - input.mostRecentPublishedAt.getTime()) / (60 * 60 * 1000)
    : UNKNOWN_PUBLISH_AGE_HOURS;

  const recencyBonus = Math.max(0, RECENCY_WINDOW_HOURS - hoursSincePublished);
  const corroborationBonus = Math.max(0, input.distinctSourceCount - 1) * CORROBORATION_WEIGHT;
  const rawScore = input.avgTrustScore * TRUST_WEIGHT + corroborationBonus + recencyBonus;
  const score = input.distinctSourceCount <= 1 ? rawScore * SINGLE_SOURCE_PENALTY : rawScore;

  return Math.round(score * 100) / 100;
}
