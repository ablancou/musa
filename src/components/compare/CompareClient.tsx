'use client';

import dynamic from 'next/dynamic';

const ArtworkComparator = dynamic(
  () =>
    import('@/components/compare/ArtworkComparator').then((mod) => ({
      default: mod.ArtworkComparator,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-art-cream dark:bg-art-charcoal">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-art-gold/30 border-t-art-gold rounded-full animate-spin mx-auto" />
          <p className="text-art-charcoal/60 dark:text-art-cream/60 font-serif text-lg">
            Preparando el comparador...
          </p>
        </div>
      </div>
    ),
  }
);

export function CompareClient() {
  return <ArtworkComparator />;
}
