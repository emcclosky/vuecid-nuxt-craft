<script>
import { removeLeadingSlash } from '@wearelucid/vuecid-helpers'
import { loadPreview } from '@wearelucid/vuecid-craft-helpers'
import config from '~/config'
import page from '~/apollo/queries/page'
// import loadPreview from '~/packages/vuecid-craft-helpers/src/preview/loadPreview.js'
import seomaticQuery from '~/apollo/queries/seomatic'

const routeSlug = context => {
  return (
    context.$route.params.slug2 ||
    context.$route.params.slug ||
    config.env.HOMESLUG
  )
}

export default {
  apollo: {
    seomatic: {
      query: seomaticQuery,
      prefetch: ({ route }) => ({
        slug: removeLeadingSlash(route.params.slug2 || route.params.slug || config.env.HOMESLUG) // prettier-ignore
      }),
      variables() {
        let slug = routeSlug(this)
        slug = removeLeadingSlash(slug)
        // get craft site handle depending on language
        const site = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
        return { slug, site }
      },
      result(result) {
        try {
          this.seomatic = result.data.seomatic
        } catch (error) {
          console.log('Basepage: Apollo error: ', error) // eslint-disable-line no-console
        }
      }
    },
    entries: {
      query: page,
      prefetch: ({ route }) => ({
        slug: removeLeadingSlash(route.params.slug2 || route.params.slug || config.env.HOMESLUG) // prettier-ignore
      }),
      variables() {
        let slug = routeSlug(this)
        slug = removeLeadingSlash(slug)
        // get craft site handle depending on language
        const site = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
        return { slug, site }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          if (!result.data.entries || !result.data.entries[0]) {
            if (!this.$route.params.slug) {
              console.error(`🏮 You seem to try to call the index of the page. Did you maybe forget to add a page with your defined homeslug: "${config.env.HOMESLUG}" ?`) // eslint-disable-line
            }

            this.$store.dispatch(
              'throwError',
              {
                statusCode: 404,
                message: `Page with slug «${this.$route.params.slug ||
                  config.env.HOMESLUG}» was not found`
              },
              { root: true }
            )
          }
          this.page = result.data.entries[0]
        }
      }
    }
  },
  data: () => {
    return {
      page: null
    }
  },
  async asyncData({ params, env, query, route, app, isDev }) {
    const slug = removeLeadingSlash(params.slug2 || params.slug || env.HOMESLUG)
    const previewData = await loadPreview({
      slug,
      env,
      query,
      isDev,
      graphQLQuery: page
    })
    if (previewData) {
      return { ...previewData }
    }
    return { preview: false }
  },
  head() {
    if (!this.seomatic) {
      this.log('🏮 No SEO settings from GraphQL query returned.') // eslint-disable-line
    }
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      frontendUrl: config.env.FRONTENDURLPRODUCTION,
      lang: this.$i18n.locale
      // ,debug: true
    })
  },
  mounted() {
    // Check if we should be displaying a preview but for some reason did not get any data.
    // Use an alert because this can be used within the template-less basePage
    if (this.preview && !this.page) {
      alert(this.$t('ui.previewAlert'))
    }

    console.log('process.env.NETLIFY: ', process.env.NETLIFY)
  }
}
</script>
