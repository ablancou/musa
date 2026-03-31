/**
 * MuseumRoom — Antechamber of a Real-World Museum
 *
 * When the user selects a museum from the 3D globe, they "enter"
 * that museum's grand hall. Each museum has its own visual identity:
 * accent colors, architectural style, and curated artworks.
 *
 * The room functions as an antechamber — a threshold between the
 * digital globe and the artworks inside. It shows the museum's
 * identity (name, city, building photo) before revealing its collection.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Full 3D perspective room with museum branding
 *   on the back wall, artworks hanging in gold frames, museum building
 *   photo as architectural arch above the entrance. Split into
 *   antechamber entrance + main exhibition hall.
 * - Landscape (568-1023px): Simplified 3D with museum header banner,
 *   artworks in a single row, bottom info bar.
 * - Portrait (320-567px): Museum hero image at top (30%), vertically
 *   scrollable artwork cards below. Touch-friendly 48px targets.
 *
 * Tech: CSS 3D transforms, Framer Motion, zero external dependencies.
 * All images from public domain sources.
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  MapPin,
  Calendar,
  Palette,
  Eye,
  Music,
  Headphones,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type Museum } from '@/data/museums/museums';
import { type Artwork, getArtworksByMuseum } from '@/data/museums/artworks';
import { getMovement } from '@/data/museums/movements';
import { ARTWORK_NARRATIONS } from '@/data/narrations/artworks';
import { cn } from '@/lib/utils/cn';

// ─── Check if artwork has immersive narration ───
function hasNarration(artwork: Artwork): boolean {
  const key = artwork.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  // Also check the titleKey approach
  const titleShortKey = artwork.titleKey.split('.').pop() || '';
  return key in ARTWORK_NARRATIONS || titleShortKey in ARTWORK_NARRATIONS;
}

// ─── Museum-specific wall palette ───
function getMuseumPalette(museum: Museum) {
  const accent = museum.accentColor;
  // Generate complementary colors from the accent
  return {
    wallColor: '#F5F0E8',
    floorGradient: `linear-gradient(180deg, #8B7D6B 0%, #5C5045 100%)`,
    ceilingColor: '#FAF6F0',
    accentLight: `radial-gradient(ellipse at top, ${accent}15 0%, transparent 70%)`,
    frameColor: '#B8860B',
    moldingColor: '#DAA520',
    accent,
    archColor: `${accent}20`,
    bannerGradient: `linear-gradient(135deg, ${accent}CC, ${accent}90)`,
  };
}

// ─── Artwork Frame in Museum Context ───
function MuseumArtworkFrame({
  artwork,
  index,
  total,
  palette,
  onSelect,
}: {
  artwork: Artwork;
  index: number;
  total: number;
  palette: ReturnType<typeof getMuseumPalette>;
  onSelect: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasVoice = hasNarration(artwork);
  const movement = getMovement(artwork.movement);

  const spacing = 100 / (total + 1);
  const leftPercent = spacing * (index + 1);

  return (
    <motion.button
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute group cursor-pointer"
      style={{ left: `${leftPercent}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
    >
      {/* Gold frame */}
      <motion.div
        animate={{
          scale: isHovered ? 1.06 : 1,
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.35), 0 0 40px ${palette.accent}20`
            : '0 8px 25px rgba(0,0,0,0.25)',
        }}
        className="relative"
        style={{
          padding: '6px',
          background: `linear-gradient(145deg, ${palette.frameColor}, ${palette.moldingColor}, ${palette.frameColor})`,
          borderRadius: '3px',
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ padding: '3px', background: `${palette.moldingColor}50` }}
        >
          <div className="relative w-28 h-36 sm:w-36 sm:h-48 lg:w-44 lg:h-56 overflow-hidden bg-art-charcoal">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${artwork.imageUrl})`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />

            {/* Hover overlay with metadata */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3"
            >
              <p className="text-xs font-bold text-white leading-tight">{artwork.titleOriginal}</p>
              <p className="mt-0.5 text-[10px] text-white/70">{artwork.artist}, {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} a.C.`}</p>
              {movement && (
                <span
                  className="mt-1.5 w-fit rounded-full px-2 py-0.5 text-[9px] font-medium text-white"
                  style={{ backgroundColor: movement.color + 'CC' }}
                >
                  {artwork.movement.replace(/-/g, ' ')}
                </span>
              )}
            </motion.div>

            {/* Narration badge */}
            {hasVoice && (
              <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-art-gold/90 shadow-lg">
                <Headphones className="h-3 w-3 text-white" />
              </div>
            )}

            {/* Eye icon */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-lg"
            >
              <Eye className="h-3.5 w-3.5 text-art-charcoal" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Museum label */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        className="mt-2 mx-auto w-fit max-w-[140px] rounded bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm"
      >
        <p className="text-[10px] font-semibold text-art-charcoal text-center leading-tight truncate">
          {artwork.titleOriginal}
        </p>
        <p className="text-[9px] text-art-charcoal/50 text-center">
          {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} a.C.`} · {artwork.technique.replace(/-/g, ' ')}
        </p>
      </motion.div>
    </motion.button>
  );
}

