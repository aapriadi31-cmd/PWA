const CACHE_NAME = 'apotek-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Event Install: Simpan aset utama ke Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA Cache berhasil dibuka');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Event Activate: Hapus Cache Lama Jika Ada Perubahan Version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Event Fetch: Mengambil data dari cache jika offline, atau dari jaringan jika online
self.addEventListener('fetch', (event) => {
  // Biarkan request Firebase Firestore langsung lewat jaringan
  if (event.request.url.includes('firestore.googleapis.com') || event.request.url.includes('firebase')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
