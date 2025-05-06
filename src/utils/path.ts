import { useRouter } from 'next/router';

// 배포 시 basePath 접두사 (환경변수로도 설정 가능)
const BASEPATH = '/bookstore';

// basePath를 고려한 이미지 경로를 생성하는 함수
export const getImagePath = (path: string): string => {
  // 이미 http나 https로 시작하는 절대 URL인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 슬래시로 시작하지 않는 경우 슬래시 추가
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 개발 환경에서는 basePath 없이, 배포 환경에서는 basePath 포함
  const basePath = process.env.NODE_ENV === 'production' ? BASEPATH : '';
  
  return `${basePath}${normalizedPath}`;
};

// 정적 경로에서 사용할 수 있는 함수 - 서버 사이드 렌더링에서 사용
export const getStaticImagePath = (path: string): string => {
  // 이미 http나 https로 시작하는 절대 URL인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 슬래시로 시작하지 않는 경우 슬래시 추가
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 개발 환경에서는 basePath 없이, 배포 환경에서는 basePath 포함
  const basePath = process.env.NODE_ENV === 'production' ? BASEPATH : '';
  
  return `${basePath}${normalizedPath}`;
};

// React 컴포넌트 내에서 사용할 수 있는 훅
export const useImagePath = (): (path: string) => string => {
  const router = useRouter();
  
  return (path: string): string => {
    // 이미 http나 https로 시작하는 절대 URL인 경우 그대로 반환
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // 슬래시로 시작하지 않는 경우 슬래시 추가
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    return `${router.basePath}${normalizedPath}`;
  };
}; 