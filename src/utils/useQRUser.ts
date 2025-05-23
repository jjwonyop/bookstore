import { useState, useEffect } from 'react';

interface QRUserData {
  isQRUser: boolean;
  timestamp: number;
  expiresIn: number;
  source: string;
}

export const useQRUser = () => {
  const [isQRUser, setIsQRUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qrSource, setQrSource] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const qrUserData = localStorage.getItem('qr_user_status');
      
      if (qrUserData) {
        try {
          const parsed: QRUserData = JSON.parse(qrUserData);
          const isExpired = Date.now() - parsed.timestamp > parsed.expiresIn;
          
          if (!isExpired) {
            setIsQRUser(true);
            setQrSource(parsed.source);
          } else {
            // 만료된 경우 삭제
            localStorage.removeItem('qr_user_status');
            setIsQRUser(false);
            setQrSource(null);
          }
        } catch (error) {
          console.error('QR user data parsing error:', error);
          localStorage.removeItem('qr_user_status');
          setIsQRUser(false);
          setQrSource(null);
        }
      }
    }
    
    setLoading(false);
  }, []);

  // QR 유저 상태를 수동으로 설정하는 함수
  const setQRUserStatus = (status: boolean, source = 'manual') => {
    if (status) {
      const qrUserData: QRUserData = {
        isQRUser: true,
        timestamp: Date.now(),
        expiresIn: 1 * 24 * 60 * 60 * 1000, // 1일
        source
      };
      localStorage.setItem('qr_user_status', JSON.stringify(qrUserData));
      setIsQRUser(true);
      setQrSource(source);
    } else {
      localStorage.removeItem('qr_user_status');
      setIsQRUser(false);
      setQrSource(null);
    }
  };

  // QR 유저 상태 초기화
  const clearQRUserStatus = () => {
    localStorage.removeItem('qr_user_status');
    setIsQRUser(false);
    setQrSource(null);
  };

  return {
    isQRUser,
    loading,
    qrSource,
    setQRUserStatus,
    clearQRUserStatus
  };
}; 