import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

<<<<<<< HEAD
import nuxt_plugin_workbox_71acbb77 from 'nuxt_plugin_workbox_71acbb77' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_4a5a810d from 'nuxt_plugin_nuxticons_4a5a810d' // Source: ./nuxt-icons.js (mode: 'all')
import nuxt_plugin_plugin_029d4389 from 'nuxt_plugin_plugin_029d4389' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_axios_4760211b from 'nuxt_plugin_axios_4760211b' // Source: ./axios.js (mode: 'all')
=======
import nuxt_plugin_workbox_43b3b35a from 'nuxt_plugin_workbox_43b3b35a' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_plugin_5ccd3646 from 'nuxt_plugin_plugin_5ccd3646' // Source: ./vuetify/plugin.js (mode: 'all')
import nuxt_plugin_axios_3979b5be from 'nuxt_plugin_axios_3979b5be' // Source: ./axios.js (mode: 'all')
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)
// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render(h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true
      console.warn(`<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead`)
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,

    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },
      err: null,
      dateErr: null,
      error(err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) ssrContext.nuxt.error = err
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),

    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) throw new Error('inject(key, value) has no key provided')
    if (typeof value === 'undefined') throw new Error('inject(key, value) has no value provided')
    key = '$' + key
    // Add into app
    app[key] = value

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) return
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_71acbb77 === 'function') {
    await nuxt_plugin_workbox_71acbb77(app.context, inject)
  }

<<<<<<< HEAD
  if (typeof nuxt_plugin_nuxticons_4a5a810d === 'function') {
    await nuxt_plugin_nuxticons_4a5a810d(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_029d4389 === 'function') {
    await nuxt_plugin_plugin_029d4389(app.context, inject)
=======
  if (typeof nuxt_plugin_plugin_5ccd3646 === 'function') {
    await nuxt_plugin_plugin_5ccd3646(app.context, inject)
>>>>>>> aa615f183397165a9a6daae6c9323549a8a7237c
  }

  if (typeof nuxt_plugin_axios_4760211b === 'function') {
    await nuxt_plugin_axios_4760211b(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,

    router
  }
}

export { createApp, NuxtError }
