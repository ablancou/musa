/**
 * Search Page — Multifaceted Art Discovery
 * Browse by movement, date, artist, museum, or technique
 */

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { ArtSearch } from '@/components/search/ArtSearch';

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-art-charcoal">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-art-gold/20 border-t-art-gold" />
          </div>
        }
      >
        <ArtSearch />
      </Suspense>
    </>
  );
}

export const dynamic = 'force-dynamic';
