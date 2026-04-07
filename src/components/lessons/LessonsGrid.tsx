'use client';

/**
 * LessonsGrid — Cinematic lesson cards with museum-quality presentation.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): 3-column grid, large cards with hover parallax
 * - Landscape (568-1023px): 2-column grid, medium cards
 * - Portrait (320-567px): Single column, full-width cards with swipe feel
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Gauge, Music, ChevronRight, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

// ─── Lesson Catalog (will grow as we add more) ───
interface LessonCard {
  slug: string;
  titleKey: string;
  artistKey: string;
  eraKey: string;
  movement: string;
  year: number;
  duration: number;
  difficulty: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
  imageUrl: string;
  accentColor: string;
  available: boolean;
  musicHint: string;
}

const LESSONS_CATALOG: LessonCard[] = [
  {
    slug: 'van-gogh-starry-night',
    titleKey: 'lessons.catalog.starryNight.title',
    artistKey: 'lessons.catalog.starryNight.artist',
    eraKey: 'lessons.catalog.starryNight.era',
    movement: 'post-impressionism',
    year: 1889,
    duration: 15,
    difficulty: 'starter',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    accentColor: '#2E5090',
    available: true,
    musicHint: 'Debussy — Clair de Lune',
  },
  {
    slug: 'mona-lisa',
    titleKey: 'lessons.catalog.monaLisa.title',
    artistKey: 'lessons.catalog.monaLisa.artist',
    eraKey: 'lessons.catalog.monaLisa.era',
    movement: 'high-renaissance',
    year: 1503,
    duration: 15,
    difficulty: 'starter',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    accentColor: '#8B6914',
    available: true,
    musicHint: 'Josquin des Prez — Ave Maria',
  },
  {
    slug: 'klimt-the-kiss',
    titleKey: 'lessons.catalog.theKiss.title',
    artistKey: 'lessons.catalog.theKiss.artist',
    eraKey: 'lessons.catalog.theKiss.era',
    movement: 'art-nouveau',
    year: 1908,
    duration: 14,
    difficulty: 'explorer',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
    accentColor: '#C5932A',
    available: true,
    musicHint: 'Mahler — Adagietto',
  },
  {
    slug: 'monet-water-lilies',
    titleKey: 'lessons.catalog.waterLilies.title',
    artistKey: 'lessons.catalog.waterLilies.artist',
    eraKey: 'lessons.catalog.waterLilies.era',
    movement: 'impressionism',
    year: 1906,
    duration: 15,
    difficulty: 'explorer',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
    accentColor: '#4A7BA7',
    available: true,
    musicHint: 'Ravel — Jeux d\'eau',
  },
  {
    slug: 'girl-pearl-earring',
    titleKey: 'lessons.catalog.girlPearl.title',
    artistKey: 'lessons.catalog.girlPearl.artist',
    eraKey: 'lessons.catalog.girlPearl.era',
    movement: 'baroque',
    year: 1665,
    duration: 12,
    difficulty: 'starter',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg',
    accentColor: '#4A0E0E',
    available: true,
    musicHint: 'Bach — Cello Suite No. 1',
  },
  {
    slug: 'hokusai-great-wave',
    titleKey: 'lessons.catalog.greatWave.title',
    artistKey: 'lessons.catalog.greatWave.artist',
    eraKey: 'lessons.catalog.greatWave.era',
    movement: 'ukiyo-e',
    year: 1831,
    duration: 13,
    difficulty: 'explorer',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg',
    accentColor: '#B22222',
    available: true,
    musicHint: 'Debussy — La Mer',
  },
];

const DIFFICULTY_COLORS = {
  starter: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  explorer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  enthusiast: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  connoisseur: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

type FilterDifficulty = 'all' | 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';

export function LessonsGrid() {
  const { t } = useTranslation('lessons');
  const [filter, setFilter] = useState<FilterDifficulty>('all');

  const filtered = filter === 'all'
    ? LESSONS_CATALOG
    : LESSONS_CATALOG.filter((l) => l.difficulty === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-art-charcoal">
      {/* Header */}
      <div className="border-b border-art-charcoal/5 dark:border-white/5 bg-white/50 dark:bg-art-charcoal/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[var(--font-cormorant)] text-[clamp(2rem,1.5rem+2.5vw,4rem)] font-bold text-art-charcoal dark:text-white"
          >
            {t('lesson.catalogTitle', 'Lecciones Cinematográficas')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-art-charcoal/60 dark:text-white/60 text-sm sm:text-base"
          >
            {t('lesson.catalogSubtitle', 'Cada lección es una experiencia inmersiva. No son datos: son historias que cambian tu forma de ver el arte.')}
          </motion.p>

          {/* Difficulty filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {(['all', 'starter', 'explorer', 'enthusiast', 'connoisseur'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all min-h-[44px]',
                  filter === level
                    ? 'bg-art-charcoal dark:bg-white text-white dark:text-art-charcoal shadow-md'
                    : 'bg-art-charcoal/5 dark:bg-white/5 text-art-charcoal/60 dark:text-white/60 hover:bg-art-charcoal/10 dark:hover:bg-white/10'
                )}
              >
                {level === 'all'
                  ? t('lesson.filterAll', 'Todas')
                  : t(`lesson.difficulty.${level}`, level)}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson, idx) => (
            <motion.div
              key={lesson.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              <LessonCardComponent lesson={lesson} />
            </motion.div>
          ))}
        </div>

        {/* Coming soon message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-art-gold/10 px-6 py-3">
            <Sparkles className="h-4 w-4 text-art-gold" />
            <span className="text-sm font-medium text-art-gold">
              {t('lesson.moreComing', 'Más lecciones en desarrollo — próximamente')}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LessonCardComponent({ lesson }: { lesson: LessonCard }) {
  const { t } = useTranslation('lessons');

  const CardWrapper = lesson.available ? Link : 'div';
  const cardProps = lesson.available
    ? { href: `/lessons/${lesson.slug}` }
    : {};

  return (
    <CardWrapper
      {...(cardProps as any)}
      className={cn(
        'group relative block overflow-hidden rounded-2xl transition-all duration-500',
        lesson.available
          ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1'
          : 'opacity-75 cursor-default'
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-art-charcoal/10 dark:bg-white/5">
        <img
          src={lesson.imageUrl}
          alt={lesson.slug}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Lock overlay for unavailable */}
        {!lesson.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-white/70" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                {t('lesson.comingSoon', 'Próximamente')}
              </span>
            </div>
          </div>
        )}

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              DIFFICULTY_COLORS[lesson.difficulty]
            )}
          >
            {t(`lesson.difficulty.${lesson.difficulty}`, lesson.difficulty)}
          </span>
          <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
            {lesson.year}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/60">
            {t(lesson.eraKey, lesson.movement)}
          </p>
          <h3 className="mt-1 font-[var(--font-cormorant)] text-2xl font-bold text-white sm:text-3xl">
            {t(lesson.titleKey, lesson.slug)}
          </h3>
          <p className="mt-1 text-sm text-white/80">
            {t(lesson.artistKey, '')}
          </p>

          {/* Meta row */}
          <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{lesson.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-3 w-3" />
              <span>{lesson.musicHint}</span>
            </div>
          </div>

          {/* CTA */}
          {lesson.available && (
            <motion.div
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-art-gold"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span>{t('lesson.startLesson', 'Comenzar Lección')}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
