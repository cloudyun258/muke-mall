import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'

// 全局导入 reset.styl 文件
import '@/assets/stylus/reset.styl'
import '@/assets/stylus/common.styl'

// 通过 vue-axios 将 axios 挂载到 vue实例 上
Vue.use(VueAxios, axios)

// 图片懒加载插件全局配置
Vue.use(VueLazyload, {
  // 图片未加载出来的占位图片
  loading: ''
})

// 配置公共请求路径, 公共请求路径实际为 http://localhost:8080/api
axios.defaults.baseURL = '/api'
// 配置请求超时时间, 超过8s即认为请求失败
axios.defaults.timeout = 8000

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
