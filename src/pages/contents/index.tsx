import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { useQRUser } from "../../utils/useQRUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SecureDownloadButton from "../../components/SecureDownloadButton";
import { secureDownloadFiles } from "../../data/downloadFiles";

export default function Contents() {
  const { isQRUser, loading, qrSource } = useQRUser();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  // QR 유저 상태를 localStorage에 저장 (보안 검증용)
  useEffect(() => {
    if (!loading && isQRUser) {
      localStorage.setItem('qr_user_verified', 'true');
    } else if (!loading && !isQRUser) {
      localStorage.removeItem('qr_user_verified');
    }
  }, [isQRUser, loading]);

  // QR 유저가 아니면 안내 메시지 보여주고 메인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && !isQRUser) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000); // 3초 후 리다이렉트

      return () => clearTimeout(timer);
    }
  }, [loading, isQRUser, router]);

  // QR 유저가 아닌 경우 안내 메시지 표시
  if (!loading && !isQRUser && showMessage) {
    return (
      <Layout fullWidth={true}>
        <Head>
          <title>접근 제한 | 아이와글</title>
          <meta name="description" content="QR 코드를 통해 접근해주세요." />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              교육 컨텐츠는 QR 코드로만 접근 가능합니다
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              특별한 교육 컨텐츠는 QR 코드를 통해 방문하신 고객님만 이용하실 수 있습니다.<br/>
              메인 페이지로 이동합니다...
            </p>
            <div className="space-y-3">
              <div className="animate-pulse">
                <div className="bg-gray-500 text-white px-6 py-3 rounded-lg">
                  메인 페이지로 이동 중... (3초)
                </div>
              </div>
              <Link href="/" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                지금 이동하기
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullWidth={true}>
      <Head>
        <title>컨텐츠 | 아이와글</title>
        <meta name="description" content="아이와글의 다양한 컨텐츠를 만나보세요." />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta property="og:robots" content="noindex, nofollow" />
      </Head>

      <div className="w-full" style={{ color: 'black' }}>
        <div className="w-full max-w-full mx-auto">
          <div className="w-full px-0 py-0 overflow-hidden">
            {isQRUser && !loading && (
              <section className="w-full mb-8 p-0 overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
                <div className="container mx-auto px-4 py-8 text-center text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    특별한 교육을 준비했습니다!
                  </h2>
                  <p className="text-purple-100">
                    QR 코드로 방문해주신 고객님만을 위한 특별 혜택
                  </p>
                </div>
              </section>
            )}

            {/* 메인 컨텐츠 헤더 */}
            <section className="mb-8 container mx-auto px-4 py-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">📚 아이와글 교육</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                어린이 스피치와 관련된 다양한 교육 자료를 만나보세요
              </p>
            </section>

            {/* 영상 컨텐츠 */}
            <section className="mb-6 container mx-auto px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl md:text-2xl font-bold">🎬 영상 교육</h2>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">🎥</span>
                    </div>
                    <h3 className="font-medium mb-2">스피치 기초 강의</h3>
                    <p className="text-gray-600 text-sm mb-3">어린이를 위한 기본 스피치 기법과 자신감 향상 방법</p>
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      시청하기
                    </button>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                    <h3 className="font-medium mb-2">리오와 함께하는 스피치</h3>
                    <p className="text-gray-600 text-sm mb-3">리오 캐릭터와 함께 배우는 재미있는 스피치 학습</p>
                    <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
                      시청하기
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 활동지 & 워크북 */}
            <section className="mb-6 container mx-auto px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl md:text-2xl font-bold">📝 활동지 & 워크북</h2>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-center mb-3">
                      <span className="text-3xl">📄</span>
                    </div>
                    <h3 className="font-medium mb-2 text-center">기초 활동지</h3>
                    <p className="text-gray-600 text-sm text-center mb-3">스피치 기초 연습을 위한 활동지</p>
                    <SecureDownloadButton 
                      file={secureDownloadFiles[0]} 
                      variant="warning"
                      isQRUser={isQRUser}
                    />
                  </div>
                  
                  {/* {isQRUser && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="text-center mb-3">
                        <span className="text-3xl">⭐</span>
                      </div>
                      <h3 className="font-medium mb-2 text-center">VIP 전용 자료</h3>
                      <p className="text-gray-600 text-sm text-center mb-3">QR 고객 전용 특별 학습자료</p>
                      <SecureDownloadButton 
                        file={secureDownloadFiles[2]} 
                        variant="primary"
                        isQRUser={isQRUser}
                      />
                    </div>
                  )} */}
                </div>
              </div>
            </section>

            {/* QR 유저 상태 표시 (개발 시에만) */}
            {process.env.NODE_ENV === 'development' && (
              <section className="mb-6 container mx-auto px-4 py-3">
                <div className="text-center">
                  <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg">
                    <p className="text-sm">
                      개발 모드: QR 유저 상태 = {isQRUser ? '✅ QR 유저' : '❌ 일반 유저'}
                      {qrSource && ` | 출처: ${qrSource}`}
                    </p>
                  </div>
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
} 
