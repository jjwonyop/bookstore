import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<{ [key: string]: boolean }>({
    books: false,
    contents: false,
    goods: false,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (menu: string) => {
    setIsSubMenuOpen({
      ...isSubMenuOpen,
      [menu]: !isSubMenuOpen[menu],
    });
  };

  const menuItems = [
    {
      name: '출판사 무제',
      href: '/about',
      subMenus: [],
    },
    {
      name: '책 소개',
      href: '/books',
      subMenus: [
        { name: '첫 여름, 완주', href: '/books/first-summer' },
        { name: '자매일기', href: '/books/sister-diary' },
        { name: '살리는 일', href: '/books/saving-work' },
        { name: 'coming soon', href: '/books/coming-soon' },
      ],
    },
    {
      name: '연재',
      href: '/series',
      subMenus: [],
    },
    {
      name: '콘텐츠',
      href: '/contents',
      subMenus: [
        { name: '소식', href: '/contents/news' },
        { name: '유튜브', href: '/contents/youtube' },
      ],
    },
    {
      name: '굿즈',
      href: '/goods',
      subMenus: [
        { name: '만년필', href: '/goods/fountain-pen' },
        { name: '노트', href: '/goods/notebook' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <span className="sr-only">출판사 무제</span>
          {/* 로고 이미지는 나중에 추가 */}
          <div className="h-8 w-32 bg-gray-200 flex items-center justify-center">로고</div>
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link 
                href={item.href}
                className="text-gray-700 hover:text-black text-sm py-2"
              >
                {item.name}
              </Link>
              
              {item.subMenus.length > 0 && (
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg mt-1 py-2 z-10">
                  {item.subMenus.map((subItem) => (
                    <Link 
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button 
          className="md:hidden text-gray-500"
          onClick={toggleMenu}
          aria-label="메뉴"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto py-3">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-center py-3">
                  <Link 
                    href={item.href}
                    className="text-gray-700 text-sm"
                    onClick={() => item.subMenus.length === 0 && setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  
                  {item.subMenus.length > 0 && (
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="text-gray-500 p-1"
                      aria-label={`${item.name} 하위메뉴 ${isSubMenuOpen[item.name] ? '닫기' : '열기'}`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className={`h-4 w-4 transition-transform ${isSubMenuOpen[item.name] ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {item.subMenus.length > 0 && isSubMenuOpen[item.name] && (
                  <div className="pl-4 pb-3">
                    {item.subMenus.map((subItem) => (
                      <Link 
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-sm text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 