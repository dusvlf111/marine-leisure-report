import { Metadata } from 'next';

/**
 * 기본 SEO 메타데이터 설정
 */
export const defaultMetadata: Metadata = {
  title: {
    default: '해양레저 안전신고 | AI 기반 해양활동 자율신고제도',
    template: '%s | 해양레저 안전신고',
  },
  description: '안전한 해양레저스포츠를 위한 AI 기반 자율신고제도. 실시간 기상정보, 어업권 확인, 항로 분석을 통한 맞춤형 안전 가이드를 제공합니다.',
  keywords: [
    '해양레저',
    '해양스포츠',
    '안전신고',
    '자율신고제도',
    '패들보드',
    '카약',
    '윈드서핑',
    '프리다이빙',
    '해양안전',
    '기상정보',
    '어업권',
    '해양경찰',
    'AI 안전분석'
  ],
  authors: [{ name: '해양레저 안전신고 시스템' }],
  creator: '해양레저 안전신고 시스템',
  publisher: '해양레저 안전신고 시스템',
  applicationName: '해양레저 안전신고',
  category: 'Sports & Safety',
  classification: 'Marine Safety System',
  
  // Open Graph 메타데이터
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://marine-leisure-report.vercel.app',
    siteName: '해양레저 안전신고',
    title: '해양레저 안전신고 | AI 기반 해양활동 자율신고제도',
    description: '안전한 해양레저스포츠를 위한 AI 기반 자율신고제도. 실시간 기상정보, 어업권 확인, 항로 분석을 통한 맞춤형 안전 가이드를 제공합니다.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '해양레저 안전신고 시스템',
      },
    ],
  },
  
  // Twitter 카드 메타데이터
  twitter: {
    card: 'summary_large_image',
    title: '해양레저 안전신고 | AI 기반 해양활동 자율신고제도',
    description: '안전한 해양레저스포츠를 위한 AI 기반 자율신고제도',
    images: ['/images/twitter-image.png'],
    creator: '@marine_safety_kr',
  },
  
  // 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // 언어 및 지역 설정
  alternates: {
    canonical: 'https://marine-leisure-report.vercel.app',
    languages: {
      'ko-KR': 'https://marine-leisure-report.vercel.app',
    },
  },
  
  // 기타 메타데이터
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F3E0' },
    { media: '(prefers-color-scheme: dark)', color: '#133E87' },
  ],
  colorScheme: 'light dark',
  
  // Apple 특화 메타데이터
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '해양레저 안전신고',
  },
  
  // Microsoft 특화 메타데이터
  other: {
    'msapplication-TileColor': '#133E87',
    'msapplication-config': '/browserconfig.xml',
  },
};

/**
 * 페이지별 SEO 메타데이터 생성기
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const fullUrl = `https://marine-leisure-report.vercel.app${path}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: fullUrl,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: image ? [image] : defaultMetadata.twitter?.images,
    },
  };
}

/**
 * 신고 결과 페이지 메타데이터 생성
 */
export function generateReportMetadata(
  reportId: string,
  status: 'APPROVED' | 'CAUTION' | 'DENIED',
  location: string
): Metadata {
  const statusText = {
    APPROVED: '승인됨',
    CAUTION: '주의',
    DENIED: '거부됨'
  }[status];

  return generatePageMetadata(
    `신고결과 ${reportId} - ${statusText}`,
    `${location} 지역 해양레저 활동 안전도 분석 결과입니다. 상태: ${statusText}`,
    `/report/${reportId}`
  );
}