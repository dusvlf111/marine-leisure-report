/**
 * 구조화 데이터 (JSON-LD) 생성기
 * Google 검색 결과에서 리치 스니펫을 지원
 */

export interface StructuredDataProps {
  type: 'WebSite' | 'WebApplication' | 'GovernmentService' | 'Report';
  data: Record<string, unknown>;
}

/**
 * 웹사이트 구조화 데이터 생성
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '해양레저 안전신고',
    description: '안전한 해양레저스포츠를 위한 AI 기반 자율신고제도',
    url: 'https://marine-leisure-report.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://marine-leisure-report.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: '해양레저 안전신고 시스템',
      url: 'https://marine-leisure-report.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://marine-leisure-report.vercel.app/images/logo-marine.svg',
        width: 60,
        height: 60,
      },
    },
    inLanguage: 'ko-KR',
    copyrightYear: new Date().getFullYear(),
  };
}

/**
 * 웹 애플리케이션 구조화 데이터 생성
 */
export function generateWebApplicationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '해양레저 안전신고',
    description: '안전한 해양레저스포츠를 위한 AI 기반 자율신고제도',
    url: 'https://marine-leisure-report.vercel.app',
    applicationCategory: 'SafetyApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0.0',
    releaseDate: '2024-01-01',
    screenshot: {
      '@type': 'ImageObject',
      url: 'https://marine-leisure-report.vercel.app/images/app-screenshot.png',
      caption: '해양레저 안전신고 앱 스크린샷',
    },
    author: {
      '@type': 'Organization',
      name: '해양레저 안전신고 시스템',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      'AI 기반 안전도 분석',
      '실시간 기상 정보',
      '어업권 정보 확인',
      '항로 안전성 검토',
      '응급상황 연락처 제공',
      '지도 기반 위치 선택',
    ],
  };
}

/**
 * 정부 서비스 구조화 데이터 생성
 */
export function generateGovernmentServiceStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: '해양레저스포츠 자율신고제도',
    description: '해양레저스포츠 활동 전 안전성 검토 및 신고 서비스',
    provider: {
      '@type': 'GovernmentOrganization',
      name: '해양경찰청',
      url: 'https://www.kcg.go.kr',
    },
    areaServed: {
      '@type': 'Country',
      name: '대한민국',
    },
    availableLanguage: 'ko',
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday', 
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59',
    },
    serviceType: '해양안전 신고 서비스',
    serviceOutput: '안전도 분석 결과서',
  };
}

/**
 * 신고서 구조화 데이터 생성
 */
export function generateReportStructuredData(reportData: {
  id: string;
  location: string;
  activityType: string;
  status: 'APPROVED' | 'CAUTION' | 'DENIED';
  submittedAt: string;
  participantCount: number;
}) {
  const statusText = {
    APPROVED: '승인됨',
    CAUTION: '주의',
    DENIED: '거부됨'
  }[reportData.status];

  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    name: `해양레저 안전신고서 ${reportData.id}`,
    description: `${reportData.location} 지역 ${reportData.activityType} 활동 안전도 분석 결과`,
    url: `https://marine-leisure-report.vercel.app/report/${reportData.id}`,
    dateCreated: reportData.submittedAt,
    datePublished: reportData.submittedAt,
    about: {
      '@type': 'Thing',
      name: `${reportData.location} ${reportData.activityType} 활동`,
      description: `${reportData.participantCount}명 참가 예정`,
    },
    publisher: {
      '@type': 'Organization',
      name: '해양레저 안전신고 시스템',
    },
    mainEntity: {
      '@type': 'Action',
      name: '해양레저 안전도 분석',
      actionStatus: `https://schema.org/${reportData.status === 'APPROVED' ? 'CompletedActionStatus' : 'PotentialActionStatus'}`,
      result: {
        '@type': 'Thing',
        name: `안전도 분석 결과: ${statusText}`,
      },
      location: {
        '@type': 'Place',
        name: reportData.location,
      },
    },
    inLanguage: 'ko-KR',
  };
}

/**
 * FAQ 구조화 데이터 생성
 */
export function generateFAQStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '해양레저 안전신고는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '해양레저스포츠 활동 전 위치, 활동 종류, 참가자 수 등을 사전 신고하여 AI 기반 안전도 분석을 받는 서비스입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '어떤 해양활동을 지원하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '패들보드, 카약, 윈드서핑, 프리다이빙, 수상스키, 요트 등 다양한 해양레저스포츠를 지원합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '안전도 분석은 어떻게 이루어지나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '실시간 기상정보, 어업권 정보, 항로 안전성, 활동 종류별 위험도를 종합 분석하여 승인/주의/거부 중 하나의 결과를 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '신고 비용이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '해양레저 안전신고 서비스는 완전 무료로 제공됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '응급상황 시 어떻게 해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '119(소방서), 122(해양경찰), 지역 구조대 등 응급상황 연락처가 결과 페이지에 제공됩니다.',
        },
      },
    ],
  };
}

/**
 * 구조화 데이터를 HTML에 삽입하기 위한 JSON-LD 생성
 */
export function createJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data, null, 0);
}