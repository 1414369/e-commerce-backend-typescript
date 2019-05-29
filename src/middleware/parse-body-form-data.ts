import { HTTPError } from '@/helpers';

export function parseData(property: string = 'data') {
  return (req, res, next) => {
    try {
      if (req.body && req.body[property]) {
        req.body = JSON.parse(req.body[property]);
        next();
      } else {
        next(new HTTPError.Code400());
      }
    } catch (error) {
      next(new Error(error.message));
    }
  }
}
