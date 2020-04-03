<template>
    <div id="app">
        <todo-app></todo-app>
    </div>
</template>

<script>
    import todoApp from './components/TodoApp'

    export default {
        name: 'App',
        components: {
            todoApp,
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    
</style>
