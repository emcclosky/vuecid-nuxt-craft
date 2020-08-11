<script>
import basePage from '~/components/_basePage.vue'

export default {
  name: 'Slug2', // '_slug2 throws a warning that this is an invalid component name, because of the underline _'
  extends: basePage,
  data: () => {
    return {
      // page: false
    }
  },
}
</script>

<template>
  <div class="Page">
    <div class="examples--center">
      <em>This is a _slug2 page</em>
      <div v-if="pageData">
        <BHeading
          v-if="pageData.alternativePageTitle || pageData.title"
          :level="1"
        >
          {{ pageData.alternativePageTitle || pageData.title }}
        </BHeading>
        <BPageBuilder
          v-if="pageData.pageBuilder"
          :component-data="pageData.pageBuilder"
        />
      </div>
      <BLoader v-else />
    </div>
  </div>
</template>
