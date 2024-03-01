if('serviceWorker' in navigator){
    console.log("service worker working properly");
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("../sw_cached_site.js")
        .then((reg)=>console.log("service worker: Registered"))
        .catch((err)=>console.error(`Service Worker : Error ${err}`))
    })
}