import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper 스타일 가져오기
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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
      </Head>
      
      <div className="w-full mt-0 pt-0 md:mt-0 md:pt-0" style={{color: 'black'}}>
        {/* 전체화면 스와이퍼 배너 영역 */}
        <section className="w-full mt-0 md:mt-0 overflow-hidden">
          {mounted && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              loop={true}
              className="mainSwiper"
            >
              <SwiperSlide>
                <div className="relative w-full">
                  {isMobile ? (
                    <div className="relative w-full h-screen max-h-[600px] overflow-hidden bg-white">
                      <Image
                        src="/images/main/mobile/모바일-대문.png"
                        alt="출판사 아이와글 모바일 배너"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-auto bg-white flex justify-center">
                      <div className="relative w-[90%] aspect-[16/9] max-h-[80vh]">
                        <Image
                          src="/images/main/pc/PC-대문.png"
                          alt="출판사 아이와글 데스크탑 배너"
                          fill
                          className="full"
                          priority
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
              
              <SwiperSlide>
                <div className="relative w-full">
                  {isMobile ? (
                    <div className="relative w-full h-screen max-h-[600px] overflow-hidden bg-white">
                      <Image
                        src="/images/main/mobile/대문2-모바일.png"
                        alt="출판사 아이와글 모바일 배너 2"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-auto bg-white flex justify-center">
                      <div className="relative w-[90%] aspect-[16/9] max-h-[80vh]">
                        <Image
                          src="/images/main/pc/대문2-PC.png"
                          alt="출판사 아이와글 데스크탑 배너 2"
                          fill
                          className="full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            </Swiper>
          )}
        </section>

        <section className="py-10 md:py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 text-black" style={{color: 'black'}}>아이와글의 소식을</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-black" style={{color: 'black'}}>확인하세요</h3>
            <div className="flex justify-center space-x-8 md:space-x-12">
              <Link href="/series" className="font-bold hover:text-gray-600 text-xl text-black" style={{color: 'black'}}>연재 →</Link>
              <Link href="/contents/news" className="font-bold hover:text-gray-600 text-xl text-black" style={{color: 'black'}}>소식 →</Link>
              <Link href="/contents/youtube" className="font-bold hover:text-gray-600 text-xl text-black" style={{color: 'black'}}>유튜브 →</Link>
            </div>
          </div>
        </section>

        {mounted && (
          <section className="mb-16 w-full">
            <div className="container mx-auto px-4 mb-8">
              <h2 className="text-3xl font-bold mb-8 text-center">출간 도서</h2>
            </div>
            
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={isMobile ? 10 : 30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper w-full pb-12"
              style={{ color: 'black' }}
            >
              <SwiperSlide>
                <div className="border border-gray-300 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-lg transition-shadow h-full mx-auto max-w-xs">
                  <div className="relative aspect-[3/4] w-full mb-4">
                    <Image
                      src="/images/books/책이미지.png"
                      alt="리오와 스피치 마법학교"
                      fill
                      className="object-cover rounded-sm"
                      sizes="(max-width: 768px) 90vw, 30vw"
                    />
                  </div>
                  <p className="text-xl font-bold text-center text-black mb-2" style={{color: 'black'}}>리오와 스피치 마법학교</p>
                  <Link href="/books/summer" className="text-center font-bold mt-auto py-3 border-t border-gray-300 mt-2 hover:text-gray-600 text-black" style={{color: 'black'}}>
                    자세히 보기
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
        )}
        
        {/* Swiper 커스텀 스타일 */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #000 !important;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }
          
          .swiper-pagination-bullet-active {
            background: #000 !important;
          }
          
          .swiper-pagination {
            position: relative;
            bottom: 0 !important;
            margin-top: 10px;
          }
          
          .swiper-slide {
            display: flex;
            justify-content: center;
            height: auto !important;
          }
          
          .swiper {
            padding-bottom: 0px;
          }
          
          /* 메인 스와이퍼 특별 스타일 */
          .mainSwiper {
            width: 100%;
            height: auto;
            padding-bottom: 0;
          }
          
          .mainSwiper .swiper-pagination {
            position: absolute;
            bottom: 0px !important;
          }
          
          .mainSwiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0.5;
            margin: 0 6px;
          }
          
          .mainSwiper .swiper-pagination-bullet-active {
            background-color: #000 !important;
            opacity: 1;
          }
          
          /* 네비게이션 버튼 관련 스타일 수정 */
          .mainSwiper .swiper-button-next,
          .mainSwiper .swiper-button-prev {
            opacity: 0;
            background-color: rgba(255, 255, 255, 0.7);
            width: 40px;
            height: 40px;
            transition: opacity 0.3s ease;
          }
          
          .mainSwiper .swiper-button-next:after,
          .mainSwiper .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }
          
          /* PC에서 호버 시 네비게이션 버튼 표시 */
          @media (min-width: 769px) {
            .mainSwiper:hover .swiper-button-next,
            .mainSwiper:hover .swiper-button-prev {
              opacity: 1;
            }
          }
          
          /* 모바일에서 네비게이션 버튼 숨김 */
          @media (max-width: 768px) {
            .mainSwiper .swiper-button-next,
            .mainSwiper .swiper-button-prev {
              display: none;
            }
          }
          
          .text-shadow {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </div>
    </Layout>
  );
}
