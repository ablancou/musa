'use client';

/**
 * GalleryTabs — Switches between Museum Walk (room experience) and
 * Artwork Explorer (filterable grid).
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Tab bar at top with icons + labels
 * - Landscape (568-1023px): Tab bar with compact labels
 * - Portrait (320-567px): Pill toggle, tap-friendly 48px height
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Footprints, Grid3x3 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils/cn';

// Lazy-load heavy components
const GalleryWalk = dynamic(
  () => import('./GalleryWalk').then((mod) => ({ default: mod.GalleryWalk })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
      </div>
    ),
  }
);

const ArtworkExplorer = dynamic(
  () => import('./ArtworkExplorer').then((mod) => ({ default: mod.ArtworkExplorer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
      </div>
    ),
  }
);

type GalleryView = 'walk' | 'explore';

export function GalleryTabs() {
  const { t } = useTranslation('common');
  const searchParams = useSearchParams();
  const museumParam = searchParams.get('museum');

  // If arriving from a museum link (?museum=X), go straight to explore mode
  const [view, setView] = useState<GalleryView>(museumParam ? 'explore' : 'walk');

  return (
    <div className="min-h-screen">
      {/* Tab bar */}
      <div className="sticky top-16 z-40 border-b border-art-charcoal/5 dark:border-white/5 bg-white dark:bg-art-charcoal/95 backdrop-blur-lg lg:top-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 py-2 sm:py-3">
            {/* Walk tab */}
            <button
              onClick={() => setView('walk')}
              className={cn(
                'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all min-h-[44px]',
                view === 'walk'
                  ? 'text-art-charcoal dark:text-white'
                  : 'text-art-charcoal/40 dark:text-white/40 hover:text-art-charcoal/60 dark:hover:text-white/60'
              )}
            >
              {view === 'walk' && (
                <motion.div
                  layoutId="gallery-tab-bg"
                  className="absolute inset-0 rounded-full bg-art-charcoal/10 dark:bg-white/10"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <Footprints className="relative h-4 w-4" />
              <span className="relative hidden sm:inline">
                {t('gallery.walkMode', 'Recorrido')}
              </span>
            </button>

            {/* Explore tab */}
            <button
              onClick={() => setView('explore')}
              className={cn(
                'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all min-h-[44px]',
                view === 'explore'
                  ? 'text-art-charcoal dark:text-white'
                  : 'text-art-charcoal/40 dark:text-white/40 hover:text-art-charcoal/60 dark:hover:text-white/60'
              )}
            >
              {view === 'explore' && (
                <motion.div
                  layoutId="gallery-tab-bg"
                  className="absolute inset-0 rounded-full bg-art-charcoal/10 dark:bg-white/10"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <Grid3x3 className="relative h-4 w-4" />
              <span className="relative hidden sm:inline">
                {t('gallery.exploreMode', 'Explorar Obras')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === 'walk' ? (
          <motion.div
            key="walk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GalleryWalk />
          </motion.div>
        ) : (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArtworkExplorer initialMuseum={museumParam} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
