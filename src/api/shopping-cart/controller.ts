import { HTTPError } from '@/helpers/httpErrors';
import * as _ from 'lodash';
import ShoppingCart, { iShoppingCart } from './model';

const returnPropeties = ['_id', 'createdDate', 'products'];
const pickPropeties = ['createdDate', 'products'];

export class shoppingCartController {

    static getById = async (req, res, next) => {
        let shoppingCart = _.pick(req.model, returnPropeties) as iShoppingCart;
        shoppingCart.totalItemsCount = shoppingCart.products.reduce((total, currProduct) => {
            return total + currProduct.quantity;
        }, 0)
        return res.send(shoppingCart);
    }

    static create = async (req, res, next) => {
        let shoppingCart: iShoppingCart = req.body;

        shoppingCart = new ShoppingCart(_.pick(shoppingCart, pickPropeties));

        await shoppingCart.save();

        return res.send(_.pick(shoppingCart, returnPropeties));
    }
}
