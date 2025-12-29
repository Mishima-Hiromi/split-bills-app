const CACHE_NAME = "split-bill-app-v2.03";
// オフラインで表示するために必要なファイルの一覧
const urlsToCache = ["index.html", "manifest.json", "logo512.png"];

// ① インストール時にファイルを保存
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ② ネットがない時はキャッシュから読み込む
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあればそれを返し、なければネットに取りに行く
      return response || fetch(event.request);
    })
  );
});
