<script>
import {
  removeLeadingSlash,
  verifyTrailingSlash
} from '@wearelucid/vuecid-helpers'
import { loadPreview } from '@wearelucid/vuecid-craft-helpers'
import config from '~/config'
import page from '~/apollo/queries/page'
// import loadPreview from '~/packages/vuecid-craft-helpers/src/preview/loadPreview.js'
import seomaticQuery from '~/apollo/queries/seomatic'

const routeSlug = context => {
  // function up here for DRY reasons
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
        let uri = routeSlug(this)
        uri = removeLeadingSlash(uri)
        // check if we are on home slugs, if so we need to build our URI to pass onto seomatic
        if (!this.$route.params.slug2 && !this.$route.params.slug) {
          uri = `${config.env.HOMESLUG}`
        } else {
          // if there is a slug we can just take the fullPath as URI to pass to seomatic
          uri = this.$route.fullPath
        }
        // get craft site handle depending on language
        const { siteId } = this.$i18n.locales.find(
          l => l.code === this.$i18n.locale
        )
        return { uri, siteId }
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
  data: () => {
    return {
      page: null
    }
  },
  mounted() {
    // Check if we should be displaying a preview but for some reason did not get any data.
    // Use an alert because this can be used within the template-less basePage
    if (this.preview && !this.page) {
      alert(this.$t('ui.previewAlert'))
    }

    console.log('process.env.NETLIFY: ', process.env.NETLIFY)
    console.log('process.env.BRANCH: ', process.env.BRANCH)
  },
  head() {
    if (!this.seomatic) {
      this.log('🏮 No SEO settings from GraphQL query returned.') // eslint-disable-line
    } else {
      this.log(
        'this.seomatic.metaLinkContainer: ',
        JSON.parse(this.seomatic.metaLinkContainer).alternate
      )
    }
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      frontendUrl: config.env.FRONTENDURLPRODUCTION,
      lang: this.$i18n.locale
      // ,debug: true
    })
  }
}
</script>
