<script>
import allNews from '~/apollo/queries/allNews'
import config from '~/config'
import seomaticOptions from '~/apollo/options/seomaticOptions'

export default {
  name: 'News',
  nuxtI18n: {
    // If you change these settings, you need to rerun `$ yarn dev`
    paths: {
      en: '/news', // -> accessible at /news (no prefix since it's the default locale)
      de: '/neuigkeiten', // -> accessible at /de/neuigkeiten
    },
  },
  apollo: {
    seomatic() {
      return seomaticOptions({ ctx: this, baseSlug: 'news' })
    },
    entries: {
      query: allNews,
      variables() {
        // get craft site handle depending on language
        const site = this.$i18n.locales.find(
          (l) => l.code === this.$i18n.locale
        )
        return { site }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          if (!result.data.entries || !result.data.entries.length) {
            this.$store.dispatch(
              'throwError',
              {
                statusCode: 404,
                message: `News could not be fetched`,
              },
              { root: true }
            )
          }
          this.news = result.data.entries
        }
      },
    },
  },
  data: () => {
    return {
      news: null,
    }
  },
  methods: {
    prepareNuxtLink(uri) {
      const langPrefix =
        this.$i18n.locale === config.env.DEFAULTLANG
          ? ''
          : `/${this.$i18n.locale}`
      // because craft languages are not represented in URIs we need to add them here
      return `${langPrefix}/${uri}`
    },
  },
  head() {
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      lang: this.$i18n.locale,
      // ,debug: true
    })
  },
}
</script>

<template>
  <div class="Page Page--news">
    <em>This is the news overview page in locale: «{{ this.$i18n.locale }}»</em>
    <ul v-if="news">
      <li v-for="(entry, index) in news" :key="index">
        <nuxt-link :to="prepareNuxtLink(entry.uri)">
          {{ entry.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
