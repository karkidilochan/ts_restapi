import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

export async function createProduct(input: DocumentDefinition<Omit<ProductDocument,'createdAt' | 'updatedAt'>>) {
    try {
        return await ProductModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }   
}

export async function findProduct(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions = {lean: true}
) {
    return ProductModel.findOne(query, {}, options)
}

export async function findAndUpdateProduct(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>,
    options: QueryOptions = {lean: true}
    ){
        return ProductModel.findOneAndUpdate(query, update, options)
}

export async function deleteProduct(
    query: FilterQuery<ProductDocument>,
    options: QueryOptions= {lean: true}) {
        return ProductModel.deleteOne(query, options)

}