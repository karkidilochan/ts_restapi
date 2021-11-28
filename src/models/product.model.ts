import mongoose, { Mongoose } from "mongoose";
import { number, string } from "zod";
import { UserDocument } from "./user.model";

export interface ProductDocument extends mongoose.Document {
    // user: UserDocument["_id"]
    title: string
    description: string
    price: number
    // image: string
    createdAt: Date
    updatedAt: Date
}

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            // default: () => `product_id`
        },
        // user: {type: mongoose.Schema.Types.ObjectId, required: true},
        title: {type: String, required: true},
        description : {type: String, required: true},
        price: {type: Number, required: true},
        // image: {type: String, required: true},
    },{
        timestamps: true
    }
)

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel