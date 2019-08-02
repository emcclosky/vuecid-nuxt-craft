import Vue from 'vue'
import { generateMetaInfo } from '@wearelucid/vuecid-helpers/dist/wp'

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
