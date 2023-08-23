const BookRepository = require("../repositories/bookRepository")
const UserService = require("./userService")

class BookService {

    static validFields = ["name","author", "description", "price", "img", "discount"]

    static async addOne (userRole,bookData) {
        BookService.validateAuth(userRole)

        UserService.isFieldsLegal(BookService.validFields, bookData)

        if(Object.keys(bookData).length !== BookService.validFields.length)
            throw new Error("you forgot some data")
        BookService.validateBookData(bookData)

        const book = await BookRepository.insertOne(bookData)
        return book
    }

    static async updateBook (userRole, bookId,updates) {
        BookService.validateAuth(userRole)

        UserService.isFieldsLegal(BookService.validFields, updates)

        if(Object.keys(updates).length === 0)
            throw new Error("you forgot some data")

        BookService.validateBookData(updates)

        const book = await BookRepository.updateBook(bookId, updates)
        return book
    }

    static async removeBook (userRole, bookId){
        BookService.validateAuth(userRole)

        await BookRepository.removeBook(bookId)
    }

    static async fetchAllBooks(searchValue, skip, limit){
        const options = {
            skip,
            limit,
            sort:{
                name:1
            },
        }
        const {books, numberOfBooks} = await BookRepository.fetchAllBooks(searchValue, options)
        return {books, numberOfBooks}
    }

    static async findBook (bookId) {
        const book = await BookRepository.findBook(bookId)
        return book
    }

    static async fetchAllNames (){
        const allNames = await BookRepository.fetchAllNames()
        return allNames
    }


    static validateBookData({name, author,description, price, img, discount }){
        if(name && name.length<2)
            throw new Error("name must contain two chars")
        if(author && author.length <2)
            throw new Error("author must contain two chars")
        if(description && description.length<20)
            throw new Error("description must contain 20 chars")
        if(price && price<=0)
            throw new Error("price had to be positive")
        if(img && img.length < 5)
            throw new Error("invalid img")
        if(discount && (discount<0 ||discount>=99))
            throw new Error("discount has to be between 0 to 99")
    }
    static validateAuth(userRole){
        if(userRole !== "admin")
            throw new Error("not authenticate")
    }
}

module.exports = BookService