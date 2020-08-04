<script>
export default {
  name: 'StandardSection',
  props: {
    component: {
      type: [Boolean, Object],
      required: true,
      default: false,
    },
  },
  computed: {
    title() {
      return this.component.baseTitle || false
    },
    text() {
      return this.component.baseText || false
    },
  },
}
</script>

<template>
  <div :class="['StandardSection']">
    <BHeading v-if="title" :level="2">{{ title }}</BHeading>
    <BRichtext v-if="text" :content="text" />
  </div>
</template>

<style src="./StandardSection.scss" lang="scss" />
