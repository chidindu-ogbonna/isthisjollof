import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/misc/handle-apple-install-prompt'
import '@/services/firebase'
import '@/services/vuefire'
import 'pwacompat'

import '@/assets/css/tailwind.css'
import '@/assets/css/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
