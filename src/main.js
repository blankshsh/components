import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 注意样式引用顺序
import '@/assets/css/public.scss'

import components from '../index.js'

Vue.use(ElementUI)
Vue.use(components)

Vue.config.productionTip = false

window.axios = axios

window.$app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
