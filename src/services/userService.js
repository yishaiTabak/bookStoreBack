const validator = require('validator')
const UsersRepository = require('../repositories/userRepository')

class UserService{
    static allowedFields = ["username", "email", "password", "role"]
    static allowedUpdates = ["username", "email", "password"]
    static roles = ["user", "admin"]

    static async addOne(userData){
        UserService.isFieldsLegal(UserService.allowedFields, userData)

        if(Object.keys(userData).length !== UserService.allowedFields.length)
            throw new Error("you forgot some data")
        
        UserService.validateUserInformation(userData)
        
        if(!UserService.roles.includes(userData.role))
            throw new Error("illegal role")
        
        const {user, token} = await UsersRepository.insertOne(userData)
        return {user, token}
    }

    static async updateUser (user, updates){
        UserService.isFieldsLegal(UserService.allowedUpdates, updates)

        if(Object.keys(updates).length === 0)
            throw new Error("you forgot some data")

        UserService.validateUserInformation(updates)

        const newUser = await UsersRepository.updateUser(user,updates)
        return newUser
    }
    static async deleteUser (user){
        await UsersRepository.removeUser(user)
    }
    static async login(email, password){
        if(!validator.isEmail(email) || !validator.isStrongPassword(password))
            throw new Error("unable to login");    

        const {user, token} = await UsersRepository.login(email,password)  
        return {user, token}  
    }
    static async logout (user, token){
        await UsersRepository.logout(user, token)
    }
    


    static validateUserInformation(userData){
        if(userData.username && userData.username.length < 2)
            throw new Error("username must contain at least two characters")
        if(userData.email && !validator.isEmail(userData.email))
            throw new Error("email is illegal")
        if(userData.password && !validator.isStrongPassword(userData.password))
            throw new Error("password must contain at least 8 chars(nums,capital,regular and special)")
    }
    static isFieldsLegal (allowedFields,data){
        for(let field in data){
            if(!allowedFields.includes(field))
                throw new Error("illegal field")
        }
    }
}

module.exports = UserService