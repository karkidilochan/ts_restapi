// schema for product validation middleware

import  { object, number, string, TypeOf } from 'zod'

// define payload for all product schemas
const payload = {
    body: object({
        title: string({
            required_error: 'Title is required'
        }),
        description: string({
            required_error: 'Description is required.'
        }).min(5, "Description should be at least 150 characters long."),
        price: number({
            required_error: 'Price is required.'
        }),
        // image: string({
        //     required_error: 'Image is required.'
        // }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'Id of product is required'
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const getProductSchema = object({
    ...params
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>
export type GetProductInput = TypeOf<typeof getProductSchema>
