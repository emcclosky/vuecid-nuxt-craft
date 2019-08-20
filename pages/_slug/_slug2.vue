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
    console.log(this.$apollo.store)
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
    <BContentSection class="has-spacing" type="div" :modifiers="['centered']">
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <div v-if="page.richtext && page.richtext.content">
        {{ page.richtext }}
      </div>
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </BContentSection>
  </div>
</template>
