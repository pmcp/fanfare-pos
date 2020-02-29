import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import { isNil } from 'lodash'
import store from '@/store'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: false
      }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "client-chunk-login" */ '@/views/Login.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Admin-Home.vue')
    },
    {
      path: '/admin/products',
      name: 'products',
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Admin-Products.vue')
    },
    {
      path: '/clients/:clientId/orders',
      name: 'clientOrders',
      props: true,
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Pos-Orders.vue')
    },
    {
      path: '/clients/:clientId/order',
      name: 'clientOrder',
      props: true,
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Pos-Order.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Pos-Clients.vue')
    },

    {
      path: '/orders',
      name: 'orders',
      component: () =>
        import(/* webpackChunkName: "client-chunk-products" */ '@/views/Pos-Orders.vue')
    },

    // {
    //   path: '/products/:id',
    //   name: 'product',
    //   props: true,
    //   component: () =>
    //     import(/* webpackChunkName: "client-chunk-product-details" */ '@/views/Product.vue')
    // },
    { path: '*', redirect: '/home' }
  ]
})

/**
 * Handle user redirections
 */
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login'
    return next(`${path}?redirectUrl=${to.path}`)
  }

  next()
})

export default router
