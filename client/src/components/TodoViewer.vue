<template>
    <div class="">
        <todo-item
                v-for="(_todo,index) in this.todoList"
                :key="'_todo'+index"
                :todo="_todo"
                v-on:todo:delete="deleteTodo($event)"></todo-item>

    </div>
</template>

<script>
    import todoItem from '@/components/TodoViewerItem'



    export default {
        name: 'TodoList',


        components: {
            todoItem
        },


        props: {
            todoList:{
                type: Array,
            },
        },


        data() {
            return {
                // todoList: [],
                todoTitle: undefined,
                connectionStatus: undefined
            }
        },


        methods: {

            //send action to todoApp
            deleteTodo(todo) {
                console.log('todoDelete from TodoViewer',todo)
                this.$emit('todo:delete', todo)
            }
        }
    }
</script>

<style scoped>

</style>