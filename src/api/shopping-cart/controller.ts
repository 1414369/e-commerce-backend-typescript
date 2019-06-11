import { HTTPError } from '@/helpers/httpErrors';
import * as _ from 'lodash';
import ShoppingCart, { iShoppingCart } from './model';

const returnPropeties = ['_id', 'createdDate', 'items'];
const pickPropeties = ['createdDate', 'items'];

export class shoppingCartController {

    static getById = async (req, res, next) => {
        return res.send(_.pick(req.model, returnPropeties));
    }

    static clear = async (req, res, next) => {
        let shoppingCart = req.model;

        shoppingCart.items = [];

        await shoppingCart.save();

        return res.send(_.pick(shoppingCart, returnPropeties));
    }

    static create = async (req, res, next) => {
        let shoppingCart: iShoppingCart = req.body;

        shoppingCart = new ShoppingCart(_.pick(shoppingCart, pickPropeties));

        await shoppingCart.save();

        return res.send(_.pick(shoppingCart, returnPropeties));
    }
}
