// Minimal safe Service Worker for DreamStream
const CACHE_NAME = "dreamstream-shell-v1";

// Only cache app shell files, never /rewards
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/dreamstream-logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🚫 Never cache /rewards files (always fetch network)
  if (url.pathname.startsWith("/rewards/")) {
    return;
  }

  // Cache-first for app shell
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
