// Schema.org JSON-LD builders — reusable helpers for GEO/SEO.
// See docs/GEO_GUIDE.md for the strategy behind these.

const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hypemarc.com';

export function buildServiceSchema(opts: {
  baseUrl?: string;
  path: string;
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  const baseUrl = opts.baseUrl ?? DEFAULT_BASE_URL;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}${opts.path}#service`,
    name: opts.name,
    provider: { '@id': `${baseUrl}/#organization` },
    description: opts.description,
    serviceType: opts.serviceType,
    areaServed: opts.areaServed ?? ['KR', 'GLOBAL'],
    url: `${baseUrl}${opts.path}`,
  };
}

export function buildItemListSchema<T>(opts: {
  baseUrl?: string;
  path: string;
  name: string;
  items: T[];
  mapItem: (item: T, idx: number) => Record<string, unknown>;
}) {
  const baseUrl = opts.baseUrl ?? DEFAULT_BASE_URL;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${baseUrl}${opts.path}#itemlist`,
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      ...opts.mapItem(item, idx),
    })),
  };
}
