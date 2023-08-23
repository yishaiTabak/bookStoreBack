const CartService = require("../services/cartService")

const newCart = async(req,res) =>{
    const cartData = req.body.cartData
    const userId = res.locals.user._id

    try{
        const cart = await CartService.createCart(cartData, userId)
        const cartToSend = cart.map(item =>({...item.book, quantity:item.quantity}))
        res.send(cartToSend)

    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const getCart = async (_,res)=>{
    const userId = res.locals.user._id

    try {
        const cart = await CartService.extractCart(userId)
        const cartToSend = cart.map(item =>({...item.book, quantity:item.quantity}))
        res.send(cartToSend)
        
    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

const editCart = async (req,res) =>{
    const cartData = req.body.cartData
    const userId = res.locals.user._id

    try{
        const cart = await CartService.updateCart(cartData, userId)
        const cartToSend = cart.map(item =>({...item.book.toObject(), quantity:item.quantity}))
        res.send(cartToSend)

    } catch(err){
        res.status(500).send({
            status: 500,
            mesasge: err.message,
          });
    }
}

module.exports = {
    newCart,
    getCart,
    editCart,
}