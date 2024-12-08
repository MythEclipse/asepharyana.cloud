/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://asepharyana.cloud', // Tambahkan siteUrl dengan URL situs Anda
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/tags/*'],
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
};
