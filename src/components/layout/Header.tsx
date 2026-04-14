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
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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
  // When variant is 'auto', the header adapts: transparent bg with dark text initially,
  // then a semi-transparent dark bg with light text once scrolled (works on ALL page backgrounds)
  const isDark = variant === 'dark';

  // Scrolled header always uses a dark semi-transparent background with white text
  // This ensures readability on ANY page regardless of light/dark mode
  const scrolledTextPrimary = 'text-white';
  const scrolledTextSecondary = 'text-white/70 hover:text-white';
  const scrolledHoverBg = 'hover:bg-white/10';

  const textPrimary = scrolled
    ? scrolledTextPrimary
    : isDark
      ? 'text-white'
      : 'text-art-charcoal dark:text-white';
  const textSecondary = scrolled
    ? scrolledTextSecondary
    : isDark
      ? 'text-white/70 hover:text-white'
      : 'text-art-charcoal/70 dark:text-white/70 hover:text-art-charcoal dark:hover:text-white';
  const hoverBg = scrolled
    ? scrolledHoverBg
    : isDark
      ? 'hover:bg-white/10'
      : 'hover:bg-art-charcoal/5 dark:hover:bg-white/5';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0a14]/90 backdrop-blur-xl shadow-lg shadow-black/10'
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
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <a
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "text-art-gold"
                      : cn(textSecondary, hoverBg)
                  )}
                >
                  {t(`nav.${link.key}`)}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Gamification — only for logged-in users */}
            {showGamification && <StreakBadge />}

            <ThemeToggle />
            <LanguageSelector />

            {/* Guest-only mode — auth coming soon */}
            <button
              onClick={enterAsGuest}
              className="rounded-full bg-art-gold px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg active:scale-[0.98] whitespace-nowrap ml-1"
            >
              {t('nav.guestExplore')}
            </button>
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
              className="fixed left-4 right-4 top-20 z-50 rounded-2xl bg-[#12121f] p-4 shadow-xl ring-1 ring-white/10 sm:left-auto sm:right-6 sm:w-72 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                  return (
                    <a
                      key={link.key}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium transition-colors",
                        isActive
                          ? "text-art-gold bg-white/5"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {t(`nav.${link.key}`)}
                    </a>
                  );
                })}
                <hr className="my-2 border-white/10" />
                {/* Guest-only mode — auth coming soon */}
                <button
                  onClick={() => { enterAsGuest(); setMenuOpen(false); }}
                  className="mt-1 flex min-h-[48px] items-center justify-center rounded-full bg-art-gold px-5 text-base font-semibold text-white"
                >
                  {t('nav.guestExplore')}
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
