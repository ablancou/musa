/**
 * Responsive Modes:
 * - Desktop (>=1024px): Wide banner with gradient bg, centered text, large CTA
 * - Landscape (568-1023px): Slightly compressed, same layout
 * - Portrait (320-567px): Full-width, stacked, larger touch targets
 */

'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export function CTASection() {
  const { t } = useTranslation('landing');

  return (
    <section className="relative overflow-hidden bg-art-navy py-16 sm:py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-art-gold blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-art-wine blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Sparkles className="h-10 w-10 text-art-gold sm:h-12 sm:w-12" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2.5vw,3.5rem)] font-bold text-white"
        >
          {t('cta.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base text-white/60 sm:text-lg lg:text-xl"
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <a
            href="/register"
            className={cn(
              'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all',
              'bg-art-gold text-white shadow-xl hover:bg-art-gold-light hover:shadow-2xl active:scale-[0.98]',
              'w-full px-8 py-4 text-base sm:w-auto sm:py-4 sm:text-lg lg:px-10 lg:py-5 lg:text-xl'
            )}
          >
            {t('cta.button')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 sm:gap-6 sm:text-sm"
        >
          <span>✓ {t('stats.free')}</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ 7 {t('stats.languages')}</span>
          <span className="hidden sm:inline">·</span>
          <span>✓ {t('stats.artworks')}</span>
        </motion.div>
      </div>
    </section>
  );
}
