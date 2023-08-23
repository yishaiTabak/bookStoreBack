const app = require('./app')

const PORT = process.env.PORT
require('./db/mongoose')

app.listen(PORT, ()=>{
    console.log('server connected, port:', PORT)
})
