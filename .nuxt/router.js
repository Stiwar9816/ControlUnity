import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42688718 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _2d3be63a = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _ac5d6e50 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
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
      path: "/login",
      component: _2d3be63a,
      name: "login"
    }, {
      path: "/registro",
      component: _ac5d6e50,
      name: "registro"
    }, {
      path: "/salones",
      component: _591c3b08,
      name: "salones"
    }, {
      path: "/",
      component: _c27adbba,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
