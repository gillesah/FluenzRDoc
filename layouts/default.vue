<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="/logo_black.png" alt="FluenzR" class="h-8 w-auto" />
            <span class="text-sm text-gray-500 dark:text-gray-400">Docs</span>
          </NuxtLink>
          <nav class="hidden md:flex items-center gap-6">
            <NuxtLink :to="localePath('/docs/getting-started')" class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              {{ $t('nav.docs') }}
            </NuxtLink>
            <NuxtLink :to="localePath('/docs/api')" class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              API
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4">
          <!-- Language Switcher -->
          <LanguageSwitcher />

          <!-- Dark mode toggle -->
          <button @click="toggleColorMode" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <a href="https://app.fluenzr.co" target="_blank" class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
            {{ appLinkText }}
          </a>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
      <div class="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        <div class="mt-2 flex items-center justify-center gap-4">
          <a href="https://fluenzr.co" class="hover:text-primary-600">Website</a>
          <a href="https://app.fluenzr.co" class="hover:text-primary-600">App</a>
          <a href="mailto:contact@fluenzr.co" class="hover:text-primary-600">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { locale } = useI18n()
const localePath = useLocalePath()

const appLinkText = computed(() => {
  const texts: Record<string, string> = {
    fr: 'Ouvrir l\'app',
    en: 'Open app',
    es: 'Abrir app',
    pt: 'Abrir app',
    ja: 'アプリを開く',
    hi: 'ऐप खोलें'
  }
  return texts[locale.value] || 'Open app'
})

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
