import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/lib/design/ThemeProvider";
import { defaultMetadata } from "@/lib/seo/metadata";
import { 
  generateWebsiteStructuredData, 
  generateWebApplicationStructuredData,
  generateGovernmentServiceStructuredData,
  generateFAQStructuredData,
  createJsonLd 
} from "@/lib/seo/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO 최적화된 메타데이터 적용
export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 구조화 데이터 생성
  const websiteData = generateWebsiteStructuredData();
  const webAppData = generateWebApplicationStructuredData();
  const govServiceData = generateGovernmentServiceStructuredData();
  const faqData = generateFAQStructuredData();

  return (
    <html lang="ko-KR">
      <head>
        {/* 구조화 데이터 (JSON-LD) */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: createJsonLd(websiteData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: createJsonLd(webAppData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: createJsonLd(govServiceData) }}
        />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: createJsonLd(faqData) }}
        />
        
        {/* 기타 SEO 태그 */}
        <link rel="canonical" href="https://marine-leisure-report.vercel.app" />
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="robots" href="/robots.txt" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
