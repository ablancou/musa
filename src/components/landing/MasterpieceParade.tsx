'use client';

/**
 * MasterpieceParade — Cinematic Infinite Scroll of Masterworks
 *
 * Two rows of masterpieces scrolling in opposite directions with
 * smooth CSS animation, hover-pause, and golden glow effects.
 * Inspired by luxury brand landing pages.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Two rows, large artwork cards (280px tall), generous spacing
 * - Landscape (568-1023px): Two rows, medium cards (220px tall)
 * - Portrait (320-567px): Two rows, compact cards (180px tall), tighter spacing
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

// Curated masterpieces — all public domain (artists deceased 70+ years)
// Featuring Monet & Van Gogh prominently
const ROW_1 = [
  {
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    year: 1889,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  },
  {
    title: 'Water Lilies',
    artist: 'Claude Monet',
    year: 1906,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
  },
  {
    title: 'The Great Wave',
    artist: 'Katsushika Hokusai',
    year: 1831,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg',
  },
  {
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    year: 1665,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
  },
  {
    title: 'The Birth of Venus',
    artist: 'Sandro Botticelli',
    year: 1485,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
  },
  {
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    year: 1872,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg',
  },
  {
    title: 'Almond Blossom',
    artist: 'Vincent van Gogh',
    year: 1890,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg',
  },
  {
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    year: 1908,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/800px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg',
  },
];

const ROW_2 = [
  {
    title: 'Water Lilies and Japanese Bridge',
    artist: 'Claude Monet',
    year: 1899,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Claude_Monet_-_Water_Lilies_and_Japanese_Bridge_%281899%29_-_Google_Art_Project.jpg/1280px-Claude_Monet_-_Water_Lilies_and_Japanese_Bridge_%281899%29_-_Google_Art_Project.jpg',
  },
  {
    title: 'Sunflowers',
    artist: 'Vincent van Gogh',
    year: 1888,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/800px-Vincent_Willem_van_Gogh_127.jpg',
  },
  {
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    year: 1818,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/800px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
  },
  {
    title: 'Liberty Leading the People',
    artist: 'Eugène Delacroix',
    year: 1830,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
  },
  {
    title: 'Café Terrace at Night',
    artist: 'Vincent van Gogh',
    year: 1888,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Van_Gogh_-_Terrasse_des_Caf%C3%A9s_an_der_Place_du_Forum_in_Arles_am_Abend1.jpeg/800px-Van_Gogh_-_Terrasse_des_Caf%C3%A9s_an_der_Place_du_Forum_in_Arles_am_Abend1.jpeg',
  },
  {
    title: 'Rouen Cathedral',
    artist: 'Claude Monet',
    year: 1894,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.jpg/800px-Claude_Monet_-_Rouen_Cathedral%2C_Facade_%28Sunset%29.jpg',
  },
  {
    title: 'The Starry Night Over the Rhône',
    artist: 'Vincent van Gogh',
    year: 1888,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/1280px-Starry_Night_Over_the_Rhone.jpg',
  },
  {
    title: 'The Creation of Adam',
    artist: 'Michelangelo',
    year: 1512,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
  },
];

interface ArtworkCardProps {
  title: string;
  artist: string;
  year: number;
  image: string;
}

function ArtworkCard({ title, artist, year, image }: ArtworkCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="group relative flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl
                    w-[240px] h-[180px]
                    sm:w-[300px] sm:h-[220px]
                    lg:w-[360px] lg:h-[280px]
                    transition-all duration-500 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-art-gold/20">
      {/* Image */}
      {!error ? (
        <img
          src={image}
          alt={`${title} by ${artist}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'h-full w-full object-cover transition-all duration-700',
            'group-hover:scale-110',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-art-charcoal/10 to-art-charcoal/5 dark:from-white/10 dark:to-white/5">
          <span className="text-3xl opacity-20">🎨</span>
        </div>
      )}

      {/* Shimmer placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-art-charcoal/5 via-art-charcoal/10 to-art-charcoal/5 dark:from-white/5 dark:via-white/10 dark:to-white/5" />
      )}

      {/* Hover overlay with info */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 sm:p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h4 className="text-sm font-semibold text-white sm:text-base lg:text-lg line-clamp-1">
          {title}
        </h4>
        <p className="text-xs text-white/70 sm:text-sm">
          {artist} <span className="text-art-gold">· {year}</span>
        </p>
      </div>

      {/* Top-right golden shine on hover */}
      <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-art-gold/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function ScrollRow({ artworks, direction, speed }: { artworks: ArtworkCardProps[]; direction: 'left' | 'right'; speed: number }) {
  // Duplicate for seamless loop
  const items = [...artworks, ...artworks];
  const totalWidth = artworks.length; // CSS uses percentage-based animation

  return (
    <div className="relative overflow-hidden group/row">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-24 lg:w-40 bg-gradient-to-r from-art-cream dark:from-art-charcoal to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-24 lg:w-40 bg-gradient-to-l from-art-cream dark:from-art-charcoal to-transparent" />

      <div
        className={cn(
          'flex gap-3 sm:gap-4 lg:gap-5',
          'group-hover/row:[animation-play-state:paused]',
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        )}
        style={{
          animationDuration: `${speed}s`,
          width: 'max-content',
        }}
      >
        {items.map((artwork, i) => (
          <ArtworkCard key={`${artwork.title}-${i}`} {...artwork} />
        ))}
      </div>
    </div>
  );
}

export function MasterpieceParade() {
  return (
    <section className="relative overflow-hidden bg-art-cream py-12 sm:py-16 lg:py-20 dark:bg-art-charcoal">
      {/* Subtle golden glow in center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full bg-art-gold/5 blur-[100px]" />

      {/* Section header */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 lg:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-art-gold">
            The Collection
          </span>
          <h2 className="mt-2 font-[var(--font-cormorant)] text-[clamp(1.5rem,1rem+2vw,2.5rem)] font-bold text-art-charcoal dark:text-white">
            4,000 Years of Human Creativity
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-3 sm:mb-4 lg:mb-5">
        <ScrollRow artworks={ROW_1} direction="left" speed={60} />
      </div>

      {/* Row 2 — scrolls right */}
      <ScrollRow artworks={ROW_2} direction="right" speed={75} />

      {/* Bottom stat line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative mt-8 sm:mt-10 lg:mt-12 text-center"
      >
        <p className="text-sm text-art-charcoal/40 dark:text-white/40">
          From <span className="text-art-gold font-medium">42 museums</span> across{' '}
          <span className="text-art-gold font-medium">6 continents</span>
        </p>
      </motion.div>
    </section>
  );
}
