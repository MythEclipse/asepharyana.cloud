/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://asepharyana.my.id', // Ganti dengan URL situs Anda
  generateRobotsTxt: false, // Nonaktifkan pembuatan robots.txt dengan next-sitemap
  exclude: ['/admin/*', '/login', '/register'], // Halaman yang ingin Anda kecualikan
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://asepharyana.my.id/sitemap.xml' // URL sitemap
    ]
  }
};

module.exports = config;
