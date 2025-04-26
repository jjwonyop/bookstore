import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 기본 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="출판사 아이와글 공식 웹사이트입니다. 리오와 스피치 마법학교를 만나보세요." />
        <meta name="keywords" content="출판사 아이와글, 스피치, 리오와 스피치 마법학교, 아동도서, 자신감, 말하기, 글쓰기, 선거" />
        <meta name="author" content="출판사 아이와글" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
