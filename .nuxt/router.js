import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42688718 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _591c3b08 = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _2048dc40 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/implementos",
      component: _42688718,
      name: "implementos"
    }, {
      path: "/salones",
      component: _591c3b08,
      name: "salones"
    }, {
      path: "/",
      component: _2048dc40,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
