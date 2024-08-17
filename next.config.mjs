/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.wp.com', // Menangani semua subdomain dari wp.com
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'imgur.com'
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com'
      },
      {
        protocol: 'https',
        hostname: 'yuucdn.net'
      },
      {
        protocol: 'https',
        hostname: 'i3.wp.com'
      },
      {
        protocol: 'https',
        hostname: 'mangakita.id'
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org'
      },
      {
        protocol: 'http',
        hostname: 'yuucdn.net'
      },
      {
        protocol: 'https',
        hostname: 'otakudesu.cloud'
      },
    ]
  }
}

export default nextConfig;
