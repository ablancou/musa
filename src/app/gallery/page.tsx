'use client';

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { GalleryWalk } from '@/components/gallery/GalleryWalk';

function GalleryLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-art-charcoal">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
        <p className="font-[var(--font-cormorant)] text-lg text-white/50">
          Entering the museum...
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-art-charcoal">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<GalleryLoading />}>
          <GalleryWalk />
        </Suspense>
      </main>
    </div>
  );
}
