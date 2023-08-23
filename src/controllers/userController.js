const UserService = require("../services/userService");

// const newData = (isAdmin) => async (req, res) => {
//   const userData = req.body;




  // const {err, data} = usersService.addOne(userData);

  // In usersService.addOne(userData):
  // if(userData.name == null)
  //   throw new Error("Name must be provided"); and more validations/authorizations
  // const {user, token} = await usersRpository.insertOne(userData);

  // In usersRpository.insertOne(userData):
  // await user.save();
  // const token = await user.generateAuthToken();
  // return {user, token}



//   const user = isAdmin ? new Admin(req.body) : new User(req.body);
//   try {
//     await user.save();
//     const token = await user.generateAuthToken();
//     res.send({ [isAdmin?"admin":"user"]:user, token });
//   } catch (err) {
//     res.status(500).send({
//       status: 500,
//       mesasge: err.message,
//     });
//   }
// };

const newUser = async (req,res) =>{
  const userData = req.body

  try{
    const {user, token} = await UserService.addOne(userData)
    res.send({user,token})

  }catch(err){
    res.status(500).send({
      status: 500,
      mesasge: err.message,
    });
  }
}

const editData = async(req,res)=>{
  const updates = req.body
  const user = res.locals.user

  try{
    const newUser = await UserService.updateUser(user, updates)
    res.send({user:newUser, token:res.locals.token})

  } catch(err){
    res.status(500).send({
    status: 500,
    mesasge: err.message,
    })
  }
}

const deleteUser = async(_,res) =>{
  const user = res.locals.user

  try{
    await UserService.deleteUser(user)
    res.send()

  }catch(err){
    res.status(500).send({
    status: 500,
    mesasge: err.message,
    })
  }
}

const login = async(req,res)=>{
  const email = req.body.email
  const password = req.body.password

  try{
    const {user,token} = await UserService.login(email, password)
    res.send({user, token})

  } catch(err){
    res.status(500).send({
    status: 500,
    mesasge: err.message,
    })
  }
}

const logout = async (_,res) =>{
  const user = res.locals.user
  const token = res.locals.token

  try{
    await UserService.logout(user,token)
    res.send()
    
  } catch(err){
    res.status(500).send({
    status: 500,
    mesasge: err.message,
    })
  }
}

// const setCart = async(req,res)=>{
//   const user = req.user
//   const books = req.body.books
//   try{
//   const cartItems = books.map((book) => ({
//     cartItem: {
//       bookId:new mongoose.Types.ObjectId(book.bookId),
//       quantity:book.quantity
//     }
//   }))
//   user.cart = cartItems
//   await user.save()
//   res.send()
//   }catch(err){
//     res.status(500).send(err)
//   }
// }

// const getCart = async(req,res) =>{
//   const user = await User.findById(req.user._id).populate("cart.cartItem.bookId");
//   const cartItems = user.cart.map((cartItem) => {
//     if(!cartItem.cartItem.bookId)
//       return null
//     return {...cartItem.cartItem.bookId.toObject(), quantity:cartItem.cartItem.quantity}});
//   try{
//     res.send(cartItems.filter(item=> item !== null))
//   }catch (err){
//     res.status(500).send(err)
//   }
// }


module.exports = {
  editData,
  deleteUser,
  login,
  logout,
  newUser
};
