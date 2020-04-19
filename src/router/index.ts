import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: route => route.query
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "filter" */'@/views/Search.vue'),
    props: route => route.query
  },
  {
    path: '/tag/:slug',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "filter" */'@/views/Tag.vue'),
    props: route => ({ ...route.query, ...route.params })
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import(/* webpackChunkName: "filter" */'@/views/Category.vue'),
    props: route => ({ ...route.query, ...route.params })
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: () => import(/* webpackChunkName: "content" */'@/views/Post.vue'),
    props: true
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import(/* webpackChunkName: "content" */'@/views/Link.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "misc" */'@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
