import React from 'react';

// 스키마 타입 정의
type SchemaValue = string | number | boolean | null | SchemaObject | SchemaValue[];
interface SchemaObject {
  [key: string]: SchemaValue | undefined;
}
type SchemaType = SchemaObject;

// 모든 스키마에 공통으로 들어가는 Organization 정보
const organizationSchema: SchemaType = {
  "@type": "Organization",
  "@id": "https://iwagle.com/#organization",
  "name": "아이와글 출판사",
  "url": "https://iwagle.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://iwagle.com/images/로고.webp",
    "width": 260,
    "height": 60
  }
};

// 웹사이트 스키마
const websiteSchema: SchemaType = {
  "@type": "WebSite",
  "@id": "https://iwagle.com/#website",
  "url": "https://iwagle.com",
  "name": "아이와글 출판사",
  "description": "어린이 스피치 교육 전문 출판사",
  "publisher": {
    "@id": "https://iwagle.com/#organization"
  }
};

// 도서 데이터 인터페이스
interface BookData {
  url: string;
  name: string;
  image: string;
  description: string;
  isbn?: string;
  author?: string;
  publisher?: string;
  datePublished?: string;
}

// 이벤트 데이터 인터페이스
interface EventData {
  url: string;
  name: string;
  image: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  price?: string;
}

// 페이지 데이터 인터페이스
interface PageData {
  url: string;
  title: string;
  description: string;
  image?: string;
  dateModified?: string;
}

// 미술 작품 데이터 인터페이스
interface ArtworkData {
  url: string;
  name: string;
  image: string;
  description: string;
  artist?: string;
  artworkMedium?: string; // 예: '유화', '수채화', '디지털 아트' 등
  artworkSurface?: string; // 예: '캔버스', '종이' 등
  dateCreated?: string;
  width?: string;
  height?: string;
  artEdition?: string; // 예: '제한판', '에디션 번호'
  genre?: string; // 예: '풍경화', '초상화', '추상화' 등
  keywords?: string[];
}

// 도서(책) 스키마 생성 함수
export const createBookSchema = (book: BookData): SchemaType => {
  return {
    "@type": "Book",
    "@id": `${book.url}#book`,
    "url": book.url,
    "name": book.name,
    "image": book.image,
    "description": book.description,
    ...(book.isbn && { "isbn": book.isbn }),
    ...(book.author && { 
      "author": {
        "@type": "Person",
        "name": book.author
      }
    }),
    "publisher": {
      "@id": "https://iwagle.com/#organization"
    },
    ...(book.datePublished && { "datePublished": book.datePublished })
  };
};

// 이벤트 스키마 생성 함수
export const createEventSchema = (event: EventData): SchemaType => {
  return {
    "@type": "Event",
    "@id": `${event.url}#event`,
    "url": event.url,
    "name": event.name,
    "image": event.image,
    "description": event.description,
    "startDate": event.startDate,
    ...(event.endDate && { "endDate": event.endDate }),
    ...(event.location && { 
      "location": {
        "@type": "Place",
        "name": event.location
      }
    }),
    "organizer": {
      "@id": "https://iwagle.com/#organization"
    },
    ...(event.price && { 
      "offers": {
        "@type": "Offer",
        "price": event.price,
        "priceCurrency": "KRW"
      }
    })
  };
};

// 페이지 스키마 생성 함수
export const createPageSchema = (page: PageData): SchemaType => {
  return {
    "@type": "WebPage",
    "@id": `${page.url}#webpage`,
    "url": page.url,
    "name": page.title,
    "description": page.description,
    "isPartOf": {
      "@id": "https://iwagle.com/#website"
    },
    ...(page.image && { "image": page.image }),
    ...(page.dateModified && { "dateModified": page.dateModified }),
    "inLanguage": "ko-KR"
  };
};

// 미술 작품 스키마 생성 함수
export const createArtworkSchema = (artwork: ArtworkData): SchemaType => {
  return {
    "@type": "VisualArtwork",
    "@id": `${artwork.url}#artwork`,
    "url": artwork.url,
    "name": artwork.name,
    "image": artwork.image,
    "description": artwork.description,
    ...(artwork.artist && { 
      "creator": {
        "@type": "Person",
        "name": artwork.artist
      }
    }),
    ...(artwork.artworkMedium && { "artMedium": artwork.artworkMedium }),
    ...(artwork.artworkSurface && { "artworkSurface": artwork.artworkSurface }),
    ...(artwork.dateCreated && { "dateCreated": artwork.dateCreated }),
    ...(artwork.width && { 
      "width": {
        "@type": "Distance",
        "name": artwork.width
      } 
    }),
    ...(artwork.height && { 
      "height": {
        "@type": "Distance",
        "name": artwork.height
      } 
    }),
    ...(artwork.artEdition && { "artEdition": artwork.artEdition }),
    ...(artwork.genre && { "genre": artwork.genre }),
    ...(artwork.keywords && { "keywords": artwork.keywords.join(", ") }),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "KRW",
      "seller": {
        "@id": "https://iwagle.com/#organization"
      }
    }
  };
};

interface SchemaOrgProps {
  type: 'website' | 'organization' | 'book' | 'event' | 'article' | 'page' | 'breadcrumb' | 'artwork';
  data?: unknown;
  additionalSchemas?: SchemaType[];
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ type, data, additionalSchemas = [] }) => {
  // 기본 그래프 항목들
  const graphItems: SchemaType[] = [organizationSchema, websiteSchema];
  
  // 페이지 타입에 따라 추가 스키마 생성
  if (type === 'book' && data) {
    graphItems.push(createBookSchema(data as BookData));
  } else if (type === 'event' && data) {
    graphItems.push(createEventSchema(data as EventData));
  } else if (type === 'page' && data) {
    graphItems.push(createPageSchema(data as PageData));
  } else if (type === 'artwork' && data) {
    graphItems.push(createArtworkSchema(data as ArtworkData));
  }
  
  // 추가 스키마가 있으면 그래프에 포함
  if (additionalSchemas.length > 0) {
    graphItems.push(...additionalSchemas);
  }
  
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": graphItems
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaOrg; 