import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _38b7a764 = () => interopDefault(import('../pages/agenda/index.vue' /* webpackChunkName: "pages/agenda/index" */))
const _6ccb59f0 = () => interopDefault(import('../pages/biblioteca/index.vue' /* webpackChunkName: "pages/biblioteca/index" */))
const _c0e2127a = () => interopDefault(import('../pages/conta/index.vue' /* webpackChunkName: "pages/conta/index" */))
const _1b79cb3a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _9632bb08 = () => interopDefault(import('../pages/loja/index.vue' /* webpackChunkName: "pages/loja/index" */))
const _10286410 = () => interopDefault(import('../pages/noticias/index.vue' /* webpackChunkName: "pages/noticias/index" */))
const _d60d8916 = () => interopDefault(import('../pages/conta/contacts/index.vue' /* webpackChunkName: "pages/conta/contacts/index" */))
const _72dd7b0a = () => interopDefault(import('../pages/conta/events/index.vue' /* webpackChunkName: "pages/conta/events/index" */))
const _3401f7dc = () => interopDefault(import('../pages/conta/loja/index.vue' /* webpackChunkName: "pages/conta/loja/index" */))
const _821c1a1e = () => interopDefault(import('../pages/conta/medias/index.vue' /* webpackChunkName: "pages/conta/medias/index" */))
const _338ccaa8 = () => interopDefault(import('../pages/conta/menus/index.vue' /* webpackChunkName: "pages/conta/menus/index" */))
const _8e0f4110 = () => interopDefault(import('../pages/conta/pages/index.vue' /* webpackChunkName: "pages/conta/pages/index" */))
const _6b848a7c = () => interopDefault(import('../pages/conta/pedidos/index.vue' /* webpackChunkName: "pages/conta/pedidos/index" */))
const _96b33672 = () => interopDefault(import('../pages/conta/posts/index.vue' /* webpackChunkName: "pages/conta/posts/index" */))
const _1bc97efc = () => interopDefault(import('../pages/conta/produtos/index.vue' /* webpackChunkName: "pages/conta/produtos/index" */))
const _1db73c4c = () => interopDefault(import('../pages/conta/profile.vue' /* webpackChunkName: "pages/conta/profile" */))
const _292bd976 = () => interopDefault(import('../pages/conta/settings/index.vue' /* webpackChunkName: "pages/conta/settings/index" */))
const _3a4e0e88 = () => interopDefault(import('../pages/conta/users/index.vue' /* webpackChunkName: "pages/conta/users/index" */))
const _580a2560 = () => interopDefault(import('../pages/loja/carrinho.vue' /* webpackChunkName: "pages/loja/carrinho" */))
const _22695560 = () => interopDefault(import('../pages/loja/finalizar-pedido.vue' /* webpackChunkName: "pages/loja/finalizar-pedido" */))
const _18a97c89 = () => interopDefault(import('../pages/conta/events/new.vue' /* webpackChunkName: "pages/conta/events/new" */))
const _3f47d27f = () => interopDefault(import('../pages/conta/medias/new.vue' /* webpackChunkName: "pages/conta/medias/new" */))
const _09532bf6 = () => interopDefault(import('../pages/conta/menus/new.vue' /* webpackChunkName: "pages/conta/menus/new" */))
const _5f3db4c6 = () => interopDefault(import('../pages/conta/pages/new.vue' /* webpackChunkName: "pages/conta/pages/new" */))
const _15fac1d5 = () => interopDefault(import('../pages/conta/posts/new.vue' /* webpackChunkName: "pages/conta/posts/new" */))
const _e7ce356c = () => interopDefault(import('../pages/conta/produtos/new.vue' /* webpackChunkName: "pages/conta/produtos/new" */))
const _5f8861ec = () => interopDefault(import('../pages/conta/users/new.vue' /* webpackChunkName: "pages/conta/users/new" */))
const _2257a4ad = () => interopDefault(import('../pages/conta/pedidos/_id/index.vue' /* webpackChunkName: "pages/conta/pedidos/_id/index" */))
const _62b5e6a6 = () => interopDefault(import('../pages/conta/events/_id/edit.vue' /* webpackChunkName: "pages/conta/events/_id/edit" */))
const _5e8cda70 = () => interopDefault(import('../pages/conta/medias/_id/edit.vue' /* webpackChunkName: "pages/conta/medias/_id/edit" */))
const _647c594e = () => interopDefault(import('../pages/conta/menus/_id/edit.vue' /* webpackChunkName: "pages/conta/menus/_id/edit" */))
const _101c4c89 = () => interopDefault(import('../pages/conta/pages/_id/edit.vue' /* webpackChunkName: "pages/conta/pages/_id/edit" */))
const _501810da = () => interopDefault(import('../pages/conta/posts/_id/edit.vue' /* webpackChunkName: "pages/conta/posts/_id/edit" */))
const _7dfece85 = () => interopDefault(import('../pages/conta/produtos/_id/edit.vue' /* webpackChunkName: "pages/conta/produtos/_id/edit" */))
const _5fe7fcc5 = () => interopDefault(import('../pages/conta/users/_id/edit.vue' /* webpackChunkName: "pages/conta/users/_id/edit" */))
const _534cea36 = () => interopDefault(import('../pages/agenda/_id.vue' /* webpackChunkName: "pages/agenda/_id" */))
const _3f9d1120 = () => interopDefault(import('../pages/biblioteca/_id.vue' /* webpackChunkName: "pages/biblioteca/_id" */))
const _157313e4 = () => interopDefault(import('../pages/loja/_id.vue' /* webpackChunkName: "pages/loja/_id" */))
const _47a02a78 = () => interopDefault(import('../pages/noticias/_id.vue' /* webpackChunkName: "pages/noticias/_id" */))
const _51d22823 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _49fc516a = () => interopDefault(import('../pages/_id.vue' /* webpackChunkName: "pages/_id" */))

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
    path: "/agenda",
    component: _38b7a764,
    name: "agenda___pt-BR"
  }, {
    path: "/biblioteca",
    component: _6ccb59f0,
    name: "biblioteca___pt-BR"
  }, {
    path: "/conta",
    component: _c0e2127a,
    name: "conta___pt-BR"
  }, {
    path: "/login",
    component: _1b79cb3a,
    name: "login___pt-BR"
  }, {
    path: "/loja",
    component: _9632bb08,
    name: "loja___pt-BR"
  }, {
    path: "/noticias",
    component: _10286410,
    name: "noticias___pt-BR"
  }, {
    path: "/conta/contacts",
    component: _d60d8916,
    name: "conta-contacts___pt-BR"
  }, {
    path: "/conta/events",
    component: _72dd7b0a,
    name: "conta-events___pt-BR"
  }, {
    path: "/conta/loja",
    component: _3401f7dc,
    name: "conta-loja___pt-BR"
  }, {
    path: "/conta/medias",
    component: _821c1a1e,
    name: "conta-medias___pt-BR"
  }, {
    path: "/conta/menus",
    component: _338ccaa8,
    name: "conta-menus___pt-BR"
  }, {
    path: "/conta/pages",
    component: _8e0f4110,
    name: "conta-pages___pt-BR"
  }, {
    path: "/conta/pedidos",
    component: _6b848a7c,
    name: "conta-pedidos___pt-BR"
  }, {
    path: "/conta/posts",
    component: _96b33672,
    name: "conta-posts___pt-BR"
  }, {
    path: "/conta/produtos",
    component: _1bc97efc,
    name: "conta-produtos___pt-BR"
  }, {
    path: "/conta/profile",
    component: _1db73c4c,
    name: "conta-profile___pt-BR"
  }, {
    path: "/conta/settings",
    component: _292bd976,
    name: "conta-settings___pt-BR"
  }, {
    path: "/conta/users",
    component: _3a4e0e88,
    name: "conta-users___pt-BR"
  }, {
    path: "/loja/carrinho",
    component: _580a2560,
    name: "loja-carrinho___pt-BR"
  }, {
    path: "/loja/finalizar-pedido",
    component: _22695560,
    name: "loja-finalizar-pedido___pt-BR"
  }, {
    path: "/conta/events/new",
    component: _18a97c89,
    name: "conta-events-new___pt-BR"
  }, {
    path: "/conta/medias/new",
    component: _3f47d27f,
    name: "conta-medias-new___pt-BR"
  }, {
    path: "/conta/menus/new",
    component: _09532bf6,
    name: "conta-menus-new___pt-BR"
  }, {
    path: "/conta/pages/new",
    component: _5f3db4c6,
    name: "conta-pages-new___pt-BR"
  }, {
    path: "/conta/posts/new",
    component: _15fac1d5,
    name: "conta-posts-new___pt-BR"
  }, {
    path: "/conta/produtos/new",
    component: _e7ce356c,
    name: "conta-produtos-new___pt-BR"
  }, {
    path: "/conta/users/new",
    component: _5f8861ec,
    name: "conta-users-new___pt-BR"
  }, {
    path: "/conta/pedidos/:id",
    component: _2257a4ad,
    name: "conta-pedidos-id___pt-BR"
  }, {
    path: "/conta/events/:id/edit",
    component: _62b5e6a6,
    name: "conta-events-id-edit___pt-BR"
  }, {
    path: "/conta/medias/:id/edit",
    component: _5e8cda70,
    name: "conta-medias-id-edit___pt-BR"
  }, {
    path: "/conta/menus/:id/edit",
    component: _647c594e,
    name: "conta-menus-id-edit___pt-BR"
  }, {
    path: "/conta/pages/:id/edit",
    component: _101c4c89,
    name: "conta-pages-id-edit___pt-BR"
  }, {
    path: "/conta/posts/:id/edit",
    component: _501810da,
    name: "conta-posts-id-edit___pt-BR"
  }, {
    path: "/conta/produtos/:id/edit",
    component: _7dfece85,
    name: "conta-produtos-id-edit___pt-BR"
  }, {
    path: "/conta/users/:id/edit",
    component: _5fe7fcc5,
    name: "conta-users-id-edit___pt-BR"
  }, {
    path: "/agenda/:id",
    component: _534cea36,
    name: "agenda-id___pt-BR"
  }, {
    path: "/biblioteca/:id",
    component: _3f9d1120,
    name: "biblioteca-id___pt-BR"
  }, {
    path: "/loja/:id",
    component: _157313e4,
    name: "loja-id___pt-BR"
  }, {
    path: "/noticias/:id",
    component: _47a02a78,
    name: "noticias-id___pt-BR"
  }, {
    path: "/",
    component: _51d22823,
    name: "index___pt-BR"
  }, {
    path: "/:id",
    component: _49fc516a,
    name: "id___pt-BR"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
