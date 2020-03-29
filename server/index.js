const { Server } = require('@logux/server')

const app = new Server(
    Server.loadOptions(process, {
        subprotocol: '1.0.0',
        supports: '1.x',
        root: __dirname
    })
)


let todos = [];


app.auth((userId, token) => {
    return true;
})


app.type('todo/add', {

    resend() {
        console.log('type resend todo/add')
        return { channel: 'todo/all' }
    },

    access() {
        console.log('type acscess todo/add')
        return true;
    },

    process(ctx, action, meta) {
        console.log('type process todo/add', todos)
        todos.push(action.newTodo)
    }

});


app.type('todo/delete', {

    access() {
        console.log('type access todo/delete')
        return true;
    },

    // resend() {
    //     console.log('type resend todo/add')
    //     return { channel: 'todo/all' }
    // },

    process(ctx, action, meta) {
        console.log('type process todo/delete', todos)
        todos = todos.filter((todo) => { return todo.title != action.todo.title })
    }

});


app.channel('todo/all', {

    access(ctx, action, meta) {
        console.log('channel access todo/all')
        return true
    },


    init(ctx, action, meta) {
        console.log('channel init todo/all', todos)
        ctx.sendBack({ type: 'todo/all', todos }, { reasons: 'fromServer' })
    }

});


app.listen()