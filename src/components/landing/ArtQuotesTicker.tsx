'use client';

/**
 * ArtQuotesTicker — Elegant scrolling quotes from great artists
 *
 * A minimal, sophisticated ticker of famous art quotes that adds
 * cultural depth between landing page sections.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Single line, large text, generous padding
 * - Landscape (568-1023px): Single line, medium text
 * - Portrait (320-567px): Single line, compact text, smaller padding
 */

import { cn } from '@/lib/utils/cn';

const QUOTES = [
  { text: 'Every artist was first an amateur', author: 'Ralph Waldo Emerson' },
  { text: 'Art is the lie that enables us to realize the truth', author: 'Pablo Picasso' },
  { text: 'I dream my painting and I paint my dream', author: 'Vincent van Gogh' },
  { text: 'Color is my daylong obsession, joy, and torment', author: 'Claude Monet' },
  { text: 'Art washes away from the soul the dust of everyday life', author: 'Pablo Picasso' },
  { text: 'The purpose of art is washing the dust of daily life off our souls', author: 'Pablo Picasso' },
  { text: 'I would like to paint the way a bird sings', author: 'Claude Monet' },
  { text: 'Great things are done by a series of small things brought together', author: 'Vincent van Gogh' },
  { text: 'Art is not what you see, but what you make others see', author: 'Edgar Degas' },
  { text: 'The painter has the Universe in his mind and hands', author: 'Leonardo da Vinci' },
];

export function ArtQuotesTicker() {
  const items = [...QUOTES, ...QUOTES];

  return (
    <div className="relative overflow-hidden bg-art-navy/5 dark:bg-white/[0.02] py-4 sm:py-5 lg:py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 sm:w-20 lg:w-32 bg-gradient-to-r from-art-cream dark:from-[#0F0F14] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 sm:w-20 lg:w-32 bg-gradient-to-l from-art-cream dark:from-[#0F0F14] to-transparent" />

      <div
        className="flex items-center gap-8 sm:gap-12 lg:gap-16 animate-scroll-left whitespace-nowrap"
        style={{ animationDuration: '120s', width: 'max-content' }}
      >
        {items.map((quote, i) => (
          <span key={i} className="flex items-center gap-3 sm:gap-4">
            <span className="text-art-gold text-lg">✦</span>
            <span className={cn(
              'font-[var(--font-cormorant)] italic text-art-charcoal/50 dark:text-white/40',
              'text-sm sm:text-base lg:text-lg'
            )}>
              &ldquo;{quote.text}&rdquo;
            </span>
            <span className={cn(
              'font-medium text-art-gold/70',
              'text-xs sm:text-sm'
            )}>
              — {quote.author}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
