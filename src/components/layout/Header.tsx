'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): Full nav bar with logo, nav links, language selector, CTA button
 * - Landscape (568-1023px): Logo + hamburger menu, compact nav
 * - Portrait (320-567px): Logo centered + hamburger, nav in bottom sheet
 */


import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { key: 'timeline', href: '/timeline' },
  { key: 'explore', href: '/explore' },
  { key: 'gallery', href: '/gallery' },
  { key: 'lessons', href: '/lessons' },
] as const;

export function Header() {
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

  // Close menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Sparkles className="h-6 w-6 text-art-gold transition-transform group-hover:rotate-12 lg:h-7 lg:w-7" />
            <span className="font-[var(--font-cormorant)] text-xl font-semibold tracking-wide text-art-charcoal lg:text-2xl">
              MŪSA
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-art-charcoal/70 transition-colors hover:bg-art-charcoal/5 hover:text-art-charcoal"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <LanguageSelector />
            {authenticated ? (
              <>
                <a
                  href="/profile"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-art-charcoal/70 transition-colors hover:text-art-charcoal"
                >
                  {t('nav.profile')}
                </a>
                <a
                  href="/logout"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-art-charcoal/70 transition-colors hover:text-art-charcoal"
                >
                  {t('nav.logout')}
                </a>
              </>
            ) : isGuest ? (
              <>
                <span className="text-xs font-medium text-art-gold uppercase tracking-wide">
                  {t('nav.guestMode')}
                </span>
                <a
                  href="/register"
                  className="rounded-full bg-art-gold px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg active:scale-[0.98]"
                >
                  {t('nav.createAccount')}
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-art-charcoal/70 transition-colors hover:text-art-charcoal"
                >
                  {t('nav.login')}
                </a>
                <button
                  onClick={enterAsGuest}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-art-gold transition-colors hover:text-art-gold-light"
                >
                  {t('nav.guestExplore')}
                </button>
                <a
                  href="/register"
                  className="rounded-full bg-art-gold px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-art-gold-light hover:shadow-lg active:scale-[0.98]"
                >
                  {t('nav.register')}
                </a>
              </>
            )}
          </div>

          {/* Mobile: Language + Theme Toggle + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-art-charcoal/5"
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
              className="fixed left-4 right-4 top-20 z-50 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-art-charcoal/5 sm:left-auto sm:right-6 sm:w-72 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70 transition-colors hover:bg-art-charcoal/5 hover:text-art-charcoal"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ))}
                <hr className="my-2 border-art-charcoal/10" />
                {authenticated ? (
                  <>
                    <a
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70"
                    >
                      {t('nav.profile')}
                    </a>
                    <a
                      href="/logout"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70"
                    >
                      {t('nav.logout')}
                    </a>
                  </>
                ) : isGuest ? (
                  <>
                    <div className="flex min-h-[48px] items-center rounded-xl px-4">
                      <span className="text-xs font-medium text-art-gold uppercase tracking-wide">
                        {t('nav.guestMode')}
                      </span>
                    </div>
                    <a
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="mt-1 flex min-h-[48px] items-center justify-center rounded-full bg-art-gold px-5 text-base font-semibold text-white"
                    >
                      {t('nav.createAccount')}
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-charcoal/70"
                    >
                      {t('nav.login')}
                    </a>
                    <button
                      onClick={() => {
                        enterAsGuest();
                        setMenuOpen(false);
                      }}
                      className="flex min-h-[48px] items-center rounded-xl px-4 text-base font-medium text-art-gold transition-colors hover:text-art-gold-light"
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
