import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Link from '@/views/Link.vue'
import Search from '@/views/Search.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: route => ({ ...route.params, ...route.query })
  },
  {
    path: '/tag/:tag',
    name: 'Tag',
    component: Home,
    props: route => ({ ...route.params, ...route.query })
  },
  {
    path: '/category/:cat',
    name: 'Category',
    component: Home,
    props: route => ({ ...route.params, ...route.query })
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: route => ({ ...route.params, ...route.query })
  },
  {
    path: '/link',
    name: 'Link',
    component: Link
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
