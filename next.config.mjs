/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'source.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'imgur.com',
          },
          {
            protocol: 'https',
            hostname: 'fakestoreapi.com',
          },


        ],
      },
};

export default nextConfig;
