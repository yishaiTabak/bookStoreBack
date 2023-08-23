const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const { hashPassword, generateAuthToken, hidePasswordAndTokens } = require('./userFunc');

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true,
    validate(value){
        if(value.length<2){
            throw new Error('username must contain at least 2 characters')
        }
    }
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('email already exist')
        }
    }
},
password:{
    type:String,
    required:true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error('password must contain at least 8 chars,one capital,one regular,number and unique char')
        }
    }
},
role:{
    type:String,
    required:true,
},
tokens: [
    {
        token:{
            type:String,
            required:true
        }
    }
  ],
// cart:[
  // {
  //   cartItem:{
  //     bookId:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     required:true,
  //     ref:'Book',
  //     },
  //     quantity:{
  //       required:true,
  //       type:Number,
  //       min:1
  //     }
  //   }
  // }
// ]
})


userSchema.virtual("cart", {
    ref:"Cart",
    localField:"_id",
    foreignField:"user"
  })

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!!!user) {
        throw new Error("unable to login");
    }
    
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!!!isPassMatch) {
        throw new Error("unable to login");
    }
    return user;
    };

userSchema.pre("save", hashPassword)
    
userSchema.methods.generateAuthToken = generateAuthToken

userSchema.methods.toJSON = hidePasswordAndTokens

const User = mongoose.model("User", userSchema)

module.exports = User