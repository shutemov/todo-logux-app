import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import bulma from 'bulma'
import store from '../src/store/store'


// Vue.use(Vuex)
Vue.use(bulma)
Vue.use(store)


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
