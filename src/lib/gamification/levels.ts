/**
 * MŪSA Level System — Pure level calculation functions.
 * Separated to avoid circular dependencies with badges.
 */

import type { Level } from './types';

const LEVEL_THRESHOLDS: { min: number; level: Level }[] = [
  { min: 5000, level: 'Connoisseur' },
  { min: 2000, level: 'Enthusiast' },
  { min: 500, level: 'Explorer' },
  { min: 0, level: 'Starter' },
];

/** Get the user's level based on total XP */
export function getLevelFromXP(xp: number): Level {
  return LEVEL_THRESHOLDS.find((t) => xp >= t.min)?.level ?? 'Starter';
}

/** Get XP needed for the next level */
export function xpToNextLevel(xp: number): { next: Level; needed: number } | null {
  const current = getLevelFromXP(xp);
  const idx = LEVEL_THRESHOLDS.findIndex((t) => t.level === current);
  if (idx <= 0) return null;
  const nextThreshold = LEVEL_THRESHOLDS[idx - 1];
  return { next: nextThreshold.level, needed: nextThreshold.min - xp };
}
