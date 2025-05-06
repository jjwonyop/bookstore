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
    // 정적 빌드 시 이미지 최적화를 비활성화
    unoptimized: true,
    // 이미지 최적화 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
  // 커스텀 도메인 사용 시 basePath 필요 없음
  // ...(process.env.NODE_ENV === 'production' ? { basePath: '/bookstore' } : {}),
  // ...(process.env.NODE_ENV === 'production' ? { assetPrefix: '/bookstore/' } : {}),
  
  // SEO 관련 추가 설정
  poweredByHeader: false, // X-Powered-By 헤더 비활성화
  // 리다이렉트 설정 (필요한 경우)
  async redirects() {
    return [
      // 예: 이전 URL 경로를 새 경로로 리다이렉트
      {
        source: '/old-page',
        destination: '/news',
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig 