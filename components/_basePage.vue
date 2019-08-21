<script>
import seomaticQuery from '~/apollo/queries/seomatic'

export default {
  apollo: {
    seomatic: {
      query: seomaticQuery,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      }
    }
  },
  head() {
    if (!this.seomatic) {
      console.warn('No SEO settings from GraphQL query returned.') // eslint-disable-line
    }
    this.log('this.seomatic: ', this.seomatic)
    return this.$generateMetaInfo({
      siteSettings: {},
      post: this.page,
      locale: this.$i18n.locale,
      path: this.$route.path
    })
  }
}
</script>
