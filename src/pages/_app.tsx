import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 기본 메타 태그 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="아이와글은 어린이 스피치 교육 전문 출판사입니다. 리오와 스피치 마법학교 시리즈로 자신감 있는 말하기와 글쓰기를 가르칩니다. 아동도서, 스피치 교육, 자신감 향상 프로그램을 제공합니다." />
        <meta name="keywords" content="아이와글, 출판사, 어린이 스피치 교육, 리오와 스피치 마법학교, 아동도서, 자신감 향상, 말하기 교육, 글쓰기 교육, 스피치 전문, 어린이 교육, 초등 스피치, 아동 스피치, 스피치 교재, 스피치 도서, 스피치 교육 프로그램, 스피치 동화책, 스피치, 어린이 스피치, 키즈스피치, 키즈스피치 도서, 선거, 자신감 스피치" />
        <meta name="author" content="출판사 아이와글" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
