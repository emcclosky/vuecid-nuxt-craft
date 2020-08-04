<script>
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'

export default {
  components: {
    Examples,
  },
  extends: basePage, // this is where we fetch SEO and page data
  mounted() {
    this.log('this.pageData: ', this.pageData)
  },
}
</script>

<template>
  <div class="Page">
    <div v-if="pageData">
      <div class="examples--center">
        <BHeading
          v-if="pageData.alternativePageTitle || pageData.title"
          :no-margin-top="true"
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
    </div>
    <Examples :page="pageData" />
  </div>
</template>
