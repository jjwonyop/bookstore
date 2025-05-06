import { Html, Head, Main, NextScript } from "next/document";
import { getStaticImagePath } from "../utils/path";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href={getStaticImagePath("/cropped-favicon.png")} type="image/png" />
        <link rel="apple-touch-icon" href={getStaticImagePath("/cropped-favicon.png")} />
        <link rel="shortcut icon" href={getStaticImagePath("/cropped-favicon.png")} />
        <meta name="theme-color" content="#ffffff" />
        
        {/* 기본 OG 태그 설정 */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="출판사 아이와글" />
        <meta property="og:title" content="출판사 아이와글" />
        <meta property="og:description" content="출판사 아이와글 공식 웹사이트입니다. 리오와 스피치 마법학교를 만나보세요." />
        <meta property="og:image" content={getStaticImagePath("/images/로고.png")} />
        
        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="출판사 아이와글" />
        <meta name="twitter:description" content="출판사 아이와글 공식 웹사이트입니다. 리오와 스피치 마법학교를 만나보세요." />
        <meta name="twitter:image" content={getStaticImagePath("/images/로고.png")} />
      </Head>
      <body className="antialiased text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
