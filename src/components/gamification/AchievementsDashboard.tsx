'use client';

/**
 * Achievements Dashboard — Client Component
 *
 * Rich, animated gamification interface with:
 * - User level badge & XP progress
 * - Stats grid (artworks, quizzes, museums, narrations)
 * - 20-badge grid with rarity tiers
 * - Level progression ladder
 * - Daily streak calendar visualization
 *
 * Responsive: Desktop (multi-column), Landscape (2-col), Portrait (single column)
 * Dark mode: Full support with dark: variants
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  CheckCircle2,
  Map,
  Headphones,
  Trophy,
  Flame,
  Lock,
  Star,
  Shield,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useGamificationStore, getBadgeById } from '@/stores/gamificationStore';
import { ALL_BADGES, xpToNextLevel } from '@/lib/gamification';
import type { Level } from '@/lib/gamification';

// ═══ BREAKPOINT MODES ═══
// Desktop (1280px+): multi-column grid
// Landscape (640px-1023px): 2-column
// Portrait (up to 639px): single column stack

// ═══ RARITY COLOR MAP ═══
const RARITY_COLORS = {
  common: { border: '#94A3B8', bg: 'from-slate-100 to-slate-50' },
  rare: { border: '#3B82F6', bg: 'from-blue-100 to-blue-50' },
  epic: { border: '#8B5CF6', bg: 'from-purple-100 to-purple-50' },
  legendary: { border: '#C5932A', bg: 'from-amber-100 to-amber-50' },
};

const RARITY_COLORS_DARK = {
  common: { border: '#94A3B8', bg: 'from-slate-900 to-slate-800' },
  rare: { border: '#3B82F6', bg: 'from-blue-900 to-blue-800' },
  epic: { border: '#8B5CF6', bg: 'from-purple-900 to-purple-800' },
  legendary: { border: '#C5932A', bg: 'from-amber-900 to-amber-800' },
};

// ═══ LEVEL SYSTEM ═══
const LEVEL_ICONS: Record<Level, string> = {
  Starter: '🎨',
  Explorer: '🗺️',
  Enthusiast: '📚',
  Connoisseur: '👑',
};

const LEVEL_COLORS: Record<Level, string> = {
  Starter: 'from-emerald-400 to-emerald-600',
  Explorer: 'from-blue-400 to-blue-600',
  Enthusiast: 'from-purple-400 to-purple-600',
  Connoisseur: 'from-amber-400 to-amber-600',
};

interface BadgeModalState {
  isOpen: boolean;
  badgeId: string | null;
}

export function AchievementsDashboard() {
  const { progress, level } = useGamificationStore();
  const [mounted, setMounted] = useState(false);
  const [badgeModal, setBadgeModal] = useState<BadgeModalState>({ isOpen: false, badgeId: null });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextLevel = xpToNextLevel(progress.totalXP);
  const xpPercent = nextLevel
    ? Math.min(100, ((progress.totalXP - (getXpForCurrentLevel(level) || 0)) / nextLevel.needed) * 100)
    : 100;

  const unlockedBadges = progress.badgesUnlocked.length;
  const streakLength = progress.streak.currentStreak;
  const hasStreakFreeze = progress.streak.freezesAvailable > 0;

  const openBadgeModal = (badgeId: string) => {
    setBadgeModal({ isOpen: true, badgeId });
  };

  const closeBadgeModal = () => {
    setBadgeModal({ isOpen: false, badgeId: null });
  };

  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ═══ HEADER AREA ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Level Badge & XP */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Current Level Badge */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className={cn(
                'flex items-center gap-4 rounded-2xl p-6',
                'bg-gradient-to-br', LEVEL_COLORS[level],
                'shadow-lg dark:shadow-2xl'
              )}
            >
              <div className="text-5xl">{LEVEL_ICONS[level]}</div>
              <div className="text-white">
                <p className="text-sm font-medium opacity-90">Current Level</p>
                <p className="text-3xl font-bold">{level}</p>
                <p className="text-sm opacity-80">
                  {progress.totalXP.toLocaleString()} XP Total
                </p>
              </div>
            </motion.div>

            {/* Streak Badge */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 dark:bg-orange-900/20"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="h-6 w-6 text-orange-500" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-art-charcoal/60 dark:text-art-cream/60">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {streakLength} days
                </p>
                {hasStreakFreeze && (
                  <p className="text-xs text-orange-500">Freeze available</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* XP Progress Bar */}
          {nextLevel && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-art-charcoal dark:text-art-cream">
                  Progress to {nextLevel.next}
                </p>
                <p className="text-sm text-art-charcoal/60 dark:text-art-cream/60">
                  {nextLevel.needed.toLocaleString()} XP remaining
                </p>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-art-gold via-amber-400 to-art-gold shadow-md"
                />
              </div>
            </div>
          )}
        </motion.section>

        {/* ═══ STATS GRID ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Artworks Viewed */}
          <StatCard
            icon={Eye}
            label="Artworks Viewed"
            value={progress.artworksViewed}
            milestone={100}
            color="from-cyan-400 to-cyan-600"
          />

          {/* Quizzes Completed */}
          <StatCard
            icon={CheckCircle2}
            label="Quizzes Completed"
            value={progress.quizzesCompleted}
            milestone={50}
            color="from-green-400 to-green-600"
          />

          {/* Museums Explored */}
          <StatCard
            icon={Map}
            label="Museums Explored"
            value={progress.museumsExplored}
            milestone={10}
            color="from-purple-400 to-purple-600"
          />

          {/* Narrations Heard */}
          <StatCard
            icon={Headphones}
            label="Narrations Heard"
            value={progress.narrationsRead}
            milestone={75}
            color="from-rose-400 to-rose-600"
          />
        </motion.section>

        {/* ═══ BADGES SECTION ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-art-charcoal dark:text-art-cream">
              Badges & Achievements
            </h2>
            <p className="text-sm font-medium text-art-charcoal/60 dark:text-art-cream/60">
              {unlockedBadges}/{ALL_BADGES.length} Unlocked
            </p>
          </div>

          {/* Badge Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <AnimatePresence>
              {ALL_BADGES.map((badge, idx) => {
                const isUnlocked = progress.badgesUnlocked.includes(badge.id);
                const rarityColor = isUnlocked ? RARITY_COLORS[badge.rarity] : RARITY_COLORS.common;
                const rarityColorDark = isUnlocked
                  ? RARITY_COLORS_DARK[badge.rarity]
                  : RARITY_COLORS_DARK.common;

                return (
                  <motion.button
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => isUnlocked && openBadgeModal(badge.id)}
                    disabled={!isUnlocked}
                    className={cn(
                      'relative h-32 overflow-hidden rounded-xl p-4 text-center transition-all',
                      'disabled:cursor-default',
                      isUnlocked
                        ? 'hover:shadow-lg dark:hover:shadow-xl'
                        : 'opacity-60',
                      'bg-gradient-to-br', isUnlocked ? rarityColor.bg : rarityColorDark.bg
                    )}
                    style={{
                      borderWidth: '2px',
                      borderColor: isUnlocked ? rarityColor.border : '#cbd5e1',
                    }}
                  >
                    {/* Glow effect for unlocked */}
                    {isUnlocked && (
                      <motion.div
                        animate={{
                          boxShadow: [
                            `0 0 20px ${rarityColor.border}80`,
                            `0 0 40px ${rarityColor.border}40`,
                            `0 0 20px ${rarityColor.border}80`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0"
                      />
                    )}

                    {/* Lock Icon for Locked */}
                    {!isUnlocked && (
                      <div className="flex h-full items-center justify-center">
                        <Lock className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    {/* Unlocked Badge Content */}
                    {isUnlocked && (
                      <div className="flex flex-col items-center justify-center h-full relative z-10">
                        <BadgeIcon iconName={badge.iconName} />
                        <p className="mt-2 text-xs font-bold text-art-charcoal dark:text-art-cream truncate px-1">
                          {badge.nameKey.split('.')[1]}
                        </p>
                      </div>
                    )}

                    {/* Locked Badge Content */}
                    {!isUnlocked && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-xl font-bold text-gray-400">???</p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ═══ LEVEL PROGRESSION ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-art-charcoal dark:text-art-cream">
            Level Progression
          </h2>

          <div className="space-y-3">
            {['Starter', 'Explorer', 'Enthusiast', 'Connoisseur'].map((lvl, idx) => {
              const isCurrentLevel = lvl === level;
              const nextThreshold = getLevelThreshold(lvl as Level);
              const prevThreshold = idx > 0 ? getLevelThreshold(['Starter', 'Explorer', 'Enthusiast', 'Connoisseur'][idx - 1] as Level) : 0;

              return (
                <motion.div
                  key={lvl}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    'flex items-center gap-4 rounded-lg p-4 transition-all',
                    isCurrentLevel
                      ? 'bg-gradient-to-r from-art-gold/20 to-amber-200/20 dark:from-art-gold/10 dark:to-amber-900/10'
                      : 'bg-gray-100 dark:bg-gray-900/50'
                  )}
                >
                  {isCurrentLevel && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="h-3 w-3 rounded-full bg-art-gold" />
                    </motion.div>
                  )}
                  {!isCurrentLevel && <div className="h-3 w-3 rounded-full bg-gray-400" />}

                  <div className="flex-1">
                    <p className={cn(
                      'font-bold text-lg',
                      isCurrentLevel
                        ? 'text-art-gold dark:text-amber-300'
                        : 'text-art-charcoal dark:text-art-cream'
                    )}>
                      {lvl}
                    </p>
                    <p className="text-sm text-art-charcoal/60 dark:text-art-cream/60">
                      {nextThreshold.toLocaleString()} XP
                    </p>
                  </div>

                  {isCurrentLevel && (
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-art-gold text-art-charcoal dark:text-art-cream">
                      Current
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══ DAILY STREAK CALENDAR ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-art-charcoal dark:text-art-cream">
            Daily Streak
          </h2>

          <div className="rounded-lg bg-white dark:bg-gray-900 p-6 shadow-sm dark:shadow-lg">
            <StreakCalendar
              streak={progress.streak}
              hasFreeze={hasStreakFreeze}
            />
          </div>
        </motion.section>
      </div>

      {/* ═══ BADGE MODAL ═══ */}
      <BadgeModal
        badge={badgeModal.badgeId ? ALL_BADGES.find(b => b.id === badgeModal.badgeId) : null}
        isOpen={badgeModal.isOpen}
        onClose={closeBadgeModal}
      />
    </div>
  );
}

// ═══ COMPONENTS ═══

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  milestone: number;
  color: string;
}

function StatCard({ icon: Icon, label, value, milestone, color }: StatCardProps) {
  const progress = Math.min(100, (value / milestone) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'relative overflow-hidden rounded-xl p-5',
        'bg-white dark:bg-gray-900',
        'shadow-sm dark:shadow-lg',
        'border border-gray-200 dark:border-gray-800'
      )}
    >
      <div className="relative z-10 flex flex-col gap-3">
        <div className={cn('bg-gradient-to-br', color, 'rounded-lg w-fit p-2')}>
          <Icon className="h-5 w-5 text-white" />
        </div>

        <div>
          <p className="text-sm font-medium text-art-charcoal/60 dark:text-art-cream/60">
            {label}
          </p>
          <p className="text-3xl font-bold text-art-charcoal dark:text-art-cream">
            {value}
          </p>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center gap-2">
          <div className="h-1 flex-1 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn('h-full bg-gradient-to-r', color)}
            />
          </div>
          <p className="text-xs text-art-charcoal/50 dark:text-art-cream/50 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function BadgeIcon({ iconName }: { iconName: string }) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    eye: Eye,
    map: Map,
    globe: () => <span className="text-2xl">🌍</span>,
    layers: () => <span className="text-2xl">📚</span>,
    search: () => <span className="text-2xl">🔍</span>,
    'book-open': () => <span className="text-2xl">📖</span>,
    'clipboard-check': CheckCircle2,
    award: Award,
    landmark: () => <span className="text-2xl">🏛️</span>,
    scroll: () => <span className="text-2xl">📜</span>,
    flame: Flame,
    zap: () => <span className="text-2xl">⚡</span>,
    calendar: () => <span className="text-2xl">📅</span>,
    shield: Shield,
    infinity: () => <span className="text-2xl">∞</span>,
    'share-2': () => <span className="text-2xl">🔗</span>,
    users: () => <span className="text-2xl">👥</span>,
    megaphone: () => <span className="text-2xl">📣</span>,
    sparkles: () => <span className="text-2xl">✨</span>,
    crown: () => <span className="text-2xl">👑</span>,
  };

  const Icon = iconMap[iconName as keyof typeof iconMap];

  if (Icon) {
    // Custom emoji icon
    return (Icon as () => React.ReactElement)();
  }

  // Lucide icon fallback
  const LucideIcon = Star;
  return <LucideIcon className="h-6 w-6 text-art-gold" />;
}

interface StreakCalendarProps {
  streak: {
    currentStreak: number;
    lastActivityDate: string;
    freezesAvailable: number;
  };
  hasFreeze: boolean;
}

function StreakCalendar({ streak, hasFreeze }: StreakCalendarProps) {
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const getLast7ActiveDates = () => {
    const today = new Date();
    const active = [];
    for (let i = 0; i < streak.currentStreak && i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      active.push(d.toISOString().split('T')[0]);
    }
    return active;
  };

  const activeDates = getLast7ActiveDates();

  const getStreakMessage = (days: number) => {
    if (days === 0) return 'Start your streak today!';
    if (days === 1) return 'Great start! Keep it going!';
    if (days === 7) return 'One week on fire! 🔥';
    if (days === 30) return 'A month of dedication!';
    if (days >= 100) return 'A legend is born!';
    return `${days} days of consistency!`;
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="flex gap-2">
        {last7Days.map((date, idx) => {
          const dateStr = date.toISOString().split('T')[0];
          const isActive = activeDates.includes(dateStr);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-xs font-medium text-art-charcoal/50 dark:text-art-cream/50">
                {dayName}
              </p>
              <motion.div
                animate={
                  isActive
                    ? {
                      boxShadow: [
                        '0 0 0 0 rgba(249, 115, 22, 0.4)',
                        '0 0 0 8px rgba(249, 115, 22, 0)',
                      ],
                    }
                    : {}
                }
                transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                className={cn(
                  'h-12 w-12 rounded-lg flex items-center justify-center font-bold transition-all',
                  isActive
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                )}
              >
                {isActive ? '✓' : ''}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Message */}
      <div className="flex items-center gap-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-4">
        <span className="text-2xl">{streak.currentStreak > 0 ? '🔥' : '💡'}</span>
        <div>
          <p className="font-medium text-art-charcoal dark:text-art-cream">
            {getStreakMessage(streak.currentStreak)}
          </p>
          {hasFreeze && (
            <p className="text-sm text-blue-600 dark:text-blue-300">
              You have a freeze available this week
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface BadgeModalProps {
  badge: any | null;
  isOpen: boolean;
  onClose: () => void;
}

function BadgeModal({ badge, isOpen, onClose }: BadgeModalProps) {
  if (!badge) return null;

  const rarity = badge.rarity as keyof typeof RARITY_COLORS;
  const rarityColor = RARITY_COLORS[rarity];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw]',
              'rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-2xl'
            )}
          >
            {/* Badge Icon */}
            <div
              className={cn(
                'mb-4 mx-auto h-24 w-24 flex items-center justify-center rounded-xl',
                'bg-gradient-to-br', rarityColor.bg
              )}
              style={{ borderWidth: '3px', borderColor: rarityColor.border }}
            >
              <BadgeIcon iconName={badge.iconName} />
            </div>

            {/* Content */}
            <h3 className="text-center text-xl font-bold text-art-charcoal dark:text-art-cream mb-2">
              {badge.nameKey.split('.')[1]}
            </h3>

            <p className="text-center text-sm text-art-charcoal/70 dark:text-art-cream/70 mb-4">
              {badge.descriptionKey}
            </p>

            {/* Rarity Badge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: rarityColor.border }}
              />
              <span className="text-sm font-medium text-art-charcoal/60 dark:text-art-cream/60 capitalize">
                {rarity}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg bg-art-gold text-art-charcoal dark:text-art-cream font-medium transition-all hover:bg-art-gold/90"
            >
              Close
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ═══ HELPERS ═══

function getLevelThreshold(level: Level): number {
  const thresholds: Record<Level, number> = {
    Starter: 0,
    Explorer: 500,
    Enthusiast: 2000,
    Connoisseur: 5000,
  };
  return thresholds[level];
}

function getXpForCurrentLevel(level: Level): number {
  const thresholds: Record<Level, number> = {
    Starter: 0,
    Explorer: 500,
    Enthusiast: 2000,
    Connoisseur: 5000,
  };
  return thresholds[level];
}
