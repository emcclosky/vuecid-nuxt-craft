<script>
import StandardSection from '~/components/Examples/StandardSection/StandardSection.vue'
import { linkHelpersMixin } from '~/mixins/link-helpers'

export default {
  name: 'BPageBuilder',
  components: {
    StandardSection,
  },
  mixins: [linkHelpersMixin],
  props: {
    componentData: {
      type: Array,
      required: true,
    },
  },
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
      <!-- eslint-disable prettier/prettier-->
      <BBtn
        v-if="component.__typename === 'pageBuilder_button_BlockType'"
        :to="link(component.button.url, component.button.type)"
        :target="prepareTarget(component.button.type, component.button.target)"
        :external="isExternal(component.button.url, component.button.type)"
      >
        <!-- eslint-enable prettier/prettier-->
        {{ component.button.customText }}
      </BBtn>
    </div>
  </div>
</template>

<style src="./BPageBuilder.scss" lang="scss" />
