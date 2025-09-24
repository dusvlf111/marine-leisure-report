import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageContainer, ContentArea } from '@/components/layout/Container';
import { ReportForm } from '@/components/forms/ReportForm';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen gradient-wave relative">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <PageContainer>
        <Header />
        
        <ContentArea>
          {/* 히어로 섹션 */}
          <div className="text-center mb-12 animate__animated animate__fadeIn relative z-10">
            <div className="glass-card rounded-3xl p-8 mb-8 hover-lift">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                🌊 안전한 해양레저를 위한
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  AI 자율신고 시스템
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow">
                해양레저스포츠 활동 전 사전 신고를 통해 실시간 안전도 분석, 
                기상정보, 어업권 현황 등 맞춤형 안전 정보를 제공받으세요.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 mb-8">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span>실시간 AI 안전도 분석</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                  <span>기상정보 연동</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></span>
                  <span>어업권 정보 제공</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                  <span className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
                  <span>응급연락처 안내</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 메인 신고 폼 */}
          <div className="mb-16 relative z-10">
            <div className="glass-card rounded-3xl p-8 hover-lift">
              <ReportForm />
            </div>
          </div>
          
          {/* 주요 기능 소개 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative z-10">
            <Card className="glass-card border-0 hover-lift neon-blue">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-2">AI 안전도 분석</h3>
                <p className="text-white/80 text-sm">
                  머신러닝 기반으로 기상, 위치, 어업권 정보를 종합 분석하여 
                  활동 안전도를 실시간으로 평가합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 hover-lift neon-green">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🌊</div>
                <h3 className="text-xl font-semibold text-white mb-2">실시간 기상정보</h3>
                <p className="text-white/80 text-sm">
                  기상청 연동으로 풍속, 파고, 가시거리 등 
                  해양레저 활동에 필수적인 기상정보를 제공합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 hover-lift neon-blue">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎣</div>
                <h3 className="text-xl font-semibold text-white mb-2">어업권 현황</h3>
                <p className="text-white/80 text-sm">
                  해당 지역의 어업권 설정 현황과 제한사항을 
                  사전에 확인하여 안전한 활동을 지원합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0 hover-lift neon-green">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-white mb-2">응급연락망</h3>
                <p className="text-white/80 text-sm">
                  지역별 해경서, 병원, 수협 등 응급상황 시 
                  필요한 연락처를 즉시 제공합니다.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* 응급연락처 */}
          <Card className="glass-card border-0 hover-lift relative z-10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                🚨 응급연락처
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-400">122</div>
                  <div className="text-sm text-white/80">해양경찰서</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-400">119</div>
                  <div className="text-sm text-white/80">소방서 응급구조</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-400">1588-3650</div>
                  <div className="text-sm text-white/80">해양수산부 콜센터</div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-400">1833-9117</div>
                  <div className="text-sm text-white/80">해양안전종합상황실</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ContentArea>

        <Footer />
      </PageContainer>
    </div>
  );
}
