'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): Horizontal scroll with full artwork cards, era bands,
 *   artist nodes, parallax depth. Mouse wheel scrolls horizontally. Hover for details.
 * - Landscape (568-1023px): Horizontal scroll compact, smaller cards, touch momentum.
 * - Portrait (320-567px): Vertical accordion — eras stack vertically, tap to expand.
 *   Each era shows its key artworks in a horizontal mini-carousel.
 */


import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Music, ChevronRight, ChevronDown, MapPin, Calendar, X } from 'lucide-react';
import { TIMELINE_ERAS, TIMELINE_RANGE, type TimelineEra, type TimelineArtwork } from '@/data/timeline/eras';
import { cn } from '@/lib/utils/cn';

// ─── Filters ───
type RegionFilter = 'all' | 'europe' | 'asia' | 'americas' | 'global';

// ─── Utility: year display ───
function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

// ─── Artwork Card (used in both desktop & mobile) ───
function ArtworkCard({
  artwork,
  size = 'md',
  onClick,
}: {
  artwork: TimelineArtwork;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}) {
  const sizes = {
    sm: 'w-28 h-36 sm:w-32 sm:h-40',
    md: 'w-40 h-52 sm:w-48 sm:h-60',
    lg: 'w-56 h-72 sm:w-64 sm:h-80',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex-shrink-0 overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-2xl',
        sizes[size]
      )}
    >
      {/* Artwork image */}
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Fallback gradient (shows when image fails) */}
      <div className="absolute inset-0 bg-gradient-to-br from-art-charcoal/20 to-art-charcoal/60 dark:from-black/30 dark:to-black/70" />

      {/* Info overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
        <p className="text-xs font-semibold text-white leading-tight sm:text-sm">
          {artwork.title}
        </p>
        <p className="mt-0.5 text-[10px] text-white/70 sm:text-xs">
          {artwork.artist}, {formatYear(artwork.year)}
        </p>
      </div>

      {/* Hover ring */}
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
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-art-charcoal shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-art-charcoal">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* Info */}
        <div className="p-5 sm:p-6">
          <div
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: era.color }}
          >
            {t(`timeline:${era.nameKey}`)}
          </div>
          <h3 className="mt-3 font-[var(--font-cormorant)] text-2xl font-bold text-art-charcoal dark:text-white sm:text-3xl">
            {artwork.title}
          </h3>
          <p className="mt-1 text-art-charcoal/60 dark:text-white/60">
            {artwork.artist} · {formatYear(artwork.year)}
          </p>
          <p className="mt-1 text-sm text-art-charcoal/40 dark:text-white/40">{artwork.medium}</p>

          {/* Music connection */}
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-art-cream dark:bg-white/5 p-3">
            <Music className="h-4 w-4 text-art-gold" />
            <span className="text-sm text-art-charcoal/70 dark:text-white/70">{era.musicGenre}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
