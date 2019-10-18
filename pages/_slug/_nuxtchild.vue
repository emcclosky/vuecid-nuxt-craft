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
    <em>This is a _nuxtchild page</em>
    <div v-if="page">
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <BPageBuilder
        v-if="page.pageBuilder"
        :component-data="page.pageBuilder"
      />
    </div>
    <BLoader v-else />
  </div>
</template>
