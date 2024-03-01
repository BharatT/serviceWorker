const cacheName = 'v2';

//Call install event
self.addEventListener("install",(e)=>{
    console.log("Service Worker: Installed");
    // e.waitUntil(
    //     caches
    //     .open(cacheName)
    //     .then((cache)=>{
    //         console.log("Service worker caching files ");
    //         cache.addAll(cacheAssest);
    //     })
    //     .then(()=> self.skipWaiting())

    // )
});

//Call Activate event
self.addEventListener("activate",(e)=>{
    console.log("Service Worker: Activated");
    e.waitUntil(
        caches
        .keys()
        .then((cacheNames)=>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log("Service worker : clearing old cache ");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//Call Fetch Event
self.addEventListener("fetch", (e)=>{
    console.log("Service worker : Fetching ");
    e.respondWith(fetch(e.request).then((res)=>{
        //Make copy/clone of response 
        const resClone = res.clone();
        //Open cache
        caches.open(cacheName).then(cache=>{
            //Add response to cache
            cache.put(e.request,resClone)
        });
        return res;
    })
    .catch(err => caches.match(e.request).then(res => res))
    );
});