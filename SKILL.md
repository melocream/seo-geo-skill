---
name: seo-geo-full
description: Use when adding SEO + GEO (Generative Engine Optimization) foundation to a Next.js 14+ App Router project. Generates lib/schema.ts (Service/ItemList/FAQPage builders), lib/faq-schema.ts, app/sitemap.ts (dynamic with hreflang), app/robots.ts, layout.tsx Organization/WebSite/ContactPoint JSON-LD, and docs/GEO_GUIDE.md. Optimizes for both classic search (Google/Bing/Naver) and AI answer engines (Google AI Overview/Perplexity/ChatGPT/Claude). User then sets NEXT_PUBLIC_SITE_URL and submits sitemap to Search Console.
---

# SEO + GEO Full Foundation — Skill Workflow

When invoked, this skill installs a production-grade SEO + GEO foundation into a Next.js App Router project.

## Pre-flight Checks

Before touching files:

1. **Project is Next.js 14+ App Router** — `next.config.ts` + `app/` directory
2. **TypeScript** — `tsconfig.json` exists
3. **No conflicts** — `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts` don't exist (or user wants to replace)
4. **Locale strategy** — i18n routing exists (e.g., next-intl)? If yes, sitemap will be dual-locale. If not, simplify.

Ask user for:
- Company name (e.g., "Hypemarc")
- Primary domain (e.g., "https://www.hypemarc.com") — **use the www version** to avoid redirect loops
- Office address — or "service-area business" if no physical office
- Contact email + phone
- Locales (default: just `['en']` — but ask)

## Workflow

### Step 1 — Copy core templates

| Skill file | Destination | Note |
|---|---|---|
| `templates/lib/schema.ts` | `lib/schema.ts` | Service/ItemList builders |
| `templates/lib/faq-schema.ts` | `lib/faq-schema.ts` | FAQPage builder |
| `templates/app/sitemap.ts` | `app/sitemap.ts` | Customize `pages` array |
| `templates/app/robots.ts` | `app/robots.ts` | Standard allow/disallow |
| `templates/docs/GEO_GUIDE.md` | `docs/GEO_GUIDE.md` | Reference |

### Step 2 — Customize sitemap.ts

In `app/sitemap.ts`, replace the `pages` array with the user's actual pages.

If the project has `lib/blog.ts` with `getAllPosts()`, keep the blog post iteration. Otherwise remove that block.

If the project is not i18n, remove the locale loop and use a flat structure.

### Step 3 — Add Organization JSON-LD to layout

Open the root layout (`app/layout.tsx` or `app/[locale]/layout.tsx`) and inject the JSON-LD from `templates/app/[locale]/layout.tsx.example`, replacing:
- `Hypemarc` → user's company name
- Domain in `@id` and `url` → user's domain
- `description` → user's tagline
- ContactPoint email/phone → user's
- PostalAddress → user's (or remove if service-area business)

### Step 4 — Add metadata to root layout

If the layout doesn't have `generateMetadata`, create one with:
- title template
- description
- openGraph
- alternates (canonical + hreflang)
- robots (index: true, follow: true)

See `templates/app/[locale]/layout.tsx.example` for the full pattern.

### Step 5 — Add env vars to `.env.example`

```
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

### Step 6 — Verify build

```bash
npm run build
```

Check that `sitemap.xml` and `robots.txt` are listed in the route output.

### Step 7 — Report

> Done. SEO + GEO foundation installed:
>
> - `lib/schema.ts` + `lib/faq-schema.ts` — Schema.org builders
> - `app/sitemap.ts` + `app/robots.ts` — auto-generated
> - Layout updated with Organization + WebSite + ContactPoint + PostalAddress JSON-LD
> - `docs/GEO_GUIDE.md` — strategy reference
>
> Next steps:
> 1. Add `NEXT_PUBLIC_SITE_URL=https://www.yoursite.com` to env
> 2. Deploy
> 3. Submit `https://www.yoursite.com/sitemap.xml` to:
>    - Google Search Console (Sitemaps tab)
>    - Naver Search Advisor (사이트맵 제출)
> 4. Validate any page at https://search.google.com/test/rich-results to confirm JSON-LD parses
>
> See `docs/GEO_GUIDE.md` for ongoing content patterns (Answer-first, citable stats, FAQPage on commercial pages).

## Per-page schema additions (when user asks)

After the foundation is in, the user often wants to add schemas to specific pages. Use `lib/schema.ts` builders:

### Service page

```tsx
import { buildServiceSchema } from '@/lib/schema';

const schema = buildServiceSchema({
  path: '/consulting',
  name: 'Consulting Service',
  description: '...',
  serviceType: 'Consulting',
});
```

### List page (cases, products)

```tsx
import { buildItemListSchema } from '@/lib/schema';

const schema = buildItemListSchema({
  path: '/cases',
  name: 'Case Studies',
  items: cases,
  mapItem: (c) => ({
    item: {
      '@type': 'CreativeWork',
      name: c.title,
      url: `https://...${c.slug}`,
    },
  }),
});
```

### FAQ section

```tsx
import { generateFAQSchema } from '@/lib/faq-schema';

const faqSchema = generateFAQSchema([
  { question: '...', answer: '...' },
]);
```

Always render the schema as:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

## Safety

- **Never** hardcode customer-specific data (names, addresses) — always parameterize
- **Always** use the `www` form of the primary domain (matches Vercel/most CDN defaults; redirect loops happen if root + www both claim primary)
- **Don't** add schemas with empty `description` or `name` — incomplete schemas can be penalized
- **Don't** invent schemas that don't match the page content (e.g., FAQPage with no actual FAQ section visible to humans)
