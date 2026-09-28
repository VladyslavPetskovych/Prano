import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const HOSTNAME = 'https://prano.group'

const pages = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'monthly', priority: 0.9 },
  { url: '/price', changefreq: 'weekly', priority: 0.9 },
  { url: '/contacts', changefreq: 'monthly', priority: 0.8 },
  { url: '/textile', changefreq: 'monthly', priority: 0.7 },
  { url: '/fur', changefreq: 'monthly', priority: 0.7 },
  { url: '/premium', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.6 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.2 },
]

// Статті блогу беремо з API. Якщо API недоступне — sitemap буде без них.
const fetchPosts = async () => {
  try {
    const res = await fetch(`${HOSTNAME}/api/posts?page=1&limit=1000`, {
      signal: AbortSignal.timeout(5000),
    })
    const json = await res.json()
    return (json.data || []).map((post) => ({
      url: `/blog/${post._id}`,
      lastmod: post.updatedAt || post.createdAt,
      changefreq: 'monthly',
      priority: 0.5,
    }))
  } catch (e) {
    console.warn('⚠️  Не вдалося отримати статті блогу:', e.message)
    return []
  }
}

const posts = await fetchPosts()

const sitemap = new SitemapStream({ hostname: HOSTNAME })
sitemap.pipe(createWriteStream('./public/sitemap.xml'))

;[...pages, ...posts].forEach((entry) => sitemap.write(entry))
sitemap.end()

await streamToPromise(sitemap)
console.log(`✅ sitemap.xml generated (${pages.length + posts.length} URLs)`)
