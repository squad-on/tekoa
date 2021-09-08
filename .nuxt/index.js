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
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_1a02c085 from 'nuxt_plugin_plugin_1a02c085' // Source: ./components/plugin.js (mode: 'all')
import nuxt_plugin_workbox_208fe577 from 'nuxt_plugin_workbox_208fe577' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_1faf170d from 'nuxt_plugin_nuxticons_1faf170d' // Source: ./nuxt-icons.js (mode: 'all')
import nuxt_plugin_bootstrapvue_02db5e4a from 'nuxt_plugin_bootstrapvue_02db5e4a' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_nuxtleaflet_d17dbd6c from 'nuxt_plugin_nuxtleaflet_d17dbd6c' // Source: ./nuxt-leaflet.js (mode: 'client')
import nuxt_plugin_vuescrollto_2412968e from 'nuxt_plugin_vuescrollto_2412968e' // Source: ./vue-scrollto.js (mode: 'client')
import nuxt_plugin_nuxtvueselect_23d85784 from 'nuxt_plugin_nuxtvueselect_23d85784' // Source: ./nuxt-vue-select.js (mode: 'client')
import nuxt_plugin_pluginrouting_c8636c6a from 'nuxt_plugin_pluginrouting_c8636c6a' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_22aced84 from 'nuxt_plugin_pluginmain_22aced84' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_editorclient_50dedae8 from 'nuxt_plugin_editorclient_50dedae8' // Source: ./tui/editor.client.js (mode: 'client')
import nuxt_plugin_veevalidate_3973d6d0 from 'nuxt_plugin_veevalidate_3973d6d0' // Source: ./vee-validate.js (mode: 'all')
import nuxt_plugin_toast_d593d06c from 'nuxt_plugin_toast_d593d06c' // Source: ./toast.js (mode: 'client')
import nuxt_plugin_axios_6df469ca from 'nuxt_plugin_axios_6df469ca' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_googleanalytics_58fdc3aa from 'nuxt_plugin_googleanalytics_58fdc3aa' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_fontawesome_42bf9e1d from 'nuxt_plugin_fontawesome_42bf9e1d' // Source: ./fontawesome.js (mode: 'all')
import nuxt_plugin_moment_665f29dd from 'nuxt_plugin_moment_665f29dd' // Source: ./moment.js (mode: 'all')
import nuxt_plugin_axios_54e49ad0 from 'nuxt_plugin_axios_54e49ad0' // Source: ../plugins/axios.js (mode: 'all')
import nuxt_plugin_persistedstate_85819a12 from 'nuxt_plugin_persistedstate_85819a12' // Source: ../plugins/persisted-state.js (mode: 'all')
import nuxt_plugin_vue2filters_b7fcef34 from 'nuxt_plugin_vue2filters_b7fcef34' // Source: ../plugins/vue2-filters.js (mode: 'all')
import nuxt_plugin_filters_2b4f519a from 'nuxt_plugin_filters_2b4f519a' // Source: ../plugins/filters.js (mode: 'all')
import nuxt_plugin_url_345d1682 from 'nuxt_plugin_url_345d1682' // Source: ../plugins/url.js (mode: 'all')
import nuxt_plugin_bootstrapvue_84130e72 from 'nuxt_plugin_bootstrapvue_84130e72' // Source: ../plugins/bootstrap-vue.js (mode: 'all')
import nuxt_plugin_quill_967f4cae from 'nuxt_plugin_quill_967f4cae' // Source: ../plugins/quill.js (mode: 'client')
import nuxt_plugin_vcalendar_299c62ab from 'nuxt_plugin_vcalendar_299c62ab' // Source: ../plugins/v-calendar (mode: 'client')
import nuxt_plugin_vmoney_206d48a4 from 'nuxt_plugin_vmoney_206d48a4' // Source: ../plugins/v-money.js (mode: 'client')
import nuxt_plugin_vuethemask_0a766a32 from 'nuxt_plugin_vuethemask_0a766a32' // Source: ../plugins/vue-the-mask.js (mode: 'client')
import nuxt_plugin_vuegoodshare_1b7ad1d2 from 'nuxt_plugin_vuegoodshare_1b7ad1d2' // Source: ../plugins/vue-goodshare.js (mode: 'client')
import nuxt_plugin_datepicker_4a26849c from 'nuxt_plugin_datepicker_4a26849c' // Source: ../plugins/datepicker (mode: 'client')
import nuxt_plugin_plugin_12d0d817 from 'nuxt_plugin_plugin_12d0d817' // Source: ./auth/plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Terrakrya CMS","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"cms"},{"hid":"description","name":"description","content":"Projeto de EAD para criação de trilhas de aprendizagens e desafios de forma rápida e dinâmica"},{"hid":"theme-color","name":"theme-color","content":"black"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"cms"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"cms"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Projeto de EAD para criação de trilhas de aprendizagens e desafios de forma rápida e dinâmica"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com"},{"rel":"dns-prefetch","href":"https:\u002F\u002Ffonts.gstatic.com\u002F"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.gstatic.com\u002F","crossorigin":true},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Montserrat:wght@300;300;400;600;700&family=Arvo:wght@400;700&family=Raleway:wght@400;500;600&display=swap"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.5bbe3dfc.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.24385a.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.24385a.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
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
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_1a02c085 === 'function') {
    await nuxt_plugin_plugin_1a02c085(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_208fe577 === 'function') {
    await nuxt_plugin_workbox_208fe577(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_1faf170d === 'function') {
    await nuxt_plugin_nuxticons_1faf170d(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_02db5e4a === 'function') {
    await nuxt_plugin_bootstrapvue_02db5e4a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtleaflet_d17dbd6c === 'function') {
    await nuxt_plugin_nuxtleaflet_d17dbd6c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuescrollto_2412968e === 'function') {
    await nuxt_plugin_vuescrollto_2412968e(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtvueselect_23d85784 === 'function') {
    await nuxt_plugin_nuxtvueselect_23d85784(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_c8636c6a === 'function') {
    await nuxt_plugin_pluginrouting_c8636c6a(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_22aced84 === 'function') {
    await nuxt_plugin_pluginmain_22aced84(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_editorclient_50dedae8 === 'function') {
    await nuxt_plugin_editorclient_50dedae8(app.context, inject)
  }

  if (typeof nuxt_plugin_veevalidate_3973d6d0 === 'function') {
    await nuxt_plugin_veevalidate_3973d6d0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_d593d06c === 'function') {
    await nuxt_plugin_toast_d593d06c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_6df469ca === 'function') {
    await nuxt_plugin_axios_6df469ca(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_58fdc3aa === 'function') {
    await nuxt_plugin_googleanalytics_58fdc3aa(app.context, inject)
  }

  if (typeof nuxt_plugin_fontawesome_42bf9e1d === 'function') {
    await nuxt_plugin_fontawesome_42bf9e1d(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_665f29dd === 'function') {
    await nuxt_plugin_moment_665f29dd(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_54e49ad0 === 'function') {
    await nuxt_plugin_axios_54e49ad0(app.context, inject)
  }

  if (typeof nuxt_plugin_persistedstate_85819a12 === 'function') {
    await nuxt_plugin_persistedstate_85819a12(app.context, inject)
  }

  if (typeof nuxt_plugin_vue2filters_b7fcef34 === 'function') {
    await nuxt_plugin_vue2filters_b7fcef34(app.context, inject)
  }

  if (typeof nuxt_plugin_filters_2b4f519a === 'function') {
    await nuxt_plugin_filters_2b4f519a(app.context, inject)
  }

  if (typeof nuxt_plugin_url_345d1682 === 'function') {
    await nuxt_plugin_url_345d1682(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_84130e72 === 'function') {
    await nuxt_plugin_bootstrapvue_84130e72(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_quill_967f4cae === 'function') {
    await nuxt_plugin_quill_967f4cae(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vcalendar_299c62ab === 'function') {
    await nuxt_plugin_vcalendar_299c62ab(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vmoney_206d48a4 === 'function') {
    await nuxt_plugin_vmoney_206d48a4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuethemask_0a766a32 === 'function') {
    await nuxt_plugin_vuethemask_0a766a32(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuegoodshare_1b7ad1d2 === 'function') {
    await nuxt_plugin_vuegoodshare_1b7ad1d2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_datepicker_4a26849c === 'function') {
    await nuxt_plugin_datepicker_4a26849c(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_12d0d817 === 'function') {
    await nuxt_plugin_plugin_12d0d817(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
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
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
