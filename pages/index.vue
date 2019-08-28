<script>
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'
import page from '~/apollo/queries/page'
import config from '~/config.js'
import loadPreviewData from '~/util/loadPreviewData.js'

export default {
  components: {
    Examples
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: config.env.HOMESLUG }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          this.page = result.data.entries[0]
        }
      }
    }
  },
  extends: basePage,
  async asyncData({ params, env, query }) {
    const previewData = await loadPreviewData({
      params,
      env,
      query,
      graphQLQuery: page,
      specificSlug: env.HOMESLUG
    })
    if (previewData) {
      return { ...previewData }
    }
    return { preview: false }
  },
  mounted() {
    this.log('this.page: ', this.page)
  }
}
</script>

<template>
  <div class="Page">
    <div v-if="page">
      <no-ssr>
        <BContentSection
          class="has-spacing"
          type="div"
          :modifiers="['centered']"
        >
          <BHeading v-if="page.title" :level="1">
            {{ page.title }}
          </BHeading>
        </BContentSection>

        <Examples :page="page" />
      </no-ssr>
    </div>
    <div v-else>
      Maybe you forgot to create a page with your home slug set in your config?
    </div>
  </div>
</template>
