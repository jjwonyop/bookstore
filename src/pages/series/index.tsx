import Link from "next/link";
import { useImagePath } from "../../../../utils/path";
import Image from "next/image";
import Layout from "../../components/layout/Layout";
import Head from "next/head";

export default function Series() {
  const getImagePath = useImagePath();
  return (
    
    <Layout activeMenu="series">
      <Head>
        <title>출판사 아이와글</title>
        <meta name="description" content="출판사 아이와글 공식 웹사이트입니다." />
      </Head>
      <div className="container mx-auto px-4 md:py-16 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-20 text-center">아이와 글 아트</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 max-w-5xl mx-auto">
          <div className="border border-gray-300 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[3/4] w-full mb-4 max-w-xs mx-auto">
              <Image
                src={getImagePath("/images/series/갤러리1.jpeg")}$1
                alt="리오"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-lg font-bold text-center">리오</p>
            <Link href="/series/rio" className="text-center font-bold mt-auto py-2 border-t border-gray-300 mt-4 hover:text-gray-600">
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
