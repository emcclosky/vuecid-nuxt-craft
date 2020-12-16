import { generateRoutesFromData } from '@wearelucid/vuecid-craft-helpers'
// import generateRoutesFromData from './packages/vuecid-craft-helpers/src/routes/generateRoutesFromData.js'
import config from './config'

export default {
  /**
   * Server is served by default on http://localhost
   * Setting it to '0.0.0.0' allows you to access it on your LAN (192.168... something)
   */
  server: {},

  /**
   * HTML page <head>
   */
  head: {
    title: '…', // Indicate loading during navigation
    htmlAttrs: {
      lang: config.env.DEFAULTLANG,
      dir: 'ltr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Lucid – wearelucid.ch' },
      { name: 'theme-color', content: config.themeColor },
      // Google site verification:
      // {
      //   name: 'google-site-verification',
      //   content: config.googleSiteVerification,
      // },
      // Bing site verification:
      // {
      //   name: 'msvalidate.01',
      //   content: '',
      // },
    ],
    script: [
      /* setup-autocomment-polyfill */
      /* setup-autocomment-modernizr */
    ],
  },

  /**
   * `env` lets you create environment variables
   * that will be shared client- and server-side.
   */
  env: {
    ...config.env,
    // make Netlify ENV variable available to components
    // List of Netlify ENV vars: https://gist.github.com/sw-yx/c53634e7e63f0015e43c16bc26832283
    NETLIFY: process.env.NETLIFY,
  },

  /**
   * Customize the progress-bar color
   * TODO: Set your desired loading bar color
   */
  loading: { color: '#0000ff' },

  /**
   * CSS
   */
  css: ['@/assets/css/main.scss'],

  /**
   * Plugins
   */
  plugins: [
    { src: '~/plugins/vue-lazysizes', ssr: false },
    { src: '~/plugins/global.js' },
    { src: '~/plugins/throwNuxtError.js' }, // throw errors outside of asyncData and fetch, e.g. in apollo request
    { src: '~/plugins/vuecid-helpers.js' },
    { src: '~/plugins/whatinput.js', ssr: false },
    { src: '~/plugins/vuex-router-sync' },
    { src: '~/plugins/vue-focus-trap' },
    { src: '~/plugins/vue-bows' },
    // { src: '~/plugins/vue-breakpoint-component', ssr: false }
  ],

  /**
   * Modules
   * * Find more modules on https://modules.nuxtjs.org/
   */
  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/sitemap',
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/pwa',
      {
        icon: { sizes: config.iconSizes },
        // Override certain meta tags
        meta: {
          viewport: 'width=device-width, initial-scale=1',
          favicon: true, // Generates only apple-touch-icon
        },
        manifest: {
          name: config.siteTitle,
          lang: config.env.DEFAULTLANG,
          dir: 'ltr',
          short_name: config.shortTitle,
          theme_color: config.themeColor,
          start_url: '/',
          display: 'browser',
          background_color: '#fff',
          description: config.siteDescription,
        },
      },
    ],
  ],

  /**
   * i18n
   */
  i18n: {
    locales: config.env.LOCALES,
    defaultLocale: config.env.DEFAULTLANG,
    vueI18n: {
      fallbackLocale: config.env.DEFAULTLANG,
      messages: config.env.I18N_MESSAGES,
    },
  },

  /**
   * Axios config
   */
  axios: {
    baseURL: '/',
  },

  /**
   * Apollo config
   */
  apollo: {
    includeNodeModules: true,
    errorHandler: '~/apollo/plugins/apolloErrorHandler.js',
    clientConfigs: {
      default: '~/apollo/client-configs/default.js',
      // If you want to connect to a your local backend use this config instead:
      // default: '~/apollo/client-configs/local.js'
    },
  },

  /**
   * Generate
   */
  generate: {
    // Create a 404.html page:
    // https://nuxtjs.org/guide/routing#implementation-for-github-pages-and-netlify
    fallback: true,
    // Apply route generation magic:
    routes: () => {
      const data = require('./static/data/allEntries.json') // require file here, defining paths relative to node_module is a pain!
      return generateRoutesFromData({
        data,
        sections: config.sectionsWithRoute, // depends on the name you put in your backend for this kind of section
        homeSlug: config.env.HOMESLUG,
        defaultLanguage: config.env.DEFAULTLANG,
        // ,debug: true
      })
    },
  },

  /**
   * Build configuration
   */
  build: {
    postcss: {
      plugins: {
        cssnano: { preset: 'default' },
      },
    },
    extend(config, { isDev, isClient }) {
      // Add this when using file system
      // https://github.com/webpack-contrib/css-loader/issues/447#issuecomment-285598881
      config.node = {
        fs: 'empty',
      }
    },
  },

  /**
   * Router
   */
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active-exact',
    middleware: ['i18n-middleware'],
  },

  /**
   * Sitemap Configuration
   */
  sitemap: {
    hostname: config.env.FRONTENDURLPRODUCTION,
  },
}
