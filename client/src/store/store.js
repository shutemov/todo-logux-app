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

        /*
        * Add todo to todoList
        */
        todoAdd(state, action) {
            console.log('[MUTATION] addTodo', action)

            const newTodo = action.value

            //Checking on existing in todoList
            const todoCandidate = state.todos.find(todo => {
                return todo.title === newTodo.title
            })

            if (!todoCandidate) {
                state.todos.push(newTodo)
            }
        },


        /*
        * Delete todo from todoList
        */
        todoDelete(state, action) {
            console.log('[MUTATION] deleteTodo ', action)

            state.todos = state.todos.filter((_todo) => {
                return _todo.title !== action.value.title
            })
        },


        /*
        * Changes todo state
        */
        todoDone(state, action) {
            console.log('[MUTATION] todoDone', action)

            const todoTitle = action.value.title

            const index = state.todos.findIndex((todo) => {
                return todo.title === todoTitle
            })

            if (index === -1) return

            state.todos[index].isDone = true
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

        /*
        * Getting init state after subscribe on the channel 'todo/all'
        */
        getTodos: (state) => {
            return state.todos
        }
    },


    modules: {}
})

