import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import MuseumVirtualToursWrapper from '@/components/explore/MuseumVirtualToursWrapper';

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

export const dynamic = 'force-dynamic';

export default function MuseumsPage() {
  return (
    <>
      <Header />
      <main>
        <MuseumVirtualToursWrapper />
      </main>
      <Footer />
    </>
  );
}
