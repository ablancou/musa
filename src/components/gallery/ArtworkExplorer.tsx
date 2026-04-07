'use client';

/**
 * ArtworkExplorer — Advanced filterable grid view of all artworks.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): 4-column masonry grid, side filter panel, large cards
 * - Landscape (568-1023px): 3-column grid, top filter bar collapsible
 * - Portrait (320-567px): 2-column grid, bottom sheet filter, compact cards
 */

import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Palette,
  Building2,
  User,
  Paintbrush,
  Calendar,
  Music,
  Grid3x3,
  LayoutGrid,
} from 'lucide-react';
import Link from 'next/link';
import { ARTWORKS, type Artwork } from '@/data/museums/artworks';
import { ART_MOVEMENTS } from '@/data/museums/movements';
import { MUSEUMS } from '@/data/museums/museums';
import { cn } from '@/lib/utils/cn';

// ─── Filter State ───
interface Filters {
  search: string;
  movement: string | null;
  museum: string | null;
  technique: string | null;
  century: string | null;
}

const EMPTY_FILTERS: Filters = {
  search: '',
  movement: null,
  museum: null,
  technique: null,
  century: null,
};

// ─── Century ranges for filtering ───
const CENTURIES = [
  { id: 'ancient', label: 'Antigüedad', labelKey: 'gallery.centuries.ancient', min: -3000, max: 500 },
  { id: 'medieval', label: 'Medieval', labelKey: 'gallery.centuries.medieval', min: 500, max: 1400 },
  { id: '15th', label: 'Siglo XV', labelKey: 'gallery.centuries.15th', min: 1400, max: 1500 },
  { id: '16th', label: 'Siglo XVI', labelKey: 'gallery.centuries.16th', min: 1500, max: 1600 },
  { id: '17th', label: 'Siglo XVII', labelKey: 'gallery.centuries.17th', min: 1600, max: 1700 },
  { id: '18th', label: 'Siglo XVIII', labelKey: 'gallery.centuries.18th', min: 1700, max: 1800 },
  { id: '19th', label: 'Siglo XIX', labelKey: 'gallery.centuries.19th', min: 1800, max: 1900 },
  { id: '20th', label: 'Siglo XX', labelKey: 'gallery.centuries.20th', min: 1900, max: 2000 },
];

// ─── Get unique artists from artworks ───
function getUniqueArtists(artworks: Artwork[]): string[] {
  const artists = new Set(artworks.map((a) => a.artist));
  return Array.from(artists).sort();
}

// ─── Get unique techniques ───
function getUniqueTechniques(artworks: Artwork[]): string[] {
  const techniques = new Set(artworks.map((a) => a.technique));
  return Array.from(techniques).sort();
}

