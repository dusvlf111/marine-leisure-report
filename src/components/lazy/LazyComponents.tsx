'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 맵 로딩 컴포넌트
const MapLoadingSpinner = () => (
  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="flex flex-col items-center space-y-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-sm text-gray-600">지도를 불러오는 중...</p>
    </div>
  </div>
);

// 동적 로딩된 맵 컴포넌트
const DynamicMapView = dynamic(
  () => import('../map/MapView'),
  {
    loading: () => <MapLoadingSpinner />,
    ssr: false,
  }
);

// DynamicMapView를 래핑하는 컴포넌트
export const LazyMapView = DynamicMapView;

// 차트 컴포넌트 동적 로딩
const DynamicWeatherInfo = dynamic(
  () => import('../safety/WeatherInfo').then(mod => ({ default: mod.WeatherInfo })),
  {
    loading: () => (
      <div className="h-32 bg-gray-100 rounded animate-pulse flex items-center justify-center">
        <span className="text-gray-500">날씨 정보 로딩 중...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazyWeatherInfo = DynamicWeatherInfo;

// 안전 분석 컴포넌트 동적 로딩
const DynamicSafetyAnalysis = dynamic(
  () => import('../safety/SafetyAnalysis').then(mod => ({ default: mod.SafetyAnalysis })),
  {
    loading: () => (
      <div className="h-24 bg-gray-100 rounded animate-pulse flex items-center justify-center">
        <span className="text-gray-500">안전 분석 로딩 중...</span>
      </div>
    ),
    ssr: false,
  }
);

export const LazySafetyAnalysis = DynamicSafetyAnalysis;