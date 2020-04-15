<template>

    <div class="field has-addons">
        <div class="control">
            <a class="button is-danger" @click="deleteTodo()">
                🗑
            </a>
        </div>

        <div class="control is-expanded">
            <input class="input" type="text" v-model="this.todo.title" readonly>
        </div>

        <div v-if="!this.todo.isDone" class="control">
            <button class="button is-success" @click="doneTodo">
                ✓
            </button>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from "vuex";
    import store from '../store/store'

    export default {
        name: "TodoListItem",


        props: {
            todo: {
                type: Object,
            }
        },


        data() {
            return {
                todoTitle: this.todo.title
            }
        },


        methods: {
            ...mapMutations(['todoDone']),


            /*
            * send action to todoViewer
            */
            deleteTodo() {
                console.log('deleteTodo from TodoViewerItem', this.todo)
                this.$emit('todo:delete', this.todo)
            },

            /*
            * Change todo state
            */
            doneTodo() {
                console.log('doneTodo from TodoViewerItem', this.todo)
                store.commit.sync({type: 'todoDone', value: this.todo})
            }

        }
    }
</script>

<style scoped>

</style>