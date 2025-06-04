// Service Worker for VastSilicon website
// Implements caching strategy for optimal performance

const CACHE_NAME = 'vastsilicon-v1'
const STATIC_CACHE = 'vastsilicon-static-v1'
const DYNAMIC_CACHE = 'vastsilicon-dynamic-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Add other critical assets
]

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE
            })
            .map(cacheName => caches.delete(cacheName))
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategy
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external domains (except fonts and analytics)
  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('plausible.io')) {
    return
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request))
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request))
  } else {
    event.respondWith(staleWhileRevalidate(request))
  }
})

// Cache strategies
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const response = await fetch(request)
    
    if (response.status === 200) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline.html')
    }
    throw error
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }
    
    return response
  } catch (error) {
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)

  const fetchPromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse
  })

  return cachedResponse || fetchPromise
}

// Helper functions
function isStaticAsset(request) {
  const url = new URL(request.url)
  return url.pathname.includes('/_next/') || 
         url.pathname.includes('/images/') ||
         url.pathname.includes('/fonts/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.webp')
}

function isAPIRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/api/')
}

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics())
  }
})

async function syncAnalytics() {
  // Sync any queued analytics events when online
  const cache = await caches.open('analytics-queue')
  const requests = await cache.keys()
  
  for (const request of requests) {
    try {
      await fetch(request)
      await cache.delete(request)
    } catch (error) {
      // Keep in queue for next sync
      console.log('Analytics sync failed:', error)
    }
  }
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_METRIC') {
    // Forward performance metrics to analytics
    const { metric, value, rating } = event.data
    
    // Queue analytics event if offline
    if (!navigator.onLine) {
      queueAnalyticsEvent('performance', { metric, value, rating })
    }
  }
})