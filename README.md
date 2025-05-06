# 아이와글 출판사 웹사이트

Next.js로 개발된 아이와글 출판사 공식 웹사이트입니다.

## 주요 기능

- 출판사 소개 및 도서 소개
- 최신 소식 및 이벤트 정보 제공
- 반응형 웹 디자인 (모바일/PC 지원)

## 개발 환경 설정

```bash
# 패키지 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build:prod
```

## 배포 정보

- GitHub Pages를 통해 배포
- 커스텀 도메인: [iwagle.com](https://iwagle.com)
- 자동 배포: GitHub Actions를 통한 CI/CD

## SEO 최적화

프로젝트에는 다음과 같은 SEO 최적화가 적용되어 있습니다:

1. **메타태그 최적화**
   - title, description, keywords, og 태그 등 최적화

2. **사이트맵 생성**
   - next-sitemap을 통한 자동 sitemap.xml 생성
   - 빌드 시 자동 생성됨

3. **검색엔진 등록**
   - 네이버 서치어드바이저 등록: [네이버 서치어드바이저](https://searchadvisor.naver.com)
   - 구글 서치 콘솔 등록: [구글 서치 콘솔](https://search.google.com/search-console)

4. **이미지 최적화**
   - WebP 형식으로 자동 변환
   - 이미지 사이즈 최적화

## 검색엔진 등록 방법

1. **네이버 서치어드바이저 등록**
   - [네이버 서치어드바이저](https://searchadvisor.naver.com)에 접속
   - '사이트 등록' 클릭
   - 소유권 확인을 위한 HTML 파일 다운로드 또는 메타태그 발급
   - HTML 파일은 public 폴더에 추가, 메타태그는 _document.js 또는 각 페이지의 Head에 추가
   - 소유권 확인 후 사이트맵 등록: https://iwagle.com/sitemap.xml

2. **구글 서치 콘솔 등록**
   - [구글 서치 콘솔](https://search.google.com/search-console)에 접속
   - '속성 추가' 클릭하고 도메인 또는 URL 입력
   - 소유권 확인을 위한 HTML 파일 다운로드 또는 메타태그 발급
   - HTML 파일은 public 폴더에 추가, 메타태그는 _document.js 또는 각 페이지의 Head에 추가
   - 소유권 확인 후 사이트맵 등록: https://iwagle.com/sitemap.xml

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
