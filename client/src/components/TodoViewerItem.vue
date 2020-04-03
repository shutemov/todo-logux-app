<template>
    <div class="columns">


        <div class="column is-1 is-1-mobile">
            <button class="button is-danger " @click="deleteTodo()">🗑</button>
        </div>


        <div class="column is-10 is-10-mobile">
            <input class="input " v-model="this.todo.title" readonly>
        </div>

        <!--or textarea way-->
        <!--        <div class="field is-three-fifths">-->
        <!--            <div class="control">-->
        <!--                <textarea-->
        <!--                        class="textarea is-warning"-->
        <!--                        placeholder="Warning textarea"-->
        <!--                        :value="this.todo.title"-->
        <!--                        rows="2"-->
        <!--                        minlength="20"-->
        <!--                        readonly>-->
        <!--                </textarea>-->
        <!--            </div>-->
        <!--        </div>-->

        <div v-if="!this.todo.isDone" class="column is-1 is-1-mobile">
            <button class="button is-success " @click="doneTodo">✓</button>
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