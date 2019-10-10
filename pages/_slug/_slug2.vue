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
    <BContentSection
      :modifiers="['centered']"
      style="background: #efefef; text-align: center; padding: 1em;"
    >
      <em>This is a _slug page</em>
    </BContentSection>
    <BContentSection
      v-if="page"
      class="has-spacing"
      type="div"
      :modifiers="['centered']"
    >
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </BContentSection>
    <BLoader v-else />
  </div>
</template>
