<script>
import { mapState, mapGetters } from 'vuex'
import basePage from '~/components/_basePage.vue'
import PostsList from '~/components/Examples/PostsList/PostsList.vue'

export default {
  components: {
    PostsList
  },
  extends: basePage,
  computed: {
    ...mapGetters('data', ['page']),
    ...mapState({
      customPosts: state => state.data.bundle.my_custom_post_type
    })
  }
}
</script>

<template>
  <div v-if="page" :key="page.title" class="Page">
    <BContentSection :modifiers="['centered']">
      <BHeading v-if="page" :level="1">{{ page.title }}</BHeading>
      <PostsList v-if="customPosts" :posts="customPosts" />
    </BContentSection>
  </div>
</template>
