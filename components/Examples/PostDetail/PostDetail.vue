<script>
export default {
  name: 'PostDetail',
  props: {
    post: {
      type: Object,
      required: true,
    },
    currentPaginationPage: {
      default: 0,
      type: Number,
    },
    pageSlug: {
      default: '',
      type: String,
    },
  },
}
</script>

<template>
  <div v-if="post" class="PostDetail">
    <BHeading v-if="post.title" :level="1" class="PostDetail__title">
      {{ post.title }}
    </BHeading>

    <BRichtext :content="post.content" />

    <div class="PostDetail__btn-container">
      <BBtn
        class="PostDetail__btn"
        :to="{ path: `${pageSlug}`, query: { page: currentPaginationPage } }"
      >
        {{ $t('pagination.allPosts') }}
      </BBtn>
    </div>
  </div>
</template>

<style src="./PostDetail.scss" lang="scss" />
