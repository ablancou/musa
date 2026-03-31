/**
 * Explore Page — 3D Globe Gateway to the World's Museums
 */

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';

function GlobeLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0f]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-art-gold/20 border-t-art-gold" />
        <p className="font-[var(--font-cormorant)] text-lg text-white/40">
          Cargando el mundo del arte...
        </p>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  // Lazy load the heavy 3D component
  const { MuseumGlobe } = require('@/components/globe/MuseumGlobe');

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<GlobeLoader />}>
          <MuseumGlobe
            onEnterMuseum={(museumId: string) => {
              window.location.href = `/gallery?museum=${museumId}`;
            }}
          />
        </Suspense>
      </main>
    </>
  );
}
