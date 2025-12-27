const CACHE_NAME = 'kopala-fpl-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// Background Sync for Offline Transfers
self.addEventListener('sync', e => {
  if (e.tag === 'sync-transfers') {
    e.waitUntil(sendQueuedTransfers());
  }
});
