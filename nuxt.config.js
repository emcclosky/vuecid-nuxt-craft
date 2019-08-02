// eslint-disable-next-line prettier/prettier
// import { generateLocalizedRoutes, generateRoutesFromData } from '@wearelucid/vuecid-helpers'
import config from './config'

export default {
  server: {
    host: '0.0.0.0' // Default: localhost
  },

  /*
   ** Headers of the page
   */
  head: {
    title: '…', // Indicate loading during navigation
    htmlAttrs: {
      lang: config.env.DEFAULTLANG,
      dir: 'ltr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Lucid – wearelucid.ch' },
      { name: 'theme-color', content: config.themeColor },
      {
        name: 'google-site-verification',
        content: config.googleSiteVerification
      }
    ]
  },

  /*
   ** env: lets you create environment variables that will be shared for the client and server-side.
   */
  env: config.env,

  /*
   ** Customize the progress-bar color
   ** TODO: Set your desired loading bar color
   */
  loading: { color: '#0000ff' },

  /*
   ** CSS
   */
  css: ['@/assets/css/main.scss'],

  /*
   ** Plugins
   */
  plugins: [
    { src: '~/plugins/global.js' },
    { src: '~/plugins/vuecid-helpers.js' },
    { src: '~/plugins/whatinput.js', ssr: false },
    { src: '~/plugins/i18n.js', injectAs: 'i18n' },
    { src: '~/plugins/vuex-router-sync' },
    { src: '~/plugins/vue-bows' }
    // { src: '~/plugins/vue-breakpoint-component', ssr: false }
  ],

  /*
   ** Modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    // Google Analytics Module
    // Be aware that there is still a bug where the page title is not updated:
    // Demo: https://imgur.com/QSv4n12
    // Issue to watch/subscribe and fix this ASAP: https://github.com/nuxt-community/analytics-module/issues/8
    // [
    //   '@nuxtjs/google-analytics',
    //   {
    //     id: config.googleAnalyticsId,
    //     // Opt out by default and enable tracking if user accepts cookies
    //     disabled: () => {
    //       if (process.browser) {
    //         if (localStorage.getItem('cookie:accepted')) {
    //           return false
    //         }
    //       }
    //       return true
    //     },
    //     set: [{ field: 'anonymizeIp', value: true }],
    //     debug: {
    //       // Uncomment the following line to debug GA in development environment (check your console output):
    //       // enabled: process.env.NODE_ENV === 'development',
    //       // Only send hit task in production. To test locally run `$ yarn netlifyify` (sets NODE_ENV to production).
    //       sendHitTask: process.env.NODE_ENV === 'production'
    //     }
    //   }
    // ],
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/pwa',
      {
        icon: {
          sizes: config.iconSizes
        },
        // Override certain meta tags
        meta: {
          viewport: 'width=device-width, initial-scale=1',
          favicon: true // Generates only apple-touch-icon
        },
        manifest: {
          name: config.siteTitle,
          lang: config.env.DEFAULTLANG,
          dir: 'ltr',
          short_name: config.shortTitle,
          theme_color: config.themeColor,
          start_url: '/',
          display: 'standalone',
          background_color: '#fff',
          description: config.siteDescription
        }
      }
    ],
    '@nuxtjs/eslint-module'
  ],

  /*
   ** Workbox config
   */
  workbox: {
    config: {
      debug: false,
      cacheId: config.siteTitle
    }
  },

  /*
   ** Axios config
   */
  axios: {
    baseURL: '/'
  },

  /*
   ** Apollo config
   */
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  /*
   ** Generate
   */
  generate: {
    // Create a 404.html page:
    // https://nuxtjs.org/guide/routing#implementation-for-github-pages-and-netlify
    fallback: true,
    // Apply route generation magic:
    routes: [
      // ...generateRoutesFromData({
      //   langs: config.env.LANGS,
      //   postTypes: config.postTypes,
      //   dataPath: '../../../../../static/data',
      //   bundle: 'basic',
      //   homeSlug: config.env.HOMESLUG
      // })
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    extend(config, { isDev, isClient }) {
      // Add this when using file system
      // https://github.com/webpack-contrib/css-loader/issues/447#issuecomment-285598881
      config.node = {
        fs: 'empty'
      }
    }
  },

  /*
   ** Router
   */
  router: {
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active-exact',
    middleware: ['i18n'],
    extendRoutes(routes) {
      // extends basic routes (based on your files/folders in pages directory) with i18n locales (from our config.js)
      // const newRoutes = generateLocalizedRoutes({
      //   baseRoutes: routes,
      //   defaultLang: config.env.DEFAULTLANG,
      //   langs: config.env.LANGS,
      //   routeAliases: config.routeAliases
      // })

      // Clear array
      // routes.splice(0, routes.length)

      // Push newly created routes
      routes.push({
        name: 'test',
        path: '/test',
        component: '~/pages/index.vue'
      })
    }
  },

  /*
   ** Sitemap Configuration
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: config.env.FRONTENDURLPRODUCTION,
    cacheTime: 1000 * 60 * 15,
    // exclude: [
    //   '/secret',
    //   '/admin/**'
    // ],
    routes: [
      // ...generateRoutesFromData({
      //   langs: config.env.LANGS,
      //   postTypes: config.postTypes,
      //   dataPath: '../../../../../static/data',
      //   bundle: 'basic',
      //   homeSlug: config.env.HOMESLUG
      // })
      // '/page/1',
      // {
      //   url: '/page/2',
      //   changefreq: 'daily',
      //   priority: 1,
      //   lastmodISO: '2017-06-30T13:30:00.000Z',
      //   links: [
      //     { lang: 'en', url: 'http://test.com/page-1/', },
      //     { lang: 'ja', url: 'http://test.com/page-1/ja/', }
      //   ]
      // }
    ]
  }
}
