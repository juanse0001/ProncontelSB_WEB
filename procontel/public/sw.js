// Service Worker for Procontel SB

const CACHE_NAME = "procontel-sb-v1"
const OFFLINE_URL = "/offline.html"

// Assets to cache
const ASSETS_TO_CACHE = [
  "/",
  "/offline.html",
  "/favicon.ico",
  "/manifest.json",
  "/assets/images/Logo.jpg",
  "/assets/css/main.css",
  "/assets/js/main.js",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(ASSETS_TO_CACHE)
      })
      .then(() => self.skipWaiting()),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Handle API requests
  if (event.request.url.includes("/api/")) {
    event.respondWith(networkFirst(event.request))
    return
  }

  // For GET requests, try the cache first, then network
  if (event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response
            }

            // Clone the response
            const responseToCache = response.clone()

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })

            return response
          })
          .catch(() => {
            // If the request is for a page, return the offline page
            if (event.request.mode === "navigate") {
              return caches.match(OFFLINE_URL)
            }

            // For image requests, return a placeholder
            if (event.request.destination === "image") {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f0f0f0"/><path d="M30 40 L70 40 L70 60 L30 60 Z" fill="#e0e0e0"/><text x="50" y="50" font-family="Arial" font-size="10" text-anchor="middle" alignment-baseline="middle" fill="#a0a0a0">Image</text></svg>',
                { headers: { "Content-Type": "image/svg+xml" } },
              )
            }
          })
      }),
    )
  }
})

// Network-first strategy for API requests
function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      // Clone the response
      const responseToCache = response.clone()

      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache)
      })

      return response
    })
    .catch(() => {
      return caches.match(request)
    })
}

// Listen for push notifications
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})
