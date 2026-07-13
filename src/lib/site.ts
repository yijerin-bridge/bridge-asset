export const site = {
  name: "브릿지자산관리",
  legalName: "주식회사 브릿지 자산관리",
  nameEn: "Bridge Asset Management",
  url: "https://bridgeasset.kr",
  tagline: "글로벌 자산관리의 전문가",
  description:
    "브릿지자산관리는 주식·펀드, 역외투자, 퇴직연금, 채권, 스타트업, 부동산, 보험까지 아우르는 종합 자산관리 컨설팅 회사입니다. 고객의 경제적 자유를 위한 신뢰 기반 금융 파트너.",
  ceo: "이재린",
  bizNumber: "414-81-08118",
  phone: "0507-1432-6765",
  email: "bridgeasset@naver.com",
  address: {
    full: "서울시 서초구 효령로 77길 34, 1동 1층 109호",
    street: "효령로 77길 34, 1동 1층 109호",
    region: "서울특별시",
    locality: "서초구",
    postalCode: "06695",
    country: "KR",
  },
  founded: "2021",
  sns: {
    blog: "https://blog.naver.com/yijerin",
    instagram: "https://www.instagram.com/yijerin/",
    youtube: "https://youtube.com/@bridgeasset",
    notion: "https://bridgekr.notion.site/218633c4f19880fdaf41f6da1fd5f727",
  },
  verification: {
    // 발급받은 코드로 교체하세요: 구글 서치콘솔 / 네이버 서치어드바이저
    google: "GOOGLE_SITE_VERIFICATION_CODE",
    naver: "NAVER_SITE_VERIFICATION_CODE",
  },
} as const;

export const nav = [
  { href: "/", label: "홈" },
  { href: "/services", label: "서비스" },
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/members", label: "멤버소개" },
  { href: "/about", label: "회사소개" },
  { href: "/contact", label: "상담문의" },
] as const;
