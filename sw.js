const CACHE_NAME = 'bengkel-luxury-v3';
const assetsToCache = [
  '/',
  '/index.html',
  '/booking.html',
  '/katalog.html',
  '/status.html',
  '/offline.html',
  '/css/normalize.css',
  '/css/style.css',
  '/js/app.js',
  '/data/katalog.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});
