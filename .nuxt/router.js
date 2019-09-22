import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
const _1f34ff9f = () => interopDefault(import('../pages/control_reservas/index.vue' /* webpackChunkName: "pages/control_reservas/index" */))
const _7a4de5be = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _3b1a3adb = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _83fa3816 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _207601bc = () => interopDefault(import('../pages/reservar/index.vue' /* webpackChunkName: "pages/reservar/index" */))
const _7941efbf = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _17204847 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _c27adbba = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
=======
const _71e948f8 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _42688718 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _ac5d6e50 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _0c44669f = () => interopDefault(import('../pages/reservar/index.vue' /* webpackChunkName: "pages/reservar/index" */))
const _591c3b08 = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _02eead2a = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _2048dc40 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
<<<<<<< HEAD
      path: "/control_reservas",
      component: _1f34ff9f,
      name: "control_reservas"
    }, {
=======
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c
      path: "/home",
      component: _7a4de5be,
      name: "home"
    }, {
      path: "/implementos",
      component: _3b1a3adb,
      name: "implementos"
    }, {
      path: "/registro",
      component: _83fa3816,
      name: "registro"
    }, {
      path: "/reservar",
      component: _207601bc,
      name: "reservar"
    }, {
      path: "/salones",
      component: _7941efbf,
      name: "salones"
    }, {
      path: "/usuarios",
      component: _17204847,
      name: "usuarios"
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
