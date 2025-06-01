// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui-pro',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  uiPro: {
    license: process.env.MY_ENVIRONMENT_VARIABLE
  },
  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false }
  },
  future: {
    compatibilityVersion: 4
  },
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000'
    }
  }
})