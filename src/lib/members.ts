export type Member = {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  quote: string;
  image: string;
  ceo?: boolean;
  career: string[];
  certifications: string[];
  lectures?: string[];
  sns?: { label: string; value: string }[];
  intro: string[];
};

// bridgeasset.creatorlink.net 멤버소개 + 개인 상세 페이지 기준
export const members: Member[] = [
  {
    slug: "lee-jaerin",
    name: "이재린",
    nameEn: "Yi Jae-rin",
    role: "대표이사 / CEO",
    quote: "더 나은 삶의 가능성을 열어가는 길을 안내하고자 합니다.",
    image: "/images/members/lee-jaerin.jpg",
    ceo: true,
    career: [
      "브릿지 자산관리 CEO",
      "JR 재무 컨설팅 자산관리사 (Since 2014)",
      "미래에셋증권 FA",
      "전) 광운대학교 경영학부 졸업",
      "전) 한화금융 HFA",
      "전) 이베스트투자증권 FA",
      "전) 서울CUBE 부지점장",
      "전) A+에셋 Total Financial Advisor",
      "전) 한국은퇴설계연구소 연구원",
    ],
    certifications: [
      "투자자산운용사",
      "AFPK",
      "증권·펀드 투자권유 대행인",
      "퇴직연금 자격",
      "FP 자격 (생명·손해)",
      "변액보험 자격",
      "개인투자조합 2급",
      "적격 엔젤투자자",
    ],
    lectures: [
      "삼성전자 직원 대상 금융투자 강의",
      "SFA 그룹 재무설계 강의",
      "평택시 신중년 인생설계 심화과정 투자 강의",
      "아산시 신중년 인생설계과정 투자 강의",
      "강동50플러스센터 재테크 강의 등",
    ],
    intro: [
      "이재린 대표이사는 보험사, 증권사, 핀테크 회사 등 다양한 금융기관과 함께 오랜 기간 고객들에게 자산배분을 기반으로 한 자산관리를 해왔습니다.",
      "브릿지 자산관리의 대표이사로서 조직관리와 투자심사, 투자집행 및 관리, 고객 컨설팅 등의 업무를 하고 있습니다.",
      "그 외 사회초년생 및 직장인들을 위한 투자 강의 및 독서모임 등 다양한 활동을 하고 있습니다.",
    ],
  },
  {
    slug: "kwon-chanyong",
    name: "권찬용",
    nameEn: "Kwon Chan-yong",
    role: "자산관리사 / WM",
    quote: "성공적인 재테크 시작, 제가 함께 하겠습니다.",
    image: "/images/members/kwon-chanyong.jpg",
    career: [
      "브릿지 자산관리 WM",
      "파이낸스 컨티뉴 팀장",
      "전) 키움에셋플래너 FA",
    ],
    certifications: [
      "증권·펀드 투자권유 대행인",
      "FP 자격 (생명·손해)",
      "변액보험 자격",
      "개인투자조합 업무집행조합원",
    ],
    intro: [
      "20대부터 시작해 자가 마련까지, 직접 경험하고 검증한 실전 재테크 노하우를 전수해 드립니다.",
      "이론이 아닌, 실제 성공 사례를 바탕으로 한 현실적인 솔루션을 제공합니다.",
    ],
  },
  {
    slug: "an-jaeseong",
    name: "안재성",
    nameEn: "Ahn Jae-sung",
    role: "자산관리사 / WM",
    quote: "편향적이지 않은 올바른 금융지식 전달을 추구합니다.",
    image: "/images/members/an-jaeseong.jpg",
    career: [
      "브릿지 자산관리 WM",
      "금융 큐레이션 서비스 라이피트 대표 (Since 2015)",
      "미래에셋증권 FA",
      "W에셋 5사업부 지점장",
      "전) 고려대학교 정부행정학부 수료",
      "전) 하나금융투자 FA",
    ],
    certifications: [
      "증권·펀드 투자권유 대행인",
      "FP 자격 (생명·손해)",
      "변액보험 자격",
      "퇴직연금 자격",
      "적격 엔젤투자자",
    ],
    sns: [
      { label: "Blog·YouTube", value: "라이피트(LyFIT)" },
      { label: "Instagram", value: "@lyfit_2015" },
    ],
    intro: [
      "안재성 자산관리사는 금융 큐레이션 서비스를 하면서 재무상담, 보험상담 및 금융 교육, 청소년 진로교육을 하고 있습니다.",
      "단순히 투자, 금융상품 판매에 그치지 않고 고객과의 소통을 통해 꾸준한 동반성장을 누리고자 합니다.",
      "기초적인 금융에 대해 배우고 싶다면 안재성 자산관리사의 도움을 받는 것을 추천드립니다.",
    ],
  },
  {
    slug: "lee-jiyoung",
    name: "이지영",
    nameEn: "Lee Ji-young",
    role: "자산관리사 / WM",
    quote: "고객들과 동반성장하는 자산관리사입니다.",
    image: "/images/members/lee-jiyoung.jpg",
    career: [
      "브릿지 자산관리 WM",
      "전) 인하대학교 화학공학과 졸업",
      "전) 한국엔지니어링플라스틱 연구원",
    ],
    certifications: ["증권투자권유대행인", "펀드투자권유대행인"],
    intro: [
      "이지영 자산관리사는 연구원 출신으로 섬세한 포트폴리오 관리와 진심 어린 상담으로 고객들과 함께하고 있습니다.",
      "자산관리뿐만 아니라 창업 경험을 통해 얻은 인사이트로 투자심사에 참신한 시각을 불어넣어 주고 있습니다.",
      "다양한 분야를 넘나들며 앞으로 성장이 기대되는 자산관리사입니다.",
    ],
  },
  {
    slug: "ko-sinyoung",
    name: "고신영",
    nameEn: "Ko Shin-young",
    role: "자산관리사 / WM",
    quote: "장기적으로 함께 갈 수 있는 파트너입니다.",
    image: "/images/members/ko-sinyoung.jpg",
    career: [
      "브릿지 자산관리 WM",
      "전) 한국 BEP 구매/자재 과장",
      "전) 토탈 코리아 총무과장",
      "전) 국내법인기업 금융센터 영업팀장",
    ],
    certifications: [
      "FP 자격 (생명·손해)",
      "변액보험 자격",
      "펀드 투자권유 대행인",
    ],
    intro: [
      "고신영 자산관리사는 성실하고 진솔하게 고객들의 자산관리를 맡아와 많은 고객들에게서 소개를 받고 오랜 기간 좋은 관계를 구축해 왔습니다.",
      "늘 찾는 고객이 많아 전국으로 출장을 많이 다니십니다. 브릿지 자산관리의 주 상담 지역은 서울과 수도권이지만, 고신영 자산관리사는 먼 지역에서도 고객이 찾는다면 꼭 찾아가 상담을 해주십니다.",
    ],
  },
];

export function getMember(slug: string) {
  return members.find((m) => m.slug === slug);
}

export const recruit = {
  role: "자산관리사 / WM",
  quote: "인성과 실력을 겸비한 자산관리사를 찾습니다.",
  image: "/images/members/recruit.jpg",
};
