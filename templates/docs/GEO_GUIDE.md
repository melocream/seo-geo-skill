# GEO 가이드 — Generative Engine Optimization for Hypemarc

> AI 답변 엔진(ChatGPT·Perplexity·Google AI Overview·Claude) 이 사이트 콘텐츠를 *인용·요약·답변에 활용*하도록 구조화하는 모범 사례.

---

## 1. GEO 가 SEO 와 다른 점

| | 전통 SEO | GEO |
|---|---|---|
| **목표** | 검색 결과 페이지 1위 → 클릭 유도 | AI 답변에 *인용 출처* 로 노출 → 노출·신뢰 |
| **신호** | 키워드, 백링크, CTR | 명료성, 구조화, 인용 가능성, E-E-A-T |
| **출처 표시** | meta description, title | *답변 가능한 명시적 문장*, 통계, 권위자 인용 |
| **클릭률** | 클릭 = KPI | 클릭 0 일 수도 (AI가 답변 종결) |

→ GEO 시대엔 *순위* 보다 *AI 답변에 우리 회사 이름이 박히는 빈도* 가 더 중요.

---

## 2. 핵심 원칙 5가지 (사이트에 적용 완료)

### 원칙 1 — Answer-First 구조

각 페이지·블로그 글의 **첫 문단에 핵심 답변** 를 명시. AI 모델은 첫 256-512 토큰을 가장 중요하게 봅니다.

**예시 (블로그 글 `mcp-protocol-explained`):**
```markdown
## 에이전트가 "도구를 가진다" 는 의미

2023년까지 LLM은 본질적으로 텍스트 입출력 함수였습니다.
...
> 비유: USB-C 가 전자기기 케이블의 표준이 된 것처럼,
>       MCP 가 AI 에이전트의 도구 표준이 되고 있다.
```

→ 한 줄로 *MCP가 무엇인지* 정의. AI가 이 한 줄을 그대로 답변에 활용 가능.

### 원칙 2 — 구조화 데이터 (Schema.org JSON-LD)

페이지마다 알맞은 schema 적용 (이미 사이트에 구현됨):

| 페이지 | Schema |
|---|---|
| `/` (홈) | `Organization` + `WebSite` + `ContactPoint` + `PostalAddress` |
| `/marblo` | `SoftwareApplication` + `Offer` |
| `/consulting` | `Service` + `OfferCatalog` + `FAQPage` |
| `/blog/[slug]` | `Article` + `Author` + `Publisher` |
| `/contact` | (옵션) `LocalBusiness` |

→ AI 답변 엔진이 *"무엇을 파는 회사인지", "주소·연락처·가격·FAQ"* 를 즉시 추출.

### 원칙 3 — 인용 가능한 통계·수치

추상적 형용사("매우 빠른") 대신 **구체적 숫자 + 측정 방법** 를 명시.

**좋은 예시 (사례 페이지 `saas1`):**
> 주간 커밋 수 100+
> 기능 PR 사이클 기존 대비 5배

**나쁜 예시:**
> 개발 속도가 훨씬 빨라졌습니다.

→ 숫자가 있어야 AI 답변에 인용됨. 출처(우리 회사)도 함께 노출.

### 원칙 4 — E-E-A-T 신호

**E**xperience · **E**xpertise · **A**uthoritativeness · **T**rust

각 블로그 글에 적용 (이미 frontmatter 에 있음):
```yaml
author: "하이프마크 AI팀"
date: "2026-05-15"
category: "AI Agents"
```

추가로 권장:
- 글마다 "실무 경험 기반" 명시 (예: *"우리 팀이 직접 운영하며 검증한"*)
- 외부 권위 있는 출처 인용 (Anthropic·OpenAI 공식 문서 링크)
- 저자 프로필 페이지 (향후 작업)

### 원칙 5 — FAQ 패턴

**모든 핵심 페이지에 FAQ 섹션 + FAQPage 스키마** 추가 권장.

이미 적용:
- `/consulting` — 6개 FAQ + FAQPage 스키마

향후 추가 권장:
- `/marblo` — "Marblo는 Cursor·Copilot과 어떻게 다른가?" 등 5-6개
- `/agents` — "에이전트 구축 기간/비용/MCP 연동 등" 5-6개

