import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { Noto_Sans_KR } from "next/font/google";
import { useImagePath } from "../../utils/path";
import { useQRUser } from "../../utils/useQRUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface LayoutProps {
  children: ReactNode;
  activeMenu?: "about" | "books" | "series" | "contents" | "news";
  activeSubmenu?: string;
  fullWidth?: boolean;
}

export default function Layout({ children, activeMenu, activeSubmenu, fullWidth = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getImagePath = useImagePath();
  const { isQRUser, loading } = useQRUser();

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen bg-white text-black`} style={{ color: 'black' }}>
      {/* 단일 헤더 */}
      <header className="border-b border-gray-300 sticky top-0 bg-white z-30">
        <div className="container mx-auto px-4 py-0 flex justify-between items-center">
          <div className="flex items-center space-x-4 md:w-auto w-1/3">
            {/* PC: 좌측 상단에 로고 크게, 모바일에서는 숨김 */}
            <Link href="/" className="md:flex hidden items-center">
              <Image
                src={getImagePath("/images/로고.png")}
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
                  src={getImagePath("/images/로고.png")}
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
              style={{ color: 'black' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'black' }}>
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
              style={{ color: 'black' }}
            >
              아이와글 소개
            </Link>
            <div>
              <Link
                href="/books"
                className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "books" ? "font-bold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'black' }}
              >
                아이와글 책장
              </Link>
              {activeMenu === "books" && (
                <div className="pl-4 border-l border-gray-300 my-2">
                  <Link
                    href="/books/summer"
                    className={`py-1 block text-black ${activeSubmenu === "summer" ? "font-bold" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: 'black' }}
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
              style={{ color: 'black' }}
            >
              아이와글 아트
            </Link>
            {/* QR 유저에게만 컨텐츠 메뉴 표시 */}
            {isQRUser && !loading && (
              <div>
                <Link
                  href="/contents"
                  className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "contents" ? "font-bold" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'black' }}
                >
                  아이와글 교육
                </Link>
              </div>
            )}
            <div>
              <Link
                href="/news"
                className={`py-2 block border-b border-gray-300 text-black ${activeMenu === "news" ? "font-bold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'black' }}
              >
                아이와글 소식
              </Link>
            </div>
            <button
              className="mt-6 p-2 border border-gray-300 rounded w-full text-black"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: 'black' }}
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
          <ul className="flex space-x-8" style={{ color: 'black' }}>
            <li>
              <Link
                href="/about"
                className={activeMenu === "about" ? "font-bold" : "text-black hover:text-gray-600"}
                style={{ color: 'black' }}
              >
                아이와글 소개
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="/books"
                className={activeMenu === "books" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{ color: 'black' }}
              >
                아이와글 책장
              </Link>
              <div className="absolute hidden group-hover:block bg-white border border-gray-300 p-4 min-w-48 z-10">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/books/summer"
                      className={activeSubmenu === "summer" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                      style={{ color: 'black' }}
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
                style={{ color: 'black' }}
              >
                아이와글 아트
              </Link>
            </li>
            {/* QR 유저에게만 컨텐츠 메뉴 표시 */}
            {isQRUser && !loading && (
              <li className="relative group">
                <Link
                  href="/contents"
                  className={activeMenu === "contents" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                  style={{ color: 'black' }}
                >
                  아이와글 교육
                </Link>
              </li>
            )}
            <li className="relative group">
              <Link
                href="/news"
                className={activeMenu === "news" ? "font-bold text-black" : "text-black hover:text-gray-600"}
                style={{ color: 'black' }}
              >
                아이와글 소식
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className={fullWidth ? "w-full p-0 m-0" : ""}>{children}</main>

      <footer className="border-t border-yellow-300 mt-12" style={{ backgroundColor: '#F9DB35' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="pt-4 flex flex-col md:flex-row justify-start items-start space-y-2 md:space-y-0 md:space-x-8">
            <p className={`text-xs text-gray-800 ${notoSansKR.className}`}>도서출판 아이와글, 사업자등록번호 605-92-52555</p>
            <p className={`text-xs text-gray-800 ${notoSansKR.className}`}>경기도 의왕시 내손로10 나동 214호</p>
            <p className={`text-xs text-gray-800 ${notoSansKR.className}`}>메일 : lalalaspeech@gmail.com</p>
          </div>
          <div className="pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-800 font-medium">© 2025 출판사 아이와글, All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 