const staticCacheName = 'headline-static-v2';

// cache all the files in the public folder
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then( function (cache) {
            return cache.addAll([
                '/',
                '/sw.js',
                '/assets/js/main.js',
                '/assets/js/socket.js',
                '/assets/css/main.css',
                'https://fonts.googleapis.com/css?family=Pangolin',
            ])
        }).catch( function (err) {
            console.error('errorrrrrrrrrr, something went wrong', err)
        })
    )
});

// listen for fetch events
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response) return response;
            return fetch(event.request);
        })
    )
});

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         fetch(event.request).then((response) => {
//             if (response.status == 404) {
//                 return new Response('Whoops, not found');
//             }
//             return response;
//         }).catch((err) => {
//             return new Response('no connection!');
//         })
//     )
// })


self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(
                cachesNames.filter(function(cacheName) {
                    return cacheName.startsWith('headline') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    )
})
