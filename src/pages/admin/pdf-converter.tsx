import { useState } from 'react';
import { convertFileToBase64, generateDownloadFileCode } from '../../utils/pdfConverter';
import Layout from '../../components/layout/Layout';
import Head from 'next/head';
import { useAdminAuth } from '../../utils/useAdminAuth';

interface ConvertedFile {
  fileName: string;
  displayName: string;
  base64Data: string;
  fileSize: string;
  description: string;
  requiresQR: boolean;
}

export default function PDFConverter() {
  const { isAdmin, loading, error, logout, extendSession } = useAdminAuth();
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  // 권한 없음 또는 로딩 중일 때 처리
  if (loading) {
    return (
      <Layout fullWidth={true}>
        <Head>
          <title>접근 확인 중... | 관리자</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">권한을 확인하고 있습니다...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout fullWidth={true}>
        <Head>
          <title>접근 거부 | 관리자</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-6">🚫</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              접근 권한이 없습니다
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {error || '관리자 권한이 필요한 페이지입니다.'}
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              메인 페이지로 이동
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsConverting(true);

    for (const file of Array.from(files)) {
      if (file.type !== 'application/pdf') {
        alert(`${file.name}은(는) PDF 파일이 아닙니다.`);
        continue;
      }

      try {
        const base64Data = await convertFileToBase64(file);
        const fileSize = (file.size / (1024 * 1024)).toFixed(1) + 'MB';
        
        const newFile: ConvertedFile = {
          fileName: file.name,
          displayName: file.name,
          base64Data,
          fileSize,
          description: '설명을 입력하세요',
          requiresQR: false
        };

        setConvertedFiles(prev => [...prev, newFile]);
      } catch (error) {
        console.error(`${file.name} 변환 실패:`, error);
        alert(`${file.name} 변환 중 오류가 발생했습니다.`);
      }
    }

    setIsConverting(false);
  };

  const updateFile = (index: number, updates: Partial<ConvertedFile>) => {
    setConvertedFiles(prev => 
      prev.map((file, i) => i === index ? { ...file, ...updates } : file)
    );
  };

  const removeFile = (index: number) => {
    setConvertedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateCode = () => {
    const codes = convertedFiles.map(file => 
      generateDownloadFileCode(
        file.fileName,
        file.displayName,
        file.base64Data,
        file.fileSize,
        file.description,
        file.requiresQR
      )
    );

    const fullCode = `export const secureDownloadFiles: SecureDownloadFile[] = [
${codes.join(',\n')}
];`;

    return fullCode;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCode());
      alert('코드가 클립보드에 복사되었습니다!');
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
      alert('클립보드 복사에 실패했습니다.');
    }
  };

  return (
    <Layout fullWidth={true}>
      <Head>
        <title>PDF to Base64 변환기 | 관리자</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta property="og:robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
        <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* 관리자 헤더 */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              📄 PDF → Base64 변환기
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">관리자 모드</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                🚪 로그아웃
              </button>
              <button
                onClick={extendSession}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                ⏰ 세션 연장
              </button>
            </div>
          </div>

          {/* 파일 업로드 영역 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">1. PDF 파일 업로드</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileUpload}
                disabled={isConverting}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isConverting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isConverting ? '변환 중...' : '📁 PDF 파일 선택'}
              </label>
              <p className="mt-2 text-gray-500">
                여러 개의 PDF 파일을 한 번에 업로드할 수 있습니다
              </p>
            </div>
          </div>

          {/* 변환된 파일 목록 */}
          {convertedFiles.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">2. 파일 정보 수정</h2>
              <div className="space-y-4">
                {convertedFiles.map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          표시할 파일명
                        </label>
                        <input
                          type="text"
                          value={file.displayName}
                          onChange={(e) => updateFile(index, { displayName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          파일 크기
                        </label>
                        <input
                          type="text"
                          value={file.fileSize}
                          onChange={(e) => updateFile(index, { fileSize: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          설명
                        </label>
                        <input
                          type="text"
                          value={file.description}
                          onChange={(e) => updateFile(index, { description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={file.requiresQR}
                            onChange={(e) => updateFile(index, { requiresQR: e.target.checked })}
                            className="mr-2"
                          />
                          QR 유저 전용
                        </label>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          🗑️ 삭제
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      원본: {file.fileName} | Base64 길이: {file.base64Data.length.toLocaleString()} 문자
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 코드 생성 영역 */}
          {convertedFiles.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">3. 생성된 코드</h2>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  📋 클립보드에 복사
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-800">
                  <code>{generateCode()}</code>
                </pre>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">사용 방법:</h3>
                <ol className="list-decimal list-inside text-blue-700 space-y-1">
                  <li>위의 코드를 복사합니다</li>
                  <li><code>src/data/downloadFiles.ts</code> 파일을 엽니다</li>
                  <li><code>secureDownloadFiles</code> 배열을 위의 코드로 교체합니다</li>
                  <li>페이지를 새로고침하여 적용된 것을 확인합니다</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 