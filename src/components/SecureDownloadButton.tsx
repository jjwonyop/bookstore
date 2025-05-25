import { useState } from 'react';
import { downloadSecureFile } from '../utils/downloadUtils';
import { SecureDownloadFile } from '../data/downloadFiles';

interface SecureDownloadButtonProps {
  file: SecureDownloadFile;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  isQRUser?: boolean;
}

export default function SecureDownloadButton({ 
  file, 
  className = '',
  variant = 'primary',
  isQRUser = false
}: SecureDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    // VIP 파일인데 QR 유저가 아닌 경우 차단
    if (file.requiresQR && !isQRUser) {
      alert('이 파일은 QR 코드로 방문한 사용자만 다운로드할 수 있습니다.');
      return;
    }

    setIsDownloading(true);
    
    try {
      // 보안 강화된 다운로드 실행
      await downloadSecureFile(file.id);
      
      // 다운로드 완료 표시
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
      
    } catch (error) {
      console.error('다운로드 중 오류가 발생했습니다:', error);
      setIsDownloading(false);
      
      // 사용자 친화적인 에러 메시지 표시
      const errorMessage = error instanceof Error ? error.message : '다운로드 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'secondary':
        return 'bg-gray-500 hover:bg-gray-600 text-white';
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  // VIP 파일인데 QR 유저가 아닌 경우 비활성화
  const isDisabled = isDownloading || (file.requiresQR && !isQRUser);

  return (
    <button
      onClick={handleDownload}
      disabled={isDisabled}
      className={`
        w-full py-2 rounded transition-colors font-medium
        ${getVariantClasses()}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isDownloading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          다운로드 중...
        </span>
      ) : file.requiresQR && !isQRUser ? (
        <>
          🔒 QR 유저 전용
        </>
      ) : (
        <>
          📥 다운로드
          {file.fileSize && (
            <span className="ml-1 text-xs opacity-75">({file.fileSize})</span>
          )}
        </>
      )}
    </button>
  );
} 