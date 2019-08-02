<script>
import { mapGetters } from 'vuex'
import basePage from '~/components/_basePage.vue'

export default {
  extends: basePage,
  computed: mapGetters('data', ['page'])
}
</script>

<template>
  <div v-if="page" :key="page.title" class="Page">
    <BContentSection :modifiers="['centered']">
      <BHeading v-if="page.title" :level="1">{{ page.title }}</BHeading>
    </BContentSection>

    <BContentSection
      :modifiers="['centered']"
      style="background: #efefef; text-align: center; padding: 1em;"
    >
      <em>This is a _slug page</em>
    </BContentSection>

    <BContentSection>
      <BFlexContent
        v-if="page.flex_content"
        :component-data="page.flex_content"
      />
    </BContentSection>
  </div>
</template>
