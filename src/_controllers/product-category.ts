import ProductCategory, { validate } from '@/_models/product-category';
import * as _ from 'lodash';

export class productCategoryController {
    static getList = async (req, res) => {
        const productCategory = await ProductCategory.find({}, 'name').sort({ name: -1 });
        res.send(productCategory);
    }

    static create = async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let productCategory = await ProductCategory.findOne({ name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") } });
        if (productCategory) return res.status(400).send('This category already registered.');

        productCategory = new ProductCategory(_.pick(req.body, ['name']));

        await productCategory.save();

        res.send(_.pick(productCategory, ['_id', 'name']));
    }

}
