import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ResponsivePublisherImageProps {
  className?: string;
  priority?: boolean;
}

const ResponsivePublisherImage: React.FC<ResponsivePublisherImageProps> = ({ 
  className = '', 
  priority = false 
}) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 화면 크기 변화 감지
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // 초기 설정
      checkMobile();
      setMounted(true);
      
      // 리사이즈 이벤트 리스너
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  if (!mounted) {
    // 서버 사이드 렌더링 중에는 빈 컨테이너만 표시
    return <div className={`w-full bg-gray-100 ${className}`} style={{ height: '400px' }} />;
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* 모바일 이미지 */}
      {isMobile && (
        <div className="relative w-full mx-auto" style={{ 
          aspectRatio: '500/700',
          maxWidth: '90vw',
          margin: '0 auto'
        }}>
          <Image
            src="/images/about/mobile/모바일용-출판사소개.png"
            alt="출판사 무제 소개 (모바일)"
            fill
            sizes="100vw"
            style={{ objectFit: 'contain' }}
            className="rounded-md shadow-md"
            priority={priority}
          />
        </div>
        
      )}

      {/* 데스크탑 이미지 */}
      {!isMobile && (
        <div className="relative w-full mx-auto" style={{ 
          aspectRatio: '800/600',
          maxWidth: '90%',
          margin: '0 auto'
        }}>
          <Image
            src="/images/about/pc/출판사소개-1.png"
            alt="출판사 무제 소개 (데스크탑)"
            fill
            sizes="(min-width: 768px) 90vw, 100vw"
            style={{ objectFit: 'contain' }}
            className="rounded-md shadow-md"
            priority={priority}
          />
        </div>
      )}
      
      {/* CSS 애니메이션 효과 */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .image-container {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default ResponsivePublisherImage; 