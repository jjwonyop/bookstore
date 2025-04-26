import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/Layout";

export default function Books() {
  return (
    <Layout activeMenu="books">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">책 소개</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        <div className="border border-gray-200 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[3/4] w-full mb-4">
            <Image
              src="/images/books/book1.jpg"
              alt="첫 여름, 완주"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="text-lg font-bold text-center">첫 여름, 완주</p>
          <Link href="/books/summer" className="text-center font-bold mt-auto py-2 border-t border-gray-200 mt-4 hover:text-gray-600">
            자세히 보기
          </Link>
        </div>
        
        <div className="border border-gray-200 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[3/4] w-full mb-4">
            <Image
              src="/images/books/book2.jpg"
              alt="자매일기"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="text-lg font-bold text-center">자매일기</p>
          <Link href="/books/diary" className="text-center font-bold mt-auto py-2 border-t border-gray-200 mt-4 hover:text-gray-600">
            자세히 보기
          </Link>
        </div>
        
        <div className="border border-gray-200 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[3/4] w-full mb-4">
            <Image
              src="/images/books/book3.jpg"
              alt="살리는 일"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="text-lg font-bold text-center">살리는 일</p>
          <Link href="/books/save" className="text-center font-bold mt-auto py-2 border-t border-gray-200 mt-4 hover:text-gray-600">
            자세히 보기
          </Link>
        </div>
        
        <div className="border border-gray-200 p-4 flex flex-col rounded-sm shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-[3/4] w-full mb-4">
            <Image
              src="/images/books/book4.jpg"
              alt="Coming Soon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="text-lg font-bold text-center">coming soon</p>
          <Link href="/books/upcoming" className="text-center font-bold mt-auto py-2 border-t border-gray-200 mt-4 hover:text-gray-600">
            자세히 보기
          </Link>
        </div>
      </div>
    </Layout>
  );
} 