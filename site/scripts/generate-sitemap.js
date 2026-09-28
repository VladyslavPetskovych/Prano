import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { HOSTNAME, STATIC_ROUTES, fetchBlogRoutes } from './routes.js'

const routes = [...STATIC_ROUTES, ...(await fetchBlogRoutes())]

const sitemap = new SitemapStream({ hostname: HOSTNAME })
sitemap.pipe(createWriteStream('./public/sitemap.xml'))

routes.forEach((entry) => sitemap.write(entry))
sitemap.end()

await streamToPromise(sitemap)
console.log(`✅ sitemap.xml generated (${routes.length} URLs)`)
