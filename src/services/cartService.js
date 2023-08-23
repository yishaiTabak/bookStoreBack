const CartRepository = require("../repositories/cartRepository")

class CartService {

    static async createCart (cartData, userId){
        for(let item of cartData){
            if(!item.book || !item.quantity)
                throw new Error('data is missing')
            if(Object.keys(item).length !== 2)
                throw new Error("illegal field")
        }
        
        const cart = await CartRepository.createCart(cartData, userId)
        return cart
    }

    static async extractCart (userId){
        const cart = await CartRepository.extractCart(userId)
        return cart
    }
    static async updateCart (userId){
        const cart = await CartRepository.updateCart(cartData,userId)
        return cart
    }
}

module.exports = CartService