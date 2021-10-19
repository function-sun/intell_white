// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import http from '@/api/http.js'
// import utils from '@/utils/commonFunction.js'
import '@/assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'

import './permission' //路由守卫
// import store from './store/index.js'

// import Vuex from 'vuex'

// Vue.use(Vuex)
import XEUtils from 'xe-utils'
 
Vue.prototype.$utils = XEUtils
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$http = http
// Vue.prototype.$utils = utils

// axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? process.env.PRO_BASE_API : process.env.BASE_API
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
