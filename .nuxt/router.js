import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3b582896 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _3f6041c6 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _01107b8f = () => interopDefault(import('../pages/profesores/index.vue' /* webpackChunkName: "pages/profesores/index" */))
const _61ed3cea = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _773f4a9e = () => interopDefault(import('../pages/reservar/index.vue' /* webpackChunkName: "pages/reservar/index" */))
const _6e43b7ac = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _89eabd88 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _3ff93ce4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _3b582896,
    name: "home"
  }, {
    path: "/implementos",
    component: _3f6041c6,
    name: "implementos"
  }, {
    path: "/profesores",
    component: _01107b8f,
    name: "profesores"
  }, {
    path: "/registro",
    component: _61ed3cea,
    name: "registro"
  }, {
    path: "/reservar",
    component: _773f4a9e,
    name: "reservar"
  }, {
    path: "/salones",
    component: _6e43b7ac,
    name: "salones"
  }, {
    path: "/usuarios",
    component: _89eabd88,
    name: "usuarios"
  }, {
    path: "/",
    component: _3ff93ce4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
