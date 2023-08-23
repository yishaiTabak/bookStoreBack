const express = require('express')
const auth = require('../middlewares/auth')
const { newCart, getCart, editCart } = require('../controllers/cartController')


const router = new express.Router()

router.post('/new', auth, newCart)

router.get('/get-cart', auth, getCart)

router.patch('/edit', auth, editCart)




module.exports = router