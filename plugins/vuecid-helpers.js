import Vue from 'vue'
// import { generateMetaInfo } from '@wearelucid/vuecid-helpers'
import generateMetaFromSeomatic from '~/packages/vuecid-craft-helpers/src/meta/generateMetaFromSeomatic.js'

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
