'use client';

/**
 * Responsive Modes:
 * - Desktop (>=1024px): Modal centered, 2-column login/register form layout
 * - Landscape (568-1023px): Modal centered but compact, single-column form
 * - Portrait (320-567px): Full-height modal, stacked form with large touch targets
 */


import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Globe, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useUserStore } from '@/stores/userStore';

type TabType = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [level, setLevel] = useState<'starter' | 'explorer' | 'enthusiast' | 'connoisseur'>('starter');
  const [registerError, setRegisterError] = useState('');

  // Store actions
  const { login, register, signInWithGoogle, enterAsGuest, loading } = useUserStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login(loginEmail, loginPassword);
      onClose();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError(t('auth.passwordMismatch') || 'Passwords do not match');
      return;
    }

    try {
      await register(
        registerEmail,
        registerPassword,
        displayName,
        preferredLanguage,
        level
      );
      onClose();
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'relative w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl',
          'bg-gradient-to-br from-art-cream via-art-ivory to-white',
          'border border-art-gold/20',
          // Responsive sizing
          'sm:max-w-md sm:rounded-3xl',
          'lg:max-w-lg'
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            'absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full',
            'bg-art-charcoal/10 hover:bg-art-charcoal/20 transition-colors',
            'sm:right-6 sm:top-6 sm:h-12 sm:w-12'
          )}
          aria-label="Close modal"
        >
          <span className="text-xl font-light text-art-charcoal">&times;</span>
        </button>

        {/* Content */}
        <div className={cn('p-6 sm:p-8 lg:p-10')}>
          {/* Header */}
          <div className="mb-8 text-center lg:mb-10">
            <h2
              className={cn(
                'font-[var(--font-display)] font-bold text-art-charcoal',
                'text-2xl sm:text-3xl lg:text-4xl'
              )}
            >
              {activeTab === 'login'
                ? t('auth.loginTitle') || 'Welcome Back'
                : t('auth.registerTitle') || 'Join MŪSA'}
            </h2>
            <p className="mt-2 text-sm text-art-charcoal/60 sm:text-base lg:text-lg">
              {activeTab === 'login'
                ? t('auth.loginSubtitle') || 'Enter the world of art'
                : t('auth.registerSubtitle') || 'Begin your art journey'}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 rounded-xl bg-art-charcoal/5 p-1 sm:mb-10 sm:gap-2">
            <button
              onClick={() => {
                setActiveTab('login');
                setLoginError('');
                setRegisterError('');
              }}
              className={cn(
                'flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all',
                'sm:py-3 sm:px-6',
                activeTab === 'login'
                  ? 'bg-white text-art-gold shadow-md'
                  : 'text-art-charcoal/60 hover:text-art-charcoal'
              )}
            >
              {t('auth.login') || 'Login'}
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setLoginError('');
                setRegisterError('');
              }}
              className={cn(
                'flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all',
                'sm:py-3 sm:px-6',
                activeTab === 'register'
                  ? 'bg-white text-art-gold shadow-md'
                  : 'text-art-charcoal/60 hover:text-art-charcoal'
              )}
            >
              {t('auth.register') || 'Register'}
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.email') || 'Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder') || 'your@email.com'}
                    required
                    className={cn(
                      'w-full pl-12 pr-4 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.password') || 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder') || '••••••••'}
                    required
                    className={cn(
                      'w-full pl-12 pr-12 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn(
                      'absolute right-4 top-1/2 -translate-y-1/2 text-art-charcoal/60',
                      'hover:text-art-charcoal transition-colors',
                      'h-5 w-5 flex items-center justify-center'
                    )}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{loginError}</p>
                </motion.div>
              )}

              {/* Forgot password link */}
              <div className="text-right">
                <a
                  href="#forgot"
                  className="text-sm font-medium text-art-gold hover:text-art-gold-light transition-colors sm:text-base"
                >
                  {t('auth.forgotPassword') || 'Forgot password?'}
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold text-white transition-all',
                  'bg-art-gold hover:bg-art-gold-light disabled:opacity-70 disabled:cursor-not-allowed',
                  'shadow-md hover:shadow-lg active:scale-[0.98]',
                  'flex items-center justify-center gap-2',
                  'sm:py-4 sm:text-lg',
                  'min-h-12 sm:min-h-14'
                )}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {t('auth.login') || 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-art-charcoal/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gradient-to-br from-art-cream via-art-ivory to-white px-2 text-art-charcoal/50">
                    {t('auth.or') || 'or'}
                  </span>
                </div>
              </div>

              {/* Google sign-in */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold transition-all',
                  'border border-art-charcoal/20 hover:border-art-charcoal/40',
                  'bg-white hover:bg-art-charcoal/5',
                  'text-art-charcoal flex items-center justify-center gap-3',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  'sm:py-4 sm:text-lg',
                  'min-h-12 sm:min-h-14'
                )}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {t('auth.googleSignIn') || 'Sign in with Google'}
              </button>

              {/* Continue as guest link */}
              <div className="mt-6 text-center border-t border-art-charcoal/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    enterAsGuest();
                    onClose();
                  }}
                  className="text-sm text-art-charcoal/60 hover:text-art-charcoal transition-colors"
                >
                  {t('guest.maybeLater') || 'Maybe later'}
                </button>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.displayName') || 'Display Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t('auth.displayNamePlaceholder') || 'Your name'}
                    required
                    className={cn(
                      'w-full pl-12 pr-4 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.email') || 'Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder') || 'your@email.com'}
                    required
                    className={cn(
                      'w-full pl-12 pr-4 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.password') || 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder') || '••••••••'}
                    required
                    className={cn(
                      'w-full pl-12 pr-12 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn(
                      'absolute right-4 top-1/2 -translate-y-1/2 text-art-charcoal/60',
                      'hover:text-art-charcoal transition-colors',
                      'h-5 w-5 flex items-center justify-center'
                    )}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.confirmPassword') || 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder') || '••••••••'}
                    required
                    className={cn(
                      'w-full pl-12 pr-12 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal placeholder:text-art-charcoal/40',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base',
                      'min-h-12 sm:min-h-14'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={cn(
                      'absolute right-4 top-1/2 -translate-y-1/2 text-art-charcoal/60',
                      'hover:text-art-charcoal transition-colors',
                      'h-5 w-5 flex items-center justify-center'
                    )}
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-2 sm:text-base">
                  {t('auth.language') || 'Preferred Language'}
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-art-gold/60 pointer-events-none" />
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className={cn(
                      'w-full pl-12 pr-4 py-3 rounded-lg border border-art-charcoal/10',
                      'bg-white/80 text-art-charcoal',
                      'focus:outline-none focus:ring-2 focus:ring-art-gold focus:border-transparent',
                      'transition-all sm:py-4 sm:text-base appearance-none',
                      'min-h-12 sm:min-h-14'
                    )}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ja">日本語</option>
                    <option value="zh">中文</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
              </div>

              {/* Level Selection */}
              <div>
                <label className="block text-sm font-semibold text-art-charcoal mb-3 sm:text-base">
                  {t('auth.level') || 'Learning Level'}
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { value: 'starter', label: t('auth.levelStarter') || 'Starter' },
                    { value: 'explorer', label: t('auth.levelExplorer') || 'Explorer' },
                    { value: 'enthusiast', label: t('auth.levelEnthusiast') || 'Enthusiast' },
                    { value: 'connoisseur', label: t('auth.levelConnoisseur') || 'Connoisseur' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLevel(option.value as 'starter' | 'explorer' | 'enthusiast' | 'connoisseur')}
                      className={cn(
                        'py-2 px-3 rounded-lg font-medium transition-all text-center',
                        'sm:py-3 sm:px-4 sm:text-base',
                        'min-h-10 sm:min-h-12',
                        level === option.value
                          ? 'bg-art-gold text-white shadow-md'
                          : 'bg-art-charcoal/5 text-art-charcoal hover:bg-art-charcoal/10'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error message */}
              {registerError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-lg bg-red-50 p-4 border border-red-200"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{registerError}</p>
                </motion.div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold text-white transition-all',
                  'bg-art-gold hover:bg-art-gold-light disabled:opacity-70 disabled:cursor-not-allowed',
                  'shadow-md hover:shadow-lg active:scale-[0.98]',
                  'flex items-center justify-center gap-2',
                  'sm:py-4 sm:text-lg',
                  'min-h-12 sm:min-h-14'
                )}
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {t('auth.createAccount') || 'Create Account'}
              </button>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-art-charcoal/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gradient-to-br from-art-cream via-art-ivory to-white px-2 text-art-charcoal/50">
                    {t('auth.or') || 'or'}
                  </span>
                </div>
              </div>

              {/* Google sign-in */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold transition-all',
                  'border border-art-charcoal/20 hover:border-art-charcoal/40',
                  'bg-white hover:bg-art-charcoal/5',
                  'text-art-charcoal flex items-center justify-center gap-3',
                  'disabled:opacity-70 disabled:cursor-not-allowed',
                  'sm:py-4 sm:text-lg',
                  'min-h-12 sm:min-h-14'
                )}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {t('auth.googleSignUp') || 'Sign up with Google'}
              </button>

              {/* Continue as guest link */}
              <div className="mt-6 text-center border-t border-art-charcoal/10 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    enterAsGuest();
                    onClose();
                  }}
                  className="text-sm text-art-charcoal/60 hover:text-art-charcoal transition-colors"
                >
                  {t('guest.maybeLater') || 'Maybe later'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
