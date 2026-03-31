/**
 * GalleryRoom — A CSS 3D Museum Room
 *
 * Each art era gets its own immersive room with 3D perspective walls,
 * ambient lighting, framed artworks hanging on the walls, and era-specific
 * atmosphere (colors, textures, mood).
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Full 3D perspective room with depth. Floor, ceiling, back wall,
 *   two side walls. Artworks hang in gold frames. Hover to zoom into artwork.
 *   Ambient particles float gently. Room height ~80vh.
 * - Landscape (568-1023px): Simplified 3D — back wall + floor only, reduced depth.
 *   Artworks in a single row. Room height ~60vh.
 * - Portrait (320-567px): Flat gallery view with parallax depth illusion.
 *   Artworks in a scrollable horizontal strip. Room height ~50vh.
 *   Touch-friendly: tap artwork to view detail.
 *
 * Technology: CSS 3D transforms (perspective, rotateX/Y, translateZ),
 * Framer Motion for entrance animations, CSS custom properties for era theming.
 * Zero external dependencies beyond what's already in the project.
 * All images from public domain sources (Wikimedia Commons, Met Open Access, etc.)
 */

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ChevronRight, Eye, X, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TimelineEra, TimelineArtwork } from '@/data/timeline/eras';
import { cn } from '@/lib/utils/cn';

// ─── Era-specific room atmosphere ───
const ERA_ATMOSPHERES: Record<string, {
  wallColor: string;
  floorGradient: string;
  ceilingColor: string;
  ambientLight: string;
  frameColor: string;
  moldingColor: string;
  particleColor: string;
}> = {
  'ancient-egypt': {
    wallColor: '#F5E6C8',
    floorGradient: 'linear-gradient(180deg, #C4A265 0%, #8B7355 100%)',
    ceilingColor: '#E8D5B0',
    ambientLight: 'radial-gradient(ellipse at top, rgba(255,200,100,0.15) 0%, transparent 70%)',
    frameColor: '#C5932A',
    moldingColor: '#DAA520',
    particleColor: 'rgba(197,147,42,0.3)',
  },
  'renaissance': {
    wallColor: '#EDE4D3',
    floorGradient: 'linear-gradient(180deg, #8B7355 0%, #5C4A3A 100%)',
    ceilingColor: '#F5EFE6',
    ambientLight: 'radial-gradient(ellipse at top, rgba(218,165,32,0.12) 0%, transparent 70%)',
    frameColor: '#B8860B',
    moldingColor: '#DAA520',
    particleColor: 'rgba(218,165,32,0.2)',
  },
  'baroque': {
    wallColor: '#2C1810',
    floorGradient: 'linear-gradient(180deg, #1A0F08 0%, #0D0705 100%)',
    ceilingColor: '#3A2218',
    ambientLight: 'radial-gradient(ellipse at top, rgba(197,147,42,0.2) 0%, transparent 60%)',
    frameColor: '#C5932A',
    moldingColor: '#8B6914',
    particleColor: 'rgba(197,147,42,0.25)',
  },
  'impressionism': {
    wallColor: '#EBF0F5',
    floorGradient: 'linear-gradient(180deg, #C8D6E0 0%, #A0B0C0 100%)',
    ceilingColor: '#F0F4F8',
    ambientLight: 'radial-gradient(ellipse at top, rgba(74,123,167,0.1) 0%, transparent 70%)',
    frameColor: '#8FA8C0',
    moldingColor: '#B0C4D8',
    particleColor: 'rgba(74,123,167,0.15)',
  },
  'post-impressionism': {
    wallColor: '#F5EDE0',
    floorGradient: 'linear-gradient(180deg, #A08060 0%, #6B5040 100%)',
    ceilingColor: '#FAF3E8',
    ambientLight: 'radial-gradient(ellipse at top, rgba(232,160,64,0.15) 0%, transparent 70%)',
    frameColor: '#B8860B',
    moldingColor: '#DAA520',
    particleColor: 'rgba(232,160,64,0.2)',
  },
  'expressionism': {
    wallColor: '#1A1A2E',
    floorGradient: 'linear-gradient(180deg, #16213E 0%, #0F0F1A 100%)',
    ceilingColor: '#1A1A2E',
    ambientLight: 'radial-gradient(ellipse at top, rgba(204,0,0,0.15) 0%, transparent 60%)',
    frameColor: '#333333',
    moldingColor: '#555555',
    particleColor: 'rgba(204,0,0,0.2)',
  },
  'surrealism': {
    wallColor: '#1E0A30',
    floorGradient: 'linear-gradient(180deg, #2D1B4E 0%, #150828 100%)',
    ceilingColor: '#2A1040',
    ambientLight: 'radial-gradient(ellipse at top, rgba(107,35,142,0.2) 0%, transparent 70%)',
    frameColor: '#6B238E',
    moldingColor: '#9B59B6',
    particleColor: 'rgba(107,35,142,0.25)',
  },
  'pop-art': {
    wallColor: '#FFFFFF',
    floorGradient: 'linear-gradient(180deg, #F0F0F0 0%, #DDDDDD 100%)',
    ceilingColor: '#FFFFFF',
    ambientLight: 'radial-gradient(ellipse at top, rgba(255,20,147,0.08) 0%, transparent 70%)',
    frameColor: '#333333',
    moldingColor: '#FF1493',
    particleColor: 'rgba(255,20,147,0.15)',
  },
};

