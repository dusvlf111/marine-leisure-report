import { generatePageMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return generatePageMetadata(
    '자율신고 입력 | 안전한 해양레저를 위한 첫 걸음',
    '해양 레저 활동을 위한 자율신고 입력 페이지입니다. 위치, 활동 종류, 시간 등을 입력하여 AI 기반 안전 분석을 받아보세요.',
    '/',
  );
}