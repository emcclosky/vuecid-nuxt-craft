export const generateModifiers = {
  props: {
    modifiers: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  computed: {
    classnames() {
      return this.className(this.$options.name, this.modifiers)
    },
  },
  methods: {
    className(componentName, modifiers, stateClasses) {
      const mods = modifiers.reduce((str, modifier) => {
        return str + ` ${componentName}--${modifier}`
      }, '')

      const stateC =
        stateClasses && Array.isArray(stateClasses) && stateClasses.length
          ? ' ' + stateClasses.join(' ')
          : stateClasses || ''

      return componentName + mods + stateC
    },
  },
}
