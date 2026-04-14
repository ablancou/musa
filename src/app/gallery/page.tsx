/**
 * Gallery Page — Server Component
 * Dual view: Museum Walk (immersive rooms) + Artwork Explorer (filterable grid)
 */

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GalleryTabs } from '@/components/gallery/GalleryTabs';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galería — MŪSA | Obras Maestras del Mundo',
  description:
    'Explora las obras maestras del arte mundial en salas inmersivas 3D. Filtra por movimiento, museo, técnica y siglo. Más de 1,000 obras de dominio público.',
  openGraph: {
    title: 'Gallery — MŪSA | Masterpieces of the World',
    description: 'Walk through immersive 3D gallery rooms or explore 1,000+ artworks with advanced filters.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MŪSA Gallery — World Masterpieces',
    description: 'Immersive 3D rooms and 1,000+ filterable artworks from the world\'s greatest museums.',
  },
};

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
      <Header variant="dark" />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<GalleryLoading />}>
          <GalleryTabs />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export const dynamic = 'force-dynamic';
