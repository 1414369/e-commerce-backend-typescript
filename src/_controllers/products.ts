import * as _ from 'lodash';
import { ResponseString } from '@/_helpers';
import Products, { validate, iProduct } from '@/_models/product';

export class productController {
    static getProductById = async (req, res) => {
        const products = await Products.findById(req.params.id, 'title price category imageUrl');
        res.send(products);
    }

    static getAllProduct = async (req, res) => {
        const productsList = await Products.find({}, 'title price category imageUrl').sort({ title: -1 });
        res.send(productsList);
    }

    static createProduct = async (req, res) => {
        if (!(req.body && req.body.products)) {
            return res.status(400).send(ResponseString.BAD_REQUEST);
        }
        let products: iProduct;

        products = JSON.parse(req.body.products);
        if (req.file && req.file.path) {
            products.imageUrl = `http://localhost:${process.env.PORT || 3000}/${req.file.path}`;
        }

        const { error } = validate(products);
        if (error) return res.status(400).send(error.details[0].message);

        products = new Products(_.pick(products, ['title', 'price', 'category', 'imageUrl']));

        await products.save();

        res.send(_.pick(products, ['_id', 'title', 'price', 'category', 'imageUrl']));
    }
    static editProduct = async (req, res) => {
        if (!(req.body && req.body.products)) {
            return res.status(400).send(ResponseString.BAD_REQUEST);
        }
        let products;

        products = JSON.parse(req.body.products);
        if (req.file && req.file.path) {
            products.imageUrl = `http://localhost:${process.env.PORT || 3000}/${req.file.path}`;
        }

        const { error } = validate(products);
        if (error) return res.status(400).send(error.details[0].message);

        products = new Products(_.pick(products, ['title', 'price', 'category', 'imageUrl']));

        await products.save();

        res.send(_.pick(products, ['_id', 'title', 'price', 'category', 'imageUrl']));
    }
}
