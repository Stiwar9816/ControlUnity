import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f8d3a434 = () => interopDefault(import('../pages/configuraciones/index.vue' /* webpackChunkName: "pages/configuraciones/index" */))
const _71e948f8 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _42688718 = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _ac5d6e50 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _0c44669f = () => interopDefault(import('../pages/reservar/index.vue' /* webpackChunkName: "pages/reservar/index" */))
const _591c3b08 = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _02eead2a = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _2048dc40 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/configuraciones",
      component: _f8d3a434,
      name: "configuraciones"
    }, {
      path: "/home",
      component: _71e948f8,
      name: "home"
    }, {
      path: "/implementos",
      component: _42688718,
      name: "implementos"
    }, {
      path: "/registro",
      component: _ac5d6e50,
      name: "registro"
    }, {
      path: "/reservar",
      component: _0c44669f,
      name: "reservar"
    }, {
      path: "/salones",
      component: _591c3b08,
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
