'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GuestGateProps {
  children: React.ReactNode;
  feature?: string;
  level?: 'explorer' | 'enthusiast' | 'connoisseur';
}

export function GuestGate({ children, feature, level = 'explorer' }: GuestGateProps) {
  const { authenticated, isGuest } = useUserStore();
  const { t } = useTranslation('common');
  const [showPrompt, setShowPrompt] = useState(false);

  if (authenticated) return <>{children}</>;

  return (
    <>
      <div
        onClick={() => setShowPrompt(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowPrompt(true)}
      >
        <div className="relative">
          <div className="pointer-events-none opacity-50 blur-[1px]">
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 rounded-xl backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2 text-center p-4">
              <Lock className="h-8 w-8 text-art-gold" />
              <p className="text-sm font-medium text-art-charcoal dark:text-white">
                {t('guest.unlockFeature')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowPrompt(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1A1A22]"
            >
              <button
                onClick={() => setShowPrompt(false)}
                className="absolute right-4 top-4 text-art-charcoal/40 hover:text-art-charcoal dark:text-white/40 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <Sparkles className="h-10 w-10 text-art-gold" />
                <h3 className="mt-4 font-[var(--font-cormorant)] text-2xl font-semibold text-art-charcoal dark:text-white">
                  {t('guest.createAccountTitle')}
                </h3>
                <p className="mt-2 text-sm text-art-charcoal/60 dark:text-white/60">
                  {t('guest.createAccountDesc')}
                </p>

                <a
                  href="/register"
                  className="mt-6 w-full rounded-full bg-art-gold px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg"
                >
                  {t('guest.signUpFree')}
                </a>
                <a
                  href="/login"
                  className="mt-3 text-sm text-art-charcoal/60 hover:text-art-gold dark:text-white/60"
                >
                  {t('guest.alreadyHaveAccount')}
                </a>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="mt-2 text-xs text-art-charcoal/40 hover:text-art-charcoal/60 dark:text-white/40"
                >
                  {t('guest.maybeLater')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
