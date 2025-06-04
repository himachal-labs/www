import Script from 'next/script'

export default function PlausibleScript() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <Script
      defer
      data-domain="vastsilicon.com"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}