import { verifyLeadingSlash } from '@wearelucid/vuecid-helpers'
import logV from '~/util/logV'
const m = 'middleware/i18n'

export default function({ app, store, route, error, redirect, isHMR }) {
  // Check if middleware called from hot-reloading, ignore
  if (isHMR) return

  logV(m, '📞 Middleware called!')

  // Save some variables we need
  const langs = store.state.langs
  const defaultLang = store.state.defaultLang
  let locale = defaultLang

  if (!langs) return

  // Iterate over all langs
  langs.forEach(l => {
    // Save regex to check if it matches a lang slug (-> '/en')
    const regexp = new RegExp(`^/${l.slug}`)

    // Get locale from params
    if (route.path.match(regexp)) {
      locale = l.slug
    }
  })

  if (langs.findIndex(l => l.slug === locale) === -1) {
    logV(m, `No haz your lang (${locale}), will throw an error at you`)
    return error({ message: 'Page not found.', statusCode: 404 })
  }

  logV(m, 'This is your locale: ', locale)

  // Set i18n locale and commit mutation
  app.i18n.locale = locale
  store.commit('LANG_SAVE', locale)

  // Update siteHandle to request apollo slugs from correct site
  const currentLang = process.env.LANGS.find(l => l.lang === app.i18n.locale)
  app.i18n.siteHandle = currentLang ? currentLang.handle : 'default'

  if (!process.static) {
    // Some important redirects (redirect does not work when generating):
    // Remove default lang slug
    const path = route.fullPath
    if (path.endsWith(`/${defaultLang}`)) {
      redirect(path.replace(`/${defaultLang}`, '/'))
    } else if (path.startsWith(`/${defaultLang}/`)) {
      redirect(path.replace(`/${defaultLang}/`, '/'))
    }
    // Remove home slug
    if (path.endsWith(`/${process.env.HOMESLUG}`)) {
      return redirect(path.replace(`/${process.env.HOMESLUG}`, '/'))
    } else if (path.includes(`/${process.env.HOMESLUG}`)) {
      const newPath = path.replace(`/${process.env.HOMESLUG}`, '')
      return redirect(verifyLeadingSlash(newPath))
    }
  }
}
