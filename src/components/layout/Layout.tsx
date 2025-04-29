import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
  activeMenu?: "about" | "books" | "series" | "contents" | "goods";
  activeSubmenu?: string;
  fullWidth?: boolean;
}

export default function Layout({ children, activeMenu, activeSubmenu, fullWidth = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen bg-white text-black`} style={{color: 'black'}}>
      {/* 단일 헤더 */}
      <header className="border-b border-gray-300 sticky top-0 bg-white z-30">
        <div className="container mx-auto px-4 py-0 flex justify-between items-center">
          <div className="flex items-center space-x-4 md:w-auto w-1/3">
            {/* PC: 좌측 상단에 로고 크게, 모바일에서는 숨김 */}
            <Link href="/" className="md:flex hidden items-center">
              <Image
                src="/images/로고.png"
                alt="출판사 로고"
                width={180}
                height={120}
                className="h-12 md:h-16 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* 모바일: 중앙에 로고가 꽉 차게 */}
          <div className="md:hidden flex justify-center items-center w-2/3">
            <Link href="/" className="flex items-center py-2 w-full">
              <div className="flex items-center w-full">
                <Image
                  src="/images/로고.png"
                  alt="출판사 로고"
                  width={500}
                  height={300}
                  className="w-full max-w-[260px] max-h-[120px] object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="md:hidden w-1/3 flex justify-end">
            <button 
              className="p-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
              style={{color: 'black'}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{color: 'black'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/about"
              className={`py-2 border-b border-gray-300 text-black ${activeMenu === "about" ? "font-bold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{color: 'black'}}
            >
              아이와글 소개
            </Link>
            <div>
              <Link 
                href="/books"
                className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "books" ? "font-bold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{color: 'black'}}
              >
                아이와글 책장
              </Link>
              {activeMenu === "books" && (
                <div className="pl-4 border-l border-gray-300 my-2">
                  <Link 
                    href="/books/summer"
                    className={`py-1 block text-black ${activeSubmenu === "summer" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{color: 'black'}}
                  >
                    리오와 스피치 마법학교
                  </Link>
                </div>
              )}
            </div>
            <Link 
              href="/series"
              className={`py-2 border-b border-gray-300 text-black ${activeMenu === "series" ? "font-bold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{color: 'black'}}
            >
              아이와글 아트
            </Link>
            <div>
              <Link 
                href="/contents"
                className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "contents" ? "font-bold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{color: 'black'}}
              >
                아이와글 자료실
              </Link>
              {activeMenu === "contents" && (
                <div className="pl-4 border-l border-gray-300 my-2">
                  <Link 
                    href="/contents/news"
                    className={`py-1 block text-black ${activeSubmenu === "news" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{color: 'black'}}
                  >
                    소식
                  </Link>
                  <Link 
                    href="/contents/youtube"
                    className={`py-1 block text-black ${activeSubmenu === "youtube" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{color: 'black'}}
                  >
                    유튜브
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Link 
                href="/goods"
                className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "goods" ? "font-bold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{color: 'black'}}
              >
                아이와글 소식
              </Link>
              {activeMenu === "goods" && (
                <div className="pl-4 border-l border-gray-300 my-2">
                  <Link 
                    href="/goods/pen"
                    className={`py-1 block text-black ${activeSubmenu === "pen" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{color: 'black'}}
                  >
                    만년필
                  </Link>
                  <Link 
                    href="/goods/note"
                    className={`py-1 block text-black ${activeSubmenu === "note" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{color: 'black'}}
                  >
                    노트
                  </Link>
                </div>
              )}
            </div>
            <button 
              className="mt-6 p-2 border border-gray-300 rounded w-full text-black" 
              onClick={() => setMobileMenuOpen(false)}
              style={{color: 'black'}}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 데스크탑 네비게이션 */}
      <div className="hidden md:block border-b border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center">
              {/* 로고 제거됨 */}
            </Link>
          </div>
          <ul className="flex space-x-8" style={{color: 'black'}}>
            <li>
              <Link 
                href="/about" 
                className={activeMenu === "about" ? "font-bold" : "text-black hover:text-gray-600"}
                style={{color: 'black'}}
              >
                아이와글 소개
              </Link>
            </li>
            <li className="relative group">
              <Link 
                href="/books" 
                className={activeMenu === "books" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{color: 'black'}}
              >
                아이와글 책장
              </Link>
              <div className="absolute hidden group-hover:block bg-white border border-gray-300 p-4 min-w-48 z-10">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/books/summer" 
                      className={activeSubmenu === "summer" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{color: 'black'}}
                    >
                      리오와 스피치 마법학교
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link 
                href="/series" 
                className={activeMenu === "series" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{color: 'black'}}
              >
                아이와글 아트
              </Link>
            </li>
            <li className="relative group">
              <Link 
                href="/contents" 
                className={activeMenu === "contents" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{color: 'black'}}
              >
                아이와글 자료실
              </Link>
              <div className="absolute hidden group-hover:block bg-white border border-gray-300 p-4 min-w-48 z-10">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/contents/news" 
                      className={activeSubmenu === "news" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{color: 'black'}}
                    >
                      네이버
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contents/youtube" 
                      className={activeSubmenu === "youtube" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{color: 'black'}}
                    >
                      유튜브
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="relative group">
              <Link 
                href="/goods" 
                className={activeMenu === "goods" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{color: 'black'}}
              >
                아이와글 소식
              </Link>
              <div className="absolute hidden group-hover:block bg-white border border-gray-300 p-4 min-w-48 z-10">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/goods/pen" 
                      className={activeSubmenu === "pen" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{color: 'black'}}
                    >
                      만년필
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/goods/note" 
                      className={activeSubmenu === "note" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{color: 'black'}}
                    >
                      노트
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className={fullWidth ? "w-full p-0 m-0" : ""}>{children}</main>

      <footer className="border-t border-gray-300 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Image
                  src="/images/로고.png"
                  alt="출판사 로고"
                  width={180}
                  height={75}
                  className="h-10 w-auto"
                />
              </div>
            </div>
            <div>
              <Link href="/terms" className="text-sm text-black hover:underline" style={{color: 'black'}}>이용약관</Link>
              <p className="text-sm mt-2" style={{color: 'black'}}>© 2025 출판사 아이와글., All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 