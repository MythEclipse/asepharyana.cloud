import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://asepharyana.my.id',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://asepharyana.my.id/about',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
    },
    {
      url: 'https://asepharyana.my.id/contact',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5
    }
  ];
}
