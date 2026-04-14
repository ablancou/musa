'use client';

/**
 * TimelineView — Vertical Card-Based Art History Timeline
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Two-column alternating layout with center timeline spine
 * - Landscape (568-1023px): Single column with left timeline spine
 * - Portrait (320-567px): Full-width stacked cards, compact timeline spine
 *
 * Design: Dark theme matching the Explore page aesthetic.
 * Each era is a card with artworks, music connection, and artists.
 * NO horizontal scroll, NO overlap — clean vertical flow.
 */

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Calendar, MapPin, X, ChevronDown } from 'lucide-react';
import { TIMELINE_ERAS, type TimelineEra, type TimelineArtwork } from '@/data/timeline/eras';
import { cn } from '@/lib/utils/cn';

// ─── Filters ───
type RegionFilter = 'all' | 'europe' | 'asia' | 'americas' | 'global';

// ─── Utility: year display ───
function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

// ─── Artwork Card ───
function ArtworkCard({
  artwork,
  onClick,
}: {
  artwork: TimelineArtwork;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex-shrink-0 w-32 h-44 sm:w-36 sm:h-48 overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-2xl"
    >
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/50" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
        <p className="text-xs font-semibold text-white leading-tight line-clamp-2">
          {artwork.title}
        </p>
        <p className="mt-0.5 text-[10px] text-white/70">
          {artwork.artist}, {formatYear(artwork.year)}
        </p>
      </div>
      <div className="absolute inset-0 rounded-xl ring-2 ring-transparent transition-all group-hover:ring-art-gold/50" />
    </motion.button>
  );
}

// ─── Artwork Detail Modal ───
function ArtworkModal({
  artwork,
  era,
  onClose,
}: {
  artwork: TimelineArtwork;
  era: TimelineEra;
  onClose: () => void;
}) {
  const { t } = useTranslation(['common', 'timeline']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#12121f] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <div className="p-5 sm:p-6">
          <div
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: era.color }}
          >
            {t(`timeline:${era.nameKey}`)}
          </div>
          <h3 className="mt-3 font-[var(--font-cormorant)] text-2xl font-bold text-white sm:text-3xl">
            {artwork.title}
          </h3>
          <p className="mt-1 text-white/60">
            {artwork.artist} · {formatYear(artwork.year)}
          </p>
          <p className="mt-1 text-sm text-white/40">{artwork.medium}</p>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/5 p-3">
            <Music className="h-4 w-4 text-art-gold" />
            <span className="text-sm text-white/70">{era.musicGenre}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ERA CARD — used in both desktop and mobile ───
