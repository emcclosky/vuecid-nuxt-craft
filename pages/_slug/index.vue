<script>
/*
 * If your _slug or your _slug2 template are equal to the /pages/index.vue
 * you should import the index.vue here, add a specific name, because we can't have two vue components with the same name
 * and export it again. Do this for the king of DRY. 🏜
 */
import basePage from '~/components/_basePage.vue'

export default {
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
      <em>This is a _slug page</em>
      <div v-if="pageData">
        <BHeading
          v-if="pageData.alternativePageTitle || pageData.title"
          :level="1"
        >
          {{ pageData.alternativePageTitle || pageData.title }}
        </BHeading>
        <em>PageBuilder component, loading content from Craft CMS:</em>
        <BPageBuilder
          v-if="pageData.pageBuilder"
          :component-data="pageData.pageBuilder"
        />
      </div>
      <BLoader v-else />
    </div>
  </div>
</template>
