import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout/Layout';

export default function About() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 화면 크기 확인 함수
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Layout activeMenu="about" fullWidth={true}>
      <Head>
        <title>출판사 아이와글 - 소개</title>
        <meta name="description" content="출판사 아이와글의 소개 페이지입니다." />
      </Head>
      
      {/* 이미지 전체 화면 표시 */}
      <div className="w-full overflow-hidden m-0 p-0">
        {/* 모바일 이미지 */}
        {isMobile && mounted && (
          <div className="w-full flex flex-col m-0 p-0">
            <div className="w-full h-auto m-0 p-0">
              <Image
                src="/images/about/mobile/모바일용-출판사소개.png"
                alt="출판사 아이와글 소개"
                width={500}
                height={800}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
                priority
              />
            </div>
            <div className="w-full h-auto m-0 p-0">
              <Image
                src="/images/about/mobile/모바일용-출판사소개2.png"
                alt="출판사 아이와글 소개 하단"
                width={500}
                height={600}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
              />
            </div>
          </div>
        )}

        {/* 데스크탑 이미지 */}
        {!isMobile && mounted && (
          <div className="w-full flex flex-col m-0 p-0">
            <div className="w-full h-auto m-0 p-0">
              <Image
                src="/images/about/pc/출판사소개-1.png"
                alt="출판사 무제 소개"
                width={1200}
                height={600}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
                priority
              />
            </div>
            <div className="w-full h-auto m-0 p-0">
              <Image
                src="/images/about/pc/출판사소개-2.png"
                alt="출판사 무제 소개 하단"
                width={1200}
                height={500}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
              />
            </div>
          </div>
        )}

        {/* 서버 사이드 렌더링 중 빈 컨테이너 표시 */}
        {!mounted && (
          <div className="w-full h-[600px] bg-gray-100"></div>
        )}
      </div>
    </Layout>
  );
} 