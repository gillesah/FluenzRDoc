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
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'es', name: 'Español', file: 'es.json' },
      { code: 'pt', name: 'Português', file: 'pt.json' },
      { code: 'ja', name: '日本語', file: 'ja.json' },
      { code: 'hi', name: 'हिन्दी', file: 'hi.json' }
    ],
    defaultLocale: 'fr',
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
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
      title: 'FluenzR Documentation',
      meta: [
        { name: 'description', content: 'Documentation officielle de FluenzR - Plateforme de cold emailing intelligente' },
        { name: 'theme-color', content: '#6366f1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
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
