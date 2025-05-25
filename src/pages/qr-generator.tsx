/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AdminGuard from '../components/AdminGuard';
import Layout from '../components/layout/Layout';
import { useAdminAuth } from '../utils/useAdminAuth';

const QRGeneratorPage = () => {
  const [baseUrl, setBaseUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [customCode, setCustomCode] = useState('');
  const { logout, extendSession } = useAdminAuth();

  // 현재 URL 기준으로 기본값 설정
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const generateQRUrl = () => {
    let url = `${baseUrl}/qr-landing?qr=true`;
    
    if (customCode.trim()) {
      url += `&code=${encodeURIComponent(customCode.trim())}`;
    }
    
    return url;
  };

  const generateQRCode = () => {
    const url = generateQRUrl();
    // QR 코드 생성 서비스 사용 (Google Charts API)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
    setQrCode(qrCodeUrl);
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `qr-code-${customCode || 'general'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('클립보드에 복사되었습니다!');
  };

  const presetCodes = [
    { name: '이벤트-A', code: 'event-a' },
    { name: '매장방문', code: 'store-visit' },
    { name: '신규고객', code: 'new-customer' },
    { name: '기존고객', code: 'existing-customer' },
    { name: '프로모션', code: 'promotion' }
  ];

  return (
    <AdminGuard title="QR 코드 생성기">
      <Layout fullWidth={true}>
        <Head>
          <title>QR 코드 생성기 (관리자 전용) | 아이와글</title>
          <meta name="description" content="관리자 전용 QR 코드 생성 도구입니다." />
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
          <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="naverbot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="daumbot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta property="og:robots" content="noindex, nofollow" />
          <meta name="referrer" content="no-referrer" />
          <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
          <div className="container mx-auto px-4 py-8">
            {/* 관리자 헤더 */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                🎯 QR 코드 생성기
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

            {/* 헤더 */}
            <header className="text-center mb-12">
              <div className="mb-4">
                <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  🔒 관리자 전용 페이지
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                QR 코드 생성 도구
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                마케팅 캠페인과 이벤트를 위한 QR 코드를 생성하세요. 
                각각의 QR 코드는 고유한 식별자를 가지며, 방문자 추적이 가능합니다.
              </p>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-xl mx-auto">
                <p className="text-yellow-800 text-sm">
                  ⚠️ 이 페이지는 관리자 전용입니다. URL을 외부에 공유하지 마세요.
                </p>
              </div>
            </header>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* QR 코드 설정 패널 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ QR 코드 설정</h2>
              
              {/* 기본 URL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  기본 URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://your-domain.com"
                />
              </div>

              {/* 커스텀 코드 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  캠페인 코드 (선택사항)
                </label>
                <input
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: summer-event-2024"
                />
                <p className="text-sm text-gray-500 mt-1">
                  캠페인을 구분하기 위한 고유 코드를 입력하세요
                </p>
              </div>

              {/* 프리셋 코드 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  빠른 선택
                </label>
                <div className="flex flex-wrap gap-2">
                  {presetCodes.map((preset) => (
                    <button
                      key={preset.code}
                      onClick={() => setCustomCode(preset.code)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 생성될 URL 미리보기 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  생성될 URL
                </label>
                <div className="bg-gray-100 p-3 rounded-lg border">
                  <code className="text-sm text-gray-800 break-all">
                    {generateQRUrl()}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(generateQRUrl())}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  📋 URL 복사
                </button>
              </div>

              {/* 생성 버튼 */}
              <button
                onClick={generateQRCode}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                🎯 QR 코드 생성
              </button>
            </div>

            {/* QR 코드 결과 패널 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📱 생성된 QR 코드</h2>
              
              {qrCode ? (
                <div className="text-center">
                  {/* // eslint-disable-next-line react/jsx-no-comment-textnodes */}
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-6">
                    {/* // eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={downloadQRCode}
                      className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      💾 QR 코드 다운로드
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(qrCode)}
                      className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      📋 이미지 URL 복사
                    </button>

                    <Link
                      href={generateQRUrl()}
                      target="_blank"
                      className="block w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium text-center"
                    >
                      🔗 QR 페이지 미리보기
                    </Link>
                  </div>

                  {/* QR 정보 */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">📊 QR 코드 정보</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>캠페인 코드:</strong> {customCode || '일반'}</p>
                      <p><strong>생성 시간:</strong> {new Date().toLocaleString('ko-KR')}</p>
                      <p><strong>유효 기간:</strong> 1일 (방문자 기준)</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-gray-500">
                    좌측에서 설정을 완료하고 <br />
                    &quot;QR 코드 생성&quot; 버튼을 클릭하세요
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 사용 가이드 */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">사용 가이드</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 QR 코드 작동 방식</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• QR 코드 스캔 시 특별 파라미터가 포함된 URL로 이동</li>
                  <li>• 방문자의 브라우저에 1일간 QR 유저 상태 저장</li>
                  <li>• QR 유저에게만 특별 메뉴와 혜택 제공</li>
                  <li>• 캠페인별 고유 코드로 방문자 출처 추적 가능</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">활용 팁</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 오프라인 매장, 전단지, 명함에 QR 코드 인쇄</li>
                  <li>• 각 캠페인별로 다른 코드 사용하여 효과 측정</li>
                  <li>• SNS 게시물이나 이메일에도 QR 코드 활용</li>
                  <li>• 정기적으로 QR 코드 스캔 통계 확인</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="text-center mt-8">
            <div className="space-x-4">
              <Link href="/qr-landing" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                QR 랜딩페이지 보기
              </Link>
              <Link href="/admin" className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                관리자 대시보드
              </Link>
              <Link href="/" className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                메인 페이지로
              </Link>
            </div>
          </div>
        </div>
          </div>
        </div>
      </Layout>
    </AdminGuard>
  );
};

export default QRGeneratorPage; 

// Updated: QR status check enhancement 