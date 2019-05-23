import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'

export interface iProductCategory extends Document {
    name: string;
}

const productCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
});

const ProductCategory = model<iProductCategory>('ProductCategory', productCategorySchema);

export function validate(productCategory) {
    const schema = {
        name: Joi.string().min(1).max(1000).required(),
    };

    return Joi.validate(productCategory, schema);
}

export default ProductCategory;
