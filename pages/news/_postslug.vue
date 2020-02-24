<script>
import { removeLeadingSlash } from '@wearelucid/vuecid-helpers'
import { loadPreview } from '@wearelucid/vuecid-craft-helpers'
import news from '~/apollo/queries/news'
import config from '~/config'

// import seomaticQuery from '~/apollo/queries/seomatic'

export default {
  nuxtI18n: {
    // If you change these settings, you need to rerun `$ yarn dev`
    paths: {
      en: '/news/:postslug',
      de: '/neuigkeiten/:postslug'
    }
  },
  apollo: {
    // TODO: Add seomatic, get inspired in _basePage.vue
    entries: {
      query: news,
      prefetch: ({ route }) => ({
        slug: removeLeadingSlash(route.params.postslug) // prettier-ignore
      }),
      variables() {
        const slug = removeLeadingSlash(this.$route.params.postslug) // prettier-ignore
        const site = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
        // get craft site handle depending on language
        return { slug, site }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          if (!result.data.entries || !result.data.entries[0]) {
            this.$store.dispatch(
              'throwError',
              {
                statusCode: 404,
                message: `Newspage with slug «${this.$route.params.postslug}» was not found`
              },
              { root: true }
            )
          }
          this.page = result.data.entries[0]
        }
      }
    }
  },
  async asyncData({ params, env, query, route, app }) {
    const previewData = await loadPreview({
      params,
      env,
      query,
      graphQLQuery: news
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
  }
}
</script>

<template>
  <div class="Page Page--news">
    <em>This is a news page (= custom entry type apart from pages)</em>
    <BHeading v-if="page" :level="1">{{ page.title }}</BHeading>
  </div>
</template>
