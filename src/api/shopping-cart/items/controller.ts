import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { HTTPError } from '@/helpers';
import { iExtendedRequest } from '@/_interface';

export default class shoppingCartController {

    static getById = async (req: iExtendedRequest, res, next) => {
        let product = req.product;

        return res.send(product);
    }

    static add = async (req: iExtendedRequest, res, next) => {
        let shoppingCart = req.shoppingCart;
        let product = req.product;

        if (!req.product.quantity) { // product does not exist
            // req.product = null, req.body = product data
            let productId = req.params.productId;
            let shoppingCart = req.shoppingCart;

            product = req.body;
            product._id = productId;
            product.quantity = 1;

            shoppingCart.products.push(product);
        } else {
            product.quantity++;
        }

        await shoppingCart.save();

        return res.send(product);
    }


    static remove = async (req: iExtendedRequest, res, next) => {
        let shoppingCart = req.shoppingCart;
        let product = req.product;

        if (product.quantity > 1) {
            product.quantity--;
        } else { // 0
            shoppingCart.products.pop(product._id);
            product = { quantity: 0 };
        }

        await shoppingCart.save();

        return res.send(product);
    }

    // params
    static productId = async function (req: iExtendedRequest, res, next, productId) {
        if (!mongoose.Types.ObjectId.isValid(productId))
            return next(new HTTPError.Code404('Invalid ID.'));

        let shoppingCart = req.shoppingCart = req.model;
        req.product = shoppingCart.products.id(productId)

        if (!req.product) {
            req.product = {
                quantity: 0
            }
        }
        next();
    }
}
