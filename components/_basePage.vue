<script>
import { removeLeadingSlash } from '@wearelucid/vuecid-helpers'
import { loadPreview } from '@wearelucid/vuecid-craft-helpers'
import config from '~/config'
import page from '~/apollo/queries/page'
// import loadPreview from '~/packages/vuecid-craft-helpers/src/preview/loadPreview.js'
import seomaticOptions from '~/apollo/options/seomaticOptions'

const routeSlug = (context) => {
  // function up here for DRY reasons
  return (
    context.$route.params.slug3 ||
    context.$route.params.slug2 ||
    context.$route.params.slug ||
    config.env.HOMESLUG
  )
}

export default {
  apollo: {
    seomatic() {
      return seomaticOptions({ ctx: this })
    },
    entries: {
      query: page,
      prefetch: ({ route }) => ({
        slug: removeLeadingSlash(
          route.params.slug2 || route.params.slug || config.env.HOMESLUG
        ),
      }),
      variables() {
        let slug = routeSlug(this)
        slug = removeLeadingSlash(slug)
        // get craft site handle depending on language
        const site = this.$i18n.locales.find(
          (l) => l.code === this.$i18n.locale
        )
        return { slug, site }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        // because previewData is not ready at this point in time, we check for the preview url param
        if (!this.$route.query['x-craft-live-preview']) {
          if (!result.data.entries || !result.data.entries[0]) {
            if (!this.$route.params.slug) {
              // eslint-disable-next-line no-console
              console.error(
                `🏮 Do you have an entry with slug == ${config.env.HOMESLUG}? Read more: https://github.com/wearelucid/vuecid-nuxt-craft/blob/master/docs/Troubleshooting.md#no-results`
              )
              // eslint-disable-next-line no-console
              console.error(
                `🏮🏮 Or maybe you forgot to allow an entry type to be accessed via GraphQL? (Public Schema)? Read more: https://github.com/wearelucid/vuecid-nuxt-craft/blob/master/docs/Troubleshooting.md#no-results-2`
              )
            }
            this.$store.dispatch(
              'throwError',
              {
                statusCode: 404,
                message: `Page with slug «${
                  this.$route.params.slug3 ||
                  this.$route.params.slug2 ||
                  this.$route.params.slug ||
                  config.env.HOMESLUG
                }» was not found`,
              },
              { root: true }
            )
          }
          this.page = result.data.entries[0]
        }
      },
    },
  },
  data: () => {
    return {
      page: null,
      previewData: null,
    }
  },
  computed: {
    pageData() {
      return this.previewData || this.page
    },
  },
  // We need to load the preview within beforeMount, because asyncData and middleware are NOT executed on initial load
  // after having used `nuxt generate`, because there is no server that is run
  async beforeMount() {
    // check preview and fetch actual data
    const slug = removeLeadingSlash(
      this.$route.params.slug3 ||
        this.$route.params.slug2 ||
        this.$route.params.slug ||
        config.env.HOMESLUG
    )
    this.log('Fetching preview for slug: ', slug, ' – with queries: ', this.$route.query, ' ...') // prettier-ignore
    this.previewData = await loadPreview({
      slug,
      env: config.env,
      query: this.$route.query,
      isDev: process.env.NODE_ENV === 'development',
      graphQLQuery: page,
    })
    if (this.previewData) {
      this.$store.dispatch('ui/activatePreviewAlert')
    }
  },
  head() {
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      lang: this.$i18n.locale,
    })
  },
}
</script>
