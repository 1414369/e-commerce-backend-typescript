import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'

export interface iProduct extends Document {
  title: string;
  price: number;
  imageUrl: string;
  category: string;
}

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
});

const Products = model<iProduct>('Products', productsSchema);

export function validate(products) {
  const schema = {
    title: Joi.string().min(3).max(1000).required(),
    price: Joi.number().greater(0).required(),
    imageUrl: Joi.string().optional(),
    category: Joi.string().optional(),
  };

  return Joi.validate(products, schema);
}

export default Products;