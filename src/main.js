import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import naive from 'naive-ui/es/preset'
import 'default-passive-events'

const app = createApp(App)
// 定义全局变量

// app.config.globalProperties.$url = 'http://localhost:5050'
// app.config.globalProperties.$url = 'http://47.108.116.100:8889'
app.config.globalProperties.$url = 'http://8.130.112.239:8889'

// 请求拦截 用于展示加载动画
const requestArr = []
axios.interceptors.request.use(function (config) {
  requestArr.push(config)
  store.state.loadingShow = true // 在请求发出之前进行一些操作
  return config
})
// 定义一个响应拦截器
axios.interceptors.response.use(function (config) {
  requestArr.shift()
  if (requestArr.length === 0) {
    store.state.loadingShow = false// 在这里对返回的数据进行处理
  }
  return config
})

axios.defaults.baseURL = app.config.globalProperties.$url
app.config.globalProperties.$axios = axios

app.use(store).use(router).use(naive).mount('#app')

app.directive('title', { // 单个修改标题
  mounted (el) {
    document.title = el.dataset.title
  }
})
