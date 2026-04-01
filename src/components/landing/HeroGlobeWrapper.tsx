'use client';

/**
 * HeroGlobeWrapper — Lazy-loads the Three.js HeroGlobe
 * next/dynamic with ssr:false must be in a Client Component (Next.js 15)
 */

import dynamic from 'next/dynamic';

const HeroGlobe = dynamic(
  () => import('./HeroGlobe').then((mod) => ({ default: mod.HeroGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-art-gold/20 border-t-art-gold" />
      </div>
    ),
  }
);

export function HeroGlobeWrapper() {
  return <HeroGlobe />;
}
