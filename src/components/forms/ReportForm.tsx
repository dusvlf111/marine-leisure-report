'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { reportSchema, type ReportFormData } from '@/lib/data/schemas';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { LocationSelector } from './LocationSelector';
import { ActivitySelector } from './ActivitySelector';
import { ContactForm } from './ContactForm';
import { Location, ActivityType } from '@/types/global';
import { ReportService } from '@/lib/services/reportService';

export const ReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      location: {
        name: '',
        coordinates: { lat: 0, lng: 0 },
      },
      activityType: '' as ActivityType,
      participantCount: 1,
      contactInfo: {
        name: '',
        phone: '',
      },
      activityDate: '',
      duration: 2,
    },
  });

  const watchedLocation = watch('location');
  const watchedActivityType = watch('activityType');
  const watchedContactName = watch('contactInfo.name');
  const watchedContactPhone = watch('contactInfo.phone');

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await ReportService.submitReport(data);
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // 성공 애니메이션 후 결과 페이지로 이동
        setTimeout(() => {
          router.push(`/report/${response.data.reportId}`);
        }, 2000);
      } else {
        throw new Error(response.error || '신고 접수에 실패했습니다.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationChange = (location: Location | null) => {
    if (location) {
      setValue('location', location);
    }
  };

  const handleActivityTypeChange = (activityType: ActivityType | '') => {
    if (activityType !== '') {
      setValue('activityType', activityType);
    }
  };

  const handleContactNameChange = (name: string) => {
    setValue('contactInfo.name', name);
  };

  const handleContactPhoneChange = (phone: string) => {
    setValue('contactInfo.phone', phone);
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="success-message">
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              신고가 성공적으로 접수되었습니다!
            </h2>
            <p className="text-green-700 mb-4">
              안전 분석 결과를 확인하실 수 있습니다.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 헤더 */}
      <Card className="animate__animated animate__fadeInDown">
        <CardHeader className="text-center">
          <CardTitle level={1} className="text-blue-800">
            🌊 해양레저스포츠 자율신고
          </CardTitle>
          <p className="text-gray-600 mt-2">
            안전한 해양활동을 위해 사전 신고를 통해 맞춤형 안전 정보를 받으세요
          </p>
        </CardHeader>
      </Card>

      {/* 오류 알림 */}
      {submitError && (
        <Alert 
          type="error" 
          animate 
          className="form-error"
          message={submitError}
        />
      )}

      {/* 메인 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 위치 선택 */}
        <Card className="animate__animated animate__slideInUp">
          <CardHeader>
            <CardTitle level={3}>📍 활동 위치</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationSelector
              value={watchedLocation.name ? watchedLocation : null}
              onChange={handleLocationChange}
              error={errors.location?.name?.message}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* 활동 종목 선택 */}
        <Card className="animate__animated animate__slideInUp animate-delay-500ms">
          <CardHeader>
            <CardTitle level={3}>🏄‍♂️ 활동 종목</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivitySelector
              value={watchedActivityType}
              onChange={handleActivityTypeChange}
              error={errors.activityType?.message}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* 활동 세부 정보 */}
        <Card className="animate__animated animate__slideInUp animate-delay-1s">
          <CardHeader>
            <CardTitle level={3}>⏱️ 활동 세부 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                {...register('participantCount', { valueAsNumber: true })}
                type="number"
                label="참가자 수"
                placeholder="1"
                min="1"
                max="50"
                error={errors.participantCount?.message}
                disabled={isSubmitting}
                helperText="최대 50명까지"
              />
              
              <Input
                {...register('activityDate')}
                type="date"
                label="활동 날짜"
                error={errors.activityDate?.message}
                disabled={isSubmitting}
                min={new Date().toISOString().split('T')[0]}
              />
              
              <Input
                {...register('duration', { valueAsNumber: true })}
                type="number"
                label="활동 시간 (시간)"
                placeholder="2"
                min="0.5"
                max="12"
                step="0.5"
                error={errors.duration?.message}
                disabled={isSubmitting}
                helperText="최대 12시간"
              />
            </div>
          </CardContent>
        </Card>

        {/* 연락처 정보 */}
        <Card className="animate__animated animate__slideInUp animate-delay-2s">
          <CardHeader>
            <CardTitle level={3}>📞 연락처 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm
              name={watchedContactName}
              phone={watchedContactPhone}
              onNameChange={handleContactNameChange}
              onPhoneChange={handleContactPhoneChange}
              errors={{
                name: errors.contactInfo?.name?.message,
                phone: errors.contactInfo?.phone?.message,
              }}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="animate__animated animate__slideInUp animate-delay-2s">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'AI 안전도 분석 중...' : '🚀 자율신고 접수하기'}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-3">
            신고 접수 후 즉시 AI 기반 안전도 분석 결과를 확인할 수 있습니다.
          </p>
        </div>
      </form>
    </div>
  );
};
