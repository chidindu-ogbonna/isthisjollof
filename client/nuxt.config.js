/* eslint-disable nuxt/no-cjs-in-config */
require('dotenv').config()
const { meta, icons } = require('./nuxt-attrs')

export default {
  target: 'static',

  head: {
    title: 'IsThisJollof ?',
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
    color: '#4d545b',
    height: '2px',
  },

  plugins: [
    { src: '@/plugins/filters.js' },
    { src: '@/plugins/vee-validate.js' },
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

  pwa: {
    manifest: {
      name: 'IsThisJollof',
      short_name: 'IsThisJollof',
      description: 'Is this jollof or not',
      start_url: '/?standalone=true',
      display: 'standalone',
      theme_color: '#040c14',
      background_color: '#ffffff',
      useWebmanifestExtension: false,
    },
    icon: {
      // XXX: Remember to burst the pwa cache to update icons
      // rm -rf node_modules/.cache/pwa/icon
      source: '/icon.png',
    },
  },

  build: {
    transpile: ['vee-validate/dist/rules'],
  },
}
