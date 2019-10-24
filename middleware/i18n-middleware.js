// i18n-middleware.js can't be called `i18n.js` only
// It won't be executed, probably because of nuxt-i18n.
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

  // At this point in time app.i18n is not updated yet
  if (!langs) return

  // Iterate over all langs
  langs.forEach(l => {
    // Save regex to check if it matches a lang slug (-> '/en')
    // Pay attention that an english page with a slug like "/denzel-washington" does not trigger "/de"
    // https: //regex101.com/r/KNbRbN/2
    const regexp = new RegExp(`(^\/${l.slug}\/)|(^\/${l.slug}$)`) // eslint-disable-line

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
  store.commit('LANG_SAVE', locale)

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
