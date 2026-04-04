/**
 * Timeline Page — Server Component
 * Interactive 4,000-year art history timeline
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TimelineView } from '@/components/timeline/TimelineView';

export const metadata: Metadata = {
  title: 'Línea de Tiempo — MŪSA | 4,000 Años de Arte',
  description:
    'Explora 4,000 años de historia del arte en una línea de tiempo interactiva. Del arte egipcio al expresionismo abstracto, con conexiones musicales de cada época.',
  openGraph: {
    title: 'Timeline — MŪSA | 4,000 Years of Art History',
    description: 'Explore 4,000 years of art in an interactive timeline with music connections for every era.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MŪSA Timeline — 4,000 Years of Art',
    description: 'An interactive journey through art history with music from every era.',
  },
};

export const dynamic = 'force-dynamic';

function TimelineLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
        <span className="text-sm text-art-charcoal/50">MŪSA Timeline</span>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal transition-colors duration-300">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<TimelineLoading />}>
          <TimelineView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
