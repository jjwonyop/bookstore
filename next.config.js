/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 개발 환경에서는 output: 'export' 설정을 적용하지 않음
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
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
    unoptimized: true,
  },
  // 커스텀 도메인 사용 시 basePath 필요 없음
  // ...(process.env.NODE_ENV === 'production' ? { basePath: '/bookstore' } : {}),
  // ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/bookstore/' } : {}),
}

module.exports = nextConfig 