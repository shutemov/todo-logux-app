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

        todoAdd(state, todo) {
            console.log('[MUTATION] addTodo', state)
            const newTodo = todo.value
            state.todos.push(newTodo)

        },

        todoDelete(state, todo) {
            console.log('[MUTATION] deleteTodo ', todo)
            state.todos = state.todos.filter((_todo) => {
                return _todo.title !== todo.value.title
            })
            console.log('[MUTATION] deleteTodo ', state.todos)
        },

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

