import { generateReportMetadata } from '@/lib/seo/metadata';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 리포트 데이터 가져오기
  const reportId = params.id;
  const report = await fetch(`/api/report/${reportId}`).then(res => res.json());
  
  if (!report || !report.success) {
    return generateReportMetadata(reportId, 'DENIED', '알 수 없는 위치');
  }
  
  return generateReportMetadata(
    reportId,
    report.data.status,
    report.data.location.name
  );
}