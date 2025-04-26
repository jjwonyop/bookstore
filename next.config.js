/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i0.wp.com', 'iwagle.com', 'wp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'iwagle.com',
        pathname: '**',
      }
    ],
  },
}

module.exports = nextConfig 