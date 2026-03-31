/**
 * VoiceNarrator — Web Speech Synthesis API
 *
 * Selects the best available female voice per language from the browser's
 * built-in voices. This is 100% free — no API keys, no paid services.
 * Works on all modern browsers (Chrome, Safari, Firefox, Edge).
 *
 * Voice selection priority per language:
 * - Prefers voices with "female" or feminine names in their identifier
 * - Falls back to the first available voice for that language
 * - Adjusts rate and pitch for a warm, sophisticated narrator feel
 */

import type { LanguageCode } from '@/lib/i18n/languages';

// Preferred voice name fragments per language (prioritized)
const PREFERRED_VOICES: Record<LanguageCode, string[]> = {
  es: ['Paulina', 'Monica', 'Lupe', 'Jorge', 'female', 'Microsoft Sabina', 'Google español'],
  en: ['Samantha', 'Karen', 'Moira', 'Victoria', 'female', 'Google UK English Female', 'Microsoft Zira'],
  it: ['Alice', 'Federica', 'female', 'Google italiano', 'Microsoft Elsa'],
  pt: ['Luciana', 'female', 'Google português', 'Microsoft Maria'],
  de: ['Anna', 'Petra', 'female', 'Google Deutsch', 'Microsoft Hedda'],
  ja: ['Kyoko', 'O-Ren', 'female', 'Google 日本語', 'Microsoft Haruka'],
  zh: ['Ting-Ting', 'female', 'Google 普通话', 'Microsoft Huihui'],
};

// BCP 47 language tags for speech synthesis
const LANG_TAGS: Record<LanguageCode, string[]> = {
  es: ['es-MX', 'es-ES', 'es'],
  en: ['en-US', 'en-GB', 'en'],
  it: ['it-IT', 'it'],
  pt: ['pt-BR', 'pt-PT', 'pt'],
  de: ['de-DE', 'de'],
  ja: ['ja-JP', 'ja'],
  zh: ['zh-CN', 'zh-TW', 'zh'],
};

export interface NarrationSegment {
  text: string;
  pause?: number; // milliseconds to pause after this segment
  emphasis?: 'soft' | 'normal' | 'dramatic'; // affects rate and pitch
}

export interface NarrationCallbacks {
  onSegmentStart?: (index: number, text: string) => void;
  onSegmentEnd?: (index: number) => void;
  onWordBoundary?: (charIndex: number) => void;
  onComplete?: () => void;
  onError?: (error: string) => void;
}

class VoiceNarratorEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voiceCache: Map<string, SpeechSynthesisVoice> = new Map();
  private isPlaying = false;
  private isPaused = false;
  private currentSegmentIndex = 0;
  private segments: NarrationSegment[] = [];
  private callbacks: NarrationCallbacks = {};
  private abortController: AbortController | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Voices may load asynchronously
      this.synth.onvoiceschanged = () => this.cacheVoices();
      this.cacheVoices();
    }
  }

  private cacheVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return;

    for (const [lang, tags] of Object.entries(LANG_TAGS) as [LanguageCode, string[]][]) {
      const preferred = PREFERRED_VOICES[lang];

      // Try to find a preferred voice
      let bestVoice: SpeechSynthesisVoice | null = null;

      for (const pref of preferred) {
        for (const voice of voices) {
          const matchesLang = tags.some(
            (tag) => voice.lang.startsWith(tag) || voice.lang.replace('_', '-').startsWith(tag)
          );
          if (matchesLang && voice.name.toLowerCase().includes(pref.toLowerCase())) {
            bestVoice = voice;
            break;
          }
        }
        if (bestVoice) break;
      }

      // Fallback: first voice matching the language
      if (!bestVoice) {
        bestVoice =
          voices.find((v) => tags.some((t) => v.lang.startsWith(t))) || null;
      }

      if (bestVoice) {
        this.voiceCache.set(lang, bestVoice);
      }
    }
  }

  /** Check if speech synthesis is available */
  get isAvailable(): boolean {
    return this.synth !== null && this.synth.getVoices().length > 0;
  }

  /** Get the selected voice name for a language */
  getVoiceName(lang: LanguageCode): string | null {
    return this.voiceCache.get(lang)?.name || null;
  }

  /** Start narrating a sequence of segments */
  async narrate(
    segments: NarrationSegment[],
    lang: LanguageCode,
    callbacks: NarrationCallbacks = {}
  ): Promise<void> {
    if (!this.synth) {
      callbacks.onError?.('Speech synthesis not available');
      return;
    }

    // Stop any current narration
    this.stop();

    this.segments = segments;
    this.callbacks = callbacks;
    this.currentSegmentIndex = 0;
    this.isPlaying = true;
    this.isPaused = false;
    this.abortController = new AbortController();

    await this.speakNextSegment(lang);
  }

  private async speakNextSegment(lang: LanguageCode): Promise<void> {
    if (
      !this.synth ||
      !this.isPlaying ||
      this.currentSegmentIndex >= this.segments.length
    ) {
      this.isPlaying = false;
      this.callbacks.onComplete?.();
      return;
    }

    const segment = this.segments[this.currentSegmentIndex];
    const voice = this.voiceCache.get(lang);

    this.callbacks.onSegmentStart?.(this.currentSegmentIndex, segment.text);

    const utterance = new SpeechSynthesisUtterance(segment.text);
    this.currentUtterance = utterance;

    if (voice) utterance.voice = voice;
    utterance.lang = LANG_TAGS[lang][0];

    // Adjust for emphasis
    switch (segment.emphasis) {
      case 'soft':
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        utterance.volume = 0.8;
        break;
      case 'dramatic':
        utterance.rate = 0.75;
        utterance.pitch = 0.95;
        utterance.volume = 1;
        break;
      default:
        utterance.rate = 0.88;
        utterance.pitch = 1.02;
        utterance.volume = 0.95;
    }

    // Word boundary tracking
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        this.callbacks.onWordBoundary?.(event.charIndex);
      }
    };

    return new Promise<void>((resolve) => {
      utterance.onend = () => {
        this.callbacks.onSegmentEnd?.(this.currentSegmentIndex);
        this.currentSegmentIndex++;

        // Pause between segments
        const pauseDuration = segment.pause || 600;
        setTimeout(() => {
          this.speakNextSegment(lang).then(resolve);
        }, pauseDuration);
      };

      utterance.onerror = (event) => {
        if (event.error !== 'canceled') {
          this.callbacks.onError?.(event.error);
        }
        resolve();
      };

      this.synth!.speak(utterance);
    });
  }

  /** Pause narration */
  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  /** Resume narration */
  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  /** Stop narration completely */
  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.abortController?.abort();
  }

  /** Toggle play/pause */
  toggle() {
    if (this.isPaused) {
      this.resume();
    } else if (this.isPlaying) {
      this.pause();
    }
  }

  get playing(): boolean {
    return this.isPlaying;
  }

  get paused(): boolean {
    return this.isPaused;
  }
}

// Singleton
export const voiceNarrator = typeof window !== 'undefined'
  ? new VoiceNarratorEngine()
  : (null as unknown as VoiceNarratorEngine);
