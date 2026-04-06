'use client';

/**
 * ExploreClient — Client Component wrapper for the 3D Museum Globe
 *
 * next/dynamic with ssr:false MUST live in a Client Component (Next.js 15).
 * The Server Component page (app/explore/page.tsx) imports this wrapper.
 *
 * Responsive: Desktop (≥1024px) | Landscape (568-1023px) | Portrait (320-567px)
 */

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const MuseumGlobe = dynamic(
  () => import('@/components/globe/MuseumGlobe').then((mod) => ({ default: mod.MuseumGlobe })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#060610]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-art-gold/20 border-t-art-gold" />
          <p className="font-[var(--font-cormorant)] text-lg text-white/40">
            Cargando el mundo del arte...
          </p>
        </div>
      </div>
    ),
  }
);

export function ExploreClient() {
  const router = useRouter();

  const handleEnterMuseum = (museumId: string) => {
    // Navigate to gallery filtered by this museum
    router.push(`/gallery?museum=${museumId}`);
  };

  return <MuseumGlobe onEnterMuseum={handleEnterMuseum} />;
}
