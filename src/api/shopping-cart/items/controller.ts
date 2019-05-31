import * as _ from 'lodash';
import { iExtendedRequest } from '@/_interface';

export default class shoppingCartController {

    static getById = async (req: iExtendedRequest, res, next) => {
        let product = req.product;

        return res.send(product);
    }

    static create = async (req: iExtendedRequest, res, next) => {
        // req.product = null, req.body = product data
        let productId = req.params.productId;
        let item = req.body;
        let shoppingCart = req.shoppingCart;

        item._id = productId;

        shoppingCart.products.push(item);
        await shoppingCart.save();
        return res.send(shoppingCart);
    }

    static edit = async (req: iExtendedRequest, res, next) => {
        let product = req.model;

        return res.send(product);
    }

}
