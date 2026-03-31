export const LANGUAGES = {
  es: { name: 'Español', nativeName: 'Español', flag: '🇲🇽', dir: 'ltr' },
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;
export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGES) as LanguageCode[];
export const DEFAULT_LANGUAGE: LanguageCode = 'es';

/** Font stacks per language — all Google Fonts (free) */
export const FONT_STACKS: Record<LanguageCode, { sans: string; serif: string }> = {
  es: { sans: 'Inter', serif: 'Playfair Display' },
  en: { sans: 'Inter', serif: 'Playfair Display' },
  it: { sans: 'Inter', serif: 'Playfair Display' },
  pt: { sans: 'Inter', serif: 'Playfair Display' },
  de: { sans: 'Inter', serif: 'Playfair Display' },
  ja: { sans: 'Noto Sans JP', serif: 'Noto Serif JP' },
  zh: { sans: 'Noto Sans SC', serif: 'Noto Serif SC' },
};
