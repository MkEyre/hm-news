import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComment from '../views/MyComment.vue'
import MyStar from '../views/MyStar.vue'
import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import TabsListEdit from '../views/TabsListEdit.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: '/login', component: Login },
    { path: '/register', name: '/register', component: Register },
    { path: '/user', name: '/user', component: User },
    { path: '/edit', name: '/edit', component: Edit },
    { path: '/my-follow', name: '/my-follow', component: MyFollow },
    { path: '/my-comment', name: '/my-comment', component: MyComment },
    { path: '/my-star', name: '/my-star', component: MyStar },
    { path: '/home', name: '/home', component: Home },
    { path: '/detail/:id', component: Detail },
    { path: '/tabsListEdit', component: TabsListEdit },
  ],
})
router.beforeEach((to, from, next) => {
  const toPath = ['/user', '/edit', '/my-follow', '/my-comment', '/my-star']
  if (toPath.includes(to.path)) {
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
