'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { colors } from './colors';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof colors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light'
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // 로컬 스토리지에서 테마 설정 불러오기
  useEffect(() => {
    const savedTheme = localStorage.getItem('marine-theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  // 테마 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('marine-theme', theme);
    
    // HTML 요소에 테마 클래스 추가
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // CSS 변수 업데이트
    updateCSSVariables(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateCSSVariables = (currentTheme: Theme) => {
    const root = document.documentElement;
    
    if (currentTheme === 'dark') {
      // 다크 모드 색상
      root.style.setProperty('--color-primary-light', colors.gray[800]);
      root.style.setProperty('--color-primary-dark', colors.gray[100]);
      root.style.setProperty('--color-primary-medium', colors.semantic.info);
      root.style.setProperty('--color-primary-accent', colors.gray[700]);
      
      // 배경색
      root.style.setProperty('--color-bg-primary', colors.gray[900]);
      root.style.setProperty('--color-bg-secondary', colors.gray[800]);
      
      // 텍스트 색상
      root.style.setProperty('--color-text-primary', colors.gray[100]);
      root.style.setProperty('--color-text-secondary', colors.gray[300]);
    } else {
      // 라이트 모드 색상 (기본값)
      root.style.setProperty('--color-primary-light', colors.primary.light);
      root.style.setProperty('--color-primary-dark', colors.primary.dark);
      root.style.setProperty('--color-primary-medium', colors.primary.medium);
      root.style.setProperty('--color-primary-accent', colors.primary.accent);
      
      // 배경색
      root.style.setProperty('--color-bg-primary', colors.primary.light);
      root.style.setProperty('--color-bg-secondary', '#FFFFFF');
      
      // 텍스트 색상
      root.style.setProperty('--color-text-primary', colors.primary.dark);
      root.style.setProperty('--color-text-secondary', colors.primary.medium);
    }
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    colors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 테마 감지 훅
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<Theme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return systemTheme;
};