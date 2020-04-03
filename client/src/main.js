import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import bulma from 'bulma'
import store from '../src/store/store'
import {log} from '@logux/vuex/node_modules/@logux/client'
import 'bulma/css/bulma.css'

Vue.use(Vuex)
Vue.use(bulma)


Vue.config.productionTip = false


//console log for logux app
log(store.client)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')

// logux socket listener start
store.client.start()


