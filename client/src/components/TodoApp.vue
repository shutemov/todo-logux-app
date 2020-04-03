<template>
    <div class="container ">

        <section class="is-large is-warning is-bold">
            <div v-if="!isConnection" class="tag is-medium is-warning column is-12">Connection lost: Your actions will
                been saved when network comeback!
            </div>

            <div class="section notification is-primary">
                <h1 class="title"> My todo list</h1>

                <h1 class="subtitle ">App status: {{connectionStatus}}</h1>
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="control has-icons-right">
                            <input class="input is-large" type="email" placeholder="Todo" id="todo-input"
                                   @keyup.enter="addTodo(todoTitle)" v-model="todoTitle" style="color:gray">
                            <span class="icon is-medium is-right">
                            <i class="fas fa-plus"></i>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </section>

        <div class="section">
            <div class="columns is-centered">

                <div class="column is-half">
                    <div class="notification is-warning">
                        <h1 class="subtitle">All todos</h1>
                        <todo-viewer
                                :todo-list="undoneTodos"
                                v-on:todo:delete="deleteTodo($event)"></todo-viewer>
                    </div>
                </div>

                <div class="column is-half">
                    <div class="notification is-success">
                        <h1 class="subtitle">Completed todos</h1>
                        <todo-viewer
                                :todo-list="doneTodos"
                                v-on:todo:delete="deleteTodo($event)"
                                style="color:gray;"></todo-viewer>
                    </div>
                </div>

            </div>
        </div>
    </div>


</template>

<script>
    import todoViewer from '@/components/TodoViewer';
    import store from '../store/store'

    import {mapGetters, mapMutations} from 'vuex'
    // import {toast} from 'bulma-toast'


    export default {
        name: 'HelloWorld',


        components: {todoViewer},


        data: function () {
            return {
                todoTitle: undefined,
                connectionStatus: undefined,
                isConnection: undefined
            }
        },


        computed: {
            ...mapGetters(['getTodos']),

            todos() {
                return this.getTodos
            },

            doneTodos() {
                console.log('[COMPUTED] doneTodos')
                return this.getTodos.filter(todo => {
                    return !!todo.isDone
                })
            },

            undoneTodos() {
                console.log('[COMPUTED] undoneTodos')
                return this.getTodos.filter(todo => {
                    return !todo.isDone
                })
            }

        },


        mounted() {

            console.log('mounted')

            /*
            * Subscribe action for fetching init todos
            */
            store.client.log.add({type: 'logux/subscribe', channel: 'todo/all'}, {sync: true})


            /*
            * Action log listener for debag
            */
            store.client.on('add', (action) => {
                console.log('[add action listener]', action)
            })


            /*
            * Connection state checker
            */
            store.client.on('state', (action) => {

                console.log('[state action listener]', action)

                if (store.client.state === 'disconnected' || store.client.state === 'connecting') {
                    this.isConnection = false
                } else {
                    this.isConnection = true
                }

                this.connectionStatus = store.client.state
            })


        },


        methods: {

            ...mapMutations(['todoAdd', 'todoDelete']),


            /*
            * Adding new todo
            */
            addTodo(title) {

                console.log('[METHOD] addTodo from TodoApp', title.trim())

                if (title.trim() === '') return

                const newTodo = {
                    id: undefined,
                    title: title,
                    isDone: undefined,
                }

                store.commit.sync({type: 'todoAdd', value: newTodo})

                this.todoTitle = ''
            },


            /*
            * deleting todo
            */
            deleteTodo(todo) {

                console.log('[METHOD] deleteTodo from TodoApp', todo)

                if (!todo) return

                store.commit.sync({type: 'todoDelete', value: todo})

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
