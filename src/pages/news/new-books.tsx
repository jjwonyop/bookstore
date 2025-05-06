import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { useImagePath } from "@/utils/path";

export default function NewBooks() {
  const getImagePath = useImagePath();
    return (
      <Layout activeMenu="news">
        <Head>
          <title>출판사 아이와글</title>
          <meta name="description" content="출판사 아이와글 공식 웹사이트입니다." />
        </Head>
        <div className="w-full">
          <div className="w-full">
            <div className="relative w-full h-[80vh]">
              <Image
                src={getImagePath("/images/news/소식1.png")}
                alt="아이와 글 신간소식"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            <div className="text-center my-10 container mx-auto">
              <Link href="/news" className="inline-block px-8 py-3 border border-gray-300 font-bold hover:bg-gray-100 transition-colors rounded-sm">
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  } 
