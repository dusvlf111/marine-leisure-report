import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 신고 ID 생성
export function generateReportId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RPT-${year}${month}${day}-${random}`;
}

// 날짜 포맷터
export function formatDate(date: string | Date): string {
  if (!date) {
    throw new Error('Date is required');
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date format');
  }
  
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  
  const hourStr = hour < 10 ? `0${hour}` : hour.toString();
  const minuteStr = minute < 10 ? `0${minute}` : minute.toString();
  
  return `${year}년 ${month}월 ${day}일 ${hourStr}시 ${minuteStr}분`;
}

// 전화번호 포맷터
export function formatPhoneNumber(phone: string): string {
  if (!phone) {
    throw new Error('Phone number is required');
  }
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length !== 11) {
    throw new Error('Invalid phone number length');
  }
  
  if (!/^\d+$/.test(cleaned)) {
    throw new Error('Phone number should contain only digits');
  }
  
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  
  throw new Error('Invalid phone number format');
}

// 좌표 검증
export function validateCoordinates(coordinates: unknown): boolean {
  if (!coordinates || typeof coordinates !== 'object') {
    return false;
  }
  
  const coord = coordinates as Record<string, unknown>;
  
  if (!('lat' in coord) || !('lng' in coord)) {
    return false;
  }
  
  const { lat, lng } = coord;
  
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return false;
  }
  
  if (isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
    return false;
  }
  
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
