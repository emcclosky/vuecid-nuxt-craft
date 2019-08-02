<script>
export default {
  name: 'BFlexContent',
  props: {
    componentData: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="BFlexContent">
    <BContentSection v-for="(component, index) of componentData" :key="index">
      <BContentSection
        v-if="component.acf_fc_layout === 'section'"
        :type="'div'"
        :modifiers="['centered']"
      >
        <BHeading v-if="component.title" :level="3">
          {{ component.title }}
        </BHeading>
        <BRichtext v-if="component.content" :content="component.content" />
      </BContentSection>
    </BContentSection>
  </div>
</template>

<style src="./BFlexContent.scss" lang="scss" />
