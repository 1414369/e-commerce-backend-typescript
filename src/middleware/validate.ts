import { HTTPError } from '@/helpers';

export function validate(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) next(new HTTPError.Code400(error.details[0].message));
  }
}
