/**
 * MŪSA Gamification System — Type Definitions
 *
 * Pure TypeScript types for the gamification engine.
 * No external dependencies. Framework-agnostic.
 */

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export type BadgeCategory =
  | 'exploration'
  | 'knowledge'
  | 'consistency'
  | 'social'
  | 'special';

export type Level = 'Starter' | 'Explorer' | 'Enthusiast' | 'Connoisseur';

export type ActionType =
  | 'view_artwork'
  | 'read_narration'
  | 'complete_quiz'
  | 'complete_era'
  | 'use_comparator'
  | 'explore_museum'
  | 'share_artwork'
  | 'invite_friend';

export interface ActionPayload {
  perfect?: boolean; // only for complete_quiz
}

export interface StreakData {
  currentStreak: number;
  lastActivityDate: string; // 'YYYY-MM-DD'
  multiplier: number;
  freezesAvailable: number; // max 1 per week
  lastFreezeResetDate: string;
}

export interface UserProgress {
  userId: string;
  username: string;
  totalXP: number;
  streak: StreakData;
  badgesUnlocked: string[];
  // Counters for badge conditions and XP
  artworksViewed: number;
  narrationsRead: number;
  quizzesCompleted: number;
  perfectQuizzes: number;
  erasCompleted: number;
  comparatorsUsed: number;
  museumsExplored: number;
  artworksShared: number;
  friendsInvited: number;
  totalFreezesUsed: number;
}

export interface BadgeDefinition {
  id: string;
  category: BadgeCategory;
  nameKey: string; // i18n key
  descriptionKey: string; // i18n key
  iconName: string; // Lucide icon name
  rarity: Rarity;
  condition: (progress: UserProgress) => boolean;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalXP: number;
  level: Level;
  region: string; // e.g. 'MX', 'ES', 'US'
  language: string; // e.g. 'es', 'en'
}
