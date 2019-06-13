import { cartItemSchema, iCartItem } from './../shopping-cart/model';
import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'

export interface iOrder extends Document {
  items: iCartItem[],
  shipping: iShipping,
  createdDate: number,
}

export interface iShipping extends Document {
  name: string,
  address: string,
  address2: string,
  city: string
}

const shippingSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
}, { _id: false });

const ordersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shipping: shippingSchema,
  items: [cartItemSchema],
  createdDate: {
    type: Date,
    default: 0
  },
});

const Orders = model<iOrder>('Orders', ordersSchema);

export function validate(shipping) {
  const schema = {
    name: Joi.string().min(3).max(1000).required(),
    address: Joi.string().min(3).max(1000).required(),
    address2: Joi.string().optional().allow("").min(3).max(1000),
    city: Joi.string().min(3).max(1000).required(),
  };

  return Joi.validate(shipping, schema);
}

export default Orders;