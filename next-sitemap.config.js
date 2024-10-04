/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://asepharyana.my.id', // Tambahkan siteUrl dengan URL situs Anda
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/tags/*'],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  }
};
