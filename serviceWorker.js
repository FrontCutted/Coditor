const staticApp = "coditor";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/icon-72x72.png",
  "/images/icon-96x96.png",
  "/images/icon-128x128.png",
  "/images/icon-144x144.png",
  "/images/icon-152x152.png",
  "/images/icon-192x192.png",
  "/images/icon-384x384.png",
  "/images/icon-512x512.png",
  "/images/icon-m-72x72.png",
  "/images/icon-m-96x96.png",
  "/images/icon-m-128x128.png",
  "/images/icon-m-192x192.png",
  "/images/icon-m-384x384.png",
  "/images/icon-m-512x512.png",
  "/images/ss-1.png",
  "/images/ss-2.png",
  "/images/ss-3.png",
  "/images/ss-4.png",
  "/images/ss-5.png",
  "/images/ss-6.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticApp).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
