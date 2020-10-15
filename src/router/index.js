import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: '/login', component: Login },
    { path: '/register', name: '/register', component: Register },
    { path: '/user', name: '/user', component: User },
    { path: '/edit', name: '/edit', component: Edit },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.path === '/user' || to.path === '/edit') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
