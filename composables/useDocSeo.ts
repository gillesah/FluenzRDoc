// Canonical, hreflang, lang et og:url propres à chaque page.
// `suffix` est le chemin sans langue (ex. "/docs/api/mcp", ou "" pour l'accueil).
// `available` liste les langues où la page existe : seules celles-là sont déclarées en hreflang.
const BASE = 'https://docs.fluenzr.co'
const ISO: Record<string, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ja: 'ja-JP', hi: 'hi-IN' }

export function docUrl(code: string, suffix: string) {
  const prefix = code === 'fr' ? '' : `/${code}`
  const path = `${prefix}${suffix}`
  return `${BASE}${path || '/'}`
}

export function useDocSeo(locale: string, suffix: string, available: string[]) {
  const canonical = docUrl(locale, suffix)
  const alternates = available.map(code => ({ rel: 'alternate', hreflang: code, href: docUrl(code, suffix) }))
  if (available.includes('fr')) {
    alternates.push({ rel: 'alternate', hreflang: 'x-default', href: docUrl('fr', suffix) })
  }
  useHead({
    htmlAttrs: { lang: locale },
    link: [{ rel: 'canonical', href: canonical }, ...alternates],
    meta: [
      { property: 'og:url', content: canonical },
      { property: 'og:locale', content: (ISO[locale] || 'fr-FR').replace('-', '_') }
    ]
  })
}
