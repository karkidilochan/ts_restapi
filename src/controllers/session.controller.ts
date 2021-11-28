import {Request, Response} from 'express'
import { createSession } from "../services/session.service";
import { validateUserPassword } from "../services/user.service";
import { signJwt } from '../utils/jwt.utils'
import config from 'config'

export async function createUserSessionHandler(req: Request, res: Response) {
    // first we validate user password
    const user =  await validateUserPassword(req.body)
    if(!user) {
        return res.status(401).send("invalid password")
    }
    // then, create a session
    const session  = await createSession(user._id, req.get("user-agent") || "")
    // create an access and refresh token

    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")}
    )

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")}
    )
    // return these tokens

    return res.send({accessToken, refreshToken})
}

export async function getUsersSessionsHandler(req: Request, res: Response) {
    // const user =
    return res.send("Work in progress") 
}

