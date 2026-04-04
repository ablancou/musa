'use client';

/**
 * ArtworkOfTheDay — Cinematic daily artwork showcase
 *
 * Shows a different masterwork each day with a Ken Burns effect,
 * golden overlay gradient, artist details, and a call to explore.
 *
 * Responsive Modes:
 * - Desktop (≥1024px): Full-bleed immersive with side text panel
 * - Landscape (568-1023px): Overlay text on image, compact layout
 * - Portrait (320-567px): Stacked: image top, details bottom
 */

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Palette, ArrowRight, Music } from 'lucide-react';
import { ARTWORKS } from '@/data/museums/artworks';
import { getMuseum } from '@/data/museums/museums';
import { getMovement } from '@/data/museums/movements';

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function ArtworkOfTheDay() {
  const { t } = useTranslation('museums');
  const { t: tc } = useTranslation('common');
  const { t: tl } = useTranslation('landing');

  const artwork = useMemo(() => {
    const day = getDayOfYear();
    return ARTWORKS[day % ARTWORKS.length];
  }, []);

  const museum = getMuseum(artwork.museumId);
  const movement = getMovement(artwork.movement);

  return (
    <section className="relative overflow-hidden bg-art-cream dark:bg-[#0a0a0f]">
      {/* Full-bleed background image with Ken Burns */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0"
      >
        <img
          src={artwork.imageUrl}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-art-cream dark:from-[#0a0a0f] via-art-cream/80 dark:via-[#0a0a0f]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-art-cream dark:from-[#0a0a0f] via-transparent to-art-cream/30 dark:to-[#0a0a0f]/30" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr] lg:items-center lg:gap-16">
          {/* Text panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-art-gold/10 px-4 py-1.5 ring-1 ring-art-gold/20 dark:bg-art-gold/10 dark:ring-art-gold/20">
              <Calendar className="h-3.5 w-3.5 text-art-gold" />
              <span className="text-xs font-medium text-art-gold tracking-wide uppercase">
                {tl('artworkOfDay.badge')}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.5rem+2vw,3.5rem)] font-bold leading-tight text-art-charcoal dark:text-white">
              {t(artwork.titleKey)}
            </h2>

            {/* Artist */}
            <p className="mt-2 text-lg text-art-charcoal/60 dark:text-white/60 sm:text-xl">
              {artwork.artist}
              <span className="text-art-charcoal/30 dark:text-white/30"> · </span>
              <span className="text-art-gold">{artwork.year}</span>
            </p>

            {/* Metadata chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {movement && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-art-charcoal dark:text-white ring-1 ring-white/10"
                  style={{ backgroundColor: `${movement.color}30` }}
                >
                  <Palette className="h-3 w-3" />
                  {t(movement.nameKey)}
                </span>
              )}
              {museum && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-art-charcoal/5 dark:bg-white/5 px-3 py-1 text-xs text-art-charcoal/70 dark:text-white/70 ring-1 ring-art-charcoal/10 dark:ring-white/10">
                  <MapPin className="h-3 w-3" />
                  {museum.city}
                </span>
              )}
              {artwork.musicConnection && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300 ring-1 ring-purple-500/20">
                  <Music className="h-3 w-3" />
                  {t(artwork.musicConnection.composerKey)}
                </span>
              )}
            </div>

            {/* Medium */}
            <p className="mt-4 text-sm text-art-charcoal/40 dark:text-white/40">
              {artwork.medium}
              {artwork.dimensions && ` · ${artwork.dimensions}`}
            </p>

            {/* CTA */}
            <Link
              href="/gallery"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-art-gold px-6 py-3 text-sm font-semibold text-art-charcoal dark:text-art-charcoal transition-all hover:bg-art-gold/90 hover:shadow-lg hover:shadow-art-gold/20"
            >
              {tl('artworkOfDay.explore')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Featured image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-art-charcoal/10 dark:ring-white/10">
              <img
                src={artwork.imageUrl}
                alt={artwork.titleOriginal}
                className="w-full object-contain bg-white dark:bg-[#1a1a1a]"
                style={{ maxHeight: '500px' }}
              />
              {/* Museum label */}
              {museum && (
                <div className="absolute bottom-3 right-3 rounded-lg bg-art-charcoal/60 dark:bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-[10px] text-art-charcoal/50 dark:text-white/50 uppercase tracking-wider">
                    {museum.city}
                  </p>
                  <p className="text-xs text-art-charcoal/80 dark:text-white/80">
                    {t(museum.nameKey)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
