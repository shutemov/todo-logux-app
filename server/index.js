const { Server } = require('@logux/server')

const app = new Server(
    Server.loadOptions(process, {
        subprotocol: '1.0.0',
        supports: '1.x',
        root: __dirname
    })
)

/*
 * Database emulation
 */
let todos = [];


app.auth((userId, token) => {
    return true;
})


/*
 * Todo add listener
 */
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
        console.log('type process todoAdd', action)
        todos.push(action.value)
        console.log('type process todoAdd', todos)
    }

});


/*
 * Todo delete listener
 */
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


/*
 * Todo done listener
 */
app.type('todoDone', {

    access() {
        console.log('type access todo/done')
        return true;
    },

    resend() {
        console.log('type resend todo/done')
        return { channel: 'todo/all' }
    },

    process(ctx, action, meta) {

        console.log('type process todo/done', action)

        const todoTitle = action.value.title


        const index = todos.findIndex((todo) => {
            return todo.title === todoTitle
        })


        if (index === -1) return

        todos[index].isDone = true

        console.log('type process todo/done', todos)
    }

});


/*
 * Todo actions resender
 */
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