import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageContainer, ContentArea } from '@/components/layout/Container';
import { SafetyAnalysis } from '@/components/safety/SafetyAnalysis';
import { WeatherInfo } from '@/components/safety/WeatherInfo';
import { FisheryInfo } from '@/components/safety/FisheryInfo';
import { NavigationInfo } from '@/components/safety/NavigationInfo';
import { EmergencyContacts } from '@/components/safety/EmergencyContacts';
import { SafetyZones } from '@/components/map/SafetyZones';
import { Button } from '@/components/ui/Button';
import { mockReports } from '@/lib/data/mockData';
import Link from 'next/link';

interface ReportPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  // params를 await해서 id 추출
  const { id } = await params;
  
  // 실제 구현에서는 API에서 데이터를 가져와야 함
  // 현재는 mockReports에서 첫 번째 데이터를 사용
  const report = mockReports[0]; // 실제로는 id로 조회
  
  if (!report) {
    notFound();
  }

  return (
    <PageContainer>
      <Header />
      
      <ContentArea>
        {/* 페이지 헤더 */}
        <div className="text-center mb-8 animate__animated animate__fadeInDown">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🌊 안전도 분석 결과
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            신고번호: <span className="font-mono font-semibold">{report.reportId}</span>
          </p>
          <p className="text-sm text-gray-500">
            분석 완료: {new Date(report.submittedAt).toLocaleString('ko-KR')}
          </p>
        </div>

        {/* 빠른 액션 버튼들 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate__animated animate__fadeInUp">
          <Link href="/">
            <Button variant="secondary" size="sm">
              ← 홈으로
            </Button>
          </Link>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => window.print()}
          >
            📄 결과 출력
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => navigator.share?.({
              title: '해양레저 안전도 분석 결과',
              text: `신고번호: ${report.reportId}`,
              url: window.location.href
            })}
          >
            📤 공유하기
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 영역 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 안전도 분석 */}
            <SafetyAnalysis 
              status={report.status}
              analysis={report.analysis}
            />

            {/* 기상 정보 */}
            <WeatherInfo weather={report.weather} />

            {/* 어업권 정보 */}
            <FisheryInfo location={report.location} />

            {/* 항로 정보 */}
            <NavigationInfo location={report.location} />

            {/* 추천사항 */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate__animated animate__slideInUp animate-delay-500ms">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💡</span>
                AI 추천사항
              </h2>
              <div className="space-y-3">
                {report.recommendations.map((recommendation, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg animate__animated animate__fadeInLeft"
                    style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800">
                      {index + 1}
                    </span>
                    <p className="text-blue-800">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 안전구역 지도 */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate__animated animate__slideInUp animate-delay-1s">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🗺️</span>
                주변 안전구역
              </h2>
              <SafetyZones
                center={report.location.coordinates}
                safetyZones={report.safetyZones}
                level={5}
                style={{ width: '100%', height: '400px' }}
              />
            </div>

            {/* 활동 정보 요약 */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate__animated animate__slideInUp animate-delay-1500ms">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                신고 활동 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">활동 상세</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>활동 종류:</span>
                      <span className="font-medium">{report.activity.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>참여 인원:</span>
                      <span className="font-medium">{report.activity.participants}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span>활동 시간:</span>
                      <span className="font-medium">{report.activity.startTime} - {report.activity.endTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">신고자 정보</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>이름:</span>
                      <span className="font-medium">{report.contact.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>연락처:</span>
                      <span className="font-medium">{report.contact.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>위치:</span>
                      <span className="font-medium">{report.location.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 응급 연락처 */}
            <EmergencyContacts 
              contacts={report.emergencyContacts}
              location={report.location.coordinates}
            />

            {/* 추가 정보 카드 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 shadow-lg animate__animated animate__slideInRight animate-delay-2s">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                <span className="mr-2">ℹ️</span>
                추가 정보
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-blue-700">
                  <span>🌊</span>
                  <a href="#" className="hover:underline">해양날씨 예보</a>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <span>📱</span>
                  <a href="#" className="hover:underline">모바일 앱 다운로드</a>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <span>📞</span>
                  <a href="#" className="hover:underline">고객센터</a>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <span>📖</span>
                  <a href="#" className="hover:underline">안전 수칙 가이드</a>
                </div>
              </div>
            </div>

            {/* 다른 신고하기 버튼 */}
            <div className="text-center">
              <Link href="/">
                <Button className="w-full animate__animated animate__pulse animate-delay-3s">
                  🌊 새로운 신고 하기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center py-8 border-t border-gray-200 animate__animated animate__fadeIn animate-delay-2500ms">
          <p className="text-gray-600 mb-2">
            🌊 안전한 해양레저 활동을 위해 항상 주의하세요
          </p>
          <p className="text-sm text-gray-500">
            본 분석 결과는 AI 기반 예측으로 실제 상황과 다를 수 있습니다. 
            현장 상황을 우선하여 판단하시기 바랍니다.
          </p>
        </div>
      </ContentArea>
      
      <Footer />
    </PageContainer>
  );
}
