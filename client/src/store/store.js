import Vue from 'vue'
import Vuex from 'vuex'
import {createLogux} from '@logux/vuex'
import {log} from '../../node_modules/@logux/client'

Vue.use(Vuex)

let userToken = 'userToken'

const Logux = createLogux({
    subprotocol: '1.0.0',
    server: process.env.NODE_ENV === 'development'
        ? 'ws://localhost:31337'
        : 'wss://logux.example.com',
    userId: userToken,  // TODO: We will fill it in next chapter
    credentials: '' // TODO: We will fill it in next chapter
})


const store = new Logux.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {}
})


log(store.client)

store.client.start()

export default store