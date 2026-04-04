import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { CompareClient } from '@/components/compare/CompareClient';

export const metadata: Metadata = {
  title: 'Comparador Visual — MŪSA',
  description:
    'Compara obras maestras lado a lado. Explora técnicas, estilos y contextos históricos en una experiencia interactiva.',
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-art-cream dark:bg-art-charcoal">
      <Header />
      <CompareClient />
    </main>
  );
}

export const dynamic = 'force-dynamic';