// ─── DESKTOP TIMELINE (Horizontal Scroll) ─
// ═══════════════════════════════════════════
function TimelineDesktop({
  eras,
  onSelectArtwork,
}: {
  eras: TimelineEra[];
  onSelectArtwork: (artwork: TimelineArtwork, era: TimelineEra) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['common', 'timeline']);

  // Horizontal scroll with mouse wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el!.scrollLeft += e.deltaY * 2;
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Non-linear time scale: compress ancient history, expand modern eras
  // Each era gets a fixed minimum + proportional width capped to prevent huge ancient eras
  const minEraWidth = 280;
  const maxEraWidth = 600; // Cap so ancient Egypt doesn't take 8000px

  // Calculate positions: lay eras out sequentially with consistent spacing
  const eraLayout = useMemo(() => {
    const sortedEras = [...eras].sort((a, b) => a.startYear - b.startYear);
    const gap = 40; // px between eras
    const layouts: Record<string, { left: number; width: number; row: number }> = {};
    const rows: { end: number }[] = [{ end: 0 }, { end: 0 }, { end: 0 }];

    for (const era of sortedEras) {
      // Width: proportional to duration but clamped
      const duration = era.endYear - era.startYear;
      const proportional = Math.sqrt(duration) * 18; // sqrt scaling compresses long eras
      const width = Math.min(Math.max(proportional, minEraWidth), maxEraWidth);

      // Find best row: the one whose end is furthest left
      let bestRow = 0;
      let minEnd = Infinity;
      for (let r = 0; r < rows.length; r++) {
        if (rows[r].end < minEnd) {
          bestRow = r;
          minEnd = rows[r].end;
        }
      }

      // Position: at least after the row's last era ends
      const left = rows[bestRow].end;
      rows[bestRow].end = left + width + gap;

      layouts[era.id] = { left, width, row: bestRow };
    }
    return { layouts, totalWidth: Math.max(...rows.map(r => r.end)) + 100 };
  }, [eras]);

  return (
    <div className="relative">
      {/* Scroll hint */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-art-cream dark:from-art-charcoal to-transparent" />

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-art-charcoal/20"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="relative" style={{ width: `${eraLayout.totalWidth}px`, minHeight: '750px' }}>

          {/* Era bands */}
          {eras.map((era, idx) => {
            const layout = eraLayout.layouts[era.id];
            if (!layout) return null;
            const { left, width, row } = layout;
            const top = 30 + row * 230;

            return (
              <motion.div
                key={era.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="absolute"
                style={{ left: `${left}px`, width: `${width}px`, top: `${top}px` }}
              >
                {/* Era background band */}
                <div
                  className="rounded-2xl p-4 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${era.gradientFrom}15, ${era.gradientTo}10)`,
                    border: `1px solid ${era.color}20`,
                  }}
                >
                  {/* Era header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: era.color }}
                    />
                    <h3 className="text-sm font-semibold text-art-charcoal dark:text-white">
                      {t(`timeline:${era.nameKey}`)}
                    </h3>
                    <span className="text-xs text-art-charcoal/40 dark:text-white/40">
                      {formatYear(era.startYear)} – {formatYear(era.endYear)}
                    </span>
                  </div>

                  {/* Artworks row */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {era.keyArtworks.map((artwork) => (
                      <ArtworkCard
                        key={`${artwork.titleKey}-${artwork.year}`}
                        artwork={artwork}
                        size="sm"
                        onClick={() => onSelectArtwork(artwork, era)}
                      />
                    ))}
                  </div>

                  {/* Music connection tag */}
                  <div className="mt-2 flex items-center gap-1.5">
                    <Music className="h-3 w-3" style={{ color: era.color }} />
                    <span className="text-[11px] text-art-charcoal/50 dark:text-white/50">{era.musicGenre}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MOBILE TIMELINE (Vertical Accordion) ─
// ═══════════════════════════════════════════
function TimelineMobile({
  eras,
  onSelectArtwork,
}: {
  eras: TimelineEra[];
  onSelectArtwork: (artwork: TimelineArtwork, era: TimelineEra) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t } = useTranslation(['common', 'timeline']);

  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-art-gold/50 via-art-charcoal/10 dark:via-white/10 to-art-charcoal/5 dark:to-white/5" />

      <div className="space-y-3">
        {eras.map((era, idx) => {
          const isExpanded = expandedId === era.id;

          return (
            <motion.div
              key={era.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              {/* Era dot on the timeline line */}
              <div
                className="absolute left-1.5 h-3 w-3 rounded-full ring-2 ring-white"
                style={{
                  backgroundColor: era.color,
                  marginTop: '18px',
                }}
              />

              {/* Accordion header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : era.id)}
                className={cn(
                  'w-full rounded-xl p-4 text-left transition-all',
                  isExpanded
                    ? 'bg-white dark:bg-white/10 shadow-md'
                    : 'bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-art-charcoal dark:text-white">
                      {t(`timeline:${era.nameKey}`)}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-art-charcoal/40 dark:text-white/40">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatYear(era.startYear)} – {formatYear(era.endYear)}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-art-charcoal/30 dark:text-white/30" />
                  </motion.div>
                </div>

                {/* Music tag — always visible */}
                <div className="mt-2 flex items-center gap-1.5">
                  <Music className="h-3 w-3" style={{ color: era.color }} />
                  <span className="text-[11px] text-art-charcoal/50 dark:text-white/50">{era.musicGenre}</span>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      {/* Artists list */}
                      <div className="mb-3 space-y-2">
                        {era.artists.map((artist) => (
                          <div
                            key={artist.name}
                            className="flex items-center gap-2 text-sm text-art-charcoal/70 dark:text-white/70"
                          >
                            <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: era.color }} />
                            <span className="font-medium">{artist.name}</span>
                            <span className="text-xs text-art-charcoal/30 dark:text-white/30">
                              {artist.birthYear}–{artist.deathYear}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Horizontal artwork carousel */}
                      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                        {era.keyArtworks.map((artwork) => (
                          <ArtworkCard
                            key={`${artwork.titleKey}-${artwork.year}`}
                            artwork={artwork}
                            size="md"
                            onClick={() => onSelectArtwork(artwork, era)}
                          />
                        ))}
                        {era.artists.map((artist) => (
                          <ArtworkCard
                            key={`${artist.representativeWork.titleKey}-rep`}
                            artwork={artist.representativeWork}
                            size="md"
                            onClick={() =>
                              onSelectArtwork(artist.representativeWork, era)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
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
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-art-charcoal/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3.5rem)] font-bold text-art-charcoal dark:text-white"
          >
            {t('timeline:timeline.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-art-charcoal/60 dark:text-white/60 text-sm sm:text-base"
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
                  'min-h-[44px] sm:min-h-0', // Touch target
                  regionFilter === region.key
                    ? 'bg-art-charcoal dark:bg-white text-white dark:text-art-charcoal shadow-md'
                    : 'bg-art-charcoal/5 dark:bg-white/5 text-art-charcoal/60 dark:text-white/60 hover:bg-art-charcoal/10 dark:hover:bg-white/10'
                )}
              >
                <span>{region.icon}</span>
                <span>{region.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Timeline content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Desktop & Landscape: horizontal */}
        <div className="hidden sm:block">
          <TimelineDesktop eras={filteredEras} onSelectArtwork={handleSelectArtwork} />
        </div>

        {/* Portrait: vertical accordion */}
        <div className="block sm:hidden">
          <TimelineMobile eras={filteredEras} onSelectArtwork={handleSelectArtwork} />
        </div>

        {/* Era count */}
        <div className="mt-6 text-center text-xs text-art-charcoal/30 dark:text-white/30">
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
