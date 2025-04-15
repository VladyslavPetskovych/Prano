import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const sitemap = new SitemapStream({ hostname: 'https://prano.group' })

const writeStream = createWriteStream('./public/sitemap.xml')

sitemap.pipe(writeStream)

const pages = ['/', '/services', '/price', '/blog', '/contacts']

pages.forEach(url => sitemap.write({ url }))

sitemap.end()

streamToPromise(sitemap).then(() => {
  console.log('✅ sitemap.xml generated')
})
