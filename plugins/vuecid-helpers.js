import Vue from 'vue'
// import { generateMetaFromSeomatic } from '@wearelucid/vuecid-craft-helpers'
import generateMetaFromSeomatic from '~/packages/vuecid-craft-helpers/src/meta/generateMetaFromSeomatic.js'

const VuecidHelpers = {
  install(Vue) {
    Vue.prototype.$generateMetaFromSeomatic = (options) => {
      return generateMetaFromSeomatic({ ...options })
    }
  },
}

Vue.use(VuecidHelpers)
