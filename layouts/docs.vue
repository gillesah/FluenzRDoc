<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
          <div class="relative">
            <select
              v-model="currentLocale"
              @change="switchLocale"
              class="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
                {{ loc.name }}
              </option>
            </select>
            <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button @click="toggleColorMode" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg v-if="colorMode.value === 'dark'" class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <a href="https://app.fluenzr.co" target="_blank" class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
            {{ $t('header.openApp') }}
          </a>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4">
      <div class="flex">
        <!-- Mobile sidebar overlay -->
        <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/50 lg:hidden" @click="sidebarOpen = false" />

        <!-- Sidebar -->
        <aside
          :class="[
            'fixed lg:sticky top-16 z-40 lg:z-0 h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-transform lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          ]"
        >
          <nav class="p-4 space-y-6">
            <DocsSidebar />
          </nav>
        </aside>

        <!-- Main content -->
        <main class="flex-1 min-w-0 py-8 lg:pl-8">
          <div class="max-w-3xl">
            <slot />
          </div>
        </main>

        <!-- Table of contents -->
        <aside class="hidden xl:block w-64 shrink-0 pl-8 py-8">
          <div class="sticky top-24">
            <DocsToc />
          </div>
        </aside>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 py-8 mt-16">
      <div class="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} FluenzR. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const sidebarOpen = ref(false)
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const currentLocale = ref(locale.value)
const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).map(loc => ({
    code: loc.code,
    name: loc.name
  }))
)

function switchLocale() {
  const newPath = switchLocalePath(currentLocale.value)
  router.push(newPath)
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Close sidebar on route change
const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})

// Sync currentLocale with actual locale
watch(locale, (newLocale) => {
  currentLocale.value = newLocale
})
</script>
