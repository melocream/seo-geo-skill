# SEO + GEO Full Tagging Skill

> Production-grade SEO + GEO (Generative Engine Optimization) foundation for Next.js 14+ App Router projects.

A reusable Claude Code skill + drop-in templates that give a new Next.js site a complete search foundation in **under 15 minutes**:

- Schema.org JSON-LD builders (Organization, Service, SoftwareApplication, FAQPage, Article, ItemList)
- Sitemap.xml + robots.txt auto-generated
- hreflang + canonical URLs across pages
- GEO patterns (Answer-first, FAQPage, E-E-A-T) baked in
- Complete `GEO_GUIDE.md` reference doc

Extracted from production use at [Hypemarc Website](https://www.hypemarc.com).

---

## What's Inside

```
seo-geo-skill/
├── README.md                                ← You are here
├── SKILL.md                                 ← Claude Code skill definition
├── templates/
│   ├── lib/
│   │   ├── schema.ts                        ← Reusable Schema.org builders
│   │   └── faq-schema.ts                    ← FAQPage helper
│   ├── app/
│   │   ├── sitemap.ts                       ← Dynamic sitemap with hreflang
│   │   ├── robots.ts                        ← Allow + sitemap reference
│   │   └── [locale]/
│   │       └── layout.tsx.example           ← Org + WebSite + ContactPoint + Address JSON-LD
│   └── docs/
│       └── GEO_GUIDE.md                     ← Strategy + measurement guide
├── examples/
│   ├── README.md
│   └── page-schema-examples.tsx             ← Service, FAQ, ItemList per-page patterns
└── LICENSE                                  ← MIT
```

---

## Why use this

| Without this skill | With this skill |
|---|---|
| Hand-write `<meta>` tags per page | Type-safe Metadata API + reusable Schema.org builders |
| Forget hreflang or canonical | Built into layout + per-page Metadata |
| Confused about which schema to use | `lib/schema.ts` has Service, ItemList, SoftwareApplication, FAQPage builders ready |
| AI answer engines (Perplexity, ChatGPT, Google AI Overview) can't extract your content | FAQPage + Answer-first patterns + E-E-A-T signals baked in |
| sitemap.xml missing pages or wrong domain | Centralized sitemap.ts reads pages array + blog posts dynamically |

---

## Why "SEO + GEO"?

**SEO** = Search Engine Optimization (Google·Bing·Naver classic ranking)
**GEO** = Generative Engine Optimization (Google AI Overview·Perplexity·ChatGPT·Claude answer-engine citations)

Both share the same foundation (schema.org, hreflang, structured content), but GEO emphasizes:
1. **Answer-first** content structure (key answer in first paragraph)
2. **FAQPage schema** for direct extraction by AI
3. **Citable statistics** (specific numbers + sources)
4. **E-E-A-T signals** (author, date, organization)

This skill ships templates that satisfy both. See `templates/docs/GEO_GUIDE.md` for the strategy.

---

## Quick Start (manual)

### 1. Copy templates

```bash
cp templates/lib/schema.ts                   your-project/lib/schema.ts
cp templates/lib/faq-schema.ts               your-project/lib/faq-schema.ts
cp templates/app/sitemap.ts                  your-project/app/sitemap.ts
cp templates/app/robots.ts                   your-project/app/robots.ts
cp templates/docs/GEO_GUIDE.md               your-project/docs/GEO_GUIDE.md
```

### 2. Add to root layout JSON-LD

Open `templates/app/[locale]/layout.tsx.example` and merge the Organization + WebSite JSON-LD into your existing layout (replace `Hypemarc` and address details with yours).

### 3. Customize sitemap.ts

Edit the `pages` array in `app/sitemap.ts`:
```ts
const pages = ['', '/about', '/products', '/contact'];
```

### 4. Add per-page schemas (optional but recommended)

Use `lib/schema.ts` builders in any page:

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

### 5. Set `NEXT_PUBLIC_SITE_URL`

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.yoursite.com
```

### 6. Done

Submit `sitemap.xml` to Google Search Console + Naver Search Advisor. AI answer engines (Perplexity, ChatGPT) start picking up structured content within 1-2 weeks.

---

## Quick Start (Claude Code skill)

```
You: /seo-geo-full
Claude: I'll set up SEO + GEO foundation for your Next.js project.
        - Company name?
        - Primary domain?
        - Office address (or "service-area business")?
You: Hypemarc / https://www.hypemarc.com / Seoul Songpa-gu
Claude: [generates schema.ts, sitemap.ts, robots.ts, layout JSON-LD, GEO_GUIDE.md]
       Done. NEXT_PUBLIC_SITE_URL added to .env.example.
```

---

## Schema Builders (out of the box)

| Builder | Use case |
|---|---|
| `buildServiceSchema({ path, name, description, ... })` | Any service-offering page |
| `buildItemListSchema({ path, name, items, mapItem })` | List pages (cases, portfolio, products) |
| `generateFAQSchema([{ question, answer }, ...])` | FAQ sections — direct AI answer extraction |

Plus copy-paste examples in `templates/app/[locale]/layout.tsx.example`:
- **Organization** + ContactPoint + PostalAddress
- **WebSite**
- **SoftwareApplication** (for SaaS products)
- **Article** (for blog posts)

---

## GEO Patterns (5 principles built in)

1. **Answer-first** — Each page/blog opens with the key answer in 1-2 sentences (see `GEO_GUIDE.md`)
2. **Schema.org JSON-LD** — Every page has structured data
3. **Citable statistics** — Specific numbers + sources (templates show how to mark them)
4. **E-E-A-T signals** — Author, date, organization on every blog post
5. **FAQPage** — Recommended on every commercial page (Service, Product, Pricing)

See `templates/docs/GEO_GUIDE.md` for the full strategy + measurement guide.

---

## Safety / defaults

| Scenario | Behavior |
|---|---|
| `NEXT_PUBLIC_SITE_URL` empty | Falls back to `https://www.example.com` placeholder (you'll see it in source — easy to spot) |
| Page metadata missing | Inherits from root layout (`title.template` and `description`) |
| Schema validation | Use [Google Rich Results Test](https://search.google.com/test/rich-results) to validate after deploy |

---

## What's NOT included (intentional scope)

- ❌ Open Graph image generation — bring your own `og-default.png`
- ❌ Blog content management — separate concern (MDX templates available in other skills)
- ❌ Google Search Console / Naver Search Advisor account setup — manual one-time steps documented in `GEO_GUIDE.md`
- ❌ Bing Webmaster Tools — add manually if needed

---

## Versioning

- **v1.0** (2026-05) — Initial extraction from Hypemarc Website
- Built for: Next.js 14+ (App Router) + TypeScript

---

## Related Skills

- **GA4 Full Tagging Skill** — pair this with [ga4-full-tagging-skill](https://github.com/melocream/ga4-full-tagging-skill) for complete analytics + search foundation.

---

## License

MIT. Use freely in commercial and personal projects.
