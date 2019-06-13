import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'
import { iProduct, productsSchema } from '../products/model';

export interface iShoppingCart extends Document {
  items: any;
  createdDate: Number;
}

export interface iCartItem {
  _id: string;
  product: iProduct;
  quantity: number;
}

export const cartItemSchema = new Schema({
  product: productsSchema,
  quantity: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    default: 0
  }
});

const shoppingCartSchema = new Schema({
  items: [cartItemSchema],
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