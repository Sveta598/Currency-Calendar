const cacheName = 'v2';

self.addEventListener ('install', () => {
    console.log("Service Worker Installed");
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
        fetch(e.request)
            .then(res => {
                //Make copy/clone of response
                const resClone = res.clone();
                //Open cache
                caches.open(cacheName).then(cache => {
                //Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
            }).catch(err => caches.match(e.request).then(res => res))
    );
});