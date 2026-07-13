import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 글로벌 자산관리의 전문가`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "자산관리",
    "재무설계",
    "자산관리 컨설팅",
    "퇴직연금",
    "IRP",
    "역외펀드",
    "해외투자",
    "스타트업 투자",
    "엔젤투자",
    "보험 리모델링",
    "부동산 컨설팅",
    "서초 자산관리",
    "브릿지자산관리",
    "이재린",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | 글로벌 자산관리의 전문가`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | 글로벌 자산관리의 전문가`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: site.verification.google,
    other: { "naver-site-verification": site.verification.naver },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
