import { model } from 'mongoose';
import { HTTPError } from '../../helpers/httpErrors';
import * as _ from 'lodash';
import Products, { validate, iProduct } from './model';

const returnPropeties = ['_id', 'title', 'price', 'category', 'imageUrl'];
const pickPropeties = ['title', 'price', 'category', 'imageUrl'];

export class productController {

    static getById = async (req, res, next) => {
        let products = _.pick(req.model, returnPropeties);

        return res.send(products);
    }

    static getAll = async (req, res, next) => {
        const productsList = await Products.find({}, 'title price category imageUrl').sort({ title: -1 });
        return res.send(productsList);
    }

    static create = async (req, res, next) => {
        if (req.file && req.file.path) {
            let filePath = req.file.path.replace(/\\/g, "/");
            req.body.imageUrl = `http://localhost:${process.env.PORT || 3000}/${filePath}`;
        }

        let products: iProduct = req.body;

        const { error } = validate(products);
        if (error) return next(new HTTPError.Code400(error.details[0].message));

        products = new Products(_.pick(products, pickPropeties));

        await products.save();

        return res.send(_.pick(products, returnPropeties));
    }
    static edit = async (req, res, next) => {
        if (req.file && req.file.path) {
            let filePath = req.file.path.replace(/\\/g, "/");
            req.body.imageUrl = `http://localhost:${process.env.PORT || 3000}/${filePath}`;
        }

        let products = _.pick(req.body, pickPropeties);

        _.assign(req.model, products);

        await req.model.save();

        return res.send(_.pick(req.model, returnPropeties));
    }

    static delete = async (req, res, next) => {
        await Products.deleteOne({ _id: req.model.id });

        return res.send(true);
    }
}
