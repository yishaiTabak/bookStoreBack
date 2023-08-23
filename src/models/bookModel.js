const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        lowercase:true
    },
    author:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        uppercase:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<20){
                throw new Error('the description must contain at least 20 letters')
            }
        }
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    img:{
        type:String,
        required:true,
        trim:true
    },
    discount:{
        type:Number,
        default:0,
        min:0,
        max:99
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book