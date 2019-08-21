<script>
import gql from 'graphql-tag'
import basePage from '~/components/_basePage.vue'
import Examples from '~/components/Examples/Examples/Examples.vue'
import page from '~/apollo/queries/page'

export default {
  components: {
    Examples
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: 'home' }
      }
    },
    seoyolo: {
      query: gql`{
          seomatic(uri: "/") {
            metaTitleContainer
          }
        }
      `,
      update(data) {
        return data.seomatic
      }
    }
  },
  extends: basePage,
  computed: {
    page() {
      return this.entries && this.entries.length ? this.entries[0] : false
    }
  },
  mounted() {
    this.log('this.seoyolo: ', this.seoyolo)
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
