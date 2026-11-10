// Génère public/sitemap.xml depuis content/ : une entrée par page et par langue,
// avec hreflang limité aux langues où la page existe. Lancé avant le build.
import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://docs.fluenzr.co'
const LOCALES = ['fr', 'en', 'es', 'pt', 'ja', 'hi']

function walk(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : []
  })
}

// "content/fr/1.getting-started/2.quick-start.md" -> "getting-started/quick-start" ; "1.index.md" -> dossier
function slugOf(locale, file) {
  const rel = file.slice(join(root, 'content', locale).length + 1).replace(/\.md$/, '')
  const parts = rel.split('/').map(p => p.replace(/^\d+\./, ''))
  if (parts[parts.length - 1] === 'index') parts.pop()
  return parts.join('/')
}

const pages = new Map() // slug -> Set(locale)
for (const l of LOCALES) {
  for (const f of walk(join(root, 'content', l))) {
    const s = slugOf(l, f)
    if (!s) continue
    if (!pages.has(s)) pages.set(s, new Set())
    pages.get(s).add(l)
  }
}

const url = (l, suffix) => `${BASE}${(l === 'fr' ? '' : '/' + l) + suffix || '/'}`
const entries = [{ suffix: '', langs: new Set(LOCALES), priority: '1.0' }]
for (const [slug, langs] of [...pages].sort((a, b) => a[0].localeCompare(b[0]))) {
  entries.push({ suffix: `/docs/${slug}`, langs, priority: '0.8' })
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
for (const e of entries) {
  const alts = LOCALES.filter(l => e.langs.has(l))
  for (const l of alts) {
    xml += `  <url>\n    <loc>${url(l, e.suffix)}</loc>\n`
    for (const a of alts) xml += `    <xhtml:link rel="alternate" hreflang="${a}" href="${url(a, e.suffix)}"/>\n`
    if (e.langs.has('fr')) xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('fr', e.suffix)}"/>\n`
    xml += `    <changefreq>weekly</changefreq>\n    <priority>${e.priority}</priority>\n  </url>\n`
  }
}
xml += '</urlset>\n'
writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(`sitemap.xml : ${entries.reduce((n, e) => n + e.langs.size, 0)} URL`)
