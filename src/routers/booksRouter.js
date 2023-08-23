const express = require('express')
const auth = require('../middlewares/auth')
const { newBook, editBook, deleteBook, getAllBooks, getBookById, getAllNames } = require('../controllers/booksController')

const router = new express.Router()

router.get('/get-book/:id',getBookById)

router.get('/get-books', getAllBooks)

router.post('/new', auth,newBook)

router.patch('/edit/:id', auth, editBook)

router.delete('/delete/:id',auth, deleteBook)

router.get('/get-all-names', getAllNames)

module.exports = router