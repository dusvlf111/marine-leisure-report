import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageContainer, ContentArea } from '@/components/layout/Container';
import { ReportForm } from '@/components/forms/ReportForm';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <PageContainer>
      <Header />
      
      <ContentArea>
        {/* 히어로 섹션 */}
        <div className="text-center mb-12 animate__animated animate__fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            🌊 안전한 해양레저를 위한
            <span className="block text-blue-600">AI 자율신고 시스템</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            해양레저스포츠 활동 전 사전 신고를 통해 실시간 안전도 분석, 
            기상정보, 어업권 현황 등 맞춤형 안전 정보를 제공받으세요.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>실시간 AI 안전도 분석</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>기상정보 연동</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              <span>어업권 정보 제공</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span>응급연락처 안내</span>
            </div>
          </div>
        </div>

        {/* 안전 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center animate__animated animate__slideInUp">
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">안전도 분석 정확도</div>
            </CardContent>
          </Card>
          
          <Card className="text-center animate__animated animate__slideInUp animate-delay-500ms">
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
              <div className="text-sm text-gray-600">응급상황 대응시간 단축</div>
            </CardContent>
          </Card>
          
          <Card className="text-center animate__animated animate__slideInUp animate-delay-1s">
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">30%</div>
              <div className="text-sm text-gray-600">해양레저 민원 감소</div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 신고 폼 */}
        <ReportForm />

        {/* 안전 수칙 안내 */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 animate__animated animate__fadeIn">
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ⚡ 빠른 신고 접수 프로세스
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">위치 선택</h3>
                  <p className="text-sm text-gray-600">활동할 해역을 선택하세요</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">종목 선택</h3>
                  <p className="text-sm text-gray-600">레저스포츠 종목을 선택하세요</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">정보 입력</h3>
                  <p className="text-sm text-gray-600">활동 세부사항을 입력하세요</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">안전 분석</h3>
                  <p className="text-sm text-gray-600">AI 안전도 분석 결과 확인</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 응급연락처 안내 */}
        <div className="mt-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent>
              <h2 className="text-xl font-bold text-red-800 mb-4 text-center">
                🚨 응급상황 연락처
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">122</div>
                  <div className="text-sm text-red-700">해양경찰 (국번없이)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">119</div>
                  <div className="text-sm text-red-700">소방서 응급구조</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">1588-3650</div>
                  <div className="text-sm text-red-700">해양수산부 콜센터</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentArea>

      <Footer />
    </PageContainer>
  );
}
