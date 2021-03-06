import Vue from 'vue'
import ElementUI from 'element-ui'

import 'animate.css' // animate.css
import 'element-ui/lib/theme-chalk/index.css' // element-ui
import '../node_modules/nprogress/nprogress.css' // nprogress
import '@/styles/index.scss' // global css

import App from '@/App.vue'
import router from '@/router/router.js'
import store from '@/store/store.js'

// 路由守卫来验证登陆权限, 以及路由的跳转
import { getCookie, removeCookie } from '@/utils/cookie.js'
router.beforeEach((to, from, next) => {
  if (to.path == '/getout') {
    removeCookie()
    next()
  }
  // 必须要有cookie 才能进去路由，同时有cookie后需要防止额外的跳转
  if (getCookie()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
    // else if (!to.meta.isboo) {
    //   // 有了cookie后还要防止 路由不存在， 一旦没有我们定义的路由，直接跳转到主页
    //   // 加个判断，否则会无限循环
    //   if (to.fullPath == '/home/sub-home') {
    //     next()
    //   } else {
    //     next('/home/sub-home')
    //   }
    // }
  } else {
    // 当你直接next('/login')时，必须做一个判断，否则单纯这样设置会造成循环，
    // 因为next('/login')是一个跳转，并不是直接通过，每次跳转路由守卫都会进行判断的。
    // 所以当为'login'时，必须设置为next()表示通过， 不能重新设置next('/login')跳转
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
