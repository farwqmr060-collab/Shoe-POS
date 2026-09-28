const CACHE_NAME = 'pos-system-v1';
const urlsToCache = [
  './',
  './index.html',
  './cashier.html',
  './admin.html',
  './manifest.json',
  './icon.png'
];

// 1. تنصيب وحفظ الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. قراءة الملفات لو مفيش نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // لو الملف موجود في الجهاز هاته، لو مش موجود اسحبه من النت
        return response || fetch(event.request);
      })
  );
});