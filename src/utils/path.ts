import { useRouter } from 'next/router';

// 배포 시 basePath 접두사 (커스텀 도메인 사용 시 비활성화)
// const BASEPATH = '/bookstore';
const BASEPATH = '';

// basePath를 고려한 이미지 경로를 생성하는 함수
export const getImagePath = (path: string): string => {
  // 이미 http나 https로 시작하는 절대 URL인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 슬래시로 시작하지 않는 경우 슬래시 추가
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 이미지 확장자가 png, jpg, jpeg인 경우 webp로 변경
  let optimizedPath = normalizedPath;
  const extensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];
  
  for (const ext of extensions) {
    if (normalizedPath.endsWith(ext)) {
      optimizedPath = normalizedPath.replace(ext, '.webp');
      break;
    }
  }
  
  // 개발 환경에서는 basePath 없이, 배포 환경에서는 basePath 포함
  const basePath = process.env.NODE_ENV === 'production' ? BASEPATH : '';
  
  return `${basePath}${optimizedPath}`;
};

// 정적 경로에서 사용할 수 있는 함수 - 서버 사이드 렌더링에서 사용
export const getStaticImagePath = (path: string): string => {
  // 이미 http나 https로 시작하는 절대 URL인 경우 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // 슬래시로 시작하지 않는 경우 슬래시 추가
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 이미지 확장자가 png, jpg, jpeg인 경우 webp로 변경
  let optimizedPath = normalizedPath;
  const extensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];
  
  for (const ext of extensions) {
    if (normalizedPath.endsWith(ext)) {
      optimizedPath = normalizedPath.replace(ext, '.webp');
      break;
    }
  }
  
  // 개발 환경에서는 basePath 없이, 배포 환경에서는 basePath 포함
  const basePath = process.env.NODE_ENV === 'production' ? BASEPATH : '';
  
  return `${basePath}${optimizedPath}`;
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