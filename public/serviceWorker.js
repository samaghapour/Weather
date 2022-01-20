const CACHE_NAME = 'version-1';
const toChache = ['offline.html'];

//eslint-disable-next-line
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(toChache)));
});

//eslint-disable-next-line
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then(() => fetch(e.request))
      .catch(() => caches.match('offline.html'))
  );
});

//eslint-disable-next-line
self.addEventListener('activate', (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
