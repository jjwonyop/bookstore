import Image from "next/image";
import Layout from "../../components/layout/Layout";

export default function BookSummer() {
  return (
    <Layout activeMenu="books" activeSubmenu="summer">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/3">
          <div className="relative aspect-[3/4] w-full shadow-md rounded-sm overflow-hidden">
            <Image
              src="/images/books/book1.jpg"
              alt="첫 여름, 완주"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">첫 여름, 완주</h1>
          <p className="text-gray-600 mb-6">저자: 홍길동</p>
          <p className="mb-8 text-gray-700 leading-relaxed">
            이 소설은 한 청년의 여름 방학 동안의 여정을 그린 이야기입니다. 완주에서 시작된 여행은 자신을 발견하고 성장하는 이야기로 이어집니다. 청춘의 아름다움과 고뇌, 그리고 성장의 순간들을 담아냈습니다.
          </p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <h2 className="font-bold mb-4">책 정보</h2>
            <ul className="space-y-2 text-gray-700">
              <li>출간일: 2023년 5월 15일</li>
              <li>페이지: 248쪽</li>
              <li>ISBN: 9788900000000</li>
              <li>가격: 15,000원</li>
            </ul>
          </div>
          
          <button className="bg-black text-white px-6 py-3 font-bold mb-4 w-full md:w-auto hover:bg-gray-800 transition-colors rounded-sm">
            구매하기
          </button>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">책 소개</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          &lsquo;첫 여름, 완주&rsquo;는 대학생 주인공이 여름 방학을 맞아 전라북도 완주에서 보내는
          시간을 그린 소설입니다. 도시의 바쁜 일상에서 벗어나 자연과 함께하며 자신을 돌아보는
          시간을 갖게 됩니다.
        </p>
        <p className="text-gray-700 leading-relaxed">
          어린 시절의 추억이 담긴 시골 마을에서 다양한 인물들과 교류하며, 잊고 있었던
          소중한 가치들을 다시 발견하게 됩니다. 첫사랑, 가족애, 그리고 자아 성찰에 관한
          아름다운 이야기입니다.
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">목차</h2>
        <ul className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>출발: 서울에서 완주로</li>
          <li>할머니의 집</li>
          <li>옛 친구들과의 재회</li>
          <li>시냇가의 추억</li>
          <li>여름 축제</li>
          <li>첫사랑의 흔적</li>
          <li>가족의 의미</li>
          <li>돌아가는 길</li>
        </ul>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">저자 소개</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          홍길동 작가는 2018년 등단하여 &lsquo;계절의 기억&rsquo;, &lsquo;그림자의 춤&rsquo; 등의 소설을 발표했습니다.
          섬세한 감성과 풍부한 상상력으로 독자들의 마음을 사로잡는 작가로 평가받고 있습니다.
        </p>
        <p className="text-gray-700 leading-relaxed">
          전북 완주 출신으로, 자신의 고향을 배경으로 한 이야기를 통해 지역의 아름다움과
          가치를 전달하고자 노력하고 있습니다.
        </p>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">추천사</h2>
        <div className="italic border-l-4 border-gray-300 pl-4 py-2 mb-4 text-gray-700">
          &ldquo;잔잔하면서도 깊은 여운을 남기는 이야기. 완주의 풍경과 인물들이 생생하게 그려집니다.&rdquo;
          <p className="mt-2 font-bold">- 김문학 (소설가)</p>
        </div>
        <div className="italic border-l-4 border-gray-300 pl-4 py-2 text-gray-700">
          &ldquo;청춘의 성장통과 자아 발견의 과정을 섬세하게 담아낸 아름다운 소설입니다.&rdquo;
          <p className="mt-2 font-bold">- 이평론 (문학평론가)</p>
        </div>
      </div>
    </Layout>
  );
} 