<script>
import { mapGetters } from 'vuex'
import basePage from '~/components/_basePage.vue'
import page from '~/apollo/queries/page'

export default {
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      }
    }
  },
  extends: basePage,
  computed: {
    ...mapGetters('data', ['page']),
    page() {
      return this.entries.length ? this.entries[0] : false
    }
  },
  mounted() {
    this.log('entries: ', this.entries)
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

    <BHeading v-if="page.title" :level="1">
      {{ page.title }}
    </BHeading>
  </div>
</template>
