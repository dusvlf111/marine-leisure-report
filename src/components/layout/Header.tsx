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
    <header className={cn('bg-blue-600 text-white shadow-lg', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Waves className="w-8 h-8" />
            <span className="text-xl font-bold">해양레저 안전신고</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              신고하기
            </Link>
            <Link 
              href="/dashboard" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              대시보드
            </Link>
            <Link 
              href="/about" 
              className="hover:text-blue-200 transition-colors font-medium"
            >
              안전수칙
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-blue-700 rounded-md transition-colors"
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
                className="px-3 py-2 hover:bg-blue-700 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                신고하기
              </Link>
              <Link 
                href="/dashboard" 
                className="px-3 py-2 hover:bg-blue-700 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                대시보드
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 hover:bg-blue-700 rounded-md transition-colors font-medium"
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
