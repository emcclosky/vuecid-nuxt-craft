<script>
import basePage from '~/components/_basePage.vue'

export default {
  extends: basePage,
  data: () => {
    return {
      page: false
    }
  }
}
</script>

<template>
  <div class="Page">
    <em>This is a _slug page</em>
    <div v-if="page">
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </div>
    <BLoader v-else />
  </div>
</template>
