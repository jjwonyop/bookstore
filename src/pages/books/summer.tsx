import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState } from "react";
import { getImagePath, useImagePath } from "@/utils/path";
import SchemaOrg from "@/components/SchemaOrg";

// 탭 컴포넌트
interface TabProps {
  active: string;
  onChange: (tab: string) => void;
}

function BookTabs({ active, onChange }: TabProps) {
  const tabs = [
    { id: "intro", label: "책 소개" },
  ];

  return (
    <div className="flex space-x-1 border-b border-gray-300 mb-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-2 px-4 text-sm md:text-base ${
            active === tab.id
              ? "border-b-2 border-black font-medium"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// 구매처 링크 컴포넌트
function BookstoreLinks() {
  const stores = [
    { name: "YES24", url: "https://www.yes24.com" },
    { name: "알라딘", url: "https://www.aladin.co.kr" },
    { name: "교보문고", url: "https://www.kyobobook.co.kr" },
    { name: "영풍문고", url: "https://www.ypbooks.co.kr" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {stores.map((store) => (
        <Link
          key={store.name}
          href={store.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-100 text-black hover:bg-gray-200 rounded-md text-sm transition-colors"
        >
          {store.name}
        </Link>
      ))}
    </div>
  );
}

// 책 정보 컴포넌트
function BookInfo() {
  return (
    <div className="text-sm md:text-base text-gray-700 mt-2 space-y-1">
      <p>저자 김서혜 | 출판사 아이와글</p>
      <p>발행일 2025.03.12 | ISBN 9791199145504</p>
      <p>32쪽</p>
    </div>
  );
}

// 책 소개 내용 컴포넌트
function BookIntroduction() {
  const getImagePath = useImagePath();
  
  const bookImages = [
    {
      src: getImagePath("/images/books/작품소개1.png"),
      alt: "리오와 스피치 마법학교 - 내용 이미지 1"
    },
    {
      src: getImagePath("/images/books/작품소개2.png"),
      alt: "리오와 스피치 마법학교 - 내용 이미지 2"
    },
    {
      src: getImagePath("/images/books/작품소개3.png"),
      alt: "리오와 스피치 마법학교 - 내용 이미지 3"
    },
    {
      src: getImagePath("/images/books/작품소개4.png"),
      alt: "리오와 스피치 마법학교 - 내용 이미지 4"
    },
    {
      src: getImagePath("/images/books/작품소개5.png"),
      alt: "리오와 스피치 마법학교 - 내용 이미지 5"
    }
  ];

  return (
    <div className="w-full text-black mt-0 md:mt-0 md:max-w-none p-0">
      <div className="flex flex-col -space-y-1 md:max-w-3xl md:mx-auto mt-0 pt-0">
        {bookImages.map((image, index) => (
          <div key={index} className="w-full m-0 p-0">
            <div className="relative w-full m-0 p-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                className="w-full h-auto object-cover m-0 p-0"
                quality={90}
                priority={index < 2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Summer() {
  const [activeTab, setActiveTab] = useState<string>("intro");

  return (
    <Layout activeMenu="books" activeSubmenu="summer">
      <Head>
        <title>리오와 스피치 마법학교 - 출판사 아이와글</title>
        <meta name="description" content="리오와 스피치 마법학교 - 출판사 아이와글" />
        <meta name="keywords" content={`리오와 스피치 마법학교`} />
        <meta property="og:title" content={`리오와 스피치 마법학교 | 아이와글 출판사`} />
        <meta property="og:description" content={`어린이 스피치 동화, 스피치, 키즈스피치 도서`} />
        <meta property="og:image" content={getImagePath("/images/books/책이미지.png")} />
        <meta property="og:url" content={`https://iwagle.com/books/summer`} />
        <meta property="og:type" content="book" />
        <link rel="canonical" href={`https://iwagle.com/books/summer`} />
        {/* Schema.org 구조화 데이터 */}
        <SchemaOrg 
          type="book" 
          data={{
            url: "https://iwagle.com/books/summer",
            name: "리오와 스피치 마법학교",
            image: `https://iwagle.com${getImagePath("/images/books/책이미지.png")}`,
            description: "어린이 스피치 동화, 스피치, 키즈스피치 도서",
            isbn: "9791199145504",
            author: "김서혜",
            datePublished: "2025.03.12"
          }}
        />
      </Head>

      <div className="container mx-auto px-4 md:py-16 py-4">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 책 표지 이미지 */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
            <div className="relative w-48 md:w-56 h-64 md:h-80">
              <Image
                src={getImagePath("/images/books/책이미지.png")}
                alt="리오와 스피치 마법학교"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 책 정보 영역 */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold">리오와 스피치 마법학교 - 출판사 아이와글</h2>
            <BookInfo />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium">도서 판매처 바로가기</h3>
              <BookstoreLinks />
            </div>
            
            {/* 탭 네비게이션 */}
            <div className="mt-8 md:mt-12">
              <BookTabs active={activeTab} onChange={setActiveTab} />
              
              {/* 탭 내용 */}
              {activeTab === "intro" && (
                <div className="md:px-0 -mx-4">
                  <BookIntroduction />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
