/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // The base URL of your site
  siteUrl: 'https://asepharyana.cloud',

  // Paths to exclude from the sitemap
  exclude: ['/icon.svg', '/apple-icon.png', '/manifest.webmanifest', '/tags/*'],

  // Generate a robots.txt file
  generateRobotsTxt: true,

  // Generate an index sitemap
  generateIndexSitemap: true,

  // Options for the robots.txt file
  robotsTxtOptions: {
    policies: [
      {
        // Apply to all user agents
        userAgent: '*',

        // Allow all paths
        allow: '/',
      },
    ],
  },
};
