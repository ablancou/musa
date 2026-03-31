'use client';

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LevelsSection } from '@/components/landing/LevelsSection';
import { CTASection } from '@/components/landing/CTASection';

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-art-cream">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold border-t-transparent" />
        <span className="text-sm text-art-charcoal/50">MŪSA</span>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <LevelsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
