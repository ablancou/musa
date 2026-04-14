'use client';

/**
 * Header — Main navigation bar
 *
 * Responsive Modes:
 * - Desktop (>=1024px): Full nav bar with logo, nav links, theme, language, CTA
 * - Landscape (568-1023px): Logo + hamburger menu, compact nav
 * - Portrait (320-567px): Logo + hamburger, nav in dropdown
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { StreakBadge } from '@/components/shared/StreakBadge';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { key: 'timeline', href: '/timeline' },
  { key: 'explore', href: '/explore' },
  { key: 'gallery', href: '/gallery' },
  { key: 'lessons', href: '/lessons' },
] as const;

export function Header({ variant = 'auto' }: { variant?: 'auto' | 'dark' | 'light' }) {
  const { t } = useTranslation('common');
  const { authenticated, isGuest, enterAsGuest } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only show gamification badges when user is logged in
  const showGamification = authenticated;

  // Dark variant forces light text (for pages with dark backgrounds like Explore, Gallery)
  const isDark = variant === 'dark';
  const textPrimary = isDark
    ? 'text-white'
    : 'text-art-charcoal dark:text-white';
  const textSecondary = isDark
    ? 'text-white/70 hover:text-white'
    : 'text-art-charcoal/70 dark:text-white/70 hover:text-art-charcoal dark:hover:text-white';
  const hoverBg = isDark
    ? 'hover:bg-white/10'
    : 'hover:bg-art-charcoal/5 dark:hover:bg-white/5';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? isDark
              ? 'bg-[#0a0a14]/95 backdrop-blur-xl shadow-sm shadow-black/20'
              : 'bg-white/90 dark:bg-art-charcoal/90 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex shrink-0 items-center gap-2 group">
            <Sparkles className="h-5 w-5 text-art-gold transition-transform group-hover:rotate-12 lg:h-6 lg:w-6" />
            <span className={cn("font-[var(--font-cormorant)] text-lg font-semibold tracking-wide lg:text-xl", textPrimary)}>
              MŪSA
            </span>
          </a>

          {/* Desktop Nav — centered */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap", textSecondary, hoverBg)}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Gamification — only for logged-in users */}
            {showGamification && <StreakBadge />}

            <ThemeToggle />
            <LanguageSelector />

            {authenticated ? (
              <div className="flex items-center gap-1 ml-1">
                <a
                  href="/profile"
                  className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap", textSecondary)}
                >
                  {t('nav.profile')}
                </a>
                <a
                  href="/logout"
                  className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap", textSecondary)}
                >
                  {t('nav.logout')}
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-1 ml-1">
                <a
                  href="/login"
                  className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap", textSecondary)}
                >
                  {t('nav.login')}
                </a>
                <button
                  onClick={enterAsGuest}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-art-gold transition-colors hover:text-art-gold-light whitespace-nowrap"
                >
                  {t('nav.guestExplore')}
                </button>
                <a
                  href="/register"
                  className="rounded-full bg-art-gold px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
                >
                  {t('nav.register')}
                </a>
              </div>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-colors", hoverBg, textPrimary)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-4 right-4 top-20 z-50 rounded-2xl bg-white dark:bg-art-charcoal p-4 shadow-xl ring-1 ring-art-charcoal/5 dark:ring-white/10 sm:left-auto sm:right-6 sm:w-72 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70 dark:text-white/70 transition-colors hover:bg-art-charcoal/5 dark:hover:bg-white/5 hover:text-art-charcoal dark:hover:text-white"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ))}
                <hr className="my-2 border-art-charcoal/10 dark:border-white/10" />
                {authenticated ? (
                  <>
                    <a href="/profile" onClick={() => setMenuOpen(false)} className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70 dark:text-white/70">
                      {t('nav.profile')}
                    </a>
                    <a href="/logout" onClick={() => setMenuOpen(false)} className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70 dark:text-white/70">
                      {t('nav.logout')}
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/login" onClick={() => setMenuOpen(false)} className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70 dark:text-white/70">
                      {t('nav.login')}
                    </a>
                    <button
                      onClick={() => { enterAsGuest(); setMenuOpen(false); }}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-gold"
                    >
                      {t('nav.guestExplore')}
                    </button>
                    <a
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="mt-1 flex min-h-[48px] items-center justify-center rounded-full bg-art-gold px-5 text-base font-semibold text-white"
                    >
                      {t('nav.register')}
                    </a>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
