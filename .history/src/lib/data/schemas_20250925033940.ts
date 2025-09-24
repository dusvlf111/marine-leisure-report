import { z } from 'zod';

// 좌표 스키마
export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

// 위치 스키마
export const locationSchema = z.object({
  name: z.string().min(1, '위치를 선택해주세요'),
  coordinates: coordinatesSchema,
  navigationRoute: z.boolean().optional(),
});

// 연락처 스키마
export const contactInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  phone: z.string().regex(/^[0-9-+\s()]+$/, '올바른 전화번호를 입력해주세요'),
});

// 메인 신고 스키마
export const reportSchema = z.object({
  location: locationSchema,
  activityType: z.enum(['패들보드', '프리다이빙', '카약', '윈드서핑', '수상스키', '요트'], {
    errorMap: () => ({ message: '활동 종목을 선택해주세요' }),
  }),
  participantCount: z.number().min(1, '참가자 수는 1명 이상이어야 합니다').max(50, '참가자 수는 50명을 초과할 수 없습니다'),
  contactInfo: contactInfoSchema,
  activityDate: z.string().min(1, '활동 날짜를 선택해주세요'),
  duration: z.number().min(0.5, '활동 시간은 최소 30분 이상이어야 합니다').max(12, '활동 시간은 12시간을 초과할 수 없습니다'),
});

export type ReportFormData = z.infer<typeof reportSchema>;
