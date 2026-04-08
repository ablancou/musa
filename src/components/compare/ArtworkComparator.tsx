'use client';

/**
 * ArtworkComparator — Side-by-Side Visual Comparison Tool
 *
 * Users pick two artworks and compare them across dimensions:
 * technique, movement, date, palette, dimensions, museum.
 * Includes a slider overlay mode for desktop.
 *
 * Responsive Modes:
 * - Desktop (≥1024px): Split-screen with draggable divider, detail panels below
 * - Landscape (568-1023px): Stacked comparison with swipe
 * - Portrait (320-567px): Vertical stack, one artwork at a time with toggle
 */

import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Search,
  X,
  ArrowLeftRight,
  Palette,
  Calendar,
  MapPin,
  Ruler,
  Paintbrush,
  Music,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { ARTWORKS, type Artwork } from '@/data/museums/artworks';
import { getMuseum } from '@/data/museums/museums';
import { getMovement } from '@/data/museums/movements';
import { cn } from '@/lib/utils/cn';

// ─── Artwork Picker ───
function ArtworkPicker({
  selected,
  onSelect,
  otherSelected,
  label,
}: {
  selected: Artwork | null;
  onSelect: (a: Artwork) => void;
  otherSelected: Artwork | null;
  label: string;
}) {
  const { t } = useTranslation('museums');
  const { t: tc } = useTranslation('common');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return ARTWORKS;
    const q = search.toLowerCase();
    return ARTWORKS.filter(
      (a) =>
        a.artist.toLowerCase().includes(q) ||
        a.titleOriginal.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.movement.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="relative">
      {/* Selected artwork display or placeholder */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full rounded-2xl border-2 border-dashed transition-all',
          selected
            ? 'border-art-gold/30 bg-white dark:bg-white/5'
            : 'border-art-charcoal/20 dark:border-white/20 bg-art-cream/50 dark:bg-white/5 hover:border-art-gold/40'
        )}
      >
        {selected ? (
          <div className="flex items-center gap-3 p-3">
            <img
              src={selected.imageUrl}
              alt={selected.titleOriginal}
              className="h-16 w-12 rounded-lg object-cover sm:h-20 sm:w-14"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-art-charcoal dark:text-white line-clamp-1">
                {t(selected.titleKey)}
              </p>
              <p className="text-xs text-art-charcoal/60 dark:text-white/60">
                {selected.artist}, {selected.year}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-art-charcoal/40 dark:text-white/40" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-8 px-4 sm:py-12">
            <Sparkles className="h-8 w-8 text-art-gold/40" />
            <p className="text-sm font-medium text-art-charcoal/50 dark:text-white/50">
              {label}
            </p>
          </div>
        )}
      </button>

      {/* Dropdown picker */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[60vh] overflow-hidden rounded-2xl bg-white dark:bg-white/5 shadow-2xl ring-1 ring-art-charcoal/10 dark:ring-white/10"
            >
              {/* Search */}
              <div className="sticky top-0 z-10 border-b border-art-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                <div className="flex items-center gap-2 rounded-xl bg-art-cream dark:bg-white/10 px-3 py-2">
                  <Search className="h-4 w-4 text-art-charcoal/40 dark:text-white/40" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={tc('compare.searchPlaceholder')}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-art-charcoal/40 dark:placeholder:text-white/40 dark:text-white"
                    autoFocus
                  />
                  {search && (
                    <button onClick={() => setSearch('')}>
                      <X className="h-3.5 w-3.5 text-art-charcoal/40" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.map((artwork) => {
                  const isOther = otherSelected?.id === artwork.id;
                  const movement = getMovement(artwork.movement);
                  return (
                    <button
                      key={artwork.id}
                      disabled={isOther}
                      onClick={() => {
                        onSelect(artwork);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors',
                        isOther
                          ? 'opacity-30 cursor-not-allowed'
                          : 'hover:bg-art-cream/50 dark:hover:bg-white/10'
                      )}
                    >
                      <img
                        src={artwork.imageUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="h-12 w-9 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-art-charcoal dark:text-white truncate">
                          {t(artwork.titleKey)}
                        </p>
                        <p className="text-xs text-art-charcoal/50 dark:text-white/50">
                          {artwork.artist}, {artwork.year}
                        </p>
                      </div>
                      {movement && (
                        <span
                          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                          style={{ backgroundColor: movement.color }}
                        >
                          {t(movement.nameKey)}
                        </span>
                      )}
                    </button>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-art-charcoal/40 dark:text-white/40">
                    {tc('compare.noResults')}
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Comparison Detail Row ───
function CompareRow({
  icon: Icon,
  label,
  valueA,
  valueB,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  valueA: string;
  valueB: string;
  highlight?: boolean;
}) {
  const same = valueA === valueB;
  return (
    <div className={cn(
      'grid grid-cols-[1fr,auto,1fr] gap-2 items-center rounded-xl px-3 py-2.5 sm:px-4 sm:py-3',
      highlight ? 'bg-art-gold/10 dark:bg-art-gold/10' : 'bg-art-cream/50 dark:bg-white/5'
    )}>
      <p className="text-xs text-art-charcoal/80 dark:text-white/80 text-right sm:text-sm">
        {valueA}
      </p>
      <div className="flex flex-col items-center gap-0.5">
        <Icon className={cn('h-3.5 w-3.5', same ? 'text-art-gold' : 'text-art-charcoal/30 dark:text-white/30')} />
        <span className="text-[9px] font-medium text-art-charcoal/40 dark:text-white/40 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xs text-art-charcoal/80 dark:text-white/80 sm:text-sm">
        {valueB}
      </p>
    </div>
  );
}

// ─── Main Comparator ───
export function ArtworkComparator() {
  const { t } = useTranslation('museums');
  const { t: tc } = useTranslation('common');
  const [artworkA, setArtworkA] = useState<Artwork | null>(null);
  const [artworkB, setArtworkB] = useState<Artwork | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleSwap = () => {
    setArtworkA(artworkB);
    setArtworkB(artworkA);
  };

  // Slider drag logic
  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.max(5, Math.min(95, pct)));
    };
    const handleUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pct = ((touch.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pct)));
  }, []);

  const museumA = artworkA ? getMuseum(artworkA.museumId) : null;
  const museumB = artworkB ? getMuseum(artworkB.museumId) : null;
  const movementA = artworkA ? getMovement(artworkA.movement) : null;
  const movementB = artworkB ? getMovement(artworkB.movement) : null;

  const bothSelected = artworkA && artworkB;

  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-[var(--font-cormorant)] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold text-art-charcoal dark:text-white">
            {tc('compare.title')}
          </h1>
          <p className="mt-2 text-sm text-art-charcoal/50 dark:text-white/50 sm:text-base">
            {tc('compare.subtitle')}
          </p>
        </div>

        {/* Artwork Pickers */}
        <div className="grid gap-3 sm:grid-cols-[1fr,auto,1fr] sm:items-start sm:gap-4">
          <ArtworkPicker
            selected={artworkA}
            onSelect={setArtworkA}
            otherSelected={artworkB}
            label={tc('compare.pickFirst')}
          />

          <button
            onClick={handleSwap}
            disabled={!bothSelected}
            className={cn(
              'mx-auto flex h-10 w-10 items-center justify-center rounded-full transition-all self-center',
              bothSelected
                ? 'bg-art-gold text-white shadow-md hover:shadow-lg hover:scale-105'
                : 'bg-art-charcoal/10 dark:bg-white/10 text-art-charcoal/30 dark:text-white/30'
            )}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>

          <ArtworkPicker
            selected={artworkB}
            onSelect={setArtworkB}
            otherSelected={artworkA}
            label={tc('compare.pickSecond')}
          />
        </div>

        {/* Comparison View */}
        <AnimatePresence mode="wait">
          {bothSelected && artworkA && artworkB && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              {/* ─── Image Slider (Desktop) / Stack (Mobile) ─── */}
              <div
                ref={sliderRef}
                className="relative mx-auto aspect-[3/2] max-h-[500px] w-full overflow-hidden rounded-2xl bg-black shadow-2xl lg:aspect-[2/1]"
                onTouchMove={handleTouchMove}
              >
                {/* Artwork B (full background) */}
                <img
                  src={artworkB.imageUrl}
                  alt={artworkB.titleOriginal}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-contain bg-[#1a1a1a]"
                />

                {/* Artwork A (clipped by slider) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={artworkA.imageUrl}
                    alt={artworkA.titleOriginal}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-contain bg-[#1a1a1a]"
                    style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
                  />
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 z-10 cursor-col-resize"
                  style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={() => {}}
                >
                  <div className="h-full w-0.5 bg-white/80" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl">
                    <ArrowLeftRight className="h-4 w-4 text-art-charcoal" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-white">{t(artworkA.titleKey)}</p>
                  <p className="text-[10px] text-white/60">{artworkA.artist}, {artworkA.year}</p>
                </div>
                <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 backdrop-blur-sm text-right">
                  <p className="text-xs font-semibold text-white">{t(artworkB.titleKey)}</p>
                  <p className="text-[10px] text-white/60">{artworkB.artist}, {artworkB.year}</p>
                </div>
              </div>

              {/* ─── Comparison Details ─── */}
              <div className="mt-6 space-y-2">
                <CompareRow
                  icon={Paintbrush}
                  label={tc('compare.movement')}
                  valueA={movementA ? t(movementA.nameKey) : artworkA.movement}
                  valueB={movementB ? t(movementB.nameKey) : artworkB.movement}
                  highlight
                />
                <CompareRow
                  icon={Calendar}
                  label={tc('compare.year')}
                  valueA={String(artworkA.year)}
                  valueB={String(artworkB.year)}
                />
                <CompareRow
                  icon={Palette}
                  label={tc('compare.technique')}
                  valueA={artworkA.medium}
                  valueB={artworkB.medium}
                />
                <CompareRow
                  icon={Ruler}
                  label={tc('compare.dimensions')}
                  valueA={artworkA.dimensions ?? '—'}
                  valueB={artworkB.dimensions ?? '—'}
                />
                <CompareRow
                  icon={MapPin}
                  label={tc('compare.museum')}
                  valueA={museumA ? `${museumA.city}` : artworkA.museumId}
                  valueB={museumB ? `${museumB.city}` : artworkB.museumId}
                />
                {(artworkA.musicConnection || artworkB.musicConnection) && (
                  <CompareRow
                    icon={Music}
                    label={tc('compare.music')}
                    valueA={artworkA.musicConnection?.youtubeQuery?.split(' ').slice(0, 3).join(' ') || '—'}
                    valueB={artworkB.musicConnection?.youtubeQuery?.split(' ').slice(0, 3).join(' ') || '—'}
                  />
                )}

                {/* Year difference badge */}
                <div className="flex justify-center pt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-art-gold/10 px-4 py-2 text-sm font-medium text-art-gold">
                    <Calendar className="h-4 w-4" />
                    {tc('compare.yearsDifference', { count: Math.abs(artworkA.year - artworkB.year) })}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestion chips when nothing selected */}
        {!artworkA && !artworkB && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-art-charcoal/40 dark:text-white/40 mb-4">
              {tc('compare.suggestedTitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { a: 'vangogh-starry-night', b: 'monet-impression-sunrise', label: 'Van Gogh vs Monet' },
                { a: 'mona-lisa', b: 'girl-pearl-earring', label: 'Da Vinci vs Vermeer' },
                { a: 'creation-of-adam', b: 'pieta', label: 'Miguel Ángel: Pintura vs Escultura' },
                { a: 'the-scream', b: 'klimt-the-kiss', label: 'Munch vs Klimt' },
                { a: 'vangogh-sunflowers', b: 'monet-water-lilies-orsay', label: 'Sunflowers vs Water Lilies' },
              ].map((suggestion) => {
                const a = ARTWORKS.find((aw) => aw.id === suggestion.a);
                const b = ARTWORKS.find((aw) => aw.id === suggestion.b);
                if (!a || !b) return null;
                return (
                  <button
                    key={suggestion.label}
                    onClick={() => {
                      setArtworkA(a);
                      setArtworkB(b);
                    }}
                    className="rounded-full border border-art-charcoal/10 dark:border-white/10 px-4 py-2 text-sm text-art-charcoal/60 dark:text-white/50 transition-all hover:border-art-gold/30 hover:text-art-gold dark:hover:border-art-gold/30"
                  >
                    {suggestion.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
