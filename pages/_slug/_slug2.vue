<script>
import basePage from '~/components/_basePage.vue'
import page from '~/apollo/queries/page'
import loadPreviewData from '~/util/loadPreviewData.js'

export default {
  extends: basePage,
  data: () => {
    return {
      page: false
    }
  },
  async asyncData({ params, env, query }) {
    const previewData = await loadPreviewData({
      params,
      env,
      query,
      graphQLQuery: page
    })
    if (previewData) {
      return { ...previewData }
    }
    return { preview: false }
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          this.page = result.data.entries[0]
        }
      }
    }
  },
  mounted() {
    // this.log('page: ', this.page)
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
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </BContentSection>
  </div>
</template>
