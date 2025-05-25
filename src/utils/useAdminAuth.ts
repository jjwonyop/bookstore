import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface AdminAuthState {
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

/**
 * 관리자 권한을 검증하는 커스텀 훅
 */
export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AdminAuthState>({
    isAdmin: false,
    loading: true,
    error: null
  });
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = () => {
      try {
        // URL 파라미터에서 admin 확인
        const urlParams = new URLSearchParams(window.location.search);
        const adminParam = urlParams.get('admin');
        
        // localStorage에서 관리자 세션 확인
        const adminSession = localStorage.getItem('admin_session');
        const sessionTimestamp = localStorage.getItem('admin_session_timestamp');
        
        // 세션 만료 시간 (1시간)
        const SESSION_DURATION = 60 * 60 * 1000; // 1시간
        const now = Date.now();
        
        let isValidSession = false;
        
        if (adminSession && sessionTimestamp) {
          const sessionTime = parseInt(sessionTimestamp);
          isValidSession = (now - sessionTime) < SESSION_DURATION && adminSession === 'true';
        }
        
        // admin=true 파라미터가 있거나 유효한 세션이 있는 경우
        if (adminParam === 'true' || isValidSession) {
          // 새로운 세션 저장
          localStorage.setItem('admin_session', 'true');
          localStorage.setItem('admin_session_timestamp', now.toString());
          
          setAuthState({
            isAdmin: true,
            loading: false,
            error: null
          });
        } else {
          // 권한 없음
          setAuthState({
            isAdmin: false,
            loading: false,
            error: '관리자 권한이 필요합니다.'
          });
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        setAuthState({
          isAdmin: false,
          loading: false,
          error: '권한 확인 중 오류가 발생했습니다.'
        });
      }
    };

    // 컴포넌트 마운트 시 권한 확인
    checkAdminAuth();
  }, [router]);

  /**
   * 관리자 로그아웃
   */
  const logout = () => {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_session_timestamp');
    router.push('/');
  };

  /**
   * 세션 연장
   */
  const extendSession = () => {
    if (authState.isAdmin) {
      localStorage.setItem('admin_session_timestamp', Date.now().toString());
    }
  };

  return {
    ...authState,
    logout,
    extendSession
  };
}; 