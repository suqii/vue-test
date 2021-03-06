import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/lottie',
    name: 'Lottie',
    component: () =>
      import('../views/Lottie.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () =>
      import('../views/Test.vue'),
  },
  {
    path: '/alioss',
    name: 'Alioss',
    component: () =>
      import('../views/Alioss.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
