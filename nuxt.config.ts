// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 3007
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'fr', name: 'Français', file: 'fr.json', iso: 'fr-FR' },
      { code: 'en', name: 'English', file: 'en.json', iso: 'en-US' },
      { code: 'es', name: 'Español', file: 'es.json', iso: 'es-ES' },
      { code: 'pt', name: 'Português', file: 'pt.json', iso: 'pt-BR' },
      { code: 'ja', name: '日本語', file: 'ja.json', iso: 'ja-JP' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json', iso: 'hi-IN' }
    ],
    defaultLocale: 'fr',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    baseUrl: 'https://docs.fluenzr.co',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'bash', 'kotlin', 'sql', 'yaml', 'markdown']
    },
    navigation: {
      fields: ['icon', 'titleTemplate']
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'FluenzR Documentation',
      meta: [
        { name: 'description', content: 'Documentation officielle de FluenzR - Plateforme de cold emailing intelligente' },
        { name: 'theme-color', content: '#6366f1' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'FluenzR Documentation' },
        { property: 'og:title', content: 'FluenzR Documentation' },
        { property: 'og:description', content: 'Documentation officielle de FluenzR - Plateforme de cold emailing intelligente' },
        { property: 'og:image', content: 'https://docs.fluenzr.co/og-image.png' },
        { property: 'og:url', content: 'https://docs.fluenzr.co' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:locale:alternate', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'es_ES' },
        { property: 'og:locale:alternate', content: 'pt_BR' },
        { property: 'og:locale:alternate', content: 'ja_JP' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'FluenzR Documentation' },
        { name: 'twitter:description', content: 'Documentation officielle de FluenzR - Plateforme de cold emailing intelligente' },
        { name: 'twitter:image', content: 'https://docs.fluenzr.co/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'canonical', href: 'https://docs.fluenzr.co' }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: []
    }
  },

  ssr: true,

  compatibilityDate: '2024-01-01'
})
