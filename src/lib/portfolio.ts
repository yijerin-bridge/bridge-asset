export type Fund = {
  name: string;
  date: string;
  role: string;
  desc: string;
  image: string;
  highlight?: string;
};

export type Product = {
  name: string;
  period: string;
  desc: string;
  image: string;
};

// bridgeasset.kr 투자현황 페이지 기준
export const funds: Fund[] = [
  {
    name: "Bridge Innovation No.1",
    date: "2022.05",
    role: "GP",
    desc: "당뇨발, 연골재생 등 4D 바이오프린팅을 통한 장기재생 플랫폼 기업입니다. 구주 인수.",
    image: "/images/fund-bridge-innovation-1.png",
    highlight: "IPO · MOIC 2.9x",
  },
  {
    name: "Bridge Innovation No.2",
    date: "2022.09",
    role: "GP",
    desc: "인공지능 이상탐지 기술을 통한 영상분석(AI CCTV)과 빅데이터 솔루션을 제공하는 기업입니다.",
    image: "/images/fund-bridge-innovation-2.png",
  },
  {
    name: "Bridge Innovation No.4",
    date: "2024.05",
    role: "GP",
    desc: "고품질의 지속가능한 친환경 바이오매스 염색 솔루션을 제공하는 기업입니다.",
    image: "/images/fund-bridge-innovation-4.png",
  },
  {
    name: "KSAF Global AI No.1",
    date: "2023.03",
    role: "CO-GP",
    desc: "AI를 활용하여 빠르고 가볍게 디지털 휴먼 생성과 더빙 솔루션을 제공하는 기업입니다.",
    image: "/images/fund-ksaf-ai-1.png",
  },
  {
    name: "KSAF Global Investment LP",
    date: "2025.12",
    role: "LP · 추가 투자",
    desc: "AI를 활용하여 빠르고 가볍게 디지털 휴먼을 만드는 기업입니다. 다양한 분야에서 활용 중입니다.",
    image: "/images/fund-ksaf-global.png",
  },
  {
    name: "Black Bird Investment No.1",
    date: "2025.01",
    role: "CO-GP",
    desc: "안정적으로 매출이 발생하는 F&B 브랜드에 소득공제 채권 형태로 투자하였습니다.",
    image: "/images/fund-blackbird.png",
  },
  {
    name: "NU Cross-border Fund No.1",
    date: "2023.11",
    role: "LP",
    desc: "레스토랑 운영에 필요한 모든 디지털 솔루션을 제공하는 호주 스타트업입니다.",
    image: "/images/fund-nu-crossborder.png",
  },
  {
    name: "Cultural Content-IP No.1",
    date: "2023.11",
    role: "투자 · 회수",
    desc: "영화 흥행에 따른 수익배분형 투자입니다. (해외 영화 국내 배급)",
    image: "/images/fund-culture-ip.png",
    highlight: "회수 완료",
  },
];

export const products: Product[] = [
  {
    name: "Safety S&P 500",
    period: "적립식 투자",
    desc: "안정적인 구조로 S&P 500에 장기투자합니다. \"Simple is the Best\"",
    image: "/images/prod-sp500.png",
  },
  {
    name: "Global Multi Currency Plan",
    period: "3년 / 5년 투자",
    desc: "달러, 위안화, 파운드 등 6개 통화 중 선택·변경 가능하며 차후 상속·증여 플랜으로 활용할 수 있습니다.",
    image: "/images/prod-multicurrency.png",
  },
  {
    name: "Tax Return K",
    period: "투자기간 3년",
    desc: "안정적인 투자를 하면서 소득공제 혜택을 얻습니다. 투자금 대비 평균 30%대의 세금 환급을 받습니다.",
    image: "/images/prod-taxreturn.png",
  },
  {
    name: "Bridge Fixed Income",
    period: "1년 단기 투자",
    desc: "성장성은 높지만 자금 조달이 어려운 기업에 단기 투자를 진행하며 자금을 융통합니다.",
    image: "/images/prod-fixedincome.png",
  },
];

// 개인 엔젤·LP 투자 (노션 프로필 기준)
export const angelInvestments = [
  { name: "로킷헬스케어", note: "Series C · 2025.05 코스닥 IPO" },
  { name: "Aptera Motors", note: "크라우드펀딩 · 2025.10 나스닥 IPO" },
  { name: "클레온", note: "Series A·B Bridge" },
  { name: "닷 (Dot)", note: "Pre-IPO 구주" },
  { name: "Kalivir", note: "Series A" },
  { name: "데이톤", note: "Pre-A" },
  { name: "그린웨어", note: "Pre-A" },
  { name: "오더나우", note: "Seed" },
  { name: "메디프레소", note: "크라우드펀딩" },
  { name: "DDH", note: "크라우드펀딩" },
] as const;
