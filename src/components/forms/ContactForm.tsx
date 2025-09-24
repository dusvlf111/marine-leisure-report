import React from 'react';
import { Input } from '@/components/ui/Input';
import { formatPhoneNumber } from '@/lib/utils';

interface ContactFormProps {
  name: string;
  phone: string;
  onNameChange: (name: string) => void;
  onPhoneChange: (phone: string) => void;
  errors?: {
    name?: string;
    phone?: string;
  };
  disabled?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  name,
  phone,
  onNameChange,
  onPhoneChange,
  errors,
  disabled,
}) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자, 하이픈, 괄호, + 기호만 허용
    const cleanValue = value.replace(/[^0-9\-\(\)\+\s]/g, '');
    onPhoneChange(cleanValue);
  };

  const handlePhoneBlur = () => {
    // 포커스 아웃 시 전화번호 포맷팅
    if (phone) {
      const formattedPhone = formatPhoneNumber(phone);
      onPhoneChange(formattedPhone);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">
          📞 비상연락처 정보
        </h3>
        <p className="text-sm text-orange-700">
          응급상황 발생 시 신속한 구조 작업을 위해 정확한 연락처를 입력해주세요.
          입력하신 개인정보는 안전 목적으로만 사용되며 보안이 보장됩니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="담당자 이름"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          error={errors?.name}
          disabled={disabled}
          required
        />
        
        <Input
          label="연락처"
          type="tel"
          placeholder="010-1234-5678"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          error={errors?.phone}
          disabled={disabled}
          helperText="휴대폰 번호 또는 유선 전화번호를 입력하세요"
          required
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 mt-0.5">🛡️</div>
          <div className="text-sm text-blue-800">
            <p className="font-medium">개인정보 보호 정책</p>
            <p className="mt-1">
              수집된 개인정보는 해양 안전 관리 목적으로만 사용되며, 
              관련 법령에 따라 안전하게 보관됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
