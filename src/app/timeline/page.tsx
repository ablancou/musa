/**
 * Timeline Page — Server Component
 * Interactive 4,000-year art history timeline
 */

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TimelineView } from '@/components/timeline/TimelineView';

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
    <div className="min-h-screen bg-art-cream">
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
