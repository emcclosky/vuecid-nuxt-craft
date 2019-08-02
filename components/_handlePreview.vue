<script>
import { isWordPressPreview } from '@wearelucid/vuecid-helpers/dist/wp'
import config from '~/config'

export default {
  data: () => {
    return {
      routeAliases: config.routeAliases
    }
  },
  watch: {
    // Watch changes to $route and check if the page is viewed from a WordPress preview
    $route() {
      this.checkAndLoadWordPressPreview()
    }
  },
  beforeMount() {
    // If we have a preview AND the current slug has a route alias, we should replace the route with its alias
    // Example: `/posts/hallo-welt/?preview_id=blabla` -> `/beitraege/hallo-welt/?preview_id=blabla`
    // Even works with lang slugs, what an exciting time to be alive: `/fr/posts/bonjour-monde/?preview_id=blabla` -> `/fr/articles/bonjour-monde/?preview_id=blabla`
    if (
      isWordPressPreview(this.$route) &&
      this.hasRouteAlias(this.$route.params.slug)
    ) {
      this.log(
        '☝️ components/_handlePreview.vue — Attenzione: This is a preview AND it has a route alias. I will replace the slug with its alias!'
      )
      this.replaceRouteWithAlias(this.$route.params.slug)
    }
  },
  mounted() {
    // Won't work on created(), plz wait until mounted.
    // (This also applies for the `immediate: true` option for watchers, bc it will fire on created, so better don't use it in this case.)
    this.checkAndLoadWordPressPreview()
  },
  methods: {
    hasRouteAlias(slug) {
      return !!this.routeAliases.hasOwnProperty(slug)
    },
    findRouteAlias(slug) {
      // Find the route alias in `routeAliases` object in config.js.
      // At this point we know that `this.$route.params.slug` (`posts` for example) is in our `routeAliases` object.
      // Now we just need to get the localized route alias 🎉
      // eslint-disable-next-line prettier/prettier
      return this.routeAliases[slug].locales[this.$i18n.locale]
    },
    replaceRouteWithAlias(slug) {
      // Now we can simply replace the slug with its alias.
      // eslint-disable-next-line prettier/prettier
      const aliasRoute = this.$route.fullPath.replace(`/${slug}`, this.findRouteAlias(slug))
      this.$router.replace(aliasRoute)
    },
    checkAndLoadWordPressPreview() {
      if (isWordPressPreview(this.$route)) this.loadPreview()
    },
    async loadPreview() {
      try {
        await this.$store.dispatch('data/loadPreview')
      } catch (e) {
        this.$nuxt.error(e)
      }
    }
  }
}
</script>
