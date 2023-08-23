const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
  
  async function hashPassword (next) {
        const user = this;
      
        if (user.isModified("password")) {
          user.password = await bcrypt.hash(user.password, 8);
        }
        next();
      };
    
async function generateAuthToken () {
        const user = this
        const token = jwt.sign({
            _id: user._id
        }, 
        process.env.TOKEN_SECRET,
        {
            expiresIn:"6h"
        })
    
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }
 function hidePasswordAndTokens() {
        const user = this
        const userObj = user.toObject()
    
        delete userObj.password
        delete userObj.tokens
    
        return userObj
    }    

module.exports = {
    hashPassword,
    generateAuthToken,
    hidePasswordAndTokens,
}