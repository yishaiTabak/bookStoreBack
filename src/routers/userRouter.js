const express = require('express')
const auth = require('../middlewares/auth')
const { editData, deleteUser, login, logout, newUser } = require('../controllers/userController')

const router = new express.Router()

router.post('/new', newUser)

router.patch('/edit', auth, editData)

router.delete('/delete',auth, deleteUser)

router.post('/login', login)

router.post('/logout', auth ,logout)

// router.post('/set-cart', auth, setCart)

// router.get("/get-cart", auth, getCart)

module.exports = router