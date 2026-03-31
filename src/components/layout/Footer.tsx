'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): 4-column grid with logo, links, languages, social
 * - Landscape (568-1023px): 2-column grid
 * - Portrait (320-567px): Single stacked column, centered
 */


import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="border-t border-art-charcoal/10 bg-white/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Sparkles className="h-5 w-5 text-art-gold" />
              <span className="font-[var(--font-cormorant)] text-xl font-semibold tracking-wide">
                MŪSA
              </span>
            </div>
            <p className="mt-3 text-sm text-art-charcoal/60 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-art-charcoal/40">
              {t('footer.about')}
            </h3>
            <ul className="mt-3 space-y-2">
              {['about', 'privacy', 'terms', 'contact'].map((key) => (
                <li key={key}>
                  <a
                    href={`/${key}`}
                    className="text-sm text-art-charcoal/60 transition-colors hover:text-art-gold"
                  >
                    {t(`footer.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-art-charcoal/40">
              {t('footer.languages')}
            </h3>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
              {['ES', 'EN', 'IT', 'PT', 'DE', 'JA', 'ZH'].map((code) => (
                <span
                  key={code}
                  className="rounded-md bg-art-charcoal/5 px-2.5 py-1 text-xs font-medium text-art-charcoal/60"
                >
                  {code}
                </span>
              ))}
            </div>
          </div>

          {/* Social/Newsletter placeholder */}
          <div className="text-center sm:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-art-charcoal/40">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-art-charcoal/50">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-art-charcoal/10 pt-6 text-center">
          <p className="text-xs text-art-charcoal/40">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
