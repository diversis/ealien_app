import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile/', '/order/'],
    },
    sitemap: 'https://aalien-app.vercel.app/sitemap.xml',
  }
}