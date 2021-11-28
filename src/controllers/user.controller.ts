// controllers are for handling each resource types

import { NextFunction, Request, Response } from "express"
import logger from '../utils/logger'
import {omit} from 'lodash'
import { createUser } from "../services/user.service";
import { createUserInput } from "../schema/user.schema";

// handler to create user
export async function createUserHandler(
    req: Request<{},{}, createUserInput['body']>,
    res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body)
        return res.send(user)
    } catch (e: any) {
        logger.error(e)
        // 409 means conflict in resource
        return res.status(409).send(e.message)
        
    }
    

}