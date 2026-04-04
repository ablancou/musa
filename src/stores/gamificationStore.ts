'use client';

/**
 * Gamification Store — Zustand + localStorage for guest, Supabase for auth users.
 *
 * Tracks XP, level, streak, badges locally. Syncs to server when authenticated.
 * Uses the pure gamification engine under the hood.
 */

import { create } from 'zustand';
import {
  type UserProgress,
  type ActionType,
  type ActionPayload,
  type Level,
  applyUserAction,
  createInitialProgress,
  getLevelFromXP,
  xpToNextLevel,
  getDateString,
  ALL_BADGES,
} from '@/lib/gamification';

const STORAGE_KEY = 'musa-gamification';

interface GamificationState {
  progress: UserProgress;
  /** Badges unlocked in the current session (for toast notifications) */
  recentBadges: string[];
  /** Whether XP was recently gained (for animation trigger) */
  lastXPGain: number;

  // Derived (computed in selectors, but cached for convenience)
  level: Level;
  nextLevelXP: number | null;

  // Actions
  performAction: (action: ActionType, payload?: ActionPayload) => void;
  processDailyStreak: (useFreeze?: boolean) => void;
  clearRecentBadges: () => void;
  resetProgress: () => void;
  loadFromStorage: () => void;
}

function saveToStorage(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

function loadFromStorage(): UserProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UserProgress;
  } catch {
    // Corrupt data — ignore
  }
  return null;
}

const initialProgress = createInitialProgress('guest', 'Guest');

export const useGamificationStore = create<GamificationState>((set, get) => ({
  progress: initialProgress,
  recentBadges: [],
  lastXPGain: 0,
  level: 'Starter',
  nextLevelXP: 500,

  performAction: (action: ActionType, payload: ActionPayload = {}) => {
    const { progress } = get();
    const prevXP = progress.totalXP;
    const result = applyUserAction(progress, action, payload);

    const newLevel = getLevelFromXP(result.progress.totalXP);
    const nextLevel = xpToNextLevel(result.progress.totalXP);

    saveToStorage(result.progress);

    set({
      progress: result.progress,
      recentBadges: result.newBadges.length > 0 ? result.newBadges : get().recentBadges,
      lastXPGain: result.progress.totalXP - prevXP,
      level: newLevel,
      nextLevelXP: nextLevel?.needed ?? null,
    });
  },

  processDailyStreak: (useFreeze = false) => {
    const { progress } = get();
    const todayStr = getDateString();
    const prevXP = progress.totalXP;
    const result = applyUserAction(progress, 'daily_streak', {}, todayStr, useFreeze);

    const newLevel = getLevelFromXP(result.progress.totalXP);
    const nextLevel = xpToNextLevel(result.progress.totalXP);

    saveToStorage(result.progress);

    set({
      progress: result.progress,
      recentBadges: result.newBadges.length > 0 ? result.newBadges : get().recentBadges,
      lastXPGain: result.progress.totalXP - prevXP,
      level: newLevel,
      nextLevelXP: nextLevel?.needed ?? null,
    });
  },

  clearRecentBadges: () => set({ recentBadges: [], lastXPGain: 0 }),

  resetProgress: () => {
    const fresh = createInitialProgress('guest', 'Guest');
    saveToStorage(fresh);
    set({
      progress: fresh,
      recentBadges: [],
      lastXPGain: 0,
      level: 'Starter',
      nextLevelXP: 500,
    });
  },

  loadFromStorage: () => {
    const stored = loadFromStorage();
    if (stored) {
      const level = getLevelFromXP(stored.totalXP);
      const nextLevel = xpToNextLevel(stored.totalXP);
      set({
        progress: stored,
        level,
        nextLevelXP: nextLevel?.needed ?? null,
      });
    }
  },
}));

/** Helper: get badge definition by ID */
export function getBadgeById(id: string) {
  return ALL_BADGES.find((b) => b.id === id);
}
