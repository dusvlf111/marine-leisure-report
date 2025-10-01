'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// =============================================================================
// LOADING COMPONENTS
// =============================================================================

const GenericLoadingSpinner = ({ message = '로딩 중...' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center p-8 space-y-3">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <p className="text-sm text-gray-600">{message}</p>
  </div>
);

const MapLoadingSpinner = () => (
  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <GenericLoadingSpinner message="지도를 불러오는 중..." />
  </div>
);

const CardLoadingSkeleton = ({ height = 'h-32' }: { height?: string }) => (
  <div className={`${height} bg-gray-100 rounded-lg animate-pulse flex items-center justify-center`}>
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
    </div>
  </div>
);

// =============================================================================
// MAP COMPONENTS
// =============================================================================

const DynamicMapView = dynamic(
  () => import('../map/MapView'),
  {
    loading: () => <MapLoadingSpinner />,
    ssr: false,
  }
);

const DynamicDynamicMapView = dynamic(
  () => import('../map/DynamicMapView'),
  {
    loading: () => <MapLoadingSpinner />,
    ssr: false,
  }
);

// SimpleMapView는 현재 존재하지 않으므로 주석 처리
// const DynamicSimpleMapView = dynamic(
//   () => import('../map/SimpleMapView'),
//   {
//     loading: () => <MapLoadingSpinner />,
//     ssr: false,
//   }
// );

// =============================================================================
// SAFETY COMPONENTS
// =============================================================================

const DynamicWeatherInfo = dynamic(
  () => import('../safety/WeatherInfo').then(mod => ({ default: mod.WeatherInfo })),
  {
    loading: () => <CardLoadingSkeleton height="h-40" />,
    ssr: false,
  }
);

const DynamicSafetyAnalysis = dynamic(
  () => import('../safety/SafetyAnalysis').then(mod => ({ default: mod.SafetyAnalysis })),
  {
    loading: () => <CardLoadingSkeleton height="h-32" />,
    ssr: false,
  }
);

const DynamicNavigationInfo = dynamic(
  () => import('../safety/NavigationInfo').then(mod => ({ default: mod.NavigationInfo })),
  {
    loading: () => <CardLoadingSkeleton height="h-28" />,
    ssr: false,
  }
);

const DynamicFisheryInfo = dynamic(
  () => import('../safety/FisheryInfo').then(mod => ({ default: mod.FisheryInfo })),
  {
    loading: () => <CardLoadingSkeleton height="h-28" />,
    ssr: false,
  }
);

const DynamicEmergencyContacts = dynamic(
  () => import('../safety/EmergencyContacts').then(mod => ({ default: mod.EmergencyContacts })),
  {
    loading: () => <CardLoadingSkeleton height="h-36" />,
    ssr: false,
  }
);

// =============================================================================
// FORM COMPONENTS
// =============================================================================

const DynamicReportForm = dynamic(
  () => import('../forms/ReportForm').then(mod => ({ default: mod.ReportForm })),
  {
    loading: () => (
      <div className="space-y-6 p-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    ),
    ssr: false,
  }
);

const DynamicActivitySelector = dynamic(
  () => import('../forms/ActivitySelector').then(mod => ({ default: mod.ActivitySelector })),
  {
    loading: () => <CardLoadingSkeleton height="h-12" />,
    ssr: true,
  }
);

const DynamicLocationSelector = dynamic(
  () => import('../forms/LocationSelector').then(mod => ({ default: mod.LocationSelector })),
  {
    loading: () => <CardLoadingSkeleton height="h-12" />,
    ssr: true,
  }
);

const DynamicContactForm = dynamic(
  () => import('../forms/ContactForm').then(mod => ({ default: mod.ContactForm })),
  {
    loading: () => <CardLoadingSkeleton height="h-20" />,
    ssr: true,
  }
);

// =============================================================================
// UI COMPONENTS (Heavy ones that benefit from code splitting)
// =============================================================================

const DynamicProgressiveImage = dynamic(
  () => import('../ui/OptimizedImage').then(mod => ({ default: mod.ProgressiveImage })),
  {
    loading: () => <CardLoadingSkeleton height="h-48" />,
    ssr: false,
  }
);

// =============================================================================
// EXPORTS
// =============================================================================

// Map Components
export const LazyMapView = DynamicMapView;
export const LazyDynamicMapView = DynamicDynamicMapView;
// export const LazySimpleMapView = DynamicSimpleMapView; // 현재 미사용

// Safety Components
export const LazyWeatherInfo = DynamicWeatherInfo;
export const LazySafetyAnalysis = DynamicSafetyAnalysis;
export const LazyNavigationInfo = DynamicNavigationInfo;
export const LazyFisheryInfo = DynamicFisheryInfo;
export const LazyEmergencyContacts = DynamicEmergencyContacts;

// Form Components
export const LazyReportForm = DynamicReportForm;
export const LazyActivitySelector = DynamicActivitySelector;
export const LazyLocationSelector = DynamicLocationSelector;
export const LazyContactForm = DynamicContactForm;

// UI Components
export const LazyProgressiveImage = DynamicProgressiveImage;

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  condition?: boolean;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback = <GenericLoadingSpinner />,
  condition = true
}) => {
  if (!condition) return null;
  
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// 조건부 동적 로딩
export const ConditionalLazy = dynamic(
  async () => {
    const { LazyWrapper } = await import('./LazyComponents');
    return { default: LazyWrapper };
  },
  {
    loading: () => <GenericLoadingSpinner />,
    ssr: false,
  }
);