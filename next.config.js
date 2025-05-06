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
  // GitHub Pages에서 사용할 때 필요한 basePath 설정
  // 레포지토리 이름이 'bookstore'인 경우 설정 필요 (아니면 주석 처리 또는 삭제)
  ...(process.env.NODE_ENV === 'production' ? { basePath: '/bookstore' } : {}),
  ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/bookstore/' } : {}),
}

module.exports = nextConfig 