'use client';

/**
 * CountryInfoPanel — Auto-appearing floating panel
 *
 * When a country's beacon cluster faces the camera during globe rotation,
 * this panel smoothly appears on the RIGHT side of the globe (never on top).
 *
 * Shows: country name (clickable), museum list with brief info (clickable),
 * artwork count per museum, and a visual accent from the country's top museum.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Floating panel overlaid right side of globe area
 * - Landscape (568-1023px): Compact bottom overlay card
 * - Portrait (320-567px): Thin notification bar at bottom of globe
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Building2, ChevronRight, Palette, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Museum } from '@/data/museums/museums';
import type { Artwork } from '@/data/museums/artworks';

export interface FacingCountry {
  country: string;
  countryCode: string;
  museums: Museum[];
  totalArtworks: number;
  /** 0–1 how directly the cluster faces the camera (1 = dead center) */
  facingStrength: number;
}

interface CountryInfoPanelProps {
  facingCountry: FacingCountry | null;
  museumArtworks: Record<string, Artwork[]>;
  onMuseumClick: (museumId: string) => void;
  onCountryClick: (countryCode: string) => void;
}

/** Country flag emoji from country code */
function countryFlag(code: string): string {
  try {
    return code
      .toUpperCase()
      .split('')
      .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
      .join('');
  } catch {
    return '🌍';
  }
}

export function CountryInfoPanel({
  facingCountry,
  museumArtworks,
  onMuseumClick,
  onCountryClick,
}: CountryInfoPanelProps) {
  const { t } = useTranslation(['common', 'museums']);

  return (
    <AnimatePresence mode="wait">
      {facingCountry && facingCountry.facingStrength > 0.65 && (
        <motion.div
          key={facingCountry.countryCode}
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={[
            // Desktop: floating panel on the right side of globe area
            'pointer-events-auto absolute z-30',
            'lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-72',
            // Landscape: bottom overlay
            'sm:max-lg:bottom-4 sm:max-lg:left-4 sm:max-lg:right-4',
            // Portrait: compact bottom bar
            'max-sm:bottom-2 max-sm:left-2 max-sm:right-2',
          ].join(' ')}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c1a]/90 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {/* Country header */}
            <button
              onClick={() => onCountryClick(facingCountry.countryCode)}
              className="group flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors hover:bg-white/5"
            >
              <span className="text-2xl lg:text-3xl">
                {countryFlag(facingCountry.countryCode)}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-[var(--font-cormorant)] text-base font-bold text-white lg:text-lg">
                  {facingCountry.country}
                </h3>
                <p className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <Building2 className="h-3 w-3" />
                  {facingCountry.museums.length}{' '}
                  {facingCountry.museums.length === 1 ? 'museo' : 'museos'}
                  <span className="mx-1 text-white/20">·</span>
                  <Palette className="h-3 w-3" />
                  {facingCountry.totalArtworks} obras
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-art-gold" />
            </button>

            {/* Museum list — scrollable on desktop, horizontal scroll on mobile */}
            <div className="max-h-60 space-y-0.5 overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-white/10 max-sm:flex max-sm:max-h-none max-sm:gap-2 max-sm:overflow-x-auto max-sm:overflow-y-hidden max-sm:space-y-0 max-sm:p-2">
              {facingCountry.museums.slice(0, 6).map((museum) => {
                const artworks = museumArtworks[museum.id] || [];
                const topArtwork = artworks[0];

                return (
                  <button
                    key={museum.id}
                    onClick={() => onMuseumClick(museum.id)}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/5 max-sm:w-52 max-sm:shrink-0 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:rounded-lg max-sm:border max-sm:border-white/10 max-sm:bg-white/5 max-sm:p-3"
                  >
                    {/* Museum thumbnail — top artwork */}
                    {topArtwork && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg max-sm:h-24 max-sm:w-full">
                        <img
                          src={topArtwork.imageUrl}
                          alt={topArtwork.titleOriginal}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    {!topArtwork && (
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg max-sm:h-16 max-sm:w-full"
                        style={{ backgroundColor: museum.accentColor + '20' }}
                      >
                        <Building2
                          className="h-5 w-5"
                          style={{ color: museum.accentColor }}
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-white/90 group-hover:text-art-gold">
                        {t(`museums:${museum.nameKey}`)}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] text-white/35">
                        {museum.city} · {artworks.length} obras
                      </p>
                    </div>

                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/20 transition-all group-hover:text-art-gold/60 max-sm:hidden" />
                  </button>
                );
              })}

              {facingCountry.museums.length > 6 && (
                <div className="px-3 py-2 text-center text-[11px] text-white/30">
                  +{facingCountry.museums.length - 6} más
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