각 FAQ 는 *완전한 한 문장 질문 + 2-4문장 답변* 형식이 AI 답변에 가장 잘 추출됨.

---

## 3. AI 답변 엔진별 최적화 포인트

### Google AI Overview (Search Generative Experience)

- **schema.org JSON-LD 필수**
- 페이지 *첫 화면(above-the-fold)* 에 핵심 답변
- *문장 첫 30단어* 이내에 키워드+답변
- 사이트맵·robots.txt 정상 (✅ 완료)
- HTTPS·Core Web Vitals 양호

### Perplexity / ChatGPT Search

- **외부 인용 가능한 형식** — 짧은 문단, 명확한 정의
- *통계·날짜·이름* 같은 "추출 가능한 정보 조각"
- 출처가 "최근 게시된 글" 인지 (date frontmatter)

### Anthropic Claude (web search via tools)

- *Markdown 친화적 구조* — H2/H3 명확, 리스트·표
- 코드 블록 정확성 (실제 동작하는 예시)
- 모호한 마케팅 카피보다 *기술적 정확성*

---

## 4. 사이트 현황 (2026-05-20 기준)

### ✅ 적용된 GEO 요소

- Organization + ContactPoint + PostalAddress 스키마 (모든 페이지 공통)
- WebSite 스키마 (검색 액션 포함 시 추가 효과)
- Marblo SoftwareApplication + Offer
- Consulting Service + OfferCatalog + FAQPage
- Blog Article + Author + datePublished
- Sitemap.xml + robots.txt
- hreflang (ko-KR, en, x-default)
- 신규 블로그 5편 — Answer-first 구조 + 통계·수치 + Marblo 자연스러운 인용

### 🟡 추가 권장 (향후 작업)

- `/agents` 페이지 — Service + ItemList 스키마
- `/agents/[type]` 6개 페이지 — 각각 Service 스키마
- `/cases` — ItemList + Case 각각 schema
- 각 페이지에 5-6개 FAQ + FAQPage 스키마
- 저자 프로필 페이지 + Person 스키마
- HowTo 스키마 (블로그 단계별 가이드 글에)
- 권위 외부 출처 (Anthropic·OpenAI 공식 문서) 인용 강화
- Google Search Console 등록 + sitemap 제출
- Bing Webmaster Tools 등록 (AI Overview는 Bing 인덱스 기반)

---

## 5. 측정 — 어떻게 GEO 성공을 측정하나?

전통 SEO 지표(순위·CTR) 외에:

| 지표 | 측정 방법 |
|---|---|
| AI 답변 인용 노출 | ChatGPT/Perplexity 에서 "Marblo", "하이프마크" 검색 후 답변에 우리 사이트 인용되는지 모니터링 |
| Google AI Overview 노출 | "AI 에이전트 도입", "이종 모델 오케스트레이션" 등 키워드에 AI Overview 등장 시 우리 글 출처로 나오는지 |
| 브랜드 직접 검색 증가 | GA4 → 획득 → 트래픽 소스 *Direct* + *Organic Brand* 증가율 |
| 인용 트래픽 | Perplexity/ChatGPT referer 트래픽 (있다면) |

월 1회 위 지표 점검 권장.

---

## 6. 새 콘텐츠 작성 체크리스트 (GEO 친화)

블로그 글이나 페이지 작성 시:

- [ ] 첫 문단에 *핵심 답변 한 줄* 명시
- [ ] H2/H3 헤더는 *질문 형식* 또는 *명확한 토픽*
- [ ] 통계·수치 포함 (출처 명시)
- [ ] FAQ 섹션 3-6개 (질문 + 짧은 답변)
- [ ] 권위 외부 출처 1-2개 인용
- [ ] Markdown 표 또는 리스트 활용
- [ ] frontmatter 의 description 이 *그 글의 한 줄 요약*
- [ ] 페이지 metadata 의 title 이 *명사구 + 키워드* (검색·AI 둘 다 친화)

---

## 7. 참고 자료

- [Google Search Central — Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Schema.org 공식 vocabulary](https://schema.org/docs/full.html)
- [GEO 학술 논문 (2023) — Aggarwal et al., "GEO: Generative Engine Optimization"](https://arxiv.org/abs/2311.09735)
- [Anthropic — Claude Web Search docs](https://docs.anthropic.com)
- [Perplexity Citation API](https://docs.perplexity.ai)
