import mongoose from 'mongoose'

// used to hash user's password
import bcrypt from 'bcrypt'
import config from 'config'
import { string } from 'zod'


// ts definition for userSchema
export interface UserDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: string
    updatedAt: string
    comparePassword(enteredPassword: string): Promise<boolean>
}


const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
},{
    timestamps: true
})


// pre save hook for User
userSchema.pre("save", async function(next) {
    let user = this as UserDocument

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltFactor'))
    const hash = await bcrypt.hashSync(user.password, salt)

    user.password = hash

    return next()

})



// to compare passwords when users login
userSchema.methods.comparePassword = async function (
    enteredPassword:string
    ): Promise<boolean>{
    const user = this as UserDocument
    return bcrypt.compare(enteredPassword,user.password).catch((e) => false)
}
    
 

const UserModel = mongoose.model<UserDocument>("User", userSchema)

export default UserModel