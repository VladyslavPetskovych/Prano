// Пререндеринг: після `vite build` відкриває кожну публічну сторінку в headless Chrome
// і зберігає готовий HTML у dist/<шлях>/index.html. Пошуковики й соцмережі отримують
// повний контент і мета-теги без виконання JavaScript. У браузері React рендерить
// сторінку заново поверх цього HTML, як і раніше.
//
// Chrome шукається за змінною CHROME_PATH або у стандартних місцях.
// Якщо Chrome немає — скрипт пропускає пререндеринг, сайт працює як звичайна SPA.

import http from 'http'
import { existsSync } from 'fs'
import { readFile, writeFile, mkdir, stat } from 'fs/promises'
import path from 'path'
import puppeteer from 'puppeteer-core'
import { STATIC_ROUTES, fetchBlogRoutes } from './routes.js'

const DIST = path.resolve('dist')
const PORT = 4789

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)

// Аналітика не повинна запускатися під час збірки й потрапляти в HTML
const BLOCKED_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'doubleclick.net',
  'ahrefs.com',
  'contentsquare.net',
]
const BLOCKED_TYPES = new Set(['image', 'media', 'font'])

// Текст, що означає: дані не завантажились — таку сторінку не зберігаємо
const ERROR_MARKERS = [
  'Адреси тимчасово недоступні',
  'Failed to fetch',
  'Blog post not found',
  'Статтю не знайдено',
]
const LOADING_MARKERS = ['Завантаження', 'Loading']

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

const PRELOADER = '<div id="preloader"><div class="spinner"></div></div>'

const chromePath = CHROME_CANDIDATES.find((p) => existsSync(p))
if (!chromePath) {
  console.warn('⚠️  Chrome не знайдено — пререндеринг пропущено (задайте CHROME_PATH).')
  process.exit(0)
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf-8')
// Порожня оболонка SPA для сторінок без пререндерингу (кабінет, нові статті тощо)
await writeFile(path.join(DIST, 'spa.html'), template)

// Скрипти, які є в шаблоні. Усе інше додано під час рендеру і буде видалено.
const templateScripts = [...template.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
const allowedSrcs = templateScripts
  .map(([, attrs]) => /\ssrc="([^"]+)"/.exec(attrs)?.[1])
  .filter(Boolean)
// Порівнюємо без урахування пробілів: браузер нормалізує CRLF у LF
const normalize = (text) => text.replace(/\s+/g, ' ').trim()
const allowedInline = templateScripts
  .filter(([, attrs]) => !/\ssrc=/.test(attrs))
  .map(([, , body]) => normalize(body))

// Сторінки віддаються з шаблону, статичні файли — з dist
const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`)
  const file = path.join(DIST, decodeURIComponent(pathname))
  const ext = path.extname(file)
  try {
    if (ext && file.startsWith(DIST) && (await stat(file)).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(await readFile(file))
      return
    }
  } catch {
    // файла немає — віддаємо шаблон
  }
  res.writeHead(200, { 'Content-Type': MIME['.html'] })
  res.end(template)
})
await new Promise((resolve) => server.listen(PORT, resolve))

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
})

const renderRoute = async (route) => {
  const page = await browser.newPage()
  try {
    await page.setViewport({ width: 1366, height: 900 })
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      const { hostname } = new URL(request.url())
      const isSubframe = request.isNavigationRequest() && request.frame() !== page.mainFrame()
      if (
        BLOCKED_TYPES.has(request.resourceType()) ||
        BLOCKED_HOSTS.some((host) => hostname.endsWith(host)) ||
        isSubframe
      ) {
        request.abort()
      } else {
        request.continue()
      }
    })

    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    })

    // Чекаємо, поки зникнуть індикатори завантаження та прелоадер
    await page.waitForFunction(
      (markers) => {
        const root = document.getElementById('root')
        const text = root?.innerText || ''
        return (
          !document.getElementById('preloader') &&
          text.length > 100 &&
          !markers.some((m) => text.includes(m))
        )
      },
      { timeout: 30000 },
      LOADING_MARKERS
    )
    await new Promise((r) => setTimeout(r, 500))

    const text = await page.$eval('#root', (el) => el.innerText)
    const failed = ERROR_MARKERS.find((m) => text.includes(m))
    if (failed) throw new Error(`на сторінці помилка: "${failed}"`)

    await page.evaluate(
      (srcs, inline) => {
        document.querySelectorAll('script').forEach((script) => {
          if (script.type === 'application/ld+json') return
          const src = script.getAttribute('src')
          const text = script.textContent.replace(/\s+/g, ' ').trim()
          const keep = src ? srcs.includes(src) : inline.includes(text)
          if (!keep) script.remove()
        })
        document.body.classList.remove('loading')
      },
      allowedSrcs,
      allowedInline
    )

    let html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
    // Повертаємо прелоадер, щоб у браузері поведінка лишилась як раніше
    html = html.replace('<div id="root">', `${PRELOADER}<div id="root">`)

    const outDir = path.join(DIST, route)
    await mkdir(outDir, { recursive: true })
    await writeFile(path.join(outDir, 'index.html'), html)
    return true
  } finally {
    await page.close()
  }
}

const routes = [...STATIC_ROUTES, ...(await fetchBlogRoutes())].map((r) => r.url)
let ok = 0
for (const route of routes) {
  try {
    await renderRoute(route)
    ok++
    console.log(`  ✓ ${route}`)
  } catch (e) {
    console.warn(`  ✗ ${route} — пропущено (${e.message.split('\n')[0]})`)
  }
}

await browser.close()
server.close()
console.log(`✅ Пререндеринг: ${ok}/${routes.length} сторінок`)
