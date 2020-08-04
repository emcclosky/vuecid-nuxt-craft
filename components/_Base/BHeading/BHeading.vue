<script>
/**
 * BHeading Component (allows H1, H2, H3, ...)
 */

import Vue from 'vue'
import { cleanString } from '@wearelucid/vuecid-helpers'

const getChildrenTextContent = (children) => {
  return children
    .map((node) => {
      return node.children ? getChildrenTextContent(node.children) : node.text
    })
    .join('')
}

export default Vue.component('BHeading', {
  props: {
    // BHeading level (1 for h1, 2 for h2, etc.)
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    // If heading is not a simple string use richText property to set the content with domProps.innerHTML
    richText: {
      type: String,
      default: '',
    },
    // If you want to show a little anchor icon on hover and set the window location to the anchor when clicked
    hasClickableAnchor: {
      type: Boolean,
      default: false,
    },
    noMarginTop: {
      type: Boolean,
      default: false,
    },
  },
  render(createElement) {
    // First: check whether we deal with rich text
    const isRichText = this.richText !== ''

    // Create kebab-case id
    let headingId = isRichText
      ? this.richText
      : getChildrenTextContent(this.$slots.default)
    headingId = cleanString(headingId)

    // Workaround: create modifier class
    const modifierClassLevel = `BHeading--level-${this.level}`
    const modifierClassMargin = `BHeading--no-margin-top`

    // Create the actual HTML element: h1, h2, etc.
    return createElement(
      `h${this.level}`,
      {
        class: {
          BHeading: true,
          [modifierClassLevel]: true,
          [modifierClassMargin]: this.noMarginTop,
          'has-clickable-anchor': this.hasClickableAnchor,
        },
        attrs: {
          id: headingId,
        },
      },
      [
        // Create span with content
        createElement('span', {
          class: {
            BHeading__content: true,
          },
          domProps: {
            innerHTML: isRichText
              ? this.richText
              : getChildrenTextContent(this.$slots.default),
          },
        }),
        // Create anchor with id
        createElement(
          'a',
          {
            class: {
              BHeading__anchor: true,
            },
            attrs: {
              href: `#${headingId}`,
              'aria-hidden': true,
            },
          },
          '#'
        ),
      ]
    )
  },
})
</script>

<style src="./BHeading.scss" lang="scss" />
