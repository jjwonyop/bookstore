/**
 * PDF 파일을 Base64로 변환하는 유틸리티
 */

/**
 * 파일을 Base64로 변환하는 함수
 * @param file File 객체
 * @returns Promise<string> Base64 인코딩된 문자열
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (reader.result) {
        // data:application/pdf;base64, 부분을 제거하고 순수한 base64만 반환
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('파일 읽기 실패'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('파일 읽기 중 오류 발생'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Base64 문자열을 downloadFiles.ts 형식으로 출력하는 함수
 * @param fileName 파일명
 * @param displayName 표시할 파일명
 * @param base64Data Base64 데이터
 * @param fileSize 파일 크기
 * @param description 설명
 * @param requiresQR QR 필요 여부
 */
export const generateDownloadFileCode = (
  fileName: string,
  displayName: string,
  base64Data: string,
  fileSize: string,
  description: string,
  requiresQR: boolean = false
) => {
  const id = fileName.replace('.pdf', '').toLowerCase().replace(/[^a-z0-9]/g, '_');
  
  return `{
  id: '${id}',
  fileName: '${fileName}',
  displayName: '${displayName}',
  mimeType: 'application/pdf',
  fileSize: '${fileSize}',
  description: '${description}',
  data: \`${base64Data}\`,
  requiresQR: ${requiresQR}
}`;
};

/**
 * 개발용: 파일 업로드 UI 컴포넌트를 위한 헬퍼 함수
 */
export const createFileUploadHandler = (
  onConvert: (fileData: {
    fileName: string;
    displayName: string;
    base64Data: string;
    fileSize: string;
  }) => void
) => {
  return async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      alert('PDF 파일만 업로드 가능합니다.');
      return;
    }
    
    try {
      const base64Data = await convertFileToBase64(file);
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + 'MB';
      
      onConvert({
        fileName: file.name,
        displayName: file.name,
        base64Data,
        fileSize
      });
      
    } catch (error) {
      console.error('파일 변환 중 오류:', error);
      alert('파일 변환 중 오류가 발생했습니다.');
    }
  };
}; 