const User = require("../models/userModel");

class UsersRepository {
    static async insertOne(userData){
        try{
            const user = new User(userData)
            await user.save()
            const token = await user.generateAuthToken();
            return {user, token}
        } catch(err){
            throw new Error(err.message)
        }
    }
    static async updateUser(user, updates){
        try {
            for(let update in updates){
                user[update] = updates[update]
            }
            await user.save()
            return user
        } catch (err){
            throw new Error(err.message)
        }
    }
    static async removeUser (user) {
        try {
            await user.deleteOne();
        } catch (err){
            throw new Error(err.message)
        }
    }
    static async login (email, password) {
        try{
            const user = await User.findUserByEmailAndPassword(email, password)
            const token = await user.generateAuthToken();
            return {user, token}
        } catch (err){
            throw new Error(err.message)
        }
    }
    static async logout (user, token) {
        try{
            user.tokens = user.tokens.filter((tokenDoc)=> tokenDoc.token !== token)
            await user.save()
        }catch(err){
            throw new Error(err.message)
        }
    }
}

module.exports = UsersRepository