import { MetadataRoute } from 'next';

/**
 * 사이트맵 생성 - 검색 엔진 크롤링 최적화
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marine-leisure-report.vercel.app';
  const currentDate = new Date().toISOString();

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // 동적 페이지들 (예시 - 실제로는 DB에서 가져와야 함)
  const dynamicPages = [
    // 예시 신고서 페이지들
    {
      url: `${baseUrl}/report/example-1`,
      lastModified: currentDate,
      changeFrequency: 'never' as const,
      priority: 0.6,
    },
    // 위치별 페이지들
    {
      url: `${baseUrl}/location/busan`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location/yeosu`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location/gangneung`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // API 엔드포인트들 (공개 API만)
  const apiPages = [
    {
      url: `${baseUrl}/api/locations`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/api/weather`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...dynamicPages, ...apiPages];
}