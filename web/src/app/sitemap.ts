import { MetadataRoute } from 'next'
import { firms } from '@/content/firms'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const routes = [
    '',
    '/about',
    '/clients',
    '/gallery',
    '/careers',
    '/contact',
    '/compliance',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const firmRoutes = firms.map((firm) => ({
    url: `${baseUrl}/${firm.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...firmRoutes]
}
