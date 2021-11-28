import mongoose from 'mongoose'

// used to hash user's password
import bcrypt from 'bcrypt'
import config from 'config'
import { string } from 'zod'
import UserModel, { UserDocument } from './user.model'


// ts definition for sessionSchema
export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id']
    valid: boolean
    createdAt: string
    updatedAt: string
    comparePassword(enteredPassword: string): Promise<boolean>
}


const sessionSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'UserModel'},
    valid: {type: Boolean, default: true},
    userAgent: {type: String},
},{
    timestamps: true
})

 

const SessionModel = mongoose.model("Session", sessionSchema)

export default SessionModel