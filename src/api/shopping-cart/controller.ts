import { HTTPError } from '@/helpers/httpErrors';
import * as _ from 'lodash';
import ShoppingCart, { iShoppingCart } from './model';

const returnPropeties = ['_id', 'createdDate', 'products'];
const pickPropeties = ['createdDate', 'products'];

export class shoppingCartController {

    static getById = async (req, res, next) => {
        let shoppingCart = _.pick(req.model, returnPropeties);

        return res.send(shoppingCart);
    }

    // static getAll = async (req, res, next) => {
    //     const productsList = await ShoppingCart.find({}, 'title price category imageUrl').sort({ title: -1 });
    //     return res.send(productsList);
    // }

    static create = async (req, res, next) => {
        let shoppingCart: iShoppingCart = req.body;

        shoppingCart = new ShoppingCart(_.pick(shoppingCart, pickPropeties));

        await shoppingCart.save();

        return res.send(_.pick(shoppingCart, returnPropeties));
    }
    // static edit = async (req, res, next) => {
    //     if (req.file && req.file.path) {
    //         req.body.imageUrl = `http://localhost:${process.env.PORT || 3000}/${req.file.path}`;
    //     }

    //     let shoppingCart = _.pick(req.body, pickPropeties);

    //     _.assign(req.model, shoppingCart);

    //     await req.model.save();

    //     return res.send(_.pick(req.model, returnPropeties));
    // }

    // static delete = async (req, res, next) => {
    //     await ShoppingCart.deleteOne({ _id: req.model.id });

    //     return res.send(true);
    // }
}
