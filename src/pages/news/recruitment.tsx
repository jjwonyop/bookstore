import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Head from "next/head";

export default function Recruitment() {
  return (
    <Layout activeMenu="news">
      <Head>
        <title>채용공고 | 출판사 아이와글</title>
        <meta name="description" content="출판사 아이와글 채용공고입니다." />
      </Head>
      <div className="container mx-auto px-4 md:py-16 py-8 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">채용공고</h2>

        <div className="border border-gray-200 rounded-sm shadow-sm p-8 md:p-12">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-10 pb-6 border-b border-gray-200">
            초등 논술 교재 기획 및 편집자 채용
          </h3>

          <section className="mb-10">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-5 bg-gray-800 rounded-sm" />
              1. 담당 업무
            </h4>
            <ul className="space-y-4 pl-4">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800">초등 논술 교재 편집 및 기획</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  아이들의 눈높이에 맞는 재미있고 유익한 논술 콘텐츠 개발 참여
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800">원고 교정·교열 및 검토</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  필진의 원고를 다듬어 가독성을 높이고, 학습 목표에 맞는 피드백 제공
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800">커리큘럼 운영 지원</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  학습 흐름에 맞는 세부 활동지 및 부교재 기획
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-5 bg-gray-800 rounded-sm" />
              2. 지원 자격
            </h4>
            <ul className="space-y-3 pl-4">
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">경력</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  단행본, 학습지, 논술 교재 등 관련 편집 경력 3년 내외 (신입급 중 뛰어난 역량 보유자도 지원 가능)
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">학력</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  국어국문학, 문예창작학, 교육학 등 관련 전공자
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">기본기</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  맞춤법 및 표준어 규정에 능통하며 문장을 매끄럽게 다듬는 능력
                </span>
              </li>
              <li className="text-gray-600 text-sm leading-relaxed pl-0">
                마감 기한을 준수하며 꼼꼼하게 일정을 관리하는 책임감
              </li>
              <li className="text-gray-600 text-sm leading-relaxed pl-0">
                초등 교육 트렌드에 관심이 많고 아이들의 언어를 이해하는 마음
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-5 bg-gray-800 rounded-sm" />
              3. 우대 사항
            </h4>
            <ul className="space-y-3 pl-4">
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">전공 및 학위</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  아동 교육이나 심리학 관련 전공 혹은 석사 과정자
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">실무 경험</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  인디자인 등 편집 툴 사용이 가능하거나 이해도가 높은 분
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">창의성</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  아이디어가 풍부하여 새로운 글쓰기 주제나 활동을 제안할 수 있는 분
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-800">디지털 활용</span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  블로그, SNS 콘텐츠 제작이나 에듀테크 서비스 경험자
                </span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 px-6 py-8 border border-gray-200 rounded-sm">
          <p className="font-bold text-gray-800 mb-3">지원 방법</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            이메일 지원:{" "}
            <a
              href="mailto:lalalaspeech@gmail.com"
              className="font-semibold text-gray-800 underline underline-offset-2 hover:text-gray-500 transition-colors font-serif"
            >
              lalalaspeech@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-4 px-6 py-8 bg-gray-50 border border-gray-200 rounded-sm text-center">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            아이들의 문해력을 키우고, 글쓰기의 즐거움을 전하는 가치 있는 교재를 함께 만들 분을 찾습니다.<br className="hidden md:block" />
            본인의 편집 역량을 마음껏 펼치며 함께 성장할 열정 있는 에디터분들의 많은 지원 바랍니다.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className="inline-block px-8 py-3 border border-gray-300 font-bold hover:bg-gray-100 transition-colors rounded-sm"
          >
            목록으로
          </Link>
        </div>
      </div>
    </Layout>
  );
}
