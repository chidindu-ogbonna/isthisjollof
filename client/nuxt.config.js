import { icons, meta } from './nuxt-attrs'

export default {
  target: 'static',

  head: {
    title: 'Is This Jollof?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#007aff' },
      ...meta,
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ...icons,
    ],
  },

  css: ['@/assets/css/main.scss', '@/assets/css/transitions.scss'],

  loading: {
    color: '#e7b20d',
    height: '2px',
  },

  plugins: [
    { src: '@/plugins/vue-gtag.js', mode: 'client' },
    { src: '@/plugins/v-ripple.js', mode: 'client' },
    { src: '@/plugins/vue-notification.js', mode: 'client' },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/svg',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  modules: ['@nuxtjs/pwa'],

  router: {
    middleware: 'track',
  },

  pwa: {
    manifest: {
      name: 'IsThisJollof',
      short_name: 'IsThisJollof',
      description: 'Find out if that food is jollof rice or not',
      start_url: '/?standalone=true',
      display: 'standalone',
      theme_color: '#040c14',
      background_color: '#040c14',
      useWebmanifestExtension: false,
    },
    icon: {
      // XXX: Remember to burst the pwa cache to update icons
      // rm -rf node_modules/.cache/pwa/icon
      source: '/icon.png',
    },
  },

  build: {},
}
