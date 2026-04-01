'use client';

/**
 * ConsentBanner — GDPR/LGPD/LFPDPPP Cookie Consent
 *
 * Responsive: Desktop (≥1024px) | Landscape (568-1023px) | Portrait (320-567px)
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export function ConsentBanner() {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('musa-consent');
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (state: ConsentState) => {
    localStorage.setItem('musa-consent', JSON.stringify({
      ...state,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setVisible(false);
  };

  const acceptAll = () => saveConsent({ essential: true, analytics: true, preferences: true });
  const essentialOnly = () => saveConsent({ essential: true, analytics: false, preferences: false });
  const saveCustom = () => saveConsent(consent);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 lg:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-art-charcoal/10 backdrop-blur-xl dark:bg-[#1A1A22]/95 dark:ring-white/10 sm:p-5">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-art-gold" />
              <div className="flex-1">
                <h3 className="font-[var(--font-cormorant)] text-base font-semibold text-art-charcoal dark:text-white sm:text-lg">
                  {t('consent.title')}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-art-charcoal/60 dark:text-white/60 sm:text-sm">
                  {t('consent.description')}{' '}
                  <a href="/privacy" className="text-art-gold underline underline-offset-2 hover:text-art-gold-light">
                    {t('consent.privacyLink')}
                  </a>{' '}
                  {t('consent.and')}{' '}
                  <a href="/terms" className="text-art-gold underline underline-offset-2 hover:text-art-gold-light">
                    {t('consent.termsLink')}
                  </a>.
                </p>
              </div>
            </div>

            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2.5 rounded-xl bg-art-charcoal/5 p-3 dark:bg-white/5 sm:mt-4 sm:p-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-art-charcoal dark:text-white sm:text-sm">{t('consent.essential')}</p>
                        <p className="text-[10px] text-art-charcoal/50 dark:text-white/50 sm:text-xs">{t('consent.essentialDesc')}</p>
                      </div>
                      <div className="relative h-5 w-9 rounded-full bg-art-gold opacity-60 cursor-not-allowed">
                        <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
                      </div>
                    </label>
                    {(['analytics', 'preferences'] as const).map((key) => (
                      <label key={key} className="flex items-center justify-between cursor-pointer">
                        <div>
                          <p className="text-xs font-medium text-art-charcoal dark:text-white sm:text-sm">{t(`consent.${key}`)}</p>
                          <p className="text-[10px] text-art-charcoal/50 dark:text-white/50 sm:text-xs">{t(`consent.${key}Desc`)}</p>
                        </div>
                        <button
                          onClick={() => setConsent(c => ({ ...c, [key]: !c[key] }))}
                          className={cn(
                            'relative h-5 w-9 rounded-full transition-colors',
                            consent[key] ? 'bg-art-gold' : 'bg-art-charcoal/20 dark:bg-white/20'
                          )}
                        >
                          <div className={cn(
                            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform',
                            consent[key] ? 'right-0.5' : 'left-0.5'
                          )} />
                        </button>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="flex items-center gap-1 text-xs text-art-charcoal/50 hover:text-art-charcoal dark:text-white/50 dark:hover:text-white"
              >
                {showCustomize ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                {t('consent.customize')}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={essentialOnly}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-art-charcoal/70 transition-colors hover:bg-art-charcoal/5 dark:text-white/70 dark:hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {t('consent.essentialOnly')}
                </button>
                <button
                  onClick={showCustomize ? saveCustom : acceptAll}
                  className="rounded-full bg-art-gold px-4 py-1.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
                >
                  {showCustomize ? t('consent.savePreferences') : t('consent.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
