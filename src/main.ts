import Vue from 'vue'
import App from './App.vue'
import router from './router/router-index'
import store from './store'

// 绑定axios
import axios from '@/network/request'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
