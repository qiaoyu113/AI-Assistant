import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let routes = [
  {
    path: '/404',
    name: '404',
    // component: () => import(/* webpackChunkName: "404" */ 'views/404.vue'),
    component: resolve => require(['@/views/404'], resolve),
    meta: {
      title: '404',
      keepAlive: true
    }
  }
]

const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule)
})

routes = routes.concat({
  path: '*',
  redirect: '/404'
})

const createRouter = () => new Router({
  mode: 'hash', // require service support
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
  },
  routes
})

const myRouter = createRouter()

// const myRouter = new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

myRouter.beforeEach((to, from, next) => {
  if (to.params.direction) {
    store.commit('updateDirection', to.params.direction)
  } else {
    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit('updateDirection', 'forward')
      } else {
        store.commit('updateDirection', 'back')
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      to.path !== '/' && history.setItem(to.path, historyCount)
      store.commit('updateDirection', 'forward')
    }
  }
  next()
})
myRouter.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = myRouter.history.pending.fullPath | '/';
  if (isChunkLoadFailed) {
    // myRouter.replace(targetPath);
    window.location.href = targetPath;
  }
});

export function resetRouter() {
  myRouter.replace('/login')
}

export default myRouter
