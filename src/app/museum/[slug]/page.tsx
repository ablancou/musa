'use client';

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  ArrowLeft,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MUSEUMS } from '@/data/museums/museums';
import { getArtworksByMuseum } from '@/data/museums/artworks';

export const dynamic = 'force-dynamic';

/**
 * Museum Detail Page
 * Individual museum experience with hero, links, and curated artworks gallery
 */

interface ArtworkCardProps {
  artwork: any;
  index: number;
}

function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const { t } = useTranslation(['museums', 'artworks']);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group bg-[#0a0a10]/60 backdrop-blur rounded-lg overflow-hidden border border-art-gold/20 hover:border-art-gold/50 transition-all duration-300"
    >
      {/* Artwork Image */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-[#000000]">
        <img
          src={artwork.imageUrl}
          alt={artwork.titleOriginal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060610]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Artwork Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-[var(--font-cormorant)] text-lg sm:text-xl text-art-cream font-semibold mb-2 line-clamp-2 group-hover:text-art-gold transition-colors">
          {t(`artworks.${artwork.titleKey}`, artwork.titleOriginal)}
        </h3>

        <div className="space-y-2 text-sm text-art-cream/70">
          <p className="font-medium text-art-gold/90">{artwork.artist}</p>
          <p className="text-xs">{artwork.year}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ExternalLinkButton({
  url,
  label,
  icon: Icon,
}: {
  url: string;
  label: string;
  icon: any;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-art-gold/20 hover:bg-art-gold/40 text-art-gold border border-art-gold/50 hover:border-art-gold rounded-lg transition-all duration-300 group/link"
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-[var(--font-cormorant)] font-semibold text-sm sm:text-base">
        {label}
      </span>
      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
    </a>
  );
}

export default function MuseumPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const { t, i18n } = useTranslation(['common', 'museums']);

  // Find museum by slug (id)
  const museum = useMemo(() => {
    return MUSEUMS.find((m) => m.id === slug);
  }, [slug]);

  // Get artworks for this museum
  const artworks = useMemo(() => {
    if (!museum) return [];
    return getArtworksByMuseum(museum.id);
  }, [museum]);

  // Loading state
  if (!museum) {
    return (
      <div className="min-h-screen bg-[#060610] flex flex-col">
        <Header variant="dark" />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-[var(--font-cormorant)] text-3xl sm:text-4xl text-art-cream mb-4">
              {t('museums.notFound', 'Museum not found')}
            </h1>
            <p className="text-art-cream/60 mb-8">
              {t('museums.notFoundDesc', 'The museum you are looking for does not exist.')}
            </p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-art-gold/20 hover:bg-art-gold/40 text-art-gold border border-art-gold/50 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back', 'Go back')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const museumName = t(`${museum.nameKey}`, museum.id);
  const museumDesc = t(`${museum.descriptionKey}`, '');

  return (
    <div className="min-h-screen bg-[#060610]">
      <Header />

      <main className="pt-0 lg:pt-0">
        {/* ════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ════════════════════════════════════════════════════════════ */}

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 sm:h-[500px] md:h-[600px] overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={museum.imageUrl}
            alt={museumName}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060610]/40 via-[#060610]/60 to-[#060610] z-10" />

          {/* Back Button (top-left) */}
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-4 sm:left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-[#060610]/80 backdrop-blur hover:bg-[#060610] text-art-gold border border-art-gold/30 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-[var(--font-cormorant)] font-semibold text-sm">
              {t('common.back', 'Back')}
            </span>
          </button>

          {/* Hero Content (bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16"
          >
            <h1 className="font-[var(--font-cormorant)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-art-cream mb-2 sm:mb-4 leading-tight">
              {museumName}
            </h1>

            {/* Location & Date */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-art-cream/80 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-art-gold" />
                <span>
                  {museum.city}, {museum.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-art-gold" />
                <span>{t('museums.founded', 'Founded')} {museum.foundedYear}</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* EXTERNAL LINKS SECTION */}
        {/* ════════════════════════════════════════════════════════════ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 border-b border-art-gold/10"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="font-[var(--font-cormorant)] text-2xl sm:text-3xl md:text-4xl font-bold text-art-cream mb-6 sm:mb-8">
              {t('museums.explore', 'Explore')}
            </h2>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              {/* Virtual Tour */}
              {museum.virtualTourUrl && (
                <ExternalLinkButton
                  url={museum.virtualTourUrl}
                  label={t('museums.virtualTour', 'Virtual Tour')}
                  icon={Globe2}
                />
              )}

              {/* Online Collection */}
              {museum.onlineCollectionUrl && (
                <ExternalLinkButton
                  url={museum.onlineCollectionUrl}
                  label={t('museums.onlineCollection', 'Online Collection')}
                  icon={ImageIcon}
                />
              )}

              {/* Official Website */}
              {museum.websiteUrl && (
                <ExternalLinkButton
                  url={museum.websiteUrl}
                  label={t('museums.officialWebsite', 'Official Website')}
                  icon={ExternalLink}
                />
              )}
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* ARTWORKS GALLERY */}
        {/* ════════════════════════════════════════════════════════════ */}

        <section className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            {artworks.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="mb-8 sm:mb-12"
                >
                  <h2 className="font-[var(--font-cormorant)] text-3xl sm:text-4xl md:text-5xl font-bold text-art-cream mb-2">
                    {t('museums.masterpieces', 'Masterpieces in This Museum')}
                  </h2>
                  <p className="text-art-cream/60 text-sm sm:text-base md:text-lg">
                    {artworks.length} {t('museums.artworksOnDisplay', 'artworks on display')}
                  </p>
                </motion.div>

                {/* Artworks Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {artworks.map((artwork, index) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center py-12 sm:py-16 md:py-20"
              >
                <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-art-gold/30 mb-4" />
                <h2 className="font-[var(--font-cormorant)] text-2xl sm:text-3xl text-art-cream mb-2">
                  {t('museums.noArtworks', 'No artworks available')}
                </h2>
                <p className="text-art-cream/60 text-sm sm:text-base">
                  {t('museums.noArtworksDesc', 'Artworks from this museum will be added soon.')}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/* CTA SECTION */}
        {/* ════════════════════════════════════════════════════════════ */}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 border-t border-art-gold/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-[var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-art-cream mb-6 sm:mb-8">
              {t('museums.explorMore', 'Explore More Museums')}
            </h2>

            <button
              onClick={() => router.push('/museums')}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-art-gold hover:bg-art-gold-light text-[#060610] font-[var(--font-cormorant)] font-bold text-base sm:text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {t('museums.allMuseums', 'Browse All Museums')}
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
