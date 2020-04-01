<template>

    <section id="app" class="is-large is-warning is-bold">
        <div v-if="!isConnection" class="tag is-medium is-warning column is-12">Connection lost: Your actions will
            been saved when network comeback!
        </div>

        <div class="section notification is-success ">
            <h1 class="title"> My todo list</h1>

            <h1 class="subtitle ">App status: {{connectionStatus}}</h1>
            <div class="columns is-centered">
                <div class="column is-half">

                    <div class="control has-icons-right is-half">
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


        <div class="section notification">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <todo-viewer
                                :todo-list="todos"
                                v-on:todo:delete="deleteTodo($event)"></todo-viewer>
                    </div>
                </div>
            </div>
        </div>

    </section>


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
            }
        },


        watch: {
            todoList: () => {
                console.log('todoList was been changed', this)
            }
        },


        beforeCreate() {
            store.client.log.add({type: 'logux/subscribe', channel: 'todo/all'}, {sync: true})
            console.log('beaforeCreate', this.todoList)
        },


        created() {

            console.log('created', this.todoList)
        },


        mounted() {

            console.log('mounted')

            // store.client.log.add({type: 'logux/subscribe', channel: 'todo/all'}, {sync: true})

        },


        beforeUpdate() {
            console.log('beforeUpdate')
        },


        updated() {
            console.log('updated')
        },


        methods: {
            ...mapMutations({add: 'addTodo'}),

            addTodo(title) {

                console.log('addTodo from TodoApp', title.trim())

                if (title.trim() === '') return

                const newTodo = {
                    id: undefined,
                    title: title,
                    status: undefined,
                }

                // store.client.log.add({type: 'addTodo',value:newTodo})
                // store.client.log.add({type:'todo/add', value:newTodo})
                this.add(newTodo)

                this.todoTitle = ''
            },

            deleteTodo(todo) {

                console.log('deleteTodo from TodoApp', todo)

                if (!todo) return

                this.todoList = this.todoList.filter((_todo) => {
                    return _todo.title !== todo.title
                })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
