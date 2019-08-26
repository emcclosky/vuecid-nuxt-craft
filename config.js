// TODO: Add your urls
const urls = {
  backendUrlProduction: 'https://cms.lucid.build',
  backendUrlLocal: 'http://cms.lucid.test',
  frontendUrlProduction: 'https://vuecid-nuxt-craft.lucid.build',
  frontendUrlLocal: 'http://localhost:3000',
  graphqlPath: '/api',
  graphqlToken: 'Uzwv98bNdEu0JNyOUtxxhD5d8ub6-DPXZfPsvYQXXmlWgb3Xyc6txbX92PaslqVj', // prettier-ignore
  graphqlTokenLocal: '4_YOXag2OJQ2GeBEJfKdsHPeaIMJDXgoeshb_xYfMeooJlKUTXJFkCd4E0_qXNcG' // prettier-ignore
}

// TODO: Add your langs
const langs = [
  {
    default: true, // Specify default lang
    lang: 'de',
    slug: 'de',
    locale: 'de_CH',
    name: 'Deutsch'
  },
  {
    lang: 'en',
    slug: 'en',
    locale: 'en_US',
    name: 'English'
  }
  // {
  //   lang: 'fr',
  //   slug: 'fr',
  //   locale: 'fr_FR',
  //   name: 'Français'
  // }
]

const getDefaultLang = () => {
  const dl = langs.find(l => l.default === true)
  return dl.lang
}

// TODO: Add your home slug from WordPress
const homeSlug = 'home'

const config = {
  env: {
    LOG_VERBOSE: false,
    LANGS: langs,
    DEFAULTLANG: getDefaultLang(),
    BACKENDURLPRODUCTION: urls.backendUrlProduction,
    BACKENDURLLOCAL: urls.backendUrlLocal,
    FRONTENDURLPRODUCTION: urls.frontendUrlProduction,
    FRONTENDURLLOCAL: urls.frontendUrlLocal,
    GRAPHQL_PATH: urls.graphqlPath,
    GRAPHQL_TOKEN: urls.graphqlToken,
    GRAPHQL_TOKEN_LOCAL: urls.graphqlTokenLocal,
    HOMESLUG: homeSlug
  },

  // TODO: Add your Google Analytics ID
  googleAnalyticsId: 'UA-74285401-2',

  // TODO: Add your Google Site Verification for Search Console
  googleSiteVerification: 'EvzhaYYBQ_6xTZ4EBRyKsvWETvSyivkiSOwJzpEzfqA',

  // Optionally add Bing Site Verification
  bingSiteVerification: 'B2BFE4CC02FBB954E192488D1D844BCC',

  // TODO: Add your post types
  postTypes: [
    { type: 'pages' },
    { type: 'posts', paginated: true },
    { type: 'my_custom_post_type' }
  ],

  // TODO: Add your site title
  siteTitle: 'vuecid-nuxt-craft',
  shortTitle: 'Vuecid Demo with CraftCMS',
  siteDescription: 'Vuecid-Nuxt-Craft demo page',
  themeColor: '#ffffff',

  // TODO: Replace favicon source file in /static/icon.png (512px x 512px)
  iconSizes: [32, 57, 60, 72, 76, 120, 144, 152, 167, 180, 192, 512],

  // TODO: Add route aliases (for example for posts)
  routeAliases: {
    posts: {
      locales: {
        de: '/beitraege',
        en: '/posts'
        // fr: '/articles'
      }
    }
    // 'posts-slug': {
    //   locales: {
    //     de: '/beitraege/:slug',
    //     en: '/posts/:slug',
    //     fr: '/articles/:slug'
    //   },
    //   isInBundle: false,
    //   postType: 'posts'
    // },
    // my_custom_post_type: {
    //   locales: {
    //     de: '/custom-post-type-slug-de',
    //     en: '/custom-post-type-slug-en',
    //     fr: '/custom-post-type-slug-fr'
    //   }
    // },
    // 'my_custom_post_type-slug': {
    //   locales: {
    //     de: '/custom-post-type-slug-de/:slug',
    //     en: '/custom-post-type-slug-en/:slug',
    //     fr: '/custom-post-type-slug-fr/:slug'
    //   },
    //   isInBundle: true,
    //   postType: 'my_custom_post_type'
    // }
  }
}

export default config
