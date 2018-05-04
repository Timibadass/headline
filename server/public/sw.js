// cache all the files in the public folder
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then( function (cache) {
            return cache.addAll([
                '/',
                '/sw.js',
                '/assets/js/main.js',
                '/assets/js/socket.js',
                '/assets/css/main.css',
            ])
        }).catch( function (err) {
            console.error('errorrrrrrrrrr, something went wrong', err)
        })
    )
});

// listen for fetch events
self.addEventListener('fetch', function(event) {
    // console.log(event.request);
})

