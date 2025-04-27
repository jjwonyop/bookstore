import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/Layout";

export default function Books() {
  return (
    <Layout activeMenu="books">
      <div className="container mx-auto px-4 md:py-16 py-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-20 text-center">아이와 글 책장</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 max-w-5xl mx-auto">
          <div className="border border-gray-200 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[3/4] w-full mb-4 max-w-xs mx-auto">
              <Image
                src="/images/books/책이미지.png"
                alt="리오와 스피치 마법학교"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-lg font-bold text-center">리오와 스피치 마법학교</p>
            <Link href="/books/summer" className="text-center font-bold mt-auto py-2 border-t border-gray-200 mt-4 hover:text-gray-600">
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 