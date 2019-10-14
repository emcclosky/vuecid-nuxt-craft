<script>
import StandardSection from '~/components/Examples/StandardSection/StandardSection.vue'

export default {
  name: 'BPageBuilder',
  components: {
    StandardSection
  },
  props: {
    componentData: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <!-- eslint-disable-next-line -->
  <div :class="['BPageBuilder']">
    <div v-for="(component, index) in componentData" :key="index">
      <StandardSection
        v-if="component.__typename === 'pageBuilder_standardSection_BlockType'"
        :component="component"
      />
    </div>
  </div>
</template>

<style src="./BPageBuilder.scss" lang="scss" />
