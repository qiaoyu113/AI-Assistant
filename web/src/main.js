import Vue from 'vue'
import Vant from 'vant';
import 'lib-flexible'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
// import 'utils/initFastClick';
import 'utils/permission'
import SvgIcon from 'components/SvgIcon'
import '@/icons' // icon
import '@/style/reset.less' // 常用样式
import '@/style/common.scss'
import 'vant/lib/index.less';// 全局引入Vant 样式
import defaultSettings from '@/settings'
import * as filters from '@/filters'
import global_ from 'components/Global'
import { Toast } from 'vant'
import * as directives from '@/directives'
import { Lazyload } from 'vant';
import { permissionDetail, checkRouteIsNull } from '@/utils'
// import * as Sentry from '@sentry/browser';
// import { Integrations } from '@sentry/tracing';
import Vconsole from 'vconsole';

if (window.location.host !== 'h5.morexpress.com.cn') {
  const vConsole = new Vconsole()
  Vue.use(vConsole)
}
/* import Vconsole from 'vconsole'
const vConsole = new Vconsole() */

// if (window.location.host === 'szjw-bss-h5.yunniao.cn') {
//   Sentry.init({
//     Vue,
//     release: 'szjw-h5',
//     dsn: 'https://5b631f98184146ebbb74cc52ae3c1b41@sentry.yunniao.cn/3',
//     autoSessionTracking: true,
//     integrations: [
//       new Integrations.BrowserTracing()
//     ],

//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0
//   })
// }

Vue.prototype.$permissionDetail = permissionDetail
Vue.prototype.$checkRouteIsNull = checkRouteIsNull
import '@vant/touch-emulator';
Vue.use(Lazyload);
const EventBus = new Vue()

Vue.prototype.$toast = Toast

let loading = null
Vue.prototype.$loading = (status, message = '加载中...', icon = 'logistics') => {
  Toast.allowMultiple();
  if (status) {
    if (!loading) {
      store.state.overlay = true
      loading = Toast.loading({
        duration: 0,
        icon,
        message,
        // forbidClick: true,
        loadingType: 'spinner'
      })
    }
  } else {
    if (loading) {
      store.state.overlay = false
      loading.clear()
      loading = null
    }
  }
}
Vue.prototype.$fail = (message) => {
  Toast.fail(message)
}

Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}
// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives)[key])
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'

if (process.env.NODE_ENV !== 'production') {
  mockXHR()
}

// options 为可选参数，无则不传
Vue.use(Vant)

Vue.component('svg-icon', SvgIcon)

if (process.env.NODE_ENV === 'development' && defaultSettings.vconsole) {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
// var vConsole = new VConsole(option)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.prototype.GLOBAL = global_

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function() {
      return EventBus
    }
  }
})

new Vue({
  router,
  store,
  EventBus,
  render: h => h(App)
}).$mount('#app')
