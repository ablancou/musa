'use client';

/**
 * ImmersiveExperience — The Crown Jewel of MŪSA
 *
 * When a user selects an artwork in the gallery, this component takes over
 * the entire screen with a cinematic experience:
 *
 * 1. The room darkens (gallery fades to black)
 * 2. The artwork expands to fill the screen with a slow zoom
 * 3. Dramatic spotlight illuminates the painting
 * 4. A sophisticated female voice begins narrating the story
 * 5. Text appears in sync, subtitles-style, at the bottom
 * 6. The artwork subtly parallax-shifts as the story progresses
 * 7. Musical connection is revealed at the end
 *
 * This is "el museo de los museos" — the moment when the user forgets
 * they're on a website and feels like they're in the world's greatest museum.
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Artwork centered with generous margins, text overlay
 *   at bottom with frosted glass effect, play/pause controls visible,
 *   progress timeline. Subtle Ken Burns effect on the painting.
 * - Landscape (568-1023px): Artwork fills more of the screen, text overlay
 *   at bottom, simplified controls.
 * - Portrait (320-567px): Artwork in top 60%, narration text below in a
 *   scrollable panel. Large touch-friendly play/pause button.
 *
 * Tech: Web Speech Synthesis API (free, all browsers), Framer Motion,
 * CSS backdrop-filter. Zero paid resources.
 */


import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { voiceNarrator, type NarrationSegment } from './VoiceNarrator';
import { ARTWORK_NARRATIONS } from '@/data/narrations/artworks';
import type { TimelineArtwork, TimelineEra } from '@/data/timeline/eras';
import type { LanguageCode } from '@/lib/i18n/languages';
import { cn } from '@/lib/utils/cn';

// ─── Spotlight Effect ───
function SpotlightOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Vignette — dark edges, bright center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      {/* Top light beam */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: '60%',
          height: '30%',
          background:
            'linear-gradient(180deg, rgba(255,220,150,0.06) 0%, transparent 100%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}

// ─── Narration Subtitle Display ───
function NarrationSubtitles({
  text,
  isActive,
  highlightIndex,
}: {
  text: string;
  isActive: boolean;
  highlightIndex: number;
}) {
  if (!isActive || !text) return null;

  // Split into words for potential word-by-word highlighting
  const words = text.split(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-2xl px-4"
    >
      <p className="text-center font-[var(--font-serif)] text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl lg:leading-relaxed">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={cn(
              'transition-colors duration-200',
              i <= highlightIndex ? 'text-white' : 'text-white/60'
            )}
          >
            {word}{' '}
          </span>
        ))}
      </p>
    </motion.div>
  );
}

