<script>
import { mapState } from 'vuex'
import { removeLeadingSlash } from '@wearelucid/vuecid-helpers'
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
              console.error(`🏮 Do you have an entry with slug == ${config.env.HOMESLUG}? Read more: https://github.com/wearelucid/vuecid-nuxt-craft/blob/master/docs/Troubleshooting.md#no-results`) // eslint-disable-line
              console.error(`🏮🏮 Or maybe you forgot to allow an entry type to be accessed via GraphQL? (Public Schema)? Read more: https://github.com/wearelucid/vuecid-nuxt-craft/blob/master/docs/Troubleshooting.md#no-results-2`) // eslint-disable-line
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
  computed: {
    ...mapState(['preview'])
  },
  // async asyncData({ params, env, query, route, app, isDev }) {
  //   const slug = removeLeadingSlash(params.slug2 || params.slug || env.HOMESLUG)
  //   const previewData = await loadPreview({
  //     slug,
  //     env,
  //     query,
  //     isDev,
  //     graphQLQuery: page
  //   })
  //   if (previewData) {
  //     console.log('previewData: ', previewData)
  //     return { ...previewData }
  //   }
  //   return { preview: false }
  // },
  data: () => {
    return {
      page: null
    }
  },
  beforeMount() {
    console.log('this.preview: ', this.preview)
  },
  mounted() {
    console.log('this.page: ', this.page)
    // Check if we should be displaying a preview but for some reason did not get any data.
    // Use an alert because this can be used within the template-less basePage
    if (this.preview && !this.page) {
      alert(this.$t('ui.previewAlert'))
    }
  },
  head() {
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      frontendUrl:
        process.env.NODE_ENV === 'development'
          ? config.env.FRONTENDURLLOCAL
          : config.env.FRONTENDURLPRODUCTION,
      lang: this.$i18n.locale
      // ,debug: true
    })
  }
}
</script>
