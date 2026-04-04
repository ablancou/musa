/**
 * MŪSA Gamification System
 * Public API — import everything from here.
 */

export type {
  Rarity,
  BadgeCategory,
  Level,
  ActionType,
  ActionPayload,
  StreakData,
  UserProgress,
  BadgeDefinition,
  LeaderboardEntry,
} from './types';

export {
  getLevelFromXP,
  xpToNextLevel,
  getDateString,
  processDailyStreak,
  awardXPForAction,
  checkAndUnlockBadges,
  applyUserAction,
  createInitialProgress,
  sortLeaderboard,
  getFilteredLeaderboard,
} from './engine';

export { ALL_BADGES } from './badges';
