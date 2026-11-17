<template>
  <div>
    <ContentDoc :path="contentPath" v-slot="{ doc }">
      <article class="prose prose-gray dark:prose-invert max-w-none">
        <h1>{{ doc.title }}</h1>
        <p v-if="doc.description" class="lead text-xl text-gray-600 dark:text-gray-400">
          {{ doc.description }}
        </p>
        <ContentRenderer :value="doc" />
      </article>

      <!-- Navigation -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div class="flex justify-between">
          <NuxtLink
            v-if="doc.prev"
            :to="localePath(doc.prev._path.replace(`/${locale}`, '/docs'))"
            class="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
          >
            <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            {{ doc.prev.title }}
          </NuxtLink>
          <div v-else />
          <NuxtLink
            v-if="doc.next"
            :to="localePath(doc.next._path.replace(`/${locale}`, '/docs'))"
            class="group flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
          >
            {{ doc.next.title }}
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </ContentDoc>
  </div>
</template>

<script lang="ts">
// Partagé par toutes les requêtes du processus : chemin -> promesse des langues où la page existe
const availableCache = new Map<string, Promise<string[]>>()
</script>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()
const { locale, locales } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s.join('/') : (s as string)
})

// Build content path: /{locale}/{slug}
const contentPath = computed(() => `/${locale.value}/${slug.value}`)

// Langues dans lesquelles cette page existe (pour hreflang), et 404 réel si elle n'existe pas dans la langue courante.
// Le contenu est immuable entre deux publications : le résultat est calculé une fois par chemin (promesse partagée
// entre requêtes concurrentes) puis réutilisé. Une erreur de lecture n'est jamais prise pour une page absente :
// on réessaie une fois, puis 503 + Retry-After (jamais 404).
const codes = (locales.value as Array<{ code: string }>).map(l => l.code)
const nuxtApp = useNuxtApp()
const event = useRequestEvent()
const queryAvailable = (): Promise<string[]> => nuxtApp.runWithContext(async () => {
  const found: string[] = []
  for (const code of codes) {
    const n = await queryContent(`/${code}/${slug.value}`).only(['_path']).find()
    if (n.some(d => d._path === `/${code}/${slug.value}`)) found.push(code)
  }
  return found
})
const loadAvailable = async (fresh: boolean): Promise<string[]> => {
  const key = slug.value
  if (!fresh && !import.meta.dev) {
    const hit = availableCache.get(key)
    if (hit) return hit
  }
  const p = queryAvailable()
  if (!import.meta.dev) {
    availableCache.set(key, p)
    p.then(r => { if (!r.includes(locale.value)) availableCache.delete(key) }, () => availableCache.delete(key))
  }
  return p
}
const readAvailable = async (): Promise<string[]> => {
  let lastError: unknown
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const found = await loadAvailable(attempt > 0)
      // Absente dans la langue courante : on revérifie une fois sans cache avant de répondre 404
      if (found.includes(locale.value) || attempt > 0) return found
    } catch (e) {
      lastError = e
    }
  }
  if (lastError) throw lastError
  return []
}
let available: string[]
try {
  available = await readAvailable()
} catch (e) {
  if (event) setResponseHeader(event, 'Retry-After', '2')
  throw createError({ statusCode: 503, statusMessage: 'Service temporarily unavailable', fatal: true })
}
if (!available.includes(locale.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
useDocSeo(locale.value, `/docs/${slug.value}`, available)
</script>
