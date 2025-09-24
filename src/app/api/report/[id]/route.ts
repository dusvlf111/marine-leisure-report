import { NextRequest, NextResponse } from 'next/server';
import { mockReports } from '@/lib/data/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: '신고 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    // 목데이터에서 해당 리포트 검색
    const report = mockReports.find(r => r.reportId === reportId);

    if (!report) {
      return NextResponse.json(
        { success: false, error: '해당 신고를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      data: report
    });

  } catch (error) {
    console.error('Report detail fetch error:', error);
    
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
