'use client';

import React from 'react';

interface MapErrorBoundaryProps {
  children: React.ReactNode;
  height?: string;
  onRetry?: () => void;
}

interface MapErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

export class MapErrorBoundary extends React.Component<MapErrorBoundaryProps, MapErrorBoundaryState> {
  constructor(props: MapErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): Partial<MapErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState(prevState => ({ 
      hasError: false, 
      error: undefined,
      retryCount: prevState.retryCount + 1 
    }));
    
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      const { height = '400px' } = this.props;
      const { error, retryCount } = this.state;

      return (
        <div 
          style={{ width: '100%', height }} 
          className="rounded-lg border-2 border-dashed border-red-200 bg-red-50 flex items-center justify-center"
        >
          <div className="text-center p-8 max-w-md">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-red-800">
              지도를 로드할 수 없습니다
            </h3>
            
            <p className="text-sm text-red-600 mb-4">
              네트워크 연결을 확인하고 다시 시도해주세요
            </p>
            
            {error && process.env.NODE_ENV === 'development' && (
              <details className="text-xs text-red-500 mb-4 text-left">
                <summary className="cursor-pointer font-medium">개발자 정보</summary>
                <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                  {error.toString()}
                </pre>
              </details>
            )}
            
            {retryCount < 3 ? (
              <button
                onClick={this.handleRetry}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                다시 시도 {retryCount > 0 && `(${retryCount + 1})`}
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                페이지 새로고침
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;
