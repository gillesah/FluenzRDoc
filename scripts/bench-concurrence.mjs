// Banc anti-404 sous concurrence. Lancer : node scripts/bench-concurrence.mjs [http://127.0.0.1:3199] [nbChemins=72]
// Prérequis : npm run build, puis PORT=3199 NODE_ENV=production node .output/server/index.mjs (jamais contre la production).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const base = process.argv[2] || 'http://127.0.0.1:3199'
const want = Number(process.argv[3] || 72)
if (/docs\.fluenzr\.co/.test(base)) { console.error('Refus : pas de charge contre la production'); process.exit(2) }

const xml = readFileSync(fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)), 'utf8')
const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const langs = ['fr', 'en', 'es', 'pt', 'ja', 'hi']
const langOf = p => langs.find(l => p === `/${l}` || p.startsWith(`/${l}/`)) || 'fr'
const byLang = Object.fromEntries(langs.map(l => [l, all.filter(p => langOf(p) === l && p.includes('/docs/'))]))
const per = Math.ceil(want / langs.length)
const paths = langs.flatMap(l => byLang[l].filter((_, i, a) => i % Math.max(1, Math.floor(a.length / per)) === 0).slice(0, per))
paths.push('/', '/en')

async function hit(p) {
  const t = Date.now()
  try {
    const r = await fetch(base + p, { redirect: 'manual' })
    const body = await r.text()
    return { p, s: r.status, ms: Date.now() - t, ok: r.status === 200 && /<h1/.test(body) }
  } catch { return { p, s: 0, ms: Date.now() - t } }
}
async function pass(conc) {
  const q = [...paths].sort(() => Math.random() - 0.5), res = []
  await Promise.all(Array.from({ length: conc }, async () => { while (q.length) res.push(await hit(q.pop())) }))
  return res
}
let bad = 0
console.log(`${paths.length} chemins`)
for (const conc of [1, 10, 20]) {
  for (let i = 1; i <= (conc === 1 ? 1 : 3); i++) {
    const r = await pass(conc), c = {}
    r.forEach(x => c[x.s] = (c[x.s] || 0) + 1)
    const avg = Math.round(r.reduce((a, x) => a + x.ms, 0) / r.length)
    console.log(`conc=${conc} passe=${i} statuts=${JSON.stringify(c)} sans_h1=${r.filter(x => x.s === 200 && !x.ok).length} moy_ms=${avg}`)
    bad += r.filter(x => x.s !== 200).length
  }
}
for (const p of ['/docs/n-existe-pas', '/en/docs/nope/nope']) {
  const r = await hit(p); console.log(`inexistante ${p} -> ${r.s}`); if (r.s !== 404) bad++
}
console.log(bad === 0 ? 'OK' : `ECHEC : ${bad} anomalies`)
process.exit(bad === 0 ? 0 : 1)
