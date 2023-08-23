const Book = require("../models/bookModel")
const BookService = require("../services/bookService")

const newBook = async(req,res)=>{
    const bookData = req.body
    const userRole = res.locals.user.role

    try{
        const book = await BookService.addOne(userRole, bookData)
        res.send(book)

    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const editBook = async (req,res) =>{
    const bookId = req.params.id
    const updates = req.body
    const userRole = res.locals.user.role

    try {
        const book = await BookService.updateBook(userRole, bookId, updates)
        res.send(book)

    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const deleteBook = async (req,res) =>{
    const bookId = req.params.id
    const userRole = res.locals.user.role

    try{
        await BookService.removeBook(userRole, bookId)
        res.send()

    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}


const getAllBooks = async(req,res) =>{
    const skip = parseInt(req.query.skip)
    const limit = parseInt(req.query.limit)
    const searchValue = req.query.search
    
    try{
        const {books, numberOfBooks} = await BookService.fetchAllBooks(searchValue, skip, limit)
        res.send({books, numberOfBooks})
    }catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const getBookById = async(req,res)=>{
    const bookId = req.params.id

    try{
        const book = await BookService.findBook(bookId)
        res.send(book)

    }catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const getAllNames = async(_,res) =>{
    try{
        const allNames = await BookService.fetchAllNames()
        res.send(allNames)
    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

module.exports = {
    newBook,
    editBook,
    deleteBook,
    getAllBooks,
    getBookById,
    getAllNames
}