/**
 * GalleryWalk — The Museum Walk Experience
 *
 * Orchestrates navigation between GalleryRooms with cinematic transitions.
 * Walking between rooms feels like moving through the grand hall of the
 * world's most beautiful museum.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Room-to-room transition with 3D depth animation
 *   (current room zooms forward + fades, next room emerges from behind).
 *   Side navigation arrows. Room minimap at bottom.
 * - Landscape (568-1023px): Swipe between rooms. Simplified transitions.
 *   Dots navigation at bottom.
 * - Portrait (320-567px): Vertical scroll through rooms, each collapsed.
 *   Tap to expand/enter a room. Carousel dots.
 *
 * All artwork images: Public domain via Wikimedia Commons, Met Open Access,
 * Rijksmuseum, National Gallery of Art. Zero paid resources.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ExternalLink, Music, Maximize2, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TIMELINE_ERAS, type TimelineEra, type TimelineArtwork } from '@/data/timeline/eras';
import { ARTWORK_NARRATIONS } from '@/data/narrations/artworks';
import { ImmersiveExperience } from '@/components/immersive/ImmersiveExperience';
import { GalleryRoom } from './GalleryRoom';
import { cn } from '@/lib/utils/cn';

// Room transition variants for Framer Motion
const roomVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    scale: 0.85,
    x: direction > 0 ? '20%' : '-20%',
    rotateY: direction > 0 ? -8 : 8,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 1.1,
    x: direction > 0 ? '-15%' : '15%',
    rotateY: direction > 0 ? 5 : -5,
  }),
};

// ─── Artwork Detail Modal ───
function ArtworkDetailModal({
  artwork,
  era,
  onClose,
  onListenStory,
}: {
  artwork: TimelineArtwork;
  era: TimelineEra;
  onClose: () => void;
  onListenStory?: () => void;
}) {
  const { t } = useTranslation('common');

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: 5 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Artwork image — large */}
        <div className="relative aspect-[4/3] w-full bg-art-charcoal sm:aspect-[16/10]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${artwork.imageUrl})` }}
          />
          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Info panel */}
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: era.color }}
              >
                {t(era.nameKey)}
              </span>
              <h2 className="mt-3 font-[var(--font-cormorant)] text-2xl font-bold text-art-charcoal sm:text-4xl">
                {artwork.title}
              </h2>
              <p className="mt-1.5 text-lg text-art-charcoal/60">
                {artwork.artist}
                <span className="mx-2 text-art-charcoal/20">·</span>
                {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} BCE`}
              </p>
              <p className="mt-1 text-sm text-art-charcoal/40">{artwork.medium}</p>
            </div>
          </div>

          {/* Music connection */}
          <div className="mt-5 rounded-xl bg-art-cream p-4">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 flex-shrink-0" style={{ color: era.color }} />
              <div>
                <p className="text-xs font-semibold text-art-charcoal/50 uppercase tracking-wider">
                  {t('gallery.musicConnection')}
                </p>
                <p className="mt-0.5 text-sm text-art-charcoal/70">{era.musicGenre}</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            {/* Immersive narration button — golden, primary CTA */}
            {onListenStory && (
              <button
                onClick={onListenStory}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-art-gold to-[#D4B478] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-art-gold/25 transition-all hover:shadow-xl hover:shadow-art-gold/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Headphones className="h-4 w-4" />
                {t('immersive.listenStory')}
              </button>
            )}
            <a
              href={`/lessons?era=${era.id}`}
              className="flex items-center gap-2 rounded-full bg-art-gold px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-art-gold-light"
            >
              {t('gallery.exploreEra')}
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href={artwork.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-art-charcoal/5 px-5 py-2.5 text-sm font-medium text-art-charcoal/70 transition-all hover:bg-art-charcoal/10"
            >
              <Maximize2 className="h-4 w-4" />
              {t('gallery.viewFull')}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Room Minimap / Navigation ───
function RoomNavigator({
  eras,
  currentIndex,
  onNavigate,
}: {
  eras: TimelineEra[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
      {eras.map((era, i) => (
        <button
          key={era.id}
          onClick={() => onNavigate(i)}
          className={cn(
            'group relative transition-all duration-300',
            i === currentIndex
              ? 'scale-100'
              : 'scale-90 opacity-50 hover:opacity-80'
          )}
          aria-label={t(era.nameKey)}
        >
          {/* Dot */}
          <div
            className={cn(
              'rounded-full transition-all duration-300',
              i === currentIndex
                ? 'h-3 w-8 sm:h-3.5 sm:w-10'
                : 'h-3 w-3 sm:h-3.5 sm:w-3.5 hover:w-5'
            )}
            style={{ backgroundColor: era.color }}
          />

          {/* Tooltip — desktop only */}
          <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-art-charcoal px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 lg:block">
            {t(era.nameKey)}
          </div>
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN GALLERY WALK COMPONENT ──────────
// ═══════════════════════════════════════════
/** Check if an artwork has a cinematic narration available */
function hasNarration(artwork: TimelineArtwork): boolean {
  const key = artwork.titleKey.split('.').pop() || '';
  return key in ARTWORK_NARRATIONS;
}

export function GalleryWalk() {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<{
    artwork: TimelineArtwork;
    era: TimelineEra;
  } | null>(null);
  const [immersiveArtwork, setImmersiveArtwork] = useState<{
    artwork: TimelineArtwork;
    era: TimelineEra;
  } | null>(null);

  // Navigation with keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToRoom(Math.min(currentIndex + 1, TIMELINE_ERAS.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToRoom(Math.max(currentIndex - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  const goToRoom = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const currentEra = TIMELINE_ERAS[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < TIMELINE_ERAS.length - 1;

  return (
    <div className="relative min-h-screen bg-art-charcoal">
      {/* ── Header ── */}
      <div className="relative z-30 border-b border-white/5 bg-art-charcoal/90 backdrop-blur-sm">
        <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-4">
          <div>
            <h1 className="font-[var(--font-cormorant)] text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              {t('gallery.title')}
            </h1>
            <p className="text-xs text-white/40 sm:text-sm">{t('gallery.subtitle')}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/30">
              {t('gallery.room')} {currentIndex + 1} / {TIMELINE_ERAS.length}
            </p>
          </div>
        </div>
      </div>

      {/* ── Room Display ── */}
      <div className="relative px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl" style={{ perspective: '1500px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentEra.id}
              custom={direction}
              variants={roomVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1], // Custom ease — smooth museum walk feel
              }}
            >
              <GalleryRoom
                era={currentEra}
                isActive={true}
                onArtworkSelect={(artwork) => {
                  // If artwork has narration, go straight to immersive
                  if (hasNarration(artwork)) {
                    setImmersiveArtwork({ artwork, era: currentEra });
                  } else {
                    setSelectedArtwork({ artwork, era: currentEra });
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation Arrows (Desktop & Landscape) ── */}
        <div className="hidden sm:block">
          {canGoPrev && (
            <button
              onClick={() => goToRoom(currentIndex - 1)}
              className="absolute left-2 top-1/2 z-40 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white lg:left-4 lg:h-16 lg:w-16"
            >
              <ChevronLeft className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>
          )}
          {canGoNext && (
            <button
              onClick={() => goToRoom(currentIndex + 1)}
              className="absolute right-2 top-1/2 z-40 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white lg:right-4 lg:h-16 lg:w-16"
            >
              <ChevronRight className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>
          )}
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="relative z-30 border-t border-white/5 bg-art-charcoal/90 backdrop-blur-sm">
        <div className="mx-auto flex flex-col items-center gap-3 px-4 py-4 sm:px-6 lg:max-w-7xl lg:flex-row lg:justify-between lg:px-8">
          {/* Mobile: prev/next buttons */}
          <div className="flex items-center gap-4 sm:hidden">
            <button
              onClick={() => canGoPrev && goToRoom(currentIndex - 1)}
              disabled={!canGoPrev}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                canGoPrev
                  ? 'bg-white/10 text-white active:scale-95'
                  : 'bg-white/5 text-white/20'
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-center min-w-[120px]">
              <p className="text-sm font-semibold text-white">{t(currentEra.nameKey)}</p>
              <p className="text-[10px] text-white/40">
                {currentEra.startYear > 0 ? currentEra.startYear : `${Math.abs(currentEra.startYear)} BCE`} –{' '}
                {currentEra.endYear}
              </p>
            </div>

            <button
              onClick={() => canGoNext && goToRoom(currentIndex + 1)}
              disabled={!canGoNext}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                canGoNext
                  ? 'bg-white/10 text-white active:scale-95'
                  : 'bg-white/5 text-white/20'
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* All viewports: room dots */}
          <div className="w-full flex justify-center lg:justify-start">
            <RoomNavigator
              eras={TIMELINE_ERAS}
              currentIndex={currentIndex}
              onNavigate={goToRoom}
            />
          </div>

          {/* Desktop: era info */}
          <div className="hidden lg:flex items-center gap-3 text-sm text-white/50">
            <span>{t('gallery.useArrowKeys')}</span>
          </div>
        </div>
      </div>

      {/* ── Artwork Detail Modal (for artworks without narration) ── */}
      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkDetailModal
            artwork={selectedArtwork.artwork}
            era={selectedArtwork.era}
            onClose={() => setSelectedArtwork(null)}
            onListenStory={
              hasNarration(selectedArtwork.artwork)
                ? () => {
                    setSelectedArtwork(null);
                    setImmersiveArtwork({
                      artwork: selectedArtwork.artwork,
                      era: selectedArtwork.era,
                    });
                  }
                : undefined
            }
          />
        )}
      </AnimatePresence>

      {/* ── Immersive Experience (cinematic voice narration) ── */}
      <AnimatePresence>
        {immersiveArtwork && (
          <ImmersiveExperience
            artwork={immersiveArtwork.artwork}
            era={immersiveArtwork.era}
            onClose={() => setImmersiveArtwork(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
