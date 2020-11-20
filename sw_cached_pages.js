const cacheName = 'v1';

const cacheAssets = [
    '/',
    'index.html',
    'today.html',
    'projectInfo.html',
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
    '/js/main.js',
    '/js/script.js',
    '/js/worker.js',
    '/js/script3.js',
    '/js/worker3.js',
    '/js/worker4.js',
    '/js/upButton.js',
    'https://www.nbrb.by/api/exrates/rates?periodicity=0',
    'https://www.nbrb.by/api/exrates/currencies',
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

self.addEventListener ('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});