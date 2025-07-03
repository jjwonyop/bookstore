/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { useQRUser } from "../../utils/useQRUser";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import SecureDownloadButton from "../../components/SecureDownloadButton";
import { secureDownloadFiles } from "../../data/downloadFiles";
import { getImagePath } from "@/utils/path";

// 동영상 데이터 배열
const videos = [
  {
    id: 1,
    title: "제 1강 발성수업",
    description: "어린이를 위한 기본 스피치 기법과 자신감 향상 방법",
    url: "https://riospeechvideos.jjwonyop.workers.dev/speech1.mp4",
    poster: getImagePath("/images/video/thumbnail1.jpg"),
    icon: "🎥",
    duration: 227,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/6CMRgAAAABJRU5ErkJggg=="
  },
  {
    id: 2,
    title: "제 2강 발음수업",
    description: "리오 캐릭터와 함께 배우는 재미있는 스피치 학습",
    url: "https://riospeechvideos.jjwonyop.workers.dev/speech2.mp4",
    poster: getImagePath("/images/video/thumbnail2.jpg"),
    icon: "📚",
    duration: 124,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/6CMRgAAAABJRU5ErkJggg=="
  },
  {
    id: 3,
    title: "제 3강 속도수업",
    description: "정확한 발음과 또렷한 말하기 연습",
    url: "https://riospeechvideos.jjwonyop.workers.dev/speech3.mp4",
    poster: getImagePath("/images/video/thumbnail3.jpg"),
    icon: "🗣️",
    duration: 159,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/6CMRgAAAABJRU5ErkJggg=="
  },
  {
    id: 4,
    title: "제 4강 강조수업",
    description: "무대 공포증 극복과 자신감 있는 발표",
    url: "https://riospeechvideos.jjwonyop.workers.dev/speech4.mp4",
    poster: getImagePath("/images/video/thumbnail4.jpg"),
    icon: "💪",
    duration: 134,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/6CMRgAAAABJRU5ErkJggg=="
  },
  {
    id: 5,
    title: "제 5강 몸짓수업",
    description: "재미있는 이야기 구성과 전달 방법",
    url: "https://riospeechvideos.jjwonyop.workers.dev/speech5.mp4",
    poster: getImagePath("/images/video/thumbnail5.jpg"),
    icon: "📖",
    duration: 131,
    placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wAA/wAB/6CMRgAAAABJRU5ErkJggg=="
  }
];

export default function Contents() {
  const { isQRUser, loading, qrSource } = useQRUser();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<null | typeof videos[0]>(null);

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
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
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
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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
                  {videos.map((video) => (
                    <div key={video.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                      <div style={{ width: '100%', height: '200px', backgroundColor: 'lightgray', marginBottom: '12px', position: 'relative' }} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                        <img 
                          src={`/images/video/thumbnail${video.id}.jpg`}
                          alt={`${video.title} 썸네일`}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            display: 'block'
                          }}
                          className="transition-transform group-hover:scale-105"
                          onLoad={() => {
                            console.log(`✅ 썸네일 로드 성공: ${video.title}`);
                          }}
                          onError={() => {
                            console.error(`❌ 썸네일 로드 실패: ${video.title}`);
                          }}
                        />
                        
                        {/* 재생 버튼 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 group-hover:w-16 group-hover:h-16 bg-white bg-opacity-80 group-hover:bg-opacity-95 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                            <svg className="w-4 h-4 group-hover:w-6 group-hover:h-6 ml-0.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* 재생 시간 표시 */}
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={() => setSelectedVideo(video)}>
                        시청하기
                      </button>
                    </div>
                  ))}
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

      {/* 동영상 모달 */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video w-full">
                <SmartVideo video={selectedVideo} />
              </div>
              <div className="mt-4">
                <p className="text-gray-600">{selectedVideo.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  재생 시간: {Math.floor(selectedVideo.duration / 60)}분 {selectedVideo.duration % 60}초
                  {selectedVideo.duration > 150 && (
                    <span className="ml-2 text-blue-600">• 스마트 로딩 적용</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// 스마트 비디오 컴포넌트
function SmartVideo({ video }: { video: typeof videos[0] }) {
  const [isLongVideo] = useState(video.duration > 150); // 2분 30초 기준으로 변경
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isLongVideo) return;

    const handleLoadStart = () => {
      console.log(`[${video.title}] 스마트 로딩 시작 - 점진적 로딩 모드`);
    };

    videoElement.addEventListener('loadstart', handleLoadStart);

    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
    };
  }, [video.title, isLongVideo]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full h-full rounded-lg"
      poster={video.poster}
      preload={isLongVideo ? "metadata" : "auto"} // 긴 영상은 metadata만, 짧은 영상은 전체 로딩
      playsInline
      crossOrigin="anonymous"
    >
      <source src={video.url} type="video/mp4" />
      브라우저가 비디오 태그를 지원하지 않습니다.
    </video>
  );
} 
