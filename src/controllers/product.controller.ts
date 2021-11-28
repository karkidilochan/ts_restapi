import { Request, Response } from 'express'
import { CreateProductInput, DeleteProductInput, GetProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../services/product.service';

export async function createProductHandler(
    req: Request<{}, {}, CreateProductInput['body']>,
    res: Response){
    try {
        // const userId = res.locals.user._id
        const body = req.body
        const product = await createProduct({...body})
        return res.send(product)

    }catch (e: any) {
        throw new Error(e)
    }
}
        

export async function getProductHandler(
    req: Request<GetProductInput['params']>,
    res: Response) {
        const productId = req.params.productId

        const product = await findProduct({productId})
        if(!product){
            return res.sendStatus(404)
            // 404 means resource not found
        }
        
        return res.send(product)
}

export async function updateProductHandler(
    req: Request<UpdateProductInput['params']>,
    res: Response) {
        // const userId = res.locals.user._id
        const productId = req.params.productId
        const update = req.body

        const product = await findProduct({productId})
        if(!product){
            return res.sendStatus(404)
            // 404 means resource not found
        }

        // if(String(product.user) !== userId){
        //     return res.sendStatus(403)
        //     // 403 = forbidden client error, means server refuses to authorize it
        // }

        const updatedProduct = await findAndUpdateProduct({productId}, update, {
            new: true
        })

        return res.send(updatedProduct)
}

export async function deleteProductHandler(
    req: Request<DeleteProductInput['params']>,
    res: Response) {
        // const userId = res.locals.user.product_id

        const productId = req.params.productId
        const product = await findProduct({productId})

        if(!product) {
            return res.sendStatus(404)
        }

        // if(String(product.user) !== userId){
        //     return res.sendStatus(403)
        // }

        await deleteProduct({productId})

        return res.sendStatus(200)
        // OK success status response

}