/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  transpilePackages: ['swagger-ui-react'],
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // Maksimal ukuran file 5 MB
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'runtime-cache',
          expiration: {
            maxEntries: 10000, // Batasi maksimal file hingga 10.000
            maxAgeSeconds: 6 * 60 * 60 // Kedaluwarsa dalam 6 jam
          },
          cacheableResponse: {
            statuses: [0, 200] // Hanya cache response dengan status 0 atau 200
          }
        }
      }
    ]
  }
});

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};

module.exports = withPWA(nextConfig);
