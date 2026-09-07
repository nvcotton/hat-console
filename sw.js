const CACHE = 'hat01-console-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // アプリの見た目(HTML/CSS/JS/アイコン)だけキャッシュ。BLE通信はキャッシュ対象外(そもそも該当しない)。
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
