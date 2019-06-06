import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'
import { iProduct } from '../products/model';

export interface iShoppingCart extends Document {
  totalItemsCount: Number;
  products: any;
  createdDate: Number;
}

// export interface iCartProduct {
//   _id: string;
//   product: iProduct;
//   quantity: number;
//   pull: any;
// }

const productSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  quantity: {
    type: Number,
    default: 0
  },
});

const shoppingCartSchema = new Schema({
  products: [productSchema],
  createdDate: {
    type: Number,
    default: new Date()
  },
});

const ShoppingCart = model<iShoppingCart>('ShoppingCarts', shoppingCartSchema);

// export function validate(shoppingCart) {

//   // const nestedSchema = joi.object().keys({
//   //   b: joi.number()
//   // });

//   // const base = joi.object({
//   //   a: joi.string(),
//   //   nestedData: nestedSchema
//   // });

//   // const schema = {
//   //   title: Joi['objectId'](),
//   //   products: Joi.object().keys({
//   //     Joi: joi.number()
//   //   }
//   // };

//   return Joi.validate(shoppingCart, schema);
// }

export default ShoppingCart;