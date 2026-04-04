'use client';

/**
 * ServiceWorkerRegistration — Registers the PWA service worker on mount.
 * Only runs in production (process.env.NODE_ENV === 'production').
 * In development, skips registration to avoid caching issues.
 */

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[MŪSA] SW registered:', registration.scope);

          // Check for updates periodically (every 60 minutes)
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);
        })
        .catch((error) => {
          console.warn('[MŪSA] SW registration failed:', error);
        });
    }
  }, []);

  return null;
}
