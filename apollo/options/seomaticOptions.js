import {
  isHome,
  verifyTrailingSlash,
  verifyLeadingSlash,
} from '@wearelucid/vuecid-helpers'
import seomaticQuery from '~/apollo/queries/seomatic'
import config from '~/config'

const getUri = ({ route, homeSlug, locale }) => {
  const path = verifyTrailingSlash(verifyLeadingSlash(route.path))

  // If we are on home (`/`, `/fr/`, …) we can return the `homeSlug` (`home`)
  if (isHome(path, locale)) return homeSlug

  // Remove the locale from the `path`
  const pathWithoutLang = path.startsWith(`/${locale}/`) ? path.substr(3) : path
  return pathWithoutLang
}

export default function seomaticOptions({
  ctx,
  baseSlug = config.env.HOMESLUG,
}) {
  return {
    query: seomaticQuery,
    variables() {
      const uri = getUri({
        route: ctx.$route,
        homeSlug: baseSlug,
        locale: ctx.$i18n.locale,
      })
      // Get Craft site handle depending on language
      const { siteId } = ctx.$i18n.locales.find(
        (l) => l.code === ctx.$i18n.locale
      )
      return { uri, siteId }
    },
    result(result) {
      try {
        ctx.seomatic = result.data.seomatic
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Basepage: Apollo error: ', error)
      }
    },
  }
}
