'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): Dropdown in header, shows flag + language name
 * - Landscape (568-1023px): Compact dropdown, flag + code only
 * - Portrait (320-567px): Full-screen modal selector for easy touch targets
 */


import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LANGUAGES, type LanguageCode } from '@/lib/i18n/languages';
import { cn } from '@/lib/utils/cn';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language?.substring(0, 2) || 'es') as LanguageCode;
  const current = LANGUAGES[currentLang] || LANGUAGES.es;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLanguage(code: LanguageCode) {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setIsOpen(false);
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full transition-all duration-200',
          'px-3 py-2 text-sm hover:bg-art-charcoal/5',
          'sm:px-3 sm:py-1.5',
          'lg:px-4 lg:py-2'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-art-charcoal/60" />
        <span className="hidden sm:inline text-art-charcoal/80">{current.flag}</span>
        <span className="hidden lg:inline text-art-charcoal/80">{current.nativeName}</span>
      </button>

      {isOpen && (
        <>
          {/* Mobile: full-width overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={cn(
              'z-50 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-art-charcoal/5',
              // Portrait: bottom sheet style
              'fixed bottom-0 left-0 right-0 animate-slide-up sm:absolute sm:bottom-auto',
              // Landscape & Desktop: dropdown
              'sm:right-0 sm:left-auto sm:top-full sm:mt-2 sm:w-56 sm:animate-scale-in'
            )}
          >
            <div className="p-2 sm:p-1">
              <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-art-charcoal/40 sm:hidden">
                {current.nativeName === 'Español' ? 'Seleccionar idioma' : 'Select language'}
              </div>
              {(Object.entries(LANGUAGES) as [LanguageCode, typeof LANGUAGES.es][]).map(
                ([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => switchLanguage(code)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors',
                      'sm:rounded-lg sm:px-3 sm:py-2',
                      'min-h-[48px] sm:min-h-0', // Touch target on mobile
                      code === currentLang
                        ? 'bg-art-gold/10 text-art-charcoal font-medium'
                        : 'text-art-charcoal/70 hover:bg-art-charcoal/5'
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1">{lang.nativeName}</span>
                    {code === currentLang && (
                      <span className="h-2 w-2 rounded-full bg-art-gold" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
