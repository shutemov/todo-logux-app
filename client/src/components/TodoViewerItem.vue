<template>
    <div class="columns">


        <div class="column  ">
            <button class="button is-danger " @click="deleteTodo()">🗑</button>
        </div>


        <div class="column is-three-fifths">
            <input class="input " v-model="this.todo.title" >
        </div>

<!--or textarea way-->
<!--        <div class="field is-four-fifths">-->
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

        <div class="column ">
            <button class="button is-success ">✓</button>
        </div>


    </div>
</template>

<script>
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

            //send action to todoViewer
            deleteTodo() {
                console.log('deleteTodo from TodoViewerItem',this.todo)
                this.$emit('todo:delete', this.todo)
            }

        }
    }
</script>

<style scoped>

</style>