var cacheName = 'CoditorFC';
const appShellFiles = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/offline.html',
  '/img/icon-m-48.png',
  '/img/icon-m-72.png',
  '/img/icon-m-96.png',
  '/img/icon-m-128.png',
  '/img/icon-m-192.png',
  '/img/icon-m-384.png',
  '/img/icon-m-512.png'
];

self.addEventListener('install', function(e){
  console.log('[serviceWorker] installed!');
  e.waitUntil((async function(){
    const cache = await caches.open(cacheName);
    console.log('Service Worker: Caching...');
    await cache.addAll(appShellFiles);
  })());
});
self.addEventListener('fetch', (e) => {
  console.log(`Service Worker: Fetched resource ${e.request.url}`);
  e.respondWith((async function(){
    const r = await caches.match(e.request);
    if(r){return r;}
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});
/*
var cacheName = 'CoditorFC-v2';
appShellFiles.push('/pwa-examples/js13kpwa/icons/icon-32.png');

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(appShellFiles);
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});

*/