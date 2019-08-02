<script>
export default {
  name: 'BBtn',
  props: {
    to: {
      type: [Object, String, Boolean],
      default: false,
      required: false
    },
    exact: {
      type: Boolean,
      default: false,
      required: false
    },
    type: {
      type: String,
      default: 'button',
      required: false
    },
    /**
     * A word about external links: Why not handle hrefs inside this component I hear you ask.
     * Well it's because if we set href to `false` for <nuxt-link>s, our frontend app will work as
     * intended client-side, but no hrefs will be generated for anchor tags from <nuxt-link> during
     * `$ nuxt generate`, this is a huge nicht-nicht for SEO!
     */
    external: {
      type: Boolean,
      default: false,
      required: false
    },
    buttonType: {
      type: [String, Boolean],
      default: 'button',
      required: false
    },
    naked: {
      type: Boolean,
      default: false,
      required: false
    },
    click: {
      type: Function,
      default: () => {},
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    target: {
      type: [String, Boolean],
      default: false,
      required: false
    },
    ariaControls: {
      type: [String, Boolean],
      default: false,
      required: false
    },
    ariaExpanded: {
      type: [String, Boolean],
      default: false,
      required: false
    }
  },
  computed: {
    computedType() {
      if (this.to && !this.external) {
        return 'nuxt-link'
      }
      if (!this.to && this.disabled) {
        return 'span'
      }
      if (this.external) {
        return 'a'
      }
      return this.type
    }
  }
}
</script>

<template>
  <component
    :is="computedType"
    :class="[$options.name, { 'is-naked': naked, 'is-disabled': disabled }]"
    :disabled="computedType === 'button' ? disabled : false"
    :to="!external ? to : false"
    :exact="!external ? exact : false"
    :aria-controls="ariaControls"
    :aria-expanded="ariaExpanded"
    :target="!target && external ? '_blank' : target"
    :type="computedType === 'button' ? buttonType : false"
    :rel="external ? 'noopener' : false"
    @click="click"
  >
    <slot />
  </component>
</template>

<style src="./BBtn.scss" lang="scss" />