const DEFAULT_ATMOSPHERE = {
  wallColor: '#F0EBE3',
  floorGradient: 'linear-gradient(180deg, #9B8B78 0%, #6B5B48 100%)',
  ceilingColor: '#F5F0E8',
  ambientLight: 'radial-gradient(ellipse at top, rgba(196,162,101,0.12) 0%, transparent 70%)',
  frameColor: '#B8860B',
  moldingColor: '#DAA520',
  particleColor: 'rgba(196,162,101,0.2)',
};

// ─── Framed Artwork on the Wall ───
function FramedArtwork({
  artwork,
  index,
  total,
  frameColor,
  moldingColor,
  onSelect,
}: {
  artwork: TimelineArtwork;
  index: number;
  total: number;
  frameColor: string;
  moldingColor: string;
  onSelect: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Distribute artworks evenly along the wall
  const spacing = 100 / (total + 1);
  const leftPercent = spacing * (index + 1);

  return (
    <motion.button
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
      className="absolute group cursor-pointer"
      style={{
        left: `${leftPercent}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer frame */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.4), 0 0 80px ${moldingColor}30`
            : '0 8px 30px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{
          padding: '8px',
          background: `linear-gradient(135deg, ${frameColor}, ${moldingColor}, ${frameColor})`,
          borderRadius: '4px',
        }}
      >
        {/* Inner frame bevel */}
        <div
          className="relative overflow-hidden"
          style={{
            padding: '4px',
            background: `linear-gradient(135deg, ${moldingColor}80, ${frameColor}60)`,
          }}
        >
          {/* Canvas / Artwork */}
          <div className="relative w-32 h-40 sm:w-40 sm:h-52 lg:w-48 lg:h-64 overflow-hidden bg-art-charcoal">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${artwork.imageUrl})`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />

            {/* Hover overlay */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3"
            >
              <div>
                <p className="text-xs font-semibold text-white sm:text-sm">{artwork.title}</p>
                <p className="text-[10px] text-white/70 sm:text-xs">
                  {artwork.artist}, {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} BCE`}
                </p>
              </div>
            </motion.div>

            {/* Eye icon on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-lg"
            >
              <Eye className="h-4 w-4 text-art-charcoal" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Museum label plate beneath the frame */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        className="mt-3 mx-auto w-fit rounded-sm bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm"
      >
        <p className="text-[10px] font-semibold text-art-charcoal text-center leading-tight sm:text-xs">
          {artwork.title}
        </p>
        <p className="text-[9px] text-art-charcoal/50 text-center sm:text-[10px]">
          {artwork.artist}
        </p>
      </motion.div>
    </motion.button>
  );
}

