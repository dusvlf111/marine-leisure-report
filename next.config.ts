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
  
  // 코드 스플리팅 최적화
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 코드 스플리팅 최적화
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          // React/Next.js 코어
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'react',
            priority: 10,
            chunks: 'all',
          },
          // UI 라이브러리
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui|@heroicons|lucide-react)[\\/]/,
            name: 'ui',
            priority: 5,
            chunks: 'all',
          },
          // 맵 관련 라이브러리
          maps: {
            test: /[\\/]node_modules[\\/](leaflet|react-leaflet)[\\/]/,
            name: 'maps',
            priority: 5,
            chunks: 'all',
          },
          // 폼 관련 라이브러리
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            name: 'forms',
            priority: 5,
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // 실험적 기능
  experimental: {
    // 이미지 최적화 개선
    optimizePackageImports: ['lucide-react', '@heroicons/react'],
  },
  
  // 압축 설정
  compress: true,
  
  // 정적 파일 최적화
  poweredByHeader: false,
  
  // 성능 최적화
  swcMinify: true,
};

export default withBundleAnalyzer(nextConfig);
