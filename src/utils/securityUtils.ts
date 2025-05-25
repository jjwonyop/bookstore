/**
 * 다운로드 보안 관련 유틸리티 함수들
 */

// 다운로드 시도 기록 저장
interface DownloadAttempt {
  timestamp: number;
  fileName: string;
  userAgent: string;
  ip?: string;
}

const DOWNLOAD_ATTEMPTS_KEY = 'download_attempts';
const MAX_ATTEMPTS_PER_HOUR = 10;

/**
 * 다운로드 시도 기록
 */
export const recordDownloadAttempt = (fileName: string) => {
  try {
    const attempts = getDownloadAttempts();
    const newAttempt: DownloadAttempt = {
      timestamp: Date.now(),
      fileName,
      userAgent: navigator.userAgent
    };
    
    attempts.push(newAttempt);
    
    // 1시간 이전 기록 제거
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentAttempts = attempts.filter(attempt => attempt.timestamp > oneHourAgo);
    
    localStorage.setItem(DOWNLOAD_ATTEMPTS_KEY, JSON.stringify(recentAttempts));
  } catch (error) {
    console.warn('Failed to record download attempt:', error);
  }
};

/**
 * 다운로드 시도 기록 조회
 */
const getDownloadAttempts = (): DownloadAttempt[] => {
  try {
    const attempts = localStorage.getItem(DOWNLOAD_ATTEMPTS_KEY);
    return attempts ? JSON.parse(attempts) : [];
  } catch {
    return [];
  }
};

/**
 * Rate limiting 검증
 */
export const isRateLimited = (): boolean => {
  const attempts = getDownloadAttempts();
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  const recentAttempts = attempts.filter(attempt => attempt.timestamp > oneHourAgo);
  
  return recentAttempts.length >= MAX_ATTEMPTS_PER_HOUR;
};

/**
 * 의심스러운 User-Agent 검증
 */
export const isSuspiciousUserAgent = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const suspiciousPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl',
    'python', 'java', 'go-http', 'nodejs', 'phantom'
  ];
  
  return suspiciousPatterns.some(pattern => userAgent.includes(pattern));
};

/**
 * 브라우저 환경 검증
 */
export const isValidBrowserEnvironment = (): boolean => {
  // 기본적인 브라우저 API 존재 확인
  return typeof window !== 'undefined' && 
         typeof document !== 'undefined' && 
         typeof navigator !== 'undefined' &&
         'localStorage' in window;
};

/**
 * 종합 보안 검증
 */
export const validateDownloadSecurity = (fileName: string): void => {
  // 1. 브라우저 환경 검증
  if (!isValidBrowserEnvironment()) {
    throw new Error('Invalid environment detected');
  }

  // 2. Rate limiting 검증
  if (isRateLimited()) {
    throw new Error('다운로드 한도를 초과했습니다. 잠시 후 다시 시도해주세요.');
  }

  // 3. User-Agent 검증
  if (isSuspiciousUserAgent()) {
    throw new Error('지원되지 않는 클라이언트입니다.');
  }

  // 4. 다운로드 시도 기록
  recordDownloadAttempt(fileName);
}; 