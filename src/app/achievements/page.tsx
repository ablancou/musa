/**
 * Achievements Page — Server Component
 * Gamification Dashboard with badges, streaks, and level progression
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AchievementsDashboard } from '@/components/gamification/AchievementsDashboard';

export const metadata: Metadata = {
  title: 'Logros — MŪSA | Tu Viaje de Aprendizaje',
  description:
    'Ve tu progreso en MŪSA: insignias desbloqueadas, racha de consistencia, nivel actual, y XP ganado. Celebra tu viaje en la apreciación del arte.',
  openGraph: {
    title: 'Achievements — MŪSA | Your Learning Journey',
    description:
      'Track your progress in MŪSA: unlocked badges, streak, current level, and XP earned. Celebrate your art appreciation journey.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MŪSA Achievements — Track Your Art Mastery',
    description: 'View your badges, streaks, levels, and XP progress as you explore the world of art.',
  },
};

export const dynamic = 'force-dynamic';

function AchievementsLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
        <span className="text-sm text-art-charcoal/50 dark:text-art-cream/50">MŪSA Achievements</span>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-art-cream dark:bg-art-charcoal transition-colors duration-300">
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<AchievementsLoading />}>
          <AchievementsDashboard />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
