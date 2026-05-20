# SEO + GEO 풀태깅 스킬

> Next.js 14+ App Router 프로젝트에 **15분 안에** SEO + GEO (Generative Engine Optimization) 인프라를 박아주는 Claude Code 스킬 + 드롭인 템플릿.

- Schema.org JSON-LD 빌더 (Organization, Service, SoftwareApplication, FAQPage, Article, ItemList)
- Sitemap.xml + robots.txt 자동 생성
- 모든 페이지에 hreflang + canonical URL
- GEO 패턴 (Answer-first, FAQPage, E-E-A-T) 내장
- 완전한 `GEO_GUIDE.md` 레퍼런스 문서

실제 운영 사이트 [Hypemarc Website](https://www.hypemarc.com) 에서 검증한 패턴을 그대로 추출했습니다.

🇺🇸 English version: [README_EN.md](./README_EN.md)

---

## 무엇이 들어있나

```
seo-geo-skill/
├── README.md                                ← 지금 보고 계신 파일
├── README_EN.md                             ← 영어 버전
├── SKILL.md                                 ← Claude Code 스킬 정의
├── templates/
│   ├── lib/
│   │   ├── schema.ts                        ← 재사용 Schema.org 빌더
│   │   └── faq-schema.ts                    ← FAQPage 헬퍼
│   ├── app/
│   │   ├── sitemap.ts                       ← 동적 사이트맵 (hreflang 포함)
│   │   ├── robots.ts                        ← Allow + 사이트맵 참조
│   │   └── [locale]/
│   │       └── layout.tsx.example           ← Org + WebSite + ContactPoint + Address JSON-LD
│   └── docs/
│       └── GEO_GUIDE.md                     ← 전략·측정 가이드
├── examples/
│   ├── README.md
│   └── page-schema-examples.tsx             ← 페이지별 Service/FAQ/ItemList 패턴
└── LICENSE                                  ← MIT
```

---

## 왜 이 스킬을 쓰나

| 스킬 없이 | 스킬 사용 시 |
|---|---|
| `<meta>` 태그를 페이지마다 직접 작성 | 타입 안전 Metadata API + 재사용 Schema.org 빌더 |
| hreflang, canonical 빠뜨림 | layout + 페이지별 Metadata 에 자동 포함 |
| 어떤 schema 를 써야 할지 헷갈림 | `lib/schema.ts` 에 Service, ItemList, SoftwareApplication, FAQPage 빌더 준비됨 |
| AI 답변 엔진 (Perplexity, ChatGPT, Google AI Overview) 이 콘텐츠 추출 불가 | FAQPage + Answer-first 패턴 + E-E-A-T 신호 기본 내장 |
| sitemap.xml 누락·잘못된 도메인 | 페이지 배열 + 블로그 글 동적 스캔 |

---

## 왜 "SEO + GEO" 인가?

**SEO** = Search Engine Optimization (Google·Bing·Naver 전통 검색 순위)
**GEO** = Generative Engine Optimization (Google AI Overview·Perplexity·ChatGPT·Claude 답변 엔진 인용)

두 영역은 같은 기반 (schema.org, hreflang, 구조화된 콘텐츠) 을 공유하지만, GEO 는 다음을 강조:

1. **Answer-first** 콘텐츠 구조 — 첫 문단에 핵심 답변
2. **FAQPage 스키마** — AI 가 직접 추출
3. **인용 가능한 통계** — 구체적 숫자 + 출처
4. **E-E-A-T 신호** — 저자, 날짜, 조직

이 스킬은 두 가지 모두 만족하는 템플릿을 제공합니다. 전략은 `templates/docs/GEO_GUIDE.md` 에 정리됨.

> **Google 공식 가이드 100% 정렬** — 본 스킬의 모든 권장사항은 [Google AI Optimization Guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) 의 8가지 권장사항과 정확히 일치합니다. *"하지 말 것"* 5가지도 포함.

---

## 빠른 시작 (수동 설치)

### 1. 템플릿 복사

```bash
cp templates/lib/schema.ts                   your-project/lib/schema.ts
cp templates/lib/faq-schema.ts               your-project/lib/faq-schema.ts
cp templates/app/sitemap.ts                  your-project/app/sitemap.ts
cp templates/app/robots.ts                   your-project/app/robots.ts
cp templates/docs/GEO_GUIDE.md               your-project/docs/GEO_GUIDE.md
```

### 2. 루트 레이아웃에 JSON-LD 추가

`templates/app/[locale]/layout.tsx.example` 을 참고하여 기존 레이아웃에 Organization + WebSite JSON-LD 를 병합 (Hypemarc 자리에 본인 회사명, 주소 정보 교체).

### 3. sitemap.ts 커스터마이징

`app/sitemap.ts` 의 `pages` 배열 수정:
```ts
const pages = ['', '/about', '/products', '/contact'];
```

### 4. 페이지별 스키마 추가 (선택, 권장)

`lib/schema.ts` 빌더를 어떤 페이지에서든 사용:

```tsx
// app/products/page.tsx
import { buildServiceSchema } from '@/lib/schema';

export default async function ProductsPage() {
  const schema = buildServiceSchema({
    path: '/products',
    name: 'Our Service',
    description: '...',
    serviceType: '...',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      ...
    </>
  );
}
```

### 5. `NEXT_PUBLIC_SITE_URL` 설정

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.yoursite.com
```

### 6. 끝

`sitemap.xml` 을 Google Search Console + Naver Search Advisor 에 제출. AI 답변 엔진(Perplexity, ChatGPT)은 1-2주 안에 구조화 콘텐츠를 잡기 시작합니다.

---

## Claude Code 스킬로 사용하기

```
You: /seo-geo-full
Claude: Next.js 프로젝트에 SEO + GEO 기반을 설치하겠습니다.
        - 회사명?
        - 대표 도메인?
        - 사무실 주소 (또는 "서비스 지역 비즈니스")?
You: Hypemarc / https://www.hypemarc.com / 서울 송파구
Claude: [schema.ts, sitemap.ts, robots.ts, layout JSON-LD, GEO_GUIDE.md 자동 생성]
       완료. .env.example 에 NEXT_PUBLIC_SITE_URL 추가됨.
```

---

## 기본 제공 스키마 빌더

| 빌더 | 사용처 |
|---|---|
| `buildServiceSchema({ path, name, description, ... })` | 서비스 제공 페이지 |
| `buildItemListSchema({ path, name, items, mapItem })` | 목록 페이지 (사례, 포트폴리오, 상품) |
| `generateFAQSchema([{ question, answer }, ...])` | FAQ 섹션 — AI 답변 직접 추출 |

추가로 `templates/app/[locale]/layout.tsx.example` 에 복사용 예시:
- **Organization** + ContactPoint + PostalAddress
- **WebSite**
- **SoftwareApplication** (SaaS 제품용)
- **Article** (블로그 포스트용)

---

## GEO 5원칙 (기본 내장)

1. **Answer-first** — 모든 페이지·블로그 첫 1-2문장에 핵심 답변 (`GEO_GUIDE.md` 참조)
2. **Schema.org JSON-LD** — 모든 페이지에 구조화 데이터
3. **인용 가능한 통계** — 구체적 숫자 + 출처 (템플릿이 표기 방법 제시)
4. **E-E-A-T 신호** — 블로그마다 저자·날짜·조직 명시
5. **FAQPage** — 모든 커머셜 페이지(Service, Product, Pricing) 에 권장

전략 + 측정 가이드는 `templates/docs/GEO_GUIDE.md` 에서.

---

## ❌ Google이 *하지 말라* 고 한 5가지 (가이드에 포함됨)

| 하지 말 것 | 이유 |
|---|---|
| **LLMs.txt 같은 "AI 전용" 파일 만들지 말 것** | Google: *"no special files for AI."* AI 시스템이 안 읽음 |
| **콘텐츠를 잘게 자르지 말 것** | Google: *"AI 위해 콘텐츠 잘게 자를 필요 없음."* 자연스럽게 작성 |
| **AI 전용으로 콘텐츠 다시 쓰지 말 것** | Google: *"AI 시스템 위해서 콘텐츠 다시 쓰지 말 것."* 사람용 한 페이지가 둘 다 충족 |
| **가짜 mention 만들지 말 것** | 인위적 백링크·mention 은 스팸으로 잡힘. 진짜 가치로 진짜 mention |
| **Long-tail 변형 과집중** | AI 가 동의어·의도 이해. 좋은 한 페이지 ≫ 비슷한 열 페이지 |

---

## 안전 / 기본값

| 시나리오 | 동작 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` 비어있음 | `https://www.example.com` placeholder 로 폴백 (소스에서 즉시 발견 가능) |
| 페이지 metadata 누락 | 루트 layout 의 `title.template` 과 `description` 상속 |
| Schema 검증 | 배포 후 [Google Rich Results Test](https://search.google.com/test/rich-results) 로 검증 |

---

## 의도적으로 *포함 안 함* (스코프 명확)

- ❌ Open Graph 이미지 생성 — 본인 `og-default.png` 직접 제공
- ❌ 블로그 콘텐츠 관리 — 별도 영역 (다른 스킬에 MDX 템플릿 있음)
- ❌ Google Search Console / Naver Search Advisor 계정 셋업 — 수동 1회 작업, `GEO_GUIDE.md` 에 문서화
- ❌ Bing Webmaster Tools — 필요 시 수동 추가

---

## 버전 정보

- **v1.0** (2026-05) — Hypemarc Website 에서 첫 추출
- **v1.1** (2026-05) — Google AI Optimization Guide 와 정렬 (8개 갭 보강)
- 대상: Next.js 14+ (App Router) + TypeScript

---

## 관련 스킬

- **GA4 풀태깅 스킬** — [ga4-full-tagging-skill](https://github.com/melocream/ga4-full-tagging-skill) 과 함께 쓰면 *분석 + 검색* 완전한 기반 구성.

---

## 라이선스

MIT. 상업·개인 프로젝트 모두 자유롭게 사용 가능.
