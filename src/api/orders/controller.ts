import { HTTPError } from '../../helpers/httpErrors';
import * as _ from 'lodash';
import Orders, { validate, iOrder } from './model';
import { iExtendedRequest } from '@/_interface';

const returnPropeties = ['_id', 'user', 'items', 'shipping', 'createdDate'];
const pickPropeties = ['user', 'items', 'shipping'];

function checkAvailable(orderUser, reqUser, next) {
    if (reqUser.isAdmin) {
        if (orderUser._id !== reqUser._id) {
            return next(new HTTPError.Code403('Access denied.'))
        }
    }
}
export class orderController {

    static getById = async (req: iExtendedRequest, res, next) => {
        let orders = _.pick(req.model, returnPropeties);

        return res.send(orders);
    }

    static getAll = async (req: iExtendedRequest, res, next) => {
        let productsList;
        if (req.user.isAdmin) {
            productsList = await Orders.find({}, 'user items shipping createdDate').populate('user').sort({ createdDate: -1 });
        } else {
            productsList = await Orders.find({ user: req.user._id }, 'user items shipping createdDate').sort({ createdDate: -1 });
        }

        return res.send(productsList);
    }

    static create = async (req, res, next) => {
        let orders: iOrder = req.body;

        const { error } = validate(orders.shipping);
        if (error) return next(new HTTPError.Code400(error.details[0].message));

        orders = new Orders(_.pick(orders, pickPropeties));
        orders.createdDate = new Date().getTime();

        await orders.save();

        return res.send(_.pick(orders, returnPropeties));
    }

    static delete = async (req: iExtendedRequest, res, next) => {
        await Orders.deleteOne({ _id: req.model.id });
        return res.send(true);
    }
}
