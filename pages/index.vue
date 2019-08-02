<script>
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'
import page from '~/apollo/queries/page'

export default {
  components: {
    Examples
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      }
    }
  },
  extends: basePage,
  mounted() {
    this.log('this.apollo: ', this.apollo)
  }
  // computed: mapGetters('data', ['page'])
}
</script>

<template>
  <div v-if="entries" class="Page">
    <no-ssr>
      <Examples :page="entries" />
    </no-ssr>
  </div>
</template>
