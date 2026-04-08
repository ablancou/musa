'use client';

/**
 * FeaturesSection — Showcase of MŪSA's Unique Features
 *
 * Each feature card displays a real masterwork from public domain
 * with a glass-morphism overlay describing the feature.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): 3-column grid, tall cards with artwork backgrounds
 * - Landscape (568-1023px): 2-column grid, medium cards
 * - Portrait (320-567px): Single column, horizontal artwork + text
 */

import Link from 'next/link';
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
  {
    key: 'narrative',
    icon: Film,
    href: '/gallery',
    // Van Gogh — Starry Night (MoMA, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    accent: 'from-blue-900/80',
  },
  {
    key: 'music',
    icon: Music,
    href: '/gallery',
    // Vermeer — Girl with a Pearl Earring (Mauritshuis, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
    accent: 'from-purple-900/80',
  },
  {
    key: 'timeline',
    icon: Clock,
    href: '/timeline',
    // Monet — Impression, Sunrise (Musée Marmottan, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg',
    accent: 'from-sky-900/80',
  },
  {
    key: 'compare',
    icon: Layers,
    href: '/compare',
    // Botticelli — Birth of Venus (Uffizi, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    accent: 'from-emerald-900/80',
  },
  {
    key: 'ai',
    icon: Bot,
    href: '/lessons',
    // Da Vinci — Mona Lisa (Louvre, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    accent: 'from-amber-900/80',
  },
  {
    key: 'gamification',
    icon: Trophy,
    href: '/lessons',
    // Hokusai — The Great Wave (Met Open Access, public domain)
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
    accent: 'from-art-navy/80',
  },
] as const;

export function FeaturesSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-28 dark:bg-art-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold text-art-charcoal dark:text-white"
          >
            {t('features.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-art-charcoal/60 text-base sm:text-lg dark:text-white/50"
          >
            {t('features.subtitle')}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.key} href={feature.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl transition-all duration-500',
                  'h-[280px] sm:h-[320px] lg:h-[360px]',
                  'hover:shadow-2xl hover:-translate-y-1 hover:shadow-art-gold/10',
                  'cursor-pointer'
                )}
              >
                {/* Background artwork image */}
                <div className="absolute inset-0">
                  <img
                    src={feature.image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Dark gradient overlay */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500',
                  feature.accent,
                  'via-black/40 opacity-80 group-hover:opacity-90'
                )} />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  {/* Icon pill */}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20 transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5 text-art-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {t(`features.${feature.key}.title`)}
                  </h3>

                  {/* Description — slides up on hover */}
                  <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                    {t(`features.${feature.key}.description`)}
                  </p>

                  {/* Gold accent line */}
                  <div className="mt-4 h-0.5 w-0 bg-art-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
