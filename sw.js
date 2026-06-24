/* Funance service worker — offline support.
   Cache version is bumped automatically by .githooks/pre-commit on every commit. */
const CACHE = 'funance-20260624142006';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './digi-funance-clean.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  // For page navigations (the HTML shell), bypass the BROWSER HTTP cache so a
  // fresh deploy is picked up immediately. Network-first alone isn't enough:
  // fetch() otherwise reads GitHub Pages' ~10-min cached copy of index.html.
  const isNav = e.request.mode === 'navigate' || e.request.destination === 'document';
  const req = isNav ? new Request(e.request.url, { cache: 'no-store' }) : e.request;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