// ─── Floating Dust Particles ───
function MuseumParticles({ accent }: { accent: string }) {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${(i * 19 + 5) % 100}%`,
    size: 1.5 + (i % 3) * 1.5,
    delay: i * 0.4,
    duration: 10 + (i % 5) * 2,
    startY: 15 + (i * 13) % 65,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: p.left, width: p.size, height: p.size, backgroundColor: `${accent}25` }}
          initial={{ y: `${p.startY}%`, opacity: 0 }}
          animate={{ y: [`${p.startY}%`, `${p.startY - 25}%`, `${p.startY}%`], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MAIN MUSEUM ROOM COMPONENT
// ═══════════════════════════════════════════════════
export function MuseumRoom({
  museum,
  onArtworkSelect,
  onBack,
}: {
  museum: Museum;
  onArtworkSelect: (artwork: Artwork) => void;
  onBack: () => void;
}) {
  const { t } = useTranslation('common');
  const palette = getMuseumPalette(museum);
  const artworks = useMemo(() => getArtworksByMuseum(museum.id), [museum.id]);
  const movements = [...new Set(artworks.map((a) => a.movement))];

  return (
    <div className="relative min-h-screen bg-art-charcoal">
      {/* ── Museum Entrance Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-30 border-b border-white/5"
        style={{ background: palette.bannerGradient }}
      >
        <div className="mx-auto flex items-center gap-4 px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-[var(--font-cormorant)] text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              {t(museum.nameKey)}
            </h1>
            <div className="flex items-center gap-3 text-xs text-white/70 sm:text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {museum.city}, {museum.country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {museum.foundedYear}
              </span>
              <span className="flex items-center gap-1">
                <Palette className="h-3 w-3" /> {artworks.length} obras
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ DESKTOP: Full 3D Museum Antechamber ═══ */}
      <div className="hidden lg:block">
        <div className="relative px-8 py-6">
          <div
            className="relative mx-auto overflow-hidden rounded-2xl"
            style={{
              height: '72vh',
              maxHeight: '680px',
              perspective: '1200px',
              perspectiveOrigin: '50% 40%',
            }}
          >
            {/* Ambient light */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: palette.accentLight }} />
            <MuseumParticles accent={palette.accent} />

            {/* Decorative arch at the top — museum entrance feel */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[15%] right-[15%] top-0 z-30 origin-top"
              style={{ height: '12%' }}
            >
              <div
                className="h-full w-full"
                style={{
                  background: palette.bannerGradient,
                  borderRadius: '0 0 50% 50% / 0 0 100% 100%',
                  boxShadow: `0 4px 30px ${palette.accent}30`,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <Building2 className="h-6 w-6 text-white/80" />
                  <span className="ml-2 font-[var(--font-cormorant)] text-lg font-bold text-white/90">
                    {t(museum.nameKey)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Ceiling */}
            <div
              className="absolute left-0 right-0 top-0 origin-top"
              style={{
                height: '28%',
                background: palette.ceilingColor,
                transform: 'rotateX(25deg) translateZ(-20px)',
                borderBottom: `2px solid ${palette.moldingColor}40`,
              }}
            />

            {/* Back wall */}
            <div
              className="absolute left-[8%] right-[8%] top-[12%] bottom-[18%] z-20"
              style={{ background: palette.wallColor, boxShadow: 'inset 0 0 80px rgba(0,0,0,0.04)' }}
            >
              {/* Wainscoting */}
              <div
                className="absolute left-0 right-0 bottom-[25%] h-px"
                style={{ background: palette.moldingColor + '25' }}
              />

              {/* Artworks */}
              {artworks.slice(0, 5).map((artwork, i) => (
                <MuseumArtworkFrame
                  key={artwork.id}
                  artwork={artwork}
                  index={i}
                  total={Math.min(artworks.length, 5)}
                  palette={palette}
                  onSelect={() => onArtworkSelect(artwork)}
                />
              ))}
            </div>

            {/* Left wall */}
            <div
              className="absolute left-0 top-[12%] bottom-[18%] z-10 origin-left"
              style={{
                width: '8%',
                background: `linear-gradient(90deg, ${palette.wallColor}80, ${palette.wallColor})`,
                transform: 'rotateY(-35deg)',
              }}
            />

            {/* Right wall */}
            <div
              className="absolute right-0 top-[12%] bottom-[18%] z-10 origin-right"
              style={{
                width: '8%',
                background: `linear-gradient(-90deg, ${palette.wallColor}80, ${palette.wallColor})`,
                transform: 'rotateY(35deg)',
              }}
            />

            {/* Floor */}
            <div
              className="absolute left-0 right-0 bottom-0 origin-bottom"
              style={{ height: '25%', background: palette.floorGradient, transform: 'rotateX(-15deg) translateZ(-10px)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {movements.slice(0, 4).map((m) => {
                    const info = getMovement(m);
                    return (
                      <span
                        key={m}
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: (info?.color || palette.accent) + 'CC' }}
                      >
                        {m.replace(/-/g, ' ')}
                      </span>
                    );
                  })}
                </div>
              </div>
              {artworks.length > 5 && (
                <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-art-charcoal shadow-sm backdrop-blur-sm">
                  +{artworks.length - 5} más
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Extra artworks below the room — scrollable gallery */}
        {artworks.length > 5 && (
          <div className="mx-auto max-w-7xl px-8 pb-8">
            <h3 className="mb-4 font-[var(--font-cormorant)] text-xl font-bold text-white/80">
              Más obras en {t(museum.nameKey)}
            </h3>
            <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
              {artworks.slice(5).map((artwork, i) => (
                <motion.button
                  key={artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => onArtworkSelect(artwork)}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.titleOriginal}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {hasNarration(artwork) && (
                      <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-art-gold/90">
                        <Headphones className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-white">{artwork.titleOriginal}</p>
                    <p className="text-xs text-white/50">{artwork.artist}, {artwork.year}</p>
                    <p className="mt-1 text-[10px] text-white/30">{artwork.technique.replace(/-/g, ' ')}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ LANDSCAPE: Simplified Museum Room ═══ */}
      <div className="hidden sm:block lg:hidden">
        <div className="relative px-4 py-4">
          <div
            className="relative mx-auto overflow-hidden rounded-xl"
            style={{ height: '50vh', maxHeight: '400px', perspective: '800px' }}
          >
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: palette.accentLight }} />
            <MuseumParticles accent={palette.accent} />

            <div
              className="absolute left-[3%] right-[3%] top-[5%] bottom-[15%] z-20"
              style={{ background: palette.wallColor }}
            >
              {artworks.slice(0, 4).map((artwork, i) => (
                <MuseumArtworkFrame
                  key={artwork.id}
                  artwork={artwork}
                  index={i}
                  total={Math.min(artworks.length, 4)}
                  palette={palette}
                  onSelect={() => onArtworkSelect(artwork)}
                />
              ))}
            </div>

            <div
              className="absolute left-0 right-0 bottom-0"
              style={{ height: '20%', background: palette.floorGradient }}
            />
          </div>
        </div>

        {/* Scrollable artwork cards below */}
        <div className="space-y-2 px-4 pb-6">
          {artworks.slice(4).map((artwork) => (
            <button
              key={artwork.id}
              onClick={() => onArtworkSelect(artwork)}
              className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.titleOriginal}
                className="h-16 w-12 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{artwork.titleOriginal}</p>
                <p className="text-xs text-white/50">{artwork.artist}, {artwork.year}</p>
                <p className="text-[10px] text-white/30">{artwork.movement.replace(/-/g, ' ')} · {artwork.technique.replace(/-/g, ' ')}</p>
              </div>
              {hasNarration(artwork) && <Headphones className="h-4 w-4 shrink-0 text-art-gold" />}
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
            </button>
          ))}
        </div>
      </div>

      {/* ═══ PORTRAIT: Card-based Museum Layout ═══ */}
      <div className="block sm:hidden">
        {/* Museum hero area */}
        <div
          className="relative h-[25vh] min-h-[160px] overflow-hidden"
          style={{ background: palette.bannerGradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-art-charcoal/80" />
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-white/80" />
              <span className="font-[var(--font-cormorant)] text-lg font-bold text-white">
                {t(museum.nameKey)}
              </span>
            </div>
            <p className="mt-1 text-xs text-white/60">
              {museum.city} · {artworks.length} obras · {movements.length} corrientes
            </p>
          </div>
        </div>

        {/* Artwork cards — vertical scroll */}
        <div className="space-y-3 px-4 py-4">
          {artworks.map((artwork, i) => {
            const movement = getMovement(artwork.movement);
            return (
              <motion.button
                key={artwork.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => onArtworkSelect(artwork)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all active:scale-[0.98]"
                style={{ minHeight: '72px' }}
              >
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.titleOriginal}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {hasNarration(artwork) && (
                    <div className="absolute left-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-art-gold">
                      <Headphones className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{artwork.titleOriginal}</p>
                  <p className="text-xs text-white/50">{artwork.artist}, {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} a.C.`}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    {movement && (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] text-white"
                        style={{ backgroundColor: movement.color + 'AA' }}
                      >
                        {artwork.movement.replace(/-/g, ' ')}
                      </span>
                    )}
                    <span className="text-[9px] text-white/30">{artwork.dimensions}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/20" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
