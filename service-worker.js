const CACHE_NAME = "watch-tracker-v2";

const URLS_TO_CACHE = [
  "/watch-tracker/",
  "/watch-tracker/index.html",
  "/watch-tracker/manifest.json",
  "/watch-tracker/icon-192.png",
  "/watch-tracker/icon-512.png"
];

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
