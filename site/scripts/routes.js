// Публічні сторінки сайту — спільний список для sitemap і пререндерингу.
// Нову публічну сторінку треба додати сюди та в PAGES у src/components/utils/seo.jsx.

export const HOSTNAME = 'https://prano.group'

export const STATIC_ROUTES = [
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

// Статті блогу беремо з API. Якщо API недоступне — повертаємо порожній список.
export const fetchBlogRoutes = async () => {
  try {
    const res = await fetch(`${HOSTNAME}/api/posts?page=1&limit=1000`, {
      signal: AbortSignal.timeout(10000),
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
