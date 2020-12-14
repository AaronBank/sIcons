import Vue from 'vue'
import cookie from 'vue-cookie'
import iview from 'iview'
import App from './App.vue'
import router from './router'
import store from './store'

import directive from './directive'
import filters from './filters'

import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(cookie)
Vue.use(iview)
Vue.use(directive)
filters(Vue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
