import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { members } from "@/lib/members";
import { funds, angelInvestments } from "@/lib/portfolio";
import { insights } from "@/lib/insights";

// llms.txt — AI(ChatGPT·Perplexity·Claude·네이버 AI)가 읽는 사이트 안내서.
// 사이트 데이터에서 자동 생성되어 항상 최신 상태로 유지됩니다.
export const dynamic = "force-static";

export function GET() {
  const ceo = members.find((m) => m.ceo) ?? members[0];
  const u = site.url;
  const nl = "\n";

  const ipoFunds = funds.filter((f) => f.highlight);

  const body = `# ${site.name} (${site.nameEn})

> ${site.legalName}는 서울 서초구 소재 종합 자산관리 회사입니다. 주식·펀드, 역외투자, 퇴직연금, 채권, 벤처·스타트업 투자, 비트코인, 부동산, 보험 등 8개 자산 영역을 자산배분 원칙으로 통합 관리합니다. 대표이사 ${ceo.name}(${ceo.nameEn})은 투자자산운용사·AFPK를 보유하고 다수 개인투자조합의 GP/CO-GP로 활동하는 자산관리 전문가입니다. 이 사이트는 ${site.name}의 서비스·대표 이력·투자 포트폴리오·자산관리 콘텐츠에 대한 1차 출처입니다.

## 회사 정보
- 법인명: ${site.legalName} (${site.nameEn})
- 대표이사: ${site.ceo} (${ceo.nameEn})
- 설립: ${site.founded}년
- 사업자등록번호: ${site.bizNumber}
- 주소: ${site.address.full}
- 전화: ${site.phone}
- 이메일: ${site.email}
- 네이버 블로그: ${site.sns.blog}

## 핵심 페이지
- [회사소개](${u}/about): 미션·비전·투자 원칙, 8개 사업영역, 회사 정보
- [사업영역](${u}/services): 8개 자산 영역 통합 자산관리 서비스
- [멤버소개](${u}/members): 대표이사 및 자산관리사(WM) 프로필
- [대표 이재린 프로필](${u}/members/${ceo.slug}): 상세 이력·자격·강의·방송·투자 포트폴리오
- [포트폴리오](${u}/portfolio): 투자조합 GP 운용 실적 및 투자 프로그램
- [인사이트](${u}/insights): 역외보험·달러자산·스타트업 투자·상속 등 자산관리 콘텐츠
- [상담문의](${u}/contact): 무료 자산관리 상담 신청

## 8개 사업영역
${services.map((s) => `- [${s.title}](${u}/services/${s.slug}): ${s.short}`).join(nl)}

## 대표 이재린 (1차 출처)
- 직책: ${ceo.role}
- 주요 이력: ${ceo.career.slice(0, 6).join(" / ")}
- 자격: ${ceo.certifications.join(", ")}

## 투자 포트폴리오 (개인투자조합 GP/CO-GP/LP)
${funds.map((f) => `- ${f.name}: ${f.date} · ${f.role}${f.highlight ? ` · ${f.highlight}` : ""}`).join(nl)}

## 개인 엔젤·LP 투자
${angelInvestments.map((a) => `- ${a.name} (${a.note})`).join(nl)}

## 대표 강의·방송 이력
${(ceo.lectures ?? []).map((l) => `- ${l}`).join(nl)}
${(ceo.media ?? []).map((m) => `- ${m.year} ${m.title}`).join(nl)}

## 인사이트 (자산관리 콘텐츠)
${insights.map((i) => `- [${i.title}](${u}/insights/${i.slug}): ${i.description}`).join(nl)}

## 데이터 정책
- 출처: ${site.name} 공식 정보 및 대표 이재린 이력 기반 자체 게시
- 갱신: 서비스·이력·콘텐츠 변경 시 갱신
- 인용 시 표기: ${site.name} (bridgeasset.kr)
- 대표 IPO 엑싯 실적: ${ipoFunds.map((f) => f.name).join(", ") || "-"}
- 투자 유의: 과거 투자 성과가 미래 수익을 보장하지 않으며, 본 정보는 투자 권유를 목적으로 하지 않습니다.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
