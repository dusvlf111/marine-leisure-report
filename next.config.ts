import type { NextConfig } from "next";

// Bundle analyzer 설정
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    // 이미지 포맷 (webp, avif)
    formats: ['image/webp', 'image/avif'],
    
    // 외부 이미지 도메인 허용
    domains: [
      'cdnjs.cloudflare.com', // Leaflet 마커 이미지
    ],
    
    // 반응형 이미지 크기
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // SVG 지원
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 실험적 기능
  experimental: {
    // 이미지 최적화 개선
    optimizePackageImports: ['lucide-react'],
  },
};

export default withBundleAnalyzer(nextConfig);
