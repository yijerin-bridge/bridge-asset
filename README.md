# 브릿지자산관리 홈페이지

주식회사 브릿지 자산관리 공식 홈페이지. Next.js App Router + Tailwind CSS v4.

## 개발

```bash
npm run dev    # 개발 서버 (http://localhost:3000)
npm run build  # 프로덕션 빌드
npm start      # 프로덕션 서버
```

## 구조

- `src/lib/site.ts` — 회사 정보·연락처·SNS·검색엔진 인증 코드 (한 곳에서 관리)
- `src/lib/services.ts` — 8대 서비스 데이터 (여기 수정하면 목록/상세/사이트맵 자동 반영)
- `src/lib/profile.ts` — 대표 프로필·경력·자격·포트폴리오
- `src/lib/jsonld.ts` — 구조화 데이터 (schema.org JSON-LD)
- `src/app/` — 페이지: `/` `/services` `/services/[slug]` `/portfolio` `/about` `/contact`

## SEO 체크리스트 (배포 후 할 일)

1. **구글 서치콘솔** (https://search.google.com/search-console)
   - 속성 추가 → HTML 태그 인증 코드 발급
   - `src/lib/site.ts`의 `verification.google`에 코드 입력 후 재배포
   - `https://bridgeasset.kr/sitemap.xml` 제출
2. **네이버 서치어드바이저** (https://searchadvisor.naver.com)
   - 사이트 등록 → HTML 태그 인증 코드 발급
   - `src/lib/site.ts`의 `verification.naver`에 코드 입력 후 재배포
   - 사이트맵 제출: `https://bridgeasset.kr/sitemap.xml`
   - 웹마스터 도구 → 수집 요청으로 주요 페이지 수동 수집 요청
3. 도메인 연결 시 `https://bridgeasset.kr`이 canonical (www 리다이렉트 설정 권장)

이미 구현된 SEO: 페이지별 메타데이터·canonical, Open Graph/Twitter 카드, 동적 OG 이미지,
sitemap.xml, robots.txt(네이버 Yeti 허용), JSON-LD(FinancialService/WebSite/Person/Service/Breadcrumb/FAQ), manifest.
