<script>
import config from '../config'
import seomaticQuery from '~/apollo/queries/seomatic'

export default {
  apollo: {
    seomatic: {
      query: seomaticQuery,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      result(result) {
        this.seomatic = result.data.seomatic
        this.ogImage =
          result.data &&
          result.data.entries &&
          result.data.entries[0].ogImage &&
          result.data.entries[0].ogImage[0]
            ? result.data.entries[0].ogImage[0]
            : false
      }
    }
  },
  head() {
    if (!this.seomatic) {
      console.warn('No SEO settings from GraphQL query returned.') // eslint-disable-line
    }
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      frontendUrl: config.env.FRONTENDURLPRODUCTION,
      specificOgImage: this.ogImage
      // debug: true
    })
  }
}
</script>
