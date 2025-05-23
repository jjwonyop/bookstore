import { useEffect } from 'react';
import { useRouter } from 'next/router';

const QRLandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 먼저 기존 QR 유저 상태 확인
    const checkExistingQRStatus = () => {
      try {
        const stored = localStorage.getItem('qr_user_status');
        if (stored) {
          const qrData = JSON.parse(stored);
          const now = Date.now();
          
          // 유효한 QR 유저 상태가 있으면 바로 contents로 리다이렉트
          if (qrData.isQRUser && qrData.timestamp && qrData.expiresIn) {
            const isValid = (now - qrData.timestamp) < qrData.expiresIn;
            if (isValid) {
              router.push('/contents');
              return true;
            } else {
              // 만료된 상태라면 제거
              localStorage.removeItem('qr_user_status');
            }
          }
        }
      } catch (error) {
        console.error('QR 상태 확인 중 오류:', error);
        localStorage.removeItem('qr_user_status');
      }
      return false;
    };

    // 기존 QR 상태가 유효하면 여기서 리다이렉트되고 return
    if (checkExistingQRStatus()) {
      return;
    }

    // URL 파라미터에서 QR 코드 여부 확인
    const { qr, code } = router.query;
    
    // QR 파라미터가 있는 경우에만 처리
    if (qr === 'true' || code) {
      // QR 유저임을 로컬스토리지에 저장 (1일간 유효)
      const qrUserData = {
        isQRUser: true,
        timestamp: Date.now(),
        expiresIn: 1 * 24 * 60 * 60 * 1000, // 1일
        source: code || 'qr-general'
      };
      
      localStorage.setItem('qr_user_status', JSON.stringify(qrUserData));
      // QR 유저 상태 저장 후 contents 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/contents');
      }, 300); // 0.3초 후 리다이렉트
      
    } else if (router.isReady) {
      // QR 파라미터가 없으면 바로 메인페이지로 리다이렉트
      router.push('/');
      return;
    }
    
  }, [router.query, router]);

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
};

export default QRLandingPage; 