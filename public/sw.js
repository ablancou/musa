/**
 * MŪSA Service Worker — Offline-first with cache strategies
 *
 * Strategies:
 * - Static assets (CSS/JS/fonts): Cache First
 * - Images (Wikimedia, Met, etc.): Stale While Revalidate
 * - API/data requests: Network First with cache fallback
 * - Pages: Network First with offline shell fallback
 */

const CACHE_NAME = 'musa-v1';
const STATIC_CACHE = 'musa-static-v1';
const IMAGE_CACHE = 'musa-images-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
];

const IMAGE_HOSTS = [
  'upload.wikimedia.org',
  'images.metmuseum.org',
  'lh3.googleusercontent.com',
];

// Install — pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== IMAGE_CACHE && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — routing strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Chrome extensions and dev tools
  if (url.protocol === 'chrome-extension:' || url.hostname === 'localhost') return;

  // Image requests — Stale While Revalidate
  if (IMAGE_HOSTS.some((host) => url.hostname === host) || url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg)$/)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // Static assets — Cache First
  if (url.pathname.match(/\.(css|js|woff2?|ttf|eot)$/) || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Everything else — Network First
  event.respondWith(networkFirst(request, CACHE_NAME));
});

// --- Cache strategies ---

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback to offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) return offlinePage;
    }
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}
