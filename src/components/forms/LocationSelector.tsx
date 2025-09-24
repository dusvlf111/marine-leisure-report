import React, { forwardRef, useState } from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { MapView } from '@/components/map/MapView';
import { mockLocations } from '@/lib/data/mockData';
import { Location, Coordinates } from '@/types/global';

interface LocationSelectorProps {
  value?: Location | null;
  onChange: (location: Location | null) => void;
  error?: string;
  disabled?: boolean;
}

export const LocationSelector = forwardRef<HTMLSelectElement, LocationSelectorProps>(
  ({ value, onChange, error, disabled }, ref) => {
    const [showMap, setShowMap] = useState(false);
    
    const handleLocationChange = (locationName: string) => {
      if (!locationName) {
        onChange(null);
        return;
      }
      
      const selectedLocation = mockLocations.find(loc => loc.name === locationName);
      onChange(selectedLocation || null);
    };

    const handleMapClick = (coordinates: Coordinates) => {
      // 클릭된 좌표와 가장 가까운 위치 찾기
      const nearestLocation = findNearestLocation(coordinates);
      if (nearestLocation) {
        onChange(nearestLocation);
        setShowMap(false);
      }
    };

    const locationOptions = mockLocations.map(location => ({
      value: location.name,
      label: location.name,
    }));

    return (
      <div className="space-y-2">
        <Select
          ref={ref}
          label="활동 위치"
          placeholder="활동할 위치를 선택하세요"
          value={value?.name || ''}
          onChange={(e) => handleLocationChange(e.target.value)}
          options={locationOptions}
          error={error}
          disabled={disabled}
          helperText="정확한 위치 선택은 안전 분석의 정확도를 높입니다"
        />
        
        {value && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              <p className="font-medium">선택된 위치 정보</p>
              <p className="mt-1">
                좌표: {value.coordinates.lat.toFixed(4)}, {value.coordinates.lng.toFixed(4)}
              </p>
              {value.navigationRoute && (
                <p className="mt-1 text-blue-600 font-medium">
                  ⚠️ 항로 지역: 선박 통항로에 주의하세요
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

LocationSelector.displayName = 'LocationSelector';
