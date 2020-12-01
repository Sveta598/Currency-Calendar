const cacheName = 'v1';

const cacheAssets = [
    '/',
    'index.html',
    'todayrates.html',
    'projectinfo.html',
    '/css/style.css',
    '/css/font/_flaticon.scss',
    '/css/font/flaticon.css',
    '/css/font/Flaticon.eot',
    '/css/font/flaticon.html',
    '/css/font/Flaticon.svg',
    '/css/font/Flaticon.ttf',
    '/css/font/Flaticon.woff',
    '/css/font/Flaticon.woff2',
    '/img/2.jpg',
    '/js/cacheswreg.js',
    '/js/todayRates.js',
    '/js/todayRateWorker.js',
    '/js/chartDrawing.js',
    '/js/curObjWorker.js',
    '/js/chartDrawWorker.js',
    '/js/upButton.js',
    'https://www.nbrb.by/api/exrates/currencies',
    'https://www.nbrb.by/api/exrates/rates?periodicity=0',
]

self.addEventListener ('install', e => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
            cache.addAll(cacheAssets);
         })
         .then (() => self.skipWaiting())
    );
});

self.addEventListener ('activate', e => {
    e.waitUntil (
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open('v1').then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise;
        });
      }),
    );
});

