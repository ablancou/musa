/**
 * Explore Page — Server Component
 * 3D Globe Gateway to the World's Museums
 *
 * The heavy Three.js globe is lazy-loaded inside ExploreClient (a Client Component)
 * because next/dynamic with ssr:false is not allowed in Server Components (Next.js 15).
 */

import { Header } from '@/components/layout/Header';
import { ExploreClient } from '@/components/explore/ExploreClient';

export const dynamic = 'force-dynamic';

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main>
        <ExploreClient />
      </main>
    </>
  );
}
