---
---
'use strict';

const VERSION = 'cache-v{{site.time | replace:" ","" | replace:":","" | replace:"-",""}}';

const urls = [
  '/',
  '/robots.txt',
  '/manifest.json',

  '/assets/images/apple-touch-icon.png',
  '/assets/images/chrome-touch-icon-192x192.png',
  '/assets/images/icon-128x128.png',
  '/assets/images/ms-touch-icon-144x144-precomposed.png',
  '{{ site.logo }}',

  'https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/5.0.0/sanitize.min.css',
  '/assets/styles/vinkla.css',

  'https://giphy.com/static/js/widgets/tv.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(urls)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== VERSION) {
        caches.delete(key);
      }
    }));
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
