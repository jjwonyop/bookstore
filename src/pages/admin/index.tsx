import AdminGuard from '../../components/AdminGuard';
import Layout from '../../components/layout/Layout';
import Head from 'next/head';
import Link from 'next/link';
import { useAdminAuth } from '../../utils/useAdminAuth';

export default function AdminDashboard() {
  const { logout, extendSession } = useAdminAuth();

  return (
    <AdminGuard title="관리자 대시보드">
      <Layout fullWidth={true}>
        <Head>
          <title>관리자 대시보드 | 아이와글</title>
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
                🛠️ 관리자 대시보드
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

            {/* 관리 도구들 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PDF 변환기 */}
              <Link href="/admin/pdf-converter" className="block">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📄</div>
                    <h3 className="text-xl font-semibold mb-2">PDF 변환기</h3>
                    <p className="text-gray-600">
                      PDF 파일을 Base64로 변환하여 보안 다운로드 시스템에 추가
                    </p>
                  </div>
                </div>
              </Link>

              {/* 사용자 관리 (예시) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50">
                <div className="text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold mb-2">사용자 관리</h3>
                  <p className="text-gray-600">
                    QR 사용자 및 다운로드 통계 관리 (준비 중)
                  </p>
                </div>
              </div>

              {/* 시스템 설정 (예시) */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-50">
                <div className="text-center">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="text-xl font-semibold mb-2">시스템 설정</h3>
                  <p className="text-gray-600">
                    보안 설정 및 시스템 구성 관리 (준비 중)
                  </p>
                </div>
              </div>
            </div>

            {/* 보안 정보 */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">🔒 보안 정보</h2>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                <div>
                  <h3 className="font-medium mb-2">접근 방법:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• URL에 ?admin=true 파라미터 추가</li>
                    <li>• 세션은 1시간 동안 유지됩니다</li>
                    <li>• 세션 연장 버튼으로 시간 연장 가능</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">보안 조치:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 검색엔진 크롤링 완전 차단</li>
                    <li>• robots.txt에서 관리자 경로 차단</li>
                    <li>• 모든 메타 태그에 noindex 설정</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AdminGuard>
  );
} 