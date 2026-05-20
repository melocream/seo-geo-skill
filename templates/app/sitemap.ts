import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hypemarc.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // All static pages in the site
  const pages = [
    '',
    '/agents',
    '/agents/analytics',
    '/agents/automation',
    '/agents/cs',
    '/agents/marketing',
    '/agents/rag',
    '/agents/sales',
    '/marblo',
    '/consulting',
    '/hypemarc-ai',
    '/seo-aio',
    '/marketing',
    '/cases',
    '/blog',
    '/contact',
  ];

  const locales = ['ko', 'en'] as const;

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = locale === 'ko'
        ? `${BASE_URL}${page}`
        : `${BASE_URL}/${locale}${page}`;

      entries.push({
        url,
        lastModified,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.startsWith('/agents/') ? 0.7 : 0.8,
        alternates: {
          languages: {
            'ko-KR': `${BASE_URL}${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }
  }

  // Blog post pages
  for (const locale of locales) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      const blogPath = `/blog/${post.slug}`;
      const url = locale === 'ko'
        ? `${BASE_URL}${blogPath}`
        : `${BASE_URL}/${locale}${blogPath}`;

      entries.push({
        url,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            'ko-KR': `${BASE_URL}${blogPath}`,
            en: `${BASE_URL}/en${blogPath}`,
          },
        },
      });
    }
  }

  return entries;
}
