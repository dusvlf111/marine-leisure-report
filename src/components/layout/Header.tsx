'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, Menu, X } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={cn('backdrop-blur-md border-0 shadow-2xl hover-lift', className)} style={{ backgroundColor: '#F3F3E0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover-glow">
            <Waves className="w-8 h-8 drop-shadow-lg" style={{ color: '#608BC1' }} />
            <span className="text-xl font-bold drop-shadow-md" style={{ color: '#133E87' }}>해양레저 안전신고</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: '#608BC1' }}
            >
              신고하기
            </Link>
            <Link 
              href="/dashboard" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: '#608BC1' }}
            >
              대시보드
            </Link>
            <Link 
              href="/about" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: '#608BC1' }}
            >
              안전수칙
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md transition-colors hover:opacity-80"
            style={{ color: '#608BC1' }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate__animated animate__slideInDown">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-md transition-colors font-medium hover:opacity-80"
                style={{ color: '#608BC1', backgroundColor: '#CBDCEB20' }}
                onClick={() => setIsMenuOpen(false)}
              >
                신고하기
              </Link>
              <Link 
                href="/dashboard" 
                className="px-3 py-2 rounded-md transition-colors font-medium hover:opacity-80"
                style={{ color: '#608BC1', backgroundColor: '#CBDCEB20' }}
                onClick={() => setIsMenuOpen(false)}
              >
                대시보드
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 rounded-md transition-colors font-medium hover:opacity-80"
                style={{ color: '#608BC1', backgroundColor: '#CBDCEB20' }}
                onClick={() => setIsMenuOpen(false)}
              >
                안전수칙
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
