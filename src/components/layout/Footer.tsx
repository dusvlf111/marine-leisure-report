import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('backdrop-blur-md border-0', className)} style={{ backgroundColor: '#F3F3E0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 설명 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Waves className="w-8 h-8" style={{ color: '#608BC1' }} />
              <span className="text-xl font-bold" style={{ color: '#133E87' }}>해양레저 안전신고</span>
            </div>
            <p className="mb-4" style={{ color: '#608BC1' }}>
              AI 기반 해양레저스포츠 자율신고 시스템으로 안전하고 즐거운 해양활동을 지원합니다.
            </p>
            <p className="text-sm" style={{ color: '#608BC1' }}>
              © 2024 해양레저 안전신고 시스템. All rights reserved.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#133E87' }}>빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                  신고하기
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                  대시보드
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                  안전수칙
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 정보 */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#133E87' }}>응급연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: '#CBDCEB' }} />
                <span style={{ color: '#608BC1' }}>해양경찰: 122</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: '#CBDCEB' }} />
                <span style={{ color: '#608BC1' }}>응급상황: 119</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: '#CBDCEB' }} />
                <span style={{ color: '#608BC1' }}>support@marine-safety.kr</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" style={{ color: '#CBDCEB' }} />
                <span style={{ color: '#608BC1' }}>전국 해안가 서비스</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="mt-8 pt-8" style={{ borderTop: `1px solid #CBDCEB` }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0" style={{ color: '#608BC1' }}>
              본 시스템은 해양수산부와 연계하여 운영됩니다.
            </p>
            <div className="flex space-x-4">
              <Link href="/terms" className="text-sm transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                이용약관
              </Link>
              <Link href="/privacy" className="text-sm transition-colors hover:opacity-80" style={{ color: '#608BC1' }}>
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
