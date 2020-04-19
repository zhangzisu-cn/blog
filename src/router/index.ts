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
    component: () => import('@/views/Search.vue'),
    props: route => route.query
  },
  {
    path: '/tag/:slug',
    name: 'Tag',
    component: () => import('@/views/Tag.vue'),
    props: route => ({ ...route.query, ...route.params })
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('@/views/Category.vue'),
    props: route => ({ ...route.query, ...route.params })
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: () => import('@/views/Post.vue'),
    props: true
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('@/views/Link.vue')
  },
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
