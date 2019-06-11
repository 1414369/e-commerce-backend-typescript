import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { HTTPError } from '@/helpers';
import { iExtendedRequest } from '@/_interface';
import { iShoppingCart } from '../model';

export default class shoppingCartController {

    static getById = async (req: iExtendedRequest, res, next) => {
        let product = req.product;

        return res.send(product);
    }

    static add = async (req: iExtendedRequest, res, next) => {
        let shoppingCart = req.shoppingCart;
        let item = req.product;

        if (req.product.quantity == -1) { // product does not exist
            // req.product = null, req.body = product data
            let productId = req.params.productId;

            item.product = req.body;
            item._id = productId;
            item.quantity = 1;

            shoppingCart.items.push(item);
        } else {
            item.quantity++;
        }

        await shoppingCart.save();

        return res.send(item);
    }

    static remove = async (req: iExtendedRequest, res, next) => {
        let shoppingCart: iShoppingCart = req.shoppingCart;
        let product = req.product;

        if (product.quantity > 1) {
            product.quantity--;
        } else if (product.quantity == -1) {
            return res.send(product);
        } else { // 0
            shoppingCart.items.pull(product._id)
            product.quantity = 0;
        }

        await shoppingCart.save();

        return res.send(product);
    }

    // params
    static productId = async function (req: iExtendedRequest, res, next, productId) {
        if (!mongoose.Types.ObjectId.isValid(productId))
            return next(new HTTPError.Code404('Invalid ID.'));

        let shoppingCart = req.shoppingCart = req.model;
        req.product = shoppingCart.items.id(productId)

        if (!req.product) {
            req.product = {
                quantity: -1
            }
        }
        next();
    }
}
