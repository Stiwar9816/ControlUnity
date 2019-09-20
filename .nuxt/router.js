import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
const _3b1a3adb = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _a9b72f86 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _83fa3816 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _7941efbf = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _c27adbba = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
=======
const _71e948f8 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _42688718 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _ac5d6e50 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _591c3b08 = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _02eead2a = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _2048dc40 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
>>>>>>> 9cd5157540eb50532b0a435b0376f5f3453b3021

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/home",
      component: _71e948f8,
      name: "home"
    }, {
      path: "/implementos",
      component: _3b1a3adb,
      name: "implementos"
    }, {
<<<<<<< HEAD
      path: "/login",
      component: _a9b72f86,
      name: "login"
    }, {
=======
>>>>>>> 9cd5157540eb50532b0a435b0376f5f3453b3021
      path: "/registro",
      component: _83fa3816,
      name: "registro"
    }, {
      path: "/salones",
      component: _7941efbf,
      name: "salones"
    }, {
      path: "/usuarios",
      component: _02eead2a,
      name: "usuarios"
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
