import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // General rules for all bots: Allow all content except for specified directories and files
        userAgent: '*',
        disallow: [
          '/admin/',
          '/login/',
          '/register/',
          '/private/',
          '/secret-page.html',
          '/*?search=',
          '/*?callbackUrl='
        ],
        allow: [
          '/',
          '/anime/',
          '/komik/',
          // Allow specific file types to be crawled
          '/*.css$',
          '/*.js$',
          '/*.jpg$',
          '/*.png$',
          '/*.gif$'
        ]
      },
      {
        // Googlebot-specific rules: Explicitly allow access to entire site
        userAgent: 'Googlebot',
        allow: ['/']
      },
      {
        // Block specific bots entirely
        userAgent: 'BadBot',
        disallow: ['/']
      }
    ],
    sitemap: 'https://asepharyana.my.id/sitemap.xml', // Provide the location of the sitemap
    host: 'https://asepharyana.my.id'
  };
}
