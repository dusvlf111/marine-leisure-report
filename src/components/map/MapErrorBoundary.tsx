'use client';

import React from 'react';

interface MapErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<any>;
}

interface MapErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class MapErrorBoundary extends React.Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): MapErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return <FallbackComponent />;
      }
      
      return (
        <div 
          style={{ width: '100%', height: '400px' }} 
          className="rounded-lg border-2 border-dashed flex items-center justify-center"
        >
          <div className="text-center p-8">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#133E87' }}>
              지도를 로드할 수 없습니다
            </h3>
            <p className="text-sm" style={{ color: '#608BC1' }}>
              잠시 후 다시 시도해주세요
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 px-4 py-2 rounded-lg text-sm"
              style={{ backgroundColor: '#133E87', color: '#F3F3E0' }}
            >
              다시 시도
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
