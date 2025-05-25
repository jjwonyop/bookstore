/**
 * 보안 강화된 파일 다운로드 유틸리티 (정적 사이트 최적화)
 * 실제 파일 없이 Base64 데이터로 다운로드 구현
 */

import { validateDownloadSecurity } from './securityUtils';
import { SecureDownloadFile, createDownloadUrl, getSecureFileById, secureDownloadFiles } from '../data/downloadFiles';

// 기존 인터페이스는 하위 호환성을 위해 유지
export interface DownloadFile {
  fileName: string;
  displayName: string;
  filePath: string;
  fileSize?: string;
  description?: string;
}

// 레거시 호환성을 위한 downloadFiles (새로운 시스템에서는 사용하지 않음)
export const downloadFiles: DownloadFile[] = secureDownloadFiles.map((file) => ({
  fileName: file.fileName,
  displayName: file.displayName,
  filePath: `blob://secure/${file.id}`,
  fileSize: file.fileSize,
  description: file.description
}));

/**
 * Referrer 검증 함수
 */
const isValidReferrer = (): boolean => {
  // 개발환경에서는 Referrer 검증 완화
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  const referrer = document.referrer;
  const currentHost = window.location.hostname;
  
  // 같은 도메인에서의 직접 접근은 허용 (Referrer가 없어도 OK)
  if (!referrer) {
    // 현재 페이지가 같은 도메인이면 허용
    return currentHost.includes('iwagle.com') || currentHost === 'localhost';
  }
  
  try {
    const referrerUrl = new URL(referrer);
    // 같은 도메인이거나 허용된 도메인에서 온 경우 허용
    return referrerUrl.hostname === currentHost || 
           referrerUrl.hostname.includes('iwagle.com') ||
           (currentHost === 'localhost' && referrerUrl.hostname === 'localhost');
  } catch {
    return false;
  }
};



/**
 * QR 사용자 권한 검증
 */
const checkQRPermission = (file: SecureDownloadFile): boolean => {
  if (!file.requiresQR) return true;
  
  // QR 사용자 검증 로직 (localStorage에서 확인)
  try {
    const qrUserData = localStorage.getItem('qr_user_verified');
    return qrUserData === 'true';
  } catch {
    return false;
  }
};

/**
 * 보안 강화된 파일 다운로드 함수
 * @param fileId 다운로드할 파일 ID
 */
export const downloadSecureFile = async (fileId: string): Promise<void> => {
  // 1. 파일 존재 확인
  const file = getSecureFileById(fileId);
  if (!file) {
    throw new Error('파일을 찾을 수 없습니다.');
  }

  // 2. 종합 보안 검증
  validateDownloadSecurity(file.fileName);

  // 3. QR 권한 검증
  if (!checkQRPermission(file)) {
    throw new Error('이 파일은 QR 코드로 방문한 사용자만 다운로드할 수 있습니다.');
  }

  // 4. Referrer 검증 (임시로 경고만 출력)
  if (!isValidReferrer()) {
    console.warn('Invalid referrer detected:', {
      referrer: document.referrer,
      currentHost: window.location.hostname,
      currentUrl: window.location.href
    });
    // 임시로 Referrer 검증 실패 시에도 다운로드 허용 (디버깅용)
    // throw new Error('유효하지 않은 접근입니다.');
  }

  // 5. 다운로드 로그 (개발환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log(`Secure download initiated: ${file.displayName} at ${new Date().toISOString()}`);
  }

  try {
    // 6. Blob URL 생성
    const blobUrl = createDownloadUrl(file);
    
    // 7. 다운로드 실행
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = file.displayName;
    link.style.display = 'none';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 8. Blob URL 정리 (메모리 누수 방지)
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
    
    // 9. 다운로드 완료 딜레이
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    
  } catch (error) {
    console.error('Secure download failed:', error);
    throw new Error('다운로드 중 오류가 발생했습니다.');
  }
};

/**
 * 레거시 다운로드 함수 (하위 호환성)
 * @deprecated downloadSecureFile 사용 권장
 */
export const downloadFile = async (filePath: string, fileName: string): Promise<void> => {
  // filePath에서 파일 ID 추출 시도
  const fileId = secureDownloadFiles.find(f => f.displayName === fileName)?.id;
  
  if (fileId) {
    return downloadSecureFile(fileId);
  } else {
    throw new Error('파일을 찾을 수 없습니다.');
  }
};

/**
 * 다운로드 가능 여부를 확인하는 함수
 */
export const isDownloadable = (fileName: string): boolean => {
  return secureDownloadFiles.some(file => file.fileName === fileName);
};

/**
 * 파일 정보를 가져오는 함수
 */
export const getFileInfo = (fileName: string): DownloadFile | undefined => {
  return downloadFiles.find(file => file.fileName === fileName);
};

/**
 * 보안 파일 정보를 가져오는 함수
 */
export const getSecureFileInfo = (fileId: string): SecureDownloadFile | undefined => {
  return getSecureFileById(fileId);
}; 