// TODO: Add your urls
const urls = {
  backendUrlProduction: 'https://cms.lucid.build',
  backendUrlLocal: 'http://cms.lucid.test',
  frontendUrlProduction: 'https://vuecid-nuxt-craft.lucid.build',
  frontendUrlLocal: 'http://localhost:3000',
  graphqlPath: '/api'
}

// TODO: Add your langs (= different sites in Craft multisite setup)
// Don't forget to add the site handle for each secondary site!
const langs = [
  {
    lang: 'de',
    slug: 'de',
    locale: 'de_CH',
    name: 'Deutsch',
    // siteId: this can be found in [CRAFT]/admin/settings/sites when hovering over the links,
    // it is needed for seomatic, when we need to distinguish which page we want to fetch content for
    siteId: 2,
    handle: 'vuecidCraftDemoGerman' // Craft Site handle in multisite setup
  },
  {
    default: true, // Specify default lang
    lang: 'en',
    slug: 'en',
    locale: 'en_US',
    name: 'English',
    // siteId: this can be found in [CRAFT]/admin/settings/sites when hovering over the links,
    // it is needed for seomatic, when we need to distinguish which page we want to fetch content for
    siteId: 1,
    handle: 'default' // Craft Site handle – can be left out if it is default.
  }
]

const getDefaultLang = () => {
  const dl = langs.find(l => l.default === true)
  return dl.lang
}

// The following properties are passed to the i18n plugin and can be accessed via this.$i18n.locales
const getAllLocales = () => {
  return langs.map(l => {
    return {
      code: l.lang,
      siteHandle: l.handle,
      siteId: l.siteId
    }
  })
}

const getLocalizedMessages = () => {
  const messages = {}
  langs.forEach(l => {
    messages[l.lang] = require(`./locales/${l.lang}.json`)
  })
  return messages
}

// TODO: Add your home slug (all languages/sites in a multisite setup need to have the same slug!)
const homeSlug = 'home'

const config = {
  env: {
    LOG_VERBOSE: false,
    LANGS: langs,
    LOCALES: getAllLocales(),
    DEFAULTLANG: getDefaultLang(),
    I18N_MESSAGES: getLocalizedMessages(),
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

  // TODO: Optionally add Bing Site Verification
  bingSiteVerification: 'B2BFE4CC02FBB954E192488D1D844BCC',

  // TODO: Add your craft sections (e.g. pages)
  sections: ['pages'],

  // TODO: Add your craft sections (e.g. pages, news) which should have a route
  sectionsWithRoute: ['pages', 'news'],

  // TODO: Add the sections that should be displayed within TheNavigation
  sectionsInNavigation: 'pages',

  // TODO: Add your site title
  siteTitle: 'vuecid-nuxt-craft',
  shortTitle: 'Vuecid Demo with CraftCMS',
  siteDescription: 'Vuecid-Nuxt-Craft demo page',
  themeColor: '#ffffff',

  // TODO: Replace favicon source file in /static/icon.png (512px x 512px)
  iconSizes: [32, 57, 60, 72, 76, 120, 144, 152, 167, 180, 192, 512]

  // Route Aliases are now set within the translated vue templates (e.g. /pages/news/index.vue)
}

export default config
