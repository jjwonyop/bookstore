import { ReactNode } from 'react';
import { useAdminAuth } from '../utils/useAdminAuth';
import Layout from './layout/Layout';
import Head from 'next/head';

interface AdminGuardProps {
  children: ReactNode;
  title?: string;
}

/**
 * 관리자 페이지를 보호하는 가드 컴포넌트
 */
export default function AdminGuard({ children, title = "관리자" }: AdminGuardProps) {
  const { isAdmin, loading, error } = useAdminAuth();

  // 로딩 중
  if (loading) {
    return (
      <Layout fullWidth={true}>
        <Head>
          <title>접근 확인 중... | {title}</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
          <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta property="og:robots" content="noindex, nofollow" />
          <meta name="referrer" content="no-referrer" />
          <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
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

  // 권한 없음
  if (!isAdmin) {
    return (
      <Layout fullWidth={true}>
        <Head>
          <title>접근 거부 | {title}</title>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
          <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta property="og:robots" content="noindex, nofollow" />
          <meta name="referrer" content="no-referrer" />
          <meta httpEquiv="X-Robots-Tag" content="noindex, nofollow, noarchive, nosnippet" />
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
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = '/'}
                className="block w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                메인 페이지로 이동
              </button>
              <p className="text-sm text-gray-500">
                관리자 권한이 필요한 경우 URL에 ?admin=true 파라미터를 추가하세요
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 권한 있음 - 자식 컴포넌트 렌더링
  return <>{children}</>;
} 