import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import axios from 'axios'
import router from './router/index'

import {
  Field,
  Toast,
  Cell,
  CellGroup,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh,
  Sticky,
  Icon,
} from 'vant'
Vue.use(Field, Toast)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Sticky)
Vue.use(Icon)

import './styles/base.less'
import 'lib-flexible'
import './styles/iconfont.css'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'
import HmFloor from './components/HmFloor.vue'
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', HmFloor)
// 全局的事件总线
const bus = new Vue()
Vue.prototype.$bus = bus

//注册全局过滤器
Vue.filter('time', (val, format) => {
  return moment(val).format(format)
})
//往vue的原型上添加axios
Vue.prototype.$axios = axios

// 设置请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 设置响应拦截器
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})
//基地址进行添加到axios的默认属性defaults.baseURL上
axios.defaults.baseURL = 'http://localhost:3000'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
