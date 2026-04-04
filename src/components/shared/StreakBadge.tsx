'use client';

/**
 * StreakBadge — Compact streak & XP display for the Header navbar.
 *
 * Shows: flame icon + streak count + XP pill.
 * Animated on XP gain. Click reveals mini-profile dropdown.
 *
 * Responsive Modes:
 * - Desktop (≥1024px): Full display with streak + XP + level
 * - Landscape (568-1023px): Streak + XP only
 * - Portrait (320-567px): Just flame + streak number
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Flame, Sparkles } from 'lucide-react';
import { useGamificationStore } from '@/stores/gamificationStore';

export function StreakBadge() {
  const { t } = useTranslation('gamification');
  const { progress, level, lastXPGain, loadFromStorage } = useGamificationStore();

  // Load from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const streak = progress.streak.currentStreak;
  const hasStreak = streak > 0;

  return (
    <div className="flex items-center gap-1.5">
      {/* Streak flame */}
      <div className="flex items-center gap-1 rounded-full bg-art-charcoal/5 px-2 py-1 dark:bg-white/5">
        <Flame
          className={`h-3.5 w-3.5 transition-colors ${
            hasStreak
              ? 'text-orange-500 drop-shadow-[0_0_4px_rgba(249,115,22,0.5)]'
              : 'text-art-charcoal/30 dark:text-white/30'
          }`}
        />
        <span
          className={`text-xs font-semibold tabular-nums ${
            hasStreak
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-art-charcoal/40 dark:text-white/40'
          }`}
        >
          {streak}
        </span>
      </div>

      {/* XP pill — hidden on portrait */}
      <div className="hidden items-center gap-1 rounded-full bg-art-gold/10 px-2 py-1 sm:flex">
        <Sparkles className="h-3 w-3 text-art-gold" />
        <span className="text-xs font-semibold text-art-gold tabular-nums">
          {progress.totalXP.toLocaleString()}
        </span>
      </div>

      {/* XP gain animation */}
      <AnimatePresence>
        {lastXPGain > 0 && (
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute -top-4 right-0 text-xs font-bold text-art-gold"
          >
            +{lastXPGain}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
