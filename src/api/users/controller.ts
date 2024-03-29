import User, { validate, iUser } from './model';
import * as _ from 'lodash';

export class userController {
    static getMyInfo = async (req, res, next) => {
        const user: iUser = await User.findById(req["user"]._id).select('-password');
        res.send(user);
    }

    static createUser = async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user: iUser = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        await user.hashPassword();
        await user.save();

        // const token = user.generateAuthToken();
        // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
        res.send(_.pick(user, ['_id', 'name', 'email']));
    }

}
