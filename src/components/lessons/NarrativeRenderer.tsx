'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Music, Calendar, Palette } from 'lucide-react';
import type { NarrativeBlock } from '@/data/lessons/van-gogh-starry-night';
import QuizBlock from './QuizBlock';

/**
 * VIEWPORT GUIDE (Triple Responsive):
 * - Mobile (sp):  0-567px   | 1 column | full padding
 * - Tablet (md):  568-767px | 2 columns | medium padding
 * - Desktop (lg): 768px+    | 3 columns | generous padding
 */

interface NarrativeRendererProps {
  blocks: NarrativeBlock[];
  artworkUrl?: string;
}

export default function NarrativeRenderer({
  blocks,
  artworkUrl,
}: NarrativeRendererProps) {
  const { t, i18n } = useTranslation('lessons');
  const isLang = (lang: string) => i18n.language === lang;

  return (
    <div className="w-full">
      {blocks.map((block, index) => (
        <motion.div
          key={`${block.type}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full"
        >
          {block.type === 'intro' && (
            <IntroBlock block={block} />
          )}
          {block.type === 'story' && (
            <StoryBlock block={block} />
          )}
          {block.type === 'technique' && (
            <TechniqueBlock block={block} artworkUrl={artworkUrl} />
          )}
          {block.type === 'context' && (
            <ContextBlock block={block} />
          )}
          {block.type === 'music' && (
            <MusicBlock block={block} />
          )}
          {block.type === 'reflection' && (
            <ReflectionBlock block={block} />
          )}
          {block.type === 'quiz' && (
            <div className="w-full py-8 sm:py-12 md:py-16">
              <QuizBlock questions={block.questions || []} />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * INTRO BLOCK
 * Full-bleed dark background, large serif typography, cinematic feel
 * sp: full width | md: same | lg: same
 */
function IntroBlock({ block }: { block: NarrativeBlock }) {
  return (
    <section className="w-full bg-art-navy text-art-ivory relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-art-wine/5 to-transparent opacity-30" />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto">
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {block.title}
        </motion.h2>

        <motion.p
          className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-art-cream max-w-4xl font-light italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {block.content}
        </motion.p>
      </div>
    </section>
  );
}

/**
 * STORY BLOCK
 * Elegant prose with art-cream background, pull quotes in art-gold
 * sp: single column | md: with sidebar | lg: full width
 */
function StoryBlock({ block }: { block: NarrativeBlock }) {
  return (
    <section className="w-full bg-art-cream py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-art-charcoal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {block.title}
        </motion.h2>

        <motion.div
          className="prose prose-sm sm:prose md:prose-lg max-w-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {block.content?.split('\n\n').map((paragraph, idx) => {
            // Check if this is a pull quote (starts with "")
            const isQuote = paragraph.startsWith('""');
            const cleanText = isQuote ? paragraph.slice(2) : paragraph;

            return isQuote ? (
              <blockquote
                key={idx}
                className="border-l-4 border-art-gold pl-6 py-4 my-6 italic text-art-charcoal text-lg font-serif bg-white/50 rounded-r-lg"
              >
                "{cleanText}"
              </blockquote>
            ) : (
              <p
                key={idx}
                className="text-base sm:text-lg leading-relaxed text-art-charcoal mb-6 font-serif"
              >
                {cleanText}
              </p>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TECHNIQUE BLOCK
 * Side-by-side image + analysis (desktop), stacked (mobile)
 * sp: stacked | md: 2-col | lg: 3-col with image featured
 */
function TechniqueBlock({
  block,
  artworkUrl,
}: {
  block: NarrativeBlock;
  artworkUrl?: string;
}) {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-art-charcoal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {block.title}
        </motion.h2>

        <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 items-start">
          {/* Image - mobile: full width, tablet: left, desktop: featured */}
          {artworkUrl && (
            <motion.div
              className="relative w-full h-96 sm:h-96 md:h-auto md:aspect-square lg:col-span-1 order-2 md:order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src={artworkUrl}
                alt="Artwork detail"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          {/* Analysis text */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="prose prose-sm sm:prose md:prose-lg max-w-none">
              {block.content?.split('\n\n').map((paragraph, idx) => {
                // Handle bold headers like "**Text:**"
                const parts = paragraph.split(/(\*\*[^*]+\*\*:?)/);

                return (
                  <p key={idx} className="text-base sm:text-lg leading-relaxed text-art-charcoal mb-6 font-serif">
                    {parts.map((part, partIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        const text = part.slice(2, -2);
                        return (
                          <strong
                            key={partIdx}
                            className="text-art-gold font-semibold block mb-2"
                          >
                            {text}
                          </strong>
                        );
                      }
                      if (part.startsWith('**') && part.endsWith('**:')) {
                        const text = part.slice(2, -3);
                        return (
                          <strong key={partIdx} className="text-art-gold font-semibold">
                            {text}:
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * CONTEXT BLOCK
 * Timeline-style with dates (desktop), inline (mobile)
 * sp: inline chronology | md: left sidebar dates | lg: full timeline
 */
function ContextBlock({ block }: { block: NarrativeBlock }) {
  const timelineItems = block.content?.split('\n\n') || [];

  return (
    <section className="w-full bg-gradient-to-br from-art-cream to-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 sm:mb-12 md:mb-16 text-art-charcoal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {block.title}
        </motion.h2>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {timelineItems.map((item, idx) => {
            const [dateStr, ...contentParts] = item.split(':');
            const content = contentParts.join(':').trim();

            return (
              <motion.div
                key={idx}
                className="flex gap-4 sm:gap-6 md:gap-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Date - hidden on mobile, shown on tablet+ */}
                <div className="hidden sm:block flex-shrink-0 w-20 md:w-28 pt-1">
                  <span className="font-serif text-lg md:text-xl font-semibold text-art-gold">
                    {dateStr.trim()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 border-l-2 border-art-gold/30 pl-4 sm:pl-6 py-2">
                  <p className="text-base sm:text-lg leading-relaxed text-art-charcoal font-serif">
                    <span className="sm:hidden font-semibold text-art-gold mr-2">
                      {dateStr.trim()}:
                    </span>
                    {content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * MUSIC BLOCK
 * Special treatment with musical notes icon, connection explanation
 * sp: stacked | md: 2-col | lg: 3-col
 */
function MusicBlock({ block }: { block: NarrativeBlock }) {
  return (
    <section className="w-full bg-gradient-to-br from-art-navy/5 to-art-wine/5 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10 md:mb-12 text-art-charcoal flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Music className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-art-gold" />
          {block.title}
        </motion.h2>

        <motion.div
          className="prose prose-sm sm:prose md:prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {block.content?.split('\n\n').map((paragraph, idx) => {
            const isBoldHeader = paragraph.startsWith('**');
            const cleanText = isBoldHeader
              ? paragraph.replace(/\*\*/g, '')
              : paragraph;

            return isBoldHeader ? (
              <h3
                key={idx}
                className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-art-gold mt-6 mb-3"
              >
                {cleanText}
              </h3>
            ) : (
              <p
                key={idx}
                className="text-base sm:text-lg leading-relaxed text-art-charcoal mb-4 font-serif"
              >
                {cleanText}
              </p>
            );
          })}
        </motion.div>

        {/* Audio player placeholder */}
        <motion.div
          className="mt-8 sm:mt-10 p-6 sm:p-8 bg-white rounded-lg border-2 border-art-gold/20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-center text-sm sm:text-base text-art-charcoal font-serif italic">
            🎵 Audio player would load here (Spotify/YouTube integration)
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * REFLECTION BLOCK
 * Centered text, larger font, philosophical tone
 * sp: full width centered | md: same | lg: same with max width
 */
function ReflectionBlock({ block }: { block: NarrativeBlock }) {
  return (
    <section className="w-full bg-gradient-to-r from-art-gold/10 via-transparent to-art-wine/10 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 sm:mb-10 md:mb-12 text-art-charcoal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {block.title}
        </motion.h2>

        <motion.div
          className="prose prose-sm sm:prose md:prose-lg max-w-none text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {block.content?.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg md:text-xl leading-relaxed text-art-charcoal mb-6 font-serif italic"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
