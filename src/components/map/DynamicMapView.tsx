
import dynamic from 'next/dynamic';
import { Loading } from '@/components/ui/Loading';

// MapView를 동적으로 임포트하고, SSR은 비활성화합니다.
// 로딩 중에는 Loading 컴포넌트를 보여줍니다.
const DynamicMapView = dynamic(
  () => import('@/components/map/MapView').then(mod => mod.MapView),
  {
    ssr: false,
    loading: () => <div style={{ height: '400px' }} className="flex items-center justify-center"><Loading /></div>
  }
);

export default DynamicMapView;
