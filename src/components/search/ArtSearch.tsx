/**
 * ArtSearch — Multifaceted Search & Discovery System
 *
 * The user can find any artwork through multiple paths:
 * 1. By Art Movement / Corriente (Impressionism, Baroque, etc.)
 * 2. By Time Period / Fecha (slider from -3000 to 2000)
 * 3. By Artist (alphabetical, with artwork count)
 * 4. By Museum (grouped by country)
 * 5. By Technique (oil, fresco, marble, etc.)
 * 6. Full-text search across all fields
 *
 * Each filter can be combined — e.g., "Impressionism + Louvre + Oil on canvas"
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Sidebar filters (left 280px) + results grid (right).
 *   Sticky filter panel. Results in 3-column masonry grid.
 * - Landscape (568-1023px): Collapsible filter bar at top (horizontal pills),
 *   results in 2-column grid below.
 * - Portrait (320-567px): Full-screen filter modal (bottom sheet),
 *   results in single-column cards. Large touch targets.
 *
 * Tech: Client-side filtering (data is local), Framer Motion animations,
 * debounced search. Zero external dependencies.
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  X,
  Palette,
  Calendar,
  User,
  Building2,
  Brush,
  Headphones,
  ChevronDown,
  ChevronRight,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ARTWORKS, type Artwork, getUniqueArtists, getUniqueMovements, getUniqueTechniques } from '@/data/museums/artworks';
import { MUSEUMS, type Museum } from '@/data/museums/museums';
import { ART_MOVEMENTS, getMovement } from '@/data/museums/movements';
import { ARTWORK_NARRATIONS } from '@/data/narrations/artworks';
import { cn } from '@/lib/utils/cn';

// ─── Filter State ───
interface SearchFilters {
  query: string;
  movements: string[];
  artists: string[];
  museums: string[];
  techniques: string[];
  yearRange: [number, number];
  hasNarration: boolean;
}

const DEFAULT_FILTERS: SearchFilters = {
  query: '',
  movements: [],
  artists: [],
  museums: [],
  techniques: [],
  yearRange: [-3000, 2000],
  hasNarration: false,
};

// ─── Filter Section (collapsible) ───
function FilterSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-art-gold/70" />
          <span className="text-sm font-medium text-white/80">{title}</span>
        </div>
        <ChevronDown
          className={cn('h-4 w-4 text-white/30 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Pill Toggle ───
function FilterPill({
  label,
  isActive,
  color,
  count,
  onClick,
}: {
  label: string;
  isActive: boolean;
  color?: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
        isActive
          ? 'bg-art-gold text-white shadow-sm shadow-art-gold/20'
          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
      )}
    >
      {color && (
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      <span className="capitalize">{label}</span>
      {count !== undefined && (
        <span className={cn('text-[10px]', isActive ? 'text-white/80' : 'text-white/30')}>
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Year Range Slider (dual-thumb) ───
function YearRangeSlider({
  range,
  onChange,
}: {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  const min = -3000;
  const max = 2000;
  const total = max - min;

  const leftPercent = ((range[0] - min) / total) * 100;
  const rightPercent = ((range[1] - min) / total) * 100;

  const formatYear = (y: number) => (y < 0 ? `${Math.abs(y)} a.C.` : `${y}`);

  return (
    <div className="px-1">
      <div className="flex justify-between text-[10px] text-white/40 mb-2">
        <span>{formatYear(range[0])}</span>
        <span>{formatYear(range[1])}</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-art-gold/60 to-art-gold"
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={range[0]}
          onChange={(e) => onChange([Math.min(parseInt(e.target.value), range[1] - 50), range[1]])}
          className="absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-art-gold [&::-webkit-slider-thumb]:shadow-lg cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={50}
          value={range[1]}
          onChange={(e) => onChange([range[0], Math.max(parseInt(e.target.value), range[0] + 50)])}
          className="absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-art-gold [&::-webkit-slider-thumb]:shadow-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

// ─── Result Card ───
function ArtworkResultCard({
  artwork,
  museum,
  onSelect,
}: {
  artwork: Artwork;
  museum?: Museum;
  onSelect: () => void;
}) {
  const movement = getMovement(artwork.movement);
  const titleShortKey = artwork.titleKey.split('.').pop() || '';
  const hasVoice = titleShortKey in ARTWORK_NARRATIONS;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onSelect}
      className="group w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-all hover:border-white/20 hover:bg-white/8"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.titleOriginal}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {movement && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white shadow-sm"
              style={{ backgroundColor: movement.color + 'CC' }}
            >
              {artwork.movement.replace(/-/g, ' ')}
            </span>
          )}
          {hasVoice && (
            <span className="flex items-center gap-1 rounded-full bg-art-gold/90 px-2 py-0.5 text-[9px] font-medium text-white shadow-sm">
              <Headphones className="h-2.5 w-2.5" /> Narración
            </span>
          )}
        </div>

        {/* Hover eye */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-art-charcoal" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-bold text-white">{artwork.titleOriginal}</h3>
        <p className="mt-0.5 text-xs text-white/60">{artwork.artist}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/35">
          <span>{artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} a.C.`}</span>
          <span>·</span>
          <span className="capitalize">{artwork.technique.replace(/-/g, ' ')}</span>
          {artwork.dimensions && (
            <>
              <span>·</span>
              <span>{artwork.dimensions}</span>
            </>
          )}
        </div>
        {museum && (
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-white/30">
            <Building2 className="h-3 w-3" />
            <span>{museum.city}</span>
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN SEARCH COMPONENT
// ═══════════════════════════════════════════════════════
export function ArtSearch({
  onSelectArtwork,
}: {
  onSelectArtwork?: (artwork: Artwork) => void;
}) {
  const { t } = useTranslation('common');
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Cached data
  const allArtists = useMemo(() => getUniqueArtists(), []);
  const allMovements = useMemo(() => getUniqueMovements(), []);
  const allTechniques = useMemo(() => getUniqueTechniques(), []);
  const museumMap = useMemo(() => {
    const map: Record<string, Museum> = {};
    MUSEUMS.forEach((m) => (map[m.id] = m));
    return map;
  }, []);

  // Count artworks per filter value
  const movementCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTWORKS.forEach((a) => { counts[a.movement] = (counts[a.movement] || 0) + 1; });
    return counts;
  }, []);

  const artistCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTWORKS.forEach((a) => { counts[a.artist] = (counts[a.artist] || 0) + 1; });
    return counts;
  }, []);

  const museumCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTWORKS.forEach((a) => { counts[a.museumId] = (counts[a.museumId] || 0) + 1; });
    return counts;
  }, []);

  // Apply filters
  const results = useMemo(() => {
    return ARTWORKS.filter((artwork) => {
      // Text search
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const searchable = [
          artwork.titleOriginal,
          artwork.artist,
          artwork.movement,
          artwork.technique,
          artwork.medium,
          artwork.artistNationality,
          museumMap[artwork.museumId]?.city || '',
        ].join(' ').toLowerCase();
        if (!searchable.includes(q)) return false;
      }

      // Movement filter
      if (filters.movements.length > 0 && !filters.movements.includes(artwork.movement)) return false;

      // Artist filter
      if (filters.artists.length > 0 && !filters.artists.includes(artwork.artist)) return false;

      // Museum filter
      if (filters.museums.length > 0 && !filters.museums.includes(artwork.museumId)) return false;

      // Technique filter
      if (filters.techniques.length > 0 && !filters.techniques.includes(artwork.technique)) return false;

      // Year range
      if (artwork.year < filters.yearRange[0] || artwork.year > filters.yearRange[1]) return false;

      // Has narration
      if (filters.hasNarration) {
        const key = artwork.titleKey.split('.').pop() || '';
        if (!(key in ARTWORK_NARRATIONS)) return false;
      }

      return true;
    });
  }, [filters, museumMap]);

  // Toggle filter value
  const toggleFilter = useCallback(
    (key: 'movements' | 'artists' | 'museums' | 'techniques', value: string) => {
      setFilters((prev) => {
        const arr = prev[key];
        return {
          ...prev,
          [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      });
    },
    []
  );

  const activeFilterCount = filters.movements.length + filters.artists.length + filters.museums.length + filters.techniques.length + (filters.hasNarration ? 1 : 0) + (filters.yearRange[0] !== -3000 || filters.yearRange[1] !== 2000 ? 1 : 0);

  // ─── Filter Panel Content (shared between desktop sidebar and mobile sheet) ───
  const filterContent = (
    <div className="space-y-1">
      {/* Movement / Corriente */}
      <FilterSection title="Corriente Artística" icon={Palette} defaultOpen={true}>
        <div className="flex flex-wrap gap-1.5">
          {ART_MOVEMENTS.filter((m) => movementCounts[m.id]).map((m) => (
            <FilterPill
              key={m.id}
              label={m.id.replace(/-/g, ' ')}
              isActive={filters.movements.includes(m.id)}
              color={m.color}
              count={movementCounts[m.id]}
              onClick={() => toggleFilter('movements', m.id)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Time Period */}
      <FilterSection title="Período" icon={Calendar} defaultOpen={true}>
        <YearRangeSlider
          range={filters.yearRange}
          onChange={(range) => setFilters((prev) => ({ ...prev, yearRange: range }))}
        />
      </FilterSection>

      {/* Artist */}
      <FilterSection title="Artista" icon={User}>
        <div className="max-h-48 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {allArtists.map((artist) => (
            <button
              key={artist}
              onClick={() => toggleFilter('artists', artist)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all',
                filters.artists.includes(artist)
                  ? 'bg-art-gold/20 text-art-gold'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <span className="truncate">{artist}</span>
              <span className="shrink-0 text-[10px] text-white/30">{artistCounts[artist]}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Museum */}
      <FilterSection title="Museo" icon={Building2}>
        <div className="max-h-48 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {MUSEUMS.filter((m) => museumCounts[m.id]).map((museum) => (
            <button
              key={museum.id}
              onClick={() => toggleFilter('museums', museum.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all',
                filters.museums.includes(museum.id)
                  ? 'bg-art-gold/20 text-art-gold'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <span className="truncate">{museum.city} — {t(museum.nameKey)}</span>
              <span className="shrink-0 text-[10px] text-white/30">{museumCounts[museum.id]}</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Technique */}
      <FilterSection title="Técnica" icon={Brush}>
        <div className="flex flex-wrap gap-1.5">
          {allTechniques.map((tech) => (
            <FilterPill
              key={tech}
              label={tech.replace(/-/g, ' ')}
              isActive={filters.techniques.includes(tech)}
              onClick={() => toggleFilter('techniques', tech)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Special: Has narration */}
      <div className="py-3">
        <button
          onClick={() => setFilters((prev) => ({ ...prev, hasNarration: !prev.hasNarration }))}
          className={cn(
            'flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
            filters.hasNarration
              ? 'bg-art-gold/20 text-art-gold'
              : 'bg-white/5 text-white/50 hover:bg-white/10'
          )}
        >
          <Headphones className="h-4 w-4" />
          Con narración de voz
        </button>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <button
          onClick={() => setFilters(DEFAULT_FILTERS)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs text-white/50 transition-all hover:border-white/20 hover:text-white/70"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-art-charcoal">
      {/* ── Search Bar (all viewports) ── */}
      <div className="sticky top-0 z-40 border-b border-white/5 bg-art-charcoal/95 backdrop-blur-sm">
        <div className="mx-auto flex items-center gap-3 px-4 py-3 sm:px-6 lg:max-w-[1400px] lg:px-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              placeholder="Buscar por obra, artista, museo, técnica..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-art-gold/40 focus:outline-none focus:ring-1 focus:ring-art-gold/20"
            />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className={cn(
              'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all lg:hidden',
              activeFilterCount > 0
                ? 'border-art-gold/40 bg-art-gold/10 text-art-gold'
                : 'border-white/10 bg-white/5 text-white/60'
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-art-gold text-[10px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Result count */}
          <span className="hidden text-sm text-white/40 sm:block">
            {results.length} obras
          </span>
        </div>
      </div>

      <div className="mx-auto flex lg:max-w-[1400px]">
        {/* ── Desktop Sidebar Filters ── */}
        <aside className="hidden w-[280px] shrink-0 border-r border-white/5 p-4 lg:block">
          <div className="sticky top-[60px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {filterContent}
          </div>
        </aside>

        {/* ── Results Grid ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Palette className="h-12 w-12 text-white/10" />
              <p className="mt-4 text-lg text-white/30">No se encontraron obras</p>
              <p className="mt-1 text-sm text-white/20">Prueba ajustando los filtros</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="mt-4 rounded-full bg-art-gold/20 px-4 py-2 text-sm text-art-gold transition-all hover:bg-art-gold/30"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-4',
                /* Desktop */ 'lg:grid-cols-3 xl:grid-cols-4',
                /* Landscape */ 'sm:max-lg:grid-cols-2',
                /* Portrait */ 'max-sm:grid-cols-1'
              )}
            >
              <AnimatePresence mode="popLayout">
                {results.map((artwork) => (
                  <ArtworkResultCard
                    key={artwork.id}
                    artwork={artwork}
                    museum={museumMap[artwork.museumId]}
                    onSelect={() => onSelectArtwork?.(artwork)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      {/* ── Mobile Filter Bottom Sheet ── */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-[#0d0d14] px-5 pb-8 pt-4 lg:hidden"
            >
              {/* Handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Filtros</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {filterContent}

              {/* Apply button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-4 w-full rounded-xl bg-art-gold py-3 text-sm font-bold text-white shadow-lg shadow-art-gold/20"
              >
                Ver {results.length} resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
