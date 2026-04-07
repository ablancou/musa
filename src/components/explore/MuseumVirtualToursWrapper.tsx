'use client';

import dynamic from 'next/dynamic';

const MuseumVirtualTours = dynamic(
  () => import('@/components/explore/MuseumVirtualTours'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-art-gold border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function MuseumVirtualToursWrapper() {
  return <MuseumVirtualTours />;
}
