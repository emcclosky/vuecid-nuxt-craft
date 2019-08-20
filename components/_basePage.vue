<script>
export default {
  head() {
    if (!this.page) {
      return {
        title: 'nothing'
      }
    }
    this.log('this.page: ', this.page)
    return {
      title: 'hallejuli'
    }
    // return this.$generateMetaInfo({
    //   siteSettings: {},
    //   post: this.page,
    //   locale: this.$i18n.locale,
    //   path: this.$route.path
    // })
  }
}
</script>
