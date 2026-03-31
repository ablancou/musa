/**
 * Explore Page — Server Component
 * 3D Globe Gateway to the World's Museums
 * Uses next/dynamic to lazy-load the heavy Three.js component
 */

import nextDynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';

export const dynamic = 'force-dynamic';

const MuseumGlobe = nextDynamic(
  () => import('@/components/globe/MuseumGlobe').then((mod) => ({ default: mod.MuseumGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-art-gold/20 border-t-art-gold" />
          <p className="font-[var(--font-cormorant)] text-lg text-white/40">
            Cargando el mundo del arte...
          </p>
        </div>
      </div>
    ),
  }
);

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main>
        <MuseumGlobe />
      </main>
    </>
  );
}
