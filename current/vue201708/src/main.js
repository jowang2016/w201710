// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import {DomPortal, InfiScroll} from 'wwy2017'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Store from './store'
import VueRouter from 'vue-router'
import Routers from './router/index'
import Vuex from 'vuex'
import 'font-awesome/css/font-awesome.min.css'
import VueTouch from 'vue-touch'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(DomPortal)
Vue.use(Vuex)
/* eslint-disable */
Vue.use(VueLazyload)
Vue.use(InfiScroll)
Vue.use(VueTouch)
const router = new VueRouter(Routers)
const store = new Vuex.Store(Store)
Vue.config.productionTip = false
// directive
function getTarget (node = document.body) {
  if (node === true) {
    return document.body
  }
  return node instanceof window.Node ? node : document.querySelector(node)
}
const homes = new Map()
Vue.directive('transfer', {
  inserted (el, {value}, vnode) {
    const {parentNode} = el
    const home = document.createComment('')
    let hasMovedOut = false
    if (value !== false) {
      parentNode.replaceChild(home, el)
      getTarget(value).appendChild(el)
      hasMovedOut = true
    }
    if (!homes.has(el)) homes.set(el, {parentNode, home, hasMovedOut})
  },
  componentUpdated (el, {value}) {
    const {parentNode, home, hasMovedOut} = homes.get(el)
    if (!hasMovedOut && value) {
      parentNode.replaceChild(home, el)
      getTarget(value).appendChild(el)
      hoems.set(el, Object.assign({}, home.get(el), {hasMovedOut: true}))
    } else if (hasMovedOut && value === false) {
      parentNode.replaceChild(el, home)
      homes.set(el, Object.assign({}, homes.get(el), {hasMovedOut: false}))
    } else if (value) {
      getTarget(value).appendChild(el)
    }
  },
  unbind (el, binding) {
    homes.delete(el)
  }
})
// mixin
var mixin1 = {
  data: function () {
    return {
      'm1': 'm1'
    }
  },
  methods: {
    me1: function () {
      console.log('me111')
    }
  },
  created: function () {
    this.m1 = '11'
    this.me1()
    // 全局注册混入对象
    console.log('ott', this.$options.myOption)
  }
}

/* eslint-disable no-new */
new Vue({
  mixins: [mixin1],
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  myOption: 'option222'
})
