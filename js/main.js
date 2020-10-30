if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register("http://127.0.0.1:5500/sw_cached_site.js")
    })
}