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



app.type('todoAdd', {

    access() {
        console.log('type acscess todo/add')
        return true;
    },

    resend() {
        console.log('type resend todo/add')
        return { channel: 'todo/all' }
    },

    process(ctx, action, meta) {
        console.log('type process todoAdd')
        todos.push(action.value)
        console.log('type process todoAdd', todos)
    }

});



app.type('todoDelete', {

    access() {
        console.log('type access todo/delete')
        return true;
    },

    resend() {
        console.log('type resend todo/delete')
        return { channel: 'todo/all' }
    },

    process(ctx, action, meta) {
        todos = todos.filter((todo) => { return todo.title != action.value.title })
        console.log('type process todo/delete', todos)
    }

});


app.channel('todo/all', {

    access(ctx, action, meta) {
        console.log('channel access todo/all')
        return true
    },


    init(ctx, action, meta) {
        console.log('channel init todo/all', todos)
        ctx.sendBack({ type: 'todoAll', todos }, { reasons: 'fromServer' })
    }

});


app.listen()