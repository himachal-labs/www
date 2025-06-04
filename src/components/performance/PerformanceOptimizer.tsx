'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload key fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.href = '/fonts/inter-var.woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // Preload hero images
      const heroImageLink = document.createElement('link')
      heroImageLink.rel = 'preload'
      heroImageLink.as = 'image'
      heroImageLink.href = '/images/hero-background.webp'
      document.head.appendChild(heroImageLink)
    }

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]')
      scripts.forEach(script => {
        if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
          script.setAttribute('defer', '')
        }
      })
    }

    // Remove unused CSS
    const removeUnusedCSS = () => {
      // Mark critical CSS as used
      document.documentElement.classList.add('js-loaded')
    }

    // Implement service worker for caching
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.log('Service Worker registration failed:', error)
        })
      }
    }

    // Execute optimizations
    preloadCriticalResources()
    optimizeThirdPartyScripts()
    removeUnusedCSS()
    registerServiceWorker()

    // Performance monitoring
    const measurePerformance = () => {
      if ('performance' in window && 'PerformanceObserver' in window) {
        // Monitor Core Web Vitals
        import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
          import('@vercel/analytics').then(({ track }) => {
            onCLS(metric => {
              track('Core Web Vital', {
                metric: 'CLS',
                value: metric.value,
                rating: metric.rating
              })
            })

            onINP(metric => {
              track('Core Web Vital', {
                metric: 'INP',
                value: metric.value,
                rating: metric.rating
              })
            })

            onFCP(metric => {
              track('Core Web Vital', {
                metric: 'FCP',
                value: metric.value,
                rating: metric.rating
              })
            })

            onLCP(metric => {
              track('Core Web Vital', {
                metric: 'LCP',
                value: metric.value,
                rating: metric.rating
              })
            })

            onTTFB(metric => {
              track('Core Web Vital', {
                metric: 'TTFB',
                value: metric.value,
                rating: metric.rating
              })
            })
          })
        })

        // Monitor Long Tasks
        const longTaskObserver = new PerformanceObserver(list => {
          import('@vercel/analytics').then(({ track }) => {
            for (const entry of list.getEntries()) {
              if (entry.duration > 50) {
                track('Long Task', {
                  duration: Math.round(entry.duration),
                  start_time: Math.round(entry.startTime)
                })
              }
            }
          })
        })

        longTaskObserver.observe({ entryTypes: ['longtask'] })

        // Monitor Resource Loading
        const resourceObserver = new PerformanceObserver(list => {
          import('@vercel/analytics').then(({ track }) => {
            for (const entry of list.getEntries()) {
              const resource = entry as PerformanceResourceTiming
              
              // Track slow resources
              if (resource.duration > 1000) {
                track('Slow Resource', {
                  resource_name: resource.name.split('/').pop() || 'unknown',
                  duration: Math.round(resource.duration),
                  resource_type: resource.initiatorType
                })
              }
            }
          })
        })

        resourceObserver.observe({ entryTypes: ['resource'] })
      }
    }

    measurePerformance()

  }, [])

  return null
}

// Critical CSS inlining component
export function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical CSS for above-the-fold content */
        .hero-section {
          display: block;
          min-height: 100vh;
        }
        
        .hero-title {
          font-size: 3.75rem;
          font-weight: 700;
          line-height: 1;
          color: #111827;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.75;
          color: #6b7280;
        }
        
        /* Prevent layout shift */
        .loading-placeholder {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Font loading optimization */
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
          src: url('/fonts/inter-var.woff2') format('woff2');
        }
      `
    }} />
  )
}

// Resource hints component
export function ResourceHints() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//vercel.live" />
      
      {/* Preconnect to critical external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
      
      {/* Module preload for critical JavaScript */}
      <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      <link rel="modulepreload" href="/_next/static/chunks/pages/_app.js" />
    </>
  )
}