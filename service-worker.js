self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Try cache first
      if (response) return response;

      // If not in cache, try network
      return fetch(event.request).catch(err => {
        console.warn("Fetch failed for:", event.request.url, err);
        return new Response("Network error", { status: 404 });
      });
    })
  );
});