function EraCard({
  era,
  index,
  side,
  onSelectArtwork,
}: {
  era: TimelineEra;
  index: number;
  side: 'left' | 'right' | 'full';
  onSelectArtwork: (artwork: TimelineArtwork, era: TimelineEra) => void;
}) {
  const { t } = useTranslation(['common', 'timeline']);
  const [expanded, setExpanded] = useState(false);

  const allArtworks = [
    ...era.keyArtworks,
    ...era.artists.map((a) => a.representativeWork),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      className="w-full"
    >
      <div
        className="rounded-2xl overflow-hidden border transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${era.gradientFrom}12, ${era.gradientTo}08)`,
          borderColor: `${era.color}25`,
        }}
      >
        {/* Era Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full p-4 sm:p-5 text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: era.color }}
                />
                <h3 className="font-[var(--font-cormorant)] text-xl sm:text-2xl font-bold text-white truncate">
                  {t(`timeline:${era.nameKey}`)}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mt-1">
                <Calendar className="h-3 w-3 flex-shrink-0" />
                <span>{formatYear(era.startYear)} – {formatYear(era.endYear)}</span>
              </div>

              {/* Music tag */}
              <div className="flex items-center gap-1.5 mt-2">
                <Music className="h-3 w-3" style={{ color: era.color }} />
                <span className="text-xs text-white/50">{era.musicGenre}</span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 mt-1"
            >
              <ChevronDown className="h-5 w-5 text-white/30" />
            </motion.div>
          </div>

          {/* Preview artworks (always visible) — horizontal scroll */}
          <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 -mx-1 px-1">
            {era.keyArtworks.slice(0, 4).map((artwork) => (
              <div
                key={`${artwork.titleKey}-${artwork.year}`}
                className="flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden relative"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectArtwork(artwork, era);
                }}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
            {era.keyArtworks.length > 4 && (
              <div className="flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 text-white/40 text-xs font-medium">
                +{era.keyArtworks.length - 4}
              </div>
            )}
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-5 border-t border-white/5 pt-4">
                {/* Artists */}
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  {t('timeline:timeline.artistsCount', 'Artists')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {era.artists.map((artist) => (
                    <div
                      key={artist.name}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm"
                    >
                      <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: era.color }} />
                      <span className="font-medium text-white/80">{artist.name}</span>
                      <span className="text-xs text-white/30 ml-auto">
                        {artist.birthYear}–{artist.deathYear}
                      </span>
                    </div>
                  ))}
                </div>

                {/* All artworks */}
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  {t('timeline:timeline.artworksCount', 'Artworks')}
                </h4>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {allArtworks.map((artwork) => (
                    <ArtworkCard
                      key={`${artwork.titleKey}-${artwork.year}`}
                      artwork={artwork}
                      onClick={() => onSelectArtwork(artwork, era)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN TIMELINE VIEW ───────────────────
// ═══════════════════════════════════════════
export function TimelineView() {
  const { t } = useTranslation(['common', 'timeline']);
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<{
    artwork: TimelineArtwork;
    era: TimelineEra;
  } | null>(null);

  const filteredEras =
    regionFilter === 'all'
      ? TIMELINE_ERAS
      : TIMELINE_ERAS.filter((era) => era.region === regionFilter);

  const handleSelectArtwork = useCallback(
    (artwork: TimelineArtwork, era: TimelineEra) => {
      setSelectedArtwork({ artwork, era });
    },
    []
  );

  const regions: { key: RegionFilter; label: string; icon: string }[] = [
    { key: 'all', label: t('timeline:timeline.filters.all'), icon: '🌍' },
    { key: 'europe', label: t('timeline:timeline.filters.europe'), icon: '🏛️' },
    { key: 'asia', label: t('timeline:timeline.filters.asia'), icon: '🏯' },
    { key: 'americas', label: t('timeline:timeline.filters.americas'), icon: '🗽' },
  ];

  return (
    <div className="min-h-screen bg-[#060610] transition-colors duration-300">
      {/* Header section */}
      <div className="border-b border-white/5 bg-[#0a0a14]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3.5rem)] font-bold text-white"
          >
            {t('timeline:timeline.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-white/50 text-sm sm:text-base"
          >
            {t('timeline:timeline.subtitle')}
          </motion.p>

          {/* Region filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {regions.map((region) => (
              <button
                key={region.key}
                onClick={() => setRegionFilter(region.key)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
                  'min-h-[44px] sm:min-h-0',
                  regionFilter === region.key
                    ? 'bg-art-gold text-[#060610] shadow-md shadow-art-gold/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                <span>{region.icon}</span>
                <span>{region.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline content — vertical card layout */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Desktop: alternating left/right with center spine */}
        <div className="relative">
          {/* Center spine line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-art-gold/40 via-white/10 to-white/5 -translate-x-0.5" />

          {/* Mobile spine line */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-art-gold/40 via-white/10 to-white/5" />

          <div className="space-y-6 sm:space-y-8">
            {filteredEras.map((era, idx) => {
              const side = idx % 2 === 0 ? 'left' : 'right';

              return (
                <div key={era.id} className="relative">
                  {/* Timeline dot — desktop center */}
                  <div className="hidden lg:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                    <div
                      className="h-4 w-4 rounded-full ring-4 ring-[#060610]"
                      style={{ backgroundColor: era.color }}
                    />
                  </div>

                  {/* Timeline dot — mobile left */}
                  <div className="lg:hidden absolute left-2.5 top-6 z-10">
                    <div
                      className="h-3 w-3 rounded-full ring-3 ring-[#060610]"
                      style={{ backgroundColor: era.color }}
                    />
                  </div>

                  {/* Card container */}
                  <div
                    className={cn(
                      'pl-10 lg:pl-0',
                      // Desktop: alternating sides
                      side === 'left' ? 'lg:pr-[calc(50%+24px)]' : 'lg:pl-[calc(50%+24px)]'
                    )}
                  >
                    <EraCard
                      era={era}
                      index={idx}
                      side={side}
                      onSelectArtwork={handleSelectArtwork}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Era count */}
        <div className="mt-10 text-center text-xs text-white/30">
          {filteredEras.length} {t('timeline:timeline.erasCount')} ·{' '}
          {filteredEras.reduce((sum, era) => sum + era.artists.length, 0)}{' '}
          {t('timeline:timeline.artistsCount')} ·{' '}
          {filteredEras.reduce((sum, era) => sum + era.keyArtworks.length, 0)}{' '}
          {t('timeline:timeline.artworksCount')}
        </div>
      </div>

      {/* Artwork detail modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork.artwork}
            era={selectedArtwork.era}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
