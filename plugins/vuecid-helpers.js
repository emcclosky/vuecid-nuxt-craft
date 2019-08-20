import Vue from 'vue'
// import { generateMetaInfo } from '@wearelucid/vuecid-helpers'
import generateMetaInfo from '~/packages/vuecid-craft-helpers/src/meta/generateMetaInfo.js'

// Pass in default options:
const config = {
  // locale: 'de',
  // debug: true,
  // titlePattern: false,
  titlePatternSeparator: ' — '
}

const VuecidHelpers = {
  install(Vue) {
    Vue.prototype.$generateMetaInfo = options => {
      return generateMetaInfo({ ...options, ...config })
    }
  }
}

Vue.use(VuecidHelpers)
