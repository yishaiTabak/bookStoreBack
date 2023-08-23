const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    cart:[
        {
                book:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Book',
                },
                quantity:{
                    required:true,
                    type:Number,
                    min:1
                }
        }
        ],
    user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        }
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart