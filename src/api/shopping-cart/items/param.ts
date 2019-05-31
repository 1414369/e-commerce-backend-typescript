import * as mongoose from 'mongoose';
import { HTTPError } from '@/helpers';
import { iExtendedRequest } from '@/_interface';

export default class param {
    static productId = async function (req: iExtendedRequest, res, next, productId) {
        if (!mongoose.Types.ObjectId.isValid(productId))
            return next(new HTTPError.Code404('Invalid ID.'));

        let shoppingCart = req.shoppingCart = req.model;
        req.product = shoppingCart.products.id(productId)

        next();
    }
}
