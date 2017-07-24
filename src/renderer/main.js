import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
// 引入spectre.css
import 'spectre.css/dist/spectre.css'
import 'spectre.css/dist/spectre-icons.css'
import 'spectre.css/dist/spectre-exp.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: '/src/renderer/assets/img/error.png',
  loading: '/src/renderer/assets/img/loading2.svg',
  attempt: 1
})
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
