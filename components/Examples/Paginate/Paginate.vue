<script>
import PostsList from '~/components/Examples/PostsList/PostsList.vue'

export default {
  name: 'Paginate',
  components: {
    PostsList
  },
  props: {
    itemList: {
      type: Array,
      default: () => [],
      required: true
    },
    pagesTotal: {
      type: Number,
      default: 0,
      required: true
    },
    currentPaginationPage: {
      type: Number,
      default: 1,
      required: true
    }
  }
}
</script>

<template>
  <div class="Paginate">
    <PostsList v-if="itemList" :posts="itemList" />
    <div class="Paginate__button-container">
      <BBtn
        v-if="currentPaginationPage !== 1"
        :to="{ query: { page: currentPaginationPage - 1 } }"
      >
        {{ $t('pagination.previous') }}
      </BBtn>
      {{ currentPaginationPage }} - {{ pagesTotal }}
      <BBtn
        v-if="currentPaginationPage !== pagesTotal"
        :to="{ query: { page: currentPaginationPage + 1 } }"
      >
        {{ $t('pagination.next') }}
      </BBtn>
    </div>
  </div>
</template>

<style src="./Paginate.scss" lang="scss" />
