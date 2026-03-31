'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Gauge, BookOpen } from 'lucide-react';
import NarrativeRenderer from '@/components/lessons/NarrativeRenderer';
import type { Lesson } from '@/data/lessons/van-gogh-starry-night';

/**
 * VIEWPORT GUIDE (Triple Responsive):
 * - Mobile (sp):  0-567px   | 1 column | full padding
 * - Tablet (md):  568-767px | 2 columns | medium padding
 * - Desktop (lg): 768px+    | 3 columns | generous padding
 */

interface LessonContentProps {
  lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const { t, i18n } = useTranslation(['lessons', 'common']);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSpanish = i18n.language === 'es';
  const title = isSpanish ? lesson.titleEs : lesson.titleEn;
  const artist = isSpanish ? lesson.artistEs : lesson.artistEn;
  const era = isSpanish ? lesson.eraEs : lesson.eraEn;
  const difficulty = isSpanish
    ? t(`lessons:lesson.difficulty.${lesson.difficulty}`)
    : t(`lessons:lesson.difficulty.${lesson.difficulty}`);

  return (
    <div className="min-h-screen bg-art-cream">
      {/* Progress bar */}
      {isClient && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-art-gold/20 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-art-gold to-art-wine"
            style={{ width: `${scrollProgress}%` }}
            transition={{ type: 'linear', duration: 0 }}
          />
        </div>
      )}

      {/* Hero section with parallax */}
      <section className="relative w-full h-screen sm:h-screen md:h-screen lg:h-screen overflow-hidden">
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          style={{
            y: isClient
              ? Math.min(scrollProgress / 2, 50)
              : 0,
          }}
        >
          <Image
            src={lesson.imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p
              className="font-serif text-base sm:text-lg md:text-xl text-art-cream/80 mb-4 sm:mb-6 tracking-wide uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {era}
            </motion.p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white mb-4 sm:mb-6 md:mb-8">
              {title}
            </h1>

            <motion.p
              className="font-serif text-xl sm:text-2xl md:text-3xl text-art-cream/90 font-light mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {artist}
            </motion.p>

            {/* Metadata cards */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Duration */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-art-gold" />
                <span className="font-serif text-xs sm:text-sm md:text-base text-white">
                  {lesson.durationMinutes} min
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-art-gold" />
                <span className="font-serif text-xs sm:text-sm md:text-base text-white capitalize">
                  {difficulty}
                </span>
              </div>

              {/* Year */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/20">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-art-gold" />
                <span className="font-serif text-xs sm:text-sm md:text-base text-white">
                  {lesson.yearCreated}
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-art-gold hover:bg-art-gold-light text-white font-serif font-semibold rounded-lg transition-all duration-300 text-base sm:text-lg active:scale-95"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('lessons:lesson.startLesson', 'Comenzar Lección')}
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="font-serif text-sm text-white/60">Desplázate</p>
              <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artist info card */}
      <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border-t-4 border-art-gold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Meta info */}
            <div>
              <p className="font-serif text-xs sm:text-sm uppercase tracking-widest text-art-gold mb-2">
                {t('lessons:lesson.era', 'Era')}
              </p>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-art-charcoal">
                {era}
              </p>
            </div>

            <div>
              <p className="font-serif text-xs sm:text-sm uppercase tracking-widest text-art-gold mb-2">
                {t('lessons:lesson.artist', 'Artista')}
              </p>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-art-charcoal">
                {artist}
              </p>
            </div>

            <div>
              <p className="font-serif text-xs sm:text-sm uppercase tracking-widest text-art-gold mb-2">
                {t('lessons:lesson.difficulty', 'Dificultad')}
              </p>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-art-charcoal capitalize">
                {difficulty}
              </p>
            </div>

            <div>
              <p className="font-serif text-xs sm:text-sm uppercase tracking-widest text-art-gold mb-2">
                {t('lessons:lesson.duration', 'Duración')}
              </p>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-art-charcoal">
                {lesson.durationMinutes} min
              </p>
            </div>

            <div>
              <p className="font-serif text-xs sm:text-sm uppercase tracking-widest text-art-gold mb-2">
                Año
              </p>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-art-charcoal">
                {lesson.yearCreated}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Narrative content */}
      <section className="w-full">
        <NarrativeRenderer
          blocks={lesson.narrativeBlocks}
          artworkUrl={lesson.imageUrl}
        />
      </section>

      {/* Related artworks section */}
      {lesson.relatedArtworks.length > 0 && (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-art-charcoal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Obras Relacionadas
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {lesson.relatedArtworks.map((artwork, idx) => (
                <motion.div
                  key={idx}
                  className="bg-art-cream rounded-lg overflow-hidden border border-art-gold/20 hover:border-art-gold transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative w-full h-64 sm:h-72">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.titleEs}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-6">
                    <p className="font-serif text-sm text-art-gold mb-2">
                      {artwork.year}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-art-charcoal mb-3">
                      {isSpanish ? artwork.titleEs : artwork.titleEn}
                    </h3>
                    <p className="font-serif text-sm sm:text-base text-art-charcoal/70 leading-relaxed">
                      {isSpanish
                        ? artwork.descriptionEs
                        : artwork.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Music connections section */}
      {lesson.musicConnections.length > 0 && (
        <section className="w-full bg-gradient-to-br from-art-navy/5 to-art-wine/5 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-art-charcoal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Conexiones Musicales
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {lesson.musicConnections.map((connection, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-lg p-6 sm:p-8 border-2 border-art-gold/20 hover:border-art-gold transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <p className="font-serif text-sm text-art-gold uppercase tracking-widest mb-2">
                    {connection.composer}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-art-charcoal mb-2">
                    {connection.piece}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-art-charcoal/60 mb-4">
                    {connection.era}
                  </p>

                  <p className="font-serif text-sm sm:text-base text-art-charcoal leading-relaxed mb-6">
                    {isSpanish
                      ? connection.explanationEs
                      : connection.explanationEn}
                  </p>

                  {connection.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${connection.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-art-gold/10 hover:bg-art-gold/20 text-art-gold font-serif font-semibold rounded transition-colors text-sm sm:text-base"
                    >
                      Escuchar en YouTube
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="w-full bg-art-charcoal text-art-cream py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-art-gold/10 hover:bg-art-gold/20 rounded-lg transition-colors font-serif text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Anterior</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-art-gold/10 hover:bg-art-gold/20 rounded-lg transition-colors font-serif text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
