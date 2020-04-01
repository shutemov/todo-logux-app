import Vue from 'vue'
import Vuex from 'vuex'
import {createLogux} from '@logux/vuex'

Vue.use(Vuex)

const userToken = 'userToken'

const Logux = createLogux({
    subprotocol: '1.0.0',
    server: 'ws://127.0.0.1:31337',
    userId: userToken,
    credentials: userToken
})


export default new Logux.Store({

    state: {
        todos: [{title: '1'}, {title: '2'}, {title: '3'},],
    },


    mutations: {

        addTodo(state, todo) {
            console.log('[MUTATION] addTodo', state)
            const newTodo = todo.value
            state.todos.push(newTodo)
        },

        deleteTodo({state}, todo) {
            console.log('[MUTATION] deleteTodo ', state)
            state.todos = state.todos.filter((_todo) => {
                return _todo.title !== todo.title
            })
        },

        todoAll(state, action) {
            console.log('[MUTATION] todoAll ', action)
            state.todos = [...action.todos]
        },

    },


    actions: {
        addTodo(todo) {
            console.log('[ACTION] addTodo:', todo)
        }
    },


    getters: {
        getTodos: (state) => {
            return state.todos
        }
    },


    modules: {}
})

