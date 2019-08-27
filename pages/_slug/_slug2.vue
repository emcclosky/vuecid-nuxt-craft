<script>
import basePage from '~/components/_basePage.vue'
import page from '~/apollo/queries/page'

export default {
  extends: basePage,
  data: () => {
    return {
      page: false
    }
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      result(result) {
        this.page = result.data.entries[0]
      }
    }
  },
  mounted() {
    this.log('page: ', this.page)
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
    <BContentSection
      v-if="page"
      class="has-spacing"
      type="div"
      :modifiers="['centered']"
    >
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
