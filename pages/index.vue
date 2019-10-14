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
      <client-only>
        <BHeading v-if="page.title" :level="1">
          {{ page.title }}
        </BHeading>
        <BPageBuilder
          v-if="page.pageBuilder"
          :component-data="page.pageBuilder"
        />
      </client-only>
    </div>
    <div v-else>
      Maybe you forgot to create a page with your home slug set in your config?
    </div>
    <Examples :page="page" />
  </div>
</template>
