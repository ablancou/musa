/**
 * MŪSA Gamification Engine
 *
 * Pure functions for XP, levels, streaks, badges, and leaderboards.
 * All functions are immutable — they return new objects, never mutate.
 * No external dependencies. Ready for React/Next.js integration.
 */

import type {
  Level,
  ActionType,
  ActionPayload,
  UserProgress,
  LeaderboardEntry,
} from './types';

// ─── Level Thresholds ───

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
  if (idx <= 0) return null; // Already at max level
  const nextThreshold = LEVEL_THRESHOLDS[idx - 1];
  return { next: nextThreshold.level, needed: nextThreshold.min - xp };
}

// ─── Date Helpers (pure, no libraries) ───

export function getDateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

function getYesterday(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return getDateString(date);
}

function isSameWeek(date1Str: string, date2Str: string): boolean {
  const d1 = new Date(date1Str);
  const d2 = new Date(date2Str);
  const week1 = Math.floor(d1.getTime() / (7 * 24 * 60 * 60 * 1000));
  const week2 = Math.floor(d2.getTime() / (7 * 24 * 60 * 60 * 1000));
  return week1 === week2;
}

// ─── Weekly Freeze Reset ───

function resetWeeklyFreezes(progress: UserProgress, todayStr: string): UserProgress {
  const lastReset = progress.streak.lastFreezeResetDate || '1970-01-01';
  if (!isSameWeek(lastReset, todayStr)) {
    return {
      ...progress,
      streak: {
        ...progress.streak,
        freezesAvailable: 1,
        lastFreezeResetDate: todayStr,
      },
    };
  }
  return progress;
}

// ─── Daily Streak Processing ───

/**
 * Process daily streak: consecutive days → multiplier (1x–5x).
 * Freeze option protects the streak (1 per week).
 * Returns new immutable UserProgress.
 */
export function processDailyStreak(
  progress: UserProgress,
  todayStr: string,
  useFreeze: boolean = false
): UserProgress {
  let updated = resetWeeklyFreezes({ ...progress }, todayStr);

  // Already processed today
  if (updated.streak.lastActivityDate === todayStr) return updated;

  const yesterdayStr = getYesterday(todayStr);
  const isConsecutive = updated.streak.lastActivityDate === yesterdayStr;

  let newStreak = 1;
  let freezeUsed = false;

  if (isConsecutive) {
    newStreak = updated.streak.currentStreak + 1;
  } else if (useFreeze && updated.streak.freezesAvailable > 0) {
    newStreak = updated.streak.currentStreak + 1;
    freezeUsed = true;
  }

  const multiplier = Math.min(newStreak, 5);
  const streakXP = 10 * multiplier;

  return {
    ...updated,
    totalXP: updated.totalXP + streakXP,
    totalFreezesUsed: freezeUsed
      ? (updated.totalFreezesUsed || 0) + 1
      : updated.totalFreezesUsed,
    streak: {
      ...updated.streak,
      currentStreak: newStreak,
      multiplier,
      lastActivityDate: todayStr,
      freezesAvailable: freezeUsed
        ? updated.streak.freezesAvailable - 1
        : updated.streak.freezesAvailable,
    },
  };
}

// ─── XP Award System ───

const XP_TABLE: Record<ActionType, number> = {
  view_artwork: 5,
  read_narration: 15,
  complete_quiz: 25,
  complete_era: 100,
  use_comparator: 10,
  explore_museum: 20,
  share_artwork: 0,
  invite_friend: 0,
};

const COUNTER_MAP: Record<ActionType, keyof UserProgress> = {
  view_artwork: 'artworksViewed',
  read_narration: 'narrationsRead',
  complete_quiz: 'quizzesCompleted',
  complete_era: 'erasCompleted',
  use_comparator: 'comparatorsUsed',
  explore_museum: 'museumsExplored',
  share_artwork: 'artworksShared',
  invite_friend: 'friendsInvited',
};

/**
 * Award XP for an action and update counters.
 * Perfect quiz bonus: +10 XP.
 */
export function awardXPForAction(
  progress: UserProgress,
  action: ActionType,
  payload: ActionPayload = {}
): UserProgress {
  const counterKey = COUNTER_MAP[action];
  if (!counterKey) return progress;

  let xpGain = XP_TABLE[action];
  const updated: UserProgress = {
    ...progress,
    [counterKey]: (progress[counterKey] as number) + 1,
  };

  if (action === 'complete_quiz' && payload.perfect) {
    xpGain += 10;
    updated.perfectQuizzes = progress.perfectQuizzes + 1;
  }

  updated.totalXP = progress.totalXP + xpGain;
  return updated;
}

// ─── Badge Checking ───

import { ALL_BADGES } from './badges';

/**
 * Check and unlock new badges based on current progress.
 * Only adds badges whose condition is met and aren't already unlocked.
 */
export function checkAndUnlockBadges(progress: UserProgress): {
  progress: UserProgress;
  newBadges: string[];
} {
  const unlockedSet = new Set(progress.badgesUnlocked);
  const newBadges = ALL_BADGES
    .filter((badge) => !unlockedSet.has(badge.id) && badge.condition(progress))
    .map((badge) => badge.id);

  if (newBadges.length === 0) return { progress, newBadges: [] };

  return {
    progress: {
      ...progress,
      badgesUnlocked: [...progress.badgesUnlocked, ...newBadges],
    },
    newBadges,
  };
}

// ─── Convenience: Apply Action + Streak + Badges ───

/**
 * One-stop function: applies action XP, processes streak, checks badges.
 * Use this in your UI event handlers.
 */
export function applyUserAction(
  progress: UserProgress,
  action: ActionType | 'daily_streak',
  payload: ActionPayload = {},
  todayStr?: string,
  useFreeze: boolean = false
): { progress: UserProgress; newBadges: string[] } {
  let updated = { ...progress };

  if (action === 'daily_streak') {
    updated = processDailyStreak(updated, todayStr || getDateString(), useFreeze);
  } else {
    updated = awardXPForAction(updated, action, payload);
  }

  return checkAndUnlockBadges(updated);
}

// ─── Initial Progress Factory ───

export function createInitialProgress(userId: string, username: string): UserProgress {
  return {
    userId,
    username,
    totalXP: 0,
    streak: {
      currentStreak: 0,
      lastActivityDate: '',
      multiplier: 1,
      freezesAvailable: 1,
      lastFreezeResetDate: '',
    },
    badgesUnlocked: [],
    artworksViewed: 0,
    narrationsRead: 0,
    quizzesCompleted: 0,
    perfectQuizzes: 0,
    erasCompleted: 0,
    comparatorsUsed: 0,
    museumsExplored: 0,
    artworksShared: 0,
    friendsInvited: 0,
    totalFreezesUsed: 0,
  };
}

// ─── Leaderboard ───

export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => b.totalXP - a.totalXP);
}

export function getFilteredLeaderboard(
  entries: LeaderboardEntry[],
  region?: string,
  language?: string
): LeaderboardEntry[] {
  let filtered = entries;
  if (region) filtered = filtered.filter((e) => e.region === region);
  if (language) filtered = filtered.filter((e) => e.language === language);
  return sortLeaderboard(filtered);
}
