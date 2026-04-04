import React, { Suspense } from 'react';
import { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const MuseumVirtualTours = dynamicImport(
  () => import('@/components/explore/MuseumVirtualTours'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Museos del Mundo — Tours Virtuales | MŪSA',
  description:
    'Explora los museos más importantes del mundo con tours virtuales y colecciones digitales. Más de 75 museos en 5 continentes.',
  keywords: [
    'virtual museum tours',
    'tours virtuales museos',
    'colecciones digitales',
    'Google Arts Culture',
    'museos del mundo',
  ],
  openGraph: {
    title: 'Museos del Mundo — Tours Virtuales | MŪSA',
    description:
      'Explora 75+ museos del mundo con tours virtuales y colecciones digitales.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Museos del Mundo — Tours Virtuales | MŪSA',
  },
};

export default function MuseumsPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-art-gold border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <MuseumVirtualTours />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export const dynamic = 'force-dynamic';
