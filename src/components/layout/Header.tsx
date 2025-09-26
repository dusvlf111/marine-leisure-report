'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design/colors';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MarineLogo } from '@/components/ui/OptimizedImage';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={cn('backdrop-blur-md border-0 shadow-2xl hover-lift', className)} style={{ backgroundColor: colors.primary.light }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 hover-glow">
            <div className="block sm:hidden">
              <MarineLogo size="small" priority />
            </div>
            <div className="hidden sm:block">
              <MarineLogo size="medium" priority />
            </div>
            <span className="text-base sm:text-xl font-bold drop-shadow-md" style={{ color: colors.primary.dark }}>
              <span className="hidden sm:inline">해양레저 안전신고</span>
              <span className="sm:hidden">해양안전</span>
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: colors.primary.medium }}
            >
              신고하기
            </Link>
            <Link 
              href="/dashboard" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: colors.primary.medium }}
            >
              대시보드
            </Link>
            <Link 
              href="/about" 
              className="hover:opacity-80 transition-colors font-medium"
              style={{ color: colors.primary.medium }}
            >
              안전수칙
            </Link>
            <ThemeToggle />
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md transition-colors hover:opacity-80"
            style={{ color: colors.primary.medium }}
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
                style={{ color: colors.primary.medium, backgroundColor: colors.primary.accent + '20' }}
                onClick={() => setIsMenuOpen(false)}
              >
                신고하기
              </Link>
              <Link 
                href="/dashboard" 
                className="px-3 py-2 rounded-md transition-colors font-medium hover:opacity-80"
                style={{ color: colors.primary.medium, backgroundColor: colors.primary.accent + '20' }}
                onClick={() => setIsMenuOpen(false)}
              >
                대시보드
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 rounded-md transition-colors font-medium hover:opacity-80"
                style={{ color: colors.primary.medium, backgroundColor: colors.primary.accent + '20' }}
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
