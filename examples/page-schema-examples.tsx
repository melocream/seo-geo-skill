/**
 * Per-page Schema.org JSON-LD examples.
 *
 * Drop the matching pattern into your app/[route]/page.tsx to enrich
 * that specific page with structured data for SEO + GEO.
 *
 * See ../templates/docs/GEO_GUIDE.md for strategy.
 */
import { buildServiceSchema, buildItemListSchema } from '@/lib/schema';
import { generateFAQSchema } from '@/lib/faq-schema';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com';

// ─────────────────────────────────────────────────────────
// 1. Service page (consulting, agency offering, SaaS product line)
// ─────────────────────────────────────────────────────────
function ServicePageExample() {
  const schema = buildServiceSchema({
    path: '/consulting',
    name: '컨설팅 서비스',
    description: '...',
    serviceType: '비즈니스 컨설팅',
    areaServed: ['KR', 'GLOBAL'],
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// 2. Service + OfferCatalog (multi-tier pricing)
// ─────────────────────────────────────────────────────────
function ServiceWithPricingExample() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/pricing#service`,
    name: 'YourProduct',
    provider: { '@id': `${BASE_URL}/#organization` },
    description: '...',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pricing Plans',
      itemListElement: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Pro', price: '19', priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '19', priceCurrency: 'USD', unitText: 'MONTH' } },
        { '@type': 'Offer', name: 'Team', price: '29', priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: '29', priceCurrency: 'USD', unitText: 'USER/MONTH' } },
        { '@type': 'Offer', name: 'Enterprise', description: 'Custom quote' },
      ],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─────────────────────────────────────────────────────────
// 3. ItemList (cases, portfolio, products)
// ─────────────────────────────────────────────────────────
function ItemListExample() {
  const cases = [
    { id: 'case1', title: '사례 1' },
    { id: 'case2', title: '사례 2' },
  ];

  const schema = buildItemListSchema({
    path: '/cases',
    name: 'Case Studies',
    items: cases,
    mapItem: (c) => ({
      item: {
        '@type': 'CreativeWork',
        '@id': `${BASE_URL}/cases#${c.id}`,
        name: c.title,
        url: `${BASE_URL}/cases`,
      },
    }),
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─────────────────────────────────────────────────────────
// 4. FAQPage — recommended on every commercial page
// ─────────────────────────────────────────────────────────
function FAQExample() {
  const schema = generateFAQSchema([
    { question: '얼마인가요?', answer: '플랜별 가격은 ...' },
    { question: '얼마나 걸리나요?', answer: '평균 4-8주 ...' },
    { question: '환불 정책은?', answer: '...' },
  ]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─────────────────────────────────────────────────────────
// 5. SoftwareApplication (for SaaS product pages)
// ─────────────────────────────────────────────────────────
function SoftwareAppExample() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YourProduct',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows, Linux',
    description: '...',
    url: `${BASE_URL}/product`,
    offers: {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'USD',
    },
    featureList: ['Feature 1', 'Feature 2', 'Feature 3'],
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─────────────────────────────────────────────────────────
// 6. Article (blog post)
// ─────────────────────────────────────────────────────────
function ArticleExample({
  title,
  description,
  slug,
  date,
  author,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ─────────────────────────────────────────────────────────
// 7. Multiple schemas on one page (@graph pattern)
// ─────────────────────────────────────────────────────────
function MultiSchemaExample() {
  const serviceSchema = buildServiceSchema({
    path: '/consulting',
    name: '...',
    description: '...',
  });
  const faqSchema = generateFAQSchema([{ question: '...', answer: '...' }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export {
  ServicePageExample,
  ServiceWithPricingExample,
  ItemListExample,
  FAQExample,
  SoftwareAppExample,
  ArticleExample,
  MultiSchemaExample,
};
