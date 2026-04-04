'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): Horizontal path with connected level cards
 * - Landscape (568-1023px): 2x2 grid
 * - Portrait (320-567px): Vertical stack with connecting line
 */


import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Compass, Map, Heart, Crown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const LEVELS = [
  { key: 'starter', icon: Compass, color: 'from-emerald-400 to-emerald-600', num: '01' },
  { key: 'explorer', icon: Map, color: 'from-sky-400 to-sky-600', num: '02' },
  { key: 'enthusiast', icon: Heart, color: 'from-purple-400 to-purple-600', num: '03' },
  { key: 'connoisseur', icon: Crown, color: 'from-art-gold to-yellow-600', num: '04' },
] as const;

export function LevelsSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="bg-art-cream py-16 sm:py-20 lg:py-28 dark:bg-art-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold text-art-charcoal dark:text-white"
          >
            {t('levels.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-art-charcoal/60 dark:text-white/60 text-base sm:text-lg"
          >
            {t('levels.subtitle')}
          </motion.p>
        </div>

        {/* Levels Path */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          {/* Desktop: horizontal row */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {LEVELS.map((level, i) => {
              const Icon = level.icon;
              return (
                <motion.div
                  key={level.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative"
                >
                  {/* Connector line — desktop only */}
                  {i < LEVELS.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 translate-x-full bg-art-charcoal/15 dark:bg-white/15 lg:block" />
                  )}

                  <div
                    className={cn(
                      'relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 p-6 shadow-sm transition-all duration-300',
                      'hover:shadow-md hover:-translate-y-1',
                      'sm:p-7'
                    )}
                  >
                    {/* Level number */}
                    <span className="absolute right-4 top-4 font-[var(--font-cormorant)] text-4xl font-bold text-art-charcoal/5 dark:text-white/5 sm:text-5xl">
                      {level.num}
                    </span>

                    {/* Icon */}
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                        level.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mt-4 text-lg font-semibold text-art-charcoal dark:text-white">
                      {t(`levels.${level.key}.name`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-art-charcoal/60 dark:text-white/60">
                      {t(`levels.${level.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
