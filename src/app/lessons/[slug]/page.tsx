import React from 'react';
import { Metadata } from 'next';
import LessonContent from './LessonContent';
import { VAN_GOGH_STARRY_NIGHT } from '@/data/lessons/van-gogh-starry-night';

/**
 * Lesson Page — Server Component wrapper
 * Loads lesson data by slug and passes to client component
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Map of lesson slugs to lesson data
const LESSONS_MAP = {
  'van-gogh-starry-night': VAN_GOGH_STARRY_NIGHT,
};

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const params = await props.params;
  const lesson = LESSONS_MAP[params.slug as keyof typeof LESSONS_MAP];

  if (!lesson) {
    return {
      title: 'Lección no encontrada | MŪSA',
      description: 'Esta lección no existe.',
    };
  }

  return {
    title: `${lesson.titleEs} | MŪSA`,
    description: `Una experiencia inmersiva sobre ${lesson.titleEs} de ${lesson.artistEs}. Post-Impresionismo, ${lesson.durationMinutes} min de aprendizaje cinematográfico.`,
    keywords: [
      lesson.titleEs,
      lesson.titleEn,
      lesson.artistEs,
      lesson.eraEs,
      'art history',
      'historia del arte',
    ],
  };
}

export default async function LessonPage(props: PageProps) {
  const params = await props.params;
  const lesson = LESSONS_MAP[params.slug as keyof typeof LESSONS_MAP];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-art-charcoal mb-4">
            Lección no encontrada
          </h1>
          <p className="text-art-charcoal/70 mb-8">
            Lo sentimos, no pudimos encontrar la lección que buscas.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-art-gold text-white font-serif font-semibold rounded-lg hover:bg-art-gold-light transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return <LessonContent lesson={lesson} />;
}
