import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

// 그림 정보 컴포넌트
function PaintInfo() {
  return (
    <div className="text-sm md:text-base text-gray-700 mt-2 space-y-1">
      <p>작가명 윤봄</p>
      <p>크기 25.0×25.0 cm</p>
      <p>재료 Acrylic on canvas</p>
    </div>
  );
}

// 책 소개 내용 컴포넌트
function PaintIntroduction() {
  return (
    <div className="w-full text-black mt-6 md:mt-8 md:max-w-3xl p-4">
      <div className="space-y-4 text-base md:text-lg">
        <h3 className="text-lg font-medium">
          작품소개
        </h3>
        <p>
        하루를 잘 보낸 너에게,<br />
        작은 용기를 낸 너에게,<br />
        어제보다 조금 자란 너에게,<br /><br />
        진심을 담아 축하한다.<br /><br />
        자란다.<br />
        자란다.<br />
        잘한다.
        </p>
        <h3 className="text-lg font-medium">
           작가 소개
        </h3>
        <p className="text-sm md:text-base whitespace-normal break-words">
          윤봄 Yoon Bom<br />
          경북대학교 예술대학 서양화과 졸업<br />
          2023 Lovely Life &lt;KUMA D|2&gt;<br />
          2023 Being as Nature &lt;갤러리 Ea&gt;<br />
          2022 Reboot &lt;갤러리 이마주&gt;<br />
          2021 늘 함께 걷는 &lt;인사아트센터&gt;<br />
          2021 Someday, Somewhere &lt;고양아람누리&gt;<br />
          2021 Walking with Nature &lt;KUMA&gt;<br />
          2021 본질, 있는 그대로를 드러내다 &lt;천리포수목원&gt;<br />
          2021 Being as Nature &lt;갤러리 에&gt;<br />
          2020 Hold Your Dream 후반전 &lt;어울림 미술관&gt;<br />
          2020 Amazing Grace &lt;갤러리 소금항아리&gt;
        </p>
        <h3 className="text-lg font-medium">
          수상
        </h3>
        <p>
          2021 44회 한국문화미술대전 은상<br />
          2021 국제문화미술대전 동상
        </p>
      </div>
    </div>
  );
}

export default function Rio() {
  const store = { name: "네이버 스마트 스토어", url: "https://www.naver.com" };
  return (
    <Layout activeMenu="series">
      <Head>
        <title>출판사 아이와글</title>
        <meta name="description" content="출판사 아이와글 공식 웹사이트입니다." />
      </Head>

      <div className="container mx-auto px-4 md:py-16 py-4">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 이미지 */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
            <div className="relative w-full h-[300px] md:w-56 md:h-80">
              <Image
                src="/images/series/갤러리1.jpeg"
                alt="리오"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h2 className="text-2xl md:text-3xl font-bold">작품명 - 리오</h2>
            <PaintInfo />
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">구매정보</h3>
              <div className="py-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">구성</span>
                  <span className="text-right">원화</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">금액</span>
                  <span className="text-right">KRW 150,000</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">문의</span>
                  <span className="text-right">031-360-3994</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-700">구매링크</span>
                  <span className="text-right">
                    <Link
                      key={store.name}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-1 bg-gray-100 text-black hover:bg-gray-200 rounded-md text-sm transition-colors"
                    >
                      네이버 스마트 스토어
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12">
              <PaintIntroduction />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 