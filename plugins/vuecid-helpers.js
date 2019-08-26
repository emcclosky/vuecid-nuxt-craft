import Vue from 'vue'
import { generateMetaFromSeomatic } from '@wearelucid/vuecid-craft-helpers'

// Pass in default options:
const config = {
  // locale: 'de',
  // debug: true,
  // titlePattern: false,
  titlePatternSeparator: ' — '
}

const VuecidHelpers = {
  install(Vue) {
    Vue.prototype.$generateMetaFromSeomatic = options => {
      return generateMetaFromSeomatic({ ...options, ...config })
    }
  }
}

Vue.use(VuecidHelpers)
