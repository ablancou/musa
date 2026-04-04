/**
 * Lessons Index Page — Server Component
 * Lists all available lessons with cinematic cards
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LessonsGrid } from '@/components/lessons/LessonsGrid';

export const metadata: Metadata = {
  title: 'Lecciones — MŪSA | Historia del Arte Cinematográfica',
  description:
    'Lecciones inmersivas de historia del arte con narrativa cinematográfica, conexiones musicales y quizzes gamificados. De principiante a conocedor.',
  openGraph: {
    title: 'Lessons — MŪSA | Cinematic Art History',
    description: 'Immersive art history lessons with cinematic storytelling, music connections, and gamified quizzes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MŪSA Lessons — Cinematic Art History',
    description: 'From beginner to connoisseur: gamified art history lessons with music of every era.',
  },
};

function LessonsLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
        <span className="text-sm text-art-charcoal/50 dark:text-white/50">Loading lessons...</span>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<LessonsLoading />}>
          <LessonsGrid />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export const dynamic = 'force-dynamic';
