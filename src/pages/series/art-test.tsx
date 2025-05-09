import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import SchemaOrg from '../../components/SchemaOrg';
import { useImagePath } from '../../utils/path';

// 미술 작품 데이터 인터페이스
interface ArtworkData {
  slug: string;
  title: string;
  description: string;
  image: string;
  artist: string;
  medium: string;
  surface: string;
  created: string;
  dimensions: string;
  edition?: string;
  genre: string;
  keywords: string[];
  price?: number;
}

// 예시 미술 작품 데이터 (실제로는 API나 CMS에서 가져올 수 있음)
const artworksData: { [key: string]: ArtworkData } = {
  'rio': {
    slug: 'rio',
    title: '리오',
    description: '리오, 작은 기적을 축하하는 순간의 기록. 따뜻한 시선과 부드러운 터치로 표현된 리오는 아이들의 매일을 축하하고 응원합니다.',
    image: '/images/series/갤러리1.webp',
    artist: '김화가',
    medium: '디지털 일러스트레이션',
    surface: '디지털 캔버스',
    created: '2023-07-15',
    dimensions: '30cm x 40cm',
    edition: '제한판 50/100',
    genre: '어린이 일러스트레이션',
    keywords: ['리오', '일러스트', '어린이', '캐릭터', '디지털 아트'],
    price: 280000
  },
  // 다른 작품들도 추가 가능
};

export default function ArtworkDetail({ artwork }: { artwork: ArtworkData }) {
  const router = useRouter();
  const getImagePath = useImagePath();

  // 페이지가 아직 생성 중이라면 로딩 상태 표시
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullImageUrl = `https://iwagle.com${getImagePath(artwork.image)}`;
  const canonicalUrl = `https://iwagle.com/series/${artwork.slug}`;

  return (
    <Layout activeMenu="series">
      <Head>
        <title>{artwork.title} | 아이와글 아트 갤러리</title>
        <meta name="description" content={artwork.description} />
        <meta name="keywords" content={artwork.keywords.join(', ')} />
        <meta property="og:title" content={`${artwork.title} | 아이와글 아트 갤러리`} />
        <meta property="og:description" content={artwork.description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Schema.org 구조화 데이터 */}
        <SchemaOrg 
          type="artwork" 
          data={{
            url: canonicalUrl,
            name: artwork.title,
            image: fullImageUrl,
            description: artwork.description,
            artist: artwork.artist,
            artworkMedium: artwork.medium,
            artworkSurface: artwork.surface,
            dateCreated: artwork.created,
            width: artwork.dimensions.split('x')[0].trim(),
            height: artwork.dimensions.split('x')[1].trim(),
            artEdition: artwork.edition,
            genre: artwork.genre,
            keywords: artwork.keywords
          }}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 작품 이미지 */}
          <div className="md:w-2/3">
            <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ height: '500px' }}>
              <Image
                src={getImagePath(artwork.image)}
                alt={artwork.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
          </div>

          {/* 작품 정보 */}
          <div className="md:w-1/3">
            <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
            <div className="text-gray-600 mb-6">by {artwork.artist}</div>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">아트 기법</div>
                <div className="col-span-2">{artwork.medium}</div>
                
                <div className="font-medium">바탕재</div>
                <div className="col-span-2">{artwork.surface}</div>
                
                <div className="font-medium">크기</div>
                <div className="col-span-2">{artwork.dimensions}</div>
                
                <div className="font-medium">제작일</div>
                <div className="col-span-2">{new Date(artwork.created).toLocaleDateString('ko-KR')}</div>
                
                {artwork.edition && (
                  <>
                    <div className="font-medium">에디션</div>
                    <div className="col-span-2">{artwork.edition}</div>
                  </>
                )}
                
                {artwork.price && (
                  <>
                    <div className="font-medium">가격</div>
                    <div className="col-span-2">{artwork.price.toLocaleString()}원</div>
                  </>
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2">작품 소개</h2>
            <p className="text-gray-700 whitespace-pre-line mb-8">{artwork.description}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">키워드</h2>
              <div className="flex flex-wrap gap-2">
                {artwork.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                구매 문의
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                관련 작품 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 모든 작품의 slug를 경로로 생성
  const paths = Object.keys(artworksData).map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false // 404 에러 발생 (없는 페이지)
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params의 slug로 해당 작품 데이터 찾기
  const slug = params?.slug as string;
  const artwork = artworksData[slug];

  // 작품이 없으면 404 페이지 표시
  if (!artwork) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      artwork
    },
    revalidate: 86400 // 24시간마다 재생성 (선택 사항)
  };
}; 