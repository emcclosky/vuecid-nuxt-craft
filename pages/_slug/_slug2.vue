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
    <em>This is a _slug2 page</em>
    <div v-if="page">
      <BHeading v-if="page.title || page.alternativePageTitle" :level="1">
        {{ page.alternativePageTitle || page.title }}
      </BHeading>
      <BPageBuilder
        v-if="page.pageBuilder"
        :component-data="page.pageBuilder"
      />
    </div>
    <BLoader v-else />
  </div>
</template>
