import React, { forwardRef, useState } from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import DynamicMapView from '@/components/map/DynamicMapView';
import { mockLocations } from '@/lib/data/mockData';
import { Location, Coordinates } from '@/types/global';
import { findNearestLocation, normalizeCoordinates } from '@/lib/utils/mapUtils';

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

    const handleMapClick = (coordinates: unknown) => {
      try {
        // 좌표를 안전하게 정규화
        const normalizedCoords = normalizeCoordinates(coordinates);
        if (!normalizedCoords) {
          console.warn('Invalid coordinates received:', coordinates);
          return;
        }

        // 클릭된 좌표와 가장 가까운 위치 찾기 (10km 이내)
        const nearestLocation = findNearestLocation(normalizedCoords, mockLocations, 10000);
        if (nearestLocation) {
          onChange(nearestLocation);
          setShowMap(false);
        } else {
          console.info('No location found within 10km of clicked coordinates');
        }
      } catch (error) {
        console.error('Error handling map click:', error);
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
        
        <div className="flex space-x-2 mt-2">
          <Button
            type="button"
            variant={showMap ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowMap(!showMap)}
            disabled={disabled}
          >
            {showMap ? '목록 선택' : '지도에서 선택'}
          </Button>
        </div>

        {showMap && (
          <div className="mt-4 animate__animated animate__slideDown">
            <DynamicMapView
              center={value?.coordinates || { lat: 35.1595, lng: 129.1604 }}
              style={{ width: '100%', height: '300px' }}
              onMapClick={handleMapClick}
              markers={mockLocations.map(loc => ({
                position: loc.coordinates,
                title: loc.name,
                content: `<div class="p-2"><strong>${loc.name}</strong><br/>클릭하여 선택</div>`
              }))}
              className="glass-card border border-white/30 rounded-lg hover-lift shadow-lg backdrop-blur-md"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 지도의 마커를 클릭하거나 원하는 위치를 클릭하세요
            </p>
          </div>
        )}
        
        {value && (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200 animate__animated animate__fadeIn">
            <div className="text-sm text-blue-800">
              <p className="font-medium">선택된 위치 정보</p>
              <p className="mt-1">
                📍 {value.name}<br/>
                좌표: {value.coordinates.lat.toFixed(4)}, {value.coordinates.lng.toFixed(4)}
              </p>
              {value.navigationRoute && (
                <p className="mt-1 text-blue-600">⚓ 주요 항로 근처</p>
              )}
              {value.fishingRights && (
                <p className="mt-1 text-purple-600">🎣 어업권 구역</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

LocationSelector.displayName = 'LocationSelector';


