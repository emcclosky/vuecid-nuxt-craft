<script>
import { mapGetters } from 'vuex'
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'
import pages from '~/apollo/queries/pages'

export default {
  components: {
    Examples
  },
  apollo: {
    pages: {
      prefetch: true,
      query: pages
    }
  },
  extends: basePage
  // computed: mapGetters('data', ['page'])
}
</script>

<template>
  <div v-if="pages" class="Page">
    <Examples :page="pages" />
  </div>
</template>
