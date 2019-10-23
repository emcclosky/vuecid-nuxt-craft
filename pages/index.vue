<script>
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'

export default {
  components: {
    Examples
  },
  extends: basePage, // this is where we fetch SEO and page data
  mounted() {
    this.log('this.page: ', this.page)
  }
}
</script>

<template>
  <div class="Page">
    <div v-if="page">
      <div class="examples--center">
        <BHeading
          v-if="page.title || page.alternativePageTitle"
          :no-margin-top="true"
          :level="1"
        >
          {{ page.alternativePageTitle || page.title }}
        </BHeading>
        <em>PageBuilder component, loading content from Craft CMS:</em>
        <BPageBuilder
          v-if="page.pageBuilder"
          :component-data="page.pageBuilder"
        />
      </div>
    </div>
    <Examples :page="page" />
  </div>
</template>