// ─── Artwork Card ───
function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const { t } = useTranslation(['museums', 'common']);
  const movement = ART_MOVEMENTS.find((m) => m.id === artwork.movement);
  const museum = MUSEUMS.find((m) => m.id === artwork.museumId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.4 }}
      layout
    >
      <Link
        href={`/gallery?artwork=${artwork.id}`}
        className="group block overflow-hidden rounded-xl bg-white dark:bg-white/5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-art-charcoal/10 dark:bg-white/5">
          <img
            src={artwork.imageUrl}
            alt={artwork.titleOriginal || artwork.artist}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-art-charcoal/20 to-art-charcoal/40">
            <Palette className="h-8 w-8 text-white/30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Movement badge */}
          {movement && (
            <div
              className="absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ backgroundColor: movement.color + 'CC' }}
            >
              {t(movement.nameKey)}
            </div>
          )}

          {/* Music indicator */}
          {artwork.musicConnection && (
            <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Music className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Hover info */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <div className="bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8">
              {museum && (
                <div className="flex items-center gap-1 text-[10px] text-white/60">
                  <Building2 className="h-3 w-3" />
                  <span>{t(`museums:${museum.nameKey}`)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-[var(--font-cormorant)] text-sm font-bold text-art-charcoal dark:text-white leading-tight line-clamp-2 sm:text-base">
            {artwork.titleOriginal}
          </h3>
          <p className="mt-0.5 text-xs text-art-charcoal/60 dark:text-white/60">
            {artwork.artist}
          </p>
          <p className="text-[10px] text-art-charcoal/40 dark:text-white/40">
            {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} BCE`}
            {artwork.dimensions && ` · ${artwork.dimensions}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Filter Chip ───
function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all min-h-[36px]',
        active
          ? 'text-white shadow-md'
          : 'bg-art-charcoal/5 dark:bg-white/5 text-art-charcoal/60 dark:text-white/60 hover:bg-art-charcoal/10 dark:hover:bg-white/10'
      )}
      style={active ? { backgroundColor: color || '#1a1a1a' } : undefined}
    >
      {label}
      {active && <X className="h-3 w-3" />}
    </button>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN COMPONENT ──────────────────────
// ═══════════════════════════════════════════
export function ArtworkExplorer({ initialMuseum }: { initialMuseum?: string | null }) {
  const { t } = useTranslation(['museums', 'common', 'gallery']);
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY_FILTERS,
    museum: initialMuseum || null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key] === value ? null : value,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => setFilters(EMPTY_FILTERS), []);

  const activeFilterCount = useMemo(
    () =>
      [filters.movement, filters.museum, filters.technique, filters.century].filter(Boolean)
        .length + (filters.search ? 1 : 0),
    [filters]
  );

  // ─── Filtered artworks ───
  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((artwork) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matches =
          artwork.titleOriginal.toLowerCase().includes(q) ||
          artwork.artist.toLowerCase().includes(q) ||
          artwork.id.includes(q);
        if (!matches) return false;
      }

      // Movement
      if (filters.movement && artwork.movement !== filters.movement) return false;

      // Museum
      if (filters.museum && artwork.museumId !== filters.museum) return false;

      // Technique
      if (filters.technique && artwork.technique !== filters.technique) return false;

      // Century
      if (filters.century) {
        const century = CENTURIES.find((c) => c.id === filters.century);
        if (century && (artwork.year < century.min || artwork.year >= century.max)) return false;
      }

      return true;
    });
  }, [filters]);

  // ─── Available options (based on current data) ───
  const availableMovements = useMemo(
    () => ART_MOVEMENTS.filter((m) => ARTWORKS.some((a) => a.movement === m.id)),
    []
  );

  const availableMuseums = useMemo(
    () => MUSEUMS.filter((m) => ARTWORKS.some((a) => a.museumId === m.id)),
    []
  );

  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal">
      {/* ─── Header ─── */}
      <div className="sticky top-16 z-30 border-b border-art-charcoal/5 dark:border-white/5 bg-white/80 dark:bg-art-charcoal/80 backdrop-blur-lg lg:top-20">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          {/* Search + Filter toggle row */}
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-art-charcoal/30 dark:text-white/30" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder={t('common:gallery.searchPlaceholder', 'Buscar obra o artista...')}
                className="w-full rounded-full bg-art-charcoal/5 dark:bg-white/5 pl-10 pr-4 py-2.5 text-sm text-art-charcoal dark:text-white placeholder-art-charcoal/30 dark:placeholder-white/30 outline-none focus:ring-2 focus:ring-art-gold/30 transition-all"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-art-charcoal/30 dark:text-white/30" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-all min-h-[44px]',
                showFilters || activeFilterCount > 0
                  ? 'bg-art-charcoal dark:bg-white text-white dark:text-art-charcoal'
                  : 'bg-art-charcoal/5 dark:bg-white/5 text-art-charcoal/60 dark:text-white/60 hover:bg-art-charcoal/10 dark:hover:bg-white/10'
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">
                {t('common:gallery.filters', 'Filtros')}
              </span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-art-gold text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* View mode toggle — desktop only */}
            <div className="hidden lg:flex items-center gap-1 rounded-full bg-art-charcoal/5 dark:bg-white/5 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'rounded-full p-1.5 transition-all',
                  viewMode === 'grid' ? 'bg-white dark:bg-art-charcoal shadow-sm' : ''
                )}
              >
                <LayoutGrid className="h-4 w-4 text-art-charcoal dark:text-white" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={cn(
                  'rounded-full p-1.5 transition-all',
                  viewMode === 'compact' ? 'bg-white dark:bg-art-charcoal shadow-sm' : ''
                )}
              >
                <Grid3x3 className="h-4 w-4 text-art-charcoal dark:text-white" />
              </button>
            </div>
          </div>

          {/* Filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-3">
                  {/* Movements */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Palette className="h-3.5 w-3.5 text-art-charcoal/40 dark:text-white/40" />
                      <span className="text-xs font-semibold text-art-charcoal/40 dark:text-white/40 uppercase tracking-wider">

                        {t('common:gallery.movementFilter', 'Movimiento')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {availableMovements.map((m) => (
                        <FilterChip
                          key={m.id}
                          label={t(m.nameKey)}
                          active={filters.movement === m.id}
                          onClick={() => updateFilter('movement', m.id)}
                          color={m.color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Museums */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Building2 className="h-3.5 w-3.5 text-art-charcoal/40 dark:text-white/40" />
                      <span className="text-xs font-semibold text-art-charcoal/40 dark:text-white/40 uppercase tracking-wider">

                        {t('common:gallery.museumFilter', 'Museo')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {availableMuseums.map((m) => (
                        <FilterChip
                          key={m.id}
                          label={t(m.nameKey)}
                          active={filters.museum === m.id}
                          onClick={() => updateFilter('museum', m.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Century */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-art-charcoal/40 dark:text-white/40" />
                      <span className="text-xs font-semibold text-art-charcoal/40 dark:text-white/40 uppercase tracking-wider">

                        {t('common:gallery.centuryFilter', 'Período')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {CENTURIES.map((c) => (
                        <FilterChip
                          key={c.id}
                          label={c.label}
                          active={filters.century === c.id}
                          onClick={() => updateFilter('century', c.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Clear all */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs font-medium text-art-gold hover:text-art-gold-light transition-colors"
                    >
                      {t('common:gallery.clearFilters', 'Limpiar filtros')}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-art-charcoal/40 dark:text-white/40">

            {filteredArtworks.length} {t('common:gallery.resultsCount', 'obras')}
            {activeFilterCount > 0 && (
              <span> · {activeFilterCount} {t('common:gallery.activeFilters', 'filtros activos')}</span>
            )}
          </p>
        </div>

        {/* Grid */}
        {filteredArtworks.length > 0 ? (
          <div
            className={cn(
              'grid gap-4',
              viewMode === 'grid'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
            )}
          >
            {filteredArtworks.map((artwork, i) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Search className="h-12 w-12 text-art-charcoal/10 dark:text-white/10 mb-4" />
            <p className="text-art-charcoal/40 dark:text-white/40 text-sm">

              {t('common:gallery.noResults', 'No se encontraron obras con estos filtros.')}
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 text-sm font-medium text-art-gold hover:text-art-gold-light transition-colors"
            >
              {t('common:gallery.clearFilters', 'Limpiar filtros')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
