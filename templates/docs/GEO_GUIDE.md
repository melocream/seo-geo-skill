# GEO Guide — Generative Engine Optimization for Next.js sites

> Strategy + practical patterns for being cited by AI answer engines (Google AI Overview, Perplexity, ChatGPT Search, Claude Web Search). Aligned with **Google's official AI-features guidance** ([source](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

---

## 1. GEO vs SEO

| | Traditional SEO | GEO |
|---|---|---|
| **Goal** | Rank #1 on the SERP → drive a click | Be cited as a source in the AI answer |
| **Signals** | Keywords, backlinks, CTR | Clarity, structure, citation-worthiness, E-E-A-T |
| **Outcome** | Click = success | Click optional — being *named* in the AI answer is the success |

In the GEO era, *getting cited* in AI answers matters as much as ranking.

---

## 2. Google's Official Position (read this first)

Google's AI Optimization Guide is unambiguous on these points:

> **"There's no special schema.org markup you need to add. Structured data isn't required for generative AI search."**

> **"Don't create LLMs.txt files and other 'special' markup."**

> **"Don't chunk content into tiny pieces."**

> **"Don't rewrite content just for AI systems."**

> **"Foundational SEO best practices continue to be relevant because AI features rely on core Search ranking systems."**

**Translation**: The same fundamentals that work for classic Search — helpful content, crawlability, semantic HTML, structured data for rich results — are what work for AI answers. There is **no separate "AI SEO" channel.**

