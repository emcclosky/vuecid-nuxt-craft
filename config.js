// TODO: Add your urls
const urls = {
  backendUrlProduction: 'https://cms.lucid.build',
  backendUrlLocal: 'http://cms.lucid.test',
  frontendUrlProduction: 'https://vuecid-nuxt-craft.lucid.build',
  frontendUrlLocal: 'http://localhost:3000',
  graphqlPath: '/api'
}

// TODO: Add your langs
const langs = [
  {
    lang: 'de',
    slug: 'de',
    locale: 'de_CH',
    name: 'Deutsch',
    handle: 'vuecidCraftDemoGerman' // Craft Site handle in multisite setup
  },
  {
    default: true, // Specify default lang
    lang: 'en',
    slug: 'en',
    locale: 'en_US',
    name: 'English',
    handle: 'default' // Craft Site handle – can be left out if it is default.
  }
]

const getDefaultLang = () => {
  const dl = langs.find(l => l.default === true)
  return dl.lang
}

// TODO: Add your home slug (all languages/sites in a multisite setup need to have the same slug!)
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
    HOMESLUG: homeSlug
  },

  // TODO: Add your Google Analytics ID
  googleAnalyticsId: 'UA-74285401-2',

  // TODO: Add your Google Site Verification for Search Console
  googleSiteVerification: 'EvzhaYYBQ_6xTZ4EBRyKsvWETvSyivkiSOwJzpEzfqA',

  // Optionally add Bing Site Verification
  bingSiteVerification: 'B2BFE4CC02FBB954E192488D1D844BCC',

  // TODO: Add your craft sections (e.g. pages)
  sections: ['pages'],

  // TODO: Add the sections that should be displayed within TheNavigation
  sectionsInNavigation: 'pages',

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
