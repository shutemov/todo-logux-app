import Vue from 'vue'
import App from './App.vue'
import bulma from 'bulma'

Vue.use(bulma)


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
