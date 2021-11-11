const PRECACHE = 'FC-Coditor';
const RUNTIME = 'runtime';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/img/ss-1.png',
  '/img/ss-2.png',
  '/img/ss-3.png',
  '/img/ss-4.png',
  '/img/ss-5.png',
  '/img/ss-6.png',
  '/img/512.png',
  '/img/icon-m-48.png',
  '/img/icon-m-72.png',
  '/img/icon-m-96.png',
  '/img/icon-m-128.png',
  '/img/icon-m-192.png',
  '/img/icon-m-384.png',
  '/img/icon-m-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});