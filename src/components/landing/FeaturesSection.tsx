'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): 3-column grid of feature cards
 * - Landscape (568-1023px): 2-column grid
 * - Portrait (320-567px): Single column, horizontal scroll optional
 */


import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Film,
  Music,
  Clock,
  Layers,
  Bot,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const FEATURES = [
  { key: 'narrative', icon: Film, color: 'text-art-wine', bg: 'bg-art-wine/10' },
  { key: 'music', icon: Music, color: 'text-purple-600', bg: 'bg-purple-600/10' },
  { key: 'timeline', icon: Clock, color: 'text-art-navy', bg: 'bg-art-navy/10' },
  { key: 'compare', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
  { key: 'ai', icon: Bot, color: 'text-sky-600', bg: 'bg-sky-600/10' },
  { key: 'gamification', icon: Trophy, color: 'text-art-gold', bg: 'bg-art-gold/10' },
] as const;

export function FeaturesSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold text-art-charcoal"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-art-charcoal/60 text-base sm:text-lg"
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
                  'bg-art-cream/50 hover:bg-art-cream',
                  'hover:shadow-lg hover:-translate-y-1',
                  'sm:p-7 lg:p-8'
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                    feature.bg
                  )}
                >
                  <Icon className={cn('h-6 w-6', feature.color)} />
                </div>

                {/* Text */}
                <h3 className="mt-4 text-lg font-semibold text-art-charcoal sm:text-xl">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-art-charcoal/60 sm:text-base">
                  {t(`features.${feature.key}.description`)}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-art-gold transition-all duration-300 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
