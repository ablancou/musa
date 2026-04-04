'use client';

/**
 * MuseumVirtualTours — Virtual Tour Hub for MŪSA
 *
 * Displays museums with virtual tour links and online collections.
 * Users can browse by region, see artwork counts per museum,
 * and launch external tours directly.
 *
 * Responsive breakpoints:
 * - Desktop (≥1024px): 3-column grid with large cards + map preview
 * - Landscape (568–1023px): 2-column grid, compact cards
 * - Portrait (320–567px): Single column, stacked cards
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ExternalLink,
  MapPin,
  Image as ImageIcon,
  Search,
  Building2,
  Compass,
  Filter,
} from 'lucide-react';
import { MUSEUMS } from '@/data/museums/museums';
import { ARTWORKS } from '@/data/museums/artworks';

// ─── Region Groupings ───
const REGIONS: Record<string, string[]> = {
  all: [],
  americas: ['MX', 'US', 'BR', 'AR', 'CO', 'PE', 'CL'],
  europe: ['FR', 'IT', 'ES', 'GB', 'DE', 'NL', 'AT', 'RU', 'CZ', 'BE', 'NO', 'DK', 'SE', 'CH', 'GR', 'PT', 'PL', 'HU', 'FI', 'HR', 'TR'],
  asia: ['JP', 'CN', 'TW', 'KR', 'IN', 'TH', 'KH', 'IQ'],
  africa: ['EG', 'ZA', 'NG', 'MA', 'TN'],
  oceania: ['AU', 'NZ'],
};

const REGION_LABELS: Record<string, string> = {
  all: 'Todos',
  americas: 'Américas',
  europe: 'Europa',
  asia: 'Asia',
  africa: 'África & Medio Oriente',
  oceania: 'Oceanía',
};

const REGION_ICONS: Record<string, React.ReactNode> = {
  all: <Globe className="w-4 h-4" />,
  americas: <span>🌎</span>,
  europe: <span>🌍</span>,
  asia: <span>🌏</span>,
  africa: <span>🌍</span>,
  oceania: <span>🌏</span>,
};

export default function MuseumVirtualTours() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyTours, setShowOnlyTours] = useState(false);

  // Count artworks per museum
  const artworkCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ARTWORKS.forEach((a) => {
      counts[a.museumId] = (counts[a.museumId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter museums
  const filteredMuseums = useMemo(() => {
    let museums = [...MUSEUMS];

    // Region filter
    if (selectedRegion !== 'all') {
      const countryCodes = REGIONS[selectedRegion];
      museums = museums.filter((m) => countryCodes.includes(m.countryCode));
    }

    // Virtual tour filter
    if (showOnlyTours) {
      museums = museums.filter((m) => m.virtualTourUrl || m.onlineCollectionUrl);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      museums = museums.filter(
        (m) =>
          m.city.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.nameKey.toLowerCase().includes(q)
      );
    }

    // Sort: museums with tours first, then by artwork count
    museums.sort((a, b) => {
      const aTour = a.virtualTourUrl ? 1 : 0;
      const bTour = b.virtualTourUrl ? 1 : 0;
      if (bTour !== aTour) return bTour - aTour;
      return (artworkCounts[b.id] || 0) - (artworkCounts[a.id] || 0);
    });

    return museums;
  }, [selectedRegion, searchQuery, showOnlyTours, artworkCounts]);

  const totalWithTours = MUSEUMS.filter(
    (m) => m.virtualTourUrl || m.onlineCollectionUrl
  ).length;

  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal">
      {/* ── Hero Header ── */}
      <div
        className="relative bg-gradient-to-b from-art-charcoal via-art-charcoal/95 to-art-cream
          dark:from-black dark:via-art-charcoal dark:to-art-charcoal
          pt-24 pb-16 px-4 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-art-gold/20 text-art-gold text-sm font-medium mb-6"
            >
              <Compass className="w-4 h-4" />
              <span>Tours Virtuales</span>
            </div>
            <h1
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold
                text-white mb-4"
            >
              Explora los Museos del Mundo
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              {totalWithTours} museos con tours virtuales y colecciones digitales.
              Visita las salas más emblemáticas sin salir de casa.
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap justify-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{MUSEUMS.length} museos</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{totalWithTours} con tour virtual</span>
              </div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>{ARTWORKS.length}+ obras catalogadas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div
          className="bg-white dark:bg-art-charcoal/80 rounded-2xl shadow-lg
            border border-black/5 dark:border-white/10 p-4 sm:p-6"
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-art-charcoal/40 dark:text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar museo, ciudad o país..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/5 dark:bg-white/10
                text-sm text-art-charcoal dark:text-white
                placeholder:text-art-charcoal/40 dark:placeholder:text-white/40
                border-none outline-none focus:ring-2 focus:ring-art-gold/30"
            />
          </div>

          {/* Region chips + tour toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(REGION_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedRegion(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all
                  ${
                    selectedRegion === key
                      ? 'bg-art-gold text-white shadow-md'
                      : 'bg-black/5 dark:bg-white/10 text-art-charcoal/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/20'
                  }`}
              >
                {REGION_ICONS[key]}
                <span>{label}</span>
              </button>
            ))}

            <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 hidden sm:block" />

            <button
              onClick={() => setShowOnlyTours(!showOnlyTours)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                transition-all
                ${
                  showOnlyTours
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-black/5 dark:bg-white/10 text-art-charcoal/70 dark:text-white/70 hover:bg-black/10'
                }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Solo con tour</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Museum Grid ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm text-art-charcoal/50 dark:text-white/50 mb-6">
          {filteredMuseums.length} museos encontrados
        </p>

        <div
          className="grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredMuseums.map((museum, i) => {
              const count = artworkCounts[museum.id] || 0;
              const hasTour = !!museum.virtualTourUrl;
              const hasCollection = !!museum.onlineCollectionUrl;

              return (
                <motion.div
                  key={museum.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  className="group relative bg-white dark:bg-black/30 rounded-2xl overflow-hidden
                    border border-black/5 dark:border-white/10
                    hover:shadow-xl hover:border-art-gold/30 transition-all duration-300"
                >
                  {/* Museum image */}
                  <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                    <img
                      src={museum.imageUrl}
                      alt={museum.nameKey}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Tour badge */}
                    {hasTour && (
                      <div
                        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1
                          bg-emerald-500/90 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-wide"
                      >
                        <Compass className="w-3 h-3" />
                        Tour Virtual
                      </div>
                    )}

                    {/* Accent color bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ backgroundColor: museum.accentColor }}
                    />

                    {/* Location overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/80" />
                      <span className="text-white text-xs font-medium">
                        {museum.city}, {museum.country}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3
                      className="font-serif text-base font-semibold text-art-charcoal dark:text-white
                        mb-1 line-clamp-1"
                    >
                      {museum.nameKey.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim() || museum.id}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-art-charcoal/50 dark:text-white/50 mb-3">
                      <span>Fundado {museum.foundedYear}</span>
                      {count > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            {count} obras
                          </span>
                        </>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {hasTour && (
                        <a
                          href={museum.virtualTourUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
                            bg-art-gold text-white text-xs font-semibold rounded-lg
                            hover:bg-art-gold-light transition-colors min-w-[120px]"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          Tour Virtual
                        </a>
                      )}
                      {hasCollection && (
                        <a
                          href={museum.onlineCollectionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
                            bg-black/5 dark:bg-white/10 text-art-charcoal dark:text-white
                            text-xs font-semibold rounded-lg
                            hover:bg-black/10 dark:hover:bg-white/20
                            transition-colors min-w-[120px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Colección Online
                        </a>
                      )}
                      {!hasTour && !hasCollection && (
                        <a
                          href={museum.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2
                            bg-black/5 dark:bg-white/10 text-art-charcoal/70 dark:text-white/70
                            text-xs font-medium rounded-lg
                            hover:bg-black/10 dark:hover:bg-white/20
                            transition-colors"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Sitio Web
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredMuseums.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-12 h-12 mx-auto text-art-charcoal/20 dark:text-white/20 mb-4" />
            <p className="text-art-charcoal/50 dark:text-white/50">
              No se encontraron museos con esos filtros.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
