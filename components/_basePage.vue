<script>
import config from '../config'
import seomaticQuery from '~/apollo/queries/seomatic'

export default {
  apollo: {
    seomatic: {
      query: seomaticQuery,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        const slug = this.$route.params.slug || config.env.HOMESLUG
        return { slug }
      },
      result(result) {
        this.seomatic = result.data.seomatic
        this.ogImage =
          result.data &&
          result.data.entries &&
          result.data.entries[0] &&
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
      if (!this.$route.params.slug) {
        console.warn(`You seem to try to call the index of the page. Did you maybe forget to add a page with your defined homeslug: "${config.env.HOMESLUG}" ?`) // eslint-disable-line
      }
    }
    return this.$generateMetaFromSeomatic({
      seomaticMeta: this.seomatic,
      frontendUrl: config.env.FRONTENDURLPRODUCTION,
      specificOgImage: this.ogImage
      // ,debug: true
    })
  },
  mounted() {
    // Check if we should be displaying a preview but for some reason did not get any data.
    // Use an alert because this can be used within the template-less basePage
    if (this.preview && !this.page) {
      alert(this.$t('ui.previewAlert'))
    }
  }
}
</script>
