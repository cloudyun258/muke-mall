import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import { moneyFormat } from '../utils/money'
import { Pagination, Form, FormItem, Input, Switch, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局导入 reset.styl 文件
import '@/assets/stylus/reset.styl'
import '@/assets/stylus/common.styl'
import '@/assets/stylus/iconfont.styl'

// 通过 vue-axios 将 axios 挂载到 vue实例 上
Vue.use(VueAxios, axios)

// elementui 分页组件
Vue.use(Pagination)
// 表单组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 开关组件
Vue.use(Switch)
// 按钮组件
Vue.use(Button)

// 图片懒加载插件全局配置
Vue.use(VueLazyload, {
  // 图片未加载出来的占位图片, 通过 ../assests/images/svg/ 好像访问不到, 要根目录public
  loading: '/svg/loading-bars.svg'
})

// 注册全局过滤器, 用于格式化金钱
Vue.filter('fmtMoney', moneyFormat)

// 配置公共请求路径, 公共请求路径实际为 http://localhost:8080/api
axios.defaults.baseURL = '/api'
// 配置请求超时时间, 超过8s即认为请求失败
axios.defaults.timeout = 8000

Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 携带token, 设置请求头
  config.headers['Authorization'] = localStorage.getItem('token') || ''
  return config
}, function (error) {
  // 对请求错误做些什么
 return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 获取服务器返回的数据
  return response.data
}, function (error) {
  // 对响应错误做些什么
  return Promise.reject(error.response.data)
})

// 挂载一个空vue实例, 用于组件通讯
Vue.prototype.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
