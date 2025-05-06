/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://iwagle.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      // 추가 사이트맵이 있는 경우 여기에 등록
    ],
  },
} 