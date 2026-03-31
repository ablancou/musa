/**
 * Responsive Modes:
 * - Desktop (>=1024px): Two-column layout — text left, artwork showcase right with floating cards
 * - Landscape (568-1023px): Stacked but compact, reduced vertical spacing
 * - Portrait (320-567px): Full-width stacked, large typography, prominent CTA
 */

'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const ARTWORK_CARDS = [
  {
    title: 'La Noche Estrellada',
    artist: 'Van Gogh, 1889',
    gradient: 'from-blue-900 via-blue-700 to-yellow-400',
    rotate: '-3deg',
    delay: 0.2,
  },
  {
    title: 'La Gran Ola',
    artist: 'Hokusai, 1831',
    gradient: 'from-sky-600 via-white to-sky-200',
    rotate: '2deg',
    delay: 0.4,
  },
  {
    title: 'El Beso',
    artist: 'Klimt, 1908',
    gradient: 'from-yellow-600 via-amber-400 to-yellow-300',
    rotate: '-1deg',
    delay: 0.6,
  },
];

export function HeroSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="relative min-h-screen overflow-hidden bg-art-cream pt-24 sm:pt-20 lg:pt-0">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-art-cream via-white to-art-gold/5" />

      {/* Decorative floating shapes */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-art-gold/5 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-art-navy/5 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-art-gold/10 px-4 py-1.5 text-xs font-semibold text-art-gold sm:text-sm">
              <Star className="h-3.5 w-3.5 fill-art-gold" />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
              'mt-6 font-[var(--font-cormorant)] font-bold leading-[1.05] tracking-tight text-art-charcoal',
              'text-[clamp(2.5rem,1.5rem+4vw,5.5rem)]'
            )}
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              'mt-5 max-w-xl leading-relaxed text-art-charcoal/60',
              'text-base sm:text-lg lg:text-xl',
              'mx-auto lg:mx-0'
            )}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="/register"
              className={cn(
                'group flex items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg transition-all',
                'bg-art-gold hover:bg-art-gold-light hover:shadow-xl active:scale-[0.98]',
                'w-full px-7 py-4 text-base sm:w-auto sm:py-3.5 lg:px-8 lg:py-4 lg:text-lg'
              )}
            >
              {t('hero.cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/lessons"
              className={cn(
                'group flex items-center justify-center gap-2 rounded-full font-medium transition-all',
                'text-art-charcoal/70 hover:text-art-charcoal',
                'w-full px-7 py-4 sm:w-auto sm:py-3.5',
                'bg-art-charcoal/5 hover:bg-art-charcoal/10'
              )}
            >
              <Play className="h-4 w-4" />
              {t('hero.ctaSecondary')}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:justify-start"
          >
            {[
              { value: '500+', label: t('stats.artworks') },
              { value: '4,000', label: t('stats.years') },
              { value: '7', label: t('stats.languages') },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-art-charcoal sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-art-charcoal/50 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Artwork Showcase — Desktop & Landscape */}
        <div className="mt-12 flex flex-1 items-center justify-center lg:mt-0">
          <div className="relative h-[320px] w-full max-w-md sm:h-[380px] lg:h-[480px] lg:max-w-lg">
            {ARTWORK_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                transition={{ duration: 0.7, delay: card.delay }}
                className={cn(
                  'absolute rounded-2xl shadow-2xl overflow-hidden',
                  'ring-1 ring-white/20',
                  i === 0 && 'left-0 top-0 h-52 w-40 sm:h-64 sm:w-48 lg:h-80 lg:w-60',
                  i === 1 && 'right-4 top-8 h-44 w-36 sm:h-56 sm:w-44 lg:h-72 lg:w-52',
                  i === 2 && 'left-1/4 bottom-0 h-40 w-36 sm:h-52 sm:w-44 lg:h-64 lg:w-52'
                )}
              >
                <div className={cn('h-full w-full bg-gradient-to-br', card.gradient)} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">{card.title}</p>
                  <p className="text-[10px] text-white/70 sm:text-xs">{card.artist}</p>
                </div>
              </motion.div>
            ))}

            {/* Floating "Free" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -right-2 top-0 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-art-gold shadow-lg ring-1 ring-art-gold/20 sm:-right-4"
            >
              {t('stats.free')}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
