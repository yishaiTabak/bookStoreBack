const Cart = require("../models/cartModel")

class CartRepository {

    static async createCart (cartData,userId){
        let cart = await Cart.findOne({user: userId}).populate('cart.book')
        if(!cart)
            cart = new Cart({cart:cartData, user:userId})
        else
            cart.cart = cartData
        await cart.save()
        return cart.cart

    }
    static async extractCart (userId) {
        const cart = await Cart.findOne({user: userId}).populate('cart.book')
        if(!cart)
            throw new Error('there is no cart')
        return cart.cart.toObject()
    }
    static async updateCart (cartData, userId){
        const cart = await CartRepository.extractCart(userId)
        cart.cart = cartData
        await cart.save()
        return cart.cart
    }
}

module.exports = CartRepository