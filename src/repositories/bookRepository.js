const Book = require("../models/bookModel")

class BookRepository{

    static async insertOne (bookData) {
        const book = new Book(bookData)
        try{
            await book.save()
            return book
        } catch(err){
            throw new Error(err.message)
        }
    }

    static async updateBook (bookId, updates){
        try {
            const book = await Book.findByIdAndUpdate(bookId, updates, {
                new:true,
                runValidators:true,
            })
            if(!book) throw new Error("wrong id")
            return book
        } catch(err){
            throw new Error(err.message)
        }
    }

    static async removeBook(bookId){
        try{
            const book = await Book.findByIdAndDelete(bookId)
            console.log(book)
            if(!book)
                throw new Error("wrong id")
        } catch(err){
            throw new Error(err.message)
        }
    }

    static async fetchAllBooks(searchValue,options){
        try{
            const numberOfBooks = await Book.count({name:{
            $regex:searchValue
            }})
            const books = await Book.find({ name:{
                $regex: searchValue
            }}, null, options)

            return {books,numberOfBooks}
        }catch(err){
            throw new Error(err.message)
        }
    }

    static async findBook (bookId){
        try{
            const book = await Book.findById(bookId)
            if(!book)
                throw new Error("wrong id")
            return book   
        }catch(err){
            throw new Error(err.message)
        }
    }

    static async fetchAllNames (){
        try{
            const allNames = await Book.distinct('name')
            return allNames
        }catch(err){
            throw new Error(err.message)
        }
    }

}

module.exports = BookRepository