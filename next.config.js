/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true,
  experimental: {
    mdxRs: false,
  },
  
  // Performance optimizations
  compress: true,
  
  // Note: Security headers disabled for static export
  // They would need to be configured at the web server level
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    }

    // Note: usedExports removed to avoid conflicts with Next.js 15's cacheUnaffected
    // Tree shaking is handled by Next.js automatically
    config.optimization.sideEffects = false

    return config
  },
}

module.exports = nextConfig