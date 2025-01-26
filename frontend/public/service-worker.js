/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'tiferet-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/generic-variables.css',
  '/static/js/bundle.js', // Asegúrate de incluir las rutas correctas a los archivos JavaScript
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js', 
  '/static/css/main.chunk.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => 
          cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
        )
      );
    })
  );
});