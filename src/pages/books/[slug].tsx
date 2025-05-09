import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';
import SchemaOrg from '../../components/SchemaOrg';
import { useImagePath } from '../../utils/path';

// 책 데이터 인터페이스
interface BookData {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  isbn: string;
  published: string;
  pages: number;
  price: number;
}

// 예시 책 데이터 (실제로는 API나 CMS에서 가져올 수 있음)
const booksData: { [key: string]: BookData } = {
  'summer': {
    slug: 'summer',
    title: '리오와 스피치 마법학교',
    description: '자신감과 웃음이 가득한 스피치 모험! 리오와 함께 떠나는 스피치 마법 여행으로 자신 있게 말하는 힘을 길러보세요.',
    coverImage: '/images/books/책이미지.webp',
    author: '김작가',
    isbn: '978-89-12345-67-8',
    published: '2023-09-15',
    pages: 120,
    price: 15000
  },
  // 다른 책들도 추가 가능
};

export default function BookDetail({ book }: { book: BookData }) {
  const router = useRouter();
  const getImagePath = useImagePath();

  // 페이지가 아직 생성 중이라면 로딩 상태 표시
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullImageUrl = `https://iwagle.com${getImagePath(book.coverImage)}`;
  const canonicalUrl = `https://iwagle.com/books/${book.slug}`;

  return (
    <Layout activeMenu="books">
      <Head>
        <title>{book.title} | 아이와글 출판사</title>
        <meta name="description" content={book.description} />
        <meta name="keywords" content={`${book.title}, 아이와글, 출판사, 어린이 스피치 교육, 리오, 스피치 교육, 스피치 책, ${book.author}`} />
        <meta property="og:title" content={`${book.title} | 아이와글 출판사`} />
        <meta property="og:description" content={book.description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="book" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Schema.org 구조화 데이터 */}
        <SchemaOrg 
          type="book" 
          data={{
            url: canonicalUrl,
            name: book.title,
            image: fullImageUrl,
            description: book.description,
            isbn: book.isbn,
            author: book.author,
            datePublished: book.published
          }}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 책 커버 이미지 */}
          <div className="md:w-1/3">
            <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '3/4' }}>
              <Image
                src={getImagePath(book.coverImage)}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* 책 정보 */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="text-gray-600 mb-6">{book.author} 저</div>
            
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="font-medium">출판일</div>
                <div className="col-span-2">{new Date(book.published).toLocaleDateString('ko-KR')}</div>
                
                <div className="font-medium">ISBN</div>
                <div className="col-span-2">{book.isbn}</div>
                
                <div className="font-medium">페이지</div>
                <div className="col-span-2">{book.pages}페이지</div>
                
                <div className="font-medium">가격</div>
                <div className="col-span-2">{book.price.toLocaleString()}원</div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2">책 소개</h2>
            <p className="text-gray-700 whitespace-pre-line mb-8">{book.description}</p>
            
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                구매하기
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                미리보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 모든 책의 slug를 경로로 생성
  const paths = Object.keys(booksData).map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: false // 404 에러 발생 (없는 페이지)
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params의 slug로 해당 책 데이터 찾기
  const slug = params?.slug as string;
  const book = booksData[slug];

  // 책이 없으면 404 페이지 표시
  if (!book) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      book
    },
    revalidate: 86400 // 24시간마다 재생성 (선택 사항)
  };
}; 