const cacheName = 'v1';

const cacheAssets = [
    "http://127.0.0.1:5500/index.html",
    "http://127.0.0.1:5500/today.html",
    "http://127.0.0.1:5500/average.html",
    "http://127.0.0.1:5500/average.html?",
    "http://127.0.0.1:5500/projectInfo.html",
    "http://127.0.0.1:5500/css/style.css",
    "http://127.0.0.1:5500/css/font/_flaticon.scss",
    "http://127.0.0.1:5500/css/font/flaticon.css",
    "http://127.0.0.1:5500/css/font/Flaticon.eot",
    "http://127.0.0.1:5500/css/font/flaticon.html",
    "http://127.0.0.1:5500/css/font/Flaticon.svg",
    "http://127.0.0.1:5500/css/font/Flaticon.ttf",
    "http://127.0.0.1:5500/css/font/Flaticon.woff",
    "http://127.0.0.1:5500/css/font/Flaticon.woff2",
    "http://127.0.0.1:5500/img/2.jpg",
    "http://127.0.0.1:5500/js/main.js",
    "http://127.0.0.1:5500/js/script.js",
    "http://127.0.0.1:5500/js/worker.js",
    "http://127.0.0.1:5500/js/script2.js",
    "http://127.0.0.1:5500/js/script3.js",
    "http://127.0.0.1:5500/js/worker3.js",
    "http://127.0.0.1:5500/js/script4.js",
    "http://127.0.0.1:5500/js/script5.js",
    "http://127.0.0.1:5500/js/worker5.js",
    "http://127.0.0.1:5500/js/upButton.js"
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