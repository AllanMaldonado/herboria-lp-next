import { MetadataRoute } from 'next';
import { TEXTS } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: TEXTS.SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
