import Vue from 'vue'
import Vuex from 'vuex'
import {createLogux} from '@logux/vuex'


Vue.use(Vuex)

const userToken = 'userToken'

const Logux = createLogux({
    subprotocol: '1.0.0',
    server: 'ws://127.0.0.1:31337/',
    userId: userToken,
    credential: userToken
})


export default new Logux.Store({

    state: {
        todos: [],
    },


    mutations: {

        todoAdd(state, action) {
            console.log('[MUTATION] addTodo', action)
            const newTodo = action.value
            state.todos.push(newTodo)

        },


        todoDelete(state, action) {
            console.log('[MUTATION] deleteTodo ', action)
            state.todos = state.todos.filter((_todo) => {
                return _todo.title !== action.value.title
            })
            console.log('[MUTATION] deleteTodo ', state.todos)
        },

        /*
        * Getting init state after subscribe on the channel 'todo/all'
        */
        todoAll(state, action) {
            console.log('[MUTATION] todoAll ', action)
            state.todos = [...action.todos]
        },

    },


    actions: {},


    getters: {
        getTodos: (state) => {
            return state.todos
        }
    },


    modules: {}
})

