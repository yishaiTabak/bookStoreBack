const express = require('express')
const cors = require('cors')

const userRouter = require('./routers/userRouter')
const booksRouter = require('./routers/booksRouter')
const cartRouter = require('./routers/cartRouter')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/books', booksRouter)
app.use('/carts', cartRouter)

module.exports = app