<script>
import { mapGetters } from 'vuex'
import basePage from '~/components/_basePage.vue'
import PostDetail from '~/components/Examples/PostDetail/PostDetail.vue'

export default {
  components: {
    PostDetail
  },
  extends: basePage,
  computed: {
    ...mapGetters('data', ['page']),
    ...mapGetters('ui', ['currentPaginationPage']),
    postTypeSlug() {
      // The page slug can differ in a multilang project, here we get the correct slug to pass to the postDetail view.
      return this.$route.path.slice(0, -(this.$route.params.slug.length + 1))
    }
  }
}
</script>

<template>
  <div v-if="page" :key="page.title" class="Page">
    <PostDetail
      :post="page || {}"
      :current-pagination-page="currentPaginationPage"
      :page-slug="postTypeSlug"
    />
  </div>
</template>
