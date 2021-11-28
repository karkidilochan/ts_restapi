// responsible for taking http requests and forwarding it to a controller
import { Express, Request, Response, NextFunction  } from 'express'
import { getProductHandler, createProductHandler, updateProductHandler, deleteProductHandler } from './controllers/product.controller'
import { createUserSessionHandler } from './controllers/session.controller'
import { createUserHandler } from './controllers/user.controller'
import validateResource from './middleware/validateResource'
import { createProductSchema, getProductSchema, updateProductSchema, deleteProductSchema } from './schema/product.schema'
import createSessionSchema from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'

function routes(app: Express){
    app.get('/sanitycheck', (req: Request, res: Response) =>{
        res.sendStatus(200)

    // app.post('/api/users', validateResource(createUserSchema), createUserHandler)

    // app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)

    })  

    app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)
    app.post('/api/products', validateResource(createProductSchema), createProductHandler)
    app.put('/api/products/:productId', validateResource(updateProductSchema), updateProductHandler)
    app.delete('/api/products/:productId', validateResource(deleteProductSchema), deleteProductHandler)

}

export default routes