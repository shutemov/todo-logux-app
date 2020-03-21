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

    access() {
        console.log('type access todo/add')
        return true;
    },

    // resend() {
    //     console.log('type resend todo/add')
    //     return { channel: 'todo/all' }
    // },

    process(ctx, action, meta) {
        console.log('type process todo/add',todos)
        console.log('type process todo/add',action.newTodo)
        todos.push(action.newTodo)
        ctx.sendBack({type:'todo/added'},{reasons:'todo added'})
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

    resend(ctx, action, meta) {
        console.log('channel resend todo/all')
        ctx.sendBack({ type: 'todo/all', todos }, { reasons: 'fromServer' })
    },

    init(ctx, action, meta) {
        console.log('channel init todo/all',todos)
        ctx.sendBack({ type: 'todo/all', todos }, { reasons: 'fromServer' })
    }

});


app.listen()