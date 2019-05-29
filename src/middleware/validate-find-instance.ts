import { HTTPError } from '@/helpers';
import * as mongoose from 'mongoose';

export function validateFindInstance(modelName: string) {
    return async function (req, res, next, val) {
        if (!mongoose.Types.ObjectId.isValid(val))
            return next(new HTTPError.Code404('Invalid ID.'));

        if (mongoose.models[modelName]) {
            const model = await mongoose.models[modelName].findById(val);
            if (model) {
                req['model'] = model;
                return next();
            } else {
                return next(new HTTPError.Code404(`${modelName} not found.`));
            }
        } else {
            return next(new Error('Model is not existed.'));
        }
    }
}