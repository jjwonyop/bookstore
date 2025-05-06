import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useImagePath } from "../utils/path";

// Swiper 스타일 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const getImagePath = useImagePath();

  // 화면 크기 확인 함수
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
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
        <title>출판사 아이와글</title>
        <meta name="description" content="출판사 아이와글 공식 웹사이트입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
                          <div className="relative w-full h-auto overflow-hidden">
                            <Image
                              src={getImagePath("/images/main/mobile/모바일-대문.png")}
                              alt="출판사 아이와글 모바일 배너"
                              width={390}
                              height={800}
                              className="w-full h-auto"
                              priority
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              src={getImagePath("/images/main/pc/PC-대문.png")}
                              alt="출판사 아이와글 데스크탑 배너"
                              width={1920}
                              height={1080}
                              className="w-full h-auto rounded-lg shadow-md"
                              style={{
                                maxHeight: '70vh',
                                objectFit: 'cover'
                              }}
                              priority
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="flex justify-center items-center p-0">
                      <div className="relative w-full">
                        {isMobile ? (
                          <div className="relative w-full h-auto overflow-hidden">
                            <Image
                              src={getImagePath("/images/main/mobile/대문2-모바일.png")}
                              alt="출판사 아이와글 모바일 배너 2"
                              width={390}
                              height={800}
                              className="w-full h-auto"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              src={getImagePath("/images/main/pc/대문2-PC.png")}
                              alt="출판사 아이와글 데스크탑 배너 2"
                              width={1920}
                              height={1080}
                              className="w-full h-auto rounded-lg shadow-md"
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

            {/* 소식 섹션 */}
            <section className="mb-12 container mx-auto px-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl md:text-2xl font-bold">소식</h2>
                <Link href="/news" className="text-sm underline">더보기</Link>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <ul className="space-y-2">
                  <li className="pb-2 border-b border-gray-100">
                    <Link href="/news/new-books" className="block hover:bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={getImagePath("/images/books/책이미지.png")}
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
