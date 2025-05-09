import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useImagePath } from "../utils/path";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

// Swiper 스타일 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const getImagePath = useImagePath();
  const router = useRouter();

  // 화면 크기 확인 함수
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // 배너 클릭 핸들러
  const handleBannerClick = (url: string) => {
    router.push(url);
  };

  // 클라이언트 사이드에서만 Swiper를 마운트하도록 처리
  useEffect(() => {
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Layout fullWidth={true}>
      <Head>
        <title>아이와글 | 어린이 스피치 교육 전문 출판사</title>
        <meta name="description" content="아이와글은 어린이 스피치 교육 전문 출판사입니다. 리오와 스피치 마법학교 시리즈로 자신감 있는 말하기와 글쓰기를 가르칩니다. 초등학생 스피치, 어린이 자신감 향상, 말하기 교육 프로그램." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="리오와 스피치 마법학교, 어린이 스피치, 초등학생 스피치, 자신감 향상, 말하기 교육, 스피치 교육, 스피치 책, 아이와글, 출판사, 동화책, 어린이 도서, 스피치 훈련, 발표력 향상, 어린이 발표, 키즈 스피치, 스피치 수업, 아동 스피치 교재, 스피치 전문" />
        <meta name="author" content="아이와글" />
        <meta property="og:title" content="아이와글 | 어린이 스피치 교육 전문 출판사" />
        <meta property="og:description" content="아이와글은 어린이 스피치 교육 전문 출판사입니다. 리오와 스피치 마법학교 시리즈로 자신감 있는 말하기와 글쓰기를 가르칩니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iwagle.com" />
        <meta property="og:image" content="https://iwagle.com/images/main/pc/PC-대문.webp" />
        <meta property="og:site_name" content="출판사 아이와글" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="출판사 아이와글 | 어린이 스피치 교육 전문 출판사" />
        <meta name="twitter:description" content="어린이 스피치 교육 전문 출판사 아이와글 공식 웹사이트입니다." />
        <meta name="twitter:image" content="https://iwagle.com/images/main/pc/PC-대문.webp" />
        <link rel="canonical" href="https://iwagle.com" />
      </Head>

      <div className="w-full" style={{ color: 'black' }}>
        {/* 메인 레이아웃 컨테이너 */}
        <div className="w-full max-w-full mx-auto">
          {/* 메인 콘텐츠 영역 */}
          <div className="w-full px-0 py-0 overflow-hidden">
            {/* 전체화면 스와이퍼 배너 영역 */}
            <section className="w-full mb-8 p-0 overflow-hidden bg-gray-50">
              {mounted && (
                <div className="container mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={!isMobile}
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    }}
                    loop={true}
                    className="mainSwiper p-0"
                  >
                    <SwiperSlide className="flex justify-center items-center p-0">
                      <div className="relative w-full">
                        {isMobile ? (
                          <div 
                            className="relative w-full h-auto overflow-hidden cursor-pointer" 
                            onClick={() => handleBannerClick('/books/summer')}
                          >
                            <Image
                              src={getImagePath("/images/main/mobile/모바일-대문.png")}
                              alt="출판사 아이와글 모바일 배너"
                              width={390}
                              height={800}
                              className="w-full h-auto cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div 
                            className="relative cursor-pointer" 
                            onClick={() => handleBannerClick('/books/summer')}
                          >
                            <Image
                              src={getImagePath("/images/main/pc/PC-대문.png")}
                              alt="출판사 아이와글 데스크탑 배너"
                              width={1920}
                              height={1080}
                              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                              style={{
                                maxHeight: '70vh',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="flex justify-center items-center p-0">
                      <div className="relative w-full">
                        {isMobile ? (
                          <div 
                            className="relative w-full h-auto overflow-hidden cursor-pointer" 
                            onClick={() => handleBannerClick('/books/summer')}
                          >
                            <Image
                              src={getImagePath("/images/main/mobile/대문2-모바일.png")}
                              alt="출판사 아이와글 모바일 배너 2"
                              width={390}
                              height={800}
                              className="w-full h-auto cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div 
                            className="relative cursor-pointer" 
                            onClick={() => handleBannerClick('/books/summer')}
                          >
                            <Image
                              src={getImagePath("/images/main/pc/대문2-PC.png")}
                              alt="출판사 아이와글 데스크탑 배너 2"
                              width={1920}
                              height={1080}
                              className="w-full h-auto rounded-lg shadow-md cursor-pointer"
                              style={{
                                maxHeight: '70vh',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              )}
            </section>

            <section className="mb-6 container mx-auto px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl md:text-2xl font-bold">책장</h2>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <ul className="space-y-2">
                  <li className="pb-2 border-b border-gray-100">
                    <Link href="/books" className="block p-2 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={getImagePath("/images/books/책이미지.webp")}
                            alt="리오와 스피치 마법학교"
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1 text-sm md:text-base">[책소개] 리오와 스피치 마법학교</h3>
                          <p className="text-gray-600 text-xs md:text-sm">자신감과 웃음이 가득한 스피치 모험! 리오와 함께 떠나는 스피치 마법 여행으로 자신 있게 말하는 힘을 길러보세요.</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-6 container mx-auto px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl md:text-2xl font-bold">아트</h2>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <ul className="space-y-2">
                  <li className="pb-2 border-b border-gray-100">
                    <Link href="/series/rio" className="block p-2 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={getImagePath("/images/series/갤러리1.webp")}
                            alt="리오"
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1 text-sm md:text-base">[작품소개] 리오</h3>
                          <p className="text-gray-600 text-xs md:text-sm">리오, 작은 기적을 축하하는 순간의 기록. 따뜻한 시선과 부드러운 터치로 표현된 리오는 아이들의 매일을 축하하고 응원합니다.</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            {/* 소식 섹션 */}
            <section className="mb-6 container mx-auto px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl md:text-2xl font-bold">소식</h2>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <ul className="space-y-2">
                  <li className="pb-2 border-b border-gray-100">
                    <Link href="/news/new-books" className="block hover:bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={getImagePath("/images/books/책이미지.webp")}
                            alt="리오와 스피치 마법학교"
                            fill
                            className="object-cover rounded"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1 text-sm md:text-base">[신간소식] 아이와글 신간 안내</h3>
                          <p className="text-gray-600 text-xs md:text-sm">어린이 스피치 교육 전문 출판사 아이와글에서 새로운 신간 『리오와 스피치 마법학교』를 소개합니다.</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Swiper 커스텀 스타일 */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000 !important;
          width: 30px;
          height: 30px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          z-index: 10;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet-active {
          background: #000 !important;
        }
        
        .swiper-pagination {
          position: absolute !important;
          bottom: 10px !important;
          margin: 0 !important;
          padding: 0 !important;
          z-index: 10;
        }
        
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto !important;
          width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .swiper {
          padding: 0 !important;
          margin: 0 !important;
          width: 100%;
        }
        
        /* 메인 스와이퍼 특별 스타일 */
        .mainSwiper {
          width: 100%;
          height: auto;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        @media (min-width: 1024px) {
          .mainSwiper {
            min-height: 500px;
          }
        }
        
        @media (max-width: 768px) {
          .mainSwiper {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .swiper-slide {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .swiper-pagination {
            position: absolute !important;
            bottom: 10px !important;
          }
        }
        
        .mainSwiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0.5;
          margin: 0 4px;
        }
        
        .mainSwiper .swiper-pagination-bullet-active {
          background-color: #000 !important;
          opacity: 1;
        }
        
        /* 네비게이션 버튼 관련 스타일 수정 */
        .mainSwiper .swiper-button-next,
        .mainSwiper .swiper-button-prev {
          opacity: 0.7;
          background-color: rgba(255, 255, 255, 0.7);
          width: 30px;
          height: 30px;
          transition: opacity 0.3s ease;
        }
        
        .mainSwiper .swiper-button-next:after,
        .mainSwiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        
        /* PC에서 호버 시 네비게이션 버튼 표시 */
        @media (min-width: 769px) {
          .mainSwiper:hover .swiper-button-next,
          .mainSwiper:hover .swiper-button-prev {
            opacity: 1;
          }
          
          .mainSwiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 5px;
          }
        }
        
        /* 모바일에서 네비게이션 버튼 숨김 */
        @media (max-width: 768px) {
          .mainSwiper .swiper-button-next,
          .mainSwiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </Layout>
  );
}
