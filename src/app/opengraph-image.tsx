import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = '해양레저 안전신고 - AI 기반 해양활동 자율신고제도'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F3E0',
          flexDirection: 'column',
          gap: 24,
          padding: 48,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontStyle: 'normal',
            color: '#133E87',
            lineHeight: 1.2,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          해양레저 안전신고
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontStyle: 'normal',
            color: '#2A4365',
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          AI 기반 해양활동 자율신고제도
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}