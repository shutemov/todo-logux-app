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
                               @change="addTodo(todoTitle)" v-model="todoTitle">
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
                                :todo-list="todoList"
                                v-on:todo:delete="deleteTodo($event)"></todo-viewer>
                    </div>
                </div>
            </div>
        </div>

    </section>


</template>

<script>
    import loguxClient from '../mixins/logux-client'
    import todoViewer from "@/components/TodoViewer";
    import {toast} from 'bulma-toast'

    loguxClient.on('add', (action) => {
        console.log(action)
        return
    })


    export default {
        name: 'HelloWorld',


        components: {todoViewer},


        mixins: [loguxClient],


        data: () => {
            return {
                todoList: [],
                todoTitle: undefined,
                connectionStatus: undefined,
                isConnection: undefined
            }
        },


        mounted() {

            loguxClient.log.add({type: 'logux/subscribe', channel: 'todo/all'}, {sync: true})

            loguxClient.on('add', (action) => {

                //get all todo from backend
                if (action.type == 'todo/all') {
                    this.todoList = [...action.todos]
                }

                //proof of sync action on backend
                if (action.type == 'logux/processed') {
                    return
                }
            })

            loguxClient.on('state', () => {

                if (loguxClient.state === 'disconnected' || loguxClient.state === 'connecting' || loguxClient.state === 'sending') {
                    this.isConnection = false
                } else {
                    this.isConnection = true
                }

                if (this.isConnection) {
                    toast({
                        message: 'Connection established!',
                        duration: 2000,
                        type: "is-primary",
                        position: "right",
                        closeOnClick: true,
                        pauseOnHover: true,
                        opacity: 0.8
                    })
                }

                this.connectionStatus = loguxClient.state
            })
        },


        methods: {

            addTodo(_title) {

                console.log('addTodo', _title)

                if (_title.trim() === '') return

                const newTodo = {
                    id: undefined,
                    title: _title,
                    status: undefined,
                }

                this.todoList.push(newTodo)

                loguxClient.log.add({type: 'todo/add', newTodo}, {sync: true})

                this.todoTitle = ''
            },

            deleteTodo(todo) {

                console.log('deleteTodo from TodoApp', todo)

                if (!todo) return

                this.todoList = this.todoList.filter((_todo) => {
                    return _todo.title !== todo.title
                })

                loguxClient.log.add({type: 'todo/delete', todo}, {sync: true})
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
