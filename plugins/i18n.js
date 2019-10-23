/*
 * Execute a few things before making a language switch.
 * https: //nuxt-community.github.io/nuxt-i18n/callbacks.html#usage
 */

export default function({ app }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    console.log('locales: 💀 ', oldLocale, newLocale)

    // Set i18n locale and commit mutation
    store.commit('LANG_SAVE', newLocale)

    // Update siteHandle to request apollo slugs from correct site
    const currentLang = process.env.LANGS.find(l => l.lang === newLocale)
    store.commit(
      'SITEHANDLE_SAVE',
      currentLang ? currentLang.handle : 'default'
    )
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    console.log('locales: 💀ON ', oldLocale, newLocale)
  }
}
