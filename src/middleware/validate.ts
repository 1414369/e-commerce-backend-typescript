import { HTTPError } from '@/helpers';

export function validate(validator, property?: string) {
  return (req, res, next) => {
    let data;
    if (property) {
      data = req.body[property];
    } else {
      data = req.body;
    }
    const { error } = validator(data);
    if (error) next(new HTTPError.Code400(error.details[0].message));
  }
}
