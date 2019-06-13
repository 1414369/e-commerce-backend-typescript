import { HTTPError } from '../../helpers/httpErrors';
import * as _ from 'lodash';
import Orders, { validate, iOrder } from './model';

const returnPropeties = ['_id', 'user', 'items', 'shipping', 'createdDate'];
const pickPropeties = ['user', 'items', 'shipping'];

export class orderController {

    static getById = async (req, res, next) => {
        let orders = _.pick(req.model, returnPropeties);

        return res.send(orders);
    }

    static getAllByUser = async (req, res, next) => {
        const productsList = await Orders.find({}, 'user items shipping createdDate').sort({ title: -1 });
        return res.send(productsList);
    }

    static getAll = async (req, res, next) => {
        const productsList = await Orders.find({}, 'user items shipping createdDate').sort({ title: -1 });
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

    static delete = async (req, res, next) => {
        await Orders.deleteOne({ _id: req.model.id });

        return res.send(true);
    }
}
