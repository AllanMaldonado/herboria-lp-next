import { MetadataRoute } from 'next';
import { TEXTS } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${TEXTS.SITE.url}/sitemap.xml`,
  };
}