This guide therefore covers:
1. **Content quality** (Google's #1 emphasis)
2. **Technical fundamentals** (crawl, render, Search Console)
3. **Optional but useful structured data** (helps rich results AND AI extraction)
4. **What NOT to do** (explicit Google prohibitions)
5. **The future** (agentic experiences, UCP)

---

## 3. Five Principles

### Principle 1 — Helpful, original content above all else

Google's foundational requirement. AI answer engines weight *unique, first-hand, expert content* above any structural trick.

**Do:**
- Unique point of view from your team's actual experience
- Specific, citable statistics with sources
- Non-commodity content (avoid "7 Tips for X" filler)

**Don't:**
- Summarize what other sites already say
- Create "scaled content" (one post per keyword variation) — Google's **scaled content abuse policy** treats this as spam

### Principle 2 — Answer-First structure

The first 256-512 tokens of any page or blog post are weighted most heavily by retrieval models.

**Pattern:**
```
H1 / page title
↓
First paragraph: ONE-LINE answer to the page's core question
↓
H2: supporting depth
↓
H3: details
```

Don't bury the answer under three paragraphs of intro.

### Principle 3 — Structured Data (optional but recommended)

Per Google: *"structured data isn't required"* for AI features — but it **does** help:
- Rich results in classic Search
- Faster, more accurate extraction by AI answer engines (Perplexity, ChatGPT cite structured pages more reliably)

This skill ships builders for the schemas that matter most:

| Page type | Schema |
|---|---|
| Root layout | `Organization` + `WebSite` + `ContactPoint` + `PostalAddress` |
| Service/consulting/product | `Service` + `OfferCatalog` |
| List pages (cases, portfolio) | `ItemList` |
| Blog post | `Article` + `Author` + `Publisher` |
| SaaS product | `SoftwareApplication` + `Offer` |
| Any commercial page | `FAQPage` |

Use them where they fit the page's *actual* content. Don't invent FAQs to add a FAQPage schema.

### Principle 4 — E-E-A-T signals

**E**xperience · **E**xpertise · **A**uthoritativeness · **T**rust

On every blog post:
```yaml
---
author: "Your Team"
date: "2026-05-20"
category: "..."
---
```

Plus:
- Cite reputable external sources (vendor docs, academic papers)
- Show author bio / org connection
- Keep dates accurate (update `dateModified` when content changes)

### Principle 5 — FAQs on commercial pages

If your page sells something (a service, product, plan), a short FAQ section makes AI extraction far easier:

```tsx
import { generateFAQSchema } from '@/lib/faq-schema';

const faqSchema = generateFAQSchema([
  { question: 'How much does it cost?', answer: '...' },
  { question: 'How long does setup take?', answer: '...' },
]);
```

These appear directly in Google AI Overview, Perplexity, and ChatGPT answers.

---

## 4. ❌ What NOT to do (Google's explicit prohibitions)

| Don't do this | Why |
|---|---|
| **Create `llms.txt` or other "AI-only" files** | Google: *"no special files for AI."* They aren't read by AI systems. |
| **Chunk content into tiny pieces** | Google: *"no requirement to break content apart for AI comprehension."* Write naturally. |
| **Rewrite the same content with AI-targeted phrasing** | Google: *"don't rewrite content just for AI systems."* Single page, written for humans, works for both. |
| **Manufacture "mentions" across the web** | Inauthentic backlinks/mentions get caught by spam detection. Earn real mentions through real value. |
| **Hyper-target long-tail variations** | AI systems handle synonyms and intent. One good page covering a topic ≫ ten near-duplicates. |
| **Scaled content abuse** (one post per query variation) | Google policy violation. AI answer engines deprioritize spam-flagged domains. |

---

## 5. Technical Fundamentals (also Google's requirements)

### Crawlability
- All pages you want indexed must be reachable by Googlebot, Bingbot, ClaudeBot, GPTBot, etc.
- robots.txt should `Allow: /` for everything except admin/API
- Sitemap.xml submitted to Search Console

(This skill ships `app/sitemap.ts` + `app/robots.ts` with sensible defaults.)

### JavaScript SEO
If your Next.js project uses heavy client-side rendering, ensure:
- Critical content renders server-side (Next.js App Router does this by default)
- Use `<Suspense>` boundaries for content you want crawled
- Test with: https://search.google.com/test/mobile-friendly

### Semantic HTML
Google: *"Use semantic HTML when possible. It improves accessibility AND parsing."*

Prefer:
```tsx
<article>
  <header><h1>Title</h1></header>
  <section>...</section>
  <aside>...</aside>
</article>
```

Over generic `<div>` soup. AI parsing improves measurably.

### Page experience
- Cross-device responsive (Next.js + Tailwind handles this)
- Reduced latency (Vercel edge handles this)
- Clear visual separation of main content from chrome (navigation, footer)

### Search Console verification
**Required step.** Verify your site at https://search.google.com/search-console so you can:
- Submit sitemap.xml
- Monitor crawl errors
- See queries that lead to your pages
- (Eventually) see AI Overview impressions when Google exposes that data

---

## 6. AI Answer Engine — engine-by-engine tips

### Google AI Overview (SGE)
- Schema.org JSON-LD strongly helps (despite Google saying it isn't *required*, structured pages get cited more reliably)
- First 30 words of the page should contain the answer + key entity
- HTTPS + Core Web Vitals green
- Search Console submission is the de facto entry point

### Perplexity / ChatGPT Search
- Citable formats: short paragraphs, definitions, lists, tables
- Extractable facts: stats with dates and sources
- Recent `date` in frontmatter helps freshness ranking

### Anthropic Claude (Web Search via tool use)
- Markdown-friendly structure (H2/H3, lists, tables)
- Correct code blocks (actually-runnable examples)
- Plain language over marketing jargon

---

## 7. Local Businesses + Ecommerce (Google-specific channels)

Per Google's official guidance:

| Channel | Use when |
|---|---|
| **Google Business Profile** | You have a physical location, service area, or any locality-relevant business. Free, high impact. |
| **Merchant Center feeds** | You sell physical products. Even if not e-com, free listings show in Shopping. |
| **Business Agent** (preview) | Conversational interface for customers to chat with your brand on Google. Worth tracking. |

These aren't part of the JSON-LD scope of this skill but **complement** it. Set up a Google Business Profile if you have any local angle.

---

## 8. Agentic Future — prepare now

Google explicitly mentions emerging trends:

> *"AI agents are autonomous systems that can perform tasks. Consider preparing for protocols like Universal Commerce Protocol (UCP) that allow Search agents to do more."*

What this means for you:
- **Browser agents** (Anthropic Computer Use, OpenAI Operator) may navigate your site programmatically. Semantic HTML and clear button labels matter more than ever.
- **MCP (Model Context Protocol)** — for SaaS products, exposing data via MCP servers becomes a competitive advantage (your product is then *actionable* by agents).
- **UCP** — Google is preparing a commerce protocol for AI agents. E-commerce sites should watch for the spec announcement.

This skill ships clean semantic structure as a baseline. Future versions may add MCP/UCP helpers.

---

## 9. Measurement — Did GEO work?

Beyond classic SEO metrics:

| Metric | Where |
|---|---|
| AI Overview citation | Manually search target keywords; check if AI Overview cites your domain |
| Perplexity citation | Search "[your category] [your brand]" on perplexity.ai; check Sources |
| ChatGPT citation | Same, in ChatGPT Search |
| Brand direct traffic | GA4 → Acquisition → Direct + Organic Brand growth |
| Referer from AI tools | GA4 → Acquisition → Referer (some AI tools pass referer) |

Review monthly. AI citation patterns are still evolving — don't expect smooth curves.

---

## 10. Content checklist (GEO-friendly)

For new blog posts or commercial pages:

- [ ] First paragraph contains a one-line answer to the page's core question
- [ ] H2/H3 headers either ask questions or name clear topics (no vague titles)
- [ ] At least one specific statistic with date and source
- [ ] FAQ section (3-6 Q&A pairs) on commercial pages
- [ ] At least one reputable external citation
- [ ] Markdown tables or lists where appropriate
- [ ] Frontmatter `description` summarizes the page in one line
- [ ] Page metadata `title` is a noun phrase with the core keyword
- [ ] Semantic HTML (article, section, aside) used appropriately
- [ ] No "AI-only" rewrites — content is for humans first

---

## 11. References

- **Google AI Optimization Guide (canonical source)** — https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central — https://developers.google.com/search
- Schema.org full vocabulary — https://schema.org/docs/full.html
- GEO academic paper (2023, Aggarwal et al.) — https://arxiv.org/abs/2311.09735
- Anthropic Claude Web Search docs — https://docs.anthropic.com
- Perplexity citation patterns — https://docs.perplexity.ai

---

## TL;DR

1. Write **unique, helpful content** (Google's #1 rule)
2. Make sure pages are **crawlable** with **semantic HTML**
3. Add **structured data** (optional but accelerates AI extraction) — use this skill's builders
4. Verify in **Search Console**, submit **sitemap**
5. **Don't** create AI-only files or chunk content for AI
6. Pair with **Google Business Profile** if local angle
7. Watch for **agentic protocols** (UCP, MCP) as they emerge

The same fundamentals work for SEO and GEO. There is no shortcut.