// ─── Floating Ambient Particles ───
function AmbientParticles({ color }: { color: string }) {
  // Generate deterministic particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 23 + 7) % 100}%`,
    size: 2 + (i % 3) * 2,
    delay: i * 0.5,
    duration: 8 + (i % 4) * 3,
    startY: 20 + (i * 17) % 60,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: color,
          }}
          initial={{ y: `${p.startY}%`, opacity: 0 }}
          animate={{
            y: [`${p.startY}%`, `${p.startY - 30}%`, `${p.startY}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN GALLERY ROOM COMPONENT ──────────
// ═══════════════════════════════════════════
export function GalleryRoom({
  era,
  isActive,
  onArtworkSelect,
}: {
  era: TimelineEra;
  isActive: boolean;
  onArtworkSelect: (artwork: TimelineArtwork) => void;
}) {
  const { t } = useTranslation('common');
  const atmos = ERA_ATMOSPHERES[era.id] || DEFAULT_ATMOSPHERE;

  // Combine keyArtworks + artist representative works (unique)
  const allArtworks = [
    ...era.keyArtworks,
    ...era.artists
      .map((a) => a.representativeWork)
      .filter((aw) => !era.keyArtworks.some((k) => k.titleKey === aw.titleKey)),
  ].slice(0, 5); // Max 5 per room

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className={cn('relative w-full', !isActive && 'pointer-events-none absolute inset-0')}
    >
      {/* ═══ DESKTOP: Full 3D Room ═══ */}
      <div className="hidden lg:block">
        <div
          className="relative mx-auto overflow-hidden rounded-2xl"
          style={{
            height: '75vh',
            maxHeight: '700px',
            perspective: '1200px',
            perspectiveOrigin: '50% 40%',
          }}
        >
          {/* Ambient light overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: atmos.ambientLight }} />

          {/* Floating particles */}
          <AmbientParticles color={atmos.particleColor} />

          {/* ── Ceiling ── */}
          <div
            className="absolute left-0 right-0 top-0 origin-top"
            style={{
              height: '30%',
              background: atmos.ceilingColor,
              transform: 'rotateX(25deg) translateZ(-20px)',
              borderBottom: `2px solid ${atmos.moldingColor}40`,
            }}
          >
            {/* Crown molding detail */}
            <div
              className="absolute bottom-0 left-0 right-0 h-3"
              style={{
                background: `linear-gradient(180deg, ${atmos.moldingColor}30, transparent)`,
              }}
            />
          </div>

          {/* ── Back Wall ── */}
          <div
            className="absolute left-[8%] right-[8%] top-[12%] bottom-[18%] z-20"
            style={{
              background: atmos.wallColor,
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.05)',
            }}
          >
            {/* Wall texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\' fill=\'%23000\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              }}
            />

            {/* Wainscoting / dado rail */}
            <div
              className="absolute left-0 right-0 bottom-[25%] h-px"
              style={{ background: atmos.moldingColor + '30' }}
            />

            {/* Artworks hanging on the wall */}
            {allArtworks.map((artwork, i) => (
              <FramedArtwork
                key={artwork.titleKey}
                artwork={artwork}
                index={i}
                total={allArtworks.length}
                frameColor={atmos.frameColor}
                moldingColor={atmos.moldingColor}
                onSelect={() => onArtworkSelect(artwork)}
              />
            ))}
          </div>

          {/* ── Left Wall (perspective) ── */}
          <div
            className="absolute left-0 top-[12%] bottom-[18%] z-10 origin-left"
            style={{
              width: '8%',
              background: `linear-gradient(90deg, ${atmos.wallColor}80, ${atmos.wallColor})`,
              transform: 'rotateY(-35deg) translateZ(0px)',
            }}
          />

          {/* ── Right Wall (perspective) ── */}
          <div
            className="absolute right-0 top-[12%] bottom-[18%] z-10 origin-right"
            style={{
              width: '8%',
              background: `linear-gradient(-90deg, ${atmos.wallColor}80, ${atmos.wallColor})`,
              transform: 'rotateY(35deg) translateZ(0px)',
            }}
          />

          {/* ── Floor ── */}
          <div
            className="absolute left-0 right-0 bottom-0 origin-bottom"
            style={{
              height: '25%',
              background: atmos.floorGradient,
              transform: 'rotateX(-15deg) translateZ(-10px)',
            }}
          >
            {/* Floor reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          </div>

          {/* ── Room info overlay ── */}
          <div className="absolute bottom-6 left-6 right-6 z-30 flex items-end justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="font-[var(--font-cormorant)] text-3xl font-bold"
                style={{ color: era.color }}
              >
                {t(era.nameKey)}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-1 text-sm text-art-charcoal/50"
              >
                {era.startYear > 0 ? era.startYear : `${Math.abs(era.startYear)} BCE`} –{' '}
                {era.endYear > 0 ? era.endYear : `${Math.abs(era.endYear)} BCE`}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
            >
              <Music className="h-4 w-4" style={{ color: era.color }} />
              <span className="text-xs text-art-charcoal/70">{era.musicGenre}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ LANDSCAPE: Simplified 3D ═══ */}
      <div className="hidden sm:block lg:hidden">
        <div
          className="relative mx-auto overflow-hidden rounded-xl"
          style={{
            height: '55vh',
            maxHeight: '450px',
            perspective: '800px',
            perspectiveOrigin: '50% 45%',
          }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: atmos.ambientLight }} />
          <AmbientParticles color={atmos.particleColor} />

          {/* Back wall */}
          <div
            className="absolute left-[3%] right-[3%] top-[5%] bottom-[15%] z-20"
            style={{ background: atmos.wallColor }}
          >
            {allArtworks.map((artwork, i) => (
              <FramedArtwork
                key={artwork.titleKey}
                artwork={artwork}
                index={i}
                total={allArtworks.length}
                frameColor={atmos.frameColor}
                moldingColor={atmos.moldingColor}
                onSelect={() => onArtworkSelect(artwork)}
              />
            ))}
          </div>

          {/* Floor */}
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ height: '20%', background: atmos.floorGradient }}
          />

          {/* Info */}
          <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between">
            <div>
              <h2 className="font-[var(--font-cormorant)] text-xl font-bold" style={{ color: era.color }}>
                {t(era.nameKey)}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Music className="h-3 w-3" style={{ color: era.color }} />
                <span className="text-[11px] text-art-charcoal/50">{era.musicGenre}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ PORTRAIT: Flat Gallery with Depth Illusion ═══ */}
      <div className="block sm:hidden">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            height: '45vh',
            minHeight: '320px',
            background: atmos.wallColor,
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: atmos.ambientLight }} />

          {/* Room header */}
          <div className="relative z-10 px-4 pt-4">
            <h2 className="font-[var(--font-cormorant)] text-xl font-bold" style={{ color: era.color }}>
              {t(era.nameKey)}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Music className="h-3 w-3" style={{ color: era.color }} />
              <span className="text-[11px] text-art-charcoal/50">{era.musicGenre}</span>
            </div>
          </div>

          {/* Horizontal artwork strip */}
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: '65%' }}>
            <div className="flex h-full items-center gap-4 overflow-x-auto px-4 pb-4 pt-2 snap-x snap-mandatory">
              {allArtworks.map((artwork, i) => (
                <motion.button
                  key={artwork.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => onArtworkSelect(artwork)}
                  className="flex-shrink-0 snap-center"
                >
                  <div
                    className="relative h-40 w-32 overflow-hidden rounded-lg shadow-xl"
                    style={{
                      border: `4px solid ${atmos.frameColor}`,
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${artwork.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-[10px] font-semibold text-white leading-tight">{artwork.title}</p>
                      <p className="text-[9px] text-white/60">{artwork.artist}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Floor strip */}
          <div
            className="absolute bottom-0 left-0 right-0 h-8"
            style={{ background: atmos.floorGradient }}
          />
        </div>
      </div>
    </motion.div>
  );
}
