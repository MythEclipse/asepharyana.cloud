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
            maxEntries: 1000, // Batasi maksimal file hingga 10.000
            maxAgeSeconds: 2 * 60 * 60 // Kedaluwarsa dalam 6 jam
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  env: {
    SECRET: process.env.SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    SUPABASE_URL: process.env.SUPABASE_URL,
    GEMINI_API: process.env.GEMINI_API,
    NEXT_PUBLIC_KOMIK: process.env.NEXT_PUBLIC_KOMIK,
    NEXT_PUBLIC_ANIME: process.env.NEXT_PUBLIC_ANIME,
    DATABASE_URL: process.env.DATABASE_URL
  },
  api: {
    bodyParser: {
      sizeLimit: '1gb' // Maksimal ukuran body
    }
  }
};

module.exports = withPWA(nextConfig);
