import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 카톡 제목 (굵은 글씨)
  title: "SSOK | 상위 1% 프라이빗 매칭 서비스",
  // 카톡 설명 (작은 글씨)
  description: "검증된 사람들의 특별한 인연, 전담 매니저가 당신의 결에 맞는 단 한 분을 찾아드립니다.",
  openGraph: {
    title: "SSOK | 프라이빗 하이엔드 매칭",
    description: "가벼운 만남이 아닌, 수준이 맞는 인연을 만나보세요.",
    // 카톡에 띄울 이미지 주소 (아래 2단계에서 설명)
    images: [
      {
        url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "SSOK 프리미엄 매칭",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}