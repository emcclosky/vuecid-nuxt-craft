<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import basePage from '~/components/_basePage.vue'
import Paginate from '~/components/Examples/Paginate/Paginate.vue'
import PostsList from '~/components/Examples/PostsList/PostsList.vue'

export default {
  components: {
    Paginate,
    PostsList
  },
  extends: basePage,
  data: () => ({
    postsPerPage: 10
  }),
  computed: {
    ...mapGetters('data', ['page']),
    ...mapGetters('ui', ['currentPaginationPage']),
    ...mapState({
      ui: state => state.ui,
      posts: state => state.data.bundle.posts
    }),
    currentPostsList() {
      // Returns the currentPostList based on your postsPerPage and the currentPaginationPage
      const currentPage = this.currentPaginationPage
        ? this.currentPaginationPage
        : 1
      if (!this.posts) return
      return this.posts.slice(
        (currentPage - 1) * this.postsPerPage,
        currentPage * this.postsPerPage
      )
    },
    pagesTotal() {
      // Returns a number of how many pages there are in total (ceiled)
      if (!this.posts) return
      return Math.ceil(this.posts.length / this.postsPerPage)
    }
  },
  watch: {
    $route() {
      // Check after each route change – query or current set pagination from store
      this.saveCurrentPaginationPage(
        this.$route.query.page
          ? parseInt(this.$route.query.page)
          : this.currentPaginationPage
      )
    }
  },
  created() {
    // Check upon creation – set to 1 to ensure lang switch works
    this.saveCurrentPaginationPage(
      this.$route.query.page ? parseInt(this.$route.query.page) : 1
    )
  },
  methods: {
    ...mapActions('ui', ['saveCurrentPaginationPage'])
  }
}
</script>

<template>
  <div v-if="page" :key="page.title" class="Page">
    <BHeading v-if="page" :level="1">{{ page.title }}</BHeading>
    <!-- if there is a postsPerPage paginate posts -->
    <Paginate
      v-if="currentPostsList && currentPostsList.length && postsPerPage"
      :pages-total="pagesTotal"
      :item-list="currentPostsList"
      :current-pagination-page="currentPaginationPage"
    />
    <!-- if there is no postsPerPage we display all posts at once -->
    <PostsList v-if="posts && !postsPerPage" :posts="posts" />
  </div>
</template>
