import User from '@/api/users/model';
import * as Joi from 'Joi';
import * as bcrypt from 'bcrypt';
import { HTTPError } from '@/helpers';

export class authController {

    static login = async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return next(new HTTPError.Code400(error.details[0].message));

        let user = await User.findOne({ email: req.body.email });
        if (!user) return next(new HTTPError.Code400('Invalid email or password.'));

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return next(new HTTPError.Code400('Invalid email or password.'));

        const token = user.generateAuthToken();
        res.send({ token });
    }
}

const validate = function (req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}   