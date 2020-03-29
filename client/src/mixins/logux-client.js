import { CrossTabClient } from '../../node_modules/@logux/client'

let userToken = 'userToken'

const client = new CrossTabClient({
    credentials: userToken,
    subprotocol: '1.0.0',
    server: 'ws://127.0.0.1:31337',
    userId: userToken
})

client.start()



export default client
