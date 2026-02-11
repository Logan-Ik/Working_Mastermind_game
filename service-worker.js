self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request, { redirect: 'follow' }) // <- follow redirects
      .catch(err => {
        console.error('Fetch failed:', err);
        return new Response('Network error occurred', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});
self.addEventListener('install', event => {
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => caches.delete(key)) // clear old caches
      );
    })
  );
});