// ─── Progress Bar ───
function NarrationProgress({
  currentSegment,
  totalSegments,
  isPlaying,
}: {
  currentSegment: number;
  totalSegments: number;
  isPlaying: boolean;
}) {
  const progress = totalSegments > 0 ? ((currentSegment + 1) / totalSegments) * 100 : 0;

  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-art-gold"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════
// ─── MAIN IMMERSIVE EXPERIENCE ────────────
// ═══════════════════════════════════════════
export function ImmersiveExperience({
  artwork,
  era,
  onClose,
}: {
  artwork: TimelineArtwork;
  era: TimelineEra;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation('common');
  const currentLang = (i18n.language?.substring(0, 2) || 'es') as LanguageCode;

  // Narration state
  const [isNarrating, setIsNarrating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const [currentText, setCurrentText] = useState('');
  const [wordHighlightIndex, setWordHighlightIndex] = useState(-1);
  const [narrationComplete, setNarrationComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Ken Burns animation state
  const [kenBurnsPhase, setKenBurnsPhase] = useState(0);

  // Get narration data — extract short key from i18n key
  // e.g. 'timeline.artworks.monaLisa' → 'monaLisa'
  const narrationKey = artwork.titleKey.split('.').pop() || '';
  const narration = ARTWORK_NARRATIONS[narrationKey];
  const segments = narration?.segments || [];

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (!isNarrating || isPaused) {
      setShowControls(true);
      return;
    }
    const timer = setTimeout(() => setShowControls(false), 4000);
    return () => clearTimeout(timer);
  }, [isNarrating, isPaused, currentSegmentIndex]);

  // Show controls on mouse move
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
  }, []);

  // Ken Burns effect — slow zoom and pan during narration
  useEffect(() => {
    if (!isNarrating) return;
    const interval = setInterval(() => {
      setKenBurnsPhase((p) => (p + 1) % 4);
    }, 8000);
    return () => clearInterval(interval);
  }, [isNarrating]);

  const kenBurnsStyles = [
    { scale: 1.0, x: 0, y: 0 },
    { scale: 1.08, x: -15, y: -10 },
    { scale: 1.05, x: 10, y: -5 },
    { scale: 1.1, x: -5, y: 5 },
  ];

  // ─── Start narration ───
  const startNarration = useCallback(() => {
    if (!voiceNarrator || segments.length === 0) return;

    setIsNarrating(true);
    setIsPaused(false);
    setNarrationComplete(false);
    setCurrentSegmentIndex(0);

    voiceNarrator.narrate(segments, currentLang, {
      onSegmentStart: (index, text) => {
        setCurrentSegmentIndex(index);
        setCurrentText(text);
        setWordHighlightIndex(-1);
      },
      onWordBoundary: (charIndex) => {
        // Count words up to charIndex
        const textUpTo = currentText.substring(0, charIndex);
        const wordCount = textUpTo.split(' ').filter(Boolean).length;
        setWordHighlightIndex(wordCount);
      },
      onSegmentEnd: (index) => {
        // Brief pause — text stays visible
      },
      onComplete: () => {
        setIsNarrating(false);
        setNarrationComplete(true);
        setCurrentText('');
      },
      onError: (error) => {
        console.warn('Narration error:', error);
        setIsNarrating(false);
      },
    });
  }, [segments, currentLang, currentText]);

  // ─── Toggle play/pause ───
  const toggleNarration = useCallback(() => {
    if (!voiceNarrator) return;

    if (!isNarrating && !isPaused) {
      startNarration();
    } else if (isPaused) {
      voiceNarrator.resume();
      setIsPaused(false);
    } else {
      voiceNarrator.pause();
      setIsPaused(true);
    }
  }, [isNarrating, isPaused, startNarration]);

  // ─── Stop and close ───
  const handleClose = useCallback(() => {
    voiceNarrator?.stop();
    onClose();
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === ' ') {
        e.preventDefault();
        toggleNarration();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleClose, toggleNarration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => voiceNarrator?.stop();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onClick={() => setShowControls(true)}
      className="fixed inset-0 z-[200] flex flex-col bg-black"
    >
      {/* ═══ ARTWORK DISPLAY ═══ */}
      <div className="relative flex-1 overflow-hidden">
        {/* The artwork — with Ken Burns effect */}
        <motion.div
          className="absolute inset-0"
          animate={kenBurnsStyles[kenBurnsPhase]}
          transition={{ duration: 10, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${artwork.imageUrl})` }}
          />
        </motion.div>

        {/* Spotlight overlay */}
        <SpotlightOverlay />

        {/* ── Top Controls ── */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 top-0 z-30 bg-gradient-to-b from-black/60 to-transparent p-4 sm:p-6"
            >
              <div className="flex items-start justify-between">
                {/* Artwork info */}
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-[var(--font-cormorant)] text-xl font-bold text-white sm:text-2xl lg:text-3xl"
                  >
                    {artwork.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-1 text-sm text-white/60 sm:text-base"
                  >
                    {artwork.artist} · {artwork.year > 0 ? artwork.year : `${Math.abs(artwork.year)} BCE`}
                  </motion.p>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white/80"
                    style={{ backgroundColor: era.color + '80' }}
                  >
                    {t(era.nameKey)}
                  </motion.span>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:h-12 sm:w-12"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Center Play Button (when not narrating) ── */}
        <AnimatePresence>
          {!isNarrating && !narrationComplete && segments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <button
                onClick={startNarration}
                className="group flex flex-col items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-art-gold/90 text-white shadow-2xl backdrop-blur-sm transition-all group-hover:bg-art-gold sm:h-24 sm:w-24"
                >
                  <Play className="h-8 w-8 ml-1 sm:h-10 sm:w-10" />
                </motion.div>
                <span className="rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
                  {t('immersive.listenStory')}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Narration Complete — Music Connection ── */}
        <AnimatePresence>
          {narrationComplete && narration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <div className="mx-4 max-w-lg rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md sm:p-8">
                <Music className="mx-auto h-10 w-10 text-art-gold sm:h-12 sm:w-12" />
                <h3 className="mt-4 font-[var(--font-cormorant)] text-xl font-bold text-white sm:text-2xl">
                  {t('immersive.musicConnection')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  {narration.musicConnection}
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    onClick={startNarration}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20"
                  >
                    <Play className="h-4 w-4" />
                    {t('immersive.listenAgain')}
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 rounded-full bg-art-gold px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-art-gold-light"
                  >
                    {t('immersive.backToGallery')}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ BOTTOM BAR — Subtitles + Controls ═══ */}
      <AnimatePresence>
        {(isNarrating || isPaused) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative z-30 bg-gradient-to-t from-black via-black/90 to-transparent"
          >
            {/* Subtitles area */}
            <div className="min-h-[80px] flex items-center justify-center px-4 py-4 sm:min-h-[100px] sm:py-6">
              <AnimatePresence mode="wait">
                <NarrationSubtitles
                  key={currentSegmentIndex}
                  text={currentText}
                  isActive={isNarrating || isPaused}
                  highlightIndex={wordHighlightIndex}
                />
              </AnimatePresence>
            </div>

            {/* Progress + Controls */}
            <div className="px-4 pb-4 sm:px-6 sm:pb-6">
              {/* Progress bar */}
              <NarrationProgress
                currentSegment={currentSegmentIndex}
                totalSegments={segments.length}
                isPlaying={isNarrating && !isPaused}
              />

              {/* Controls row */}
              <div className="mt-3 flex items-center justify-between">
                {/* Segment counter */}
                <span className="text-xs text-white/30 sm:text-sm">
                  {currentSegmentIndex + 1} / {segments.length}
                </span>

                {/* Center controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleNarration}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-art-gold text-white transition-all hover:bg-art-gold-light active:scale-95 sm:h-14 sm:w-14"
                  >
                    {isPaused || !isNarrating ? (
                      <Play className="h-5 w-5 ml-0.5 sm:h-6 sm:w-6" />
                    ) : (
                      <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </button>
                </div>

                {/* Mute / Skip */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      voiceNarrator?.stop();
                      setIsNarrating(false);
                      setNarrationComplete(true);
                      setCurrentText('');
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70"
                    title="Skip"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ PORTRAIT: Bottom info panel (when not narrating) ═══ */}
      {!isNarrating && !isPaused && !narrationComplete && (
        <div className="block bg-black/90 p-4 sm:hidden">
          <p className="text-xs text-white/40">{artwork.medium}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            {narration?.musicConnection || ''}
          </p>
        </div>
      )}
    </motion.div>
  );
}
