import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-bold text-xl mb-4 block">
              출판사 아이와글
            </Link>
            <p className="text-sm text-gray-500 mb-2">iwagle</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium mb-3">책 소개</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/books/first-summer">리오와 스피치 마법학교</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">연재</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/series">최신 연재</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">콘텐츠</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contents/naver">소식</Link></li>
                <li><Link href="/contents/youtube">유튜브</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">뉴스</h3>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700 mr-4">
              이용약관
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} 출판사 아이와글., All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 