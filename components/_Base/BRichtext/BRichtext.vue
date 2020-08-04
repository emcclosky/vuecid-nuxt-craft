<script>
export default {
  name: 'BRichtext',
  props: {
    content: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style src="./BRichtext.scss" lang="scss"></style>

<template>
  <div class="BRichtext">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="content" class="BRichtext__content" v-html="content" />
  </div>
</template>
