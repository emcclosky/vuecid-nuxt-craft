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
    <div class="examples--center">
      <em>This is a _slug page</em>
      <div v-if="page">
        <BHeading v-if="page.title || page.alternativePageTitle" :level="1">
          {{ page.alternativePageTitle || page.title }}
        </BHeading>
        <em>PageBuilder component, loading content from Craft CMS:</em>
        <BPageBuilder
          v-if="page.pageBuilder"
          :component-data="page.pageBuilder"
        />
      </div>
      <BLoader v-else />
    </div>
  </div>
</template>
