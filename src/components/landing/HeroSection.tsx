'use client';

/**
 * HeroSection — The Cinematic Landing Experience
 *
 * A slowly rotating 3D Earth with golden light beams emanating from
 * world-class museums, paired with bold typography and clear CTAs.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Two-column — text left, globe right (large)
 * - Landscape (568-1023px): Stacked — globe behind text with overlay
 * - Portrait (320-567px): Full-width stacked, globe compact at top
 */

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Star } from 'lucide-react';
import { HeroGlobeWrapper } from './HeroGlobeWrapper';
import { cn } from '@/lib/utils/cn';

export function HeroSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#0d0d1a] to-[#0a0a0f]" />

      {/* Subtle radial glow behind globe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-art-gold/5 blur-[120px] lg:h-[800px] lg:w-[800px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        {/* ─── Text Content ─── */}
        <div className="z-10 flex-1 pt-28 text-center sm:pt-24 lg:pt-0 lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-art-gold/20 bg-art-gold/10 px-4 py-1.5 text-xs font-semibold text-art-gold sm:text-sm">
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
              'mt-6 font-[var(--font-cormorant)] font-bold leading-[1.05] tracking-tight text-white',
              'text-[clamp(2.2rem,1.5rem+3.5vw,5rem)]'
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
              'mt-5 max-w-xl leading-relaxed text-white/50',
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
              href="/explore"
              className={cn(
                'group flex items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg shadow-art-gold/20 transition-all',
                'bg-art-gold hover:bg-art-gold-light hover:shadow-xl hover:shadow-art-gold/30 active:scale-[0.98]',
                'w-full px-7 py-4 text-base sm:w-auto sm:py-3.5 lg:px-8 lg:py-4 lg:text-lg'
              )}
            >
              <Globe2 className="h-5 w-5" />
              {t('hero.cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/timeline"
              className={cn(
                'group flex items-center justify-center gap-2 rounded-full font-medium transition-all',
                'text-white/60 hover:text-white',
                'w-full px-7 py-4 sm:w-auto sm:py-3.5',
                'border border-white/10 hover:border-white/20 hover:bg-white/5'
              )}
            >
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
              { value: '20', label: t('stats.museums') },
              { value: '7', label: t('stats.languages') },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-art-gold sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── 3D Globe ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className={cn(
            'relative flex-1',
            // Portrait: compact globe
            'mt-8 h-[320px]',
            // Landscape: medium
            'sm:mt-6 sm:h-[400px]',
            // Desktop: large, vertically centered
            'lg:mt-0 lg:h-[560px]'
          )}
        >
          <HeroGlobeWrapper />

          {/* "Click to explore" hint */}
          <a
            href="/explore"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/50 backdrop-blur-sm transition-all hover:border-art-gold/30 hover:text-art-gold sm:bottom-6"
          >
            <Globe2 className="h-3.5 w-3.5" />
            {t('hero.exploreGlobe')}
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-art-cream to-transparent dark:from-[#0a0a0f]" />
    </section>
  );
}
