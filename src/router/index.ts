import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Link from '@/views/Link.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: route => route.query
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: Post,
    props: true
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
