import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get<string>("privateKey")
const publicKey =  config.get<string>('publicKey')

// object is the payload for our jwt function
export function signJwt (
    object: Object,
    options?: jwt.SignOptions | undefined 
) {
    // now we sign the payload
    return jwt.sign(object, privateKey ,{
        ...(options && options),    
        // check if options is undefined
        algorithm: 'RS256'
    })
}

export function verifyJwt(token: string) {
    try {
        const decodedString = jwt.verify(token,publicKey)
        return {
            valid: true,
            expired: false,
            decodedString
        }
    } catch (e: any) {
        return{
            valid: false,
            expired: e.message === 'jwt expired'
        }
        
    }

}