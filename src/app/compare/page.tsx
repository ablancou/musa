import type { Metadata } from 'next';
import { CompareClient } from '@/components/compare/CompareClient';

export const metadata: Metadata = {
  title: 'Comparador Visual — MŪSA',
  description:
    'Compara obras maestras lado a lado. Explora técnicas, estilos y contextos históricos en una experiencia interactiva.',
};

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-art-cream dark:bg-art-charcoal">
      <CompareClient />
    </main>
  );
}
