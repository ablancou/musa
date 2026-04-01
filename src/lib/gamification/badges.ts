/**
 * MŪSA Badge Definitions
 *
 * 20 badges across 5 categories with pure condition functions.
 * All nameKey/descriptionKey are i18n-ready for the 7-language system.
 */

import type { BadgeDefinition } from './types';
import { getLevelFromXP } from './engine';

export const ALL_BADGES: BadgeDefinition[] = [
  // ═══ EXPLORATION ═══
  {
    id: 'first_view',
    category: 'exploration',
    nameKey: 'badges.firstView.name',
    descriptionKey: 'badges.firstView.desc',
    iconName: 'eye',
    rarity: 'common',
    condition: (p) => p.artworksViewed >= 1,
  },
  {
    id: 'museum_wanderer',
    category: 'exploration',
    nameKey: 'badges.museumWanderer.name',
    descriptionKey: 'badges.museumWanderer.desc',
    iconName: 'map',
    rarity: 'common',
    condition: (p) => p.museumsExplored >= 1,
  },
  {
    id: 'globe_trotter',
    category: 'exploration',
    nameKey: 'badges.globeTrotter.name',
    descriptionKey: 'badges.globeTrotter.desc',
    iconName: 'globe',
    rarity: 'rare',
    condition: (p) => p.museumsExplored >= 5,
  },
  {
    id: 'comparator_expert',
    category: 'exploration',
    nameKey: 'badges.comparatorExpert.name',
    descriptionKey: 'badges.comparatorExpert.desc',
    iconName: 'layers',
    rarity: 'rare',
    condition: (p) => p.comparatorsUsed >= 10,
  },
  {
    id: 'art_seeker',
    category: 'exploration',
    nameKey: 'badges.artSeeker.name',
    descriptionKey: 'badges.artSeeker.desc',
    iconName: 'search',
    rarity: 'epic',
    condition: (p) => p.artworksViewed >= 100,
  },

  // ═══ KNOWLEDGE ═══
  {
    id: 'first_narration',
    category: 'knowledge',
    nameKey: 'badges.firstNarration.name',
    descriptionKey: 'badges.firstNarration.desc',
    iconName: 'book-open',
    rarity: 'common',
    condition: (p) => p.narrationsRead >= 1,
  },
  {
    id: 'quiz_novice',
    category: 'knowledge',
    nameKey: 'badges.quizNovice.name',
    descriptionKey: 'badges.quizNovice.desc',
    iconName: 'clipboard-check',
    rarity: 'common',
    condition: (p) => p.quizzesCompleted >= 1,
  },
  {
    id: 'perfect_scholar',
    category: 'knowledge',
    nameKey: 'badges.perfectScholar.name',
    descriptionKey: 'badges.perfectScholar.desc',
    iconName: 'award',
    rarity: 'rare',
    condition: (p) => p.perfectQuizzes >= 5,
  },
  {
    id: 'era_conqueror',
    category: 'knowledge',
    nameKey: 'badges.eraConqueror.name',
    descriptionKey: 'badges.eraConqueror.desc',
    iconName: 'landmark',
    rarity: 'rare',
    condition: (p) => p.erasCompleted >= 3,
  },
  {
    id: 'art_historian',
    category: 'knowledge',
    nameKey: 'badges.artHistorian.name',
    descriptionKey: 'badges.artHistorian.desc',
    iconName: 'scroll',
    rarity: 'epic',
    condition: (p) => p.erasCompleted >= 5 && p.quizzesCompleted >= 10,
  },

  // ═══ CONSISTENCY ═══
  {
    id: 'streak_beginner',
    category: 'consistency',
    nameKey: 'badges.streakBeginner.name',
    descriptionKey: 'badges.streakBeginner.desc',
    iconName: 'flame',
    rarity: 'common',
    condition: (p) => p.streak.currentStreak >= 1,
  },
  {
    id: 'week_warrior',
    category: 'consistency',
    nameKey: 'badges.weekWarrior.name',
    descriptionKey: 'badges.weekWarrior.desc',
    iconName: 'zap',
    rarity: 'rare',
    condition: (p) => p.streak.currentStreak >= 7,
  },
  {
    id: 'monthly_muse',
    category: 'consistency',
    nameKey: 'badges.monthlyMuse.name',
    descriptionKey: 'badges.monthlyMuse.desc',
    iconName: 'calendar',
    rarity: 'epic',
    condition: (p) => p.streak.currentStreak >= 30,
  },
  {
    id: 'freeze_master',
    category: 'consistency',
    nameKey: 'badges.freezeMaster.name',
    descriptionKey: 'badges.freezeMaster.desc',
    iconName: 'shield',
    rarity: 'rare',
    condition: (p) => p.totalFreezesUsed >= 1,
  },
  {
    id: 'streak_legend',
    category: 'consistency',
    nameKey: 'badges.streakLegend.name',
    descriptionKey: 'badges.streakLegend.desc',
    iconName: 'infinity',
    rarity: 'legendary',
    condition: (p) => p.streak.currentStreak >= 100,
  },

  // ═══ SOCIAL ═══
  {
    id: 'first_share',
    category: 'social',
    nameKey: 'badges.firstShare.name',
    descriptionKey: 'badges.firstShare.desc',
    iconName: 'share-2',
    rarity: 'common',
    condition: (p) => p.artworksShared >= 1,
  },
  {
    id: 'community_builder',
    category: 'social',
    nameKey: 'badges.communityBuilder.name',
    descriptionKey: 'badges.communityBuilder.desc',
    iconName: 'users',
    rarity: 'rare',
    condition: (p) => p.friendsInvited >= 3,
  },
  {
    id: 'art_ambassador',
    category: 'social',
    nameKey: 'badges.artAmbassador.name',
    descriptionKey: 'badges.artAmbassador.desc',
    iconName: 'megaphone',
    rarity: 'epic',
    condition: (p) => p.artworksShared >= 10,
  },

  // ═══ SPECIAL ═══
  {
    id: 'musa_pioneer',
    category: 'special',
    nameKey: 'badges.musaPioneer.name',
    descriptionKey: 'badges.musaPioneer.desc',
    iconName: 'sparkles',
    rarity: 'common',
    condition: (p) => p.totalXP > 0,
  },
  {
    id: 'connoisseur_legend',
    category: 'special',
    nameKey: 'badges.connoisseurLegend.name',
    descriptionKey: 'badges.connoisseurLegend.desc',
    iconName: 'crown',
    rarity: 'legendary',
    condition: (p) => getLevelFromXP(p.totalXP) === 'Connoisseur',
  },
];
